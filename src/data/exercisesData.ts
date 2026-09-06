import { Exercise, LessonUnit } from '../types';

export const LESSON_UNITS: LessonUnit[] = [
  {
    id: 'folge-1',
    number: 1,
    title: 'Folge 1: Die Gründung',
    subtitle: 'Inventar, Bilanz & der Flohmarktbesuch (Aktivtausch)',
    iconName: 'BookOpen',
    color: '#165A97',
    isUnlocked: true,
    isCompleted: false,
    totalExercises: 5,
    completedExercises: 0,
    exerciseIds: ['f1-ex1', 'f1-ex2', 'f1-ex3', 'f1-ex4', 'f1-ex5']
  },
  {
    id: 'folge-2',
    number: 2,
    title: 'Folge 2: Der Wareneinkauf',
    subtitle: 'Küchenmaschine, 19% / 7% Vorsteuer & Anzahlungen',
    iconName: 'ShoppingBag',
    color: '#0B3259',
    isUnlocked: true,
    isCompleted: false,
    totalExercises: 5,
    completedExercises: 0,
    exerciseIds: ['f2-ex1', 'f2-ex2', 'f2-ex3', 'f2-ex4', 'f2-ex5']
  },
  {
    id: 'folge-3',
    number: 3,
    title: 'Folge 3: Die Eisherstellung',
    subtitle: 'GuV, Unterkonto des Eigenkapitals & Bestandsveränderung',
    iconName: 'Sparkles',
    color: '#D97706',
    isUnlocked: true,
    isCompleted: false,
    totalExercises: 5,
    completedExercises: 0,
    exerciseIds: ['f3-ex1', 'f3-ex2', 'f3-ex3', 'f3-ex4', 'f3-ex5']
  },
  {
    id: 'rabia-studio',
    number: 4,
    title: 'Rabias Schwachstellen-Studio',
    subtitle: 'Gezieltes Training der 17 Punkte aus ihren Notizen',
    iconName: 'Trophy',
    color: '#15803D',
    isUnlocked: true,
    isCompleted: false,
    totalExercises: 4,
    completedExercises: 0,
    exerciseIds: ['rab-ex1', 'rab-ex2', 'rab-ex3', 'rab-ex4']
  }
];

export const EXERCISES: Record<string, Exercise> = {
  // -------------------------------------------------------------
  // FOLGE 1 EXERCISES
  // -------------------------------------------------------------
  'f1-ex1': {
    id: 'f1-ex1',
    lessonId: 'folge-1',
    lessonTitle: 'Folge 1 – Aufgabe 1.1 & 1.3',
    unitTitle: 'Funktionen des Rechnungswesens',
    type: 'true_false_choice',
    storyPrompt: 'Prof. Dr. Corinna Ewelt-Knauer fragt in der Vorlesung nach den Aufgaben der Rechnungslegung.',
    question: 'Welche Aussage über das EXTERNE Rechnungswesen ist laut HGB und JLU-Vorlesung KORREKT?',
    contextBadges: ['JLU Grundlagen', 'HGB', 'Vorlesung Prolog/Folge 1'],
    options: [
      {
        id: 'opt1',
        text: 'Das externe RW steuert vor allem die Wirtschaftlichkeit der betrieblichen Leistungserstellung.',
        isCorrect: false,
        explanation: 'Falsch! Die Wirtschaftlichkeit der Produktion wird vom INTERNEN Rechnungswesen (Kostenrechnung) gesteuert.'
      },
      {
        id: 'opt2',
        text: 'Das externe RW erfüllt primär die Dokumentations-, Rechenschafts- und Gläubigerschutzfunktion für Außenstehende.',
        isCorrect: true,
        explanation: 'Richtig! Das externe Rechnungswesen informiert Gläubiger, Finanzamt und Banken und unterliegt strengen gesetzlichen Vorschriften.'
      },
      {
        id: 'opt3',
        text: 'Die Bilanz vermittelt vor allem Informationen über die Ertragslage eines Unternehmens.',
        isCorrect: false,
        explanation: 'Falsch! Die Bilanz zeigt die Vermögens- und Finanzlage. Die Ertragslage zeigt die GuV!'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Externes RW = Rechenschaft und Gläubigerschutz nach Gesetz für Dritte. Internes RW = Wirtschaftlichkeit und Steuerung für das Management.',
      accountLogic: [
        'Adressaten externes RW: Finanzamt, Banken, Gerichte, Kunden, Lieferanten.',
        'Adressaten internes RW: Geschäftsführung, Kostenstellenleiter.',
        'Ertragslage gehört zur GuV, Vermögenslage zur Bilanz.'
      ],
      calculation: 'Keine rechnerische Komponente – reine Begriffszuordnung nach HGB § 238 ff.',
      examTip: 'Häufigste JLU-Falle: "Wirtschaftlichkeit" im externen RW anzukreuzen. Wirtschaftlichkeit gehört IMMER zu Prof. Wöhrmann (Kostenrechnung)!'
    }
  },

  'f1-ex2': {
    id: 'f1-ex2',
    lessonId: 'folge-1',
    lessonTitle: 'Folge 1 – Aufgabe 1.4',
    unitTitle: 'Der Flohmarktbesuch (Aktivtausch)',
    type: 'chips_booking',
    storyPrompt: 'Bibi kauft Secondhand-Möbel für 750 € auf dem Flohmarkt bar aus der Kasse für ihre Eisdiele.',
    question: 'Baue den korrekten Buchungssatz für den Barkauf der Möbel zusammen:',
    contextBadges: ['Fallstudie Bibi', 'Aktivkonto', 'Bestandskonto'],
    availableChips: ['BGA', 'Kasse', '750,00 €', 'an', 'Bank', 'Verbindlichkeiten', 'Eigenkapital'],
    targetChipsOrder: ['BGA', '750,00 €', 'an', 'Kasse', '750,00 €'],
    tKontenVisual: [
      {
        accountName: 'BGA (Betriebsausstattung)',
        isAktiv: true,
        sollEntries: [{ text: 'Zugang Möbel', amount: 750 }],
        habenEntries: []
      },
      {
        accountName: 'Kasse (Bargeld)',
        isAktiv: true,
        sollEntries: [],
        habenEntries: [{ text: 'Möbelkauf', amount: 750 }]
      }
    ],
    didacticExplanation: {
      coreIdea: 'Möbel vermehren die Betriebsausstattung (BGA im Soll). Das Bargeld verringert sich (Kasse im Haben). Ein reiner Aktivtausch!',
      accountLogic: [
        'BGA ist ein aktives Bestandskonto: Mehr Möbel = Zunahme im SOLL.',
        'Kasse ist ein aktives Bestandskonto: Weniger Bargeld = Abnahme im HABEN.',
        'Da beide Konten auf der Aktivseite liegen, bleibt die Bilanzsumme unverändert.'
      ],
      calculation: 'BGA (+750 €) - Kasse (-750 €) = 0 € Veränderung der Bilanzsumme.',
      examTip: 'Merke: Aktivkonten nehmen IMMER im Soll zu und im Haben ab!'
    }
  },

  'f1-ex3': {
    id: 'f1-ex3',
    lessonId: 'folge-1',
    lessonTitle: 'Folge 1 – Aufgabe 1.4 b)',
    unitTitle: 'Bilanzwirkung beim Flohmarktbesuch',
    type: 'balance_effect',
    storyPrompt: 'Bibi hat 750 € von der Kasse in Möbel (BGA) umgewandelt.',
    question: 'Welche Auswirkung hat dieser Geschäftsvorfall auf die Bilanz?',
    contextBadges: ['Bilanztheorie', 'Vermögensstruktur'],
    options: [
      {
        id: 'opt1',
        text: 'Aktivtausch: Die Bilanzsumme bleibt gleich, nur die Vermögensstruktur ändert sich.',
        isCorrect: true,
        explanation: 'Genau richtig! Geldvermögen wird zu Sachanlagevermögen. Beides liegt auf der Aktivseite.'
      },
      {
        id: 'opt2',
        text: 'Bilanzverlängerung: Beide Seiten der Bilanz steigen um 750 €.',
        isCorrect: false,
        explanation: 'Nein, es floss kein Geld von außen rein und es entstanden keine Schulden.'
      },
      {
        id: 'opt3',
        text: 'Passivtausch: Das Eigenkapital wandelt sich in Fremdkapital.',
        isCorrect: false,
        explanation: 'Falsch, die Passivseite wurde überhaupt nicht berührt.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Beim Aktivtausch tauscht man lediglich einen Aktivposten gegen einen anderen. Die Gesamtbilanzsumme bleibt exakt identisch.',
      accountLogic: ['Aktivseite: +750 € (BGA) und -750 € (Kasse) = 0 €', 'Passivseite: Unverändert'],
      calculation: 'Bilanzsumme vorher = Bilanzsumme nachher',
      examTip: 'Rabias Notiz-Check: Die Vermögensstruktur ändert sich (mehr BGA, weniger Kasse), aber die Bilanzsumme bleibt gleich!'
    }
  },

  'f1-ex4': {
    id: 'f1-ex4',
    lessonId: 'folge-1',
    lessonTitle: 'Folge 1 – Aufgabe 1.5',
    unitTitle: 'Die Aufnahme des Bankkredits',
    type: 'chips_booking',
    storyPrompt: 'Bibi nimmt zur Gründung ihrer Eisdiele einen Kredit über 30.000 € auf. Das Geld wird auf ihrem Bankkonto gutgeschrieben.',
    question: 'Wie lautet der Buchungssatz für die Kreditaufnahme?',
    contextBadges: ['Aktiv-Passiv-Mehrung', 'Bilanzverlängerung'],
    availableChips: ['Bank', '30.000,00 €', 'an', 'Bankkredit', '30.000,00 €', 'Eigenkapital', 'Zinsaufwand'],
    targetChipsOrder: ['Bank', '30.000,00 €', 'an', 'Bankkredit', '30.000,00 €'],
    didacticExplanation: {
      coreIdea: 'Bankguthaben steigt (Aktivkonto im Soll), gleichzeitig steigen die Bankschulden (Passivkonto im Haben). Bilanzverlängerung um 30.000 €!',
      accountLogic: [
        'Bank = Aktivkonto, nimmt im SOLL zu (+30.000 €).',
        'Bankkredit = Passivkonto (Verbindlichkeit), nimmt im HABEN zu (+30.000 €).',
        'Beide Seiten steigen -> Bilanzverlängerung (Aktiv-Passiv-Mehrung).'
      ],
      calculation: 'Aktiva (+30.000 €) = Passiva (+30.000 €)',
      examTip: 'Achtung: Bei Kreditaufnahme fällt NIE Vorsteuer/Umsatzsteuer an! Geld ist keine steuerbare Ware.'
    }
  },

  'f1-ex5': {
    id: 'f1-ex5',
    lessonId: 'folge-1',
    lessonTitle: 'Folge 1 – Aufgabe 1.6 & 1.7',
    unitTitle: 'Kredittilgung vs. Zinsen & Inventar',
    type: 'true_false_choice',
    storyPrompt: 'Im Journal steht der Buchungssatz: Bankkredit 4.000,00 € an Bank 4.000,00 €.',
    question: 'Welcher ökonomische Sachverhalt liegt diesem Buchungssatz zu Grunde?',
    contextBadges: ['Kredittilgung', 'Bilanzverkürzung'],
    options: [
      {
        id: 'opt1',
        text: 'Bibi zahlt die jährlichen Kreditzinsen in Höhe von 4.000 € an die Bank.',
        isCorrect: false,
        explanation: 'Falsch! Zinsen sind Aufwand und würden lauten: Zinsaufwand an Bank.'
      },
      {
        id: 'opt2',
        text: 'Bibi tilgt 4.000 € ihrer Kreditschulden per Banküberweisung (Bilanzverkürzung).',
        isCorrect: true,
        explanation: 'Richtig! Bankkredit (Passivkonto) sinkt im Soll, Bank (Aktivkonto) sinkt im Haben.'
      },
      {
        id: 'opt3',
        text: 'Bibi nimmt einen neuen Minikredit auf.',
        isCorrect: false,
        explanation: 'Nein, dann stünde Bank im Soll und Bankkredit im Haben.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Eine Tilgung mindert direkt die Verbindlichkeit (Bankkredit im Soll) und das Bankguthaben (Bank im Haben).',
      accountLogic: ['Bankkredit (Passivkonto) nimmt im Soll ab.', 'Bank (Aktivkonto) nimmt im Haben ab.'],
      calculation: 'Bilanzsumme verringert sich um 4.000 €.',
      examTip: 'Klausurfalle: Tilgung = Bilanzverkürzung. Zinsen = Erfolgswirksamer Zinsaufwand!'
    }
  },

  // -------------------------------------------------------------
  // FOLGE 2 EXERCISES (Küchenmaschine, Steuer, Anzahlungen)
  // -------------------------------------------------------------
  'f2-ex1': {
    id: 'f2-ex1',
    lessonId: 'folge-2',
    lessonTitle: 'Folge 2 – Aufgabe 2.2 (Rabias Kern-Frage!)',
    unitTitle: 'Küchenmaschinenkauf für 2.000 € netto',
    type: 'chips_booking',
    storyPrompt: 'Bibi kauft eine Profi-Küchenmaschine für 2.000 € netto (19% MwSt.). 30% zahlt sie sofort per Banküberweisung, die restlichen 70% auf Ziel (Rechnung).',
    question: 'Wie lautet der vollständige Buchungssatz zum Anschaffungszeitpunkt?',
    contextBadges: ['19% Vorsteuer', 'BGA', 'Zahlungsziel', 'Rabia Top-Fokus'],
    availableChips: ['BGA', '2.000,00 €', 'Vorsteuer', '380,00 €', 'an', 'Bank', '714,00 €', 'Verbindlichkeiten LuL', '1.666,00 €', 'Geleistete Anzahlungen'],
    targetChipsOrder: ['BGA', '2.000,00 €', 'Vorsteuer', '380,00 €', 'an', 'Bank', '714,00 €', 'Verbindlichkeiten LuL', '1.666,00 €'],
    didacticExplanation: {
      coreIdea: 'Die Maschine wird sofort geliefert, daher wird BGA voll aktiviert! Keine Anzahlung! Gesamtrechnung brutto = 2.380 €. 30% Bank = 714 €, 70% Ziel = 1.666 €.',
      accountLogic: [
        'BGA (Aktivkonto) nimmt um Netto 2.000 € im Soll zu.',
        'Vorsteuer (Aktivkonto, Forderung ans Finanzamt) nimmt um 380 € (19% von 2.000 €) im Soll zu.',
        'Bank (Aktivkonto) nimmt um 714 € (30% von 2.380 €) im Haben ab.',
        'Verbindlichkeiten LuL (Passivkonto) nehmen um 1.666 € (70% von 2.380 €) im Haben zu.'
      ],
      calculation: 'Brutto = 2.000 € + 380 € = 2.380 €. Bank = 0,30 * 2.380 € = 714 €. Verb. = 0,70 * 2.380 € = 1.666 €.',
      examTip: 'Warum keine Anzahlung? Anzahlung ist NUR Geld VOR Warenlieferung. Da die Maschine da ist, ist es ein echter Kaufzugang!'
    }
  },

  'f2-ex2': {
    id: 'f2-ex2',
    lessonId: 'folge-2',
    lessonTitle: 'Folge 2 – Aufgabe 2.2 Bilanzsumme',
    unitTitle: 'Warum steigt die Bilanzsumme um genau 1.666 €?',
    type: 'balance_effect',
    storyPrompt: 'Beim Kauf der Küchenmaschine wurden BGA 2.000 € und Vorsteuer 380 € gebucht, per Bank 714 € bezahlt und 1.666 € Verbindlichkeiten eingebucht.',
    question: 'Um wie viel verändert sich die Bilanzsumme durch diesen Kauf?',
    contextBadges: ['Bilanzwirkung', 'Rabia Notiz-Frage'],
    options: [
      {
        id: 'opt1',
        text: 'Die Bilanzsumme steigt um exakt 1.666,00 € (Aktiv-Passiv-Mehrung für den unbezahlten Rest).',
        isCorrect: true,
        explanation: 'Genau! Aktivseite: +2.000 € + 380 € - 714 € = +1.666 €. Passivseite: +1.666 € Verbindlichkeiten!'
      },
      {
        id: 'opt2',
        text: 'Die Bilanzsumme steigt um 2.380,00 €.',
        isCorrect: false,
        explanation: 'Falsch, denn 714 € wurden sofort per Bank bezahlt, was die Aktivseite wieder mindert.'
      },
      {
        id: 'opt3',
        text: 'Die Bilanzsumme bleibt gleich, da es ein reiner Aktivtausch ist.',
        isCorrect: false,
        explanation: 'Falsch, da 70% auf Ziel gekauft wurden, sind Schulden (Passivseite) entstanden.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Der sofort bezahlte Teil (714 €) ist ein Aktivtausch (Maschine gegen Bank). Der unbezahlte Teil (1.666 €) verlängert die Bilanz.',
      accountLogic: ['Aktivseite: +2.380 € Bruttowert - 714 € Bankzahlung = +1.666 €', 'Passivseite: +1.666 € Verbindlichkeiten'],
      calculation: '+1.666 € auf beiden Seiten der Bilanz.',
      examTip: 'Rabias Notiz geklärt: Exakt 1.666 € Bilanzsummen-Erhöhung!'
    }
  },

  'f2-ex3': {
    id: 'f2-ex3',
    lessonId: 'folge-2',
    lessonTitle: 'Folge 2 – Aufgabe 2.3',
    unitTitle: 'Steuerberechnung: Im Preis enthalten vs. Netto',
    type: 'calculation_step',
    storyPrompt: 'Bibi kauft Nüsse für netto 150 € mit 7% Vorsteuer per Sofortüberweisung.',
    question: 'Wie hoch ist die Vorsteuer und der an den Händler zu überweisende Bruttobetrag?',
    contextBadges: ['7% USt', 'Lebensmittel', 'Rabia Notiz'],
    options: [
      {
        id: 'opt1',
        text: 'Vorsteuer: 10,50 € | Bruttoüberweisung: 160,50 €',
        isCorrect: true,
        explanation: 'Exakt! 150 € * 0,07 = 10,50 € Vorsteuer. Brutto = 150 € + 10,50 € = 160,50 €.'
      },
      {
        id: 'opt2',
        text: 'Vorsteuer: 28,50 € | Bruttoüberweisung: 178,50 €',
        isCorrect: false,
        explanation: 'Falsch! Nüsse sind Lebensmittel und haben den ermäßigten Steuersatz von 7%, nicht 19%!'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Netto 150 € + 7% Vorsteuer (10,50 €) = Brutto 160,50 €.',
      accountLogic: [
        'Rohstoffe/Vorräte = Netto 150 € im Soll',
        'Vorsteuer = 10,50 € im Soll',
        'Bank = 160,50 € im Haben'
      ],
      calculation: '150 * 1,07 = 160,50 €',
      examTip: 'Unbedingt in der Klausur auf 19% (Maschinen, Büro) vs. 7% (Obst, Milch, Nüsse) achten!'
    }
  },

  'f2-ex4': {
    id: 'f2-ex4',
    lessonId: 'folge-2',
    lessonTitle: 'Folge 2 – Aufgabe 2.4',
    unitTitle: 'Erdbeerkauf mit echter Anzahlung',
    type: 'true_false_choice',
    storyPrompt: 'Bibi bestellt 40 kg Bio-Erdbeeren für 400 € netto (7% USt) und leistet 50% Anzahlung per Bank vor der Lieferung.',
    question: 'Welcher Buchungssatz erfasst die geleistete Anzahlung korrekt?',
    contextBadges: ['Geleistete Anzahlungen', 'Vorsteuer auf Anzahlung'],
    options: [
      {
        id: 'opt1',
        text: 'Geleistete Anzahlungen 200,00 € und Vorsteuer 14,00 € an Bank 214,00 €',
        isCorrect: true,
        explanation: 'Absolut korrekt! Auch auf Anzahlungen muss nach dt. Recht sofort die anteilige Vorsteuer (7% von 200 € = 14 €) gebucht werden.'
      },
      {
        id: 'opt2',
        text: 'Vorräte 200,00 € an Bank 200,00 €',
        isCorrect: false,
        explanation: 'Falsch! Die Erdbeeren sind noch gar nicht da, daher darf das Konto Vorräte noch nicht berührt werden!'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Solange die Ware nicht geliefert ist, wird nicht auf "Vorräte", sondern auf "Geleistete Anzahlungen" gebucht. Die Vorsteuer wird sofort fällig.',
      accountLogic: [
        'Geleistete Anzahlungen (Aktivkonto) nimmt um 200 € im Soll zu.',
        'Vorsteuer nimmt um 14 € im Soll zu.',
        'Bank sinkt um Brutto 214 € im Haben.'
      ],
      calculation: '50% von 400 € netto = 200 € Anzahlung. 7% Vorsteuer = 14 €. Brutto = 214 €.',
      examTip: 'Erst wenn die Erdbeeren geliefert werden, wird die Anzahlung mit den Verbindlichkeiten verrechnet!'
    }
  },

  'f2-ex5': {
    id: 'f2-ex5',
    lessonId: 'folge-2',
    lessonTitle: 'Folge 2 – Aufgabe 2.6',
    unitTitle: 'Bilanzveränderungs-Mastery',
    type: 'balance_effect',
    storyPrompt: 'Bibi überweist 500 € von ihrem Bankkonto an einen Rohstofflieferanten, um eine offene Rechnung (Verbindlichkeit) zu begleichen.',
    question: 'Um welche Art von Bilanzänderung handelt es sich?',
    contextBadges: ['Rechnungsbegleichung', 'Bilanzverkürzung'],
    options: [
      {
        id: 'opt1',
        text: 'Bilanzverkürzung (Aktiv-Passiv-Minderung): Bank sinkt, Verbindlichkeiten sinken.',
        isCorrect: true,
        explanation: 'Perfekt! Auf der Aktivseite sinkt Bank um 500 €, auf der Passivseite sinken Verbindlichkeiten um 500 €.'
      },
      {
        id: 'opt2',
        text: 'Aktivtausch: Bank wird gegen Vorräte getauscht.',
        isCorrect: false,
        explanation: 'Falsch! Die Vorräte wurden schon früher eingebucht, hier wird nur die Schuld beglichen.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Schulden begleichen mit Bankguthaben verkürzt die Bilanz auf beiden Seiten um 500 €.',
      accountLogic: ['Verbindlichkeiten LuL (Passivkonto) im Soll (-500 €)', 'Bank (Aktivkonto) im Haben (-500 €)'],
      calculation: 'Bilanzsumme sinkt um 500 €.',
      examTip: 'Klausurregel: Zahlst du eine Schuld per Bank, wird die Bilanz kürzer!'
    }
  },

  // -------------------------------------------------------------
  // FOLGE 3 EXERCISES (GuV, Unterkonto EK, Eisherstellung)
  // -------------------------------------------------------------
  'f3-ex1': {
    id: 'f3-ex1',
    lessonId: 'folge-3',
    lessonTitle: 'Folge 3 – Aufgabe 3.1 & 3.2',
    unitTitle: 'Die GuV als Unterkonto des Eigenkapitals',
    type: 'true_false_choice',
    storyPrompt: 'Wie hängen die Gewinn- und Verlustrechnung (GuV) und die Bilanz systematisch zusammen?',
    question: 'Welche Aussage über den Zusammenhang von GuV und Bilanz ist KORREKT?',
    contextBadges: ['GuV', 'Eigenkapital', 'Rabia Notiz-Fokus'],
    options: [
      {
        id: 'opt1',
        text: 'Die GuV ist ein Unterkonto des Eigenkapitals; ein Jahresüberschuss mehrt das Eigenkapital im Haben.',
        isCorrect: true,
        explanation: 'Vollkommen richtig! Der Saldo der GuV fließt am Jahresende direkt ins Eigenkapital (Passivseite).'
      },
      {
        id: 'opt2',
        text: 'Die GuV besteht aus aktiven und passiven Bestandskonten.',
        isCorrect: false,
        explanation: 'Falsch! Die GuV besteht ausschließlich aus Erfolgskonten (Aufwendungen und Erträge).'
      },
      {
        id: 'opt3',
        text: 'Ein Verlust (Jahresfehlbetrag) erhöht das Eigenkapital.',
        isCorrect: false,
        explanation: 'Falsch! Ein Verlust mindert das Eigenkapital im Soll.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Das Eigenkapitalkonto ist ein Passivkonto. Erträge mehren das EK (Haben), Aufwendungen mindern das EK (Soll). Der Saldo ist das GuV-Ergebnis!',
      accountLogic: [
        'Aufwandskonten schließen im Haben an GuV im Soll ab.',
        'Ertragskonten schließen im Soll an GuV im Haben ab.',
        'GuV-Saldo fließt ins Passivkonto Eigenkapital.'
      ],
      calculation: 'Gewinn = Erträge - Aufwendungen -> EK steigt.',
      examTip: 'Rabias Notiz geklärt: Die GuV füttert das Eigenkapital auf der Passivseite der Bilanz!'
    }
  },

  'f3-ex2': {
    id: 'f3-ex2',
    lessonId: 'folge-3',
    lessonTitle: 'Folge 3 – Aufgabe 3.3',
    unitTitle: 'Soll oder Haben bei Erfolgskonten?',
    type: 'true_false_choice',
    storyPrompt: 'Rabia fragt in ihren Notizen: Auf welcher Seite bucht man Aufwand und auf welcher Ertrag?',
    question: 'Auf welchen Seiten werden Aufwendungen und Erträge gebucht?',
    contextBadges: ['Erfolgskonten', 'Soll/Haben Logik'],
    options: [
      {
        id: 'opt1',
        text: 'Aufwendungen werden immer im SOLL gebucht, Erträge immer im HABEN.',
        isCorrect: true,
        explanation: 'Richtig! Weil Aufwand das Eigenkapital mindert (Soll) und Ertrag das Eigenkapital mehrt (Haben).'
      },
      {
        id: 'opt2',
        text: 'Aufwendungen im Haben, Erträge im Soll.',
        isCorrect: false,
        explanation: 'Falsch herum! Das ist die häufigste Verwechslung.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Aufwand mindert EK -> SOLL. Ertrag vermehrt EK -> HABEN.',
      accountLogic: ['Aufwand = Soll', 'Ertrag = Haben'],
      calculation: 'Saldo = Haben (Erträge) minus Soll (Aufwendungen)',
      examTip: 'Eselsbrücke: "A"ufwand steht links im "S"oll (Alphabet: A-S), "E"rtrag steht rechts im "H"aben.'
    }
  },

  'f3-ex3': {
    id: 'f3-ex3',
    lessonId: 'folge-3',
    lessonTitle: 'Folge 3 – Aufgabe 3.5 (Rabias Sorbet-Frage!)',
    unitTitle: 'Eisherstellung: Lagerentnahme & Bestandsmehrung',
    type: 'chips_booking',
    storyPrompt: 'Bibi entnimmt Früchte im Wert von 340 € aus dem Lager und friert daraus leckeres Fruchtsorbet.',
    question: 'Wie lautet Buchungssatz 1 für den Verbrauch der Bio-Früchte aus dem Lager?',
    contextBadges: ['Lagerentnahme', 'RHB', 'Erfolgsneutral'],
    availableChips: ['Aufwand aus Verbrauch', '340,00 €', 'an', 'RHB (Vorräte)', '340,00 €', 'Kasse', 'Fertige Erzeugnisse'],
    targetChipsOrder: ['Aufwand aus Verbrauch', '340,00 €', 'an', 'RHB (Vorräte)', '340,00 €'],
    didacticExplanation: {
      coreIdea: 'Die Früchte werden verbraucht: Aufwand entsteht (Soll) und der Rohstoffbestand sinkt (Haben). Keine Kasse, da kein Bargeld floss!',
      accountLogic: [
        'Aufwand aus Verbrauch = Aufwandskonto, nimmt im SOLL zu (340 €).',
        'RHB = aktives Bestandskonto, nimmt im HABEN ab (340 €).'
      ],
      calculation: '340 € Rohstoffe wandern in die Produktion.',
      examTip: 'Rabias Notiz geklärt: Kasse war in ihren Notizen eingekreist – Kasse ist hier falsch, weil die Früchte bereits im Lager lagen!'
    }
  },

  'f3-ex4': {
    id: 'f3-ex4',
    lessonId: 'folge-3',
    lessonTitle: 'Folge 3 – Aufgabe 3.5 b & c',
    unitTitle: 'Warum ist die Eisherstellung erfolgsneutral?',
    type: 'true_false_choice',
    storyPrompt: 'Das fertige Sorbet wird im zweiten Schritt aktiviert: Fertige Erzeugnisse 340 € an Bestandsmehrung (Ertrag) 340 €.',
    question: 'Warum macht Bibi durch die reine Herstellung des Eis noch KEINEN Gewinn?',
    contextBadges: ['Erfolgsneutral', 'Bestandsmehrung'],
    options: [
      {
        id: 'opt1',
        text: 'Weil sich der Aufwand (340 €) und der Ertrag aus Bestandsmehrung (340 €) in der GuV exakt aufheben (0 € Erfolg).',
        isCorrect: true,
        explanation: 'Genial! Man wird nicht reicher, indem man Früchte zu Eis verarbeitet. Gewinn entsteht erst beim VERKAUF an Gäste!'
      },
      {
        id: 'opt2',
        text: 'Weil Eis schnell schmilzt und daher keinen Wert hat.',
        isCorrect: false,
        explanation: 'Nein, das Sorbet ist ein vollwertiges Fertigerzeugnis im Kühlhaus.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Aufwand aus Verbrauch (-340 €) + Ertrag aus Bestandsmehrung (+340 €) = 0 € GuV-Wirkung. Herstellung ist immer erfolgsneutral.',
      accountLogic: ['Schritt 1: Aufwand 340 €', 'Schritt 2: Ertrag 340 €', 'Summe = 0 €'],
      calculation: '+340 € - 340 € = 0 €',
      examTip: 'Merksatz: Produktion neutralisiert Aufwand über Bestandsmehrung. Echter Erfolg entsteht erst am Point of Sale!'
    }
  },

  'f3-ex5': {
    id: 'f3-ex5',
    lessonId: 'folge-3',
    lessonTitle: 'Folge 3 – Aufgabe 3.7 (Klausurtabelle)',
    unitTitle: 'Blitzeinschlag & Zinsgutschrift',
    type: 'true_false_choice',
    storyPrompt: 'Aufgabe 3.7 b: Aufgrund eines Blitzeinschlages wird eine außerplanmäßige Abschreibung an Bibis Lagergebäude verbucht.',
    question: 'Welche Wirkungen hat dieser Blitzeinschlag auf Zahlung und Erfolg?',
    contextBadges: ['Klausurfalle 3.7', 'Abschreibung', 'Erfolgswirksam'],
    options: [
      {
        id: 'opt1',
        text: 'Nicht zahlungswirksam (kein Geld fließt), aber ERFOLGSWIRKSAM (Aufwand mindert Gewinn) -> Bilanzverkürzung!',
        isCorrect: true,
        explanation: 'Richtig! Es fließt kein Geld aus der Kasse, aber das Gebäude verliert Wert -> Aufwand mindert Eigenkapital.'
      },
      {
        id: 'opt2',
        text: 'Zahlungswirksam und erfolgsneutral.',
        isCorrect: false,
        explanation: 'Falsch! Der Blitz zahlt kein Geld und nimmt kein Bargeld mit.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Abschreibungen kosten kein Bargeld im Moment des Schadens, sind aber sofort erfolgswirksamer Aufwand!',
      accountLogic: [
        'Außerplanmäßiger Abschreibungsaufwand (Soll)',
        'an Gebäude (Haben)',
        'Eigenkapital sinkt, Anlagevermögen sinkt -> Bilanzverkürzung.'
      ],
      calculation: 'Verlust = Schadensbetrag.',
      examTip: 'Rabias Notiz geklärt: C (Zinsgutschrift) ist zahlungswirksam + erfolgswirksam. B (Blitzeinschlag) ist nicht zahlungswirksam, aber voll erfolgswirksam!'
    }
  },

  // -------------------------------------------------------------
  // RABIA SPECIAL WORKOUT (Directly addressing image 9)
  // -------------------------------------------------------------
  'rab-ex1': {
    id: 'rab-ex1',
    lessonId: 'rabia-studio',
    lessonTitle: 'Rabia Problem 1: Externes RW',
    unitTitle: 'Gläubigerschutz vs. Wirtschaftlichkeit',
    type: 'true_false_choice',
    storyPrompt: 'Aus Rabias Notizblatt Punkt 1: "externes RW wird Wirtschaftlichkeit geprüft -> falsch!"',
    question: 'Wer prüft die Wirtschaftlichkeit und wer benötigt das externe Rechnungswesen?',
    contextBadges: ['Rabias Notiz 1', 'Top-Priorität'],
    options: [
      {
        id: 'opt1',
        text: 'Wirtschaftlichkeit = Internes RW (Controlling). Externes RW = Dokumentation, Gläubigerschutz & Rechenschaft (HGB).',
        isCorrect: true,
        explanation: 'Exakt das, worüber Rabia gestolpert war! Jetzt sitzt es felsenfest.'
      },
      {
        id: 'opt2',
        text: 'Das Finanzamt prüft die Wirtschaftlichkeit.',
        isCorrect: false,
        explanation: 'Dem Finanzamt ist die Wirtschaftlichkeit egal, solange der steuerliche Gewinn korrekt ermittelt wird.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Wirtschaftlichkeit ist intern. Gesetzliche Rechenschaft ist extern.',
      accountLogic: ['Intern = Plan/Ist-Vergleich', 'Extern = HGB Jahresabschluss'],
      calculation: 'Keine Rechnung.',
      examTip: 'In Multiple-Choice-Fragen bei Prof. Ewelt-Knauer sofort prüfen: Steht da "Wirtschaftlichkeit"? Dann ist die Option fürs externe RW falsch!'
    }
  },

  'rab-ex2': {
    id: 'rab-ex2',
    lessonId: 'rabia-studio',
    lessonTitle: 'Rabia Problem 2: Küchenmaschine & Anzahlung',
    unitTitle: 'Warum 30% Sofortzahlung keine Anzahlung ist',
    type: 'true_false_choice',
    storyPrompt: 'Aus Rabias Notizblatt Punkt 7: "warum ist das keine geleistete Anzahlung bei der Küchenmaschine?"',
    question: 'Warum durfte Bibi beim Kauf der 2.000 € Küchenmaschine NICHT das Konto "Geleistete Anzahlungen" verwenden?',
    contextBadges: ['Rabias Notiz 7', 'Wareneingang'],
    options: [
      {
        id: 'opt1',
        text: 'Weil die Maschine zum Zeitpunkt der Buchung bereits physisch geliefert wurde und als Sachanlagevermögen (BGA) zur Verfügung steht.',
        isCorrect: true,
        explanation: 'Bingo! Anzahlungen existieren nur, wenn Geld VOR Warenlieferung bezahlt wird.'
      },
      {
        id: 'opt2',
        text: 'Weil man Anzahlungen nur bei Lebensmitteln bucht.',
        isCorrect: false,
        explanation: 'Falsch, Anzahlungen gibt es für jedes Gut, aber eben nur vor Lieferung.'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Ware da = Sachanlagevermögen (BGA). Ware noch nicht da = Geleistete Anzahlung.',
      accountLogic: ['Maschine geliefert -> BGA 2.000 € im Soll', 'Teilzahlung per Bank -> Bank 714 € im Haben', 'Restschuld -> Verb. LuL 1.666 € im Haben'],
      calculation: 'Sofortige Aktivierung der Maschine.',
      examTip: 'Sobald im Aufgabentext steht "Bibi kauft und erhält die Maschine...", ist das Konto Geleistete Anzahlungen tabu!'
    }
  },

  'rab-ex3': {
    id: 'rab-ex3',
    lessonId: 'rabia-studio',
    lessonTitle: 'Rabia Problem 3: Vorsteuer im Preis',
    unitTitle: 'Netto vs. Brutto Formel-Check',
    type: 'calculation_step',
    storyPrompt: 'Aus Rabias Notizblatt Punkt 8: "Steuer falsch berechnet -> Steuer mit im Preis? Warum bei D nicht?"',
    question: 'Ein Lieferant stellt Bibi 1.190 € BRUTTO (inkl. 19% USt) in Rechnung. Wie errechnet man die Vorsteuer korrekt?',
    contextBadges: ['Rabias Notiz 8', 'Steuerformel'],
    options: [
      {
        id: 'opt1',
        text: 'Netto = 1.190 € / 1,19 = 1.000 € | Vorsteuer = 190 € (Forderung ans Finanzamt)',
        isCorrect: true,
        explanation: 'Goldrichtig! Brutto geteilt durch 1,19 ergibt Netto. Die Differenz ist die Steuer!'
      },
      {
        id: 'opt2',
        text: 'Vorsteuer = 1.190 € * 0,19 = 226,10 €',
        isCorrect: false,
        explanation: 'Großer Fehler! 19% dürfen nur von NETTO berechnet werden, niemals von Brutto!'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Wenn Steuer im Preis enthalten ist: Immer geteilt durch 1,19 (oder 1,07 bei Lebensmitteln) rechnen!',
      accountLogic: ['Brutto = Netto * 1,19', 'Netto = Brutto / 1,19', 'Vorsteuer = Brutto - Netto'],
      calculation: '1.190 / 1,19 = 1.000 €. Steuer = 190 €.',
      examTip: 'Niemals 19% von einem Bruttobetrag nehmen!'
    }
  },

  'rab-ex4': {
    id: 'rab-ex4',
    lessonId: 'rabia-studio',
    lessonTitle: 'Rabia Problem 4: GuV & Eigenkapital',
    unitTitle: 'Verlust im Soll, Gewinn im Haben',
    type: 'true_false_choice',
    storyPrompt: 'Aus Rabias Notizblatt Punkt 12 & 13: "GuV besser verstehen, Zusammenhang mit Bilanz"',
    question: 'Wenn Bibis Eisdiele am Jahresende einen Jahresfehlbetrag (Verlust) erzielt, wie wird dieser im Eigenkapitalkonto abgeschlossen?',
    contextBadges: ['Rabias Notiz 12', 'Jahresabschluss'],
    options: [
      {
        id: 'opt1',
        text: 'Der Verlust wird im SOLL des passiven Eigenkapitalkontos verbucht und mindert somit das Eigenkapital.',
        isCorrect: true,
        explanation: 'Perfekt! Da Eigenkapital ein Passivkonto ist, stehen Minderungen im SOLL!'
      },
      {
        id: 'opt2',
        text: 'Der Verlust wird im Haben des Eigenkapitalkontos gebucht.',
        isCorrect: false,
        explanation: 'Falsch! Im Haben des Eigenkapitalkontos steht der Gewinn (Jahresüberschuss).'
      }
    ],
    didacticExplanation: {
      coreIdea: 'Eigenkapital ist Passivkonto: Mehrung im Haben (Gewinn), Minderung im Soll (Verlust).',
      accountLogic: ['Passivkonto Eigenkapital: Soll = Abgang, Haben = Zugang', 'Jahresfehlbetrag = Abgang = Soll'],
      calculation: 'Schlussbestand Eigenkapital = Anfangsbestand + Gewinn - Verlust',
      examTip: 'Rabias Notiz geklärt: Buchungssatz beim Verlust: Eigenkapital an GuV!'
    }
  }
};
