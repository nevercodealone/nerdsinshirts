import { getCollection, type CollectionEntry } from 'astro:content';
import { INLINE_SLOT } from './workshop-inline-ad';

export type NewsEntry = CollectionEntry<'agenticCodingNews'>;

export const NEWS_BASE = '/agentic-coding-news/';

export const authors = {
  'roland-golla': {
    name: 'Roland Golla',
    url: 'https://www.linkedin.com/in/rolandgolla/',
  },
  'benjamin-klein': {
    name: 'Benjamin Klein',
    url: 'https://www.linkedin.com/in/benjaminklein1337/',
  },
} as const;

/** Published articles, newest first. Drafts are only included in the dev server. */
export async function getNews(): Promise<NewsEntry[]> {
  const entries = await getCollection('agenticCodingNews', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export const newsUrl = (entry: NewsEntry) => `${NEWS_BASE}${entry.id}/`;

const dateFormat = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export const formatDate = (date: Date) => dateFormat.format(date);

export function readingMinutes(markdown = ''): number {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase())
    .slice(0, 2)
    .join('');

export const domain = (url: string) => new URL(url).hostname.replace(/^www\./, '');

/** True when the Markdown plugin already placed the workshop block inside the body. */
export const hasInlineWorkshop = (html = '') => html.includes(`data-content-piece="${INLINE_SLOT}"`);
