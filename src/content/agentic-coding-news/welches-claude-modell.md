---
title: "Welches Claude Modell wofür, der Leitfaden von Addy Osmani"
description: "Fable, Opus, Sonnet oder Haiku? Addy Osmani erklärt, welches Claude Modell zu welcher Aufgabe passt und wann Effort statt Modellwechsel hilft."
pubDate: 2026-11-19
author: roland-golla
tags:
  - Claude Code
  - Modellwahl
  - Effort
  - Subagents
  - Fable 5.2
  - Opus 5.5
draft: false
workshop: developer
image: ./_bilder/welches-claude-modell-header.jpg
imageAlt: "Grünes Aquarell Comic bei Nacht in der Boxengasse, Roboter Fable 5.2 am Kommandostand, Boxencrew Haiku 5.5 am Wagen Opus 5.5, dahinter Sonnet 5.5 und jubelnde Fans"
tldr: "Starte mit Opus 5.5 auf medium. Geh für klar umrissene Arbeit runter auf Sonnet oder Haiku und für die härtesten Projekte hoch auf Fable 5.2. Dreh vor jedem Modellwechsel erst am Effort."
quoteText: "The quick answer is that you should start most work on Opus 5.5 at its default effort level, medium."
quoteAuthor: "Addy Osmani"
quoteRole: "Claude Code Team, Anthropic"
quoteUrl: "https://claude.dev/blog/which-claude-model-should-you-build-with/"
faq:
  - question: "Mit welchem Claude Modell sollte ich anfangen?"
    answer: "Mit Opus 5.5 auf dem Standard Effort medium. Es ist das Standardmodell in Claude Code und laut Addy Osmani der Startpunkt für die meiste Coding und Wissensarbeit."
  - question: "Wann lohnt sich Fable 5.2?"
    answer: "Für die härtesten technischen Projekte, große Refactorings und Migrationen, Architekturplanung und das Führen vieler Subagents. Außerdem, wenn Opus 5.5 auf high nicht reicht, und für lange Läufe ohne Aufsicht."
  - question: "Soll ich zuerst das Modell oder den Effort ändern?"
    answer: "Zuerst den Effort. Er ist der feinere Regler. Oberhalb von high kann eine Stufe mehr so viel kosten wie ein größeres Modell. Dann lohnt es sich, das nächstgrößere Modell auf niedrigerem Effort zu testen."
  - question: "Was tun, wenn ein Modell eine Aufgabe nicht schafft?"
    answer: "In dieser Reihenfolge: Erst sicherstellen, dass das Modell seine Arbeit prüfen kann, etwa mit einem Test oder Build. Dann den Effort eine Stufe erhöhen. Erst danach zum nächstgrößeren Modell wechseln."
  - question: "Welches Modell gehört in Subagents?"
    answer: "Für Aufgaben, bei denen ein Fehler leicht auffällt, also Dateien suchen, Tests laufen lassen oder Logs lesen, reichen Haiku 5.5 oder Sonnet 5.5. Code Änderungen und Entscheidungen bleiben beim Hauptmodell."
  - question: "Was passiert beim Modellwechsel mitten in einer Session?"
    answer: "Der Prompt Cache gehört dem Modell, das ihn geschrieben hat. Der erste Turn auf dem neuen Modell muss die ganze Unterhaltung neu in den Cache schreiben. Deshalb vorher /compact ausführen oder eine neue Session mit einem kurzen Plan starten."
sources:
  - title: "Which Claude model should you build with? Fable, Opus, Sonnet, or Haiku"
    url: "https://claude.dev/blog/which-claude-model-should-you-build-with/"
  - title: "ClaudeDevs auf X"
    url: "https://x.com/ClaudeDevs/status/2119898687803621427"
---

Addy Osmani arbeitet im Claude Code Team bei Anthropic. Im claude.dev Blog hat er einen Leitfaden geschrieben, welches Claude Modell zu welcher Aufgabe passt. Seine Kernaussage: Fang fast alles mit Opus 5.5 auf medium an. Wechsle das Modell erst, wenn ein höherer Effort nicht reicht.

## So wählt Addy Osmani, Claude Code Team bei Anthropic, das richtige Modell

Es gibt vier allgemein verfügbare Modelle: Haiku 5.5, Sonnet 5.5, Opus 5.5 und Fable 5.2. Addy beschreibt sie so:

| Modell | Gebaut für | Tempo |
|---|---|---|
| Haiku 5.5 | Viele kleine Aufgaben, bei denen es auf Kosten ankommt | am schnellsten |
| Sonnet 5.5 | Schnelle Hilfe bei klar umrissenen Aufgaben | schnell |
| Opus 5.5 | Der Alltagsmotor für komplexes Coding und Wissensarbeit | mittel |
| Fable 5.2 | Die ehrgeizigste, offenste technische Arbeit | mittel |

Alle vier haben ein Kontextfenster von 1M Tokens.

Von Opus 5.5 aus gehst du runter oder hoch:

- **Runter auf Sonnet 5.5** für klar umrissene Alltagsarbeit, etwa einen Bugfix oder ein Feature nach Spec. Eine klare Spec allein reicht aber nicht. Eine Migration oder Performance Optimierung kann eine klare Spec haben und trotzdem Opus 5.5 brauchen, bei einer großen sogar Fable 5.2.
- **Weiter runter auf Haiku 5.5** für die einfachste Massenarbeit wie Klassifizieren, Routing und Extrahieren. Haiku eignet sich auch für Subagents, die Nebenaufgaben eines größeren Modells erledigen.
- **Hoch auf Fable 5.2** für die härtesten technischen Projekte in Coding, Finanzen und Wissenschaft. Auch dann, wenn Opus 5.5 auf high nicht reicht, oder für lange Läufe ohne Aufsicht.

## Welche Aufgabe mit welchem Modell startet

| Aufgabe | Startmodell | Start Effort |
|---|---|---|
| Alltägliches Engineering und Debugging, Features über mehrere PRs | Opus 5.5 | medium, dann high |
| Klar umrissenes Coding wie Bugfixes und Arbeit nach Spec | Sonnet 5.5 | medium, dann high |
| Subagents, die Dateien suchen, Logs lesen oder zusammenfassen | Haiku 5.5 oder Sonnet 5.5 | Standard des Modells |
| Wiederkehrende Agent Aufgaben wie Recherche, Review oder Entwürfe | Sonnet 5.5 | medium |
| Computer Use und Workflows mit vielen Bildern | Opus 5.5 | medium |
| Große Refactorings, Migrationen, Architekturplanung, viele Subagents führen | Fable 5.2 | medium, dann high |
| Du bist dir noch nicht sicher | Opus 5.5 | medium |

## Erst den Effort drehen, dann das Modell wechseln

Der Effort ist laut Addy der feinere Regler für Kosten und Leistung. Ein höherer Effort hilft, wenn das Modell länger nachdenken, mehr Tools aufrufen oder seine Arbeit öfter prüfen muss. Er macht die Antwort aber langsamer. Und er gibt einem Modell kein Wissen oder Können, das es nicht hat. Dafür brauchst du das größere Modell.

Oberhalb von high kann eine Stufe mehr so viel kosten wie ein größeres Modell. Bist du schon über high, teste lieber das nächste Modell auf einem niedrigeren Effort.

Schafft ein Modell eine Aufgabe nicht, empfiehlt Addy diese Reihenfolge:

1. Prüfen, ob das Modell seine eigene Arbeit kontrollieren kann, mit einem Test, einem Build oder einem Skript.
2. Den Effort eine Stufe erhöhen.
3. Zum nächstgrößeren Modell wechseln und dort mit einem niedrigeren Effort starten.

Ein Trick für automatisch prüfbare Aufgaben: Alles auf niedrigem Effort laufen lassen und nur die Fehlschläge auf hohem Effort wiederholen. Auf einem Teil von SWE-bench Pro bestand Opus 5.5 so etwa 97 Prozent der Aufgaben. Mit allem auf high waren es 95,3 Prozent, bei höheren Kosten pro Aufgabe.

## Subagents auf kleinere Modelle setzen

Ein Subagent arbeitet in seinem eigenen Kontextfenster und gibt eine Zusammenfassung zurück. Seine Tokens laufen zum Tarif des Modells, auf dem er läuft. In Claude Code legst du das Modell in der Definition des Subagents fest, mit `model: haiku` oder `model: sonnet`. Die Umgebungsvariable `CLAUDE_CODE_SUBAGENT_MODEL` setzt den Standard für alle Subagents ohne eigene Angabe.

Addys Beispiel als `.claude/agents/log-reader.md`:

```markdown
---
name: log-reader
description: Reads test output and logs, and reports each failing case. Use after a test run.
tools: Read, Grep, Glob, Bash
model: haiku
---

Read the logs you're given. For each failure, report the file, the test name and the first error line. Don't edit any files.
```

Seine Regel dazu: Kleine Modelle bekommen nur Arbeit, bei der ein Fehler leicht auffällt, wie Dateien finden, Tests laufen lassen und Logs lesen. Code Änderungen und Entscheidungen bleiben beim Hauptmodell. Denn liest ein kleines Modell ein Suchergebnis falsch, öffnet das Hauptmodell die falsche Datei und verbrennt Tokens.

Zwei Details aus Claude Code:

| Funktion | Was Addy dazu schreibt |
|---|---|
| Eingebauter Explore Subagent | Läuft inzwischen auf dem Modell deiner Session statt immer auf Haiku. Wer Exploration günstig halten will, definiert einen eigenen Subagent namens Explore mit `model: haiku`. |
| Alias `opusplan` | Plant mit Opus im Plan Mode und setzt den Plan mit Sonnet um. Damit landen die Code Änderungen auf Sonnet, also genau umgekehrt zu seiner Empfehlung. Erst an eigenen Aufgaben messen. |

## Große Aufgaben auf viele Worker verteilen

Für Arbeit, die nicht in ein Kontextfenster passt, beschreibt Addy ein zweites Muster. Ein Topmodell führt, teilt die Aufgabe auf, gibt die Teile parallel an viele günstigere Worker und führt die Ergebnisse zusammen. Bei einer internen Fehlersuche über etwa 22 Millionen Tokens Quellcode lief ein Opus 5.5 Lead mit bis zu 25 Sonnet 5.5 Workern gleichzeitig. Das kostete etwa ein Drittel weniger als Opus 5.5 allein und lieferte ungefähr das gleiche Ergebnis.

Für eine einzelne Kette abhängiger Schritte oder Arbeit, die in ein Kontextfenster passt, rät er davon ab. Dort kosten Planen und Zusammenführen mehr, als sie sparen.

## Modell wechseln, aber an der richtigen Stelle

Der Prompt Cache gehört dem Modell, das ihn geschrieben hat. Wechselst du das Modell, muss der erste Turn die ganze Unterhaltung neu in den Cache schreiben. Addy rät deshalb, in Claude Code vorher `/compact` auszuführen oder eine neue Session mit einem kurzen schriftlichen Plan zu starten.

Am Ende zählt deine eigene Arbeit. Für einen schnellen Test in Claude Code nimmst du eine Aufgabe aus deinem Backlog, lässt sie mit `/model` auf zwei Modellen laufen und vergleichst, was `/usage` meldet.

## Fazit

Der Leitfaden nimmt viel Rätselraten aus der Modellwahl. Opus 5.5 auf medium ist der Start. Der Effort ist der erste Regler, das Modell der zweite. Und Subagents mit kleinen Modellen sparen Tokens, solange sie nur Arbeit bekommen, bei der Fehler sofort auffallen.

Wir verfolgen solche News laufend, testen sie zuerst in eigenen Side Projects und bringen, was sich bewährt, in Kundenprojekte und Workshops. Wie man Subagents, Kontext und Prüfschritte sauber in einen Harness einbaut, zeigt Benjamin Klein im [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer).
