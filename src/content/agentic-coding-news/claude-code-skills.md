---
title: "Welche Skills das Claude Code Team baut, die 9 Typen im Überblick"
description: "Thariq Shihipar aus dem Claude Code Team hat die Skills bei Anthropic sortiert. Neun Typen, jeweils mit Beispielen, was sie tun."
pubDate: 2026-11-25
author: roland-golla
tags:
  - Claude Code
  - Skills
  - Anthropic
  - Agentic Coding
workshop: developer
image: ./_bilder/claude-code-skills-header.jpg
imageAlt: "Helle grüne Aquarell Szene bei Tag am Hockenheimring, Mechaniker von hinten vor neun Werkzeugwagen in einer offenen Boxengarage"
tldr: "Anthropic hat hunderte Skills für Claude Code im Einsatz. Thariq Shihipar hat sie sortiert und neun Typen gefunden, von API Referenz über Prüfung und Daten bis zu Deployment, Runbooks und Infrastruktur. Gute Skills passen klar in einen Typ."
quoteText: "The best skills fit cleanly into one; the more confusing ones straddle several."
quoteAuthor: "Thariq Shihipar"
quoteRole: "Ehemals Claude Code Team bei Anthropic"
quoteUrl: "https://x.com/trq212/status/2033949937936085378"
begriffe:
  - skills
  - hooks
faq:
  - question: "Was sind Skills in Claude Code?"
    answer: "Skills sind Ordner, die der Agent finden, durchsuchen und nutzen kann. Sie enthalten Anweisungen, können aber auch Skripte, Assets und Daten mitbringen. Laut Thariq Shihipar sind sie deshalb mehr als reine Markdown Dateien."
  - question: "Wie viele Skills nutzt Anthropic?"
    answer: "Laut Thariq Shihipar sind bei Anthropic hunderte Skills für Claude Code im aktiven Einsatz."
  - question: "Welche Typen von Skills gibt es?"
    answer: "Thariq Shihipar nennt neun: Library und API Referenz, Produkt prüfen, Daten abrufen und auswerten, Geschäftsprozesse und Team Automatisierung, Code Gerüste und Vorlagen, Code Qualität und Review, CI/CD und Deployment, Runbooks sowie Infrastruktur Betrieb."
  - question: "Woran erkenne ich einen guten Skill?"
    answer: "Laut Thariq Shihipar passen die besten Skills sauber in einen Typ. Die verwirrenderen verteilen sich auf mehrere."
  - question: "Welcher Typ lohnt sich besonders?"
    answer: "Thariq Shihipar hebt Skills zur Prüfung hervor. Sie helfen sicherzustellen, dass die Ausgabe von Claude stimmt. Es könne sich lohnen, dass ein Engineer eine Woche nur daran arbeitet, diese Skills richtig gut zu machen."
  - question: "Ist die Liste vollständig?"
    answer: "Nein. Thariq Shihipar sagt selbst, dass sie nicht endgültig ist. Sie hilft aber zu prüfen, welche Art von Skill in der eigenen Organisation noch fehlt."
sources:
  - title: "Lessons from Building Claude Code: How We Use Skills, Thariq Shihipar auf X"
    url: "https://x.com/trq212/status/2033949937936085378"
  - title: "Extend Claude with skills, Claude Code Docs"
    url: "https://code.claude.com/docs/en/skills"
---

Thariq Shihipar hat im März 2026 auf X einen langen Artikel darüber veröffentlicht, wie das Claude Code Team [Skills](/glossar/skills/) nutzt. Damals arbeitete er im Claude Code Team bei Anthropic. Laut Thariq sind bei Anthropic hunderte Skills im aktiven Einsatz. Das Team hat sie alle katalogisiert und dabei neun wiederkehrende Typen gefunden.

## Was Skills sind, laut Thariq Shihipar, ehemals Claude Code Team bei Anthropic

Skills gehören zu den am meisten genutzten Wegen, Claude Code zu erweitern. Sie sind flexibel, leicht zu bauen und einfach weiterzugeben. Gerade diese Freiheit macht es laut Thariq aber schwer zu wissen, was am besten funktioniert.

Ein häufiges Missverständnis: Skills seien nur Markdown Dateien. Thariq sagt, das Spannendste an Skills ist genau, dass sie mehr sind als Text. Ein Skill ist ein Ordner. Darin können Skripte, Assets und Daten liegen, die der Agent finden, durchsuchen und bearbeiten kann.

In Claude Code haben Skills außerdem viele Einstellungen, darunter das Registrieren von [Hooks](/glossar/hooks/). Die interessantesten Skills im Team nutzen diese Einstellungen und die Ordnerstruktur kreativ.

Thariq setzt in seinem Artikel voraus, dass man Skills schon ein wenig kennt. Wer neu ist, dem empfiehlt er die [offizielle Doku](https://code.claude.com/docs/en/skills). Auf Deutsch erklären wir die Grundlagen im Glossar unter [Skills](/glossar/skills/).

## Die 9 Typen von Skills bei Anthropic

Die besten Skills passen laut Thariq sauber in einen Typ. Die verwirrenderen verteilen sich auf mehrere. Die Liste ist nicht endgültig. Sie hilft aber zu prüfen, was in der eigenen Organisation noch fehlt.

| Nr. | Typ | Wofür |
|---|---|---|
| 1 | Library und API Referenz | erklärt, wie eine Library, CLI oder ein SDK richtig benutzt wird |
| 2 | Produkt prüfen | beschreibt, wie man testet, ob der Code funktioniert |
| 3 | Daten abrufen und auswerten | verbindet mit Daten und Monitoring |
| 4 | Geschäftsprozesse und Team Automatisierung | macht aus wiederkehrenden Abläufen einen Befehl |
| 5 | Code Gerüste und Vorlagen | erzeugt Grundgerüste für bestimmte Teile der Codebasis |
| 6 | Code Qualität und Review | setzt Qualitätsregeln durch und hilft beim Review |
| 7 | CI/CD und Deployment | holt, pusht und deployt Code |
| 8 | Runbooks | geht von einem Symptom zu einem strukturierten Bericht |
| 9 | Infrastruktur Betrieb | erledigt Wartung und Betrieb mit Leitplanken |

### 1. Library und API Referenz

Diese Skills erklären, wie man eine Library, eine CLI oder ein SDK richtig benutzt. Das gilt für interne Libraries und für bekannte, mit denen Claude Code manchmal Probleme hat. Oft gehören ein Ordner mit Code Schnipseln als Referenz und eine Liste typischer Fallen dazu, die Claude beim Schreiben eines Skripts vermeiden soll.

Beispiele:
- `billing-lib`: die interne Billing Library mit Sonderfällen und Fallstricken
- `internal-platform-cli`: jeder Unterbefehl der internen CLI, mit Beispielen, wann man ihn nutzt
- `frontend-design`: macht Claude besser im eigenen Design System

### 2. Produkt prüfen

Diese Skills beschreiben, wie man testet oder prüft, ob der Code funktioniert. Meist arbeiten sie mit einem externen Tool wie Playwright oder tmux.

Laut Thariq sind diese Skills extrem nützlich, um sicherzustellen, dass die Ausgabe von Claude stimmt. Es kann sich lohnen, dass ein Engineer eine Woche nur daran arbeitet, sie richtig gut zu machen. Mögliche Techniken: Claude ein Video der Ausgabe aufnehmen lassen, damit man genau sieht, was getestet wurde. Oder bei jedem Schritt den Zustand per Code prüfen. Dafür liegen meist mehrere Skripte im Skill.

Beispiele:
- `signup-flow-driver`: geht Registrierung, E-Mail Bestätigung und Onboarding in einem Headless Browser durch und prüft bei jedem Schritt den Zustand
- `checkout-verifier`: bedient den Checkout mit Stripe Testkarten und prüft, ob die Rechnung im richtigen Zustand ankommt
- `tmux-cli-driver`: für interaktive CLI Tests, die ein Terminal brauchen

### 3. Daten abrufen und auswerten

Diese Skills verbinden Claude mit Daten und Monitoring. Sie können Libraries enthalten, um Daten mit Zugangsdaten abzurufen, dazu feste Dashboard IDs und Anleitungen für typische Abläufe.

Beispiele:
- `funnel-query`: welche Events man verknüpft, um den Weg von Registrierung über Aktivierung bis zur Zahlung zu sehen, plus die Tabelle mit der maßgeblichen User ID
- `cohort-compare`: vergleicht Bindung oder Conversion zweier Kohorten und markiert statistisch signifikante Unterschiede
- `grafana`: Datenquellen, Clusternamen und eine Tabelle, welches Dashboard zu welchem Problem gehört

### 4. Geschäftsprozesse und Team Automatisierung

Diese Skills machen aus wiederkehrenden Abläufen einen einzigen Befehl. Meist sind es einfache Anweisungen, die aber von anderen Skills oder MCPs abhängen können. Laut Thariq hilft es, frühere Ergebnisse in Logdateien zu speichern. So bleibt das Modell konsistent und kann auf frühere Durchläufe zurückblicken.

Beispiele:
- `standup-post`: sammelt Tickets, GitHub Aktivität und frühere Slack Nachrichten und baut daraus ein Standup, nur mit Änderungen
- `create-<ticket-system>-ticket`: hält das Ticket Schema ein und erledigt die Schritte danach, etwa Reviewer anpingen und in Slack verlinken
- `weekly-recap`: gemergte Pull Requests, geschlossene Tickets und Deployments als fertiger Wochenrückblick

### 5. Code Gerüste und Vorlagen

Diese Skills erzeugen Grundgerüste für eine bestimmte Funktion in der Codebasis. Man kann sie mit Skripten kombinieren. Besonders nützlich sind sie, wenn das Gerüst Anforderungen in natürlicher Sprache hat, die sich nicht rein in Code abbilden lassen.

Beispiele:
- `new-<framework>-workflow`: legt einen neuen Service, Workflow oder Handler mit den eigenen Annotationen an
- `new-migration`: die Vorlage für Migrationsdateien plus typische Fallen
- `create-app`: neue interne App, bei der Auth, Logging und Deployment schon eingerichtet sind

### 6. Code Qualität und Review

Diese Skills setzen Qualitätsregeln in der Organisation durch und helfen beim Review. Für maximale Verlässlichkeit können sie feste Skripte oder Tools enthalten. Laut Thariq kann man sie automatisch über [Hooks](/glossar/hooks/) oder in einer GitHub Action laufen lassen.

Beispiele:
- `adversarial-review`: startet einen Subagent mit frischem Blick, der den Code kritisiert, setzt die Korrekturen um und wiederholt das, bis nur noch Kleinigkeiten übrig sind
- `code-style`: setzt den Code Stil durch, vor allem dort, wo Claude ihn von sich aus nicht gut trifft
- `testing-practices`: Anleitung, wie man Tests schreibt und was man testet

### 7. CI/CD und Deployment

Diese Skills helfen, Code zu holen, zu pushen und zu deployen. Sie können andere Skills nutzen, um Daten zu sammeln.

Beispiele:
- `babysit-pr`: überwacht einen Pull Request, startet wackelige CI Läufe neu, löst Merge Konflikte und schaltet Auto Merge ein
- `deploy-<service>`: Build, Smoke Test, schrittweise mehr Traffic mit Vergleich der Fehlerrate und automatischer Rollback bei Verschlechterung
- `cherry-pick-prod`: isolierter Worktree, Cherry Pick, Konflikte lösen und Pull Request mit Vorlage

### 8. Runbooks

Diese Skills starten bei einem Symptom, etwa einem Slack Thread, einem Alarm oder einer Fehlermeldung. Sie gehen eine Untersuchung über mehrere Tools durch und liefern einen strukturierten Bericht.

Beispiele:
- `<service>-debugging`: ordnet Symptome den passenden Tools und Abfragen zu, für die Services mit dem meisten Traffic
- `oncall-runner`: holt den Alarm, prüft die üblichen Verdächtigen und schreibt das Ergebnis auf
- `log-correlator`: sucht zu einer Request ID die passenden Logs aus allen Systemen, die sie berührt haben könnten

### 9. Infrastruktur Betrieb

Diese Skills erledigen Routinewartung und Abläufe im Betrieb. Manche davon enthalten zerstörerische Aktionen, bei denen Leitplanken helfen. So fällt es Engineers leichter, sich bei kritischen Arbeiten an bewährte Abläufe zu halten.

Beispiele:
- `<resource>-orphans`: findet verwaiste Pods und Volumes, meldet sie in Slack, wartet eine Frist ab, holt eine Bestätigung ein und räumt dann auf
- `dependency-management`: der Freigabeprozess der Organisation für neue Abhängigkeiten
- `cost-investigation`: klärt, warum die Rechnung für Speicher oder Datenverkehr gestiegen ist, mit den konkreten Buckets und Abfragen

## Fazit

Thariqs Liste zeigt, wie breit Skills im Claude Code Team eingesetzt werden. Sie reichen von Wissen über eine Library bis zum Aufräumen in der Infrastruktur. Gute Skills haben eine klare Aufgabe und passen in genau einen Typ. Wie das Team Skills schreibt und teilt, beschreibt Thariq im zweiten Teil seines Artikels.

Wir verfolgen die Neuigkeiten rund um Agentic Coding laufend. Was wir dabei lernen, testen wir zuerst in eigenen Side Projects. Was sich bewährt, bringen wir in Kundenprojekte und in unsere Workshops. Wenn ihr Skills in eurem Team aufbauen wollt, schaut euch gern den [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer) an.
