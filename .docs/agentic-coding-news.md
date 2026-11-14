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
| `pubDate` | required, `YYYY-MM-DD`, **set to the day the article is added to the repo** (see below) |
| `updatedDate` | optional, set it when content changes after publishing |
| `author` | `roland-golla` or `benjamin-klein` |
| `tags` | list, optional |
| `draft` | default `true` |
| `workshop` | `developer` (default) or `alle-abteilungen`, picks the big workshop block |
| `image` / `imageAlt` | optional header image `./_bilder/<slug>-header.jpg`, `imageAlt` required when `image` is set |
| `tldr` | min 40 chars |
| `quoteText` | max 200 chars, `quoteAuthor` and `quoteUrl` required, `quoteRole` optional. `quoteAuthor` is the **source person** the article reports on |
| `quotePosition` / `quoteCompany` | optional, the source person's position and company, e.g. `Head of Claude Code` / `Anthropic`. Leave empty when the source doesn't say; never guess |
| `faq` | **at least 5** `{question, answer}` |
| `sources` | **at least 1** `{title, url, publisher?}` |

## Writing rules

- Every claim in the body, TL;DR and FAQ must be backed by an entry in `sources`.
- FAQ answers must match the article. They are shown on the page and sent to Google as FAQPage data.
- No ratings, scores or editorial verdicts.
- Don't put your own workshop block in the body. It's added automatically (see below).

## Publication date

- When an article file is added to the repo (copied in from Obsidian or Downloads), set `pubDate` to **that day's date**, even if the file carries an older date.
- Don't touch `pubDate` again after that. Later content changes go into `updatedDate`.

## Draft and publish

- `draft: true`: renders in the dev server with an "Entwurf" label, and is absent from the build, RSS, sitemap and `llms.txt`.
- `draft: false`: published on the next push to `main`.
- Only Roland decides when an article ships.

## Page structure (fixed, one template)

The page is one column, in this order:

1. Site header bar (shared with the start page, `SiteHeader.astro`, full page width above the card)
2. Optional header image
3. Meta line (date, reading time, update date)
4. H1
5. Source line: `quoteAuthor · quotePosition · quoteCompany` without a label, the name linking to `quoteUrl`. Empty fields are left out, and the overview shows the same line. The real writer (`author`) stays in the author box, `meta author`, `article:author` and JSON-LD `author`. JSON-LD carries the source as `citation`.
6. TL;DR box
7. Workshop mini ad
8. Body, with the workshop block inside
9. Quote card
10. FAQ
11. Sources
12. Author box

## Header image

- **New articles should have one.** Older articles without one stay as they are, and their social previews use the 1792×592 site image.
- **File:** `_bilder/<slug>-header.jpg`, exactly this name, **1200×630 JPEG** (the Open Graph size). Reference it in the frontmatter as `image: "./_bilder/<slug>-header.jpg"`. The build fails if the name doesn't match.
- **`imageAlt`:** describe what is in the picture, in German. It goes into the `alt`, `og:image:alt` and `twitter:image:alt`.
- **Rendering**, all built into `astro:assets` (don't hand-roll `srcset`):
  - `<Picture>` with `formats={['avif', 'webp']}`, with the JPEG as fallback
  - `layout="constrained"` with `width={944} height={496}`, the content width of the card (59rem = 64rem card minus padding). Astro builds `srcset` from it (1x and 2x plus its breakpoints, never above the 1200px original) and renders the `<img>` at 944×496, never at full size.
  - `sizes="(min-width: 64rem) 59rem, calc(100vw - 2rem)"`. It must be passed explicitly: `Picture` only copies `sizes` to the AVIF and WebP `<source>` elements when it's given as a prop. Without it, browsers assume full viewport width and load the 1080px file on desktop.
  - `priority`: eager loading with `fetchpriority="high"`, since it's the LCP image. It's the only `priority` image on the page.
- **Full size is only for social meta:** `src/pages/agentic-coding-news/[slug]-header.jpg.ts` serves the original file byte for byte, under its own name, at `/agentic-coding-news/<slug>-header.jpg`.
- Don't put images inside the body above the first `##` section. The header image is the one image above the fold.

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
