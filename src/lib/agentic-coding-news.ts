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

/** All articles, newest first. Every article in the repo is published. */
export async function getNews(): Promise<NewsEntry[]> {
  const entries = await getCollection('agenticCodingNews');
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
export const hasInlineWorkshop = (html = '', slot: string = INLINE_SLOT) =>
  html.includes(`data-content-piece="${slot}"`);

/** FAQPage JSON-LD, built from the same items as the visible FAQ. */
export const faqLd = (items: { question: string; answer: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map(({ question, answer }) => ({
    '@type': 'Question',
    name: question,
    acceptedAnswer: { '@type': 'Answer', text: answer },
  })),
});

/** JSON-LD for a script tag. Escapes "<" so content can never close the tag. */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, '\\u003c');
