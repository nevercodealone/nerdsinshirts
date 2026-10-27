# Architecture

## Stack

- Astro 7, static output, TypeScript strict (`astro/tsconfigs/strict`).
- Tailwind CSS 4 via `@tailwindcss/vite`, with design tokens in `src/styles/global.css`.
- Markdown runs through Sätteri (`@astrojs/markdown-satteri`, pinned to the version Astro ships). Don't add `@astrojs/markdown-remark` or legacy `markdown.rehypePlugins`.
- Integrations: `@astrojs/sitemap`, `@astrojs/rss`.
- Hosting: GitHub Pages via `.github/workflows/deploy.yml`, custom domain `nerdsinshirts.de` (`public/CNAME`).
- Analytics: Matomo (site ID 7), with the snippet in `src/layouts/Layout.astro`.

## Folder map

```
src/
  content.config.ts          Zod schemas for all collections (pages, agenticCodingNews)
  content/
    pages/*.md               Block based pages (frontmatter only)
    agentic-coding-news/     Obsidian vault, one article per <slug>.md
  pages/                     Routes (.astro, .ts endpoints)
    index.astro              Start page -> pages/home.md
    agentic-coding-news/     Overview, [slug].astro, rss.xml.ts
    llms.txt.ts              LLM index of published articles
  layouts/Layout.astro       The only layout: head, meta, Matomo, background, footer
  components/
    blocks/                  One component per block type + BlockRenderer
    news/                    News only components (NewsHeader, ads/)
  lib/                       Pure helpers, no UI
    agentic-coding-news.ts   getNews, newsUrl, formatDate, readingMinutes, authors, ...
    workshop-inline-ad.ts    workshopBlockHtml, trackedUrl, Sätteri plugin
  data/workshops.ts          Workshop facts (single source)
  styles/global.css          Tokens (@theme), base, components layer
public/                      Static files served as is
openspec/changes/            Specs for larger changes
.docs/                       These rules
```

## Rules

- **Routes stay thin.** A route loads data and composes components. Logic goes in `src/lib/`, data in `src/data/` or content files.
- **`src/lib/` has no Astro components** and no side effects at import time. It must stay importable from `astro.config.mjs`.
- **One layout.** Every page uses `Layout.astro`. Extend it through props (`title`, `description`, `image`, `ogType`) or the `head` slot, never with a second layout.
- **No client JavaScript** unless a feature can't work without it. The only scripts today are Matomo and the matrix rain in `Layout.astro`.
- **No new dependency** without a reason in the commit or spec. Pin anything that Astro itself depends on to the version Astro ships.
