import { Exercise } from './curriculumTypes';

export const rabiaWorkoutExercises: Exercise[] = [
  {
    id: 'rabia-1',
    number: 'R 1.1',
    title: 'Externes vs. Internes Rechnungswesen',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Grundlagen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 5,
    scenario:
      'Rabia stolpert über die Kernaufgabe des Rechnungswesens: Dient das externe Rechnungswesen der Ermittlung der Wirtschaftlichkeit oder der Rechenschaft nach HGB?',
    question:
      'Welche Aussage grenzt das externe Rechnungswesen exakt nach der JLU-Lehre vom internen Rechnungswesen ab?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Das externe Rechnungswesen richtet sich an unternehmensexterne Adressaten (Gläubiger, Fiskus, Anteilseigner) und dient vorrangig der Rechenschaftslegung und dem Gläubigerschutz nach HGB. Die Wirtschaftlichkeitskontrolle ist Aufgabe des internen Rechnungswesens.',
        isCorrect: true,
        explanation: 'Exakt! Extern = HGB, Gläubigerschutz, Rechenschaft. Intern = Wirtschaftlichkeit, Kostenrechnung, Planung.',
      },
      {
        id: 'opt2',
        text: 'Das externe Rechnungswesen dient vorrangig der internen Planung und Wirtschaftlichkeitskontrolle der Produktionsprozesse.',
        isCorrect: false,
        explanation: 'Falsch! Wirtschaftlichkeitskontrolle und Prozessplanung gehören zur Kosten- und Leistungsrechnung (intern).',
      },
      {
        id: 'opt3',
        text: 'Sowohl internes als auch externes Rechnungswesen unterliegen zwingend den strengen gesetzlichen Vorschriften des HGB.',
        isCorrect: false,
        explanation: 'Falsch! Das interne Rechnungswesen ist gesetzlich weitgehend frei gestaltbar.',
      },
    ],
    hints: [
      'Denke an die Adressaten: Wer liest die Bilanz? Gläubiger (Banken) und das Finanzamt.',
      'Wirtschaftlichkeit wird von Prof. Wöhrmann in der Kostenrechnung berechnet, nicht im externen Jahresabschluss!',
    ],
    jluNotes: '§§ 238 ff. HGB Gläubigerschutzprinzip & Rechenschaft.',
    tags: ['Grundlagen', 'Externes RW', 'Internes RW', 'Rabia Notiz'],
  },
  {
    id: 'rabia-2',
    number: 'R 1.2',
    title: 'Bilanz vs. Gewinn- und Verlustrechnung (GuV)',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Grundlagen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 5,
    scenario:
      'In den Notizen fragt sich Rabia: Ist die Bilanz stichtagsbezogen oder zeitraumbezogen? Und was bildet die GuV ab?',
    question:
      'Welche Gegenüberstellung zwischen Bilanz und GuV ist nach HGB zutreffend?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Die Bilanz ist eine stichtagsbezogene Gegenüberstellung von Vermögen (Aktiva) und Kapital (Passiva); die GuV ist eine zeitraumbezogene Gegenüberstellung von Erträgen und Aufwendungen.',
        isCorrect: true,
        explanation: 'Richtig! Bilanz = Foto am Stichtag (z.B. 31.12.). GuV = Film des gesamten Geschäftsjahres.',
      },
      {
        id: 'opt2',
        text: 'Die Bilanz erfasst den Zeitraum eines Geschäftsjahres, während die GuV stichtagsbezogen das Eigenkapital misst.',
        isCorrect: false,
        explanation: 'Genau vertauscht! Bilanz ist stichtagsbezogen.',
      },
    ],
    hints: [
      'Stichtag = 31.12. um 24:00 Uhr. Zeitraum = 01.01. bis 31.12.',
    ],
    jluNotes: '§ 242 HGB: Pflicht zur Aufstellung von Bilanz und GuV.',
    tags: ['Bilanz', 'GuV', 'Stichtag', 'Zeitraum'],
  },
  {
    id: 'rabia-3',
    number: 'R 1.4',
    title: 'Der Flohmarktbesuch: Möbelkauf in bar',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Bilanzveränderungen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Bibi kauft auf dem Flohmarkt gebrauchte Vintage-Möbel für ihr Eiscafé zum Preis von 450,00 € und bezahlt sofort bar aus der Kasse.',
    question:
      'Formulieren Sie den Buchungssatz und bestimmen Sie die resultierende Bilanzveränderung!',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'BGA (Betriebs- und Geschäftsausstattung)', amount: 450 }],
      haben: [{ account: 'Kasse', amount: 450 }],
      effect: 'aktivtausch',
      explanation:
        'Aktivtausch! Das Aktivkonto BGA nimmt im Soll um 450 € zu, das Aktivkonto Kasse nimmt im Haben um 450 € ab. Die Bilanzsumme bleibt vollkommen unverändert!',
    },
    hints: [
      'Welche Konten sind beteiligt? BGA (Möbel) und Kasse (Bargeld).',
      'Beide Konten stehen auf der linken Seite (Aktiva). Daher Aktivtausch!',
    ],
    jluNotes: 'Aktivtausch berührt ausschließlich Aktivkonten. Bilanzsumme bleibt konstant.',
    tags: ['Aktivtausch', 'BGA', 'Kasse', 'Rabia Notiz'],
  },
  {
    id: 'rabia-4',
    number: 'R 1.5',
    title: 'Kreditaufnahme vs. Kredittilgung',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Bilanzveränderungen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Rabia hatte Schwierigkeiten bei der Unterscheidung: Die Bank überweist Bibi 50.000 € Darlehen auf das Girokonto (Fall A). Drei Monate später überweist Bibi 5.000 € Tilgung zurück an die Bank (Fall B, ohne Zinsen).',
    question:
      'Wie lauten die beiden Buchungssätze und deren Bilanzwirkungen?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Fall A: Bank an Verb. ggb. Kreditinstituten 50.000 € (Bilanzverlängerung). Fall B: Verb. ggb. Kreditinstituten an Bank 5.000 € (Bilanzverkürzung).',
        isCorrect: true,
        explanation: 'Exakt! Aufnahme mehrt Aktiva und Passiva (Verlängerung). Reine Tilgung mindert Verbindlichkeiten und Bankguthaben (Verkürzung). Zinsen fallen bei der reinen Tilgung nicht an.',
      },
      {
        id: 'opt2',
        text: 'Fall A ist ein Aktivtausch; Fall B ist ein Passivtausch.',
        isCorrect: false,
        explanation: 'Falsch! Bank ist Aktiva, Verbindlichkeiten sind Passiva. Daher berühren sie beide Seiten!',
      },
    ],
    hints: [
      'Bank = Aktivkonto (Guthaben). Verbindlichkeiten = Passivkonto (Schulden).',
      'Nehmen beide zu -> Bilanzverlängerung. Nehmen beide ab -> Bilanzverkürzung.',
    ],
    jluNotes: 'Unterscheide stets Kredittilgung (erfolgsneutral) von Kreditzinsen (Aufwand).',
    tags: ['Bilanzverlängerung', 'Bilanzverkürzung', 'Darlehen', 'Rabia Notiz'],
  },
  {
    id: 'rabia-5',
    number: 'R 2.2',
    title: 'Anschaffung der Küchenmaschine (2.000 € netto)',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Wareneinkauf & Anlagevermögen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 15,
    scenario:
      'Bibi kauft eine Profi-Küchenmaschine für 2.000,00 € netto (zzgl. 19% USt). Sie erhält die Maschine sofort geliefert. Vereinbart ist: 30% Sofortüberweisung per Bank, 70% Kauf auf Ziel (Verbindlichkeiten). Rabia fragte in ihren Notizen: Ist das eine Anzahlung?',
    question:
      'Warum handelt es sich hierbei NICHT um eine Anzahlung und wie lautet der korrekte Buchungssatz?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [
        { account: 'BGA (Küchenmaschine netto)', amount: 2000 },
        { account: 'Vorsteuer (19%)', amount: 380 },
      ],
      haben: [
        { account: 'Bank (30% von 2.380 €)', amount: 714 },
        { account: 'Verbindlichkeiten LuL (70% von 2.380 €)', amount: 1666 },
      ],
      effect: 'bilanzverlaengerung',
      explanation:
        'Weil die Maschine SOFORT übergeben wurde (Gefahrenübergang vollzogen)! Eine Anzahlung liegt nur vor, wenn VOR der Lieferung gezahlt wird. Die Maschine wird sofort voll als BGA aktiviert. Bilanzverlängerung um 1.666 €!',
    },
    hints: [
      'Gefahrenübergang bereits erfolgt = Anlagevermögen sofort aktivieren!',
      'Bruttobetrag = 2.000 € * 1,19 = 2.380 €. 30% per Bank = 714 €. 70% Ziel = 1.666 €.',
    ],
    jluNotes: '§ 253 Abs. 1 HGB: Aktivierung zu Anschaffungskosten bei Gefahrenübergang. Vorsteuer entsteht mit Rechnungsempfang & Leistungserbringung.',
    tags: ['BGA', 'Vorsteuer', 'Anzahlung', 'Rabia Notiz'],
  },
  {
    id: 'rabia-6',
    number: 'R 2.4',
    title: 'Erdbeerkauf mit Anzahlung (7% Vorsteuer)',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Vorsteuer & Anzahlungen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 15,
    scenario:
      'Bibi bestellt Bio-Erdbeeren für 1.000 € netto (ermäßigter Steuersatz 7%). Sie leistet eine Anzahlung von 214,00 € brutto per Banküberweisung VOR Lieferung.',
    question:
      'Wie bucht Bibi die geleistete Anzahlung inklusive der darin enthaltenen 7% Vorsteuer?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [
        { account: 'Geleistete Anzahlungen auf Vorräte (netto)', amount: 200 },
        { account: 'Vorsteuer (7%)', amount: 14 },
      ],
      haben: [
        { account: 'Bank', amount: 214 },
      ],
      effect: 'aktivtausch',
      explanation:
        'Bei geleisteter Anzahlung VOR Lieferung darf die Vorsteuer sofort bei Zahlung gezogen werden! Nettoanzahlung = 214 / 1,07 = 200 €. Vorsteuer = 14 €.',
    },
    hints: [
      'Achtung: Ermäßigter Steuersatz 7%! 214 € / 1,07 = 200 € Netto.',
      'Geleistete Anzahlungen ist ein Aktivkonto (Umlaufvermögen).',
    ],
    jluNotes: '§ 15 Abs. 1 Nr. 1 UStG: Vorsteuerabzug bei Anzahlungen bereits bei Zahlung möglich.',
    tags: ['Geleistete Anzahlung', 'Vorsteuer 7%', 'Rabia Notiz'],
  },
  {
    id: 'rabia-7',
    number: 'R 3.1',
    title: 'GuV als Unterkonto des Eigenkapitals',
    category: 'rabia_special',
    unit: 'Rabia Fokus: GuV & Eigenkapital',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Rabia notierte: "Warum ist die GuV ein Unterkonto des Eigenkapitals? Wo bucht man Aufwand und wo Ertrag?"',
    question:
      'Warum werden Aufwendungen im SOLL des GuV-Kontos gebucht, obwohl das Eigenkapital ein Passivkonto ist?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Weil Aufwendungen das Eigenkapital mindern. Das Eigenkapital als Passivkonto hat Minderungen im Soll. Daher stehen alle Aufwendungen im Soll des GuV-Kontos und Erträge im Haben.',
        isCorrect: true,
        explanation: 'Perfekt! Passivkonten mehren sich im Haben und mindern sich im Soll. Ertrag = Mehrung (Haben), Aufwand = Minderung (Soll).',
      },
      {
        id: 'opt2',
        text: 'Weil Aufwendungen immer Vermögensgegenstände darstellen, die auf der Aktivseite stehen müssen.',
        isCorrect: false,
        explanation: 'Falsch! Aufwand ist Vermögensverzehr, kein Vermögensgegenstand.',
      },
    ],
    hints: [
      'Eigenkapital ist ein Passivkonto: Anfangsbestand im Haben, Zugänge im Haben, Abgänge im Soll!',
    ],
    jluNotes: 'Das GuV-Konto sammelt alle Eigenkapitalveränderungen einer Periode und schließt über das Eigenkapitalkonto ab.',
    tags: ['GuV', 'Eigenkapital', 'Soll an Haben', 'Rabia Notiz'],
  },
  {
    id: 'rabia-8',
    number: 'R 3.5',
    title: 'Lagerentnahme von 340 € Rohstoffen für die Sorbet-Herstellung',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Vorräte & Erfolgswirksamkeit',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Bibi entnimmt dem Lager Früchte und Zucker im Wert von 340,00 €, um daraus direkt Eissorbet herzustellen. Rabia notierte: Ist hier die Kasse beteiligt? Ist das erfolgswirksam?',
    question:
      'Wie lautet der Buchungssatz beim Gesamtkostenverfahren (GKV) und welche Konten sind beteiligt?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'Aufwand für Rohstoffe (Materialaufwand)', amount: 340 }],
      haben: [{ account: 'Rohstoffe (Vorräte)', amount: 340 }],
      effect: 'erfolgswirksam_aufwand',
      explanation:
        'Kein Bargeld, keine Kasse! Es wird Rohstoffbestand (Aktivkonto Haben) entnommen und als Aufwand für Rohstoffe (GuV-Aufwandskonto Soll) gebucht.',
    },
    hints: [
      'Wurde an der Kasse bezahlt? Nein, die Zutaten lagen bereits im Lager!',
      'Bestand sinkt -> Rohstoffe im Haben. Aufwand steigt -> Aufwand für Rohstoffe im Soll.',
    ],
    jluNotes: 'Materialverbrauch nach der Aufwandsrechnerischen Methode.',
    tags: ['Rohstoffe', 'Materialaufwand', 'Lagerentnahme', 'Rabia Notiz'],
  },
  {
    id: 'rabia-9',
    number: 'R 3.7',
    title: 'Die Matrix: Zahlungs- vs. Erfolgswirksamkeit',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Begriffspaare',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Rabia hat eine Tabelle erstellt zur Abgrenzung von Zahlungswirksamkeit (Änderung liquider Mittel) und Erfolgswirksamkeit (Änderung des Eigenkapitals).',
    question:
      'Ordnen Sie den Vorfall "Barkauf von Büromaterial für 50 €" korrekt ein:',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Zahlungswirksam (liquide Mittel Kasse sinken) UND erfolgswirksam (Büromaterialaufwand mindert den Gewinn).',
        isCorrect: true,
        explanation: 'Richtig! Kasse nimmt ab (-50 € liquide Mittel) und Aufwand steigt (-50 € Gewinn).',
      },
      {
        id: 'opt2',
        text: 'Zahlungswirksam, aber erfolgsneutral, weil ein Aktivtausch vorliegt.',
        isCorrect: false,
        explanation: 'Falsch! Büromaterial wird direkt als Aufwand verbraucht und mindert den Periodenerfolg.',
      },
      {
        id: 'opt3',
        text: 'Erfolgswirksam, aber zahlungsunwirksam.',
        isCorrect: false,
        explanation: 'Falsch! Es wurde bar bezahlt, also ist es zahlungswirksam.',
      },
    ],
    hints: [
      'Fließt Geld? Ja -> zahlungswirksam.',
      'Verändert sich das Eigenkapital durch Aufwand? Ja -> erfolgswirksam.',
    ],
    jluNotes: 'Zahlungsebene (Kasse/Bank) vs. Erfolgsebene (Aufwand/Ertrag in der GuV).',
    tags: ['Zahlungswirksamkeit', 'Erfolgswirksamkeit', 'Matrix', 'Rabia Notiz'],
  },
  {
    id: 'rabia-10',
    number: 'R 6.8',
    title: 'Das Annuitätendarlehen: Zins vs. Tilgung trennen',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Finanzierung & Abschreibung',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 15,
    scenario:
      'Bibi überweist die jährliche Annuität für ihren Bankkredit in Höhe von 6.000,00 €. Laut Zins- und Tilgungsplan entfallen davon 1.800,00 € auf Zinsen und 4.200,00 € auf die Tilgung der Restschuld.',
    question:
      'Formulieren Sie den kombinierten Buchungssatz!',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [
        { account: 'Zinsaufwand (GuV)', amount: 1800 },
        { account: 'Verbindlichkeiten ggb. Kreditinstituten (Passiva)', amount: 4200 },
      ],
      haben: [{ account: 'Bank (Aktiva)', amount: 6000 }],
      effect: 'erfolgswirksam_aufwand',
      explanation:
        'Tilgung (4.200 €) mindert die Schulden (erfolgsneutral, Bilanzverkürzung). Zinsen (1.800 €) sind Aufwand (erfolgswirksam, mindert GuV). Gesamtüberweisung von der Bank = 6.000 €!',
    },
    hints: [
      'Niemals den gesamten Betrag gegen die Verbindlichkeit buchen!',
      'Zinsaufwand ist GuV-Aufwand im Soll, Tilgung ist Schuldenminderung im Soll.',
    ],
    jluNotes: 'Strikte Trennung von Kapitalrückzahlung (Tilgung) und Kapitalüberlassungskosten (Zinsaufwand nach § 275 HGB).',
    tags: ['Annuitätendarlehen', 'Zinsaufwand', 'Tilgung', 'Rabia Notiz'],
  },
  {
    id: 'rabia-11',
    number: 'R 1.6',
    title: 'Kredittilgung vs. Zinsaufwand auflösen',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Folge 1 - Bilanzveränderungen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'In ihren Notizen schrieb Rabia: "Die 4k wird vom BK abgebucht und wird von der Bank gezogen. Soll Bankkredit Passivk. 4.000k an Haben Bank Aktivk. 4.000k. Warum ist das keine Zinszahlung?"',
    question:
      'Wie lautet die korrekte buchhalterische Einordnung des Buchungssatzes "Bankkredit 4.000 € an Bank 4.000 €"?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Es handelt sich um eine reine Kredittilgung (Bilanzverkürzung, erfolgsneutral). Das Passivkonto Bankkredit mindert sich im Soll, das Aktivkonto Bank mindert sich im Haben. Zinsen würden als Aufwand im Soll eines Erfolgskontos (Zinsaufwand an Bank) erfasst.',
        isCorrect: true,
        explanation:
          'Exakt! Tilgung baut bestehende Schulden ab (erfolgsneutral). Zinsen hingegen vergüten die Geldüberlassung und sind Aufwand in der GuV.',
      },
      {
        id: 'opt2',
        text: 'Es handelt sich um eine Zinszahlung, weil Geld an die Bank abfließt und das Eigenkapital mindert.',
        isCorrect: false,
        explanation: 'Falsch! Tilgung mindert die Verbindlichkeit, nicht das Eigenkapital.',
      },
      {
        id: 'opt3',
        text: 'Es handelt sich um einen Aktiv-Passiv-Tausch mit Bilanzverlängerung.',
        isCorrect: false,
        explanation: 'Falsch! Beide Konten nehmen ab, also Bilanzverkürzung (Aktiv-Passiv-Minderung).',
      },
    ],
    hints: [
      'Passivkonto im Soll = Schulden nehmen ab.',
      'Aktivkonto im Haben = Bankguthaben nimmt ab.',
      'Zinsen berühren das GuV-Konto Zinsaufwand, nicht das Darlehenskonto!',
    ],
    jluNotes: '§ 266 Abs. 3 C. Verbindlichkeiten: Tilgung mindert den Passivposten direkt.',
    tags: ['Folge 1', 'Tilgung', 'Zinsen', 'Bilanzverkürzung', 'Rabia Notiz'],
  },
  {
    id: 'rabia-12',
    number: 'R 1.7',
    title: 'Inventar vs. Bilanz: Form & Detaillierung',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Folge 1 - Gesetzliche Grundlagen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Rabia notierte: "Inventar -> detaillierte Liste von Waren und Gegenstände des Unternehmers. Zeigt wie viel das Unternehmen zu einem bestimmten Zeitpunkt besitzt. Die Bilanz kann man durch das Inventar besser darstellen."',
    question:
      'Welches wesentliche Merkmal unterscheidet das Inventar nach § 240 HGB von der Bilanz nach § 266 HGB?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Das Inventar ist in Staffelform aufgestellt, enthält Mengengerüste (Stück, kg, Liter) und Einzelausweise. Die Bilanz ist in Kontenform (T-Form: Aktiva/Passiva) aufgestellt, fasst Vermögen und Schulden aggregiert zusammen und enthält nur Euro-Beträge.',
        isCorrect: true,
        explanation:
          'Ausgezeichnet! Das Inventar ist das detaillierte Mengengerüst aus der Inventur. Die Bilanz ist die gesetzlich verdichtete Übersicht in Kontenform.',
      },
      {
        id: 'opt2',
        text: 'Das Inventar wird in Kontenform geführt, die Bilanz hingegen in Staffelform.',
        isCorrect: false,
        explanation: 'Genau umgekehrt! Inventar = Staffelform, Bilanz = Kontenform.',
      },
      {
        id: 'opt3',
        text: 'Die Bilanz muss zwingend alle einzelnen Gegenstände mit Mengenangaben aufführen, das Inventar fasst sie zusammen.',
        isCorrect: false,
        explanation: 'Falsch! Die Bilanz fasst zusammen (§ 266 HGB), das Inventar listet einzeln (§ 240 HGB).',
      },
    ],
    hints: [
      'Staffelform = Liste untereinander mit Art, Menge und Einzelpreis.',
      'Kontenform = T-Konto mit zwei Seiten (Aktiva links, Passiva rechts).',
    ],
    jluNotes: '§ 240 HGB (Inventar) vs. § 242 & § 266 HGB (Bilanz).',
    tags: ['Folge 1', 'Inventar', 'Bilanz', 'HGB', 'Rabia Notiz'],
  },
  {
    id: 'rabia-13',
    number: 'R 2.1',
    title: 'Aktivtausch vs. Bilanzverkürzung im Wareneinkauf',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Folge 2 - Bilanzveränderungen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Rabia notierte auf dem Blatt zu Folge 2: "Aktivtausch zwischen Vorräte und Bank/Kasse... kein Aktivtausch Verbindlichkeit und Bank".',
    question:
      'Welcher der folgenden Geschäftsvorfälle stellt einen reinen Aktivtausch dar?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Bibi kauft Vorräte (Erdbeeren) für 150 € und bezahlt sofort bar aus der Kasse.',
        isCorrect: true,
        explanation:
          'Richtig! Vorräte (Aktivkonto Soll +150 €) und Kasse (Aktivkonto Haben -150 €). Nur die Aktivseite ist berührt -> reiner Aktivtausch, Bilanzsumme bleibt gleich!',
      },
      {
        id: 'opt2',
        text: 'Bibi überweist eine offene Lieferantenverbindlichkeit von 750 € per Bank.',
        isCorrect: false,
        explanation: 'Falsch! Verbindlichkeiten (Passivkonto) und Bank (Aktivkonto) -> Bilanzverkürzung.',
      },
      {
        id: 'opt3',
        text: 'Bibi kauft eine Eismaschine auf Ziel (Rechnung).',
        isCorrect: false,
        explanation: 'Falsch! BGA (Aktivkonto) und Verbindlichkeiten (Passivkonto) -> Bilanzverlängerung.',
      },
    ],
    hints: [
      'Aktivtausch: Beide Konten liegen auf der linken Seite (Aktiva).',
      'Ein Aktivkonto steigt im Soll, ein anderes Aktivkonto sinkt im Haben.',
    ],
    jluNotes: 'Vier Bilanzveränderungen: Nur Aktivtausch lässt beide Seiten der Bilanzsumme unverändert.',
    tags: ['Folge 2', 'Aktivtausch', 'Vorräte', 'Kasse', 'Rabia Notiz'],
  },
  {
    id: 'rabia-14',
    number: 'R 2.3',
    title: 'Steuerberechnung & Keine Steuer auf Geldtransfers',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Folge 2 - Umsatzsteuer-Logik',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 15,
    scenario:
      'Rabia rechnete bei einem Bankkredit von 3.000 €: "3.000 / 1,19 = 2.521 €, Steuer = 479 €". Danach notierte sie verwirrt: "Steuer falsch berechnet -> Steuer mit im Preis? Warum bei D nicht?"',
    question:
      'Warum fällt bei einer Bankkreditaufnahme oder einer Darlehenstilgung KEINE Vorsteuer oder Umsatzsteuer an?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Reine Geldtransfers (Kreditaufnahme, Tilgung, Überweisung, Barabhebung) sind keine Lieferungen oder sonstigen Leistungen im Sinne des § 1 Abs. 1 UStG. Umsatzsteuer fällt nur an, wenn ein Unternehmer Waren liefert oder Dienstleistungen erbringt!',
        isCorrect: true,
        explanation:
          'Volltreffer! Geld ist keine Ware. Reine Finanztransaktionen unterliegen niemals der Umsatzsteuer. Zudem: Ist bei Waren die Steuer im Preis enthalten (Brutto), rechnet man Netto = Brutto / 1,19. Man zieht niemals einfach 19% vom Bruttobetrag ab!',
      },
      {
        id: 'opt2',
        text: 'Weil Banken von der Steuer befreit sind und daher nur 7% Vorsteuer berechnet wird.',
        isCorrect: false,
        explanation: 'Falsch! Bei Geldtransfers fällt gar keine Steuer an.',
      },
      {
        id: 'opt3',
        text: 'Weil die Vorsteuer erst am Jahresende bei der Steuererklärung berechnet wird.',
        isCorrect: false,
        explanation: 'Falsch! Vorsteuer bei Warenlieferungen wird sofort gebucht, bei Krediten nie.',
      },
    ],
    hints: [
      'Ist Geld eine Ware oder Dienstleistung? Nein!',
      '§ 1 Abs. 1 Nr. 1 UStG: Steuerbar sind nur Lieferungen und sonstige Leistungen.',
      'Merke: Kredite, Tilgungen, Einlagen und Entnahmen sind immer OHNE Steuer!',
    ],
    jluNotes: '§ 1 Abs. 1 UStG & § 4 Nr. 8 UStG (Steuerbefreiung von Krediten).',
    tags: ['Folge 2', 'Umsatzsteuer', 'Vorsteuer', 'Geldtransfers', 'Rabia Notiz'],
  },
  {
    id: 'rabia-15',
    number: 'R 2.5',
    title: 'Rohstoffkauf bar mit 7% ermäßigter Vorsteuer',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Folge 2 - Wareneinkauf',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Bibi kauft Bio-Zutaten (Lebensmittel) für 150,00 € netto (7% ermäßigter Steuersatz) und bezahlt den Betrag von 160,50 € sofort bar aus der Kasse.',
    question:
      'Wie lautet der vollständige Buchungssatz für diesen Einkauf?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [
        { account: 'Vorräte (Rohstoffe)', amount: 150 },
        { account: 'Vorsteuer (7%)', amount: 10.5 },
      ],
      haben: [{ account: 'Kasse', amount: 160.5 }],
      effect: 'aktivtausch',
      explanation:
        'Vorräte (+150 €) und Vorsteuer (+10,50 € Forderung ans Finanzamt) sind Aktivkonten im Soll. Kasse (-160,50 €) ist Aktivkonto im Haben. Reiner Aktivtausch!',
    },
    hints: [
      'Ermäßigter Steuersatz 7% von 150 € = 10,50 €.',
      'Bruttozahlung an der Kasse = 150 € + 10,50 € = 160,50 €.',
      'Vorsteuer ist eine Forderung gegenüber dem Finanzamt (Aktivseite).',
    ],
    jluNotes: '§ 12 Abs. 2 UStG (7% auf Grundnahrungsmittel) & § 15 UStG.',
    tags: ['Folge 2', 'Vorräte', 'Vorsteuer 7%', 'Kasse', 'Aktivtausch', 'Rabia Notiz'],
  },
  {
    id: 'rabia-16',
    number: 'R 3.3',
    title: 'Warum Aufwendungen im SOLL und Erträge im HABEN stehen',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Folge 3 - GuV & Erfolgskonten',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Rabia fragte in ihren Notizen zu Folge 3: "Auf welcher Seite Aufwand? Auf welcher Ertrag? Jahresfehlbetrag Haben?".',
    question:
      'Welche Herleitung erklärt logisch und zweifelsfrei, warum Aufwendungen im Soll und Erträge im Haben gebucht werden?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Das Eigenkapital ist ein Passivkonto: Zunahmen stehen im Haben, Abnahmen im Soll. Weil Erträge das Eigenkapital vermehren, stehen Erträge im Haben. Weil Aufwendungen das Eigenkapital vermindern, stehen Aufwendungen im Soll!',
        isCorrect: true,
        explanation:
          'Genial verstanden! Das GuV-Konto ist das Unterkonto des Eigenkapitals. Minderung des Passivkontos EK = Soll (Aufwand). Mehrung des Passivkontos EK = Haben (Ertrag).',
      },
      {
        id: 'opt2',
        text: 'Aufwendungen stehen im Soll, weil sie dem Unternehmen gehören (Aktiva), und Erträge stehen im Haben, weil sie Schulden darstellen.',
        isCorrect: false,
        explanation: 'Falsch! Aufwendungen und Erträge sind keine Vermögensgegenstände oder Schulden, sondern Stromgrößen des Werteverzehrs bzw. Wertezuwachses.',
      },
    ],
    hints: [
      'Erinnere dich: Das Eigenkapitalkonto steht auf der Passivseite der Bilanz.',
      'Passivkonten: Anfangsbestand und Mehrungen im Haben, Minderungen im Soll.',
    ],
    jluNotes: 'Erfolgskonten sind Unterkonten des Eigenkapitals (§ 242 HGB).',
    tags: ['Folge 3', 'GuV', 'Aufwand im Soll', 'Ertrag im Haben', 'Rabia Notiz'],
  },
  {
    id: 'rabia-17',
    number: 'R 3.4',
    title: 'Warum die Eisherstellung erfolgsneutral ist & Kasse falsch ist',
    category: 'rabia_special',
    unit: 'Rabia Fokus: Folge 3 - Eisherstellung & GuV',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 15,
    scenario:
      'Rabia notierte auf dem Blatt zu Folge 3.5: "350 € Lager für Herstellung -> warum erfolgsneutral? Warum Fertige Erzeugnisse an Kasse falsch ist?". Sie hatte "Fertige Eis an Kasse" notiert und ein Fragezeichen daran gemacht.',
    question:
      'Warum ist bei der Umwandlung von Lagerfrüchten in fertiges Eis das Konto Kasse falsch, und warum ist der Vorgang insgesamt erfolgsneutral?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Kasse ist falsch, weil kein Bargeld fließt – die Früchte stammen aus dem Lager (Vorräte)! Und der Vorgang ist erfolgsneutral, weil der Aufwand aus dem Rohstoffverbrauch (340 € Soll) durch den gleich hohen Ertrag aus der Bestandsmehrung an Fertigerzeugnissen (340 € Haben) in der GuV exakt kompensiert wird.',
        isCorrect: true,
        explanation:
          'Perfekt! 1. Kein Geldfluss: Rohstoffe verlassen das Lager (RHB im Haben). 2. Erfolgsneutral: Man wird durch bloßes Einfrieren und Pürieren von Früchten noch nicht reicher. Erst der VERKAUF an Kunden realisiert den Gewinn!',
      },
      {
        id: 'opt2',
        text: 'Kasse ist richtig, weil man dem Mitarbeiter ein Eisgeld auszahlt, aber die Bilanzsumme bleibt gleich.',
        isCorrect: false,
        explanation: 'Falsch! Bei der internen Lagerentnahme wird niemals Kasse gebucht.',
      },
      {
        id: 'opt3',
        text: 'Der Vorgang ist erfolgswirksam, weil das fertige Eis einen höheren Verkaufspreis hat und daher sofort Gewinn entsteht.',
        isCorrect: false,
        explanation: 'Falsch! Nach dem Realisationsprinzip (§ 252 Abs. 1 Nr. 4 HGB) darf Gewinn erst beim Verkauf ausgewiesen werden, nicht bei der Produktion!',
      },
    ],
    hints: [
      'Gab es an der Kasse einen Kassenbon? Nein, reine Lagerumbuchung!',
      'GKV bucht: Rohstoffaufwand an Vorräte UND Fertigerzeugnisse an Bestandsmehrung.',
      'Aufwand 340 € - Ertrag 340 € = 0 € Erfolgswirkung!',
    ],
    jluNotes: 'Realisationsprinzip § 252 Abs. 1 Nr. 4 HGB & Gesamtkostenverfahren nach § 275 Abs. 2 HGB.',
    tags: ['Folge 3', 'Eisherstellung', 'Kasse', 'Bestandsmehrung', 'GKV', 'Rabia Notiz'],
  },
];

