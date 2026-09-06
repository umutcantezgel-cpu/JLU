import { Exercise } from './curriculumTypes';

export const kostenrechnungExercises: Exercise[] = [
  {
    id: 'klr-le2-1',
    number: 'LE 2.1',
    title: 'Abgrenzung von Aufwand und Kosten (Neutraler Aufwand)',
    category: 'kostenrechnung',
    unit: 'LE 2: Abgrenzungsrechnung',
    professor: 'Prof. Dr. Arnt Wöhrmann',
    points: 5,
    scenario:
      'Im Rahmen der Abgrenzungsrechnung bei der Fuchsberger AG (Praktikum mit Herrn Matrovic) stürzt eine Lawine an den Alpen auf ein Lagergebäude. Der Gebäudeschaden beträgt 450.000 €.',
    question:
      'Um welche Art von Aufwand bzw. Kosten handelt es sich bei diesem Vorfall im internen Rechnungswesen?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Neutraler Aufwand (außerordentlicher Aufwand), da er unvorhersehbar und unregelmäßig anfällt. Er geht NICHT als Grundkosten in die Kostenrechnung ein.',
        isCorrect: true,
        explanation: 'Korrekt! Naturkatastrophen sind neutraler Aufwand (außerordentlich). In der KLR wird stattdessen ein kalkulatorisches Wagnis angesetzt.',
      },
      {
        id: 'opt2',
        text: 'Echte Grundkosten, da das Lagergebäude der betrieblichen Leistungserstellung dient.',
        isCorrect: false,
        explanation: 'Falsch! Der plötzliche Lawinenschaden ist ein außerordentliches Schadensereignis.',
      },
      {
        id: 'opt3',
        text: 'Zusatzkosten, die dem Lagergebäude direkt als Einzelkosten zugerechnet werden.',
        isCorrect: false,
        explanation: 'Falsch! Zusatzkosten haben keinen Aufwand in der Finanzbuchhaltung.',
      },
    ],
    hints: [
      'Erinnere dich an die 3 Arten neutralen Aufwands: betriebsfremd, außerordentlich, periodenfremd.',
    ],
    jluNotes: 'Wöhrmann Skript KLR S. 24: Abgrenzung Aufwand/Kosten nach pagatorischem vs. wertmäßigem Kostenbegriff.',
    tags: ['Abgrenzungsrechnung', 'Neutraler Aufwand', 'Außerordentlich', 'LE 2'],
  },
  {
    id: 'klr-le2-2',
    number: 'LE 2.2',
    title: 'Kalkulatorischer Unternehmerlohn & Zusatzkosten',
    category: 'kostenrechnung',
    unit: 'LE 2: Abgrenzungsrechnung',
    professor: 'Prof. Dr. Arnt Wöhrmann',
    points: 5,
    scenario:
      'Erwin betreibt eine Einzelfirma und arbeitet 50 Wochenstunden als Geschäftsführer. Er zahlt sich kein Gehalt, sondern tätigt Privatentnahmen.',
    question:
      'Wie wird Erwins Arbeitsleistung in der Kosten- und Leistungsrechnung berücksichtigt?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Als kalkulatorischer Unternehmerlohn in Form von Zusatzkosten (Kosten, denen kein Aufwand in der GuV gegenübersteht), orientiert an einem marktüblichen Gehalt eines angestellten Geschäftsführers.',
        isCorrect: true,
        explanation: 'Vollkommen richtig! Privatentnahmen sind kein Aufwand (§ 275 HGB), stellen aber Opportunitätskosten dar.',
      },
      {
        id: 'opt2',
        text: 'Überhaupt nicht, da dem Unternehmer nur der bilanzielle Reingewinn zusteht.',
        isCorrect: false,
        explanation: 'Falsch! Ohne kalkulatorischen Unternehmerlohn wären die Selbstkosten und Preise zu niedrig kalkuliert.',
      },
      {
        id: 'opt3',
        text: 'Als Anderskosten in Höhe der getätigten Privatentnahmen.',
        isCorrect: false,
        explanation: 'Falsch! Privatentnahmen schwanken willkürlich und sind keine Kostenbasis.',
      },
    ],
    hints: [
      'Zusatzkosten = Kosten ohne Aufwand. Anderskosten = Kosten in anderer Höhe als Aufwand.',
    ],
    jluNotes: 'Kalkulatorische Kostenarten: AfA, Zinsen, Wagnisse, Miete, Unternehmerlohn.',
    tags: ['Zusatzkosten', 'Unternehmerlohn', 'LE 2'],
  },
  {
    id: 'klr-le4-1',
    number: 'LE 4.1',
    title: 'Kalkulatorische Abschreibung vs. Bilanzielle AfA',
    category: 'kostenrechnung',
    unit: 'LE 4: Kalkulatorische Kosten',
    professor: 'Prof. Dr. Arnt Wöhrmann',
    points: 10,
    scenario:
      'Eine Maschine wurde vor 5 Jahren für 100.000 € angeschafft (bilanzielle Nutzungsdauer lt. AfA-Tabelle: 5 Jahre, Restwert 0 €). In der Kostenrechnung wird mit einer tatsächlichen Nutzungsdauer von 8 Jahren gerechnet. Der Wiederbeschaffungswert beträgt aktuell 160.000 €.',
    question:
      'Wie hoch ist die jährliche kalkulatorische Abschreibung bei linearer Verteilung über die tatsächliche Nutzungsdauer auf Basis des Wiederbeschaffungswerts?',
    type: 'calculation',
    calculationFields: [
      {
        id: 'kalk_afa',
        label: 'Kalkulatorische Jahres-AfA (€)',
        correctValue: 20000,
        tolerance: 0,
        explanation: '160.000 € Wiederbeschaffungswert / 8 Jahre = 20.000 € pro Jahr.',
      },
      {
        id: 'bilanz_afa',
        label: 'Bilanzielle AfA im 6. Jahr (€)',
        correctValue: 0,
        tolerance: 0,
        explanation: 'Im 6. Jahr ist die Maschine nach Handelsrecht voll abgeschrieben (Buchwert 0 bzw. Erinnerungseuro).',
      },
    ],
    hints: [
      'Kalkulatorische AfA = Wiederbeschaffungswert / wirtschaftliche Nutzungsdauer.',
      'Bilanzielle AfA = Anschaffungskosten / steuerliche AfA-Tabellendauer.',
    ],
    jluNotes: 'Kalkulatorische Abschreibungen sichern die Substanzerhaltung des Unternehmens.',
    tags: ['Kalkulatorische AfA', 'Wiederbeschaffungswert', 'LE 4'],
  },
  {
    id: 'klr-le5-1',
    number: 'LE 5.1',
    title: 'Innerbetriebliche Leistungsverrechnung: Stufenleiterverfahren',
    category: 'kostenrechnung',
    unit: 'LE 5: IBLV',
    professor: 'Prof. Dr. Arnt Wöhrmann',
    points: 10,
    scenario:
      'Die Versicherung „Safety-First“ hat zwei Hilfskostenstellen: Kantine (H1) und IT-Support (H2). H1 erbringt 20% ihrer Leistung an H2 und 80% an Hauptkostenstellen. H2 erbringt nur 5% an H1. Beim Stufenleiterverfahren wird H1 zuerst abgerechnet.',
    question:
      'Welche Annahme trifft das Stufenleiterverfahren bezüglich rückwirkender Leistungsbeziehungen?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Rückwirkende Leistungsbeziehungen (von nachgelagerten Kostenstellen an bereits abgerechnete vorgelagerte Stellen) werden vollständig ignoriert. Dadurch entsteht eine Näherungslösung.',
        isCorrect: true,
        explanation: 'Richtig! Die Treppe geht nur in eine Richtung. Exakt ist nur das simultane Gleichungsverfahren.',
      },
      {
        id: 'opt2',
        text: 'Das Stufenleiterverfahren löst alle wechselseitigen Verflechtungen mathematisch exakt über ein Gleichungssystem.',
        isCorrect: false,
        explanation: 'Falsch! Das mathematische Gleichungsverfahren leistet dies, nicht das Stufenleiterverfahren.',
      },
    ],
    hints: [
      'Stufenleiter = Einbahnstraße! Wer oben steht, liefert nach unten, nimmt aber nichts mehr auf.',
    ],
    jluNotes: 'Verfahren der IBLV: Anbauverfahren (nur an HKS), Stufenleiterverfahren (einseitig), Gleichungsverfahren (voll wechselseitig).',
    tags: ['IBLV', 'Stufenleiterverfahren', 'Kantine', 'LE 5'],
  },
  {
    id: 'klr-le6-1',
    number: 'LE 6.1',
    title: 'Betriebsabrechnungsbogen (BAB) & Gemeinkostenzuschläge',
    category: 'kostenrechnung',
    unit: 'LE 6: BAB',
    professor: 'Prof. Dr. Arnt Wöhrmann',
    points: 15,
    scenario:
      'In der Manufaktur der Eis.com fallen folgende Werte an:\n- Fertigungsmaterial (FM Einzelkosten): 200.000 €\n- Materialgemeinkosten (MGK): 25.000 €\n- Fertigungslöhne (FL Einzelkosten): 150.000 €\n- Fertigungsgemeinkosten (FGK): 217.500 €\n- Verwaltungsgemeinkosten: 48.585 €\n- Herstellkosten der Erzeugung: 592.500 €',
    question:
      'Berechnen Sie den Materialgemeinkostenzuschlagssatz (MGKZ) und den Fertigungsgemeinkostenzuschlagssatz (FGKZ)!',
    type: 'calculation',
    calculationFields: [
      {
        id: 'mgkz',
        label: 'MGKZ (%)',
        unit: '%',
        correctValue: 12.5,
        tolerance: 0.1,
        explanation: 'MGKZ = MGK / FM = 25.000 / 200.000 = 12,50%',
      },
      {
        id: 'fgkz',
        label: 'FGKZ (%)',
        unit: '%',
        correctValue: 145.0,
        tolerance: 0.1,
        explanation: 'FGKZ = FGK / FL = 217.500 / 150.000 = 145,00%',
      },
    ],
    hints: [
      'Zuschlagssatz = Gemeinkosten / Zuschlagsbasis * 100%.',
      'Basis für MGK ist immer FM; Basis für FGK sind die Fertigungslöhne FL.',
    ],
    jluNotes: 'BAB dient der Kostenstellenrechnung und der Ermittlung der Kalkulationszuschlagssätze.',
    tags: ['BAB', 'MGKZ', 'FGKZ', 'Zuschlagskalkulation', 'LE 6'],
  },
  {
    id: 'klr-le9-1',
    number: 'LE 9.1',
    title: 'Flexible Plankostenrechnung „Hummus“: Abweichungsanalyse',
    category: 'kostenrechnung',
    unit: 'LE 9: Plankostenrechnung',
    professor: 'Prof. Dr. Arnt Wöhrmann',
    points: 15,
    scenario:
      'Die Kostenstelle „Fertigung Hummus“ plant bei einer Planbeschäftigung von 10.000 kg mit Fixkosten $K_f = 40.000 €$ und variablen Plankosten von $k_v = 6 €/kg$ (Plankosten gesamt = 100.000 €).\nTatsächlich wurden nur 8.000 kg Hummus produziert (Ist-Beschäftigung). Die angefallenen Ist-Kosten betrugen 92.000 €.',
    question:
      'Berechnen Sie die Sollkosten $K_s$, die verrechneten Plankosten $K_{verr}$ und die Beschäftigungsabweichung (BA)!',
    type: 'calculation',
    calculationFields: [
      {
        id: 'sollkosten',
        label: 'Sollkosten Ks (€)',
        correctValue: 88000,
        tolerance: 0,
        explanation: 'Ks = Kf + kv * x_ist = 40.000 + 6 * 8.000 = 88.000 €',
      },
      {
        id: 'verr_plan',
        label: 'Verrechnete Plankosten Kverr (€)',
        correctValue: 80000,
        tolerance: 0,
        explanation: 'Plankostensatz kp = 100.000 / 10.000 = 10 €/kg. Kverr = 10 * 8.000 = 80.000 €',
      },
      {
        id: 'besch_abw',
        label: 'Beschäftigungsabweichung BA (€)',
        correctValue: 8000,
        tolerance: 0,
        explanation: 'BA = Ks - Kverr = 88.000 - 80.000 = +8.000 € (Kosten der Unterbeschäftigung)',
      },
    ],
    hints: [
      'Sollkostenkurve: Ks = Fixe Plankosten + (variable Plankosten je Einheit * Istmenge).',
      'Beschäftigungsabweichung = Ks - Kverr. Verbrauchsabweichung = Kist - Ks.',
    ],
    jluNotes: 'Wöhrmann Plankostenrechnung: BA misst die Fixkostenüber- bzw. -unterdeckung!',
    tags: ['Plankostenrechnung', 'Sollkosten', 'Beschäftigungsabweichung', 'LE 9'],
  },
  {
    id: 'klr-le11-1',
    number: 'LE 11.1',
    title: 'Break-Even-Analyse: Guido verkauft A&F1 Vorlesungsnotizen',
    category: 'kostenrechnung',
    unit: 'LE 11: Break-Even-Analyse',
    professor: 'Prof. Dr. Arnt Wöhrmann',
    points: 10,
    scenario:
      'Guido lässt seine Accounting-Notizen drucken (50 Seiten). Druckerei berechnet 0,10 € je Seite plus 1,00 € Bindung (variable Kosten pro Skript = 6,00 €). Die Einrichtung der Druckmaschine kostet einmalig 200,00 € Fixkosten. Guido verkauft jedes Skript für 10,00 €.',
    question:
      'Wie viele Skripte muss Guido mindestens verkaufen, um die Gewinnschwelle (Break-Even-Point) zu erreichen?',
    type: 'calculation',
    calculationFields: [
      {
        id: 'db_stueck',
        label: 'Deckungsbeitrag je Skript (€)',
        correctValue: 4.0,
        tolerance: 0,
        explanation: 'db = Preis - kv = 10,00 € - (50 * 0,10 + 1,00) = 10,00 - 6,00 = 4,00 €',
      },
      {
        id: 'bep_menge',
        label: 'Break-Even-Menge (Stück)',
        correctValue: 50,
        tolerance: 0,
        explanation: 'x_BEP = Kf / db = 200 € / 4,00 € = 50 Stück.',
      },
    ],
    hints: [
      'Variable Kosten = (50 Seiten * 0,10 €) + 1 € Bindung = 6,00 €.',
      'db = 10 € - 6 € = 4 €. Fixkosten = 200 €.',
    ],
    jluNotes: 'Originalaufgabe 13 aus der JLU Probeklausur WS 2024/25!',
    tags: ['Break-Even', 'Deckungsbeitrag', 'Guido', 'LE 11', 'Probeklausur'],
  },
  {
    id: 'klr-le12-1',
    number: 'LE 12.1',
    title: 'Engpassplanung „Brennerstuhl AG“: Relativer Deckungsbeitrag',
    category: 'kostenrechnung',
    unit: 'LE 12: Produktionsprogrammplanung',
    professor: 'Prof. Dr. Arnt Wöhrmann',
    points: 10,
    scenario:
      'Die Brennerstuhl AG hat einen Maschinenengpass. Produkt Alpha bringt einen Stück-DB von 30 € und benötigt 3 Maschinenminuten. Produkt Beta bringt einen Stück-DB von 40 € und benötigt 5 Maschinenminuten.',
    question:
      'Welches Produkt sollte bei bestehendem Engpass prioritär produziert werden?',
    type: 'multiple_choice',
    mcOptions: [
      {
        id: 'opt1',
        text: 'Produkt Alpha, weil sein relativer Deckungsbeitrag mit 10 €/Minute (30 € / 3 Min) höher ist als der von Beta mit 8 €/Minute (40 € / 5 Min).',
        isCorrect: true,
        explanation: 'Hervorragend! Bei einem Engpass entscheidet NIE der absolute Stück-DB, sondern stets der relative Deckungsbeitrag je Engpasseinheit!',
      },
      {
        id: 'opt2',
        text: 'Produkt Beta, weil 40 € Stück-DB mehr Gewinn pro verkauftem Stück einbringt.',
        isCorrect: false,
        explanation: 'Klassischer Anfängerfehler! Beta blockiert die Engpassmaschine unverhältnismäßig lange (5 Minuten).',
      },
    ],
    hints: [
      'Relativer DB = Absoluter DB / Engpassbeanspruchung.',
      'Rechne für jedes Produkt: € pro Minute Engpasszeit.',
    ],
    jluNotes: 'Prof. Wöhrmann: Rangfolgebildung nach dem relativen Deckungsbeitrag.',
    tags: ['Engpass', 'Relativer DB', 'Brennerstuhl AG', 'LE 12'],
  },
];
