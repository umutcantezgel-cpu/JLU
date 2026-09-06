export interface LernplanUnit {
  id: string;
  dayRange: string; // e.g. "Tag 1–4"
  title: string;
  focus: string;
  professor: 'Prof. Dr. Corinna Ewelt-Knauer' | 'Prof. Dr. Arnt Wöhrmann' | 'Beide';
  allocatedMinutesPerDay: number;
  totalHours: number;
  topics: {
    id: string;
    title: string;
    description: string;
    isKeyTrap?: boolean; // Rabia WhatsApp-Falle
    legalBasis?: string; // z.B. § 247 Abs. 1 HGB
  }[];
  exercises: {
    id: string;
    title: string;
    type: 'rabia_workout' | 'exam_part' | 'path_level';
    targetId: string; // exerciseId, examId, or pathId
    label: string;
  }[];
  milestoneExam: {
    examId: string;
    title: string;
    durationMinutes: number;
    targetScore: number;
    description: string;
  };
}

export interface LernplanPhase {
  phaseNumber: number;
  phaseTitle: string;
  subtitle: string;
  timeHorizon: string;
  badge: string;
  iconName: string;
  description: string;
  targetCompetencies: string[];
  units: LernplanUnit[];
}

export const jluLernplan: LernplanPhase[] = [
  // PHASE 1: RABIAS NOTIZEN & GRUNDLAGEN
  {
    phaseNumber: 1,
    phaseTitle: 'Phase 1: Grundlagen & Rabias WhatsApp-Klausurfallen',
    subtitle: 'Fokus auf Folgen 1–3 & die 17 handschriftlichen Problemstellen von Bibi & Rabia',
    timeHorizon: 'Tag 1 bis 5 (Woche 1)',
    badge: 'Priorität 1: Höchster Hebel!',
    iconName: 'FileText',
    description:
      'In dieser ersten Phase werden alle elementaren Buchführungsregeln und vor allem die 17 spezifischen Fallen aus Rabias Notizen geklärt. Wer hier Sicherheit gewinnt, besteht die HGB-Klausur bei Prof. Ewelt-Knauer problemlos.',
    targetCompetencies: [
      'Sichere Unterscheidung: Externes RW (Dokumentation & Gläubigerschutz § 238 HGB) vs. Internes RW (Wirtschaftlichkeit & Steuerung)',
      'Die 4 Bilanzveränderungen im Schlaf beherrschen (Aktivtausch, Passivtausch, Bilanzverlängerung, Bilanzverkürzung)',
      'Klausurfalle Gezeichnetes Kapital: Niemals Vermögen, sondern rein bilanzielle Passivposition für Haftungskapital!',
      'Vorsteuer vs. Vorsteuerabzug (§ 15 UStG): Zahllast, Vorsteuerforderung an das Finanzamt, Netto- vs. Bruttobuchung',
      'Geleistete Anzahlungen (§ 266 Abs. 2 B.I.4 HGB): Keine Anzahlung bei sofort gelieferter Ware!',
      'Aktive und passive Rechnungsabgrenzung (ARAP vs. PRAP nach § 250 HGB) sauber abgrenzen',
      'Lineare und degressive Abschreibung (10% AfA-Satz) exakt berechnen',
    ],
    units: [
      {
        id: 'unit-1',
        dayRange: 'Tag 1–2',
        title: 'Folge 1: Gründung & Bilanzveränderungen',
        focus: 'Rabia Notizen 1.1 bis 1.7',
        professor: 'Prof. Dr. Corinna Ewelt-Knauer',
        allocatedMinutesPerDay: 60,
        totalHours: 2,
        topics: [
          {
            id: 't-1-1',
            title: 'Externes vs. Internes Rechnungswesen (Notiz 1.1)',
            description: 'Extern = HGB/Steuern, Rechenschaft & Gläubigerschutz. Intern = KLR, Wirtschaftlichkeit, Kalkulation.',
            isKeyTrap: true,
            legalBasis: '§ 238 HGB',
          },
          {
            id: 't-1-2',
            title: 'Gezeichnetes Kapital als Passivposten (Notiz 1.2)',
            description: 'Gezeichnetes Kapital ist Eigenkapital (Passiva, Mittelherkunft) und KEIN flüssiges Geld!',
            isKeyTrap: true,
            legalBasis: '§ 266 Abs. 3 A.I HGB',
          },
          {
            id: 't-1-3',
            title: 'Die 4 Bilanzveränderungen (Notiz 1.3 - 1.6)',
            description: 'Aktivtausch (Flohmarkt-Möbel), Bilanzverlängerung (Kauf auf Ziel), Bilanzverkürzung (Kredittilgung), Passivtausch.',
            isKeyTrap: true,
            legalBasis: '§ 242 HGB',
          },
          {
            id: 't-1-4',
            title: 'Eröffnung- & Schlussbilanzkonto (Notiz 1.7)',
            description: 'EBK ist das Spiegelbild der Bilanz (Aktiva im Haben, Passiva im Soll). SBK schließt seitenrichtig ab.',
            legalBasis: '§ 240, § 242 HGB',
          },
        ],
        exercises: [
          {
            id: 'ex-1',
            title: 'Workout: Rabia 1 bis Rabia 4 (Gründung & Bilanz)',
            type: 'rabia_workout',
            targetId: 'rabia-1',
            label: 'Rabias Workout 1–4',
          },
          {
            id: 'ex-2',
            title: 'Duolingo-Pfad: Level 1 Grundlagen',
            type: 'path_level',
            targetId: 'level-1',
            label: 'Level 1: Grundlagen',
          },
        ],
        milestoneExam: {
          examId: 'klausur-4',
          title: 'Teilprüfung 3: Rabia-Spezial (WhatsApp-Klausurfallen Aufgaben 1–2)',
          durationMinutes: 10,
          targetScore: 10,
          description: 'Teste dein Grundlagenverständnis zu den ersten Notizen.',
        },
      },
      {
        id: 'unit-2',
        dayRange: 'Tag 3–4',
        title: 'Folge 2 & 3: Vorsteuer, Anzahlungen, RAP & AfA',
        focus: 'Rabia Notizen 2.1 bis 3.5',
        professor: 'Prof. Dr. Corinna Ewelt-Knauer',
        allocatedMinutesPerDay: 75,
        totalHours: 2.5,
        topics: [
          {
            id: 't-2-1',
            title: 'Wareneinkauf mit 19% und 7% Vorsteuer (Notiz 2.1)',
            description: 'Vorsteuer ist eine Forderung an das Finanzamt (Aktivkonto). Umsatzsteuer ist eine Verbindlichkeit (Passivkonto).',
            isKeyTrap: true,
            legalBasis: '§ 15 UStG',
          },
          {
            id: 't-2-2',
            title: 'Küchenmaschine 2.000 €: Anzahlung vs. Aktivierung (Notiz 2.2)',
            description: 'Bereits gelieferte Ware wird VOLL als BGA aktiviert! Bilanzsumme steigt um den Zielbetrag von 1.666 €.',
            isKeyTrap: true,
            legalBasis: '§ 253 Abs. 1 HGB',
          },
          {
            id: 't-2-3',
            title: 'Rechnungsabgrenzungsposten ARAP vs. PRAP (Notiz 3.1 & 3.2)',
            description: 'ARAP: Ausgabe JETZT, Aufwand SPÄTER (z.B. Vorauszahlung Miete). PRAP: Einnahme JETZT, Ertrag SPÄTER.',
            isKeyTrap: true,
            legalBasis: '§ 250 HGB',
          },
          {
            id: 't-2-4',
            title: 'Lineare vs. Degressive Abschreibung (Notiz 3.4 & 3.5)',
            description: 'AfA-Satz = 100% / Nutzungsdauer. Bei degressiver AfA sinken die Beträge geometrisch.',
            legalBasis: '§ 253 Abs. 3 HGB, § 7 EStG',
          },
        ],
        exercises: [
          {
            id: 'ex-3',
            title: 'Workout: Rabia 5 bis Rabia 17 durchgehen',
            type: 'rabia_workout',
            targetId: 'rabia-5',
            label: 'Rabias Workout 5–17',
          },
        ],
        milestoneExam: {
          examId: 'klausur-4',
          title: 'Teilprüfung 3: Rabia-Spezial — Die WhatsApp-Klausurfallen (30 Min, 30 P)',
          durationMinutes: 30,
          targetScore: 25,
          description: 'Volle Simulation aller 17 Rabia-Klausurfallen mit verzögerter Auswertung!',
        },
      },
      {
        id: 'unit-3',
        dayRange: 'Tag 5',
        title: 'Phase-1 Konsolidierung & Fehler-Studio',
        focus: 'Review aller falschen Buchungssätze & Notizen-Check',
        professor: 'Prof. Dr. Corinna Ewelt-Knauer',
        allocatedMinutesPerDay: 60,
        totalHours: 1,
        topics: [
          {
            id: 't-3-1',
            title: 'Systematische Fehleranalyse im Fehler-Studio Rabia',
            description: 'Gezieltes Nachbuchen aller 17 Problemfälle bis 100% Trefferquote.',
          },
        ],
        exercises: [
          {
            id: 'ex-4',
            title: 'Fehler-Studio Rabia: Alle Problemfälle wiederholen',
            type: 'rabia_workout',
            targetId: 'rabia-1',
            label: 'Fehler-Studio',
          },
        ],
        milestoneExam: {
          examId: 'klausur-4',
          title: 'Re-Check: Teilprüfung 3 (Ziel: 30 von 30 Punkten)',
          durationMinutes: 30,
          targetScore: 30,
          description: 'Abschluss von Phase 1 mit Bestnote.',
        },
      },
    ],
  },

  // PHASE 2: FORTGESCHRITTENE BUCHFÜHRUNG & BILANZIERUNG
  {
    phaseNumber: 2,
    phaseTitle: 'Phase 2: Finanzbuchführung Vertiefung & HGB-Bilanzierung',
    subtitle: 'Folgen 4–10: GuV, Skonto, Bestandsveränderungen, Rückstellungen & Wertaufholung',
    timeHorizon: 'Tag 6 bis 10 (Woche 2)',
    badge: 'Klausur-Anteil: 40%',
    iconName: 'BookOpen',
    description:
      'Vertiefung in die anspruchsvollen Bilanzierungs- und Buchungsfragen nach HGB: Gesamtkosten- vs. Umsatzkostenverfahren, Bestandsveränderungen, Anschaffungsnebenkosten, Skonto, Rückstellungen nach § 249 HGB und das Wertaufholungsgebot nach § 253 Abs. 5 HGB.',
    targetCompetencies: [
      'GKV vs. UKV nach § 275 HGB sicher abgrenzen und buchen',
      'Bestandsmehrung und Bestandsminderung an unfertigen und fertigen Erzeugnissen erfolgswirksam erfassen',
      'Anschaffungskostenermittlung nach § 255 Abs. 1 HGB (Anschaffungspreis - Rabatte/Skonti + Nebenkosten)',
      'Skontobuchungen beim Einkauf und Verkauf (Korrektur der Vorsteuer bzw. Umsatzsteuer)',
      'Rückstellungen nach § 249 HGB (Ungewisse Verbindlichkeiten vs. Aufwandsrückstellungen)',
      'Außerplanmäßige Abschreibung & Wertaufholungsgebot (§ 253 Abs. 5 HGB Zuschreibungsdeckel auf fortgeführte AK)',
      'Latente Steuern nach § 274 HGB (Passive vs. aktive latente Steuern)',
    ],
    units: [
      {
        id: 'unit-4',
        dayRange: 'Tag 6–7',
        title: 'Folge 4–6: GuV, Bestandsveränderungen & Skonto',
        focus: 'Erfolgswirksame Buchungen & Vorsteuerberichtigung',
        professor: 'Prof. Dr. Corinna Ewelt-Knauer',
        allocatedMinutesPerDay: 75,
        totalHours: 2.5,
        topics: [
          {
            id: 't-4-1',
            title: 'Bestandsveränderungen an FE (Ertrag oder Aufwand)',
            description: 'Bestandsmehrung: FE an Bestandsveränderung (GuV-Ertrag). Erhöht den Periodenerfolg.',
            legalBasis: '§ 275 Abs. 2 Nr. 2 HGB',
          },
          {
            id: 't-4-2',
            title: 'Skonto beim Wareneinkauf & Vorsteuerkorrektur',
            description: 'Verbindlichkeiten an Bank + Nachlässe (Wareneingang) + Vorsteuer (19%).',
            legalBasis: '§ 17 UStG, § 255 Abs. 1 HGB',
          },
        ],
        exercises: [
          {
            id: 'ex-5',
            title: 'Duolingo-Pfad: Level 2 Finanzbuchführung',
            type: 'path_level',
            targetId: 'level-2',
            label: 'Level 2: Finanzbuchführung',
          },
        ],
        milestoneExam: {
          examId: 'klausur-2',
          title: 'Teilprüfung 1: Buchführung & Bilanzierung (Aufgaben 1–3)',
          durationMinutes: 20,
          targetScore: 20,
          description: 'Halbzeittest für Buchführung.',
        },
      },
      {
        id: 'unit-5',
        dayRange: 'Tag 8–10',
        title: 'Folge 7–10: Rückstellungen, Wertaufholung & Latente Steuern',
        focus: '§ 249, § 253 Abs. 5 und § 274 HGB',
        professor: 'Prof. Dr. Corinna Ewelt-Knauer',
        allocatedMinutesPerDay: 90,
        totalHours: 4.5,
        topics: [
          {
            id: 't-5-1',
            title: 'Rückstellungen für ungewisse Verbindlichkeiten (§ 249 Abs. 1 HGB)',
            description: 'Aufwand an Rückstellung. Verpflichtung gegenüber Dritten, dem Grunde oder der Höhe nach unbestimmt.',
            legalBasis: '§ 249 Abs. 1 Satz 1 HGB',
          },
          {
            id: 't-5-2',
            title: 'Wertaufholungsgebot nach § 253 Abs. 5 HGB',
            description: 'Fällt der Grund für eine außerplanmäßige Abschreibung weg, muss bis maximal zu den fortgeführten Anschaffungskosten zugeschrieben werden!',
            isKeyTrap: true,
            legalBasis: '§ 253 Abs. 5 Satz 1 HGB',
          },
          {
            id: 't-5-3',
            title: 'Latente Steuern (§ 274 HGB)',
            description: 'Temporäre Differenzen zwischen Handels- und Steuerbilanz. Passivierungspflicht bei HB-Gewinn > StB-Gewinn.',
            legalBasis: '§ 274 HGB',
          },
        ],
        exercises: [
          {
            id: 'ex-6',
            title: 'Klausurübungen: Wertaufholung & Rückstellungen',
            type: 'exam_part',
            targetId: 'klausur-2',
            label: 'Klausurübungen Teil 1',
          },
        ],
        milestoneExam: {
          examId: 'klausur-2',
          title: 'Teilprüfung 1: Buchführung & Bilanzierung nach HGB (45 Min, 45 P)',
          durationMinutes: 45,
          targetScore: 35,
          description: 'Volle Teilprüfung zur Buchführung unter realen Bedingungen!',
        },
      },
    ],
  },

  // PHASE 3: KOSTEN- UND LEISTUNGSRECHNUNG (MANAGERIAL ACCOUNTING)
  {
    phaseNumber: 3,
    phaseTitle: 'Phase 3: Kosten- und Leistungsrechnung (Managerial Accounting)',
    subtitle: 'Lerneinheiten 2–12 von Prof. Dr. Wöhrmann: Von den Begriffspaaren bis zur Plankostenrechnung',
    timeHorizon: 'Tag 11 bis 14 (Woche 3)',
    badge: 'Klausur-Anteil: 40%',
    iconName: 'Calculator',
    description:
      'Das interne Rechnungswesen bei Prof. Wöhrmann: Exakte Abgrenzung von Auszahlung/Ausgabe/Aufwand/Kosten, Kostenarten- (kalkulatorische Kosten), Kostenstellen- (BAB, innerbetriebliche Leistungsverrechnung) und Kostenträgerrechnung (Zuschlags- und Äquivalenzziffernkalkulation) sowie Deckungsbeitrags- und Plankostenrechnung.',
    targetCompetencies: [
      'Glasklare Abgrenzung der 4 Begriffspaare (Auszahlung/Ausgabe/Aufwand/Kosten und Einzahlung/Einnahme/Ertrag/Leistung)',
      'Kalkulatorische Kosten (Grund-, Anders- und Zusatzkosten wie kalk. Zinsen und Unternehmerlohn)',
      'Betriebsabrechnungsbogen (BAB) & Stufenleiterverfahren bzw. Gleichungsverfahren',
      'Differenzierte Zuschlagskalkulation (MEK, MGK, FEK, FGK, Herstellkosten der Erzeugung & des Umsatzes)',
      'Äquivalenzziffernkalkulation bei artverwandten Sortenprodukten',
      'Einstufige und mehrstufige Deckungsbeitragsrechnung (Direct Costing)',
      'Engpassplanung nach dem relativen Deckungsbeitrag (db / Engpasseinheit)',
      'Flexible Plankostenrechnung: Sollkosten Ks, Beschäftigungsabweichung (BA) und Preisabweichung',
    ],
    units: [
      {
        id: 'unit-6',
        dayRange: 'Tag 11–12',
        title: 'LE 2–6: Grundbegriffe, Kostenarten & Betriebsabrechnungsbogen (BAB)',
        focus: 'Kalkulatorische Kosten, Zuschlagssätze & innerbetriebliche Leistungsverrechnung',
        professor: 'Prof. Dr. Arnt Wöhrmann',
        allocatedMinutesPerDay: 90,
        totalHours: 3,
        topics: [
          {
            id: 't-6-1',
            title: 'Die 4 Begriffspaare im internen & externen RW',
            description: 'Neutrale Aufwendungen (betriebsfremd, periodenfremd, außerordentlich) vs. kalkulatorische Kosten.',
            legalBasis: 'KLR Grundschema',
          },
          {
            id: 't-6-2',
            title: 'Betriebsabrechnungsbogen (BAB) & Stufenleiterverfahren',
            description: 'Vorkostenstellen an Endkostenstellen verrechnen. Einseitige Leistungsbeziehungen schrittweise auflösen.',
          },
          {
            id: 't-6-3',
            title: 'Herstellkosten der Erzeugung (HkE) vs. des Umsatzes (HkU)',
            description: 'HkU = HkE - Bestandsmehrung + Bestandsminderung. HkU ist Zuschlagsbasis für Verwaltung und Vertrieb!',
            isKeyTrap: true,
          },
        ],
        exercises: [
          {
            id: 'ex-7',
            title: 'Duolingo-Pfad: Level 3 Kosten- und Leistungsrechnung',
            type: 'path_level',
            targetId: 'level-3',
            label: 'Level 3: Kostenrechnung',
          },
        ],
        milestoneExam: {
          examId: 'klausur-5',
          title: 'Teilprüfung 4: Original JLU Probeklausur KLR (Aufgaben 10–13)',
          durationMinutes: 25,
          targetScore: 20,
          description: 'Originale Klausuraufgaben von Prof. Wöhrmann.',
        },
      },
      {
        id: 'unit-7',
        dayRange: 'Tag 13–14',
        title: 'LE 7–12: Kostenträger, Äquivalenzziffern, DB-Rechnung & Plankosten',
        focus: 'Kalkulation, Engpässe, Break-Even & flexible Plankostenrechnung',
        professor: 'Prof. Dr. Arnt Wöhrmann',
        allocatedMinutesPerDay: 90,
        totalHours: 3,
        topics: [
          {
            id: 't-7-1',
            title: 'Äquivalenzziffernkalkulation',
            description: 'Umrechnung verschiedener Sorten über Gewichtungsfaktoren auf die Basissorte (Rechnungseinheiten).',
          },
          {
            id: 't-7-2',
            title: 'Engpassplanung & Relativer Deckungsbeitrag',
            description: 'Bei begrenzter Maschinenkapazität entscheidet: rel. DB = Stückdeckungsbeitrag / Maschinenzeit.',
            isKeyTrap: true,
          },
          {
            id: 't-7-3',
            title: 'Flexible Plankostenrechnung (Abweichungszerlegung)',
            description: 'Sollkosten Ks = Kf + kvar * x_ist. Beschäftigungsabweichung BA = Ks - Kverr. Verbrauchsabweichung VA = Kist - Ks.',
          },
        ],
        exercises: [
          {
            id: 'ex-8',
            title: 'Klausuraufgaben KLR: Äquivalenzziffern & Plankosten',
            type: 'exam_part',
            targetId: 'klausur-3',
            label: 'KLR Master Klausur',
          },
        ],
        milestoneExam: {
          examId: 'klausur-3',
          title: 'Teilprüfung 2: Managerial Accounting / KLR (45 Min, 45 P)',
          durationMinutes: 45,
          targetScore: 35,
          description: 'Kompakte 45-Minuten-Prüfung zur Kostenrechnung!',
        },
      },
    ],
  },

  // PHASE 4: GENERALPROBE & KLAUSUR-ENDSPURT
  {
    phaseNumber: 4,
    phaseTitle: 'Phase 4: Klausur-Endspurt & Offizielle DIN A4-Generalprobe',
    subtitle: 'Vollständige 90-Minuten-Hauptprüfung unter realistischen Prüfungsbedingungen',
    timeHorizon: 'Tag 15 bis 18 (Woche 4 / Endspurt)',
    badge: 'Klausur-Simulation 100%',
    iconName: 'Award',
    description:
      'Die Generalprobe: Gesamtklausur über das gesamte Modul Accounting (Buchführung + KLR) im DIN A4-Testsimulator mit 90 Minuten Timer, ohne Hilfsmittel, mit verzögerter Auswertung, detailliertem Notengutachten und anschließender KI-Nachbesprechung.',
    targetCompetencies: [
      'Zeitmanagement: Strikte Einhaltung von 1 Minute = 1 Punkt (90 Min = 90 Punkte)',
      'Prüfungsstrategie: Multiple-Choice-Aufgaben schnell und sicher lösen (Ausschlussverfahren)',
      'Buchungssatz-Routine: Soll an Haben inklusive Vorsteuer/Umsatzsteuer und RAP fehlerfrei aufschreiben',
      'Kalkulationsaufgaben sauber strukturieren (Rechenwege dokumentieren)',
      'Nutzung des Prüfungsgutachtens zur gezielten Schließung letzter Wissenslücken',
    ],
    units: [
      {
        id: 'unit-8',
        dayRange: 'Tag 15–16',
        title: 'Generalprobe 1: Hauptprüfung Gesamtklausur',
        focus: '90 Min Echtzeitsimulation (Klausur 1)',
        professor: 'Beide',
        allocatedMinutesPerDay: 100,
        totalHours: 3.5,
        topics: [
          {
            id: 't-8-1',
            title: 'Hauptprüfung Gesamtklausur durchführen',
            description: '90 Minuten ungestört am Stück. Klausurbogen ausfüllen, abgeben, Gutachten analysieren.',
          },
          {
            id: 't-8-2',
            title: 'Fehler-Nachbesprechung mit Gemini 2.5 Flash Thinking',
            description: 'Jede falsche Aufgabe im Gutachten mit 1 Klick an den KI-Tutor übergeben und vertiefen.',
          },
        ],
        exercises: [
          {
            id: 'ex-9',
            title: 'Original JLU Probeklausur KLR (Aufgaben 10–16)',
            type: 'exam_part',
            targetId: 'klausur-5',
            label: 'Teilprüfung 4 (KLR)',
          },
        ],
        milestoneExam: {
          examId: 'klausur-1',
          title: 'Hauptprüfung: Original JLU Probeklausur Accounting (90 Min, 90 P)',
          durationMinutes: 90,
          targetScore: 70,
          description: 'Die entscheidende Generalprobe vor dem Prüfungstag!',
        },
      },
      {
        id: 'unit-9',
        dayRange: 'Tag 17–18',
        title: 'Letzter Schliff: Rabia-Spezial & Formelsammlung-Drill',
        focus: 'Mentale Ruhe, Wiederholung der WhatsApp-Fallen & Formel-Check',
        professor: 'Beide',
        allocatedMinutesPerDay: 60,
        totalHours: 2,
        topics: [
          {
            id: 't-9-1',
            title: 'Rabias Spickzettel-Check im Notizen-Hub',
            description: 'Nochmals die 17 goldenen Regeln überfliegen: Anzahlungen, RAP, Passivtausch, Degressive AfA.',
          },
          {
            id: 't-9-2',
            title: 'JLU-Formelsammlung einprägen',
            description: 'BAB-Zuschläge, Äquivalenzziffern, Beschäftigungsabweichung, kalkulatorische Zinsen.',
          },
        ],
        exercises: [
          {
            id: 'ex-10',
            title: 'Schnelldurchlauf: Rabia-Spezial (30 Min)',
            type: 'exam_part',
            targetId: 'klausur-4',
            label: 'Teilprüfung 3: WhatsApp-Fallen',
          },
        ],
        milestoneExam: {
          examId: 'klausur-1',
          title: 'Optionaler 2. Durchlauf Hauptprüfung zur Notenmaximierung',
          durationMinutes: 90,
          targetScore: 85,
          description: 'Ziel: Note 1,3 oder besser!',
        },
      },
    ],
  },
];

export const examTips = [
  {
    title: '1 Punkt = 1 Minute',
    description:
      'Die Klausur hat genau 90 Punkte für 90 Minuten. Wenn du bei einer 5-Punkte-Aufgabe nach 6 Minuten noch keine Lösung hast: markiere sie mit der Flagge 🚩 und gehe sofort zur nächsten!',
  },
  {
    title: 'Multiple Choice: Keine Punkte verschenken',
    description:
      'Bei Multiple-Choice-Fragen gibt es keinen Punktabzug für falsche Antworten (kein Minus-Scoring). Niemals ein Feld leer lassen!',
  },
  {
    title: 'Vorsteuer (§ 15 UStG) vs. Umsatzsteuer (§ 1 UStG)',
    description:
      'Vorsteuer fällt beim Einkauf/Bezug an (Aktivkonto, Forderung). Umsatzsteuer fällt beim Verkauf an (Passivkonto, Verbindlichkeit). Nie verwechseln!',
  },
  {
    title: 'Geleistete Anzahlung = Aktivtausch',
    description:
      'Wird eine Anzahlung geleistet, mindert sich die Bank und es entsteht die Aktivposition "Geleistete Anzahlungen" (§ 266 Abs. 2 B.I.4 HGB). Keine Auswirkung auf das Eigenkapital!',
  },
  {
    title: 'HkU als Zuschlagsbasis für Verwaltung & Vertrieb',
    description:
      'Die Verwaltungsgemeinkosten (VwGK) und Vertriebsgemeinkosten (VtGK) werden immer auf die Herstellkosten des UMSATZES (HkU) aufgeschlagen, niemals auf die Herstellkosten der Erzeugung (HkE)!',
  },
];
