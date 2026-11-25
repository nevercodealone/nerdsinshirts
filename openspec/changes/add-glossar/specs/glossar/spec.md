# Spec Glossar für nerdsinshirts.de

Stand: 25.11.2026, Version 1

## Ziel

Jeder Fachbegriff aus den Agentic Coding News bekommt eine eigene Seite. Die Seite erklärt den Begriff ausführlich auf Deutsch und stützt sich nur auf die offizielle Doku von Anthropic und OpenAI. Die Artikel bleiben nah an ihrer Quelle und verlinken für Grundlagen auf das Glossar.

## Regeln für den Inhalt

1. Jede Aussage auf einer Glossar Seite stammt aus der offiziellen Doku. Nichts erfinden, nichts aus anderen Blogs.
2. Der Link zur offiziellen Doku ist Pflicht. Ohne ihn gibt es keine Glossar Seite.
3. Jeder Abschnitt endet mit einem Quellenhinweis auf die konkrete Doku Seite.
4. Findet sich zu einem Abschnitt nichts in der Doku, fällt der Abschnitt weg.
5. Gibt es den Begriff bei beiden Anbietern, bekommt jeder Anbieter einen eigenen Abschnitt.
6. Zeitlos schreiben. Versionsnummern und Grenzwerte nur, wenn sie für das Verständnis nötig sind.
7. Echte Umlaute, Titel ohne Doppelpunkt, keine Bindestriche in zusammengesetzten Wörtern, wie bei den Artikeln.

## Collection `glossar`

**Ablage:** `src/content/glossar/<slug>.md`
**URL:** `/glossar/<slug>/`, immer mit Slash am Ende
**Slug:** nur der Begriff, klein, zum Beispiel `skills`, `hooks`, `claude-md`

### Frontmatter

| Feld | Typ | Pflicht | Regel |
|---|---|---|---|
| title | string | ja | Der Begriff als Satz, maximal 70 Zeichen, kein Doppelpunkt |
| begriff | string | ja | Nur der Begriff, zum Beispiel "Skills". Für Übersicht, Tooltip und Boxen |
| kurzdefinition | string | ja | 80 bis 200 Zeichen, eng an der Doku. Für Tooltip, Übersicht und Karte oben |
| description | string | ja | 80 bis 160 Zeichen |
| pubDate | date | ja | YYYY-MM-DD |
| geprueft | date | ja | Datum des letzten Abgleichs mit der Doku |
| author | enum | ja | roland-golla oder benjamin-klein |
| anbieter | enum | ja | anthropic, openai oder beide |
| doku | object | ja | Mindestens ein Eintrag. Felder `anthropic` und `openai`, je eine URL. Bei `anbieter: beide` sind beide Pflicht |
| aliases | string[] | ja | Schreibweisen im Text, zum Beispiel "Skill", "Agent Skills". Mindestens ein Eintrag |
| verwandt | reference('glossar')[] | nein | Andere Glossar Einträge |
| tags | string[] | ja | Liste |
| workshop | enum | ja | developer oder alle-abteilungen |
| tldr | string | ja | mindestens 40 Zeichen |
| faq | object[] | ja | mindestens 5 Einträge mit `frage` und `antwort` |
| sources | object[] | ja | mindestens 1, nur offizielle Doku Seiten, Felder `title` und `url` |
| draft | boolean | entfällt | Entfernt am 25.11.2026. Kein Entwurfsstatus mehr, das Feld wird ignoriert |

Kein `image` Feld. Glossar Seiten bekommen kein eigenes Header Bild (siehe Aussehen).

**Validierung:** Fehlt `doku` oder ist bei `anbieter: beide` nur ein Link gesetzt, bricht der Build ab.

## Erweiterung `agentic-coding-news`

| Feld | Typ | Pflicht | Regel |
|---|---|---|---|
| begriffe | reference('glossar')[] | nein | Alle Glossar Begriffe, die im Artikel verlinkt sind |

Bestehende Artikel brauchen das Feld nicht. Es wird nach und nach ergänzt.

## Seiten und Routen

| Route | Inhalt |
|---|---|
| `/glossar/` | Übersicht aller Begriffe von A bis Z, mit Filter nach Anbieter (Alle, Claude Code, Codex) |
| `/glossar/<slug>/` | Einzelseite eines Begriffs |

Es gibt keinen Entwurfsstatus (entfernt am 25.11.2026). Jede Seite im Repo erscheint in der Übersicht und in der Sitemap.

## Navigation

**Hauptnavigation** (Header), neue Reihenfolge:

1. Startseite → `/`
2. Agentic Coding News → `/agentic-coding-news/`
3. **Glossar → `/glossar/`** (neu)

Der Menüpunkt ist aktiv auf `/glossar/` und allen Unterseiten.

**Breadcrumb** auf Glossar Seiten: Startseite › Glossar › Begriff. Mit schema.org `BreadcrumbList`.

**Footer:** Link "Glossar" neben dem Impressum.

## Verlinkung

| Richtung | Umsetzung | Pflege |
|---|---|---|
| Artikel zu Glossar | Erste Nennung eines Begriffs im Text als normaler md Link auf `/glossar/<slug>/` | Liefert der Content Assistant |
| Artikel zu Glossar, Box | Box "Begriffe in diesem Artikel" am Artikelende, erzeugt aus `begriffe`, mit `begriff` und `kurzdefinition` | Automatisch aus dem Frontmatter |
| Glossar zu Artikel | Abschnitt "In unseren Artikeln" auf der Glossar Seite. Beim Build alle Artikel suchen, die den Begriff in `begriffe` haben, neueste zuerst | Automatisch |
| Glossar zu Glossar | Box "Verwandte Begriffe" aus `verwandt` | Liefert der Content Assistant |
| Übersicht | `/glossar/` listet alle Begriffe | Automatisch |

**Tooltip:** Links im Artikel, die auf `/glossar/` zeigen, zeigen beim Hovern und bei Fokus die `kurzdefinition`. Auf Touch Geräten kein Tooltip, der Link führt direkt zur Seite.

**Später möglich:** Über `aliases` können Begriffe per Remark Plugin automatisch verlinkt werden. In Version 1 nicht nötig.

## Aufbau einer Glossar Seite

| Bereich | Inhalt |
|---|---|
| Kopf | Breadcrumb, Badge für Anbieter, Titel |
| Karte | `kurzdefinition` in einer Karte (#131b2e, Rand #4be277), darunter ein Button pro Anbieter: "Offizielle Doku von Anthropic" und "Offizielle Doku von OpenAI" aus `doku` |
| TLDR | wie bei den Artikeln |
| Body | Die Abschnitte aus der md Datei (siehe unten) |
| Workshop Block | wie bei den Artikeln, vor der zweiten H2 |
| In unseren Artikeln | automatisch |
| Verwandte Begriffe | aus `verwandt` |
| FAQ | aus `faq` |
| Quellen | aus `sources` |

### Abschnitte im Body

Nur Abschnitte, zu denen die Doku etwas hergibt.

1. Einstieg ohne Überschrift: was der Begriff ist
2. `## So funktionieren <Begriff>`
3. `## Wofür man <Begriff> nutzt`
4. `## <Begriff> in Claude Code`
5. `## <Begriff> in Codex`
6. `## Abgrenzung`
7. `## Fazit` mit CTA wie bei den Artikeln

Quellenhinweis am Ende jedes Abschnitts als kursive Zeile: `*Quelle: [Titel der Doku Seite](URL)*`

## Aussehen

- Gleiches Layout und Farben wie die Artikel: Hintergrund #0b1326, Karte #131b2e, Akzent #4be277.
- **Badge Anbieter:** "Claude Code", "Codex" oder beide, als kleine Pillen über dem Titel.
- **Glossar Links im Fließtext:** gepunkteter Unterstrich in #4be277, damit sie sich von normalen Links abheben.
- **Kein eigenes Header Bild** pro Begriff. Einheitliches OG Bild für alle Glossar Seiten, mit dem Begriff als Text darauf, automatisch erzeugt.
- **Übersicht:** Buchstaben als Sprungmarken, darunter Karten mit `begriff`, Badge und `kurzdefinition`.

## SEO

- schema.org `DefinedTerm` pro Seite mit `name` aus `begriff`, `description` aus `kurzdefinition`, `inDefinedTermSet` auf `/glossar/`.
- `/glossar/` als `DefinedTermSet`.
- `sameAs` zeigt auf die Links aus `doku`.
- FAQ als `FAQPage` wie bei den Artikeln.

## Offen, nicht in Version 1

- Collection `personen` für Boris Cherny, Thariq Shihipar und andere.
- Automatische Verlinkung über `aliases`.

## Erste Lieferung

| Datei | Zweck |
|---|---|
| `src/content/glossar/skills.md` | Glossar Seite Skills |
| `src/content/glossar/hooks.md` | Glossar Seite Hooks |
| `src/content/agentic-coding-news/claude-code-skills.md` | Artikel mit `begriffe: [skills, hooks]` |
