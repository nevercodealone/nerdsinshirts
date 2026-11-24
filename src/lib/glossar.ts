import { getCollection, type CollectionEntry } from 'astro:content';
import { getNews, type NewsEntry } from './agentic-coding-news';
import { GLOSSAR_BASE } from './glossar-links';

export { GLOSSAR_BASE };

export type GlossarEntry = CollectionEntry<'glossar'>;
export type Anbieter = 'anthropic' | 'openai';

/** Product names shown on badges and in the overview filter. */
export const anbieterLabels: Record<Anbieter, string> = {
  anthropic: 'Claude Code',
  openai: 'Codex',
};

/** Company names used on the buttons to the official docs. */
export const dokuLabels: Record<Anbieter, string> = {
  anthropic: 'Anthropic',
  openai: 'OpenAI',
};

export const anbieterOf = (entry: GlossarEntry): Anbieter[] =>
  entry.data.anbieter === 'beide' ? ['anthropic', 'openai'] : [entry.data.anbieter];

/** The official doc links of a term, in provider order. */
export const dokuLinks = (entry: GlossarEntry) =>
  anbieterOf(entry).flatMap((anbieter) => {
    const url = entry.data.doku[anbieter];
    return url ? [{ anbieter, url }] : [];
  });

const collator = new Intl.Collator('de');

/** Published terms from A to Z. Drafts are only included in the dev server. */
export async function getGlossar(): Promise<GlossarEntry[]> {
  const entries = await getCollection('glossar', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => collator.compare(a.data.begriff, b.data.begriff));
}

export const glossarUrl = (entry: GlossarEntry) => `${GLOSSAR_BASE}${entry.id}/`;

/** Resolves `begriffe` / `verwandt` references. Unknown ids fail the build, drafts are left out of it. */
export async function resolveBegriffe(refs: { id: string }[], usedBy: string): Promise<GlossarEntry[]> {
  const all = await getCollection('glossar');
  const visible = new Set((await getGlossar()).map((entry) => entry.id));

  return refs.flatMap(({ id }) => {
    const entry = all.find((candidate) => candidate.id === id);
    if (!entry) throw new Error(`${usedBy} references the unknown glossary term "${id}"`);
    return visible.has(id) ? [entry] : [];
  });
}

/** Articles that list the term in `begriffe`, newest first. */
export async function articlesFor(id: string): Promise<NewsEntry[]> {
  return (await getNews()).filter((entry) => entry.data.begriffe.some((begriff) => begriff.id === id));
}

/** First letter of a term for the A to Z overview. */
export const letterOf = (entry: GlossarEntry) => entry.data.begriff.trim()[0]!.toLocaleUpperCase('de');
