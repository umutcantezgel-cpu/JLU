export type ExerciseType = 
  | 'chips_booking'       // Duolingo word chips: "BGA", "Vorsteuer", "an", "Bank", "Verbindlichkeiten"
  | 'balance_effect'      // Multiple choice: Aktivtausch, Bilanzverlängerung, etc.
  | 'true_false_choice'   // Academic concept check (Externes vs Internes RW, GuV etc.)
  | 'tkonto_placement'    // Soll oder Haben placement
  | 'calculation_step';   // Netto, Steuer, Brutto calculation

export interface TKontoEntry {
  accountName: string;
  isAktiv: boolean;
  sollEntries: { text: string; amount: number }[];
  habenEntries: { text: string; amount: number }[];
}

export interface Exercise {
  id: string;
  lessonId: string;
  lessonTitle: string;
  unitTitle: string; // e.g., "Folge 1: Die Gründung" or "Folge 2: Der Wareneinkauf"
  type: ExerciseType;
  storyPrompt: string; // "Bibi kauft auf dem Flohmarkt Möbel..."
  question: string;
  contextBadges?: string[];
  
  // For chips_booking
  availableChips?: string[];
  targetChipsOrder?: string[]; // Expected order of chips
  
  // For multiple choice / balance effect
  options?: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation?: string;
  }[];
  
  // Direct numerical / accounting validation
  tKontenVisual?: TKontoEntry[];
  
  // Pre-compiled didactics for 1-Click AI Tutor
  didacticExplanation: {
    coreIdea: string;
    accountLogic: string[];
    calculation: string;
    examTip: string;
  };
}

export interface LessonUnit {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  totalExercises: number;
  completedExercises: number;
  exerciseIds: string[];
}

export interface UserStats {
  xp: number;
  streakDays: number;
  hearts: number;
  maxHearts: number;
  completedLessons: string[];
  geminiApiKey?: string;
  soundEnabled: boolean;
}
