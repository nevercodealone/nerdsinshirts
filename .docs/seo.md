# SEO, structured data and feeds

## Every page (via `Layout.astro`)

- `title`, `description`, canonical URL (built from `site` in `astro.config.mjs` plus the path).
- Open Graph and Twitter tags. `ogType` is `website` by default and `article` on article pages.
- RSS alternate link to `/agentic-coding-news/rss.xml`.
- Page specific head tags go through `<Fragment slot="head">`, never by editing the layout per page.

## Article pages

- **Article JSON-LD** in the head: headline, description, `datePublished`, `dateModified`, author (Person), publisher, `mainEntityOfPage`, `inLanguage: de-DE`, plus image and keywords when present.
- **FAQPage JSON-LD**, built from the same `faq` array as the visible FAQ. The structured data and the visible text must always be identical. Validated with Google's Rich Results Test.
- `article:published_time` and `article:modified_time` meta tags.
- All structured data is generated from frontmatter. Never hand write JSON-LD in content.

Since 2023, Google shows FAQ rich results mainly for authoritative government and health sites. The markup is still valid and read by search engines and AI crawlers.

## Feeds and indexes

| File | Contains | Excludes |
|---|---|---|
| `/sitemap-index.xml` (`@astrojs/sitemap`) | All built pages | Drafts (never built) |
| `/agentic-coding-news/rss.xml` | Published articles: title, description, date, link, tags | Drafts |
| `/llms.txt` | Site intro plus one line per published article: title, URL, TL;DR | Drafts |

## Rules

- A new public page must appear in the sitemap automatically. Don't exclude pages without a reason.
- After a deploy that adds an article, run the live URL through https://search.google.com/test/rich-results.
