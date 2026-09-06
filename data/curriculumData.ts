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

export const getExerciseById = (id: string): Exercise | undefined => {
  // Check main exercises
  const found = allExercises.find((ex) => ex.id === id);
  if (found) return found;

  // Check exam exercises
  for (const exam of examSimulations) {
    const examTask = exam.exercises.find((ex) => ex.id === id);
    if (examTask) return examTask;
  }
  return undefined;
};

// 9-Stage Duolingo Learning Journey
export const duolingoLevels: LearningLevel[] = [
  {
    id: 1,
    title: 'Level 1: Bilanz-Fundamente & Aktivtausch',
    subtitle: 'Folge 1 & Rabias Flohmarkt-Aufzeichnungen',
    category: 'rabia_special',
    requiredXp: 0,
    exercises: [
      allExercises.find((e) => e.id === 'rabia-1')!,
      allExercises.find((e) => e.id === 'rabia-2')!,
      allExercises.find((e) => e.id === 'rabia-3')!,
      allExercises.find((e) => e.id === 'bf-f1-1')!,
      allExercises.find((e) => e.id === 'bf-f1-4')!,
    ].filter(Boolean),
  },
  {
    id: 2,
    title: 'Level 2: Küchenmaschine, Vorsteuer & Anzahlung',
    subtitle: 'Folge 2: 2.000 € Netto, 7% Vorsteuer & Zielkauf',
    category: 'rabia_special',
    requiredXp: 80,
    exercises: [
      allExercises.find((e) => e.id === 'rabia-4')!,
      allExercises.find((e) => e.id === 'rabia-5')!,
      allExercises.find((e) => e.id === 'rabia-6')!,
      allExercises.find((e) => e.id === 'bf-f2-2')!,
      allExercises.find((e) => e.id === 'bf-f2-4')!,
    ].filter(Boolean),
  },
  {
    id: 3,
    title: 'Level 3: GuV, Sorbet-Lagerentnahme & Eigenkapital',
    subtitle: 'Folge 3: Aufwand im Soll / Ertrag im Haben',
    category: 'buchfuehrung',
    requiredXp: 180,
    exercises: [
      allExercises.find((e) => e.id === 'rabia-7')!,
      allExercises.find((e) => e.id === 'rabia-8')!,
      allExercises.find((e) => e.id === 'rabia-9')!,
      allExercises.find((e) => e.id === 'bf-f3-3')!,
      allExercises.find((e) => e.id === 'bf-f4-1')!,
    ].filter(Boolean),
  },
  {
    id: 4,
    title: 'Level 4: Skonto, AfA & Darlehenstilgung',
    subtitle: 'Folge 5 & 6: Vorsteuerkorrektur und Zinstrennung',
    category: 'buchfuehrung',
    requiredXp: 300,
    exercises: [
      allExercises.find((e) => e.id === 'rabia-10')!,
      allExercises.find((e) => e.id === 'bf-f5-2')!,
      allExercises.find((e) => e.id === 'bf-f6-4')!,
    ].filter(Boolean),
  },
  {
    id: 5,
    title: 'Level 5: Abgrenzungsrechnung & Kostenarten',
    subtitle: 'KLR LE 2, 3 & 4: WMB Lawinenschaden & Unternehmerlohn',
    category: 'kostenrechnung',
    requiredXp: 420,
    exercises: [
      allExercises.find((e) => e.id === 'klr-le2-1')!,
      allExercises.find((e) => e.id === 'klr-le2-2')!,
      allExercises.find((e) => e.id === 'klr-le4-1')!,
    ].filter(Boolean),
  },
  {
    id: 6,
    title: 'Level 6: Leistungsverrechnung & BAB-Zuschläge',
    subtitle: 'KLR LE 5 & 6: Stufenleiterverfahren & Eis.com BAB',
    category: 'kostenrechnung',
    requiredXp: 540,
    exercises: [
      allExercises.find((e) => e.id === 'klr-le5-1')!,
      allExercises.find((e) => e.id === 'klr-le6-1')!,
    ].filter(Boolean),
  },
  {
    id: 7,
    title: 'Level 7: Jahresabschluss, ARAP & EBK/SBK',
    subtitle: 'Folge 7–10: Rückstellungen, Periodenabgrenzung & Bilanzen',
    category: 'buchfuehrung',
    requiredXp: 660,
    exercises: [
      allExercises.find((e) => e.id === 'bf-f7-1')!,
      allExercises.find((e) => e.id === 'bf-f8-5')!,
      allExercises.find((e) => e.id === 'bf-f9-2')!,
      allExercises.find((e) => e.id === 'bf-f10-3')!,
    ].filter(Boolean),
  },
  {
    id: 8,
    title: 'Level 8: Plankosten, Break-Even & Engpässe',
    subtitle: 'KLR LE 9–12: Hummus Abweichungen & Brennerstuhl AG',
    category: 'kostenrechnung',
    requiredXp: 800,
    exercises: [
      allExercises.find((e) => e.id === 'klr-le9-1')!,
      allExercises.find((e) => e.id === 'klr-le11-1')!,
      allExercises.find((e) => e.id === 'klr-le12-1')!,
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
