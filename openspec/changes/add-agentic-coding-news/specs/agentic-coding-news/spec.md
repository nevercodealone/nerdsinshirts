# Agentic Coding News

## ADDED Requirements

### Requirement: Article source files
The system SHALL load articles from Markdown files in `src/content/agentic-coding-news/` whose file name does not start with `_`.

#### Scenario: Regular article file
- **WHEN** a file `claude-duet-sicherheitstechnik-claude-code.md` exists in the vault root
- **THEN** it is part of the `agenticCodingNews` collection with id `claude-duet-sicherheitstechnik-claude-code`

#### Scenario: Obsidian helper files
- **WHEN** a file is named `_redaktion.md` or lives in `_templates/` or `_bilder/`
- **THEN** it is not part of the collection and produces no page

### Requirement: Frontmatter validation
The system SHALL validate every article against the schema defined in `design.md` and SHALL fail the build when validation fails.

#### Scenario: Missing FAQ entries
- **WHEN** an article has fewer than 5 `faq` entries
- **THEN** `astro check` and `astro build` fail with a content validation error naming the file

#### Scenario: Title with colon
- **WHEN** an article `title` contains `:`
- **THEN** the build fails with a validation error

#### Scenario: Missing sources
- **WHEN** an article has an empty `sources` list
- **THEN** the build fails with a validation error

### Requirement: Draft handling
The system SHALL exclude articles with `draft: true` from the production build and SHALL show them in the dev server with a visible draft label.

#### Scenario: Production build
- **WHEN** `astro build` runs and an article has `draft: true`
- **THEN** no page, RSS item, sitemap entry or `llms.txt` line exists for it

#### Scenario: Dev server
- **WHEN** `astro dev` runs and an article has `draft: true`
- **THEN** its page and overview entry render with the label "Entwurf"

### Requirement: URL structure
The system SHALL serve the overview at `/agentic-coding-news/`, each published article at `/agentic-coding-news/<slug>/` and the feed at `/agentic-coding-news/rss.xml`.

#### Scenario: Article URL
- **WHEN** the published file `claude-duet-sicherheitstechnik-claude-code.md` exists
- **THEN** the article is reachable at `https://nerdsinshirts.de/agentic-coding-news/claude-duet-sicherheitstechnik-claude-code/`
- **AND** its canonical link points to that URL

### Requirement: Article page structure
The system SHALL render each article in a single column in this order: logo header with breadcrumb (start page, overview), meta line, H1, author line, TL;DR box, workshop teaser, optional image, body, quote card, FAQ, sources, author box.

#### Scenario: Meta line
- **WHEN** an article is rendered
- **THEN** the meta line shows the publication date in German long format, the reading time in minutes (200 words per minute, minimum 1) and, if set, the update date

#### Scenario: TL;DR box
- **WHEN** an article is rendered
- **THEN** a box labelled `> kurz gesagt` shows the `tldr` text directly below the author line

#### Scenario: Quote card
- **WHEN** an article is rendered
- **THEN** a card shows the initials of `quoteAuthor`, the name, the optional role, the quote text in German quotation marks and a link "Zum Original auf <domain>" to `quoteUrl`

#### Scenario: FAQ
- **WHEN** an article is rendered
- **THEN** each FAQ entry is a collapsible `details` element with the question as summary
- **AND** the section heading is "Häufige Fragen"

#### Scenario: Sources
- **WHEN** an article is rendered
- **THEN** sources appear as a numbered list with title, optional publisher and domain, each opening in a new tab with `rel="noopener"`

### Requirement: Workshop teaser after the TL;DR
The system SHALL render a compact teaser directly below the TL;DR box that links to both NCA KI Workshops, using only data from `src/data/workshops.ts`.

#### Scenario: Teaser links
- **WHEN** an article is rendered
- **THEN** the teaser shows each workshop title with its trainer and links to the workshop page
- **AND** every link carries `mtm_campaign=agentic-coding-news` and `mtm_content=tldr-<workshop id>`
- **AND** the teaser carries `data-track-content`

### Requirement: Single workshop block
The system SHALL render exactly one workshop block per article, placed after the first body section. The compact teaser after the TL;DR does not count as a workshop block.

#### Scenario: Article with two or more sections
- **WHEN** the body contains at least two `## ` headings outside code fences
- **THEN** the workshop block appears directly before the second `## ` heading

#### Scenario: Article with fewer than two sections
- **WHEN** the body contains fewer than two `## ` headings
- **THEN** the workshop block appears directly after the body

#### Scenario: Workshop selection
- **WHEN** an article has `workshop: alle-abteilungen`
- **THEN** the block promotes the "NCA KI Workshop für alle Abteilungen" with Roland Golla
- **AND** links to the developer workshop as secondary option

#### Scenario: Tracking
- **WHEN** the workshop block is rendered
- **THEN** every link carries `mtm_campaign=agentic-coding-news` and `mtm_content=<slot>`
- **AND** the block carries `data-track-content`

### Requirement: Overview page
The system SHALL list published articles newest first, each with date, author, title and TL;DR, and SHALL place one workshop block after the newest article.

#### Scenario: Empty overview
- **WHEN** no published article exists
- **THEN** the page shows "Die ersten Artikel erscheinen in Kürze." and no workshop block

### Requirement: Mobile first layout
The system SHALL render all Agentic Coding News pages without horizontal scrolling at a viewport width of 390px and SHALL limit the reading column to 42rem on wider screens.

#### Scenario: Phone viewport
- **WHEN** a page is opened at 390px width
- **THEN** `document.documentElement.scrollWidth` equals 390

#### Scenario: Desktop viewport
- **WHEN** a page is opened at 1440px width
- **THEN** the content is a single centered column with no sidebar

### Requirement: Structured data and feeds
The system SHALL emit Article and FAQPage JSON-LD on every article page, set `og:type` to `article`, include published articles in the sitemap and RSS feed, and list them in `/llms.txt` with title, URL and TL;DR.

#### Scenario: FAQ structured data
- **WHEN** an article with 5 FAQ entries is rendered
- **THEN** the FAQPage JSON-LD contains 5 `Question` items matching the visible FAQ

### Requirement: No invented content in templates
The system SHALL NOT render any text that does not come from the article file or from `src/data/workshops.ts`, apart from fixed UI labels.

#### Scenario: Missing optional fields
- **WHEN** `quoteRole`, `updatedDate` or `image` is not set
- **THEN** the corresponding element is omitted, never filled with placeholder text
