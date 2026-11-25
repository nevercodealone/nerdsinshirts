import type { APIContext } from 'astro';

// Points crawlers to the sitemap that @astrojs/sitemap writes at build time.
export function GET({ site }: APIContext) {
  const sitemapUrl = new URL('sitemap-index.xml', site!);

  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl.href}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
