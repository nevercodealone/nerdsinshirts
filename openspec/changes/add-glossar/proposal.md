# Add Glossar

## Why

The Agentic Coding News stay close to their source. Basics such as "Skills" or "Hooks" need a place of their own, explained in German and backed only by the official docs of Anthropic and OpenAI.

## What changes

- New collection `glossar` (`src/content/glossar/<slug>.md`) with the routes `/glossar/` and `/glossar/<slug>/`.
- Articles get the optional field `begriffe` and a box "Begriffe in diesem Artikel".
- Links to `/glossar/<slug>/` in article and glossary prose get a dotted underline and a tooltip with the short definition.
- "Glossar" in the main navigation and the footer.
- Structured data: `DefinedTermSet`, `DefinedTerm`, `BreadcrumbList`, `FAQPage`.

The full spec is in [specs/glossar/spec.md](specs/glossar/spec.md).

## Differences from the spec

- **No OG image per term.** Glossary pages use the default site image (Roland, 2026-11-25: no image handling in version 1).
- **Tooltip without JavaScript.** It is CSS only, shown for devices that can hover, and not inside tables.
- **No provider filter on the overview** (Roland, 2026-11-25). The provider badges on the cards stay.
