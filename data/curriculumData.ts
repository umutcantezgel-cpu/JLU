import { Exercise, LearningLevel } from './curriculumTypes';
import { buchfuehrungExercises } from './buchfuehrungData';
import { kostenrechnungExercises } from './kostenrechnungData';
import { rabiaWorkoutExercises } from './rabiaWorkoutData';
import { examSimulations } from './examSimulationsData';

export * from './curriculumTypes';
export * from './buchfuehrungData';
export * from './kostenrechnungData';
export * from './rabiaWorkoutData';
export * from './examSimulationsData';

// Combine all non-exam exercises into one repository
export const allExercises: Exercise[] = [
  ...rabiaWorkoutExercises,
  ...buchfuehrungExercises,
  ...kostenrechnungExercises,
];

// Pre-build O(1) Hash Map lookup for exercises
// Optimization: Reduces O(N) array search overhead to O(1) constant time lookup
const exerciseMap = new Map<string, Exercise>();
for (const ex of allExercises) {
  exerciseMap.set(ex.id, ex);
}
for (const exam of examSimulations) {
  for (const ex of exam.exercises) {
    if (!exerciseMap.has(ex.id)) {
      exerciseMap.set(ex.id, ex);
    }
  }
}

export const getExerciseById = (id: string): Exercise | undefined => {
  return exerciseMap.get(id);
};

// Helper for O(1) level exercise array initialization
const getExercises = (ids: string[]): Exercise[] => {
  const result: Exercise[] = [];
  for (const id of ids) {
    const ex = exerciseMap.get(id);
    if (ex) result.push(ex);
  }
  return result;
};

// 9-Stage Duolingo Learning Journey
export const duolingoLevels: LearningLevel[] = [
  {
    id: 1,
    title: 'Level 1: Bilanz-Fundamente & Aktivtausch',
    subtitle: 'Folge 1: Inventar, Bilanz, Tilgung & Flohmarkt',
    category: 'rabia_special',
    requiredXp: 0,
    exercises: getExercises([
      'rabia-1',
      'rabia-2',
      'rabia-3',
      'rabia-11',
      'rabia-12',
      'bf-f1-1',
      'bf-f1-4',
    ]),
  },
  {
    id: 2,
    title: 'Level 2: Küchenmaschine, Vorsteuer & Anzahlung',
    subtitle: 'Folge 2: 2.000 € Netto, 7% Vorsteuer, Keine Steuer auf Kredite',
    category: 'rabia_special',
    requiredXp: 80,
    exercises: getExercises([
      'rabia-4',
      'rabia-5',
      'rabia-6',
      'rabia-13',
      'rabia-14',
      'rabia-15',
      'bf-f2-2',
      'bf-f2-4',
    ]),
  },
  {
    id: 3,
    title: 'Level 3: GuV, Sorbet-Lagerentnahme & Eigenkapital',
    subtitle: 'Folge 3: Aufwand im Soll / Ertrag im Haben, Keine Kasse bei Produktion',
    category: 'buchfuehrung',
    requiredXp: 180,
    exercises: getExercises([
      'rabia-7',
      'rabia-8',
      'rabia-9',
      'rabia-16',
      'rabia-17',
      'bf-f3-3',
      'bf-f4-1',
    ]),
  },
  {
    id: 4,
    title: 'Level 4: Skonto, AfA & Darlehenstilgung',
    subtitle: 'Folge 5 & 6: Vorsteuerkorrektur und Zinstrennung',
    category: 'buchfuehrung',
    requiredXp: 300,
    exercises: getExercises([
      'rabia-10',
      'bf-f5-2',
      'bf-f6-4',
    ]),
  },
  {
    id: 5,
    title: 'Level 5: Abgrenzungsrechnung & Kostenarten',
    subtitle: 'KLR LE 2, 3 & 4: WMB Lawinenschaden & Unternehmerlohn',
    category: 'kostenrechnung',
    requiredXp: 420,
    exercises: getExercises([
      'klr-le2-1',
      'klr-le2-2',
      'klr-le4-1',
    ]),
  },
  {
    id: 6,
    title: 'Level 6: Leistungsverrechnung & BAB-Zuschläge',
    subtitle: 'KLR LE 5 & 6: Stufenleiterverfahren & Eis.com BAB',
    category: 'kostenrechnung',
    requiredXp: 540,
    exercises: getExercises([
      'klr-le5-1',
      'klr-le6-1',
    ]),
  },
  {
    id: 7,
    title: 'Level 7: Jahresabschluss, ARAP & EBK/SBK',
    subtitle: 'Folge 7–10: Rückstellungen, Periodenabgrenzung & Bilanzen',
    category: 'buchfuehrung',
    requiredXp: 660,
    exercises: getExercises([
      'bf-f7-1',
      'bf-f8-5',
      'bf-f9-2',
      'bf-f10-3',
    ]),
  },
  {
    id: 8,
    title: 'Level 8: Plankosten, Break-Even & Engpässe',
    subtitle: 'KLR LE 9–12: Hummus Abweichungen & Brennerstuhl AG',
    category: 'kostenrechnung',
    requiredXp: 800,
    exercises: getExercises([
      'klr-le9-1',
      'klr-le11-1',
      'klr-le12-1',
    ]),
  },
  {
    id: 9,
    title: 'Level 9: Der Große JLU Klausur-Parcours',
    subtitle: 'Offizielle Probeklausur WS 2024/25 mit Countdown',
    category: 'boss',
    requiredXp: 950,
    exercises: examSimulations[0].exercises,
  },
];
