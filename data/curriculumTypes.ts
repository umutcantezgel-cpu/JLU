export type BalanceEffect =
  | 'aktivtausch'
  | 'passivtausch'
  | 'bilanzverlaengerung'
  | 'bilanzverkuerzung'
  | 'erfolgswirksam_aufwand'
  | 'erfolgswirksam_ertrag'
  | 'erfolgsneutral';

export interface BookingEntry {
  account: string;
  amount: number;
}

export interface BuchungssatzSolution {
  soll: BookingEntry[];
  haben: BookingEntry[];
  effect: BalanceEffect;
  explanation: string;
}

export type ExerciseType =
  | 'buchungssatz'
  | 'multiple_choice'
  | 'calculation'
  | 'table_fill'
  | 'matrix_classification';

export interface Exercise {
  id: string;
  number: string; // e.g. "1.1", "2.2", "LE 6.1", "K1.10"
  title: string;
  category: 'buchfuehrung' | 'kostenrechnung' | 'rabia_special' | 'exam';
  unit: string; // e.g. "Folge 1: Die Gründung", "LE 6: Betriebsabrechnungsbogen"
  professor: 'Prof. Dr. Corinna Ewelt-Knauer' | 'Prof. Dr. Arnt Wöhrmann';
  points: number;
  scenario: string;
  question: string;
  type: ExerciseType;
  
  // Specific payload depending on type:
  buchungssatz?: BuchungssatzSolution;
  
  mcOptions?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  
  calculationFields?: {
    id: string;
    label: string;
    unit?: string;
    correctValue: number;
    tolerance?: number;
    explanation?: string;
  }[];

  hints: string[];
  jluNotes: string; // Official JLU lecture notes & § HGB references
  tags: string[];
}

export interface ExamSimulation {
  id: string;
  title: string;
  subtitle: string;
  semester: string;
  examiners: string;
  durationMinutes: number;
  totalPoints: number;
  passingScore: number;
  exercises: Exercise[];
}

export interface LearningLevel {
  id: number;
  title: string;
  subtitle: string;
  category: 'buchfuehrung' | 'kostenrechnung' | 'rabia_special' | 'boss';
  requiredXp: number;
  exercises: Exercise[];
  isLocked?: boolean;
}
