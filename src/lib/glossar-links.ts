import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { SatteriProcessorOptions } from '@astrojs/markdown-satteri';

type HastPluginEntry = NonNullable<SatteriProcessorOptions['hastPlugins']>[number];

export const GLOSSAR_BASE = '/glossar/';

const CONTENT_DIRS = ['/content/agentic-coding-news/', '/content/glossar/'];
const GLOSSAR_LINK = /^\/glossar\/([a-z0-9-]+)\/$/;

/** Reads `kurzdefinition` and `draft` from a glossary file. `src/lib` can't use `astro:content` here. */
function readTerm(file: string): { kurzdefinition: string; draft: boolean } {
  const frontmatter = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] ?? '';
  const raw = frontmatter.match(/^kurzdefinition:[ \t]*(.+)$/m)?.[1]?.trim();
  if (!raw) throw new Error(`${file}: kurzdefinition must be a single line in the frontmatter`);

  let kurzdefinition = raw;
  if (raw.startsWith('"')) kurzdefinition = JSON.parse(raw) as string;
  else if (raw.startsWith("'")) kurzdefinition = raw.slice(1, -1).replaceAll("''", "'");

  // The schema default is draft: true, so only an explicit false publishes.
  const draft = !/^draft:[ \t]*false[ \t]*$/m.test(frontmatter);
  return { kurzdefinition, draft };
}

/**
 * Sätteri hast plugin: gives every link to `/glossar/<slug>/` in an article or glossary page
 * the term's `kurzdefinition` as `data-glossar` (tooltip and link style, see global.css).
 * A link to a missing term, or from a published file to a draft term, fails the build.
 */
export const glossarLinkPlugin: HastPluginEntry = (factory) => {
  const path = factory.fileURL ? fileURLToPath(factory.fileURL).replaceAll('\\', '/') : '';
  const contentDir = CONTENT_DIRS.find((dir) => path.includes(dir));
  if (!contentDir || path.slice(path.indexOf(contentDir) + contentDir.length).includes('/')) {
    return null;
  }

  const glossarDir = join(dirname(dirname(path)), 'glossar');
  const published = factory.data.astro?.frontmatter?.draft === false;

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

        const term = readTerm(file);
        if (published && term.draft) {
          throw new Error(`${path}: published file links to the draft glossary term "${href}". Publish the term first.`);
        }

        ctx.setProperty(node, 'data-glossar', term.kurzdefinition);
      },
    },
  };
};
