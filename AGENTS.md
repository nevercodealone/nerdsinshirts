## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Content & Page Authoring Rules

1. **Every content element is a block.** All page content lives in the frontmatter `blocks` array of a markdown file. Each block has a `type` discriminator plus typed props. The markdown body is not used for layout — only frontmatter.
2. **Pages are md files with clean properties.** Page content lives in `src/content/pages/**/*.md`, validated by the Zod schema in `src/content.config.ts`. Each md file has a companion `.astro` route in `src/pages/` that loads the entry and renders it via `BlockRenderer`.
3. **Adding a block type** requires three coordinated changes:
   - `src/components/blocks/<Name>.astro` — the block component accepting its props.
   - A new variant in the discriminated-union `blockSchema` in `src/content.config.ts`.
   - A new `case` in `src/components/blocks/BlockRenderer.astro`.
4. **Adding a page** requires two files:
   - `src/content/pages/<slug>.md` — frontmatter with `title`, optional `seo`, and `blocks`.
   - `src/pages/<slug>.astro` — loads the entry via `getEntry('pages', '<id>')` and renders `<BlockRenderer blocks={entry.data.blocks} />` inside `<Layout>`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
