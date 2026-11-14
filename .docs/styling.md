# Styling

## Tokens

- All colors, fonts, type sizes, spacing and breakpoints are defined in `@theme` in `src/styles/global.css`. Use them as Tailwind utilities (`bg-surface-container`, `text-primary`, `font-label`, `gap-space-md`) or as CSS variables (`var(--color-primary)`).
- **No raw hex values in components.** Add a token first if one is missing.
- The site has a single dark theme. Don't add a light mode piecemeal.

## Fonts

| Role | Token | Font |
|---|---|---|
| Headlines | `font-headline`, `font-display` | Space Grotesk |
| Body | `font-body` | Plus Jakarta Sans |
| Labels, meta, code | `font-label` | JetBrains Mono |

Material Symbols icons are loaded in `Layout.astro`. In ads and anywhere the meaning matters, use text characters (✓, →) instead of icon ligatures, because the icon font can fail to load.

## Where styles go

- **Default: Tailwind utility classes in the markup.** All new styles go there, on block components and news pages alike. Example: the header images on the article page and overview.
- **Exception: named classes in `@layer components`** in `global.css`, only for HTML we don't write as Astro markup: Markdown prose (`.news-prose`) and the workshop block, which is generated as an HTML string (`.workshop-block*`). The existing `.news-*` classes stay; don't add new ones.
- `@layer components` keeps utilities able to override component styles. Don't use `!important` (the only exception is the code block background over Shiki's inline style).
- Prose rules target direct children (`.news-prose > ul`, `.news-prose > :not(.workshop-block) a`) so they don't leak into the injected workshop block.

## Layout

- **Mobile first.** Write the phone layout first, then add `min-width` media queries.
- **390px must work**: `document.documentElement.scrollWidth === 390`. Long content (tables, code) scrolls inside its own box, never the page.
- **Reading column:** `.news-sheet` is full width on phones and a centered 42rem card from a 44rem viewport up. No sidebars.
- Respect `prefers-reduced-motion`. The global rule in `global.css` already cuts animations, so don't override it.
- Hover effects are decoration. Only links and buttons get `cursor: pointer`.
