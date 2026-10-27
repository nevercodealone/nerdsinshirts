# REVIEW.md

Instructions for AI code review (`/code-review`, Code Review for Claude Code) on nerdsinshirts.de. Project rules are in `.docs/`.

## What a bug looks like here

Report these as **Important**:

- **Invented content:** visible text that doesn't come from a content file, `src/data/workshops.ts` or a fixed UI label. Placeholder text for an empty optional field. Any price.
- **Schema drift:** a frontmatter field used in code but missing from `src/content.config.ts`, a block prop missing from the schema, the component `Props` or the `Block` type in `BlockRenderer.astro`.
- **Draft leaks:** a code path that could put a `draft: true` article into the build, RSS, sitemap or `llms.txt`.
- **Workshop ads:** more or fewer than one workshop block per article, more than one mini ad, an ad link not built with `trackedUrl()`, or an ad container missing `data-track-content`.
- **Structured data mismatch:** FAQPage or Article JSON-LD that differs from the visible content, or JSON-LD that can break the page (unescaped `</script>`).
- **Mobile breakage:** anything that can cause horizontal scroll at 390px, such as a fixed width, an unwrapped long line, or a table or `pre` without its own overflow.
- **URL changes:** renamed article files, changed routes or slugs for published content.
- **Prose styles leaking** into the injected `.workshop-block` (selectors not limited to direct children).
- **Broken `href`s**, missing `rel="noopener"` on `target="_blank"` links.
- **Copied logic:** workshop HTML, tracking parameters or author data duplicated instead of using `workshopBlockHtml()`, `trackedUrl()` or `authors`.

## Keep nits small

- At most **3 Nit** comments per review. Style preferences that Prettier or the existing code style already settle are not findings.
- Don't comment on German wording in article prose. That's the author's call.
- Label problems that existed before this change as **Pre-existing** and don't block on them.

## Skip

- `dist/`, `.astro/`, `node_modules/`, `package-lock.json` (except for unexpected new top-level packages)
- `src/content/agentic-coding-news/.obsidian/`
- `openspec/` wording (review only that it matches the code)

## Evidence

Every finding names **file and line** and states the concrete failure: which input or state leads to which wrong output. No finding without a failure scenario.

## Summary

Start with the number of findings by label, for example: `2 Important, 1 Nit, 0 Pre-existing`. If there is nothing to fix, say so in one line: `0 findings, nothing to do.`
