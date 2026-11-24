# Glossar

One page per term from the Agentic Coding News, explained in German and backed only by the official docs of Anthropic and OpenAI. The full spec is in `openspec/changes/add-glossar/`.

## Files and URLs

- One term per file: `src/content/glossar/<slug>.md`. The folder is not part of the Obsidian vault.
- Slug is the term only, lowercase, ASCII: `skills`, `hooks`, `claude-md`.
- Overview: `/glossar/`. Term: `/glossar/<slug>/`, always with the trailing slash.
- Never rename a published file. That changes its URL and breaks links.

## Content rules

- Every statement comes from the official docs. Nothing from other blogs, nothing invented.
- Each section in the body ends with a source line: `*Quelle: [Titel der Doku Seite](URL)*`.
- A section the docs say nothing about is left out.
- Like articles, the prose goes in the Markdown body and the structured parts in the frontmatter. Agents don't write the prose.

## Frontmatter rules (enforced by the schema)

| Field | Rule |
|---|---|
| `title` | max 70 chars, no `:` |
| `begriff` | the term only, e.g. `Skills`. Used in the overview, cards, breadcrumb and JSON-LD |
| `kurzdefinition` | 80 to 200 chars, **one line**. Used in the card, the overview and the tooltip |
| `description` | 80 to 160 chars |
| `pubDate`, `geprueft` | `YYYY-MM-DD`. `geprueft` is the last check against the docs |
| `author` | `roland-golla` or `benjamin-klein` |
| `anbieter` | `anthropic`, `openai` or `beide` |
| `doku` | `anthropic` and/or `openai`, each a URL. The link for the `anbieter` is required, both for `beide`. The build fails otherwise |
| `aliases` | at least 1 spelling used in texts |
| `verwandt` | optional list of other glossary slugs |
| `tags`, `workshop`, `tldr` | as for articles |
| `faq` | at least 5 `{frage, antwort}` (articles use `{question, answer}`) |
| `sources` | at least 1 `{title, url}`, official doc pages only |
| `draft` | default `true` |

There is no `image` field. Glossary pages use the default site image.

## Draft and publish

Same as articles: drafts show in the dev server with an "Entwurf" label and are absent from the build and the sitemap. Only Roland sets `draft: false`. While no term is published, `/glossar/` shows its empty state.

## Linking

| Direction | How |
|---|---|
| Text to term | A normal Markdown link to `/glossar/<slug>/`, on the first mention |
| Article to terms | `begriffe: [skills, hooks]` in the article frontmatter renders the box "Begriffe in diesem Artikel" |
| Term to articles | "In unseren Artikeln" lists every article with the term in `begriffe`, newest first |
| Term to term | `verwandt` renders "Verwandte Begriffe" |

- `glossarLinkPlugin` (`src/lib/glossar-links.ts`, Sätteri hast plugin) gives every `/glossar/<slug>/` link in article and glossary prose the attribute `data-glossar` with the term's `kurzdefinition`. CSS in `global.css` turns it into a dotted underline and a tooltip. The tooltip needs no JavaScript, shows only on devices that hover, and not inside tables.
- The plugin fails the build for a link to a missing term, and for a link from a published file (`draft: false`) to a draft term. **Publish the terms before the article that links to them.**
- An unknown slug in `begriffe` or `verwandt` fails the build. A draft term is left out of the boxes in the build.

## Page structure (fixed, one template)

Breadcrumb, provider badges, H1, definition card with one button per official doc, TL;DR, body with the workshop block before the second `##`, "In unseren Artikeln", "Verwandte Begriffe", FAQ, sources. Empty sections are left out.

The workshop block comes from `workshopBlockHtml()` with `mtm_content=glossar`. There is no mini ad on glossary pages.

## Overview

Terms from A to Z with letter jump marks, as cards with term, provider badges and short definition. There is no provider filter.

## Verify a new term

1. `npm run check`, then `npx astro dev --background`.
2. Open `/glossar/` and the term: doc buttons, one workshop block, FAQ and sources complete, related terms linked.
3. 390px with no horizontal scroll.
