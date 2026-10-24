# Design: Agentic Coding News

## Context

- Astro 7.3, static output, deployed to GitHub Pages via `.github/workflows/deploy.yml` (custom domain `nerdsinshirts.de`).
- Existing pages use frontmatter `blocks` rendered by `BlockRenderer`. Articles are prose written in Obsidian, so they are an explicit exception: prose lives in the Markdown body, structured parts live in frontmatter.
- Astro 7 uses the Sätteri Markdown processor by default. Legacy `markdown.rehypePlugins` require `@astrojs/markdown-remark` and must not be used.
- Design tokens, fonts and the dark theme already exist in `src/styles/global.css` and must be reused.

## Goals

- Mobile first, single column, readable on a 390px viewport without horizontal scroll.
- One article template, no variants.
- Every visible claim traceable to the `sources` list.
- Exactly one workshop block per article.

## Non-Goals

- Personalisation, client side filtering, interactive widgets.
- Any content the author did not write or source.

## Decisions

### Content location and vault

- Vault root: `src/content/agentic-coding-news/`
- Articles: `<slug>.md` directly in the vault root.
- Glob pattern: `['*.md', '!_*.md']`. Files and folders starting with `_` (for example `_templates/`, `_bilder/`) are Obsidian only and never built.
- Committed Obsidian config in `.obsidian/`: Markdown links instead of wikilinks, attachments in `_bilder/`, templates in `_templates/`. Workspace and cache files are git ignored.

### Frontmatter schema

| Field | Type | Rule |
|---|---|---|
| `title` | string | max 70 chars, must not contain `:` (headlines are sentences) |
| `description` | string | 80 to 160 chars |
| `pubDate` | date | required |
| `updatedDate` | date | optional |
| `author` | enum | `roland-golla`, `benjamin-klein` |
| `tags` | string[] | default `[]` |
| `draft` | boolean | default `true` |
| `workshop` | enum | `developer` (default), `alle-abteilungen` |
| `image` | image() | optional, local file |
| `imageAlt` | string | required when `image` is set |
| `tldr` | string | min 40 chars |
| `quoteText` | string | max 200 chars |
| `quoteAuthor` | string | required |
| `quoteRole` | string | optional |
| `quoteUrl` | url | required |
| `faq` | `{question, answer}[]` | min 5 |
| `sources` | `{title, url, publisher?}[]` | min 1 |

Quote fields are flat so they stay editable in the Obsidian properties view.

### Workshop block insertion

- One HTML generator `workshopBlockHtml(workshopId, slot)` in `src/lib/workshop-inline-ad.ts` is the single source for the block.
- A Sätteri hast plugin factory registered via `markdown.processor: satteri({ hastPlugins: [...] })` inserts the block as a `raw` node before the second `h2` of files under `/content/agentic-coding-news/`.
- If the body has fewer than two `## ` headings (code fences excluded), the article page renders the block after the body instead.
- The workshop is chosen by the `workshop` frontmatter field.
- Workshop facts live in `src/data/workshops.ts` and are limited to what the NCA workshop pages state. No prices.
- Links carry Matomo campaign parameters: `mtm_campaign=agentic-coding-news`, `mtm_source=nerdsinshirts.de`, `mtm_medium=workshop-anzeige`, `mtm_content=<slot>`.
- The block carries Matomo content tracking attributes (`data-track-content`, `data-content-name`, `data-content-piece`). `Layout.astro` pushes `trackVisibleContentImpressions`.

### Layout

- `.news-sheet` container: full bleed on phones, centered column with max width 42rem from 44rem viewport upward.
- Reuse existing fonts: Space Grotesk for headlines, Plus Jakarta Sans for body, JetBrains Mono for labels and meta.
- Prose styles live in `@layer components` so Tailwind utilities can override them.
- Code blocks are styled as terminal windows (three dots, monospace).

### URLs

| Page | URL |
|---|---|
| Overview | `/agentic-coding-news/` |
| Article | `/agentic-coding-news/<slug>/` |
| RSS | `/agentic-coding-news/rss.xml` |
| LLM index | `/llms.txt` |

Slugs come from file names: lowercase, words joined by `-`, ASCII only (`ae`, `oe`, `ue`, `ss` for umlauts). Example: `claude-duet-sicherheitstechnik-claude-code.md`.

## Risks

- **Sätteri plugin API is new.** Mitigation: the fallback rendering after the body keeps the block visible if the plugin is removed.
- **Material Symbols font may not load.** Mitigation: the workshop block uses text characters (✓, →) instead of icon ligatures.
- **Obsidian edits can break the schema.** Mitigation: `astro check` and `astro build` fail in CI, so a broken article never deploys.
