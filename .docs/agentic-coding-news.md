# Agentic Coding News

German articles on current developments and best practices in agentic coding, written by Roland in Obsidian. The full spec is in `openspec/changes/add-agentic-coding-news/`.

## The exception to the block rule

Articles are prose. The **prose goes in the Markdown body**. The **structured parts** (title, TL;DR, quote, FAQ, sources) **go in the frontmatter**. Nothing else in the project uses the Markdown body.

## Vault

- Root: `src/content/agentic-coding-news/`, which is also the Obsidian vault.
- One article per file: `<slug>.md` directly in the root.
- Files and folders starting with `_` are Obsidian only and never built: `_templates/artikel.md` (new article template) and `_bilder/` (attachments).
- `.obsidian/` config is committed (Markdown links, no wikilinks). Workspace and cache files are git ignored.

## Slugs and URLs

- Slug is the file name without `.md`: lowercase, words joined with `-`, ASCII only (`ae`, `oe`, `ue`, `ss` instead of umlauts).
- Overview: `/agentic-coding-news/`. Article: `/agentic-coding-news/<slug>/`. Feed: `/agentic-coding-news/rss.xml`.
- Never rename a published file. That changes its URL and breaks links.

## Frontmatter rules (enforced by the schema)

| Field | Rule |
|---|---|
| `title` | max 70 chars, **no `:`** (headlines are sentences) |
| `description` | 80 to 160 chars |
| `pubDate` | required, `YYYY-MM-DD` |
| `updatedDate` | optional, set it when content changes after publishing |
| `author` | `roland-golla` or `benjamin-klein` |
| `tags` | list, optional |
| `draft` | default `true` |
| `workshop` | `developer` (default) or `alle-abteilungen`, picks the big workshop block |
| `image` / `imageAlt` | optional local image, `imageAlt` required when `image` is set |
| `tldr` | min 40 chars |
| `quoteText` | max 200 chars, `quoteAuthor` and `quoteUrl` required, `quoteRole` optional |
| `faq` | **at least 5** `{question, answer}` |
| `sources` | **at least 1** `{title, url, publisher?}` |

## Writing rules

- Every claim in the body, TL;DR and FAQ must be backed by an entry in `sources`.
- FAQ answers must match the article. They are shown on the page and sent to Google as FAQPage data.
- No ratings, scores or editorial verdicts.
- Don't put your own workshop block in the body. It's added automatically (see below).

## Draft and publish

- `draft: true`: renders in the dev server with an "Entwurf" label, and is absent from the build, RSS, sitemap and `llms.txt`.
- `draft: false`: published on the next push to `main`.
- Only Roland decides when an article ships.

## Page structure (fixed, one template)

The page is one column, in this order:

1. Logo header with breadcrumb
2. Meta line (date, reading time, update date)
3. H1
4. Author line
5. TL;DR box
6. Workshop mini ad
7. Optional image
8. Body, with the workshop block inside
9. Quote card
10. FAQ
11. Sources
12. Author box

## Workshop ads

There are exactly two per article. Don't add more, and no sidebars or sticky ads.

| Ad | Where | Source | `mtm_content` |
|---|---|---|---|
| Mini ad, both workshops | Below the TL;DR | `components/news/ads/WorkshopMiniAd.astro` | `tldr-<workshop id>` |
| Workshop block | Before the second `##` (fallback: after the body) | `workshopBlockHtml()` via the Sätteri plugin | `artikel`, `artikel-secondary` |

The overview has one workshop block after the newest article (`mtm_content=uebersicht`).

- All ad links go through `trackedUrl()` (`mtm_campaign=agentic-coding-news`, `mtm_source`, `mtm_medium`, `mtm_content`).
- Every ad container carries `data-track-content`, `data-content-name` and `data-content-piece` for Matomo content tracking.
- Ad text comes only from `src/data/workshops.ts`.

## Verify a new article

1. Run `npm run check`. Schema errors name the file and field.
2. Run `npx astro dev --background` and open the article: one workshop block before the second `##`, the mini ad below the TL;DR, the FAQ and sources complete.
3. Check that it works at 390px with no horizontal scroll (watch long tables and code lines).
