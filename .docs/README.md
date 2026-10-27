# Project rules

Rules for everyone working on nerdsinshirts.de, human or agent. Read the file for the area you're touching before changing it.

| File | Covers |
|---|---|
| [architecture.md](architecture.md) | Stack, folder map, how a request becomes a page |
| [pages-and-blocks.md](pages-and-blocks.md) | Block based pages (start page and future pages) |
| [agentic-coding-news.md](agentic-coding-news.md) | Articles, Obsidian vault, frontmatter, workshop ads |
| [content.md](content.md) | What text may appear on the site and where it comes from |
| [styling.md](styling.md) | Tokens, fonts, layout, mobile first |
| [seo.md](seo.md) | Meta tags, structured data, sitemap, RSS, llms.txt |
| [workflow.md](workflow.md) | Dev server, checks, verification, git, deploy, specs |
| [agents.md](agents.md) | How agents prove their work, review rounds, risk tiers |
| [../REVIEW.md](../REVIEW.md) | Checklist for AI code review |

## Golden rules

1. **No invented content.** Every visible sentence comes from a content file, `src/data/workshops.ts` or a fixed UI label. No placeholder text, no made-up facts, no prices.
2. **Content lives in Markdown frontmatter, code renders it.** Don't hardcode copy in components.
3. **One source per thing.** Workshop facts live in `workshops.ts`, the workshop block HTML in `workshopBlockHtml()`, author data in `authors`. Reuse them, don't copy them.
4. **Mobile first.** Every page works at 390px with no horizontal scroll before it's done.
5. **The build is the gate.** `npm run check` (0 errors, 0 warnings) and `npm run build` must pass. CI runs both and blocks the deploy.
6. **Schema before content.** A new field goes into the Zod schema in `src/content.config.ts` first. A broken file must fail the build, not render half.
7. **Roland ships articles.** Agents never write article prose or set `draft: false` unless Roland asks.
