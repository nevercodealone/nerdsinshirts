---
title: "Persistente Agents absichern, so macht es OpenAI mit OpenClaw"
description: "OpenAI betreibt über 500 Agents rund um die Uhr. Kevin S Lin beschreibt, mit welchen fünf Maßnahmen das Team sie absichert."
pubDate: 2026-11-14
author: roland-golla
tags:
  - Security
  - OpenClaw
  - Agentic Coding
draft: true
image: "./_bilder/persistente-agents-absichern-header.jpg"
imageAlt: "Grüner Comic: Roboter Agents in Glaswürfeln an einer Rennstrecke, ein Wächter Roboter prüft ihre Aktionen"
workshop: developer
tldr: "Persistente Agents laufen dauerhaft, ändern ihre eigene Konfiguration und schreiben beliebigen Code. OpenAI stuft sie deshalb als nicht vertrauenswürdig ein und sichert sie mit fünf Maßnahmen ab: getrennte Ausführung, Sandbox, ein zweiter Agent als Prüfer, eine eigene Identität pro Agent und vollständige Protokolle."
quoteText: "Attacks come from the inside when agents take misaligned actions."
quoteAuthor: "Kevin S Lin"
quoteRole: "Autor im OpenAI Developer Blog"
quoteUrl: "https://developers.openai.com/blog/securing-persistent-agents-like-openclaw-at-openai"
faq:
  - question: "Was sind persistente Agents 2026?"
    answer: "Persistente Agents laufen dauerhaft, haben einen breiten Auftrag und handeln ohne Eingabe eines Menschen. Eine normale Codex Session hat dagegen ein festes Ziel, und ein Mensch steuert sie. OpenClaw ist ein Open Source Projekt für solche Agents. OpenAI betreibt laut Kevin S Lin intern mehr als 500 persistente Agents."
  - question: "Warum sind persistente Agents 2026 ein Sicherheitsrisiko?"
    answer: "Klassische Software folgt fester Konfiguration und festem Code, Angriffe kommen meist von außen. Persistente Agents können ihre eigene Konfiguration ändern und beliebigen Code schreiben. Laut Kevin S Lin kommt die Gefahr deshalb auch von innen, wenn ein Agent Aktionen ausführt, die niemand wollte."
  - question: "Wie sichert OpenAI seine Agents 2026 ab?"
    answer: "Mit fünf Maßnahmen. Steuerung und Agent laufen getrennt. Eine Sandbox begrenzt Netzwerk, Dateien, Prozesse und Zugangsdaten. Ein zweiter Agent genehmigt die Aktionen des ersten. Jeder Agent hat eine eigene Identität. Und jede Konfigurationsänderung sowie jede Runde eines Agents wird protokolliert."
  - question: "Was ist Auto Review 2026?"
    answer: "Bei Auto Review überwacht ein zweiter Agent die Aktionen des ersten und genehmigt sie. Menschen müssen so nicht jede Aktion freigeben und werden nur für wichtige Entscheidungen gebraucht. Auto Review ist in OpenClaw und Codex eingebaut. Bei OpenAI ist es für alle Aktionen der OpenClaw Agents Pflicht."
  - question: "Was ist OpenClaw Enterprise 2026?"
    answer: "OpenClaw Enterprise ist eine offene, herstellerneutrale Steuerzentrale für Agents, die OpenAI auf dem DevDay vorgestellt hat. Wer einen Agent mit dem Standard Codex Preset startet, bekommt viele der beschriebenen Schutzmaßnahmen gleich mit. Laut Kevin S Lin läuft die Pilotphase, Version 1.0 ist bis Ende des Jahres geplant."
  - question: "Warum bekommt jeder Agent eine eigene Identität?"
    answer: "Damit klar ist, ob eine Aktion vom Agent oder vom Menschen kam. Bei OpenAI hat jeder Agent ein eigenes ChatGPT Service Account. Er nutzt damit einen eigenen Zugang zum Modell, seine Aktionen lassen sich prüfen, Teams können eigene Plugins anbinden, und im Notfall lässt sich sein Zugang zum Modell sperren."
sources:
  - title: "Securing persistent agents like OpenClaw at OpenAI"
    url: "https://developers.openai.com/blog/securing-persistent-agents-like-openclaw-at-openai"
    publisher: "OpenAI Developers, Kevin S Lin"
  - title: "OpenClaw Remote Harness"
    url: "https://docs-enterprise.openclaw.org/guides/topics/remote-harness/#gateway-and-harness"
    publisher: "OpenClaw Enterprise Doku"
  - title: "OpenClaw auf GitHub"
    url: "https://github.com/openclaw/openclaw"
    publisher: "GitHub"
  - title: "Codex Managed Configuration, requirements.toml"
    url: "https://developers.openai.com/codex/enterprise/managed-configuration#admin-enforced-requirements-requirementstoml"
    publisher: "Codex Doku"
  - title: "Codex Sandbox und Freigaben"
    url: "https://developers.openai.com/codex/agent-approvals-security#common-sandbox-and-approval-combinations"
    publisher: "Codex Doku"
  - title: "Auto Review"
    url: "https://alignment.openai.com/auto-review/"
    publisher: "OpenAI Alignment"
  - title: "ChatGPT Service Accounts"
    url: "https://learn.chatgpt.com/docs/enterprise/service-accounts"
    publisher: "ChatGPT Enterprise Doku"
  - title: "OpenClaw Enterprise"
    url: "https://openclaw.ai/blog/openclaw-enterprise"
    publisher: "OpenClaw Blog"
  - title: "Standard Codex Preset"
    url: "https://github.com/openclaw/openclaw-enterprise/blob/main/docs/guides/topics/standard-codex-preset.md"
    publisher: "GitHub"
---

## Persistente Agents greifen von innen an

OpenAI lässt intern mehr als 500 Agents dauerhaft im Hintergrund arbeiten, darunter Hunderte OpenClaw Agents. Wie das Unternehmen sie absichert, hat Kevin S Lin am 12. November im [OpenAI Developer Blog](https://developers.openai.com/blog/securing-persistent-agents-like-openclaw-at-openai) beschrieben.

Er grenzt persistente Agents von normalen Codex Sessions ab. Eine Session hat ein festes Ziel, und ein Mensch steuert sie. Ein persistenter Agent läuft rund um die Uhr, hat einen breiten Auftrag und handelt ohne Eingabe.

Damit ändert sich die Bedrohung. Klassische Software folgt fester Konfiguration und festem Code, Angreifer kommen von außen. Ein persistenter Agent kann seine eigene Konfiguration ändern und beliebigen Code schreiben. Lin fasst das so zusammen:

> Attacks come from the inside when agents take misaligned actions.

Angriffe kommen also von innen, wenn ein Agent Aktionen ausführt, die niemand wollte. OpenAI begegnet dem mit fünf Maßnahmen:

| Maßnahme | Was sie bewirkt |
|---|---|
| Ausführung trennen | Steuerung und Agent laufen in getrennten Umgebungen |
| Harte Grenzen | Eine Sandbox begrenzt Netzwerk, Dateien, Prozesse und Zugangsdaten |
| Modelle als Prüfer | Ein zweiter Agent genehmigt die Aktionen des ersten |
| Eigene Identität | Jeder Agent hat ein eigenes Konto, getrennt vom Nutzer |
| Alles protokollieren | Jede Konfigurationsänderung und jede Runde wird gespeichert |

## Vertrauenswürdigen Code vom Agent trennen

OpenAI teilt das System in zwei Teile. Netzwerk, Identität und Sandbox gelten als vertrauenswürdig, weil sie aus festem Code bestehen, der genau das tut, was konfiguriert ist. Der Agent, seine Umgebung und der Code, den er schreibt, gelten als nicht vertrauenswürdig.

Für diese Trennung hat OpenAI dem Open Source Projekt OpenClaw die [Remote Harness Execution](https://docs-enterprise.openclaw.org/guides/topics/remote-harness/#gateway-and-harness) hinzugefügt. Der OpenClaw Gateway, der die Agents konfiguriert, läuft dadurch in einem eigenen Container, getrennt vom Agent. Bei OpenAI steht er sogar in einem eigenen Cluster. Die Sandbox muss sich so nur noch um den Agent kümmern.

## Harte Grenzen mit der Sandbox ziehen

OpenAI nutzt die Sandbox von Codex und begrenzt den Agent in vier Bereichen. Im Netzwerk erreicht er nur Adressen auf einer zentral gepflegten Allowlist, bestimmte Ziele sind zusätzlich ausdrücklich gesperrt. Schreiben darf er nur in seinem Arbeitsordner. Seine Prozesse laufen isoliert in der Linux Sandbox von Codex. Und Zugangsdaten verwaltet ein Credential Broker, sodass der Agent sie nicht zu sehen bekommt.

Zwei Dinge hat OpenAI zusätzlich abgestellt. Den Modus `danger-full-access` gibt es nicht mehr. Und die Websuche läuft nur als zwischengespeicherte Suche über OpenAIs eigenen Index.

Die Regeln stehen in zwei Dateien. In der `requirements.toml` legen Administratoren fest, was niemand lockern darf. Erlaubt sind nur die Sandbox Modi `read-only` und `workspace-write`. Jeder Netzwerkzugriff läuft über einen verwalteten Proxy, und niemand kann die Allowlist selbst erweitern. Gesperrt sind unter anderem pastebin.com, webhook.site und die Metadaten Adresse `169.254.169.254`.

In der `config.toml` steht die Konfiguration der Agents. Der Ordner `.ssh` ist gesperrt, geschrieben wird nur im Arbeitsordner, vorgegebene Inhalte sind nur lesbar. GitHub Tokens wie `GH_TOKEN` und `GITHUB_TOKEN` werden aus der Shell der Agents entfernt. Apps sind ausgeschaltet, Aktionen, die etwas zerstören oder nach außen wirken, ebenfalls.

Lin nennt dabei selbst eine Grenze: Das Entfernen der Tokens verbirgt keine Zugangsdaten, die in lesbaren Dateien liegen.

## Modelle als zusätzliche Prüfer einsetzen

Die bisherigen Maßnahmen bestehen aus festem Code. Lin argumentiert, dass die Abwehr mit fähigeren Modellen mitwachsen muss, und zwar mit mehr Rechenleistung für andere Modelle.

Dafür setzt OpenAI [Auto Review](https://alignment.openai.com/auto-review/) ein. Ein zweiter Agent überwacht die Aktionen des ersten und genehmigt sie. Der Grund: Wenn Menschen ständig Freigaben erteilen müssen, ermüden sie und bestätigen Anfragen irgendwann blind. Mit Auto Review bleibt ihre Aufmerksamkeit für die wichtigen Freigaben.

Auto Review ist in OpenClaw und Codex eingebaut. Bei OpenAI ist es für alle Aktionen der OpenClaw Agents Pflicht.

## Jedem Agent eine eigene Identität geben

Aktionen müssen nachvollziehbar sein, und es muss klar sein, ob ein Agent oder ein Mensch gehandelt hat. OpenAI trennt deshalb die Identität des Agents von der des Nutzers. Jeder Agent hat ein eigenes [ChatGPT Service Account](https://learn.chatgpt.com/docs/enterprise/service-accounts).

Damit nutzt der Agent einen eigenen Zugang zum Modell, getrennt vom Nutzer. Seine Aktionen lassen sich prüfen. Teams können eigene Plugins anbinden. Und im Notfall lässt sich sein Zugang zum Modell abschalten.

Lin unterscheidet dabei Agent Identität und Service Accounts. Ein Service Account gibt einem Bot eigenen Zugriff auf eine API. Beides soll zusammen genutzt werden: Der Agent handelt unter seiner eigenen Identität und erreicht andere Dienste über Service Accounts, die an diese Identität gebunden sind. Als technische Grundlage nennt der Artikel zwei Standardentwürfe. WAG regelt den eigenen Zugriff eines Agents auf Ressourcen, XAA den Zugriff im Auftrag eines Nutzers über OAuth.

## Alles protokollieren

Um Fehlverhalten zu erkennen und nachzuverfolgen, braucht es laut Lin Einblick in den ganzen Lebenszyklus, von der Konfiguration bis zur Aktion. OpenAI protokolliert deshalb jede Änderung an der Konfiguration und jede Runde jedes Agents.

Weil diese Runden sensible Informationen enthalten können, sind die Protokolle gesperrt. Zugriff hat nur ein kleiner Kreis im Security Team.

## Erste Ergebnisse und OpenClaw Enterprise

Lin schreibt, dass der Einsatz persistenter Agents noch am Anfang steht. Es fehlen bewährte Vorgehensweisen, das erschwert den Einsatz in Unternehmen.

Der interne Pilot mit OpenClaw hat laut Artikel Produktivität und Nutzung deutlich gesteigert, in technischen und nicht technischen Teams. Die Agents öffnen zum Beispiel Pull Requests aus Produktfeedback oder fahren laufend Datenexperimente.

Auf dem DevDay hat OpenAI [OpenClaw Enterprise](https://openclaw.ai/blog/openclaw-enterprise) vorgestellt, eine offene und herstellerneutrale Steuerzentrale für Agents. Wer einen Agent mit dem [Standard Codex Preset](https://github.com/openclaw/openclaw-enterprise/blob/main/docs/guides/topics/standard-codex-preset.md) startet, bekommt viele der beschriebenen Schutzmaßnahmen gleich mit. OpenClaw Enterprise ist in der Pilotphase, Version 1.0 ist bis Ende des Jahres geplant.

## Fazit

Kevin S Lin zeigt, wie OpenAI persistente Agents absichert: Steuerung und Agent getrennt, eine strenge Sandbox, ein zweiter Agent als Prüfer, eine eigene Identität für jeden Agent und vollständige Protokolle. Die Konfigurationsbeispiele aus dem Artikel machen die Maßnahmen konkret, bis hin zu gesperrten Ordnern und entfernten Tokens.

Für uns sind solche Einblicke der Grund, warum wir die Neuigkeiten rund um Agentic Coding laufend verfolgen. Was wir dabei lernen, testen wir zuerst praktisch in eigenen Side Projects. Was sich dort bewährt, bringen wir in Kundenprojekte und in unsere Workshops. Wenn ihr Coding Agents in eurem Team mit klaren Leitplanken einsetzen wollt, schaut euch gern den [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer) an.
