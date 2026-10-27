---
title: "KI generierten Code testen, welche Tests Agents wirklich brauchen"
description: "KI generierten Code testen: welche Tests Coding Agents laut Claude Code Team besser machen, dazu die Zahlen von Anthropic zu 10x Tests und 25x CI Jobs."
pubDate: 2026-10-27
author: roland-golla
tags:
  - Agentic Coding
  - Testing
  - Verifikation
draft: false
workshop: developer
tldr: "Wenn Agents mehr Code schreiben, als Menschen lesen können, wird der Nachweis zum Engpass. Das Claude Code Team setzt deshalb auf Tests, die der Agent selbst ausführt: End to End Tests als Wahrheit, Property Based Tests und schnelle, deterministische Testläufe."
quoteText: "When generating software at a faster rate than you can review it, the bottleneck shifts to proving that it works."
quoteAuthor: "Addy Osmani"
quoteRole: "Claude Code Team, Anthropic"
quoteUrl: "https://x.com/addyosmani/status/2111604705340326393"
faq:
  - question: "Warum werden Tests beim Agentic Coding 2026 wichtiger?"
    answer: "Weil Agents Code schneller erzeugen, als Menschen ihn lesen können. Über alle Projekte von Anthropic schreibt Claude rund 80 Prozent des Codes, bei Claude Code selbst sind es rund 90 Prozent. Engineers liefern pro Quartal etwa 8x so viel wie früher. Addy Osmani beschreibt die Folge: Der Engpass verschiebt sich vom Schreiben zum Nachweis, dass der Code funktioniert. Tests sind dieser Nachweis, und der Agent kann sie selbst ausführen."
  - question: "Welche Tests empfiehlt das Claude Code Team 2026 für KI Agents?"
    answer: "Addy Osmani nennt vier Arten: End to End Tests, die echte Nutzerwege simulieren und als Wahrheit dienen. Property Based Tests, die festlegen, was nie passieren darf. Vergleiche von altem und neuem System mit zufälligen Eingaben, wenn ein System ersetzt wird. Und Tests, die schnell und deterministisch laufen, damit der Agent nicht lernt, einfach neu zu starten."
  - question: "Was ist ein Property Based Test?"
    answer: "Ein Property Based Test beschreibt eine Regel, die immer gelten muss, statt ein einzelnes Beispiel zu prüfen. Das Testwerkzeug erzeugt dann tausende Eingaben und versucht, die Regel zu brechen. Addy Osmani fasst den Unterschied so zusammen: Beispieltests sagen, was passieren soll. Properties sagen, was nicht passieren darf."
  - question: "Warum müssen Tests für Agents schnell und deterministisch sein?"
    answer: "Ein Agent lernt aus seiner Schleife. Läuft ein Test langsam oder liefert mal Grün und mal Rot, gewöhnt sich der Agent laut Addy Osmani an, den Test einfach erneut zu starten, statt das Problem zu beheben. Schnelle und stabile Tests sorgen dafür, dass ein roter Test wirklich einen Fehler bedeutet."
  - question: "Was ist Test Impact Analysis?"
    answer: "Test Impact Analysis entscheidet bei jeder Änderung, welche Tests laufen müssen, statt immer alle zu starten. Grundlage sind frühere Testergebnisse und welche Pakete eine Änderung betrifft. Anthropic hat seinen Dienst dafür neu gebaut, nachdem die Zahl der CI Jobs in sechs Monaten um das 25fache gestiegen war."
  - question: "Ersetzen Tests das Code Review?"
    answer: "Nein. Addy Osmani schreibt, Code Reviews verschwinden nicht, müssen aber anders gedacht werden. Ein Mensch, der Zeile für Zeile liest, funktioniert nicht mehr als einziges Tor. Stattdessen braucht es ein System aus mehreren Prüfschichten. Menschen konzentrieren sich auf Absicht, Risiko und das Bewerten der Belege."
sources:
  - title: "Addy Osmani zu den Tests, die sich für Agents lohnen"
    url: "https://x.com/addyosmani/status/2106995301802541481"
    publisher: "X"
  - title: "Addy Osmani: Give your agent a way to verify its work"
    url: "https://x.com/addyosmani/status/2111604705340326393"
    publisher: "X"
  - title: "Addy Osmani: Agents machen Prüfen billig"
    url: "https://x.com/addyosmani/status/2109384286763958742"
    publisher: "X"
  - title: "Addy Osmani: Done definieren, bevor das Review beginnt"
    url: "https://x.com/addyosmani/status/2109358790298787931"
    publisher: "X"
  - title: "Addy Osmani: Videos und Screenshots als Beleg"
    url: "https://x.com/addyosmani/status/2113677798774898773"
    publisher: "X"
  - title: "Addy Osmani: 80 Prozent Code, 10x Tests, 25x CI Jobs"
    url: "https://x.com/addyosmani/status/2099577600159158765"
    publisher: "X"
  - title: "Agentic coding is straining CI. Here's how we scaled test impact analysis at Anthropic"
    url: "https://claude.com/blog/agentic-coding-is-straining-ci-heres-how-we-scaled-test-impact-analysis-at-anthropic"
    publisher: "Claude Blog, Sachin Malhotra"
---

## Wie viel Code KI bei Anthropic schreibt

Wer KI generierten Code testen will, sollte zuerst die Größenordnung kennen. Über alle Projekte von Anthropic schreibt Claude inzwischen rund 80 Prozent des Codes. Bei Claude Code selbst liegt der Anteil sogar bei rund 90 Prozent, wie wir im Artikel zum [Code Review des Claude Code Teams](/agentic-coding-news/claude-code-team-code-review/) beschrieben haben. Engineers liefern pro Quartal etwa 8x so viel Code wie in den Jahren 2021 bis 2025. Das hat [Addy Osmani auf X](https://x.com/addyosmani/status/2099577600159158765) geteilt, verlinkt auf einen Bericht von Sachin Malhotra im Claude Blog. Die Nebenwirkung steht gleich dabei: Die Zahl der Tests ist um das 10fache gewachsen, die CI Jobs sind in sechs Monaten um das 25fache gestiegen.

Addy Osmani arbeitet seit September im Claude Code Team. In den letzten Wochen hat er immer wieder dasselbe Thema aufgegriffen: Wie weiß man, dass Code von einem Agent wirklich funktioniert? Seine Antwort ist in jedem Post gleich. Man gibt dem Agent einen Weg, seine Arbeit selbst zu prüfen.

## Warum Code Review bei KI Code nicht mehr reicht

Ein Agent ist eine KI, die eine Aufgabe selbstständig abarbeitet: Sie liest Code, schreibt Änderungen und führt Befehle aus. Das geht schnell, oft schneller, als ein Mensch die Änderungen lesen kann. Mitte Oktober hat Addy Osmani das [so beschrieben](https://x.com/addyosmani/status/2111604705340326393):

> When generating software at a faster rate than you can review it, the bottleneck shifts to proving that it works.

Wenn Software schneller entsteht, als man sie prüfen kann, verschiebt sich der Engpass also zum Nachweis, dass sie funktioniert. Ein Mensch, der jede Zeile liest, reicht als Kontrolle nicht mehr. Laut Addy braucht es stattdessen ein System aus mehreren Prüfschichten mit schnellen, deterministischen Rückmeldungen für den Agent.

In einem [weiteren Post](https://x.com/addyosmani/status/2109384286763958742) dreht er den Gedanken weiter. Was guten Code früher teuer gemacht hat, also Tests, Benchmarks, Spezifikationen und echte End to End Läufe, kann man heute günstig bei einem Agent bestellen. Die Arbeit verschiebt sich damit:

> less "review every line" and more "build loops the agent can run itself"

Weniger jede Zeile reviewen, mehr Schleifen bauen, die der Agent selbst ausführen kann. Diese Schleife ist laut Addy die Quelle der Qualität.

## Welche Tests für KI Agents sinnvoll sind

Anfang Oktober hat Addy Osmani [konkret aufgezählt](https://x.com/addyosmani/status/2106995301802541481), in welche Tests er investieren würde:

| Testart | Was sie leistet |
|---|---|
| End to End Tests | Simulieren echte Nutzerwege und dienen als Wahrheit, an der sich der Agent messen muss |
| Property Based Tests | Legen fest, was nie passieren darf, und erzeugen tausende Testfälle, die diese Regeln zu brechen versuchen |
| Vergleich alt gegen neu | Wird ein System ersetzt, laufen beide Versionen mit zufällig gewählten Eingaben und werden verglichen |
| Schnelle, deterministische Tests | Liefern bei gleichem Code immer dasselbe Ergebnis, ohne lange Wartezeit |

Der letzte Punkt klingt nach Handwerk, ist aber für Agents entscheidend. Ist die Testschleife langsam oder unzuverlässig, lernt der Agent laut Addy, den Test einfach neu zu starten, statt das Problem zu beheben. Ein roter Test muss also wirklich einen Fehler bedeuten.

Den Unterschied zwischen Beispieltests und Property Based Tests fasst er in einem Satz zusammen:

> Example tests say what should happen; properties say what must not.

Beispieltests sagen, was passieren soll. Properties sagen, was nicht passieren darf.

## Wann ist KI Code fertig

Ein Problem kennt jeder, der einen Agent Code reviewen lässt. Lucas (@lucas_builds) hat es auf X als Spielautomaten beschrieben: Jedes Review findet neue Fehler, auch beim zehnten Durchgang. Wann ist der Code also fertig?

Addy Osmanis [Antwort](https://x.com/addyosmani/status/2109358790298787931): Vor dem Review klar festlegen, was "fertig" heißt. Ein Reviewer, ob Mensch oder Agent, findet ohne diese Definition immer noch etwas, das man verbessern könnte. Deshalb bekommt Claude Prüfungen, die es selbst ausführen kann, und muss sie bestehen, bevor es sich als fertig meldet:

- Bash Befehle
- Tests
- Durchklicken der App im Browser

Wenn danach nichts das Mergen blockiert, wird übernommen und ausgeliefert.

## Screenshots und Videos als Testbeleg

Am 22. Oktober zeigte Addy Osmani, wie das in seinem eigenen Ablauf aussieht. Zusätzlich zu End to End Tests liefert Claude ihm [aufgezeichnete Videos und Screenshots](https://x.com/addyosmani/status/2113677798774898773) als Beleg, dass eine Arbeit erledigt ist. Er verweist dabei auf Warp, wo jeder Agent einen eigenen Rechner bekommt und ein Video seiner Arbeit zurückbringt.

Seine Einschätzung dazu: Verifikation wird eines der wichtigsten Probleme, an denen man dieses Jahr arbeiten kann.

Ein weiterer Punkt aus seinem Post zum Prüfen: Wenn der Agent etwas falsch macht, wird das festgehalten, in einer gemeinsamen Konfiguration, einem Hook oder einem Test. So passiert derselbe Fehler kein zweites Mal. Der Mensch bleibt für das Ausgelieferte verantwortlich, prüft aber Belege statt nur Diffs.

## Test Impact Analysis bei wachsender CI Last

Mehr Tests heißen mehr Last in der CI, also der Pipeline, die bei jeder Änderung automatisch baut und testet. Wie Anthropic damit umgeht, beschreibt Sachin Malhotra im [Claude Blog](https://claude.com/blog/agentic-coding-is-straining-ci-heres-how-we-scaled-test-impact-analysis-at-anthropic).

Anthropic nutzt **Test Impact Analysis**. Ein Dienst entscheidet bei jedem Pull Request, welche Tests laufen müssen, anhand früherer Testergebnisse und der betroffenen Pakete. Er besteht aus zwei Teilen: Ein Listener speichert die Ergebnisse jedes CI Laufs, ein Selector wählt daraus die Tests für offene Pull Requests.

Mit dem Wachstum geriet der Dienst immer wieder an seine Grenzen. Drei schnelle Reparaturen hielten 70 Tage, 29 Tage und schließlich weniger als einen Tag. Hing der Listener 20 Minuten hinterher, konnten Zehntausende Testergebnisse noch nicht beim Selector angekommen sein.

Die Lösung war ein Neubau:

- Die Listener speichern keinen Zustand mehr und schreiben Ergebnisse nur noch in ein Journal in einem In-Memory Datenspeicher außerhalb des Prozesses.
- Ein eigener Prozess fasst das Journal alle paar Sekunden zur Testhistorie zusammen.
- Der Selector liest diese Historie schnell aus.

Ein Engineer brauchte dafür drei Wochen. Ein Jahr früher hätte es laut Autor etwa ein Quartal gedauert. Die Feinabstimmung, etwa Journalgröße und Zahl der Worker, hat Claude weitgehend selbst erledigt. Seitdem bleibt der Rückstau unverarbeiteter Ergebnisse flach.

Seine Empfehlungen für andere Teams:

1. Wachstum einplanen: davon ausgehen, dass die eigene Architektur innerhalb von zwei Quartalen 25fache Last trägt.
2. Die erste Version, wenn das Budget es erlaubt, für das 10 bis 20fache der erwarteten Last auslegen.
3. Zustand von Anfang an aus den Prozessen heraushalten, damit Worker horizontal skalieren.
4. Kritische Dienste nicht als einzelne Instanz betreiben, außer man kann sie und jede Canary Änderung messen.
5. Dienste so ausstatten, dass Claude sie beobachten kann, als "Augen und Ohren" für die Fehlersuche.

## Fazit

Die Posts aus dem Claude Code Team zeigen ein klares Muster. Je mehr Code Agents schreiben, desto mehr hängt die Qualität an den Prüfungen, die der Agent selbst ausführen kann. End to End Tests als Wahrheit, Property Based Tests für das, was nie passieren darf, und schnelle, stabile Testläufe sind dafür die Grundlage. Die Kehrseite ist mehr Last in der CI, und die muss man von Anfang an mitplanen.

Für uns sind solche Einblicke der Grund, warum wir die Neuigkeiten rund um Agentic Coding laufend verfolgen. Was wir dabei lernen, testen wir zuerst praktisch in eigenen Side Projects. Was sich dort bewährt, bringen wir in Kundenprojekte und in unsere Workshops. Wenn ihr Tests und Agents in eurem Team zusammenbringen wollt, schaut euch gern den [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer) an.
