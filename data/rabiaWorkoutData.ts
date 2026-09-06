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
];
