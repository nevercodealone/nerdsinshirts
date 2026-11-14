# SEO, structured data and feeds

## Every page (via `Layout.astro`)

- `title`, `description`, canonical URL (built from `site` in `astro.config.mjs` plus the path).
- Open Graph and Twitter tags. `ogType` is `website` by default and `article` on article pages.
- `robots` `max-image-preview:large`, so Google Search and Discover may show large image previews.
- Social image tags: `og:image`, `og:image:type`, `og:image:width`, `og:image:height`, `og:image:alt`, `twitter:card=summary_large_image`, `twitter:image`, `twitter:image:alt`. They are driven by an `OgImage` object (`src/lib/og-image.ts`). Pages without their own image use `defaultOgImage` (`/og-image.jpg`, 1792×592).
- RSS alternate link to `/agentic-coding-news/rss.xml`.
- Page specific head tags go through `<Fragment slot="head">`, never by editing the layout per page.

## Article pages

- **Article JSON-LD** in the head: headline, description, `datePublished`, `dateModified`, author (Person), publisher, `mainEntityOfPage`, `inLanguage: de-DE`, plus image and keywords when present.
- **FAQPage JSON-LD**, built from the same `faq` array as the visible FAQ. The structured data and the visible text must always be identical. Validated with Google's Rich Results Test.
- `article:published_time` and `article:modified_time` meta tags.
- **Social image:** with a header image, `og:image`, `twitter:image` and the Article JSON-LD `image` (an `ImageObject` with width and height) point to the untouched original at `/agentic-coding-news/<slug>-header.jpg`. It is not re-encoded or renamed, it carries its real 1200×630, and its alt comes from `imageAlt`. Without a header image, the default site image is used.
- **Article meta** (head slot): `author`, `article:published_time`, `article:modified_time` (always, `updatedDate ?? pubDate`), `article:author` (profile URL), `article:section` (`Agentic Coding News`) and one `article:tag` per tag.
- After a deploy, check previews with the LinkedIn Post Inspector, the Facebook Sharing Debugger or opengraph.xyz.
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
