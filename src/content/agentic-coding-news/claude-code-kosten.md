---
title: "Claude Code Kosten senken, Token, Cache und Compaction erklärt"
description: "Wie Prompt Cache, Compaction, Effort und Subagents die Nutzung in Claude Code bestimmen. Mit den Tipps von Lydia Hallie und der aktuellen Kritik."
pubDate: 2026-11-01
author: roland-golla
tags:
  - Claude Code
  - Kontext
  - Kosten
draft: false
workshop: developer
tldr: "Claude Code schickt bei jeder Nachricht die ganze bisherige Unterhaltung an das Modell. Wer Cache, Compaction, Effort und Subagents versteht, spart Nutzung. Seit Mitte Oktober gibt es dazu Idle Compaction, eine Warnung beim Fortsetzen und viele Berichte über zu schnell leere Limits. Anthropic fand dafür keine einzelne Ursache."
quoteText: "auto-compact does summarize. When it runs, your whole conversation is replaced by a short summary."
quoteAuthor: "Lydia Hallie"
quoteRole: "Claude Code Team, Anthropic"
quotePosition: "Claude Code Team"
quoteCompany: "Anthropic"
quoteUrl: "https://x.com/lydiahallie/status/2108624109538291901"
faq:
  - question: "Warum kostet eine lange Session in Claude Code 2026 mehr?"
    answer: "Weil bei jeder neuen Nachricht die gesamte bisherige Unterhaltung erneut an das Modell geht. Jeder Tool Aufruf schickt sie noch einmal mit. Meist kommen diese Token günstig aus dem Cache, sie zählen aber trotzdem gegen die Nutzung. Deshalb empfehlen Lydia Hallie und die Doku, zwischen zwei Aufgaben /clear zu nutzen."
  - question: "Wie lange hält der Prompt Cache in Claude Code 2026?"
    answer: "Mit einem Claude Abo innerhalb der Plan Nutzung hält der Cache der Hauptunterhaltung eine Stunde. Mit API Key, Cloud Anbieter oder Usage Credits sind es fünf Minuten. Subagents bekommen auch im Abo nur fünf Minuten. Ab Version 2.1.242 lässt sich das mit promptCacheTtl und subagentPromptCacheTtl selbst festlegen."
  - question: "Was ist Idle Compaction in Claude Code 2026?"
    answer: "Idle Compaction fasst im Terminal eine Unterhaltung mit mehr als 200.000 Token zusammen, wenn sie etwa 54 Minuten ungenutzt ist, kurz bevor der einstündige Cache abläuft. Mit dem Standard von fünf Minuten, etwa per API Key, greift sie nicht. Claude arbeitet danach nur mit der Zusammenfassung weiter. Abschalten geht mit idleCompaction false oder in /config."
  - question: "Bricht ein Wechsel von Modell oder Effort 2026 den Cache?"
    answer: "Ein Modellwechsel bricht den Cache immer, weil jedes Modell seinen eigenen Cache hat. Beim Effort hängt es vom Modell ab. Bei Opus 5.5, Sonnet 5.5, Haiku 5.5 und Fable 5.1 bleibt der Cache mit API Key oder Abo erhalten. Auf Bedrock, Google Cloud und über einen Claude Apps Gateway gilt das nicht."
  - question: "Warum sind die Claude Code Limits 2026 so schnell leer?"
    answer: "Seit Mitte Oktober melden viele Nutzer, dass ihre Limits schneller leer sind. Laut Boris Cherny fand Anthropic keine einzelne Ursache und keine Regression, nur kleinere Fehler, die behoben werden. Meist lag es an schweren Sessions mit xhigh Effort, /goal, Workflows oder Agent Teams. Subagents erben den Effort der Session. /usage zeigt, wo die Token hingehen."
  - question: "Was geht bei Auto Compact verloren?"
    answer: "Die Unterhaltung wird durch eine Zusammenfassung ersetzt. Exakte Fehlermeldungen, verworfene Ansätze und einmal genannte Vorgaben können dabei fehlen. Erhalten bleiben System Prompt, die CLAUDE.md im Projekt, Auto Memory und der Plan aus dem Plan Mode. Bis zu fünf zuletzt geänderte Dateien liest Claude Code neu ein."
  - question: "Was ist besser, /compact oder /clear?"
    answer: "Für eine neue Aufgabe ist /clear besser. Es kostet nichts und startet frisch. /compact lohnt sich, wenn man an derselben Aufgabe weiterarbeiten will. Es liest dafür die ganze Unterhaltung, was bei kaltem Cache teuer ist. Mit einer Anweisung wie /compact focus on the auth bug bestimmt man selbst, was die Zusammenfassung behält."
  - question: "Wann lohnen sich Subagents?"
    answer: "Subagents haben ein eigenes Kontextfenster. Nur ihre Antwort kommt in die Hauptsession zurück. Das lohnt sich für Aufgaben mit viel Ausgabe, etwa Tests oder Logs. Ihre Anfragen zählen trotzdem gegen die Nutzung, und ihr Cache hält nur fünf Minuten. Ein günstigeres Subagent Modell senkt die Kosten."
  - question: "Gibt es den Befehl /cost noch?"
    answer: "Ja, /cost ist heute ein Alias für /usage. Dort stehen Kosten der Session, die Limits des Plans, eine Zeile zum Prompt Cache und eine Aufschlüsselung nach Skills, Subagents, Plugins und MCP Servern. Seit Version 2.1.305 setzt die Taste f passende Empfehlungen direkt um."
sources:
  - title: "Maximizing the value of your Claude Code sessions"
    url: "https://claude.com/blog/maximizing-the-value-of-your-claude-code-sessions"
    publisher: "Claude Blog, Lydia Hallie"
  - title: "Lydia Hallie zu Auto Compact"
    url: "https://x.com/lydiahallie/status/2108624109538291901"
    publisher: "X"
  - title: "Lydia Hallie zu Idle Compaction"
    url: "https://x.com/lydiahallie/status/2110484840256819380"
    publisher: "X"
  - title: "Lydia Hallie zu Effort und Prompt Cache bei Opus 5.5"
    url: "https://x.com/lydiahallie/status/2102513987699212344"
    publisher: "X"
  - title: "Lydia Hallie zum Subagent Modell"
    url: "https://x.com/lydiahallie/status/2099195114115707210"
    publisher: "X"
  - title: "Lydia Hallie zum Autocompact Fenster pro Modell"
    url: "https://x.com/lydiahallie/status/2107905737179734173"
    publisher: "X"
  - title: "Addy Osmani: Modell und Effort zu Beginn wählen"
    url: "https://x.com/addyosmani/status/2092424172907745451"
    publisher: "X"
  - title: "Addy Osmani zu den Aufräumbefehlen in Claude Code"
    url: "https://x.com/addyosmani/status/2098297991019057363"
    publisher: "X"
  - title: "Boris Cherny zur Analyse der Nutzungsberichte"
    url: "https://x.com/bcherny/status/2115592371224346734"
    publisher: "X"
  - title: "Lydia Hallie: Die Limits haben sich nicht geändert"
    url: "https://x.com/lydiahallie/status/2113366380842254746"
    publisher: "X"
  - title: "Lydia Hallie: Fragen zu Cache, Subagents und Effort"
    url: "https://x.com/lydiahallie/status/2113400495058686376"
    publisher: "X"
  - title: "Claude: Max Pläne umbenannt, Fünfstundenlimit für Ultra entfällt"
    url: "https://x.com/claudeai/status/2116220869479428500"
    publisher: "X"
  - title: "Manage costs effectively"
    url: "https://code.claude.com/docs/en/costs"
    publisher: "Claude Code Doku"
  - title: "How Claude Code uses prompt caching"
    url: "https://code.claude.com/docs/en/prompt-caching"
    publisher: "Claude Code Doku"
  - title: "Explore the context window"
    url: "https://code.claude.com/docs/en/context-window"
    publisher: "Claude Code Doku"
  - title: "Claude Code Changelog"
    url: "https://code.claude.com/docs/en/changelog"
    publisher: "Claude Code Doku"
  - title: "Issue 98747: Idle Compaction verwirft Arbeitskontext"
    url: "https://github.com/anthropics/claude-code/issues/98747"
    publisher: "GitHub"
  - title: "Issue 105240: Max 5x Wochenlimit nach 48 Stunden bei 94 Prozent"
    url: "https://github.com/anthropics/claude-code/issues/105240"
    publisher: "GitHub"
  - title: "Issue 106372: Opus 5.5 Limits etwa viermal so schnell leer"
    url: "https://github.com/anthropics/claude-code/issues/106372"
    publisher: "GitHub"
  - title: "Claude Code idle compaction, cheaper to resume, but from a summary"
    url: "https://www.dsebastien.net/2026-10-16-claude-code-idle-compaction-cheaper-to-resume-but-from-a-summary/"
    publisher: "Sébastien Dubois"
---

## Warum Claude Code so viele Token verbraucht

Wer die Kosten in Claude Code senken will, muss zuerst eines verstehen. Das Modell merkt sich zwischen zwei Nachrichten nichts. Claude Code schickt deshalb bei jeder Nachricht alles noch einmal mit: System Prompt, CLAUDE.md, gelesene Dateien, Ausgaben von Befehlen und alle früheren Antworten. Dieser Gesamttext heißt Kontext. Er wächst mit jeder Runde.

Und es ist nicht eine Anfrage pro Nachricht. Jedes Mal, wenn Claude ein Tool nutzt, geht eine weitere Anfrage mit dem ganzen Kontext raus. Die Doku sagt es deutlich: Eine einzeilige Frage in einer Session, die den ganzen Tag offen ist, zieht Nutzung für die ganze Unterhaltung.

Lydia Hallie aus dem Claude Code Team hat im August im Claude Blog beschrieben, [wie man das Beste aus einer Session herausholt](https://claude.com/blog/maximizing-the-value-of-your-claude-code-sessions). Seitdem postet sie auf X fast wöchentlich Neuerungen dazu. Ihr Grundgedanke: Effizient heißt, die Token in die eigentliche Aufgabe zu stecken und nicht in Ballast.

Dieser Artikel bündelt ihre Tipps, den aktuellen Stand der [offiziellen Doku](https://code.claude.com/docs/en/costs) und das, was im Oktober schiefgelaufen ist.

## Was die Kosten in Claude Code bestimmt

Laut Lydias Artikel bestimmen vier Dinge, was eine Aufgabe kostet:

| Treiber | Was dahinter steckt |
|---|---|
| Modell | Jedes Token wird mit dem Preis des Modells multipliziert. Große Modelle für schwere Aufgaben, kleine für Routine. |
| Eingabe gegen Ausgabe | Ausgabe Token kosten etwa das Fünffache von Eingabe Token. |
| Cache | Aus dem Cache gelesene Token kosten etwa ein Zehntel, Schreiben in den Cache bis zum Doppelten. |
| Thinking | Das Effort Level steuert, wie viel das Modell pro Runde nachdenkt. Thinking wird als Ausgabe abgerechnet. |

Zur Einordnung nennt die Doku Zahlen aus Enterprise Einsätzen: im Schnitt etwa 13 Dollar pro Entwickler und aktivem Tag, 150 bis 250 Dollar im Monat. Bei 90 Prozent der Nutzer bleibt es unter 30 Dollar pro aktivem Tag. Im Abo zählt dagegen nicht der Dollarbetrag, sondern der Anteil am Limit für fünf Stunden und für die Woche.

## Claude Code Prompt Cache richtig nutzen

Der Cache ist der größte Hebel. Claude Code verwaltet ihn automatisch. Das Prinzip: Der Anfang einer Anfrage wird mit dem verglichen, was der Server zuletzt verarbeitet hat. Passt er exakt, wird er günstig aus dem Cache gelesen. Ändert sich irgendetwas weiter vorne, wird alles dahinter neu und zum vollen Preis verarbeitet. Es gibt keinen Cache pro Datei.

### Wie lange der Cache hält

Die Doku unterscheidet zwei Gruppen von Anfragen:

| Anfragen | Abo im Rahmen der Plan Nutzung | API Key, Cloud Anbieter oder Usage Credits |
|---|---|---|
| Hauptunterhaltung | eine Stunde | fünf Minuten |
| Subagents, Workflows, Compaction | fünf Minuten, bis auf einige Hilfsanfragen, die Anthropic serverseitig auf eine Stunde setzt | fünf Minuten |

Zwei Details überraschen viele. Sobald man im Abo über das Limit geht und Usage Credits nutzt, fällt auch die Hauptunterhaltung auf fünf Minuten. Und Subagents haben auch im Abo nur fünf Minuten. Ab Version 2.1.242 lässt sich das mit `promptCacheTtl` und `subagentPromptCacheTtl` in der settings.json selbst festlegen. Wer mit API Key arbeitet und oft Pausen macht, kann so eine Stunde einstellen. Das Schreiben in den Cache kostet dann aber mehr.

### Was den Cache bricht

Laut der [Doku zum Prompt Caching](https://code.claude.com/docs/en/prompt-caching) führen diese Aktionen zu einer langsamen und teuren Runde:

- **Modellwechsel mit `/model`:** Jedes Modell hat seinen eigenen Cache. Das gilt auch für `opusplan`, das beim Plan Mode zwischen Opus und Sonnet wechselt, und für Skills mit eigenem `model` im Frontmatter.
- **Effort Wechsel:** bei den meisten Modellen ja. Bei Opus 5.5, Sonnet 5.5, Haiku 5.5 und Fable 5.1 mit API Key oder Abo bleibt der Cache inzwischen erhalten, nicht aber auf Bedrock, Google Cloud oder über einen Claude Apps Gateway.
- **Fast Mode einschalten:** einmal pro Unterhaltung. Am besten gleich zu Beginn.
- **MCP Server hinzufügen oder entfernen:** nur wenn die Tools nicht verzögert geladen werden. Mit Tool Search, dem Standard, bleibt der Cache.
- **Ein ganzes Tool verbieten,** etwa `Bash` als Deny Regel, ebenfalls nur ohne Tool Search.
- **Plugins mit eigenen MCP Servern** ein oder ausschalten. Skills, Commands und Hooks aus Plugins brechen den Cache nicht.
- **`/compact`:** ersetzt die Unterhaltung. Der System Prompt bleibt im Cache.
- **Viele Bilder:** Claude Code entfernt dann die ältesten, und ab dort wird neu gelesen.
- **Update von Claude Code:** die erste Session nach dem Neustart baut den Cache neu auf.
- **Pause länger als die Cache Dauer.**

Genauso wichtig ist, was den Cache **nicht** bricht: Dateien im Repo bearbeiten, Permission Mode wechseln, Output Style ändern, Skills aufrufen, `/recap`, `/rewind` und Subagents starten.

Ein Fallstrick: Wer die CLAUDE.md mitten in der Session ändert, bricht den Cache nicht. Die Änderung wirkt aber auch erst nach `/clear`, `/compact` oder einem Neustart.

Addy Osmani hat Ende August [auf X ergänzt](https://x.com/addyosmani/status/2092424172907745451): Modell und Effort am Anfang einer Session wählen. Die Doku formuliert es fast gleich und rät, `/compact` für natürliche Pausen zwischen Aufgaben aufzuheben.

Lydias Tipp aus ihrem Artikel: Wer einen falschen Weg verwerfen will, nutzt `/rewind` statt `/compact`. Die früheren Runden liegen dann noch im Cache.

## Claude Code compact und autocompact erklärt

Compaction heißt: Die Unterhaltung wird durch eine Zusammenfassung ersetzt. Weil das auf X oft falsch verstanden wurde, hat Lydia es im Oktober [klargestellt](https://x.com/lydiahallie/status/2108624109538291901):

> auto-compact does summarize. When it runs, your whole conversation is replaced by a short summary.

Auto Compact behält also nicht einfach die letzten Token. Bei Modellen mit 1 Million Token Kontext läuft es laut Lydia standardmäßig erst bei etwa 967.000 Token. Bis dahin enthält jede Anfrage die komplette Unterhaltung. Ihre Lösung:

```text
/autocompact 400k
```

Dann wird schon bei 400.000 Token zusammengefasst. Das Fenster wird [pro Modell gespeichert](https://x.com/lydiahallie/status/2107905737179734173). Wer mit API Abrechnung arbeitet, kann zum Beispiel Haiku 5.5 schon bei 100.000 Token zusammenfassen lassen, ohne die anderen Modelle zu ändern.

### Was nach der Compaction bleibt

Die [Doku zum Kontextfenster](https://code.claude.com/docs/en/context-window) listet genau auf, was eine Compaction überlebt:

| Inhalt | Nach der Compaction |
|---|---|
| System Prompt und Output Style | bleiben |
| CLAUDE.md im Projekt, Auto Memory | werden neu von der Platte geladen |
| Plan aus dem Plan Mode | wird neu geladen |
| Gelesene oder bearbeitete Dateien | bis zu fünf, die zuletzt geänderten zuerst. Dateien über 5.000 Token nur als Pfad |
| Aufgerufene Skills | gekürzt auf 5.000 Token pro Skill, 25.000 insgesamt |
| Regeln mit `paths:` und verschachtelte CLAUDE.md | weg, sie laden erst beim nächsten passenden Zugriff |
| Alles andere aus der Unterhaltung | nur noch als Zusammenfassung |

Daraus folgen drei praktische Regeln. Was immer gelten muss, gehört in die CLAUDE.md im Projekt. Das Wichtigste eines Skills gehört an den Anfang der SKILL.md. Und wer selbst steuern will, was bleibt, gibt eine Anweisung mit:

```text
/compact focus on the auth bug fix
```

Die Kosten der Compaction selbst unterschätzen viele. `/compact` liest die ganze Unterhaltung, um sie zusammenzufassen. Bei warmem Cache ist das günstig. Nach einer langen Pause ist der Cache kalt, dann wird alles zum vollen Preis gelesen. `/clear` dagegen kostet nichts.

## Idle Compaction in Claude Code, Vorteil und Kritik

Mit Version 2.1.299 vom 14. Oktober kam **Idle Compaction** offiziell ins Changelog. Sie läuft im Terminal und nur mit dem einstündigen Cache, also typischerweise im Abo. Bleibt eine Unterhaltung mit mehr als 200.000 Token etwa 54 Minuten liegen, fasst Claude Code sie [kurz vor Ablauf des Caches zusammen](https://x.com/lydiahallie/status/2110484840256819380). Wer nach der Mittagspause zurückkommt, zahlt dann nur für die Zusammenfassung statt für den ganzen kalten Kontext.

Der Haken, den auch Lydia nennt: Claude arbeitet danach mit der Zusammenfassung weiter, nicht mit dem vollen Kontext.

### Die Kritik

Genau daran entzündet sich der Ärger. Im [GitHub Issue 98747](https://github.com/anthropics/claude-code/issues/98747) beschreibt ein Nutzer, dass die Funktion schon mit Version 2.1.286 still aktiv war, ohne Warnung und ohne Opt out. Von seinen etwa 20 parallelen Sessions wurden über Nacht sieben zusammengefasst. Exakte Anweisungen, Begründungen und vereinbarte Vorgehensweisen waren weg. Sein Fazit: Der Kontext sei der wertvolle Teil, er zahle lieber für das erneute Einlesen. Dazu kam, dass diese Compactions im Log als `manual` markiert waren, obwohl niemand `/compact` ausgeführt hatte.

Sébastien Dubois hält die Funktion in seinem [Blogpost](https://www.dsebastien.net/2026-10-16-claude-code-idle-compaction-cheaper-to-resume-but-from-a-summary/) für einen vernünftigen Standard, bringt das Problem aber auf drei Worte: „Compaction is lossy.“ Er nennt typische Verluste: ein vor zwei Stunden verworfener Ansatz, die exakte Fehlermeldung beim Debuggen, eine Vorgabe, die man einmal am Anfang genannt hat. Wer das später neu erklären muss, zahlt am Ende vielleicht mehr als für ein einziges volles Einlesen. Und oft merkt man gar nicht, was fehlt.

Inzwischen lässt sich die Funktion steuern. Laut Changelog braucht die Einstellung zum Abschalten Version 2.1.290 oder neuer. Seit 2.1.302 steht sie auch in `/config`, und der Hinweis nach einer Idle Compaction sagt, wie man sie abschaltet.

### So steuert ihr Idle Compaction

```json
{
  "idleCompaction": false
}
```

- **Ganz abschalten:** `idleCompaction` auf `false` in der settings.json oder die Zeile „Idle compaction“ in `/config`.
- **Später auslösen:** Mit `CLAUDE_CODE_IDLE_COMPACT_MIN_TOKENS` die Schwelle von 200.000 Token anheben, damit nur sehr große Sessions betroffen sind.
- **Selbst bestimmen, was bleibt:** vor der Pause `/compact` mit einer Anweisung ausführen.

### Neu: Warnung beim Fortsetzen

Seit Version 2.1.304 warnt Claude Code in Pro und Max Plänen, wenn das Fortsetzen einer alten Unterhaltung einen spürbaren Teil des Fünfstundenlimits kosten würde. Man kann trotzdem fortsetzen oder eine neue Unterhaltung starten. Claude kann die alte nachschlagen, wenn man sich darauf bezieht.

## Claude Code Effort Level einstellen

Effort legt fest, wie viel das Modell nachdenkt. Mehr Effort heißt bessere Antworten bei schweren Aufgaben, aber auch mehr Ausgabe Token. Bei Opus 5.5, Sonnet 5.5, Haiku 5.5 und den Fable Modellen lässt sich Thinking nicht abschalten. Dort ist `/effort` die Stellschraube.

Seit Claude Code 2.1.251 wird der Effort [pro Modell gespeichert](https://x.com/lydiahallie/status/2096026520422945202), über `/effort` oder in den `modelSettings` der settings.json. Für Fable 5.1 schrieb Lydia, Medium entspreche ungefähr Fable 5 auf High. Es sei das erste Modell, bei dem Medium ihr Standard ist.

Beim Cache hat sich viel getan. Anfang September schrieb Lydia, dass ein Effort Wechsel bei Fable 5.1 [den Cache nicht mehr bricht](https://x.com/lydiahallie/status/2096046163862679590). Für Opus 5.5 kam das [ab Claude Code 2.1.280](https://x.com/lydiahallie/status/2102513987699212344). Heute gilt es laut Doku auch für Sonnet 5.5 und Haiku 5.5. Der Effort lässt sich bei diesen Modellen also mitten in der Session senken, ohne dass es teuer wird.

Seit 2.1.299 warnt `/usage` außerdem, wenn Max Effort einen großen Teil der Nutzung ausmacht.

## Claude Code Subagents mit günstigerem Modell

Ein Subagent ist ein zweiter Agent, den Claude für eine Teilaufgabe startet. Er hat ein eigenes Kontextfenster. Nur seine Antwort kommt in die Hauptsession zurück. Das lohnt sich bei Aufgaben mit viel Ausgabe, etwa Tests ausführen oder Logs durchsuchen. Für kleine Aufgaben ist der Aufwand zu groß.

Wichtig: Der Subagent spart Platz in eurem Kontext, nicht automatisch Nutzung. Seine Anfragen zählen voll mit, und sein Cache hält nur fünf Minuten. Zwei Stellschrauben helfen:

- **Günstigeres Modell:** Lydia setzt das Subagent Modell auf Opus, weil Fable 5.1 viele Subagents startet, die selten Fable brauchen. Das [spart ihr nach eigener Aussage viel Nutzung](https://x.com/lydiahallie/status/2099195114115707210). Für einfache Subagents empfiehlt die Doku `model: haiku` in der Konfiguration.

```bash
CLAUDE_CODE_SUBAGENT_MODEL=opus
```

  Hat ein Subagent in seiner eigenen Definition ein `model` gesetzt, gilt dieser Wert.

- **Eigener Effort:** Subagents erben standardmäßig den Effort der Session. Laut [Boris Cherny](https://x.com/bcherny/status/2115592371224346734) summiert sich das schnell. Ein `effort` im Frontmatter des Subagents legt einen eigenen Wert fest. Seit Claude Code 2.1.292 kann man Claude außerdem bitten, [Subagents mit einem bestimmten Effort Level zu starten](https://x.com/lydiahallie/status/2107625236430798909).

Noch teurer sind Agent Teams. Laut Doku verbrauchen sie im Plan Mode etwa siebenmal so viele Token wie eine normale Session, weil jedes Teammitglied eine eigene Instanz ist.

## Claude Code Token Verbrauch anzeigen

Bevor man spart, sollte man sehen, wo die Token hingehen. Addy Osmani hat die Befehle dafür [auf X zusammengestellt](https://x.com/addyosmani/status/2098297991019057363). Der Stand Anfang November:

| Befehl | Zeigt |
|---|---|
| `/usage` | Kosten der Session, Limits des Plans und Aufschlüsselung nach Skills, Subagents, Plugins und MCP Servern. `/cost` ist heute nur noch ein Alias dafür |
| `/context` | Was gerade im Kontextfenster steckt, mit Vorschlägen |
| `/tasks` | Laufende und beendete Hintergrundarbeit, auch Subagents |
| `/insights` | HTML Bericht über eure letzten Sessions und wo es hakt |
| `/skill-doctor` | Welche Skills man wirklich nutzt |

In `/usage` stecken zwei neue Funktionen, die viele noch nicht kennen.

**Die Cache Zeile.** Seit 2.1.251 zeigt `/usage` eine Zeile „Prompt cache (main)“: Anteil der Eingabe aus dem Cache, Zahl der Misses und ob der Cache gerade warm ist. Seit 2.1.260 nennt sie oft auch die wahrscheinliche Ursache des letzten Miss, etwa geänderte Tool Definitionen. Liegt der Anteil dauerhaft niedrig, ändert sich irgendwo vorne im Kontext etwas.

**Empfehlungen mit f.** Für alles, was mindestens 10 Prozent der Nutzung ausmacht, zeigt `/usage` eine Empfehlung, etwa eine zu große CLAUDE.md oder Max Effort. Seit 2.1.305 setzt die Taste `f` passende Empfehlungen um. Effort Änderungen laufen direkt, bei anderen zeigt Claude jede Änderung vorher.

### Warum die Nutzung in langen Sessions steigt

Die Doku nennt Ursachen, an die kaum jemand denkt. Sie alle schicken den ganzen Kontext, auch wenn ihr gerade nichts tippt:

- `/loop` und andere geplante Aufgaben in der Session
- Nachrichten aus anderen eigenen Sessions, die als neue Runde ankommen
- Check ins bei einem aktiven Goal, höchstens drei zwischen zwei Prompts
- Subagents, Workflows und Agent Teams

## Was in Claude Code gerade nicht rund läuft

Ein ehrlicher Artikel über Kosten muss auch das zeigen. Seit Mitte Oktober häufen sich auf GitHub Berichte über Limits, die viel schneller leer sind als vorher, und zwar bei unveränderter Arbeitsweise.

- [Issue 105240](https://github.com/anthropics/claude-code/issues/105240): Max 5x, Wochenlimit nach weniger als 48 Stunden bei 94 Prozent. Spürbar ab dem 17. Oktober, schlimmer ab dem 24. Der Autor verlinkt sechs ähnliche Berichte.
- [Issue 106372](https://github.com/anthropics/claude-code/issues/106372): Team und Pro mit Opus 5.5. Früher zwei bis drei Stunden Arbeit, seit dem 27. Oktober etwa 30 Minuten.
- In verlinkten Issues berichten Nutzer sogar, dass die Nutzung stieg, während laut eigener Messung keine Anfragen den Rechner verließen.

Auch auf X kam das Thema hoch. Am 21. Oktober fragte ein Nutzer, warum seine Nutzung fünfmal so schnell schmelze. Boris Cherny antwortete zwei Tage später, man schaue sich das an.

### Was Anthropic dazu sagt

In den GitHub Issues ist bis zum 1. November keine öffentliche Antwort von Anthropic zu sehen. Auf X dagegen schon:

- **22. Oktober, Lydia Hallie:** Die Limits hätten sich [nicht geändert](https://x.com/lydiahallie/status/2113366380842254746). Sie bat um `/feedback` IDs und fragte [gezielt nach](https://x.com/lydiahallie/status/2113400495058686376): Kommt ihr oft nach mehr als einer Stunde in lange Sessions zurück, wenn der Cache abgelaufen ist? Nutzt ihr viele Subagents? Welches Modell und welcher Effort?
- **26. Oktober, Lydia Hallie:** Man prüfe die Berichte noch und brauche [weitere Feedback IDs](https://x.com/lydiahallie/status/2114557937587036433). Sie fragte auch, ob `/usage` Warnungen zeigt.
- **28. Oktober, Boris Cherny,** der Leiter von Claude Code, mit dem [Ergebnis der Analyse](https://x.com/bcherny/status/2115592371224346734).

Boris schreibt, das Team habe alle eingereichten Session IDs durchgesehen. Ein paar kleinere Probleme hätten Sessions schneller Token verbrauchen lassen als nötig, die Fixes würden ausgerollt. Aber:

> We didn't find a single root cause or any regression in Claude Code.

Meist ließ sich der höhere Verbrauch laut Boris auf ein oder zwei schwere Sessions zurückführen: xhigh Effort, `/goal`, Workflows, Agent Teams oder lange SDK Jobs. Das seien gute Arten, Claude Code zu nutzen. Es liege aber an Anthropic, klarer zu machen, wann man sie einsetzt und was sie kosten. Sein wichtigster Hinweis: Subagents erben standardmäßig den Effort der Session, und das summiert sich schnell.

In den Antworten zeigt sich, dass das nicht alle überzeugt. Manche fordern Gutschriften für die verbrauchte Nutzung. Andere ergänzen praktische Tipps, etwa ein eigenes `effort` im Frontmatter von Subagents.

Am 30. Oktober folgte eine Änderung der Pläne. Max 5x heißt jetzt [Max, Max 20x heißt Ultra](https://x.com/claudeai/status/2116220869479428500). Für verifizierte Ultra Konten fällt das Fünfstundenlimit weg, die Wochenlimits bleiben unverändert.

Wichtig für die Einordnung: Die GitHub Berichte sind Aussagen einzelner Nutzer, keine kontrollierten Messungen. Und Anthropics Analyse ist die Sicht des Herstellers. Neu ist das Thema nicht: Schon im März hatte Anthropic [laut The New Stack](https://thenewstack.io/claude-code-usage-limits/) eingeräumt, dass Limits schneller als erwartet erreicht wurden.

Ein paar Fixes aus dem [Changelog](https://code.claude.com/docs/en/changelog) zeigen, wo es zuletzt hakte. Version 2.1.311 vom 26. Oktober behebt, dass `/usage` große Cache Misses nie in der Aufschlüsselung zeigte. Außerdem sah Claude nach automatischer Compaction veraltete Inhalte von MEMORY.md und CLAUDE.md, wenn diese vorher in der Session geändert wurden. Version 2.1.309 behebt Sessions, die nach dem Lesen einer sehr großen verschachtelten CLAUDE.md immer wieder komprimiert wurden.

Was ihr tun könnt, wenn eure Limits plötzlich schmelzen:

1. Mit `claude --version` prüfen, ob ihr auf dem neuesten Stand seid.
2. In `/usage` die Aufschlüsselung für 24 Stunden und 7 Tage vergleichen.
3. Auf die Cache Zeile achten: viele Misses heißt, irgendetwas bricht den Cache.
4. Den Effort prüfen, auch den der Subagents. Er wird standardmäßig vererbt.
5. Hängt es nicht an euch, `/feedback` in der betroffenen Session ausführen. Mit der ID kann das Team die Session nachvollziehen.

## Checkliste, Claude Code Kosten im Alltag senken

- **Für eine neue Aufgabe `/clear`.** Vorher `/rename`, dann findet ihr die Session mit `/resume` wieder.
- **Modell und Effort zu Beginn wählen,** nicht mitten in der Aufgabe.
- **Sonnet für die meisten Aufgaben,** Opus für Architektur und schwere Probleme.
- **`/compact` mit Anweisung in natürlichen Pausen,** bevor Auto oder Idle Compaction es ohne euch tun.
- **`/rewind` statt `/compact`,** um einen falschen Weg zu verwerfen.
- **CLAUDE.md unter 200 Zeilen.** Spezielle Abläufe in Skills auslagern, die nur bei Bedarf laden.
- **Nicht genutzte MCP Server mit `/mcp` abschalten.** CLI Tools wie `gh` sind sparsamer.
- **Dateien mit @ anhängen,** statt sie nur beim Namen zu nennen. Laut Lydia spart das einen extra Read Aufruf.
- **Konkrete Prompts.** „Verbessere die Codebase“ löst breite Suchen aus.
- **Lange Ausgaben filtern.** Ein PreToolUse Hook kann zum Beispiel bei Tests nur die Fehler durchlassen.

## Fazit

Die Kosten einer Aufgabe in Claude Code hängen weniger an der Aufgabe als daran, wie die Session geführt wird. Wer den Cache schont, Compaction selbst steuert, den Effort passend wählt und Subagents gezielt einsetzt, bekommt mehr aus derselben Nutzung. Das Claude Code Team baut diese Stellschrauben Woche für Woche aus, mit Idle Compaction, der Warnung beim Fortsetzen und den Empfehlungen in `/usage`.

Der Oktober zeigt aber auch die Kehrseite. Automatische Sparfunktionen können genau den Kontext kosten, auf den es ankommt. Und wenn Limits plötzlich schmelzen, hilft nur, die eigenen Zahlen in `/usage` zu kennen.

Für uns sind solche Einblicke der Grund, warum wir die Neuigkeiten rund um Agentic Coding laufend verfolgen. Was wir dabei lernen, testen wir zuerst praktisch in eigenen Side Projects. Was sich dort bewährt, bringen wir in Kundenprojekte und in unsere Workshops. Wenn ihr Coding Agents in eurem Team effizient einsetzen wollt, schaut euch gern den [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer) an.
