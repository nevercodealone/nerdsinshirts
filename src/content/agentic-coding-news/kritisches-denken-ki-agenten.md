---
title: "Kritisches Denken mit KI Agenten, was Addy Osmani empfiehlt"
description: "Je besser Coding Agents werden, desto leichter winkt man ihre Arbeit durch. Addy Osmani zeigt, wie Entwickler trotzdem die Kontrolle behalten."
pubDate: 2026-11-06
author: roland-golla
tags:
  - Claude Code
  - Verifikation
  - Best Practices
draft: false
workshop: developer
tldr: "Addy Osmani aus dem Claude Code Team warnt vor kognitiver Kapitulation: Wer Agents viel arbeiten lässt, prüft irgendwann nicht mehr. Seine Antwort sind einfache Gewohnheiten. Vorher eine Vermutung aufschreiben, Belege vor der Zusammenfassung lesen, fragen, was ein grüner Test nicht prüft."
quoteText: "You may offload the work and much of the auditing, but not the accountability."
quoteAuthor: "Addy Osmani"
quoteRole: "Claude Code Team, Anthropic"
quoteUrl: "https://x.com/addyosmani/status/2117512471930167377"
faq:
  - question: "Was ist kognitive Kapitulation bei KI 2026?"
    answer: "Kognitive Kapitulation, englisch cognitive surrender, heißt: Die Antwort der KI wird still zur eigenen Meinung, und man sieht keinen Grund mehr, sie zu prüfen. Den Begriff haben Steven Shaw und Gideon Nave von der Wharton School geprägt. Addy Osmani nutzt ihn, um zu beschreiben, wie Entwickler mit Coding Agents langsam die Kontrolle abgeben."
  - question: "Was ist der Unterschied zwischen Offloading und Surrender 2026?"
    answer: "Beim Offloading gibt man eine Aufgabe an die KI ab, bleibt aber für das Ergebnis verantwortlich und prüft es. Beim Surrender übernimmt man die Ausgabe ungeprüft als eigene. Dazwischen liegt laut Addy Osmani die Deferral: Die Ausgabe ist keine Hypothese mehr, sondern direkt der nächste Input."
  - question: "Warum werden gute Coding Agents 2026 zum Risiko für das Denken?"
    answer: "Weil offensichtliche Fehler seltener werden. Die meisten Ausgaben sind gut geschrieben und fast richtig, sie verlangen keinen zweiten Blick. Laut Addy Osmani hat man auch mit vielen parallelen Agents nur ein Paar Augen. Gerade weil die Arbeit mit Agents angenehm ist, lässt die Wachsamkeit nach."
  - question: "Was ist Cognitive Debt 2026?"
    answer: "Cognitive Debt entsteht, wenn ein Team das eigene System nicht mehr versteht, weil Agents den Großteil gebaut haben. Im Alltag bleibt das unsichtbar, der Code sieht sauber aus und die Tests sind grün. Es fällt erst auf, wenn jemand etwas ändern muss. Margaret-Anne Storey hat darüber geschrieben, Addy Osmani nennt die Code Variante Comprehension Debt."
  - question: "Wie bleibt man 2026 beim Arbeiten mit Claude Code kritisch?"
    answer: "Addy Osmani empfiehlt einfache Gewohnheiten. Vor der Aufgabe eine eigene Vermutung aufschreiben. Festlegen, was verifiziert heißt. Befehle und Ausgaben lesen, bevor man die Zusammenfassung liest. Den Agent nach seinen Entscheidungen und Annahmen fragen. Am Ende fragen, ob etwas fehlt. Und einmal pro Woche etwas ganz ohne Agent bauen."
  - question: "Was beweist ein grüner Test bei KI Code?"
    answer: "Nur eine Sache, nämlich dass genau diese Prüfung durchläuft. Wenn der Agent den Test mit demselben Denkfehler schreibt wie das Feature, ist der Test grün und das Feature trotzdem kaputt. Addy Osmani rät deshalb, bei jedem grünen Check zu fragen, was er bewiesen hat und was nicht."
  - question: "Was ist die Orchestration Tax?"
    answer: "So nennt Addy Osmani die Lücke zwischen dem, was die Agents erzeugen, und dem, wofür man selbst mit seinem Namen einstehen würde. Wenn fertige Arbeit schneller liegen bleibt, als man sie prüfen kann, hilft keine weitere Session. Dann muss man die Prüfungen schärfen, damit weniger davon Aufmerksamkeit braucht, oder langsamer werden."
  - question: "Lernen Junior Entwickler so noch genug?"
    answer: "Das ist die meistgelikte Frage unter Addy Osmanis Artikel. Seniors haben ihr Urteilsvermögen durch jahrelange Handarbeit aufgebaut. Wenn neue Leute das nie selbst machen, fehlt ihnen das Gefühl dafür, wie eine falsche Antwort aussieht. Addys Artikel beantwortet das nicht direkt. Aus unserer Sicht ist seine Übung, regelmäßig ohne Agent zu arbeiten, zumindest ein Anfang."
  - question: "Machen bessere Modelle diese Prüfung bald überflüssig?"
    answer: "Addy Osmani hält dagegen: Für das, was ausgeliefert wird, ist immer ein Mensch verantwortlich. Und wie sehr man einem Agent vertraut, ist selbst eine Abwägung, für die man die Arbeit regelmäßig prüfen muss. Anthropics eigene Studie nennt das Problem das Paradox der Aufsicht."
sources:
  - title: "Addy Osmani: Critical thinking when agents do the work"
    url: "https://x.com/addyosmani/status/2117512471930167377"
    publisher: "X"
  - title: "Addy Osmani: Cognitive surrender"
    url: "https://addyosmani.com/blog/cognitive-surrender/"
    publisher: "addyosmani.com"
  - title: "Addy Osmani: Comprehension debt"
    url: "https://addyosmani.com/blog/comprehension-debt/"
    publisher: "addyosmani.com"
  - title: "Addy Osmani: The orchestration tax"
    url: "https://addyosmani.com/blog/orchestration-tax/"
    publisher: "addyosmani.com"
  - title: "Addy Osmani: Agentic verification"
    url: "https://addyo.substack.com/p/agentic-verification"
    publisher: "Substack"
  - title: "Steven Shaw und Gideon Nave: Studie zu Cognitive Surrender"
    url: "https://ssrn.com/abstract=6097646"
    publisher: "SSRN"
  - title: "Margaret-Anne Storey: Cognitive debt"
    url: "https://margaretstorey.com/blog/2026/02/09/cognitive-debt/"
    publisher: "margaretstorey.com"
  - title: "How AI is transforming work at Anthropic"
    url: "https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic"
    publisher: "Anthropic"
  - title: "Solving code review at Anthropic"
    url: "https://claude.dev/blog/solving-code-review-at-anthropic/"
    publisher: "Claude Developer Blog"
  - title: "Boris Cherny: Give Claude a way to verify its work"
    url: "https://x.com/bcherny/status/2007179861115511237"
    publisher: "X"
  - title: "Frage zu Junior Entwicklern unter dem Artikel"
    url: "https://x.com/404Miten/status/2117598422425579695"
    publisher: "X"
  - title: "Raúl Nogales zu Junior Entwicklern"
    url: "https://x.com/raulnogales/status/2117664127518961690"
    publisher: "X"
  - title: "Scott Hanselman zum Artikel"
    url: "https://x.com/shanselman/status/2118196609997836487"
    publisher: "X"
  - title: "RonnyHe: Vier Skills nach dem Artikel"
    url: "https://x.com/Ronny_MiniMax/status/2117813235655364704"
    publisher: "X"
---

## Warum gute Coding Agents das Denken gefährlicher machen

Addy Osmani arbeitet im Claude Code Team bei Anthropic. Am 3. November hat er auf X einen langen Artikel veröffentlicht: [Critical thinking when agents do the work](https://x.com/addyosmani/status/2117512471930167377). Bis heute wurde er fast 5 Millionen Mal angesehen und über 19.000 Mal geliked. 
Wichtig vorweg: Addy ist kein Kritiker von Agents. Er schreibt, dass er selbst den ganzen Tag damit arbeitet und Agents ausdrücklich empfiehlt. Sein Ziel ist ein anderes. Er will zeigen, wie man kritisch bleibt, wenn man fast alles an einen Agent abgeben kann.

Sein Kernargument ist überraschend. Das Problem sind nicht die schlechten Modelle, sondern die guten:

- **Offensichtliche Fehler werden seltener.** Die meisten Ausgaben sind gut geschrieben und fast richtig. Sie verlangen keinen zweiten Blick.
- **Der Raum zum Nachdenken schrumpft.** Früher lag zwischen Frage und Antwort Zeit. Genau dort fand das Denken statt. Heute sind es Sekunden.
- **Agents sind angenehm.** Schnelle, oft richtige Antworten tun gut an einem vollen Tag. Gerade deshalb lässt die Wachsamkeit nach.
- **Ein Paar Augen.** Auch wer viele Agents parallel laufen lässt, hat nur ein Paar Augen für die Ergebnisse.

Seine Schlussfolgerung: Kritisches Denken muss man bewusst in den Tag einbauen. Von allein passiert es nicht mehr.

## Offloading, Deferral und Surrender, die drei Stufen

Addy beschreibt den Umgang mit Agents als Skala mit drei Stufen:

| Stufe | Was passiert | Bewertung |
|---|---|---|
| Cognitive Offloading | Du gibst die Aufgabe ab, bleibst aber für das Ergebnis verantwortlich | Gut, das macht Addy den ganzen Tag |
| Deferral | Die Ausgabe des Agents ist keine Hypothese mehr, sondern direkt dein nächster Input | Die gefährliche Mitte |
| Cognitive Surrender | Die Ausgabe wird still zu deiner eigenen Meinung, du prüfst sie nicht mehr | Kontrolle abgegeben |

Den Begriff Cognitive Surrender haben Steven Shaw und Gideon Nave von der Wharton School geprägt. In ihren [drei Experimenten mit 1.372 Teilnehmern](https://addyosmani.com/blog/cognitive-surrender/) übernahmen die Leute falsche Antworten der KI in 73 Prozent der Fälle, in denen die KI falsch lag. Ihr Selbstvertrauen stieg trotzdem, obwohl die Hälfte der Antworten absichtlich falsch war.

Das Tückische ist der Weg nach unten. Jeder Schritt wirkt vernünftig. Die letzte Antwort hast du gründlich gelesen, also überfliegst du die nächste. Bei der übernächsten schaust du nur noch auf die Struktur. Und irgendwann fragt dich jemand nach einer Zeile, und du kannst sie nicht erklären, auch nicht mit Hilfe deines Agents.

## Cognitive Debt, wenn niemand das System mehr versteht

So entsteht laut Addy Cognitive Debt. Margaret-Anne Storey hat [darüber geschrieben](https://margaretstorey.com/blog/2026/02/09/cognitive-debt/), wie Teams dabei das gemeinsame Verständnis ihres Systems verlieren. Für Code nennt Addy es [Comprehension Debt](https://addyosmani.com/blog/comprehension-debt/).

Im Alltag ist diese Schuld unsichtbar. Der Code sieht sauber aus, die Tests sind grün. Sie fällt erst auf, wenn jemand etwas ändern muss und merkt, dass niemand das System mehr versteht.

Addy fordert dabei nichts Unmögliches. Niemand kann eine große Codebase komplett im Kopf behalten. Das Claude Code Team baut Verständnis laut dem [Artikel des Teams zu Code Review](/agentic-coding-news/claude-code-team-code-review/) bei Bedarf neu auf: Claude erklärt den Teil, um den es gerade geht. Das reicht, solange man weiß, was man nicht weiß.

Seine Grenze ist klar: Wer eine Antwort nicht erklären kann, auch nicht mit Hilfe des Agents, hat die Verantwortung abgegeben. Bei unwichtigen Dingen ist das in Ordnung. Addy hat zum Beispiel ein Hotel für eine Kursaufnahme von einer KI auswählen lassen. Bei Geld, bei der Berufswahl der Kinder oder bei der Frage, ob etwas sicher ausgeliefert werden kann, würde er das nie tun.

## Die Fragen, die Addy sich vor jeder Aufgabe stellt

Früher half ihm eine einfache Liste mit Wer, Was, Wo, Warum, Wann und Wie. Heute ist es zu leicht, das zu überspringen und den Agent zu fragen, was man tun soll. Deshalb hat er neue Fragen:

1. **Habe ich vorher eine Vermutung aufgeschrieben?** Vor jeder größeren Aufgabe schreibt er auf, was er als Antwort erwartet. Auch eine schlechte Vermutung hilft. Wer erst eine gut geschriebene Antwort gelesen hat, kann sich kaum noch etwas anderes vorstellen.
2. **Soll der Agent mir beim Denken helfen oder mir das Denken abnehmen?** Beides ist in Ordnung, solange man weiß, was man gerade tut.
3. **Was müsste stimmen, damit das falsch ist?** Dann genau das prüfen. Eine Selbsteinschätzung des Modells ist viel weniger wert als ein echter Test.
4. **Habe ich die Gegenposition gehört?** Bei wichtigen Fragen lässt er mehrere Modelle die Gegenseite vertreten und bildet sich dann seine eigene Meinung.
5. **Würde ich darauf wetten, vor der Person, die das warten muss?** Das ist für ihn die Messlatte.
6. **Was übe ich nicht mehr?** Manches darf wegfallen, etwa Routine beim Debugging. Aber bewusst.

## Verifikation, grüne Tests beweisen nur eine Sache

Addy schreibt in letzter Zeit viel über [Verifikation](https://addyo.substack.com/p/agentic-verification). Seine These: Der Engpass ist nicht mehr das Coden, sondern die Sicherheit, dass man richtig liegt. Boris Cherny, der Claude Code entwickelt hat, sagt es [noch kürzer](https://x.com/bcherny/status/2007179861115511237): Gib Claude einen Weg, seine Arbeit zu prüfen. Mit End to End Tests oder echten Klicks in der App kann der Agent ändern, testen, Fehler lesen und neu versuchen, bevor ein Mensch hinschaut.

Aber auch die Verifikation kann man abgeben. Aus der Frage „Gibt es Belege für mein Ergebnis?“ wird „Ist der Check grün?“. Agents schreiben Tests so billig, dass man sehr viel Grün sieht. Wenn der Test denselben Denkfehler enthält wie das Feature, ist er grün und das Feature trotzdem kaputt. Addys Regel dazu:

> When a check goes green, ask what it proved. Then ask what it didn't.

Was daraus für die Praxis folgt:

- **Vorher festlegen, was verifiziert heißt.** Wer das erst danach entscheidet, redet sich jedes Ergebnis schön.
- **Ein greifbares Ziel.** Ein grüner Test, ein Screenshot, ein Log. Nicht „sieht fertig aus“.
- **Belege vor der Zusammenfassung.** Wenn der Agent fertig meldet, zuerst den ausgeführten Befehl und seine Ausgabe lesen, dann erst die Zusammenfassung.
- **Selbstkritik einbauen.** Claude Code kann die eigene Arbeit über einen Subagent mit frischem Kontext prüfen. Addy rät, das fest in den Ablauf einzubauen, nicht nur bei Gelegenheit.
- **„Habe ich etwas vergessen?“** Diese simple Frage stellt er am Ende jeder komplexen Aufgabe. Oft kommen noch zwei oder drei Punkte zurück.

Aus dem Code Review Artikel des Claude Code Teams zitiert er eine Faustregel. Wer nicht sagen kann, was die Checks übersehen würden, braucht ein echtes Review statt einer schnellen Freigabe. Mehr dazu, wie man KI Code absichert, steht in unserem Artikel [KI Code testen](/agentic-coding-news/ki-code-testen/).

## Den Output wirklich prüfen statt durchwinken

Addys Beispiel kennt jeder: Ein Agent liefert einen Pull Request mit 600 Zeilen. Man schaut auf die Struktur, die Namen wirken sinnvoll, die Tests sind grün. Freigegeben. Irgendwo in der Mitte steckt aber eine geänderte Reihenfolge an einer Transaktionsgrenze oder ein umgedrehter Standardwert in einem Randfall. Man hat geprüft, aber nur auf das, was man ohnehin erwartet hat.

Code schreiben und Code prüfen sind verschiedene Fähigkeiten. Irgendwann wird aus Review nur noch Abnicken. Addys Gegenmittel:

- **Den Diff lesen, als hätte ihn kein Agent geschrieben.**
- **Nach den Entscheidungen fragen.** In einer langen Session trifft der Agent viele kleine Entscheidungen: Standardwerte, was nicht dazugehört, welche Anforderung er umdeutet, wenn sich zwei widersprechen. In einer Zusammenfassung, die sagt, alles lief gut, steht davon nichts. Also den Agent bitten, seine Entscheidungen und Annahmen aufzulisten.
- **Sich selbst abfragen.** Ein paar Zeilen zufällig auswählen und erklären. Bei einem Dokument: schließen und das Hauptargument aus dem Kopf aufschreiben.
- **Das Quiz vor dem Merge.** Manche lassen Claude nach langen Sessions einen Bericht mit Quiz schreiben. Die Regel: Gemergt wird erst, wenn das Quiz fehlerfrei bestanden ist.

Dazu kommt die Menge. Addy nennt das in seinem Artikel die [Orchestration Tax](https://addyosmani.com/blog/orchestration-tax/): die Lücke zwischen dem, was die Agents erzeugen, und dem, wofür man mit seinem Namen einstehen würde. Wenn fertige Arbeit schneller liegen bleibt, als man sie prüfen kann, hilft keine weitere Session. Dann muss man die Checks schärfen oder langsamer werden. Wer mehr produziert, als er vertreten kann, prüft nicht mehr, sondern hofft nur noch.

## Gute Prompts sind kritisches Denken

Der Mensch verschwindet nicht aus dem Ablauf. Er sitzt nur nicht mehr in der Mitte, sondern am Anfang und am Ende: bei der Aufgabenbeschreibung und beim Prüfen. Deshalb sieht Addy gutes Prompting als Teil des kritischen Denkens.

Früher hat ein Kollege eine unklare Anfrage hinterfragt, und man merkte selbst, dass man es noch nicht durchdacht hatte. Ein Agent stoppt einen meist nicht. Er füllt die Lücken und liefert etwas, das fertig aussieht, obwohl die Idee dahinter noch unscharf ist. Addy nennt das Intent Debt. Und diese Schuld kann niemand anderes begleichen.

Seine Tipps dazu:

- **Den Auftrag in eigenen Worten aufschreiben,** bevor man fragt. Mit Zielgruppe, was nicht dazugehört, und wann es fertig ist.
- **Nach der zweiten Korrekturrunde neu anfangen.** Nicht weiter nachbessern, sondern den Prompt neu schreiben.
- **Sich interviewen lassen.** Wenn etwas unklar ist, den Agent fragen lassen, was er nicht versteht. Wer die Session mit einem besseren eigenen Bild vom Problem beendet, hat gewonnen.
- **Auf den Input achten.** Wenn jeder Agent nur die Zusammenfassung des vorherigen bekommt, hat der dritte das Originaldokument nie gelesen.
- **Eigene Standards haben.** Alles kommt sauber formatiert und selbstsicher zurück. Politur ist kein Qualitätssignal mehr.
- **Geschmack festhalten.** Wenn etwas nicht gut genug ist, den Grund in eine gemeinsame Konfiguration, einen Hook oder einen Test schreiben. So wächst der eigene Anspruch mit jedem Projekt.

## Werden bessere Modelle das nicht übernehmen

Diesen Einwand greift Addy selbst auf. In ein, zwei Jahren erkennt das Modell vielleicht alles, was man selbst erkennen würde. Warum also die Fähigkeit pflegen?

Seine Antwort: Am Ende ist immer ein Mensch verantwortlich für das, was ausgeliefert wird, egal wie viel die KI geholfen hat. Und wie sehr man einem Agent bei einer Aufgabe vertraut, ist selbst eine Abwägung. Um sie richtig zu treffen, muss man die Arbeit regelmäßig prüfen, weil sich ständig ändert, was die Modelle falsch machen.

Anthropic hat das in einer [eigenen Studie mit 132 Engineers und Researchern](https://www.anthropic.com/research/how-ai-is-transforming-work-at-anthropic) vom Dezember 2025 als Paradox der Aufsicht beschrieben: Um Claude zu beaufsichtigen, braucht man genau die Fähigkeiten, die durch zu viel KI Nutzung verkümmern können.

Was kein besseres Modell lösen wird, sind laut Addy diese Fragen: Was baust du, warum lohnt es sich, wen betrifft es und was bist du bereit dafür aufzugeben?

### Seine Übungen für den Alltag

- **Einmal pro Woche** etwas ohne Agent coden, oder eine Sache tun, bei der es schlimm wäre, sie zu verlernen.
- **Einmal im Monat** aufschreiben, was man nicht mehr selbst macht, und entscheiden, was davon in Ordnung ist.
- **Eine Frage im Hinterkopf:** Wie verloren wärst du ohne KI?
- **Prüfen als echte Arbeit planen.** Mit eigener Zeit im Plan. Sonst passiert es nicht.

## Was die Community dazu sagt

Unter dem Artikel und in den Zitaten wurde viel diskutiert. Ein großer Teil sind Lob und Weiterempfehlungen, viele Accounts teilen den Text mit eigenen Zusammenfassungen. Spannender sind die Stimmen, die weiterdenken oder widersprechen.

**Die Junior Frage.** Die meistgelikte Antwort unter dem Artikel ist eine [kurze Frage](https://x.com/404Miten/status/2117598422425579695): Wie sollen Juniors dieses Urteilsvermögen aufbauen, wenn sie den Code nie selbst schreiben? [Raúl Nogales](https://x.com/raulnogales/status/2117664127518961690) formuliert es ähnlich. Seniors haben ihr Urteil durch Jahre mühsamer Handarbeit verdient. Wer diese Wiederholungen nie bekommt, lernt nicht, wie eine falsche Antwort riecht. Eine direkte Antwort von Addy darauf ist im Thread nicht zu finden. Unsere Einschätzung: Seine Übung, regelmäßig ohne Agent zu arbeiten, ist zumindest ein Anfang.

**Kritik am Text selbst.** Einige Leser finden den Artikel zu lang und zu wenig strukturiert. Ein vielgelikter Kommentar wirft ihm vor, das Problem klar zu benennen, aber im Kreis zu laufen statt einen Plan zu liefern.

**„Bald überflüssig.“** Andere halten die Debatte für eine Übergangsphase. In ein paar Monaten werde man solche Texte als Versuch lesen, an alten Gewohnheiten festzuhalten. Eine weitere Stimme meint, ab einer gewissen Komplexität könne ohnehin kein Mensch garantieren, dass ein Programm tut, was es soll, ob mit KI oder ohne.

**Zustimmung mit Gewicht.** [Scott Hanselman](https://x.com/shanselman/status/2118196609997836487) schreibt, das Thema sei gerade sein wichtigster Schwerpunkt, und er würde gern mehr darüber sprechen.

**Vom Text zum Werkzeug.** RonnyHe von MiniMax hat den Artikel [in vier Skills übersetzt](https://x.com/Ronny_MiniMax/status/2117813235655364704), die laut seinem Post in MiniMax Code, Claude Code und Codex laufen. Sie setzen Addys Punkte direkt um: eine Vermutung und die Definition von verifiziert vorab, Belege vor der Zusammenfassung, ein Kapazitätscheck vor dem nächsten Agent und ein Test für jeden Fehler, der zweimal korrigiert werden musste.

## So setzt ihr das in Claude Code um

Vieles aus Addys Artikel lässt sich direkt in den Alltag mit Claude Code übertragen:

| Gewohnheit | Umsetzung |
|---|---|
| Vermutung vorab | Vor dem Prompt eine Zeile notieren, was ihr erwartet. Nach dem Ergebnis vergleichen |
| Verifiziert definieren | Im Prompt festlegen, welcher Test, welcher Screenshot oder welches Log das Ziel ist |
| Belege vor Zusammenfassung | Bei der Fertigmeldung zuerst die ausgeführten Befehle und ihre Ausgabe lesen |
| Entscheidungen offenlegen | Am Ende fragen: Welche Entscheidungen und Annahmen hast du getroffen? |
| Frische Augen | Einen Subagent die Änderung mit frischem Kontext prüfen lassen |
| Nichts vergessen | Als letzte Frage: Habe ich etwas übersehen? |
| Geschmack festhalten | Wiederkehrende Fehler in die CLAUDE.md, einen Hook oder einen Test schreiben |
| Fähigkeit erhalten | Einmal pro Woche eine Aufgabe ohne Agent lösen |

## Fazit

Addy Osmanis Artikel ist kein Plädoyer gegen Agents. Er ist eine Anleitung, wie man mit ihnen arbeitet, ohne das eigene Urteil zu verlieren. Je besser die Modelle werden, desto wichtiger wird das. Fehler werden seltener, aber subtiler, und grüne Tests sagen weniger, als sie zu sagen scheinen. Die Verantwortung für das, was ausgeliefert wird, bleibt beim Menschen.

Die offene Frage aus der Community bleibt: Wie lernen Einsteiger dieses Urteilsvermögen, wenn sie die Handarbeit nie machen? Darauf hat auch Addy keine fertige Antwort.

Für uns sind solche Einblicke der Grund, warum wir die Neuigkeiten rund um Agentic Coding laufend verfolgen. Was wir dabei lernen, testen wir zuerst praktisch in eigenen Side Projects. Was sich dort bewährt, bringen wir in Kundenprojekte und in unsere Workshops. Wenn ihr Coding Agents in eurem Team mit klaren Prüfregeln einsetzen wollt, schaut euch gern den [NCA KI Workshop für Developer](https://nevercodealone.de/de/vibe-coding-training/nca-ki-workshop-developer) an.
