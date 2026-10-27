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

## Git: commit and push

### When

| Roland says | Agent does |
|---|---|
| "commit" | Checks, then commit. No push. |
| "push", "make it live", "commit and push" | Checks, commit, push to `origin` (rogoit). Roland opens the PR and deploys. |
| Nothing | Nothing. Leave changes uncommitted and say so. |

### How to commit

1. **Run the checks first**: `npm run check` (0 errors, 0 warnings, 0 hints) and `npm run build`. If either fails, don't commit; report the failure.
2. **Clean up** temporary test files (sample articles, helper pages in `public/`) and confirm they're gone with `git status`.
3. **Group by concern**, one commit each: spec, feature code, article content, start page, docs. Split a file across commits (stage a partial version) when it has changes for two concerns.
4. **Message:** one line, English, imperative, no trailing period, no body, **no Co-Authored-By or other trailer**. Examples:
   - `Add article on testing AI generated code`
   - `Document pubDate rule for new articles`
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

1. `git push origin main`.
2. Report the commit hashes and the push range. Don't open PRs, don't push upstream, and don't poll the live site. A push to the fork doesn't deploy, so never say something is live.

### Publishing an article ("make it live")

1. `draft: false` in the article. `pubDate` stays the day the file was added (see [agentic-coding-news.md](agentic-coding-news.md)).
2. Run the checks, and confirm the article is in `dist/`, the RSS feed, the sitemap and `llms.txt`.
3. Commit with `Add article on <topic>` (or `Publish article on <topic>` if it was committed as a draft before), then push to `origin`.
4. Roland opens the PR and deploys. After that, he runs the Google Rich Results Test on the URL.

## Specs (OpenSpec)

- Larger changes start as a change folder in `openspec/changes/<change-id>/`: `proposal.md`, `design.md`, `tasks.md`, `specs/<capability>/spec.md`.
- Tick `tasks.md` as work lands. If the implementation differs from the spec, update the spec in the same commit.
- Small fixes don't need a spec.

## Docs

- Rules live in `.docs/`. `AGENTS.md` is only the entry point.
- When you change how something works, update the matching `.docs` file in the same commit.
