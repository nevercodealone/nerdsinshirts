# AGENTS.md

nerdsinshirts.de: Astro 7 static site with the start page and Agentic Coding News. **All rules are in [`.docs/`](.docs/README.md).** Read the file for the area you're changing.

## Checks you must run and show

```
npm run check            # 0 errors, 0 warnings, 0 hints
npm run build            # must pass, CI blocks the deploy otherwise
npx astro dev --background   # dev server, always in background mode (status | logs | stop)
```

UI changes also need screenshots at 390px and 1440px with no horizontal scroll. Details: [.docs/workflow.md](.docs/workflow.md).

## Hard rules

1. No invented content. Text comes from content files, `src/data/workshops.ts` or fixed UI labels, and never includes prices. See [.docs/content.md](.docs/content.md).
2. Pages are frontmatter blocks. Articles are the only exception (prose in the body). See [.docs/pages-and-blocks.md](.docs/pages-and-blocks.md) and [.docs/agentic-coding-news.md](.docs/agentic-coding-news.md).
3. Every new field goes into the Zod schema in `src/content.config.ts` first.
4. Never write article prose or set `draft: false` unless Roland asks.
5. Commit and push only when asked. One-line commit messages, no Co-Authored-By.
6. Show evidence before calling something done. Risk tiers and review rules are in [.docs/agents.md](.docs/agents.md), and the review checklist is in [REVIEW.md](REVIEW.md).

## Astro docs

https://docs.astro.build: [routing](https://docs.astro.build/en/guides/routing/), [components](https://docs.astro.build/en/basics/astro-components/), [content collections](https://docs.astro.build/en/guides/content-collections/), [styling](https://docs.astro.build/en/guides/styling/)
