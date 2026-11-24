import { fileURLToPath } from 'node:url';
import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';
import { workshops, type WorkshopId } from '../data/workshops';

type HastPluginEntry = NonNullable<SatteriProcessorOptions['hastPlugins']>[number];

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export function trackedUrl(url: string, slot: string): string {
  const target = new URL(url);
  target.searchParams.set('mtm_campaign', 'agentic-coding-news');
  target.searchParams.set('mtm_source', 'nerdsinshirts.de');
  target.searchParams.set('mtm_medium', 'workshop-anzeige');
  target.searchParams.set('mtm_content', slot);
  return target.toString();
}

/** The single source for the workshop block, used by the Markdown plugin and the page fallback. */
export function workshopBlockHtml(workshopId: WorkshopId, slot: string): string {
  const workshop = workshops[workshopId];
  const secondary = workshopId === 'developer' ? undefined : workshops.developer;
  const items = workshop.learnings
    .map((item) => `<li><span aria-hidden="true">✓</span> ${escapeHtml(item)}</li>`)
    .join('');

  return [
    `<aside class="workshop-block" data-track-content data-content-name="workshop-${workshop.id}" data-content-piece="${escapeHtml(slot)}" aria-label="NCA KI Workshop">`,
    `<p class="workshop-block__label">&gt; NCA KI Workshop</p>`,
    `<p class="workshop-block__title">${escapeHtml(workshop.title)} mit ${escapeHtml(workshop.trainer)}</p>`,
    `<p class="workshop-block__intro">${escapeHtml(workshop.intro)}</p>`,
    `<ul class="workshop-block__list">${items}</ul>`,
    `<p class="workshop-block__format">${escapeHtml(workshop.format)}</p>`,
    `<a class="workshop-block__cta" href="${escapeHtml(trackedUrl(workshop.url, slot))}" data-content-target>Zum Workshop <span aria-hidden="true">→</span></a>`,
    secondary
      ? `<a class="workshop-block__secondary" href="${escapeHtml(trackedUrl(secondary.url, `${slot}-secondary`))}">Für Entwicklerteams: ${escapeHtml(secondary.title)} <span aria-hidden="true">→</span></a>`
      : '',
    `</aside>`,
  ].join('');
}

/** Markers the pages use to detect that the plugin already placed the block in the body. */
export const INLINE_SLOT = 'artikel';
export const GLOSSAR_SLOT = 'glossar';

/** Content folders that get the block, each with its own `mtm_content` slot. */
const SLOT_BY_DIR = {
  '/content/agentic-coding-news/': INLINE_SLOT,
  '/content/glossar/': GLOSSAR_SLOT,
} as const;

/** Sätteri hast plugin: inserts the workshop block before the second top level h2 of an article or glossary page. */
export const workshopAdPlugin: HastPluginEntry = (factory) => {
  const path = factory.fileURL ? fileURLToPath(factory.fileURL).replaceAll('\\', '/') : '';
  const dir = Object.keys(SLOT_BY_DIR).find((candidate) => path.includes(candidate)) as
    | keyof typeof SLOT_BY_DIR
    | undefined;
  if (!dir || path.slice(path.indexOf(dir) + dir.length).includes('/')) {
    return null;
  }

  const slot = SLOT_BY_DIR[dir];
  const frontmatter = factory.data.astro?.frontmatter ?? {};
  const workshopId: WorkshopId = frontmatter.workshop === 'alle-abteilungen' ? 'alle-abteilungen' : 'developer';
  let seen = 0;

  return {
    name: 'workshop-inline-ad',
    element: {
      filter: ['h2'],
      visit(node, ctx) {
        if (ctx.parent(node)?.type !== 'root') return;
        seen++;
        if (seen === 2) {
          ctx.insertBefore(node, { type: 'raw', value: workshopBlockHtml(workshopId, slot) });
        }
      },
    },
  };
};
