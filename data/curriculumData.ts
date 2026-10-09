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

// Bolt ⚡ Optimization: Pre-built O(1) lookup map to avoid O(N) array scans during renders
const exerciseMap = new Map<string, Exercise>();

// Index all exercises
allExercises.forEach((ex) => {
  exerciseMap.set(ex.id, ex);
});

// Index exam simulation tasks
examSimulations.forEach((exam) => {
  exam.exercises.forEach((ex) => {
    if (!exerciseMap.has(ex.id)) {
      exerciseMap.set(ex.id, ex);
    }
  });
});

/**
 * Fast O(1) exercise lookup by ID
 */
export const getExerciseById = (id: string): Exercise | undefined => {
  return exerciseMap.get(id);
};

// 9-Stage Duolingo Learning Journey
export const duolingoLevels: LearningLevel[] = [
  {
    id: 1,
    title: 'Level 1: Bilanz-Fundamente & Aktivtausch',
    subtitle: 'Folge 1: Inventar, Bilanz, Tilgung & Flohmarkt',
    category: 'rabia_special',
    requiredXp: 0,
    exercises: [
      exerciseMap.get('rabia-1')!,
      exerciseMap.get('rabia-2')!,
      exerciseMap.get('rabia-3')!,
      exerciseMap.get('rabia-11')!,
      exerciseMap.get('rabia-12')!,
      exerciseMap.get('bf-f1-1')!,
      exerciseMap.get('bf-f1-4')!,
    ].filter(Boolean),
  },
  {
    id: 2,
    title: 'Level 2: Küchenmaschine, Vorsteuer & Anzahlung',
    subtitle: 'Folge 2: 2.000 € Netto, 7% Vorsteuer, Keine Steuer auf Kredite',
    category: 'rabia_special',
    requiredXp: 80,
    exercises: [
      exerciseMap.get('rabia-4')!,
      exerciseMap.get('rabia-5')!,
      exerciseMap.get('rabia-6')!,
      exerciseMap.get('rabia-13')!,
      exerciseMap.get('rabia-14')!,
      exerciseMap.get('rabia-15')!,
      exerciseMap.get('bf-f2-2')!,
      exerciseMap.get('bf-f2-4')!,
    ].filter(Boolean),
  },
  {
    id: 3,
    title: 'Level 3: GuV, Sorbet-Lagerentnahme & Eigenkapital',
    subtitle: 'Folge 3: Aufwand im Soll / Ertrag im Haben, Keine Kasse bei Produktion',
    category: 'buchfuehrung',
    requiredXp: 180,
    exercises: [
      exerciseMap.get('rabia-7')!,
      exerciseMap.get('rabia-8')!,
      exerciseMap.get('rabia-9')!,
      exerciseMap.get('rabia-16')!,
      exerciseMap.get('rabia-17')!,
      exerciseMap.get('bf-f3-3')!,
      exerciseMap.get('bf-f4-1')!,
    ].filter(Boolean),
  },
  {
    id: 4,
    title: 'Level 4: Skonto, AfA & Darlehenstilgung',
    subtitle: 'Folge 5 & 6: Vorsteuerkorrektur und Zinstrennung',
    category: 'buchfuehrung',
    requiredXp: 300,
    exercises: [
      exerciseMap.get('rabia-10')!,
      exerciseMap.get('bf-f5-2')!,
      exerciseMap.get('bf-f6-4')!,
    ].filter(Boolean),
  },
  {
    id: 5,
    title: 'Level 5: Abgrenzungsrechnung & Kostenarten',
    subtitle: 'KLR LE 2, 3 & 4: WMB Lawinenschaden & Unternehmerlohn',
    category: 'kostenrechnung',
    requiredXp: 420,
    exercises: [
      exerciseMap.get('klr-le2-1')!,
      exerciseMap.get('klr-le2-2')!,
      exerciseMap.get('klr-le4-1')!,
    ].filter(Boolean),
  },
  {
    id: 6,
    title: 'Level 6: Leistungsverrechnung & BAB-Zuschläge',
    subtitle: 'KLR LE 5 & 6: Stufenleiterverfahren & Eis.com BAB',
    category: 'kostenrechnung',
    requiredXp: 540,
    exercises: [
      exerciseMap.get('klr-le5-1')!,
      exerciseMap.get('klr-le6-1')!,
    ].filter(Boolean),
  },
  {
    id: 7,
    title: 'Level 7: Jahresabschluss, ARAP & EBK/SBK',
    subtitle: 'Folge 7–10: Rückstellungen, Periodenabgrenzung & Bilanzen',
    category: 'buchfuehrung',
    requiredXp: 660,
    exercises: [
      exerciseMap.get('bf-f7-1')!,
      exerciseMap.get('bf-f8-5')!,
      exerciseMap.get('bf-f9-2')!,
      exerciseMap.get('bf-f10-3')!,
    ].filter(Boolean),
  },
  {
    id: 8,
    title: 'Level 8: Plankosten, Break-Even & Engpässe',
    subtitle: 'KLR LE 9–12: Hummus Abweichungen & Brennerstuhl AG',
    category: 'kostenrechnung',
    requiredXp: 800,
    exercises: [
      exerciseMap.get('klr-le9-1')!,
      exerciseMap.get('klr-le11-1')!,
      exerciseMap.get('klr-le12-1')!,
    ].filter(Boolean),
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
