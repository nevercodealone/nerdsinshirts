import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getNews, newsUrl } from '../../lib/agentic-coding-news';

export async function GET(context: APIContext) {
  const entries = (await getNews()).filter((entry) => !entry.data.draft);

  return rss({
    title: 'Agentic Coding News von Nerds in Shirts',
    description: 'Aktuelle Entwicklungen und Best Practices rund um Agentic Coding.',
    site: context.site!,
    customData: '<language>de-de</language>',
    items: entries.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: newsUrl(entry),
      categories: entry.data.tags,
    })),
  });
}
