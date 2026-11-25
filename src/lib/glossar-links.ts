import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';

type HastPluginEntry = NonNullable<SatteriProcessorOptions['hastPlugins']>[number];

export const GLOSSAR_BASE = '/glossar/';

const CONTENT_DIRS = ['/content/agentic-coding-news/', '/content/glossar/'];
const GLOSSAR_LINK = /^\/glossar\/([a-z0-9-]+)\/$/;

/** Reads `kurzdefinition` from a glossary file. This file can't use `astro:content` (see astro.config.mjs). */
function readKurzdefinition(file: string): string {
  const frontmatter = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const raw = frontmatter.match(/^kurzdefinition:[ \t]*(.+)$/m)?.[1]?.trim();
  if (!raw) throw new Error(`${file}: kurzdefinition must be a single line in the frontmatter`);

  if (raw.startsWith('"')) return JSON.parse(raw) as string;
  if (raw.startsWith("'")) return raw.slice(1, -1).replaceAll("''", "'");
  return raw;
}

/**
 * Sätteri hast plugin: gives every link to `/glossar/<slug>/` in an article or glossary page
 * the term's `kurzdefinition` as `data-glossar` (tooltip and link style, see global.css).
 * A link to a missing term fails the build.
 */
export const glossarLinkPlugin: HastPluginEntry = (factory) => {
  const path = factory.fileURL ? fileURLToPath(factory.fileURL).replaceAll('\\', '/') : '';
  const contentDir = CONTENT_DIRS.find((dir) => path.includes(dir));
  if (!contentDir || path.slice(path.indexOf(contentDir) + contentDir.length).includes('/')) {
    return null;
  }

  const glossarDir = join(dirname(dirname(path)), 'glossar');

  return {
    name: 'glossar-links',
    element: {
      filter: ['a'],
      visit(node, ctx) {
        const href = node.properties?.href;
        if (typeof href !== 'string' || !href.startsWith(GLOSSAR_BASE) || href === GLOSSAR_BASE) return;

        const slug = href.match(GLOSSAR_LINK)?.[1];
        if (!slug) {
          throw new Error(`${path}: glossary link "${href}" must have the form /glossar/<slug>/`);
        }

        const file = join(glossarDir, `${slug}.md`);
        if (!existsSync(file)) {
          throw new Error(`${path}: link to unknown glossary term "${href}" (missing ${file})`);
        }

        ctx.setProperty(node, 'data-glossar', readKurzdefinition(file));
      },
    },
  };
};
