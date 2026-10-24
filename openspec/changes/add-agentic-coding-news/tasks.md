# Tasks

## 1. Setup
- [x] 1.1 Install `@astrojs/rss`, `@astrojs/sitemap` and `@astrojs/markdown-satteri` (pin to the version Astro already ships)
- [x] 1.2 Add sitemap integration and `markdown.processor: satteri({ hastPlugins: [workshopAdPlugin] })` to `astro.config.mjs`

## 2. Content
- [x] 2.1 Add `agenticCodingNews` collection with the schema from `design.md`, including the no colon rule for `title`
- [x] 2.2 Create vault `src/content/agentic-coding-news/` with `.obsidian/` config, `.gitignore`, `_templates/artikel.md`, `_bilder/.gitkeep`
- [x] 2.3 Add helpers in `src/lib/agentic-coding-news.ts`: `getNews` (draft filter), `newsUrl`, `formatDate`, `readingMinutes`, `initials`

## 3. Workshop block
- [x] 3.1 Add `src/data/workshops.ts` with facts from the two NCA workshop pages
- [x] 3.2 Add `workshopBlockHtml`, `countH2` and the Sätteri plugin in `src/lib/workshop-inline-ad.ts`
- [x] 3.3 Push `trackVisibleContentImpressions` in the Matomo snippet of `Layout.astro`

## 4. Pages
- [x] 4.1 Extend `Layout.astro` with optional `ogType`, a `head` slot and the RSS alternate link
- [x] 4.2 Build `src/pages/agentic-coding-news/[slug].astro` per the article requirements
- [x] 4.3 Build `src/pages/agentic-coding-news/index.astro` per the overview requirements
- [x] 4.4 Add `src/components/news/ads/AuthorBox.astro`
- [x] 4.5 Add `rss.xml.ts` and `src/pages/llms.txt.ts`
- [x] 4.6 Add `.news-sheet`, prose, TL;DR, quote card, FAQ, sources and workshop block styles to `global.css`

## 5. Documentation
- [x] 5.1 Document the Agentic Coding News exception and file locations in `AGENTS.md`

## 6. Verification
- [x] 6.1 `npm run check` passes with 0 errors and 0 warnings
- [x] 6.2 `npm run build` passes and excludes drafts
- [x] 6.3 Add the first article, confirm the workshop block sits before the second `##`
- [x] 6.4 Check 390px and 1440px viewports, no horizontal scroll, single column
- [ ] 6.5 Validate JSON-LD of one article with the Rich Results Test
