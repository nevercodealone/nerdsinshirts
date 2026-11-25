# Workflow

## Dev server

Always run it in background mode:

```
npx astro dev --background
npx astro dev status | logs | stop
```

- Restart it after changing `src/content.config.ts` or `astro.config.mjs`. Schema changes are not picked up live.
- Restart it after removing Tailwind classes. It can keep serving the old CSS rules.
- Take the port from `npx astro dev status`. It is not always 4321.

## Checks (must pass before every commit)

```
npm run check    # astro check: 0 errors, 0 warnings, 0 hints
npm run build    # static build into dist/
```

CI (`.github/workflows/deploy.yml`) runs `npm ci`, `npm run check` and `npm run build` on every push to `main`. A failure blocks the deploy.

## Verify UI changes

- Screenshots at **390px** and **1440px** (headless Chrome works: `google-chrome --headless=new --window-size=390,900 --screenshot=...`).
- Measure horizontal overflow: `document.documentElement.scrollWidth` must equal the viewport width.
- Wait for images before taking a screenshot. The dev server optimizes them on first load, which can take a few seconds.
- **Hover styles:** headless Chrome reports `(hover: hover)` as false, so CSS inside `@media (hover: hover)` (the glossary tooltip) doesn't apply. Start Chrome with `--blink-settings=primaryHoverType=2,availableHoverTypes=2,primaryPointerType=4,availablePointerTypes=4` to test it.
- For content changes, confirm in `dist/` that the new article or term is built and listed in the sitemap (articles also in RSS).
- Test files (sample articles, helper pages in `public/`) are temporary. Delete them before committing.

## Git: commit and push

### When

| Roland says | Agent does |
|---|---|
| "commit" | Checks, then commit. No push. |
| "push", "make it live", "all set to live", "commit and push" | Checks, commit, push to `origin` (rogoit). Roland opens the PR and deploys. |
| Nothing | Nothing. Leave changes uncommitted and say so. |

### How to commit

1. **Run the checks first**: `npm run check` (0 errors, 0 warnings, 0 hints) and `npm run build`. If either fails, don't commit; report the failure.
2. **Clean up** temporary test files (sample articles, helper pages in `public/`) and confirm they're gone with `git status`.
3. **Group by task, single files**: one commit per concern (spec, feature code, article content, start page, docs) and one file per commit where possible. Split a file across commits (stage a partial version) when it has changes for two concerns.
4. **Message:** one simple line, English, imperative, starts with a capital letter, ends with a full stop, no body, **no Co-Authored-By or other trailer**. Examples:
   - `Add article on testing AI generated code.`
   - `Document pubDate rule for new articles.`
5. **Author:** `Roland Golla <rolandgolla@gmail.com>`. Git has no global identity on Roland's machine, so pass it per commit without changing the git config:
   ```
   git -c "user.name=Roland Golla" -c user.email=rolandgolla@gmail.com commit -m "<one line>"
   ```
6. Work on `main`. No force push, no rewriting pushed history, no `--no-verify`.

### How to push

| Remote | Repo | Who |
|---|---|---|
| `origin` | `rogoit/nerdsinshirts` (fork) | Agents push here, and only here. |
| upstream | `nevercodealone/nerdsinshirts` | Deploys nerdsinshirts.de. Roland opens and merges the PR from `rogoit/main`. |

1. `git push origin main`, as its own command, not chained to the commits.
2. Report the commit hashes and the push range. Don't open PRs, don't push upstream, and don't poll the live site. A push to the fork doesn't deploy, so never say something is live.
3. If the permission system blocks the push, don't work around it. Report the commits and ask Roland to run `! git push origin main`.

### Publishing content ("make it live")

There is no draft state. An article or glossary term is published by adding its file and pushing.

1. Add the files (see [intake](agentic-coding-news.md#intake-from-downloads)). Glossary terms go in together with the article that links to them.
2. Run the checks, and confirm the content is in `dist/` and the sitemap (articles also in the RSS feed).
3. Commit: `Add article on <topic>.` or `Add glossary term <term>.` The header image gets its own commit. Then push to `origin`.
4. Roland opens the PR and deploys. After that, he runs the Google Rich Results Test on the URL.

## Specs (OpenSpec)

- Larger changes start as a change folder in `openspec/changes/<change-id>/`: `proposal.md`, `design.md`, `tasks.md`, `specs/<capability>/spec.md`.
- Tick `tasks.md` as work lands. If the implementation differs from the spec, update the spec in the same commit.
- Small fixes don't need a spec.

## Docs

- Rules live in `.docs/`. `AGENTS.md` is only the entry point.
- When you change how something works, update the matching `.docs` file in the same commit.
