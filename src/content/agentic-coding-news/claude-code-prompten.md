---
title: "Claude Code richtig prompten, die drei Regeln von Boris Cherny"
description: "Boris Cherny braucht keine Prompt Tricks. Warum Ziel, Aufwand und Prüfweg wichtiger sind als die Formulierung und wie man alte Prompts entrümpelt."
pubDate: 2026-11-10
author: roland-golla
tags:
  - Prompting
  - Claude Code
  - Agentic Coding
draft: false
workshop: developer
tldr: "Laut Boris Cherny gibt es beim Prompting keine Geheimnisse mehr. Ein Modell braucht drei Dinge: was es tun soll, wie viel Aufwand es treiben soll und wie es prüft, ob das Ergebnis stimmt. Den Aufwand steuert man heute über das Effort Level und ultrathink, alte Prompt Regeln gehören ausgemistet."
quoteText: "Talk to Claude the way you would a coworker. There's no secret to prompting."
quoteAuthor: "Boris Cherny"
quoteRole: "Head of Claude Code bei Anthropic"
quotePosition: "Head of Claude Code"
quoteCompany: "Anthropic"
quoteUrl: "https://x.com/bcherny/status/2107565388250874193"
faq:
  - question: "Wie prompte ich Coding Agents 2026 richtig?"
    answer: "Laut Boris Cherny, der Claude Code entwickelt hat, so wie man mit einem Kollegen spricht. Für die meisten Aufgaben braucht es keine ausgefeilten Vorgaben. Wichtig ist, dem Modell drei Dinge mitzuteilen: was es tun soll, wie viel Aufwand es treiben soll und wie es prüft, dass es das Richtige getan hat."
  - question: "Warum sind Prompt Tricks 2026 weniger wichtig?"
    answer: "Boris Cherny schreibt, dass der genaue Prompt zu Zeiten von Sonnet 3.5 noch viel ausgemacht hat. Heutige Modelle finden den Weg selbst, wenn das Ziel klar ist. Die Anleitungen von Anthropic zu Fable 5.1 und 5.2 raten sogar, alte Regeln zu entfernen, bevor man Neues ergänzt. Laut der Anleitung zu Fable 5.2 befolgt das Modell Stilregeln eng, überholte Vorgaben wirken dann stärker."
  - question: "Was macht ultrathink in Claude Code 2026?"
    answer: "Wer ultrathink in eine Nachricht schreibt, kann den Aufwand für genau diese eine Runde auf xhigh heben. Die Einstellung für die restliche Session bleibt gleich. Das funktioniert im Terminal ab Claude Code 2.1.311 mit Modellen, die xhigh unterstützen, etwa Opus 5.5 oder Fable 5.1. Klappt es, erscheint das Wort in Regenbogenfarben."
  - question: "Welches Effort Level ist 2026 in Claude Code Standard?"
    answer: "Opus 5.5, Sonnet 5.5 und Haiku 5.5 starten in Claude Code auf medium. Mit /effort lässt sich das ändern, der Wert wird pro Modell gespeichert. ClaudeDevs empfiehlt, xhigh für die schwersten langen Agent Aufgaben aufzuheben. Max ist zum Ausloten der Obergrenze gedacht und nicht für den Alltag."
  - question: "Was ist ein Prompt Audit 2026?"
    answer: "Ein Prompt Audit prüft bestehende Anweisungen auf Regeln, die veraltet sind oder sich widersprechen. In Claude Code heißt der Befehl /doctor prompt-audit, über den Alias geht auch /checkup prompt-audit. Er braucht Version 2.1.283 oder neuer und untersucht die CLAUDE.md, Skills und weitere Konfiguration."
  - question: "Soll ich lieber das Modell wechseln oder den Effort erhöhen?"
    answer: "Ein Leitfaden im Claude Developer Blog rät, erst zu prüfen, ob das Modell seine Arbeit selbst prüfen kann, dann den Effort um eine Stufe zu erhöhen und erst danach das Modell zu wechseln. Mehr Effort hilft beim längeren Nachdenken. Wissen oder Fähigkeiten, die ein Modell nicht hat, bringt er nicht."
  - question: "Wirken Anweisungen wie denk weniger nach?"
    answer: "Laut der Anleitung von Anthropic zu Fable 5.2 nicht zuverlässig. Eine solche Zeile hat das Modell ab medium nicht davon abgehalten nachzudenken. Die Anleitung empfiehlt stattdessen, das Effort Level zu senken. Auch die Länge der Antworten steuert man über den Prompt und nicht über den Effort."
  - question: "Was hat Fachwissen mit Prompting zu tun?"
    answer: "Sean Goedecke vertritt die These, dass die wichtigste Fähigkeit beim Prompting Fachwissen im jeweiligen Gebiet ist. Wer sein Gebiet kennt, kann klare Ziele setzen und Ergebnisse beurteilen. Auch in den Reaktionen auf Boris Cherny heißt es, präzise Vorgaben und Fachwissen sparen Token und Umwege."
  - question: "Wie verhindere ich gekünstelte KI Texte?"
    answer: "Anthropic empfiehlt in der Anleitung zu Fable 5.1, das unerwünschte Muster im Prompt zu beschreiben, statt nur gute Texte zu fordern. Es gibt dafür eine ausführliche Anweisung gegen gekünstelte Formulierungen. Laut Anleitung funktioniert meist schon die kurze Fassung: Please remove all mannered prose."
sources:
  - title: "Boris Cherny: So prompte ich Claude"
    url: "https://x.com/bcherny/status/2107565388250874193"
    publisher: "X"
  - title: "Boris Cherny: Beispiel Prompt"
    url: "https://x.com/bcherny/status/2107532985897771152"
    publisher: "X"
  - title: "Boris Cherny: Formale Verifikation mit Lean"
    url: "https://x.com/bcherny/status/2102543349102338309"
    publisher: "X"
  - title: "ClaudeDevs: ultrathink und Effort für Subagents"
    url: "https://x.com/ClaudeDevs/status/2117670661221134775"
    publisher: "X"
  - title: "ClaudeDevs: Standardwerte und Einsatz von xhigh und max"
    url: "https://x.com/ClaudeDevs/status/2119868700522405933"
    publisher: "X"
  - title: "Which Claude model should you build with"
    url: "https://claude.dev/blog/which-claude-model-should-you-build-with/"
    publisher: "Claude Developer Blog"
  - title: "Prompting Claude Fable 5.2"
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2"
    publisher: "Claude Platform Docs"
  - title: "Prompting Claude Fable 5.1"
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1"
    publisher: "Claude Platform Docs"
  - title: "Model configuration, Effort Level und ultrathink"
    url: "https://code.claude.com/docs/en/model-config"
    publisher: "Claude Code Doku"
  - title: "Commands, /doctor prompt-audit"
    url: "https://code.claude.com/docs/en/commands"
    publisher: "Claude Code Doku"
  - title: "Lydia Hallie zum prompt-audit Befehl"
    url: "https://x.com/lydiahallie/status/2103617988918485226"
    publisher: "X"
  - title: "John Crickett: Requirements"
    url: "https://x.com/johncrickett/status/2107733268753740269"
    publisher: "X"
  - title: "eric provencher: Präzision spart Token"
    url: "https://x.com/pvncher/status/2107576600401265119"
    publisher: "X"
  - title: "Theo Jaffee zu Prompt Engineering"
    url: "https://x.com/theojaffee/status/2107572514184728609"
    publisher: "X"
  - title: "David Cramer zu Prompt Engineering"
    url: "https://x.com/zeeg/status/2107567128962556041"
    publisher: "X"
  - title: "LLMs reward expertise"
    url: "https://seangoedecke.com/llms-reward-expertise/"
    publisher: "Sean Goedecke"
---

## So promptet Boris Cherny, Head of Claude Code bei Anthropic

Boris Cherny hat Claude Code gebaut und leitet heute das Team dahinter. Anfang Oktober zeigt er auf X einen seiner Prompts. Viele reagieren erstaunt. Boris wundert sich darüber und [schreibt](https://x.com/bcherny/status/2107565388250874193):

> Talk to Claude the way you would a coworker. There's no secret to prompting.

Rede mit Claude wie mit einem Kollegen. Ein Geheimnis gibt es nicht. Für die meisten Aufgaben braucht ihr keine ausgefeilten Vorgaben. Ihr gebt Claude ein Ziel, den Weg findet es selbst.

Der Post geht steil. Über 1,5 Millionen Aufrufe, knapp 14.000 Likes und mehr als 10.000 Lesezeichen. Die Lesezeichen sagen viel: Die Leute wollen das später noch einmal nachlesen.

## Drei Regeln für gute Prompts

Zu Zeiten von Sonnet 3.5 hat der genaue Wortlaut noch viel ausgemacht, schreibt Boris. Heute zählt etwas anderes. Das Modell muss drei Dinge wissen:

1. **Was es tun soll**
2. **Wie viel Aufwand es treiben soll**
3. **Wie es prüft, ob es das Richtige getan hat**

Sein Beispiel hat mit Code nichts zu tun. Claude soll eine interaktive Begleitseite zu einer Podcast Folge bauen. Der [Prompt](https://x.com/bcherny/status/2107532985897771152) ist ein lockerer Absatz, so wie ihr einer Kollegin im Chat schreiben würdet. Drin steht:

| Element | Was im Prompt steht |
|---|---|
| Ziel | Eine schöne, interaktive Seite, die die Folge erzählt und die Erkenntnisse aus dem Gespräch vermittelt |
| Aufwand | "use lots of tokens and iterate till you're proud of it", also viel Rechenzeit nutzen und so lange nachbessern, bis Claude stolz darauf ist |
| Maßstab | Die Datenvisualisierungen von New Yorker und New York Times, nur besser |
| Hinweis | Welche Bibliothek für Aquarell Bilder passen könnte |

Das war es schon.

## Was die Community dazu sagt

Über 600 Leute haben geantwortet, dazu kommen viele Zitat Posts. Nicht alle sind einverstanden.

[Theo Jaffee](https://x.com/theojaffee/status/2107572514184728609) hält die Prompt Engineers der Jahre 2022 bis 2024 für widerlegt. Für ihn heißt Prompting, dem Modell den richtigen Kontext zu geben. Das sei ganz normale Kommunikation. [David Cramer](https://x.com/zeeg/status/2107567128962556041), Gründer von Sentry, sieht es ähnlich. Ihr dürft eine Sache ruhig schlecht erklären, Hauptsache, ihr erklärt sie überhaupt.

[John Crickett](https://x.com/johncrickett/status/2107733268753740269) zeigt auf das eigentliche Problem. Viele Menschen können nicht sauber beschreiben, was sie wollen und wie man prüft, ob es stimmt. Früher hatte das einen Namen: Anforderungen.

Widerspruch kommt von [eric provencher](https://x.com/pvncher/status/2107576600401265119). Im Großen und Ganzen stimme das, schreibt er. Aber je genauer ihr sagt, was ihr wollt, desto schneller ist das Modell am Ziel. Ein vager Prompt kostet Token, weil Claude erst raten muss, was gemeint ist. Und Fachwissen hilft enorm.

Die meistgelikte Antwort gibt Boris etwas anderes zu bedenken. Er arbeitet in einer Firma, in der Claude längst zum Alltag gehört. In anderen Teams geht es beim Steuern oft weniger um das Problem selbst. Da müssen bestehende Prozesse und die Vorlieben von Kollegen untergebracht werden, in denen Claude noch gar keinen Platz hat.

## Regel drei, wie Claude seine Arbeit prüft

Für Code hat Boris ein ziemlich hartes Beispiel. Mit Opus 5.5 hat er das Claude Agent SDK [formal verifiziert](https://x.com/bcherny/status/2102543349102338309), mit dem Beweissystem Lean. Ein paar kurze Prompts, und am Ende standen laut seinem Post 16 Pull Requests, die Fehler und Race Conditions beheben. Manchmal nimmt er noch TLA+ dazu, um Probleme bei Datenfluss, Nebenläufigkeit und Zustand zu finden.

Im Alltag reicht meist weniger: ein Test, ein Build oder ein Skript, das einen Endpunkt aufruft. Wie viel davon abhängt, zeigt ein [Leitfaden im Claude Developer Blog](https://claude.dev/blog/which-claude-model-should-you-build-with/) vom 9. November. Wenn ein Modell nicht gut genug arbeitet, rät er zu dieser Reihenfolge:

1. **Zuerst schauen, ob Claude seine Arbeit selbst prüfen kann**, mit Test, Build oder Skript
2. **Dann den Effort eine Stufe hochdrehen**
3. **Erst danach zum größeren Modell wechseln** und dort mit niedrigerem Effort starten

So ein Prüfweg ist oft billiger und schneller als mehr Effort. Die neue Anleitung zu [Fable 5.2](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-2) gibt noch einen Tipp mit: Lest bei Codeänderungen den Diff und nicht nur die Zusammenfassung. Kleine Änderungen fehlen dort nämlich gern. Wie das Claude Code Team das im großen Stil macht, steht in unserem Artikel zum [Code Review des Claude Code Teams](/agentic-coding-news/claude-code-team-code-review/).

## Effort Level statt Prompt Tricks

Den Aufwand könnt ihr wie Boris direkt in den Prompt schreiben. Meist ist das Effort Level aber der direktere Hebel. Es bestimmt, wie lange Claude nachdenkt, wie viele Tools es aufruft und wie gründlich es die eigene Arbeit prüft.

| Stufe | Wofür laut Anleitung zu Fable 5.2 |
|---|---|
| low | Schnelle, klar beschriebene Aufgaben und Arbeit in großer Menge, etwa schnelle Subagents |
| medium | Interaktives Coden, Chat, alltägliche Wissensarbeit |
| high | Schweres Coden, Recherche, lange Agent Aufgaben ohne Aufsicht |
| xhigh | Die schwersten langen Aufgaben, wo man einen Gewinn gemessen hat |
| max | Die Obergrenze ausloten, für seltene Aufgaben, bei denen Zeit und Token keine Rolle spielen |

Die Tabelle kommt aus der Anleitung zu Fable 5.2 und ist für die API gedacht. Dort ist high der Standard. Die [Claude Code Doku](https://code.claude.com/docs/en/model-config) sortiert die Stufen etwas anders, sie empfiehlt high zum Beispiel für Fehlersuche, bei der Prüfung wichtig ist. Beim oberen Ende sind sich alle einig. ClaudeDevs [rät](https://x.com/ClaudeDevs/status/2119868700522405933), xhigh für die schwersten langen Agent Aufgaben aufzuheben, und max ist nichts für den Alltag. In Claude Code starten Opus 5.5, Sonnet 5.5 und Haiku 5.5 übrigens auf medium.

### ultrathink ist zurück

Manchmal ist nur eine einzige Aufgabe richtig knifflig. Dafür gibt es seit Ende Oktober wieder `ultrathink`. ClaudeDevs erklärt es [im Oktober Rückblick](https://x.com/ClaudeDevs/status/2117670661221134775): Schreibt das Wort in eure Nachricht, und Claude kann für genau diese Runde auf xhigh gehen. Danach läuft die Session wie vorher weiter.

Ihr braucht dafür Claude Code 2.1.311 im Terminal und ein Modell, das xhigh kann. Auf Amazon Bedrock oder mit einer niedrigeren Obergrenze im Team klappt es nicht. Ob es greift, seht ihr sofort: Das Wort leuchtet dann in Regenbogenfarben. "think hard" und ähnliche Sätze sind dagegen ganz normaler Text.

Im selben Post steckt noch eine Neuerung. Ihr könnt Claude bitten, Subagents mit anderem Effort laufen zu lassen. Die Session läuft auf high, die Subagents sollen aber auf medium arbeiten? Dann sagt es Claude einfach.

### Erst Effort, dann Modell

Der Leitfaden im Claude Developer Blog hat dazu eine klare Linie. Bevor ihr das Modell wechselt, dreht erst am Effort. Aber Vorsicht: Oberhalb von high kann eine weitere Stufe so viel kosten wie ein größeres Modell. Und Wissen, das ein Modell nicht hat, bekommt es auch mit mehr Effort nicht.

## Alte Prompts aufräumen mit prompt audit

In vielen CLAUDE.md Dateien liegen noch Regeln aus der Zeit, als Modelle mehr Händchenhalten brauchten. Bei Fable 5.2 kann das nach hinten losgehen. Laut Anleitung befolgt das Modell Stilregeln und Freigaberegeln eng, alte Vorgaben wirken also stärker, als ihr denkt. Diese Kandidaten nennt die Anleitung zum Aufräumen:

- **Token Budgets im Prompt.** Im Test sanken die Kosten, als ein großes Budget rausflog, und die Leistung blieb gleich.
- **"Denk weniger" Anweisungen.** Ab medium hat Claude trotzdem nachgedacht. Senkt lieber das Effort Level.
- **Starre Stilregeln.** Die Texte werden davon abgehackt.
- **Gesammelte Vorsichtsregeln.** Löscht die, deren Grund nicht mehr gilt. Schreibt absolute Regeln so um, dass Grund und Geltungsbereich drinstehen.
- **Feste Delegationsregeln.** Wenn Claude mehr Subagents startet als nötig, raus damit.

Schon die Anleitung zu [Fable 5.1](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-fable-5-1) hatte geraten, erst alte Zeilen zu streichen, etwa Regeln gegen Formatierung oder gegen Zwischenberichte, und dann Neues zu ergänzen.

Claude Code nimmt euch einen Teil davon ab:

```text
/doctor prompt-audit
```

Der Befehl geht laut [Doku](https://code.claude.com/docs/en/commands) eure CLAUDE.md, Skills und weitere Konfiguration durch und sucht nach veralteten oder widersprüchlichen Anweisungen. Ihr braucht Version 2.1.283 oder neuer. `/checkup` ist ein Alias für `/doctor`, also klappt auch `/checkup prompt-audit`. Lydia Hallie aus dem Claude Code Team hatte im September [darauf hingewiesen](https://x.com/lydiahallie/status/2103617988918485226), dass die Variante unter `/claude-api` trotz des Namens schon immer mit Claude Code lief. Die gibt es weiterhin, `/claude-api prompt-audit` sucht nach Anweisungen, die für ältere Modelle geschrieben wurden.

## KI Texte ohne Floskeln schreiben

Ein Sonderfall sind Texte, die Claude für euch schreibt. Die Anleitung zu Fable 5.1 hat dafür einen eigenen Abschnitt.

Statt "schreib gut" zu verlangen, beschreibt sie genau, was nervt: Metaphern und Schnörkel, wo eine klare Aussage reichen würde. Die Abhilfe ist simpel, sag, was du meinst. Laut Anleitung reicht meist schon die Kurzfassung, am besten als Nachricht im Gespräch und nicht im System Prompt:

```text
Please remove all mannered prose.
```

## Warum Fachwissen beim Prompting zählt

Wenn Prompting so einfach ist, warum bekommen manche dann viel bessere Ergebnisse als andere? Sean Goedecke hat darauf [eine klare Antwort](https://seangoedecke.com/llms-reward-expertise/):

> The most important skill in prompting is expertise in the domain you're prompting for

Am meisten zählt also, wie gut ihr euch in dem Gebiet auskennt, um das es geht. Das passt zu den Stimmen unter Boris' Post. John Crickett nennt es Anforderungen, eric provencher Präzision und Fachwissen.

Und genau da hängen die drei Regeln dran. Ein klares Ziel setzen, den passenden Aufwand wählen und ein Ergebnis prüfen kann nur, wer versteht, worum es geht.

## Fazit

Gute Prompts für Coding Agents brauchen heute vor allem Klarheit. Boris Chernys drei Punkte, Ziel, Aufwand und Prüfweg, machen lange Prompt Vorlagen überflüssig. Den Aufwand regelt ihr über das Effort Level, für eine einzelne harte Nuss mit `ultrathink`. Und wer schon länger mit Agents arbeitet, sollte mal mit `/doctor prompt-audit` durch die alten Regeln gehen.

Die Kritik aus der Community ist trotzdem berechtigt. Präzise Vorgaben sparen Token, und nicht jedes Team arbeitet so selbstverständlich mit Claude wie das Team von Boris. Am Ende entscheidet euer Fachwissen, wie gut ihr ein Ziel beschreibt und ein Ergebnis beurteilt.

Für uns sind solche Einblicke der Grund, warum wir die Neuigkeiten rund um Agentic Coding laufend verfolgen. Was wir dabei lernen, testen wir zuerst praktisch in eigenen Side Projects. Was sich dort bewährt, bringen wir in Kundenprojekte und in unsere Workshops. Wenn ihr in eurem Team besser mit Coding Agents arbeiten wollt, schaut euch gern den [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer) an.
