# Pages and blocks

Applies to every page except Agentic Coding News articles (see [agentic-coding-news.md](agentic-coding-news.md)).

## Rules

1. **Every content element is a block.** All page content lives in the frontmatter `blocks` array of a Markdown file. Each block has a `type` discriminator plus typed props. The Markdown body is not used.
2. **Pages are Markdown files with clean properties.** Page content lives in `src/content/pages/**/*.md` and is validated by the `pages` schema in `src/content.config.ts`.
3. **No copy in components.** Labels, links and texts come from block props. Components contain only fixed UI labels such as aria labels.

## Add a block type (3 changes, always together)

1. `src/components/blocks/<Name>.astro`: the component with a typed `Props` interface.
2. A new variant in the discriminated union `blockSchema` in `src/content.config.ts`.
3. A new `case` in `src/components/blocks/BlockRenderer.astro`, plus the matching entry in its `Block` type.

## Add a prop to an existing block

1. Add it to the block schema in `content.config.ts`. Use `.optional()` unless every existing page sets it.
2. Add it to the component's `Props` and to the `Block` type in `BlockRenderer.astro`.
3. Render nothing when an optional prop is missing. Never use a fallback text.

Example: `hero.logoCta` (the Agentic Coding News link under the logo).

## Add a page (2 files)

1. `src/content/pages/<slug>.md`: frontmatter with `title`, optional `seo` (`description`, `image`) and `blocks`.
2. `src/pages/<slug>.astro`: loads the entry with `getEntry('pages', '<id>')` and renders `<BlockRenderer blocks={entry.data.blocks} />` inside `<Layout>`. Throw if the entry is missing.

## Current block types

| Type | Component | Used on |
|---|---|---|
| `statusBar` | `StatusBar.astro` | Start page, top pill |
| `hero` | `Hero.astro` | Start page, avatar, headline, CTAs, optional `logoCta` |
| `socialLinks` | `SocialLinks.astro` | Start page, social cards |
