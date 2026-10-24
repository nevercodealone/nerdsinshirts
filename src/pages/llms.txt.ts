import type { APIContext } from 'astro';
import { getNews, newsUrl } from '../lib/agentic-coding-news';

export async function GET(context: APIContext) {
  const entries = (await getNews()).filter((entry) => !entry.data.draft);
  const site = context.site!;

  const lines = [
    '# Nerds in Shirts',
    '',
    '> Nerds in Shirts sind Benjamin Klein und Roland Golla von Never Code Alone. Gemeinsam geben sie NCA KI Workshops für Developer und alle Abteilungen.',
    '',
    '## Agentic Coding News',
    '',
    ...entries.map((entry) => `- [${entry.data.title}](${new URL(newsUrl(entry), site)}): ${entry.data.tldr}`),
  ];

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
