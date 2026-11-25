---
title: "Skills in Claude Code und Codex einfach erklärt"
begriff: "Skills"
kurzdefinition: "Ein Skill ist ein Ordner mit einer SKILL.md Datei, in der Anweisungen stehen, dazu optional Skripte und weitere Dateien. Der Agent nutzt ihn, wenn er zur Aufgabe passt."
description: "Was Skills in Claude Code und Codex sind, wie sie aufgebaut sind, wo sie liegen und wie der Agent entscheidet, wann er sie lädt. Nach der offiziellen Doku."
pubDate: 2026-11-25
geprueft: 2026-11-25
author: roland-golla
anbieter: beide
doku:
  anthropic: "https://code.claude.com/docs/en/skills"
  openai: "https://learn.chatgpt.com/docs/build-skills"
aliases:
  - "Skill"
  - "Agent Skills"
  - "SKILL.md"
verwandt:
  - hooks
tags:
  - Glossar
  - Skills
  - Claude Code
  - Codex
workshop: developer
tldr: "Ein Skill ist ein Ordner mit einer SKILL.md Datei. Darin stehen Anweisungen, dazu können Skripte, Vorlagen und Referenzen kommen. Der Agent sieht zuerst nur Name und Beschreibung und lädt den Rest erst, wenn er den Skill braucht. Claude Code und Codex setzen dafür auf denselben offenen Standard."
faq:
  - frage: "Was ist ein Skill in Claude Code?"
    antwort: "Ein Skill ist eine SKILL.md Datei mit Anweisungen in einem eigenen Ordner. Claude nimmt ihn in seinen Werkzeugkasten auf, nutzt ihn, wenn er passt, und du kannst ihn auch direkt mit /skill-name starten."
  - frage: "Sind Skills nur Markdown Dateien?"
    antwort: "Nein. Pflicht ist nur die SKILL.md. Im selben Ordner können aber auch Referenzdateien, Beispiele und Skripte liegen. Skripte werden ausgeführt, nicht in den Kontext geladen."
  - frage: "Woher weiß der Agent, wann er einen Skill nutzen soll?"
    antwort: "Aus der Beschreibung im Frontmatter. Name und Beschreibung sind immer im Kontext. Den vollen Inhalt lädt der Agent erst, wenn er den Skill einsetzt. Die Doku nennt das Progressive Disclosure."
  - frage: "Was ist der Unterschied zwischen einem Skill und CLAUDE.md?"
    antwort: "Der Inhalt von CLAUDE.md ist immer im Kontext. Der Inhalt eines Skills wird nur geladen, wenn er gebraucht wird. Lange Referenzen kosten so fast nichts, bis man sie braucht."
  - frage: "Gibt es Skills auch in Codex?"
    antwort: "Ja. Auch in Codex ist ein Skill ein Ordner mit einer SKILL.md Datei, optional mit Skripten, Referenzen und Assets. Starten lässt er sich über /skills oder mit $ und dem Namen des Skills."
  - frage: "Wie teile ich Skills mit meinem Team?"
    antwort: "In Claude Code legst du den Skill im Projekt unter .claude/skills ab und committest ihn. Für mehrere Projekte packst du Skills in ein Plugin und verteilst es über einen Marketplace. In Codex liegen Repo Skills unter .agents/skills, für die Verteilung darüber hinaus gibt es ebenfalls Plugins."
sources:
  - title: "Extend Claude with skills, Claude Code Docs"
    url: "https://code.claude.com/docs/en/skills"
  - title: "Build skills, ChatGPT Learn"
    url: "https://learn.chatgpt.com/docs/build-skills"
---

Ein Skill erweitert, was ein Coding Agent kann. Du legst eine Datei `SKILL.md` mit Anweisungen an, und der Agent nimmt sie in seinen Werkzeugkasten auf. Er nutzt den Skill, wenn er zur Aufgabe passt. Du kannst ihn auch selbst starten. Claude Code und Codex arbeiten beide mit Skills und bauen auf denselben offenen Standard auf, [Agent Skills](https://agentskills.io).

Laut Doku von Anthropic lohnt sich ein Skill, wenn du dieselben Anweisungen immer wieder in den Chat kopierst oder wenn ein Abschnitt in deiner CLAUDE.md eigentlich schon ein Ablauf ist.

*Quelle: [Extend Claude with skills](https://code.claude.com/docs/en/skills)*

## So funktionieren Skills

Ein Skill ist ein Ordner. Pflicht ist nur die Datei `SKILL.md`. Sie enthält oben ein Frontmatter in YAML und darunter die Anweisungen. Daneben können weitere Dateien liegen.

```text
my-skill/
├── SKILL.md        Pflicht, Überblick und Navigation
├── reference.md    ausführliche Doku, wird bei Bedarf geladen
├── examples.md     Beispiele, werden bei Bedarf geladen
└── scripts/
    └── helper.py   Hilfsskript, wird ausgeführt, nicht geladen
```

Die Doku rät, die `SKILL.md` unter 500 Zeilen zu halten und ausführliche Referenzen in eigene Dateien auszulagern, auf die die `SKILL.md` verweist.

### Progressive Disclosure

Der Agent lädt nicht alles auf einmal. Die Beschreibung jedes Skills ist immer im Kontext. Den vollen Inhalt lädt er erst, wenn er den Skill einsetzt. Weitere Dateien im Ordner holt er nur, wenn er sie braucht. Im Unterschied zu CLAUDE.md kostet ein langer Skill deshalb fast nichts, solange er nicht gebraucht wird.

Deshalb ist die Beschreibung so wichtig. An ihr entscheidet der Agent, ob ein Skill zur Aufgabe passt. Die Doku empfiehlt, den wichtigsten Einsatzfall an den Anfang zu stellen.

### Automatisch oder von Hand

| Aufruf | Was passiert |
|---|---|
| Automatisch | Der Agent lädt den Skill, wenn die Anfrage zur Beschreibung passt |
| Von Hand | Du tippst `/skill-name` am Anfang deiner Nachricht |

Über das Frontmatter lässt sich das steuern. Mit `disable-model-invocation: true` startet nur noch der Mensch den Skill. Mit `user-invocable: false` verschwindet er aus dem Menü, und nur der Agent nutzt ihn.

*Quelle: [Extend Claude with skills](https://code.claude.com/docs/en/skills)*

## Wofür man Skills nutzt

Die Doku von Anthropic unterscheidet zwei Arten von Inhalt:

- **Referenz:** Wissen, das der Agent bei der Arbeit braucht, zum Beispiel wie eine API richtig benutzt wird.
- **Aufgabe:** ein Ablauf, den der Agent Schritt für Schritt abarbeitet, zum Beispiel ein Deployment.

Ein Beispiel aus der Doku ist ein Skill `deploy`, der nur von Hand gestartet wird. Er lässt die Tests laufen, baut die Anwendung, schiebt sie auf das Zielsystem und prüft, ob das Deployment geklappt hat.

Claude Code bringt außerdem eigene Skills mit, zum Beispiel `/code-review`, `/debug` und `/loop`.

*Quelle: [Extend Claude with skills](https://code.claude.com/docs/en/skills)*

## Skills in Claude Code

### Wo Skills liegen

| Bereich | Pfad | Gilt für |
|---|---|---|
| Persönlich | `~/.claude/skills/<skill-name>/SKILL.md` | alle deine Projekte auf diesem Rechner |
| Projekt | `.claude/skills/<skill-name>/SKILL.md` | dieses Repository, per Commit für das ganze Team |
| Plugin | `<plugin>/skills/<skill-name>/SKILL.md` | überall, wo das Plugin aktiv ist |
| Enterprise | im Verzeichnis der verwalteten Einstellungen | alle Nutzer, an die die Organisation ihn verteilt |

Haben zwei Skills denselben Namen, gilt Enterprise vor persönlich und persönlich vor Projekt. Skills aus Plugins bekommen den Plugin Namen als Präfix, zum Beispiel `/plugin-name:skill-name`.

### Wichtige Felder im Frontmatter

Alle Felder sind optional. Empfohlen ist `description`.

| Feld | Bedeutung |
|---|---|
| `name` | Name im Menü, sonst der Ordnername |
| `description` | Was der Skill macht und wann er passt |
| `disable-model-invocation` | `true` heißt, nur der Mensch startet ihn |
| `user-invocable` | `false` heißt, er erscheint nicht im Menü |
| `allowed-tools` | Tools, die der Skill ohne Rückfrage nutzen darf |
| `context` | `fork` startet den Skill in einem eigenen Subagent |
| `hooks` | [Hooks](/glossar/hooks/), die beim Start des Skills registriert werden |
| `paths` | Skill nur bei passenden Dateien automatisch aktiv |

### Mehr als Text

Ein Skill kann vor der Ausführung Befehle laufen lassen und deren Ausgabe in den Text einsetzen, zum Beispiel den Diff eines Pull Requests. Schlägt so ein Befehl fehl, bricht der ganze Skill ab.

### Skills und Slash Commands

Eigene Slash Commands sind in Skills aufgegangen. Eine Datei unter `.claude/commands/deploy.md` und ein Skill unter `.claude/skills/deploy/SKILL.md` erzeugen beide `/deploy` und funktionieren gleich. Alte Command Dateien laufen weiter. Skills bringen zusätzlich einen Ordner für weitere Dateien, die Steuerung, wer sie starten darf, und das automatische Laden mit.

*Quelle: [Extend Claude with skills](https://code.claude.com/docs/en/skills)*

## Skills in Codex

Laut Doku von OpenAI bündelt ein Skill Anweisungen, Ressourcen und optional Skripte, damit ein Ablauf zuverlässig gelingt. Die Doku gilt für ChatGPT und Codex.

### Aufbau

Pflicht ist die `SKILL.md` mit `name` und `description`. Die Beschreibung soll sagen, wann der Skill greifen soll und wann nicht. Optional kommen die Ordner `scripts/`, `references/` und `assets/` dazu, außerdem `agents/openai.yaml` für Darstellung, Aufrufregeln und Abhängigkeiten von Tools.

### Wo Skills liegen

| Bereich | Pfad |
|---|---|
| Repository | `.agents/skills` im aktuellen Ordner, in Elternordnern bis zur Wurzel des Repos und in der Wurzel selbst |
| Nutzer | `$HOME/.agents/skills` |
| Admin | `/etc/codex/skills` |
| System | wird mit Codex mitgeliefert, zum Beispiel `skill-creator` und `skill-installer` |

### Progressive Disclosure in Codex

Codex sieht zuerst nur Name, Beschreibung und Dateipfad jedes Skills. Die volle `SKILL.md` lädt es erst, wenn es den Skill nutzen will.

### Aufrufen, erstellen, teilen

- **Aufrufen:** In der CLI und der IDE Extension mit `/skills` oder mit `$` und dem Namen des Skills.
- **Erstellen:** mit dem eingebauten `$skill-creator`, aus einem vorgeführten Ablauf oder von Hand als Ordner mit `SKILL.md`.
- **Installieren:** mit `$skill-installer` und dem Namen des Skills.
- **Teilen:** Für mehr als ein Repository werden Skills als Plugins verpackt.

*Quelle: [Build skills](https://learn.chatgpt.com/docs/build-skills)*

## Abgrenzung

| Begriff | Unterschied zum Skill |
|---|---|
| CLAUDE.md | immer im Kontext, ein Skill nur bei Bedarf |
| Slash Command | in Claude Code in Skills aufgegangen, ein Skill kann zusätzlich Dateien mitbringen und automatisch geladen werden |
| [Hooks](/glossar/hooks/) | laufen fest an bestimmten Punkten, ein Skill wird genutzt, wenn er zur Aufgabe passt |

*Quellen: [Extend Claude with skills](https://code.claude.com/docs/en/skills), [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)*

## Fazit

Skills sind in Claude Code und Codex der Weg, Wissen und Abläufe so abzulegen, dass der Agent sie erst lädt, wenn er sie braucht. Beide setzen auf denselben offenen Standard. Pfade und Aufruf unterscheiden sich, das Prinzip ist gleich.

Wir verfolgen die Neuigkeiten rund um Agentic Coding laufend. Was wir dabei lernen, testen wir zuerst in eigenen Side Projects. Was sich bewährt, bringen wir in Kundenprojekte und in unsere Workshops. Wenn ihr Skills in eurem Team aufbauen wollt, schaut euch gern den [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer) an.
