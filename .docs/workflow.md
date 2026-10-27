# Workflow

## Dev server

Always run it in background mode:

```
npx astro dev --background
npx astro dev status | logs | stop
```

Restart it after changing `src/content.config.ts` or `astro.config.mjs`. Schema changes are not picked up live.

## Checks (must pass before every commit)

```
npm run check    # astro check: 0 errors, 0 warnings, 0 hints
npm run build    # static build into dist/
```

CI (`.github/workflows/deploy.yml`) runs `npm ci`, `npm run check` and `npm run build` on every push to `main`. A failure blocks the deploy.

## Verify UI changes

- Screenshots at **390px** and **1440px** (headless Chrome works: `google-chrome --headless=new --window-size=390,900 --screenshot=...`).
- Measure horizontal overflow: `document.documentElement.scrollWidth` must equal the viewport width.
- For news changes, also check a draft in dev and confirm in `dist/` that drafts are absent from pages, RSS, sitemap and `llms.txt`.
- Test files (sample articles, helper pages in `public/`) are temporary. Delete them before committing.

## Git

- Work on `main`. Commit only when asked.
- **One line commit messages, no body, no Co-Authored-By trailer.**
- Group commits by concern, for example spec, feature, content, start page. Split a file across commits when it has changes for two concerns.
- Push only when asked. A push to `main` deploys to nerdsinshirts.de in about 2 minutes.

## Specs (OpenSpec)

- Larger changes start as a change folder in `openspec/changes/<change-id>/`: `proposal.md`, `design.md`, `tasks.md`, `specs/<capability>/spec.md`.
- Tick `tasks.md` as work lands. If the implementation differs from the spec, update the spec in the same commit.
- Small fixes don't need a spec.

## Docs

- Rules live in `.docs/`. `AGENTS.md` is only the entry point.
- When you change how something works, update the matching `.docs` file in the same commit.
