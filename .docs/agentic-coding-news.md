# Agentic Coding News

German articles on current developments and best practices in agentic coding, written by Roland in Obsidian. The full spec is in `openspec/changes/add-agentic-coding-news/`.

## The exception to the block rule

Articles are prose. The **prose goes in the Markdown body**. The **structured parts** (title, TL;DR, quote, FAQ, sources) **go in the frontmatter**. The only other content with a Markdown body are glossary terms (see [glossar.md](glossar.md)).

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

The schema in `src/content.config.ts` is the source of truth. If this table and the schema differ, the table is wrong.

| Field | Rule |
|---|---|
| `title` | max 70 chars, **no `:`** (headlines are sentences) |
| `description` | 80 to 160 chars |
| `pubDate` | required, `YYYY-MM-DD`, **set to the day the article is added to the repo** (see below) |
| `updatedDate` | optional, set it when content changes after publishing |
| `author` | `roland-golla` or `benjamin-klein` |
| `tags` | list, optional |
| `workshop` | `developer` (default) or `alle-abteilungen`, picks the big workshop block |
| `image` / `imageAlt` | optional header image `./_bilder/<slug>-header.jpg`, `imageAlt` required when `image` is set |
| `tldr` | min 40 chars |
| `begriffe` | optional list of glossary slugs linked in the article, e.g. `[skills, hooks]`. Renders the box "Begriffe in diesem Artikel" (see [glossar.md](glossar.md)) |
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

## Publishing

There is no draft state. **An article in the repo is live with the next deploy.** A `draft` key in a delivered file is ignored by the schema; remove the line on intake.

- Only Roland decides when an article ships. Add an article file only when he asks.
- If an article is not ready, it stays out of the repo (Obsidian or Downloads).
- Commit and push steps are in [workflow.md](workflow.md#publishing-content-make-it-live).

## Intake from Downloads

Roland delivers articles, glossary terms and images in `~/Downloads`.

1. **Pick the newest version.** `name (1).md` is newer than `name.md`. Diff the two and report what changed.
2. **FAQ keys.** Delivered articles may use `frage` / `antwort`. The article schema needs `question` / `answer`. Rename the keys only, never the text. Glossary terms keep `frage` / `antwort`.
3. **Remove the `draft:` line.**
4. **Set `pubDate`** to the day the file is added (see below).
5. **Header image.** An article that references an image can't be added without it: the build fails on the missing file.
   - Check the real format and size with `file`, not the extension. Delivered images can be large PNGs named `.jpg`.
   - Convert to a 1200×630 JPEG with `sharp` (it ships with Astro) and save it as `_bilder/<slug>-header.jpg`.
   - Crop so nothing important is lost. Roland's signature sits at the bottom right, so crop from the left when the ratio doesn't fit (`fit: 'cover', position: 'east'`). Look at the result.
6. **Compare `imageAlt` with the picture.** Report a mismatch to Roland. Don't rewrite it.
7. **Glossary links.** Every `/glossar/<slug>/` link and every slug in `begriffe` needs its term file in the repo, or the build fails. Add the terms together with the article.
8. Change nothing else in the file. Then verify (see the end of this page).

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
9. Box "Begriffe in diesem Artikel" (only with `begriffe`)
10. Quote card
11. FAQ
12. Sources
13. Author box

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
| Workshop block | Before the second `##` (fallback: after the body) | `workshopBlockHtml()` via the Sätteri plugin | `artikel`, `artikel-secondary` (glossary pages: `glossar`) |

The overview has one workshop block after the newest article (`mtm_content=uebersicht`).

- All ad links go through `trackedUrl()` (`mtm_campaign=agentic-coding-news`, `mtm_source`, `mtm_medium`, `mtm_content`).
- Every ad container carries `data-track-content`, `data-content-name` and `data-content-piece` for Matomo content tracking.
- Ad text comes only from `src/data/workshops.ts`.

## Verify a new article

1. Run `npm run check`. Schema errors name the file and field.
2. Run `npm run build`: the article is in `dist/`, the sitemap and the RSS feed.
3. Run `npx astro dev --background` and open the article: one workshop block before the second `##`, the mini ad below the TL;DR, the FAQ and sources complete.
4. Check that it works at 390px with no horizontal scroll (watch long tables and code lines).
