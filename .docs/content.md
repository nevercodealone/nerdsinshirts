# Content rules

## Where text may come from

| Source | What |
|---|---|
| `src/content/**/*.md` | All page and article copy |
| `src/data/workshops.ts` | Workshop titles, trainers, intros, formats, learning goals |
| `authors` in `src/lib/agentic-coding-news.ts` | Author names and profile links |
| Components | Fixed UI labels only: "Häufige Fragen", "Quellen", "> kurz gesagt", "Glossar", "Begriffe in diesem Artikel", "In unseren Artikeln", "Verwandte Begriffe", "Offizielle Doku von …", provider names ("Claude Code", "Codex"), breadcrumb and navigation labels, the two empty states ("Die ersten Artikel erscheinen in Kürze.", "Die ersten Begriffe erscheinen in Kürze."), aria labels |

Anything else is invented content and not allowed.

## Rules

- **A new fixed UI label** is added to the list above in the same change.
- **No placeholders.** If an optional field is empty, omit the element. Never render "Lorem", "TBD" or a default sentence.
- **Workshop facts** in `workshops.ts` are taken word for word or nearly from the NCA workshop pages:
  - Developer: https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer
  - Alle Abteilungen: https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-alle-abteilungen

  When those pages change, update `workshops.ts`. **No prices**, ever.
- **Language:** German for all visible content (`<html lang="de">`). Use German quotation marks („…“) in templates.
- **Names:** "Nerds in Shirts", "Never Code Alone" (NCA), "NCA KI Workshop für Developer", "NCA KI Workshop für alle Abteilungen", "Benjamin Klein", "Roland Golla".
- **Contact:** `nerdsinshirts@nevercodealone.de`.
- **Pronouns:** don't assume them for people quoted in articles. Write around them or use names.
