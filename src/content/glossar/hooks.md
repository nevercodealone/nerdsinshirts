---
title: "Hooks in Claude Code und Codex einfach erklärt"
begriff: "Hooks"
kurzdefinition: "Hooks sind eigene Befehle, die der Coding Agent an festen Punkten seiner Arbeit ausführt, zum Beispiel vor oder nach einem Tool. So passieren bestimmte Dinge immer."
description: "Was Hooks in Claude Code und Codex sind, an welchen Punkten sie laufen, wie sie Aktionen blockieren und wo man sie einrichtet. Nach der offiziellen Doku."
pubDate: 2026-11-25
geprueft: 2026-11-25
author: roland-golla
anbieter: beide
doku:
  anthropic: "https://code.claude.com/docs/en/hooks-guide"
  openai: "https://learn.chatgpt.com/docs/hooks"
aliases:
  - "Hook"
  - "PreToolUse"
  - "PostToolUse"
verwandt:
  - skills
tags:
  - Glossar
  - Hooks
  - Claude Code
  - Codex
workshop: developer
tldr: "Hooks sind eigene Befehle, die Claude Code und Codex an festen Punkten ausführen, etwa vor einem Tool, nach einer Änderung oder am Ende einer Antwort. Anders als bei einer Anweisung im Prompt entscheidet nicht das Modell, ob es passiert. Ein Hook kann eine Aktion auch blockieren und dem Agent sagen, warum."
faq:
  - frage: "Was sind Hooks in Claude Code?"
    antwort: "Hooks sind Shell Befehle, die du selbst festlegst. Claude Code führt sie an bestimmten Punkten seines Ablaufs aus. Damit passieren bestimmte Dinge immer, statt dass das Modell entscheidet, ob es sie ausführt."
  - frage: "Wofür nutzt man Hooks?"
    antwort: "Die Doku nennt zum Beispiel Code nach jeder Änderung formatieren, Änderungen an geschützten Dateien blockieren, eine Benachrichtigung schicken, wenn Claude auf dich wartet, und nach einer Compaction wichtigen Kontext wieder einspielen."
  - frage: "Wie blockiert ein Hook eine Aktion?"
    antwort: "Der Hook beendet sich mit Exit Code 2 und schreibt den Grund nach stderr. Claude Code stoppt dann zum Beispiel den Tool Aufruf und gibt Claude den Grund als Rückmeldung. Exit Code 0 heißt, der Hook hat keine Einwände."
  - frage: "Wo richte ich Hooks ein?"
    antwort: "In Claude Code in den Settings, persönlich unter ~/.claude/settings.json oder fürs Projekt unter .claude/settings.json. Hooks können auch in Plugins, im Frontmatter eines Skills oder eines Subagents stecken."
  - frage: "Gibt es Hooks auch in Codex?"
    antwort: "Ja. Codex nennt Hooks ein Framework zur Erweiterung. Sie stehen in einer hooks.json Datei oder in der config.toml und laufen unter anderem bei SessionStart, PreToolUse, PostToolUse und Stop."
  - frage: "Reichen Hooks als Sicherheitsgrenze?"
    antwort: "Die Doku von OpenAI nennt Tool Hooks eine nützliche Leitplanke, aber keine vollständige Sicherheitsgrenze. Die Doku von Anthropic empfiehlt, harte Regeln über das Berechtigungssystem durchzusetzen."
sources:
  - title: "Automate actions with hooks, Claude Code Docs"
    url: "https://code.claude.com/docs/en/hooks-guide"
  - title: "Hooks, ChatGPT Learn"
    url: "https://learn.chatgpt.com/docs/hooks"
---

Hooks sind eigene Befehle, die ein Coding Agent an festen Punkten seiner Arbeit ausführt. Laut Doku von Anthropic geben sie dir deterministische Kontrolle: Bestimmte Aktionen passieren immer, statt dass das Sprachmodell entscheidet, ob es sie ausführt. Du nutzt Hooks, um Projektregeln durchzusetzen, wiederkehrende Aufgaben zu automatisieren und Claude Code mit deinen Werkzeugen zu verbinden.

Auch Codex hat Hooks. OpenAI beschreibt sie als Framework, mit dem man an bestimmten Stellen im Ablauf des Agents Skripte oder MCP Tools laufen lässt.

*Quellen: [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide), [Hooks](https://learn.chatgpt.com/docs/hooks)*

## So funktionieren Hooks

An bestimmten Punkten löst der Agent ein Ereignis aus, ein Event. Passt ein Hook zu diesem Event, läuft er.

1. **Event:** zum Beispiel `PreToolUse`, bevor ein Tool läuft.
2. **Matcher:** grenzt ein, wann der Hook greift, zum Beispiel nur bei `Edit|Write`, also wenn Dateien bearbeitet werden. Ohne Matcher läuft der Hook bei jedem Auftreten des Events.
3. **Eingabe:** Der Hook bekommt die Daten des Events als JSON über stdin, etwa den Namen des Tools und seine Argumente.
4. **Antwort:** Über den Exit Code sagt der Hook, wie es weitergeht.

| Exit Code | Bedeutung |
|---|---|
| 0 | Keine Einwände, es geht normal weiter |
| 2 | Aktion blockieren, der Grund steht in stderr und geht je nach Event als Rückmeldung an den Agent |

Für mehr Kontrolle kann ein Hook mit Exit Code 0 enden und JSON ausgeben, zum Beispiel um einen Tool Aufruf abzulehnen und dem Agent den Grund zu nennen.

*Quelle: [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)*

## Wofür man Hooks nutzt

Die Doku von Anthropic zeigt diese Beispiele:

| Ziel | Event |
|---|---|
| Benachrichtigung, wenn Claude auf dich wartet | `Notification` |
| Code nach jeder Änderung mit Prettier formatieren | `PostToolUse` mit Matcher `Edit\|Write` |
| Änderungen an `.env`, `package-lock.json` oder `.git/` blockieren | `PreToolUse` mit Matcher `Edit\|Write` |
| Nach einer Compaction wichtigen Kontext wieder einspielen | `SessionStart` mit Matcher `compact` |
| Änderungen an Einstellungen protokollieren | `ConfigChange` |
| Bestimmte Rückfragen automatisch erlauben | `PermissionRequest` |

*Quelle: [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)*

## Hooks in Claude Code

### Wichtige Events

| Event | Wann es auslöst |
|---|---|
| `SessionStart` | wenn eine Session startet oder fortgesetzt wird |
| `UserPromptSubmit` | wenn ein Prompt abgeschickt wird, bevor Claude ihn verarbeitet |
| `PreToolUse` | bevor ein Tool läuft, kann es blockieren |
| `PermissionRequest` | wenn ein Tool Aufruf eine Freigabe braucht |
| `PostToolUse` | nachdem ein Tool erfolgreich gelaufen ist |
| `Notification` | wenn Claude Code eine Benachrichtigung schickt |
| `SubagentStart`, `SubagentStop` | wenn ein Subagent startet oder fertig ist |
| `Stop` | wenn Claude mit der Antwort fertig ist |
| `PreCompact`, `PostCompact` | vor und nach einer Compaction |
| `SessionEnd` | wenn eine Session endet |

Die vollständige Liste steht in der Doku.

### Wo Hooks liegen

| Ort | Gilt für |
|---|---|
| `~/.claude/settings.json` | alle deine Projekte, nur auf deinem Rechner |
| `.claude/settings.json` | ein Projekt, kann committet werden |
| `.claude/settings.local.json` | ein Projekt, nicht für Git gedacht |
| Verwaltete Einstellungen | die ganze Organisation, von Admins gesteuert |
| Plugin, `hooks/hooks.json` | wenn das Plugin aktiv ist |
| Frontmatter eines [Skills](/glossar/skills/) | den Rest der Session, nachdem der Skill gestartet wurde |
| Frontmatter eines Subagents | solange der Subagent läuft |

Mit `/hooks` siehst du alle eingerichteten Hooks, sortiert nach Event.

### Arten von Hooks

Die meisten Hooks führen einen Shell Befehl aus. Daneben gibt es Hooks, die Daten an eine URL schicken, ein MCP Tool aufrufen oder ein Claude Modell entscheiden lassen. Letztere sind für Fälle gedacht, die Urteilsvermögen brauchen statt fester Regeln.

### Grenzen

- Ein `PostToolUse` Hook kann nichts rückgängig machen, das Tool ist schon gelaufen.
- Ein Hook, der `deny` zurückgibt, blockiert das Tool in jedem Berechtigungsmodus.
- Für harte Regeln empfiehlt die Doku das Berechtigungssystem.

*Quelle: [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide)*

## Hooks in Codex

### Wo Hooks liegen

Hooks stehen in einer `hooks.json` Datei oder als `[hooks]` Tabelle in der `config.toml`.

| Bereich | Pfad |
|---|---|
| Nutzer | `~/.codex/hooks.json` |
| Vertrauenswürdiges Projekt | `.codex/hooks.json` |
| System, macOS und Linux | `/etc/codex/hooks.json` |
| Plugins | standardmäßig `hooks/hooks.json` im Plugin |

### Events

Codex kennt unter anderem `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `PreToolUse`, `PermissionRequest`, `PostToolUse`, `PreCompact`, `PostCompact`, `SubagentStart`, `SubagentStop`, `Stop` und `Interrupt`.

### Ablauf

Ein Hook bekommt ein JSON Objekt über stdin. Exit Code 0 ohne Ausgabe heißt Erfolg. Exit Code 2 blockiert die Aktion, wenn das Event Blockieren unterstützt, der Grund steht in stderr.

### Besonderheiten

- Hooks sind standardmäßig aktiv.
- Hooks, die nicht zentral verwaltet werden, müssen geprüft und als vertrauenswürdig markiert werden, bevor sie laufen. Ändert sich ein Hook, ist eine neue Prüfung nötig.
- OpenAI nennt Tool Hooks eine nützliche Leitplanke, aber keine vollständige Sicherheitsgrenze.

*Quelle: [Hooks](https://learn.chatgpt.com/docs/hooks)*

## Abgrenzung

| Begriff | Unterschied zum Hook |
|---|---|
| [Skills](/glossar/skills/) | Der Agent nutzt einen Skill, wenn er zur Aufgabe passt. Ein Hook läuft immer, wenn sein Event auslöst |
| CLAUDE.md | Anweisungen, die das Modell lesen und befolgen soll. Ein Hook wird ausgeführt, egal was das Modell entscheidet |
| Berechtigungen | Laut Doku der richtige Ort für harte Erlauben und Verbieten Regeln |

*Quellen: [Automate actions with hooks](https://code.claude.com/docs/en/hooks-guide), [Extend Claude with skills](https://code.claude.com/docs/en/skills)*

## Fazit

Mit Hooks passieren bestimmte Dinge immer, statt dass das Modell entscheidet, ob es sie ausführt. Claude Code und Codex nutzen dafür ähnliche Events und blockieren beide mit Exit Code 2.

Wir verfolgen die Neuigkeiten rund um Agentic Coding laufend. Was wir dabei lernen, testen wir zuerst in eigenen Side Projects. Was sich bewährt, bringen wir in Kundenprojekte und in unsere Workshops. Wenn ihr Hooks und Leitplanken für Agents in eurem Team aufbauen wollt, schaut euch gern den [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer) an.
