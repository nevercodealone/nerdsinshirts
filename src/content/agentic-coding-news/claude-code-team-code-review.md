---
title: "So prüft das Claude Code Team Code, den zu 90 Prozent Claude schreibt"
description: "Claude schreibt rund 90 Prozent von Claude Code. Wie das Team Code Review mit KI Reviewern, Risikostufen und Rundenlimit umgebaut hat, mit allen Zahlen."
pubDate: 2026-10-24
author: roland-golla
tags:
  - Claude Code
  - Code Review
  - Verifikation
draft: false
workshop: developer
tldr: "Claude schreibt rund 90 Prozent des Codes von Claude Code, Menschen können das nicht mehr Zeile für Zeile lesen. Das Team prüft deshalb in Schichten: Der Agent testet sich selbst, KI Reviewer suchen Fehler, und wie viele Menschen freigeben, hängt vom Risiko der Änderung ab."
quoteText: "I could not imagine being productive without Claude Code Review."
quoteAuthor: "Boris Cherny"
quoteRole: "Hat Claude Code entwickelt und leitet das Team"
quoteUrl: "https://x.com/bcherny/status/2111158313463525518"
faq:
  - question: "Wie viel Code von Claude Code schreibt Claude 2026 selbst?"
    answer: "Laut dem Claude Code Team rund 90 Prozent. Von Juni bis September 2026 hat sich die Zahl der übernommenen Änderungen mehr als verdoppelt. Gleichzeitig sank der Anteil der Änderungen, die wieder zurückgenommen werden mussten, um über 40 Prozent."
  - question: "Was ist Code Review for Claude Code 2026?"
    answer: "Ein KI Reviewer von Anthropic, der jeden Pull Request prüft. Mehrere Agents suchen parallel nach Fehlern, andere stimmen darüber ab, und nur bestätigte Funde werden gepostet. Seit Oktober 2026 ist er für Team und Enterprise allgemein verfügbar, mit den Stufen Quick, Standard und Deep."
  - question: "Ersetzt KI Review 2026 die menschliche Freigabe?"
    answer: "Nein. Freigaben von Agents zählen beim Claude Code Team nicht als menschliche Freigabe. Nur Änderungen mit niedrigem Risiko, etwa an Dokumentation, dürfen ohne Menschen übernommen werden, wenn alle automatischen Prüfungen grün sind. Riskante Bereiche brauchen ein oder zwei Personen."
  - question: "Was steht in einer REVIEW.md?"
    answer: "Die Datei legt fest, worauf der KI Reviewer in einem Bereich achten soll. Laut Claude Code Team funktioniert sie gut, wenn sie beschreibt, wie ein Fehler dort aussieht, Kleinkram begrenzt, Pfade zum Überspringen nennt, Datei und Zeile als Beleg verlangt und eine Zusammenfassung mit Anzahl der Funde fordert."
  - question: "Warum begrenzt das Team die Review Runden?"
    answer: "Weil Agent als Autor und Agent als Reviewer sich endlos gegenseitig korrigieren können. Ein Pull Request lief über Nacht durch mehr als fünfzig Runden. Rund 59 Prozent der Funde betrafen Code, der schon beim ersten Durchgang da war. Seit dem Limit von drei Runden brauchen nur noch 1,5 Prozent fünf oder mehr Runden."
  - question: "Wie fängt ein Team mit diesem Vorgehen an?"
    answer: "Das Claude Code Team empfiehlt, mit einem einzigen Repository zu starten: dem Agent ausführbare Prüfungen geben, einen KI Reviewer einschalten, eine REVIEW.md ein paar Wochen nachschärfen und dann ausweiten. Freigaberegeln anfangs streng setzen und erst mit Belegen lockern."
sources:
  - title: "How the Claude Code Team Does Code Review"
    url: "https://claude.dev/blog/solving-code-review-at-anthropic/"
    publisher: "Claude Developer Blog, Addy Osmani, Morgan Westlee Lunt, Qing Wang"
  - title: "Boris Cherny zu Claude Code Review"
    url: "https://x.com/bcherny/status/2111158313463525518"
    publisher: "X"
  - title: "Addy Osmani zu Verifikation"
    url: "https://x.com/addyosmani/status/2111604705340326393"
    publisher: "X"
  - title: "Boris Cherny zum Arbeiten mit Claude"
    url: "https://x.com/bcherny/status/2107565388250874193"
    publisher: "X"
---

Claude schreibt inzwischen rund 90 Prozent des Codes von Claude Code selbst. Im großen Code Repository von Anthropic stieg die Zahl der Änderungen pro Tag von etwa 2.500 im Mai 2026 auf über 30.000 im September. Kein Team der Welt kann das noch Zeile für Zeile lesen.

Wie das Claude Code Team trotzdem die Qualität hält, haben Addy Osmani, Morgan Westlee Lunt und Qing Wang am 15. Oktober im Claude Developer Blog beschrieben. Der Kern ist eine neue Frage. Nicht mehr: Hat ein Mensch den Code gelesen? Sondern: Was kann bei dieser Änderung schiefgehen, und welche Prüfung fängt das ab?

## Die Ergebnisse

Zuerst die Zahlen, denn sie zeigen, dass mehr Tempo nicht weniger Qualität heißen muss. Von Juni bis September 2026 hat sich die Zahl der übernommenen Änderungen an Claude Code mehr als verdoppelt. Der Anteil der Änderungen, die wieder zurückgenommen werden mussten, sank im selben Zeitraum um über 40 Prozent.

Dazu kommen Werte zum Review selbst, jeweils vor und nach den Umstellungen:

| Messwert | Vorher | Nachher |
|---|---|---|
| Pull Requests mit inhaltlichen Review Kommentaren | 16 Prozent | 54 Prozent |
| Pull Requests, die nach einer Korrekturrunde bestehen | 65 Prozent | 78 Prozent |
| Pull Requests mit fünf oder mehr Runden | 8,9 Prozent | 1,5 Prozent |
| Durchschnittliche Review Runden | 2,08 | 1,32 |

Ein Pull Request ist ein Änderungsvorschlag am Code, der geprüft wird, bevor er in den Hauptstand übernommen wird.

## Schicht 1: Der Agent prüft sich selbst

Bevor überhaupt jemand reviewt, muss der Agent zeigen, dass seine Arbeit läuft. Er bekommt etwas, das er ausführen kann: Tests, den Build, einen Screenshot zum Vergleich mit dem Design. Und er muss das Ergebnis vorzeigen, statt nur zu behaupten, er sei fertig.

Boris Cherny, der Claude Code entwickelt hat, schätzt laut dem Artikel, dass das die Ergebnisse zwei bis dreimal besser macht. Addy Osmani schreibt auf X dasselbe: Wer dem Agent einen Weg gibt, seine Arbeit selbst zu prüfen, bekommt deutlich bessere Ergebnisse.

Danach liest ein zweiter Agent die Änderung mit frischem Blick, ohne den Verlauf des ersten zu kennen.

Zwei Dateien steuern das:

- **CLAUDE.md** beschreibt das Projekt: Technik, Konventionen, Ziele. In großen Projekten bewusst kurz, mit Links zu weiteren Dokumenten.
- **REVIEW.md** schreiben die Verantwortlichen für einen Bereich. Darin steht, worauf der Reviewer dort achten soll.

Eine REVIEW.md funktioniert laut Team am besten, wenn sie:

- beschreibt, wie ein Fehler in diesem Bereich aussieht
- Kleinkram wie Stilfragen begrenzt
- Pfade nennt, die übersprungen werden
- für jeden Fund Datei und Zeile als Beleg verlangt
- eine Zusammenfassung fordert, die mit der Anzahl der Funde beginnt und klar sagt, wenn nichts zu tun ist

Wiederholt sich ein Fund, wird er an der Quelle behoben: in der Datei, mit einer Lint Regel oder in einem Skill.

## Schicht 2: KI Review bei jedem Pull Request

Jeder Pull Request geht durch Code Review for Claude Code. Der Reviewer liest die Änderung im Kontext des ganzen Projekts und fragt: Löst sie das Problem, passt sie ins System, macht sie etwas anderes kaputt?

So entsteht ein Fund:

1. Mehrere Agents suchen parallel nach Fehlern.
2. Eine zweite Gruppe stimmt über jeden Fund ab.
3. Nur was genug Zustimmung bekommt, wird gepostet, sortiert nach Schwere.

Jeder Kommentar trägt ein Label: **Important**, **Nit** für Kleinkram oder **Pre-existing** für Fehler, die schon vorher im Code waren. So wird niemandem ein alter Fehler angelastet. Jeder Fund muss beantwortet werden, entweder mit einer Korrektur oder einer Begründung.

Seit Oktober 2026 ist Code Review für die Pläne Team und Enterprise allgemein verfügbar. Pro Repository lässt sich zwischen Quick, Standard und Deep wählen. Lokal gibt es mit `/code-review` eine leichtere Version, dazu `/security-review` für eine eigene Sicherheitsprüfung. Solange ein Fund aus Fehler oder Sicherheitsprüfung offen ist, kann nicht übernommen werden.

## Schicht 3: Wie viele Menschen freigeben, entscheidet das Risiko

| Risiko | Beispiele | Menschliche Freigaben |
|---|---|---|
| Niedrig | Dokumentation, Texte, interne Funktionen hinter einem Schalter | Keine, wenn alle automatischen Prüfungen grün sind |
| Mittel | Normale Produktänderungen, heikle Bereiche wie Caching oder System Prompts | Eine Person |
| Hoch | Kritischster Code | Zwei Personen |

Dazu gelten feste Regeln:

- **Die Änderung bestimmt die Stufe, nicht der Autor.** Ein Klassifikator ordnet sie ein, ein zweiter prüft, ob trotzdem ein Mensch drauf schauen muss.
- **Freigaben von Agents zählen nicht** als menschliche Freigabe.
- **Wer den Agent steuert, haftet,** als hätte er den Code selbst getippt.
- **Eine Freigabe gilt für genau einen Stand.** Kommt danach ein neuer Commit, etwa von einem Agent, muss neu freigegeben werden.
- Leichtere Wege gelten nur für vertrauenswürdige Autoren, meist das eigene Team. Bereiche wie die CI Konfiguration brauchen immer einen Menschen.

## Das Problem mit der Endlosschleife

Agent schreibt, Agent reviewt, Agent korrigiert, Agent reviewt. Das kann ewig laufen. Ein Pull Request ging über Nacht durch mehr als fünfzig Runden, bis der Autor ihn stoppte.

Die Analyse ergab: Rund 59 Prozent dessen, was der Reviewer immer wieder fand, war Code, der schon beim ersten Durchgang existierte. Spätere Runden fanden also vor allem alte Fehler, keine neuen.

Die Gegenmaßnahmen:

- Nach **drei Runden** fordert der Reviewer den Autor auf, den Ansatz zu überdenken.
- Nach den ersten Durchgängen wird nur noch die neue Änderung geprüft.
- Der Reviewer benennt die Fehlerklasse, damit alle Stellen auf einmal behoben werden.
- Bereits gemeldete Funde werden nicht wiederholt.

## Nach dem Übernehmen

- Eine **Merge Queue** prüft jede Änderung noch einmal gegen den aktuellen Hauptstand, damit zwei einzeln korrekte Änderungen zusammen nichts kaputt machen.
- Neues landet hinter **Feature Flags**, also Schaltern, die eine Funktion ohne neues Deployment an und aus machen. Zuerst nutzen es nur Leute bei Anthropic.
- Releases gehen erst an den Kanal `latest`, später an `stable`.
- Aus jedem Vorfall wird ein Testfall. Der Reviewer läuft täglich gegen diese Sammlung und wird nur geändert, wenn sein Ergebnis besser wird.

Eine Lücke nennt das Team offen: Es gibt noch keinen Mechanismus, der die Freigaben automatisch verschärft, wenn mehr Änderungen zurückgenommen werden müssen.

## Wo Menschen bleiben

- Bei der Frage, ob etwas überhaupt gebaut werden soll
- Bei riskantem Code wie Abrechnung, Updater und CI
- Bei Architektur, die andere übernehmen werden
- Beim Lesen der Belege: Testausgaben, Screenshots, Funde
- Bei der Verantwortung: Für jede Änderung ist ein Mensch zuständig, egal wer sie getippt hat

## So steigt man laut Claude Code Team ein

1. Dem Agent ausführbare Prüfungen geben und in einer kurzen CLAUDE.md auflisten.
2. Vor jedem Pull Request lokal `/code-review` und `/security-review` laufen lassen.
3. Einen KI Reviewer erst in einem Repository einschalten, die REVIEW.md ein paar Wochen nachschärfen, dann ausweiten.
4. In die Vorlage für Pull Requests die Abschnitte Testing, Risiko und Zurücknehmen aufnehmen.
5. Risikostufen nach Art der Änderung festlegen, streng beginnen, erst mit Belegen lockern.
6. Review Runden begrenzen.
7. Messen, wie viel menschliche Zeit pro Änderung nötig ist, und die Quote der zurückgenommenen Änderungen als Warnsignal beobachten.

## Fazit

Das Claude Code Team zeigt, dass Code Review mit Agents nicht weniger Kontrolle bedeutet, sondern eine andere. Statt jede Zeile zu lesen, prüfen mehrere Schichten automatisch, und Menschen kümmern sich um die Fragen, die nur sie beantworten können. Die Zahlen sprechen dafür: mehr übernommene Änderungen, weniger Rücknahmen, weniger Runden.

Für uns sind solche Einblicke der Grund, warum wir die Neuigkeiten rund um Agentic Coding laufend verfolgen. Was wir dabei lernen, testen wir zuerst praktisch in eigenen Side Projects. Was sich dort bewährt, bringen wir in Kundenprojekte und in unsere Workshops. Wenn ihr Agentic Coding in eurem Team einführen wollt, schaut euch gern den [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer) an.
