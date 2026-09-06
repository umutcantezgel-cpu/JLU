# Google Stitch Design Prompts & Setup-Guide
**Projekt:** JLU Gießen Accounting Tutor (Rabia Edition)  
**Hochschule:** Justus-Liebig-Universität Gießen (FB 02 – Wirtschaftswissenschaften)  
**Lehrstühle:** Prof. Dr. Corinna Ewelt-Knauer (Financial Accounting) & Prof. Dr. Arnt Wöhrmann (Managerial Accounting)

---

## 1. Wie du die `DESIGN.md` in Google Stitch einfügst

In dem Google Stitch Startbildschirm, den du vor dir hast:
1. Klicke auf **„Vorhandene DESIGN.md-Datei einfügen“** oder ziehe die soeben im Ordner erstellte Datei `DESIGN.md` per Drag-and-Drop direkt in das Feld **„Dateien ziehen und ablegen“**.
2. Sobald die `DESIGN.md` hochgeladen ist, übernimmt Google Stitch automatisch alle Farben (JLU-Blau `#165A97`, Navy `#0B3259`, weißer Campus-Canvas `#F8FAFC`), Schriftarten (`Plus Jakarta Sans` & `JetBrains Mono` für T-Konten) und Komponenten-Regeln.
3. Danach gibst du in Stitch die folgenden Prompts ein, um die einzelnen Bildschirme in höchster Design-Qualität generieren zu lassen!

---

## 2. Der Master-Prompt für Google Stitch (Gesamtsystem)

Kopiere diesen Prompt direkt in das Textfeld von Google Stitch:

```text
Erstelle ein modernes, helles und akademisch anspruchsvolles Web-App-Interface für den 'JLU Gießen Accounting Tutor'. Das Design muss dem offiziellen Corporate Design der Justus-Liebig-Universität Gießen (JLU) entsprechen: Heller, lichtdurchfluteter Hintergrund (#F8FAFC), weiße Kartenflächen (#FFFFFF), primäre Akzentfarbe JLU-Blau (#165A97), dunkles akademisches Navy (#0B3259) und feine, dezente Ränder (#E2E8F0). Keine verspielten bunten Neon-Glows oder Emojis.

Oben befindet sich eine elegante Header-Leiste mit dem Schriftzug 'Justus-Liebig-Universität Gießen – Fachbereich 02: Wirtschaftswissenschaften' und dem Modultitel 'Accounting: Buchführung & Kostenrechnung (Prof. Dr. Ewelt-Knauer / Prof. Dr. Wöhrmann)'. Daneben ein Badge für den Klausur-Countdown ('Noch 18 Tage bis zur Klausur') und das Profil von Rabia.

Die Benutzeroberfläche gliedert sich in:
1. Eine linke, strukturierte Seitenleiste mit den Vorlesungs-Folgen (Folge 1: Die Gründung, Folge 2: Der Wareneinkauf, Folge 3: Die Eisherstellung bis Folge 10 sowie Kostenrechnung LE 1-12 und Probeklausur).
2. Einen zentralen Übungs-Arbeitsbereich mit konkreten Fallstudien-Aufgaben rund um 'Bibi Bilanzierung / N.Icecream'.
3. Interaktive T-Konten (Soll / Haben) mit sauber formatierter Monospace-Schriftart für Beträge und Buchungssätze.
4. Einen prominenten 1-Klick-Button 'Schritt-für-Schritt mit KI erklären', der einen seitlichen didaktischen Tutor-Drawer öffnet.
```

---

## 3. Screen-by-Screen Prompts für Google Stitch

### Screen 1: Dashboard & Modul-Navigator (Home)
**Zweck:** Übersicht über den Lernfortschritt, Klausurvorbereitung und Vorlesungsmodule.

```text
Generiere das Haupt-Dashboard des 'JLU Gießen Accounting Tutor' für Desktop (1440px Breite). 
Stil: Hell, strukturiert, universitäres Erscheinungsbild der Justus-Liebig-Universität Gießen mit Primärfarbe JLU-Blau (#165A97) auf Canvas-Hintergrund (#F8FAFC).

Layout & Komponenten:
- Top-Navigation: JLU Logo-Schriftzug, Modul 'Accounting B.Sc. WiWi', Profil 'Rabia', Klausur-Countdown-Pill.
- Hero-Card: Begrüßungskarte 'Willkommen zurück, Rabia! Nächstes Ziel: Folge 1-3 Wissenslücken schließen'. Mit Fortschrittsbalken (62% Gesamtfortschritt) und Schnellstart-Button 'Heutiges Workout starten'.
- 2 Hauptsektionen mit Reitern:
  1. 'Buchführung & Finanzberichterstattung' (Prof. Dr. Corinna Ewelt-Knauer): 10 interaktive Vorlesungsfolgen rund um die Fallstudie 'Bibi Bilanzierung / N.Icecream' (Folge 1 Die Gründung, Folge 2 Wareneinkauf, Folge 3 Eisherstellung etc.) mit Status-Badges (Abgeschlossen, In Bearbeitung, Wiederholen).
  2. 'Kosten- und Leistungsrechnung' (Prof. Dr. Arnt Wöhrmann): Lerneinheiten LE 1 bis LE 12 (Kostenarten, BAB, Kalkulation, Deckungsbeitrag).
- Rechts daneben: 'Rabias Fehler-Radar' Widget mit den 5 dringendsten Themen (Geleistete Anzahlungen, Vorsteuerberechnung, Bilanzverlängerung vs. Aktivtausch, GuV als EK-Unterkonto).
```

---

### Screen 2: Die Interaktive Buchungs-Arena (Exercise Workspace)
**Zweck:** Direktes Durchführen von Übungsaufgaben mit T-Konten und Buchungssatz-Tester.

```text
Generiere den Übungsarbeitsbereich des 'JLU Accounting Tutor' für eine konkrete Buchführungsaufgabe (z.B. Aufgabe 2.2: Küchenmaschinenkauf für 2.000 € netto + 19% USt, 30% sofort fällig, 70% Ziel).
Stil: Heller Arbeitsbereich, klares 2-Spalten-Layout, JLU-Blau (#165A97) und Navy (#0B3259).

Komponenten:
- Aufgaben-Header: 'Aufgabe 2.2 – Anschaffung der Küchenmaschine (Folge 2: Der Wareneinkauf)'. Kontext-Box mit Bibis Eisdielen-Sachverhalt und Netto-/Steuerangaben.
- Interaktiver Buchungssatz-Baukasten:
  Felder für: [Per Soll-Konto] [Betrag €] an [Haben-Konto] [Betrag €].
  Darunter automatische Konten-Vorschläge (z.B. BGA, Vorsteuer, Bank, Verbindlichkeiten LuL).
- Live T-Konten-Visualisierung: Zwei T-Konten nebeneinander für 'BGA', 'Vorsteuer', 'Bank' und 'Verbindlichkeiten aus LuL' mit klaren Spalten für 'Soll' (links) und 'Haben' (rechts) in Monospace-Schrift (#0F172A).
- Bilanzwirkungs-Wähler: 4 anklickbare Pills [Aktivtausch] [Passivtausch] [Bilanzverlängerung] [Bilanzverkürzung].
- Action-Bar am unteren Rand: Button 'Eingabe prüfen' (grüner Akzent), Button 'Zurücksetzen' und ein hervorgehobener Button 'Schritt-für-Schritt mit KI erklären' mit Glanz-Akzent in JLU-Blau.
```

---

### Screen 3: Der 1-Klick KI-Tutor Drawer (AI Explainer)
**Zweck:** Der magische 1-Klick Erklärer, der sich von rechts über den Bildschirm schiebt und Rabia jede Aufgabe geduldig erklärt.

```text
Generiere das geöffnete Slide-Over Panel (Drawer, Breite 440px von rechts) des 'JLU Accounting KI-Copilot' über dem abgedunkelten Übungsbildschirm.
Stil: Hochwertiges, helles didaktisches Fenster mit JLU-Blau Akzenten, feinen Linien (#E2E8F0) und strukturierter Lesbarkeit.

Inhalt des Drawers:
- Drawer-Header: 'JLU Tutor-Erklärung mit KI' mit einem dezenten Status 'Gemini 1.5 Pro aktiv' und Schließen-Kreuz.
- Sektion 1 (Der Kern): Eine hervorgehobene Box in zartem JLU-Hellblau (#EAF7FF) mit dem Merksatz: 'Warum ist das keine geleistete Anzahlung? Weil Bibi die Maschine sofort erhält! Anzahlungen liegen nur vor, wenn Geld fließt, bevor die Ware da ist.'
- Sektion 2 (Die Konten-Logik Schritt für Schritt):
  - Schritt 1: Welches Gut kommt rein? (BGA nimmt zu -> Aktivkonto im Soll: 2.000 €)
  - Schritt 2: Welche Steuer fällt an? (Vorsteuer nimmt zu -> Aktivkonto im Soll: 380 €)
  - Schritt 3: Wie wird bezahlt? (Bank nimmt ab -> Aktivkonto im Haben: 714 €)
  - Schritt 4: Was bleibt offen? (Verbindlichkeiten nehmen zu -> Passivkonto im Haben: 1.666 €)
- Sektion 3 (T-Konten Spiegelung): Miniatur-Darstellung wie der Buchungssatz auf den T-Konten verbucht wird.
- Sektion 4 (JLU Klausur-Tipp von Prof. Ewelt-Knauer): Warn-Box in Amber (#FEF3C7) mit Hinweis auf typische Klausurfallen.
- Unten: Interaktives Nachfrage-Feld: 'Noch etwas unklar? Frag deinen Tutor...' mit Senden-Icon.
```

---

### Screen 4: Rabias Schwachstellen-Studio ("Probleme Folge 1–3")
**Zweck:** Gezielte Vertiefung der Punkte aus ihren handgeschriebenen Notizen.

```text
Generiere einen spezialisierten Diagnose- und Trainings-Bildschirm: 'Rabias Fehler-Studio – Folge 1 bis 3 Meistern'.
Stil: Heller, motivierender Lernbereich im JLU Corporate Design.

Features:
- Übersichts-Banner mit Rabias Notiz-Themen als anklickbare Filter-Tabs:
  [Alle 17 Schwachstellen] [Bilanz vs. GuV] [Steuerberechnung] [Anzahlungen] [Erfolgswirksamkeit].
- Interaktive Vergleichskarten (Gegenüberstellung 'Häufiger Denkfehler' vs. 'Richtige JLU-Logik'):
  - Karte 1: 'Externes vs. Internes RW' (Wirtschaftlichkeit gehört ins Interne RW, Rechenschaft & Gläubigerschutz ins Externe RW).
  - Karte 2: 'Bilanzverlängerung beim Kredit' (Warum Bank an Bankkredit beide Seiten erhöht).
  - Karte 3: 'Vorsteuer im Preis vs. auf den Nettopreis' (Formel-Rechner mit Schieberegler für 7% und 19%).
- Schnell-Quiz-Widget mit 3-Minuten-Blitzfragen zum sofortigen Festigen.
```

---

### Screen 5: JLU Probeklausur-Simulator
**Zweck:** Simulation der echten Probeklausur von Prof. Dr. Ewelt-Knauer und Prof. Dr. Wöhrmann unter Realbedingungen.

```text
Generiere das Interface für den 'JLU Accounting Klausur-Simulator' (basierend auf der offiziellen Probeklausur).
Stil: Fokus-Modus, serioses universitär-akademisches Layout, JLU-Blau (#165A97), ablenkungsfrei.

Komponenten:
- Sticky Header: Timer '00:54:20 verbleibend', Punkteanzeige 'Erreicht: 28 / 60 Punkte', Fortschrittsbalken (Aufgabe 4 von 12).
- Geteilter Bildschirm (Split Screen):
  - Links: Der offizielle Klausurtext im PDF-Stil mit Tabellen (z.B. Teil Kostenrechnung: Betriebsabrechnungsbogen BAB oder Buchführung: Abschlussbuchungen).
  - Rechts: Eingabematrix für Antworten (Multiple Choice mit Begründungsfeld, Buchungssatz-Felder und Rechenschritte).
- Klausur-Features: 'Frage markieren', 'Formelsammlung einblenden' (öffnet JLU-Kostenrechnungs-Formelsammlung), 'Klausur abgeben'-Button.
```
