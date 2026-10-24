# Change: Add Agentic Coding News section

## Why

Nerds in Shirts publishes ongoing articles about current developments and best practices in agentic coding, three times per week, in German. Articles are written and approved in Obsidian and stored as Markdown in the repository. The section must turn every article into a fact based, shareable page and route readers to the NCA KI Workshops without adding clutter.

## What Changes

- Add a content collection `agenticCodingNews` loaded from `src/content/agentic-coding-news/*.md`. The folder doubles as an Obsidian vault.
- Add routes:
  - `/agentic-coding-news/` (overview)
  - `/agentic-coding-news/<slug>/` (article, slug = file name without `.md`)
  - `/agentic-coding-news/rss.xml` (RSS feed)
- Add a strict frontmatter schema: title, description, dates, author, tags, draft, workshop, image, TL;DR, quote, FAQ, sources.
- Render articles mobile first in a single column: meta line, H1, author, TL;DR box, body, one workshop block, quote card, FAQ, sources, author box.
- Insert exactly one workshop block per article, automatically, after the first body section.
- Hide drafts from the production build, RSS, sitemap and `llms.txt`. Show them in the dev server.
- Add Article and FAQPage JSON-LD, `og:type=article`, sitemap integration and `llms.txt`.

## Out of Scope

- Ratings, scores or editorial verdicts of any kind
- Format categories, filters, changelogs, previous/next navigation, reading progress bar
- Sidebars, sticky ads, top bars or more than one workshop block per page
- Comments, newsletter signup, search
- Automated research or publishing pipeline (separate change)

## Impact

- Affected specs: `agentic-coding-news` (new capability)
- Affected code:
  - `src/content.config.ts` (new collection, existing `pages` collection unchanged)
  - `src/pages/agentic-coding-news/` (new routes)
  - `src/pages/llms.txt.ts` (new)
  - `src/lib/` (helpers, workshop block, Markdown plugin)
  - `src/data/workshops.ts` (new)
  - `src/components/news/` (new components)
  - `src/layouts/Layout.astro` (optional `ogType` prop, `head` slot, RSS link)
  - `src/styles/global.css` (article styles)
  - `astro.config.mjs` (sitemap integration, Sätteri hast plugin)
  - `package.json` (`@astrojs/rss`, `@astrojs/sitemap`, `@astrojs/markdown-satteri`)
  - `AGENTS.md` (document the exception to the "every element is a block" rule)
- Existing home page and block system stay untouched.
