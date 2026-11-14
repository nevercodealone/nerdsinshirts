import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import type { APIContext } from 'astro';
import { getNews, type NewsEntry } from '../../lib/agentic-coding-news';

// Serves the untouched header image under its own name for og:image and twitter:image.
// The page itself renders optimized variants through <Picture>.

export async function getStaticPaths() {
  const entries = await getNews();
  return entries
    .filter((entry) => entry.data.image && entry.filePath)
    .map((entry) => ({ params: { slug: entry.id }, props: { entry } }));
}

export async function GET({ props }: APIContext<{ entry: NewsEntry }>) {
  const { entry } = props;
  const file = join(dirname(entry.filePath!), '_bilder', `${entry.id}-header.jpg`);

  try {
    return new Response(await readFile(file), {
      headers: { 'Content-Type': 'image/jpeg' },
    });
  } catch {
    throw new Error(
      `Header image for "${entry.id}" must be _bilder/${entry.id}-header.jpg (not found: ${file})`,
    );
  }
}
