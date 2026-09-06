import { Exercise } from './curriculumTypes';

export const buchfuehrungExercises: Exercise[] = [
  // FOLGE 1
  {
    id: 'bf-f1-1',
    number: '1.1',
    title: 'Funktionen des externen und internen Rechnungswesens',
    category: 'buchfuehrung',
    unit: 'Folge 1: Die Gründung',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 5,
    scenario:
      'Zu Beginn des Studiums an der JLU Gießen lernen die Studierenden die Grundlagen des betrieblichen Rechnungswesens kennen.',
    question:
      'Welche der folgenden Aussagen ist nach HGB und JLU-Vorlesung korrekt?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Zu den Kernfunktionen des externen Rechnungswesens zählen die Dokumentations-, Rechenschafts- und Gläubigerschutzfunktion nach handelsrechtlichen Vorschriften.',
        isCorrect: true,
        explanation: 'Korrekt! Extern = HGB, Gläubigerschutz, Rechenschaft gegenüber Finanzamt und Banken.',
      },
      {
        id: 'opt2',
        text: 'Die Dokumentationsfunktion ist ausschließlich Aufgabe des internen Rechnungswesens.',
        isCorrect: false,
        explanation: 'Falsch! § 238 HGB verpflichtet jeden Kaufmann zur lückenlosen Dokumentation im externen Rechnungswesen.',
      },
    ],
    hints: ['§ 238 HGB Buchführungspflicht.'],
    jluNotes: 'Ewelt-Knauer Vorlesung Folge 1, Folie 12 ff.',
    tags: ['Grundlagen', 'HGB', 'Folge 1'],
  },
  {
    id: 'bf-f1-4',
    number: '1.4',
    title: 'Der Flohmarktbesuch (Aktivtausch)',
    category: 'buchfuehrung',
    unit: 'Folge 1: Die Gründung',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Bibi kauft auf dem Flohmarkt gebrauchte Vintage-Möbel für ihr Café für 450,00 € bar.',
    question:
      'Buchen Sie den Geschäftsvorfall und bestimmen Sie die Bilanzwirkung!',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'BGA', amount: 450 }],
      haben: [{ account: 'Kasse', amount: 450 }],
      effect: 'aktivtausch',
      explanation: 'Aktivtausch: BGA (Aktiva) nimmt zu, Kasse (Aktiva) nimmt ab. Bilanzsumme unverändert.',
    },
    hints: ['Möbel gehören zur BGA. Barzahlung berührt die Kasse.'],
    jluNotes: 'Aktivtausch ändert die Vermögensstruktur, nicht die Bilanzsumme.',
    tags: ['Aktivtausch', 'BGA', 'Kasse', 'Folge 1'],
  },

  // FOLGE 2
  {
    id: 'bf-f2-2',
    number: '2.2',
    title: 'Anschaffung der Gewerbe-Küchenmaschine',
    category: 'buchfuehrung',
    unit: 'Folge 2: Der Wareneinkauf & Anlagevermögen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 15,
    scenario:
      'Bibi erwirbt eine neue Profi-Küchenmaschine für 2.000,00 € netto zzgl. 19% Vorsteuer (380,00 €). Die Maschine wird sofort geliefert. Vereinbart ist: 30% Sofortüberweisung per Bank (714,00 €), Rest auf Ziel (1.666,00 €).',
    question:
      'Buchen Sie den zusammengesetzten Buchungssatz!',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [
        { account: 'BGA', amount: 2000 },
        { account: 'Vorsteuer', amount: 380 },
      ],
      haben: [
        { account: 'Bank', amount: 714 },
        { account: 'Verbindlichkeiten LuL', amount: 1666 },
      ],
      effect: 'bilanzverlaengerung',
      explanation:
        'Soll: BGA 2.000 € + Vorsteuer 380 € an Haben: Bank 714 € + Verbindlichkeiten 1.666 €. Bilanzverlängerung um 1.666 €!',
    },
    hints: ['Bruttobetrag = 2.380 €. Bankzahlung 30% = 714 €. Ziel 70% = 1.666 €.'],
    jluNotes: 'Rabia Kernaufgabe: Sofortige Aktivierung da Gefahrenübergang vollzogen!',
    tags: ['BGA', 'Vorsteuer', 'Kauf auf Ziel', 'Folge 2'],
  },
  {
    id: 'bf-f2-4',
    number: '2.4',
    title: 'Erdbeerkauf mit Anzahlung (7% Vorsteuer)',
    category: 'buchfuehrung',
    unit: 'Folge 2: Der Wareneinkauf & Anlagevermögen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Bibi bestellt Früchte und leistet per Banküberweisung vorab eine Anzahlung in Höhe von 214,00 € brutto (inkl. 7% USt).',
    question:
      'Buchen Sie die geleistete Anzahlung mit Vorsteuerabzug!',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [
        { account: 'Geleistete Anzahlungen auf Vorräte', amount: 200 },
        { account: 'Vorsteuer', amount: 14 },
      ],
      haben: [{ account: 'Bank', amount: 214 }],
      effect: 'aktivtausch',
      explanation:
        'Geleistete Anzahlungen (netto 200 €) und Vorsteuer (14 €) an Bank (214 €). Aktivtausch!',
    },
    hints: ['214 / 1,07 = 200 € Netto. Vorsteuer = 14 €.'],
    jluNotes: '§ 15 Abs. 1 Nr. 1 UStG: Vorsteuerabzug bei Vorauszahlungen.',
    tags: ['Anzahlung', 'Vorsteuer 7%', 'Folge 2'],
  },

  // FOLGE 3
  {
    id: 'bf-f3-3',
    number: '3.3',
    title: 'Soll oder Haben? GuV Buchungsregeln',
    category: 'buchfuehrung',
    unit: 'Folge 3: Die GuV',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 5,
    scenario:
      'Bibi begleicht die monatliche Geschäftsraummiete für das Eiscafé in Höhe von 1.200,00 € per Banküberweisung.',
    question:
      'Wie lautet der Buchungssatz und auf welcher Seite des Mietaufwandskontos wird gebucht?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'Mietaufwand', amount: 1200 }],
      haben: [{ account: 'Bank', amount: 1200 }],
      effect: 'erfolgswirksam_aufwand',
      explanation:
        'Mietaufwand im Soll (Aufwendungen mindern das Eigenkapital) an Bank im Haben (Guthabenabgang). Erfolgswirksam!',
    },
    hints: ['Aufwand steht immer im Soll!'],
    jluNotes: 'GuV schließt als Unterkonto zum Eigenkapitalkonto ab.',
    tags: ['GuV', 'Aufwand', 'Miete', 'Folge 3'],
  },

  // FOLGE 4
  {
    id: 'bf-f4-1',
    number: '4.1',
    title: 'Umsatzerlöse aus dem Eisverkauf (Barverkauf mit 7% USt)',
    category: 'buchfuehrung',
    unit: 'Folge 4: Umsatzerlöse & Steuern',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Am Samstag erzielt Bibi im Straßenverkauf 1.070,00 € Bareinnahmen aus dem Verkauf von Speiseeis zum Mitnehmen (ermäßigter Steuersatz 7%).',
    question:
      'Buchen Sie die Tageseinnahmen in Kasse, Umsatzerlöse und Umsatzsteuer!',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'Kasse', amount: 1070 }],
      haben: [
        { account: 'Umsatzerlöse', amount: 1000 },
        { account: 'Umsatzsteuer (7%)', amount: 70 },
      ],
      effect: 'erfolgswirksam_ertrag',
      explanation:
        'Kasse (brutto 1.070 €) an Umsatzerlöse (netto 1.000 €) und Umsatzsteuer (70 €). Erfolgswirksam!',
    },
    hints: ['1.070 / 1,07 = 1.000 € Nettoerlös. 70 € ist Umsatzsteuer (Verbindlichkeit ggü. Finanzamt).'],
    jluNotes: '§ 12 Abs. 2 UStG: 7% für Lebensmittel zum Mitnehmen.',
    tags: ['Umsatzerlöse', 'Umsatzsteuer', 'Kasse', 'Folge 4'],
  },

  // FOLGE 5
  {
    id: 'bf-f5-2',
    number: '5.2',
    title: 'Lieferantenskonto bei fristgerechter Bezahlung',
    category: 'buchfuehrung',
    unit: 'Folge 5: Anschaffungspreisminderungen & Skonto',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 15,
    scenario:
      'Bibi bezahlt eine offene Eingangsrechnung über Rohstoffe von 1.190,00 € brutto (1.000 € netto + 190 € VSt) innerhalb der Skontofrist per Bank unter Abzug von 2% Skonto.',
    question:
      'Wie lautet der Buchungssatz unter Berücksichtigung der Vorsteuerkorrektur?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'Verbindlichkeiten LuL', amount: 1190 }],
      haben: [
        { account: 'Bank (98% des Rechnungsbetrags)', amount: 1166.2 },
        { account: 'Nachlässe / Rohstoffe (netto Skonto)', amount: 20 },
        { account: 'Vorsteuer (Vorsteuerkorrektur)', amount: 3.8 },
      ],
      effect: 'bilanzverkuerzung',
      explanation:
        'Verbindlichkeiten LuL (1.190 €) an Bank (1.166,20 €), Nachlässe Rohstoffe (20,00 €) und Vorsteuerkorrektur (3,80 €).',
    },
    hints: [
      'Skontobetrag brutto = 2% von 1.190 € = 23,80 €.',
      'Darin enthalten: 20,00 € Netto-Minderung und 3,80 € Vorsteuerkorrektur!',
    ],
    jluNotes: '§ 17 UStG: Berichtigung des Vorsteuerabzugs bei Minderung der Bemessungsgrundlage.',
    tags: ['Skonto', 'Lieferantenskonto', 'Vorsteuerkorrektur', 'Folge 5'],
  },

  // FOLGE 6
  {
    id: 'bf-f6-4',
    number: '6.4',
    title: 'Lineare planmäßige Abschreibung der Eistheke',
    category: 'buchfuehrung',
    unit: 'Folge 6: Abschreibungen',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Eine am 01.01. angeschaffte Eistheke (Anschaffungskosten 12.000,00 € netto) hat eine betriebsgewöhnliche Nutzungsdauer von 6 Jahren. Am 31.12. wird die planmäßige lineare AfA gebucht.',
    question:
      'Wie lautet der jährliche Abschreibungsbuchungssatz?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'Abschreibungen auf Sachanlagen (AfA)', amount: 2000 }],
      haben: [{ account: 'BGA (Eistheke)', amount: 2000 }],
      effect: 'erfolgswirksam_aufwand',
      explanation:
        'Lineare AfA = 12.000 € / 6 Jahre = 2.000 € p.a. Buchungssatz: Abschreibungen an BGA 2.000 €.',
    },
    hints: ['12.000 € / 6 = 2.000 €.'],
    jluNotes: '§ 253 Abs. 3 HGB: Pflicht zur planmäßigen Abschreibung beim abnutzbaren Anlagevermögen.',
    tags: ['Abschreibung', 'Lineare AfA', 'BGA', 'Folge 6'],
  },

  // FOLGE 7
  {
    id: 'bf-f7-1',
    number: '7.1',
    title: 'Private Entnahmen des Einzelunternehmers',
    category: 'buchfuehrung',
    unit: 'Folge 7: Das Privatkonto',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Bibi entnimmt für ihren privaten Sommerurlaub 1.500,00 € vom geschäftlichen Bankkonto.',
    question:
      'Wie bucht Bibi diese Privatentnahme und berührt sie den Jahresgewinn in der GuV?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'Privatkonto', amount: 1500 }],
      haben: [{ account: 'Bank', amount: 1500 }],
      effect: 'bilanzverkuerzung',
      explanation:
        'Privatkonto an Bank 1.500 €. Sie ist ERFOLGSNEUTRAL und berührt die GuV nicht! Das Privatkonto schließt am Jahresende direkt über das Eigenkapitalkonto ab.',
    },
    hints: ['Privatentnahmen sind niemals Aufwand!'],
    jluNotes: '§ 249 Abs. 2 HGB / JLU: Privatkonto ist Unterkonto des Eigenkapitalkontos.',
    tags: ['Privatkonto', 'Privatentnahme', 'Eigenkapital', 'Folge 7'],
  },

  // FOLGE 8
  {
    id: 'bf-f8-5',
    number: '8.5',
    title: 'Rückstellung für drohenden Gerichtsprozess',
    category: 'buchfuehrung',
    unit: 'Folge 8: Rückstellungen & Bewertung',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Gegen Bibi läuft am Bilanzstichtag eine Klage eines Nachbarn. Bibis Anwalt schätzt die drohende Schadensersatz- und Gerichtskostensumme auf 5.000,00 €.',
    question:
      'Wie bucht Bibi die Bildung der Rückstellung zum 31.12.?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'Sonstiger betrieblicher Aufwand (Rechts- und Beratungskosten)', amount: 5000 }],
      haben: [{ account: 'Sonstige Rückstellungen', amount: 5000 }],
      effect: 'erfolgswirksam_aufwand',
      explanation:
        'Aufwand an Sonstige Rückstellungen 5.000 €. Aufwand mindert den Periodenerfolg periodengerecht nach dem Imparitätsprinzip (§ 249 Abs. 1 HGB).',
    },
    hints: ['Ungewisse Verbindlichkeiten müssen nach § 249 Abs. 1 HGB passiviert werden.'],
    jluNotes: '§ 249 Abs. 1 Satz 1 HGB: Rückstellung für ungewisse Verbindlichkeiten.',
    tags: ['Rückstellung', 'Imparitätsprinzip', 'Folge 8'],
  },

  // FOLGE 9
  {
    id: 'bf-f9-2',
    number: '9.2',
    title: 'Transitorische Rechnungsabgrenzung (ARAP)',
    category: 'buchfuehrung',
    unit: 'Folge 9: Rechnungsabgrenzung & Jahresabschluss',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 15,
    scenario:
      'Bibi überweist am 01.12. die Kfz-Versicherungsprämie für den Lieferwagen für 12 Monate im Voraus (01.12.x1 bis 30.11.x2) in Höhe von 1.200,00 € per Bank.',
    question:
      'Wie lautet die Rechnungsabgrenzungsbuchung zum 31.12.x1, um den Aufwand periodengerecht aufzuteilen?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'Aktive Rechnungsabgrenzungsposten (ARAP)', amount: 1100 }],
      haben: [{ account: 'Versicherungsaufwand', amount: 1100 }],
      effect: 'aktivtausch',
      explanation:
        '1 Monat (100 €) gehört in Periode x1. 11 Monate (1.100 €) gehören in Periode x2! Buchung am 31.12.x1: ARAP an Versicherungsaufwand 1.100 €.',
    },
    hints: ['Ausgabe jetzt, Aufwand später = Aktiver Rechnungsabgrenzungsposten (ARAP).'],
    jluNotes: '§ 250 Abs. 1 HGB: ARAP für Ausgaben vor dem Stichtag, die Aufwand für eine bestimmte Zeit danach darstellen.',
    tags: ['ARAP', 'Rechnungsabgrenzung', 'Transitorisch', 'Folge 9'],
  },

  // FOLGE 10
  {
    id: 'bf-f10-3',
    number: '10.3',
    title: 'Eröffnungsbuchungen über das Eröffnungsbilanzkonto (EBK)',
    category: 'buchfuehrung',
    unit: 'Folge 10: Systematik der Doppelten Buchführung',
    professor: 'Prof. Dr. Corinna Ewelt-Knauer',
    points: 10,
    scenario:
      'Zu Beginn des neuen Geschäftsjahres muss das Bestandskonto Bank mit einem Anfangsbestand von 25.000,00 € eröffnet werden.',
    question:
      'Wie lautet der exakte Buchungssatz unter Verwendung des EBK?',
    type: 'buchungssatz',
    buchungssatz: {
      soll: [{ account: 'Bank', amount: 25000 }],
      haben: [{ account: 'Eröffnungsbilanzkonto (EBK)', amount: 25000 }],
      effect: 'erfolgsneutral',
      explanation:
        'Aktivkonten werden im Soll an EBK im Haben eröffnet (Spiegelbild der Bilanz). Buchungssatz: Bank an EBK 25.000 €.',
    },
    hints: ['Das EBK ist das spiegelbildliche Hilfskonto zur Eröffnungsbilanz.'],
    jluNotes: '§ 252 Abs. 1 Nr. 1 HGB: Bilanzidentität (Schlussbilanz = Eröffnungsbilanz).',
    tags: ['EBK', 'Eröffnungsbilanz', 'Bilanzidentität', 'Folge 10'],
  },
];
