# Working with agents

How we let coding agents (Claude Code and others) work on this repo. The rules follow the practices the Claude Code team describes in "How the Claude Code Team Does Code Review" (Claude Developer Blog, Oct 2026), which is also the source of our article `src/content/agentic-coding-news/claude-code-team-code-review.md`.

The question is not "did a human read every line?" but "what can go wrong with this change, and which check catches it?"

## Layer 1: The agent proves its own work

An agent is not done when it says it is done. It is done when it has **run the checks and shown the output**.

| Check | Command or method | Required when |
|---|---|---|
| Types and schema | `npm run check` (0 errors, 0 warnings, 0 hints) | Every change |
| Build | `npm run build` | Every change |
| Visual | Screenshots at 390px and 1440px | Any UI or CSS change |
| Overflow | `document.documentElement.scrollWidth` equals viewport width | Any UI or CSS change |
| Drafts | Draft absent from `dist/`, RSS, sitemap, `llms.txt` | News changes |
| Rich results | Google Rich Results Test on the live URL | After a new article ships |

- **Report evidence, not claims.** Paste the check result and name what was looked at in the screenshots. "Should work" is not a result.
- **Report failures as failures.** If a check fails or was skipped, say so plainly.
- **Fresh eyes.** For non-trivial changes, run a second review pass without the first pass's context: `/code-review` locally, or a separate agent that sees only the diff.

## Layer 2: Review

- Run `/code-review` before handing over a larger change, and `/security-review` when the change touches scripts, third-party embeds, forms or the CI workflow.
- The reviewer follows [`REVIEW.md`](../REVIEW.md).
- Every finding gets an answer: a fix, or one sentence explaining why not.
- **At most 3 review rounds.** If the third round still finds real problems, stop and rethink the approach instead of patching again. After the first round, review only the new changes.
- **Fix recurring findings at the source.** If the same finding shows up twice, turn it into a rule in `.docs/`, a schema rule in `content.config.ts`, or a check, so it can't come back.

## Layer 3: Risk decides how much a human looks

The change decides the tier, not the author.

| Risk | Examples here | Human approval |
|---|---|---|
| Low | Typos in docs, `.docs/` updates, CSS tweaks inside one news component | None if all checks pass and evidence was shown |
| Medium | New component or block, schema changes, start page copy, workshop data, a new article | Roland looks at screenshots and the diff |
| High | `.github/workflows/`, `astro.config.mjs`, `Layout.astro` (Matomo, meta tags), dependencies, `public/CNAME`, anything that changes URLs | Roland reviews before commit and push |

- **Agent approval is not human approval.**
- **Whoever runs the agent owns the change**, as if they had typed it.
- **An approval covers exactly one state.** New commits after approval need a new look.
- When unsure of the tier, pick the higher one.

## What stays with humans

- Whether something should be built at all.
- Article prose and the decision to publish (`draft: false`).
- Workshop facts and anything that reads as a promise to customers.
- CI, deploy and domain configuration.
- Reading the evidence: check output, screenshots, findings.

## Context for agents

- `AGENTS.md` stays short: the checks, the hard rules, and links to `.docs/`. Details go in the topic files.
- When an agent learns something non-obvious about the project, it goes into the matching `.docs` file, not into a chat.
