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

// O(1) Map index for fast exercise lookups (lazy-initialized)
let exerciseMap: Map<string, Exercise> | null = null;

function getExerciseMap(): Map<string, Exercise> {
  if (!exerciseMap) {
    exerciseMap = new Map<string, Exercise>();
    allExercises.forEach((ex) => exerciseMap!.set(ex.id, ex));
    examSimulations.forEach((exam) => {
      exam.exercises.forEach((ex) => {
        if (!exerciseMap!.has(ex.id)) {
          exerciseMap!.set(ex.id, ex);
        }
      });
    });
  }
  return exerciseMap;
}

export const getExerciseById = (id: string): Exercise | undefined => {
  return getExerciseMap().get(id);
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
      getExerciseById('rabia-1')!,
      getExerciseById('rabia-2')!,
      getExerciseById('rabia-3')!,
      getExerciseById('rabia-11')!,
      getExerciseById('rabia-12')!,
      getExerciseById('bf-f1-1')!,
      getExerciseById('bf-f1-4')!,
    ].filter(Boolean),
  },
  {
    id: 2,
    title: 'Level 2: Küchenmaschine, Vorsteuer & Anzahlung',
    subtitle: 'Folge 2: 2.000 € Netto, 7% Vorsteuer, Keine Steuer auf Kredite',
    category: 'rabia_special',
    requiredXp: 80,
    exercises: [
      getExerciseById('rabia-4')!,
      getExerciseById('rabia-5')!,
      getExerciseById('rabia-6')!,
      getExerciseById('rabia-13')!,
      getExerciseById('rabia-14')!,
      getExerciseById('rabia-15')!,
      getExerciseById('bf-f2-2')!,
      getExerciseById('bf-f2-4')!,
    ].filter(Boolean),
  },
  {
    id: 3,
    title: 'Level 3: GuV, Sorbet-Lagerentnahme & Eigenkapital',
    subtitle: 'Folge 3: Aufwand im Soll / Ertrag im Haben, Keine Kasse bei Produktion',
    category: 'buchfuehrung',
    requiredXp: 180,
    exercises: [
      getExerciseById('rabia-7')!,
      getExerciseById('rabia-8')!,
      getExerciseById('rabia-9')!,
      getExerciseById('rabia-16')!,
      getExerciseById('rabia-17')!,
      getExerciseById('bf-f3-3')!,
      getExerciseById('bf-f4-1')!,
    ].filter(Boolean),
  },
  {
    id: 4,
    title: 'Level 4: Skonto, AfA & Darlehenstilgung',
    subtitle: 'Folge 5 & 6: Vorsteuerkorrektur und Zinstrennung',
    category: 'buchfuehrung',
    requiredXp: 300,
    exercises: [
      getExerciseById('rabia-10')!,
      getExerciseById('bf-f5-2')!,
      getExerciseById('bf-f6-4')!,
    ].filter(Boolean),
  },
  {
    id: 5,
    title: 'Level 5: Abgrenzungsrechnung & Kostenarten',
    subtitle: 'KLR LE 2, 3 & 4: WMB Lawinenschaden & Unternehmerlohn',
    category: 'kostenrechnung',
    requiredXp: 420,
    exercises: [
      getExerciseById('klr-le2-1')!,
      getExerciseById('klr-le2-2')!,
      getExerciseById('klr-le4-1')!,
    ].filter(Boolean),
  },
  {
    id: 6,
    title: 'Level 6: Leistungsverrechnung & BAB-Zuschläge',
    subtitle: 'KLR LE 5 & 6: Stufenleiterverfahren & Eis.com BAB',
    category: 'kostenrechnung',
    requiredXp: 540,
    exercises: [
      getExerciseById('klr-le5-1')!,
      getExerciseById('klr-le6-1')!,
    ].filter(Boolean),
  },
  {
    id: 7,
    title: 'Level 7: Jahresabschluss, ARAP & EBK/SBK',
    subtitle: 'Folge 7–10: Rückstellungen, Periodenabgrenzung & Bilanzen',
    category: 'buchfuehrung',
    requiredXp: 660,
    exercises: [
      getExerciseById('bf-f7-1')!,
      getExerciseById('bf-f8-5')!,
      getExerciseById('bf-f9-2')!,
      getExerciseById('bf-f10-3')!,
    ].filter(Boolean),
  },
  {
    id: 8,
    title: 'Level 8: Plankosten, Break-Even & Engpässe',
    subtitle: 'KLR LE 9–12: Hummus Abweichungen & Brennerstuhl AG',
    category: 'kostenrechnung',
    requiredXp: 800,
    exercises: [
      getExerciseById('klr-le9-1')!,
      getExerciseById('klr-le11-1')!,
      getExerciseById('klr-le12-1')!,
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
