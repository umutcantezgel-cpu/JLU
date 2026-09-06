import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LearningPath } from './components/LearningPath';
import { ExerciseSession } from './components/ExerciseSession';
import { RabiaStudioView } from './components/RabiaStudioView';
import { SettingsModal } from './components/SettingsModal';
import { LESSON_UNITS, EXERCISES } from './data/exercisesData';
import { UserStats } from './types';
import { sound } from './utils/audio';

const STORAGE_KEY = 'jlu_accounting_rabia_stats';

const DEFAULT_STATS: UserStats = {
  xp: 120,
  streakDays: 3,
  hearts: 5,
  maxHearts: 5,
  completedLessons: [],
  soundEnabled: true,
};

export const App: React.FC = () => {
  // Load persisted stats
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_STATS, ...JSON.parse(saved) } : DEFAULT_STATS;
    } catch {
      return DEFAULT_STATS;
    }
  });

  // Sync sound setting
  useEffect(() => {
    sound.enabled = stats.soundEnabled;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // View state: 'path' | 'exercise' | 'studio'
  const [currentView, setCurrentView] = useState<'path' | 'exercise' | 'studio'>('path');
  const [activeUnitId, setActiveUnitId] = useState<string | null>(null);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [currentUnitExercises, setCurrentUnitExercises] = useState<string[]>([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Update stats helper
  const handleUpdateStats = (newStats: Partial<UserStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  // Start a lesson unit
  const handleSelectUnit = (unitId: string) => {
    const unit = LESSON_UNITS.find(u => u.id === unitId);
    if (!unit) return;

    setActiveUnitId(unitId);
    setCurrentUnitExercises(unit.exerciseIds);
    setActiveExerciseIndex(0);
    setCurrentView('exercise');
  };

  // Start a specific exercise directly from Rabia's Studio
  const handleStartDirectExercise = (exerciseId: string) => {
    setActiveUnitId('rabia-studio');
    setCurrentUnitExercises([exerciseId]);
    setActiveExerciseIndex(0);
    setCurrentView('exercise');
  };

  // Progress through exercises
  const handleFinishExercise = (isCorrect: boolean) => {
    if (isCorrect) {
      handleUpdateStats({ xp: stats.xp + 10 });
    } else {
      handleUpdateStats({ hearts: Math.max(0, stats.hearts - 1) });
    }

    if (activeExerciseIndex + 1 < currentUnitExercises.length) {
      setActiveExerciseIndex(prev => prev + 1);
    } else {
      // Finished all exercises in this unit!
      sound.playVictory();
      if (activeUnitId) {
        handleUpdateStats({
          xp: stats.xp + 50,
          completedLessons: Array.from(new Set([...stats.completedLessons, activeUnitId]))
        });
      }
      setCurrentView('path');
    }
  };

  const currentExerciseId = currentUnitExercises[activeExerciseIndex];
  const currentExercise = currentExerciseId ? EXERCISES[currentExerciseId] : null;

  return (
    <div className="min-h-screen bg-jlu-canvas font-sans flex flex-col selection:bg-blue-100">
      
      {/* Top persistent university navigation bar */}
      <Header
        stats={stats}
        currentView={currentView}
        onBackToPath={() => setCurrentView('path')}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenStudio={() => setCurrentView('studio')}
      />

      {/* Dynamic View Router */}
      <div className="flex-1">
        {currentView === 'path' && (
          <LearningPath
            units={LESSON_UNITS.map(unit => ({
              ...unit,
              completedExercises: stats.completedLessons.includes(unit.id) ? unit.totalExercises : 0
            }))}
            onSelectUnit={handleSelectUnit}
            onOpenStudio={() => setCurrentView('studio')}
          />
        )}

        {currentView === 'studio' && (
          <RabiaStudioView
            onBack={() => setCurrentView('path')}
            onStartExercise={handleStartDirectExercise}
          />
        )}

        {currentView === 'exercise' && currentExercise && (
          <ExerciseSession
            exercise={currentExercise}
            currentIndex={activeExerciseIndex}
            totalExercises={currentUnitExercises.length}
            onFinishExercise={handleFinishExercise}
            onCloseSession={() => setCurrentView('path')}
            apiKey={stats.geminiApiKey}
          />
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        stats={stats}
        onUpdateStats={handleUpdateStats}
      />

    </div>
  );
};

export default App;
