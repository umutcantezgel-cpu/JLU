'use client';

import React, { useState, useEffect } from 'react';
import { duolingoLevels, Exercise, LearningLevel } from '@/data/curriculumData';
import { BuchungssatzComposer } from './BuchungssatzComposer';
import { playSuccessSound, playErrorSound, playFanfareSound } from '@/lib/soundEffects';
import {
  Heart,
  Flame,
  Zap,
  Award,
  Lock,
  CheckCircle2,
  Play,
  Sparkles,
  ArrowRight,
  RotateCcw,
  X,
  BookOpen,
  HelpCircle,
} from 'lucide-react';

interface DuolingoPathViewProps {
  onOpenTutor: (context: string) => void;
  onNavigateToKlausur: () => void;
  onNavigateToStudio: () => void;
}

export const DuolingoPathView: React.FC<DuolingoPathViewProps> = ({
  onOpenTutor,
  onNavigateToKlausur,
  onNavigateToStudio,
}) => {
  // Gamification state with localStorage persistence
  const [hearts, setHearts] = useState<number>(5);
  const [streak, setStreak] = useState<number>(5);
  const [xp, setXp] = useState<number>(340);
  const [completedLevels, setCompletedLevels] = useState<number[]>([1, 2]);
  const [activeLevel, setActiveLevel] = useState<LearningLevel | null>(null);

  // Active level exercise state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(null);
  const [calculationInputs, setCalculationInputs] = useState<Record<string, string>>({});
  const [isExerciseSubmitted, setIsExerciseSubmitted] = useState<boolean>(false);
  const [isExerciseCorrect, setIsExerciseCorrect] = useState<boolean>(false);
  const [showLevelCompleteModal, setShowLevelCompleteModal] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedXp = localStorage.getItem('jlu_rabia_xp');
      const savedHearts = localStorage.getItem('jlu_rabia_hearts');
      const savedCompleted = localStorage.getItem('jlu_rabia_completed_levels');
      if (savedXp) setXp(parseInt(savedXp, 10));
      if (savedHearts) setHearts(parseInt(savedHearts, 10));
      if (savedCompleted) {
        try {
          setCompletedLevels(JSON.parse(savedCompleted));
        } catch (e) {}
      }
    }
  }, []);

  const saveProgress = (newXp: number, newHearts: number, newCompleted: number[]) => {
    setXp(newXp);
    setHearts(newHearts);
    setCompletedLevels(newCompleted);
    if (typeof window !== 'undefined') {
      localStorage.setItem('jlu_rabia_xp', newXp.toString());
      localStorage.setItem('jlu_rabia_hearts', newHearts.toString());
      localStorage.setItem('jlu_rabia_completed_levels', JSON.stringify(newCompleted));
    }
  };

  const handleStartLevel = (level: LearningLevel) => {
    if (level.category === 'boss') {
      onNavigateToKlausur();
      return;
    }
    setActiveLevel(level);
    setCurrentExerciseIndex(0);
    setUserSelectedOption(null);
    setCalculationInputs({});
    setIsExerciseSubmitted(false);
    setIsExerciseCorrect(false);
    setShowLevelCompleteModal(false);
  };

  const currentExercise: Exercise | undefined = activeLevel?.exercises[currentExerciseIndex];

  const handleCheckMultipleChoice = () => {
    if (!currentExercise || !userSelectedOption) return;
    const opt = currentExercise.mcOptions?.find((o) => o.id === userSelectedOption);
    const correct = !!opt?.isCorrect;

    setIsExerciseSubmitted(true);
    setIsExerciseCorrect(correct);

    if (correct) {
      playSuccessSound();
      saveProgress(xp + currentExercise.points * 2, hearts, completedLevels);
    } else {
      playErrorSound();
      const nextHearts = Math.max(0, hearts - 1);
      saveProgress(xp, nextHearts, completedLevels);
    }
  };

  const handleCheckCalculation = () => {
    if (!currentExercise || !currentExercise.calculationFields) return;
    let allOk = true;

    for (const field of currentExercise.calculationFields) {
      const val = parseFloat(calculationInputs[field.id]?.replace(',', '.') || '0');
      const target = field.correctValue;
      const tol = field.tolerance || 0.05;
      if (Math.abs(val - target) > tol) {
        allOk = false;
        break;
      }
    }

    setIsExerciseSubmitted(true);
    setIsExerciseCorrect(allOk);

    if (allOk) {
      playSuccessSound();
      saveProgress(xp + currentExercise.points * 2, hearts, completedLevels);
    } else {
      playErrorSound();
      const nextHearts = Math.max(0, hearts - 1);
      saveProgress(xp, nextHearts, completedLevels);
    }
  };

  const handleNextExercise = () => {
    if (!activeLevel) return;
    if (currentExerciseIndex < activeLevel.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserSelectedOption(null);
      setCalculationInputs({});
      setIsExerciseSubmitted(false);
      setIsExerciseCorrect(false);
    } else {
      // Completed all exercises in level!
      playFanfareSound();
      const updatedLevels = Array.from(new Set([...completedLevels, activeLevel.id]));
      saveProgress(xp + 50, hearts, updatedLevels);
      setShowLevelCompleteModal(true);
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 pb-24">
      {/* Duolingo Gamification Top Status Bar */}
      <div className="sticky top-20 z-20 bg-surface/90 backdrop-blur-md rounded-2xl p-4 border border-border-hairline shadow-sm flex items-center justify-between gap-3">
        {/* Left: Current Rank / Level */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-black text-base shadow-sm">
            JLU
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
              Accounting Pfad
            </span>
            <div className="text-sm font-black text-secondary flex items-center gap-1.5">
              <span>Bibi &amp; Rabia Champion</span>
            </div>
          </div>
        </div>

        {/* Right: Gamified Stats Chips */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Streaks */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs sm:text-sm">
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500 animate-bounce" />
            <span>{streak} Tage</span>
          </div>

          {/* XP */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 font-bold text-xs sm:text-sm">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 fill-sky-500" />
            <span>{xp} XP</span>
          </div>

          {/* Hearts */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 font-bold text-xs sm:text-sm">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-500" />
            <span>{hearts} / 5</span>
            {hearts < 3 && (
              <button
                type="button"
                onClick={onNavigateToStudio}
                className="text-[10px] underline ml-1 text-rose-700 font-normal hover:font-semibold"
              >
                Aufladen
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Hero Card with Rabia Guidance */}
      <div className="bg-linear-to-r from-secondary to-primary text-white rounded-2xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Duolingo-Lernpfad: Alle 10 Folgen + KLR LE 1–12</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Schritt für Schritt zur Traumnote 1,0!
          </h1>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed">
            Meistere jede Station nacheinander. Deine handgeschriebenen Notizen sind direkt in Level 1 bis 3 integriert. Bei Fehlern hilft dir der 1-Klick KI-Tutor sofort weiter.
          </p>
        </div>
      </div>

      {/* Snake / S-Curve Duolingo Skill Tree */}
      <div className="max-w-xl mx-auto w-full flex flex-col items-center gap-10 py-6">
        {duolingoLevels.map((level, index) => {
          const isCompleted = completedLevels.includes(level.id);
          const isUnlocked =
            index === 0 || completedLevels.includes(duolingoLevels[index - 1].id);
          const isCurrent = isUnlocked && !isCompleted;

          // S-curve offset for Duolingo aesthetic
          const offsets = [
            'translate-x-0',
            'translate-x-12 sm:translate-x-16',
            'translate-x-0',
            '-translate-x-12 sm:-translate-x-16',
            'translate-x-0',
            'translate-x-12 sm:translate-x-16',
            'translate-x-0',
            '-translate-x-12 sm:-translate-x-16',
            'translate-x-0',
          ];
          const offsetClass = offsets[index % offsets.length];

          return (
            <div
              key={level.id}
              className={`flex flex-col items-center transition-all duration-300 ${offsetClass}`}
            >
              {/* Level Node Circle */}
              <div className="relative group">
                <button
                  type="button"
                  onClick={() => isUnlocked && handleStartLevel(level)}
                  disabled={!isUnlocked}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full flex flex-col items-center justify-center font-black transition-all duration-300 relative shadow-lg ${
                    isCompleted
                      ? 'bg-amber-400 hover:bg-amber-500 text-amber-950 ring-4 ring-amber-200'
                      : isCurrent
                      ? 'bg-primary hover:bg-primary-hover text-white ring-8 ring-primary/25 animate-pulse scale-105'
                      : 'bg-surface-container-high text-text-muted cursor-not-allowed border-2 border-border-hairline'
                  }`}
                >
                  {isCompleted ? (
                    <Award className="w-8 h-8 sm:w-10 sm:h-10 text-amber-950" />
                  ) : isUnlocked ? (
                    level.category === 'boss' ? (
                      <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    ) : (
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white ml-1 fill-white" />
                    )
                  ) : (
                    <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-text-muted" />
                  )}
                  <span className="text-[10px] sm:text-xs uppercase font-extrabold mt-0.5">
                    {level.category === 'boss' ? 'KLAUSUR' : `L${level.id}`}
                  </span>
                </button>

                {/* Crown / Star on Top if completed */}
                {isCompleted && (
                  <div className="absolute -top-2.5 -right-1 bg-amber-500 text-white rounded-full p-1 shadow-xs">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Node Description Card below */}
              <div className="mt-3 text-center max-w-xs space-y-0.5">
                <div className="text-xs sm:text-sm font-extrabold text-secondary">
                  {level.title}
                </div>
                <div className="text-[11px] text-text-muted leading-tight">
                  {level.subtitle}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Level Interactive Practice Modal */}
      {activeLevel && currentExercise && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-surface w-full max-w-3xl rounded-2xl shadow-2xl border border-border-hairline overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header with Progress */}
            <div className="p-4 sm:p-5 border-b border-border-hairline flex items-center justify-between gap-4 bg-surface-container-low">
              <button
                type="button"
                onClick={() => setActiveLevel(null)}
                className="p-1.5 rounded-lg hover:bg-surface text-text-muted hover:text-text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Progress Bar */}
              <div className="flex-1 max-w-md">
                <div className="flex justify-between text-[11px] font-bold text-text-muted mb-1 uppercase tracking-wider">
                  <span>
                    Aufgabe {currentExerciseIndex + 1} von {activeLevel.exercises.length}
                  </span>
                  <span>{currentExercise.number}</span>
                </div>
                <div className="w-full h-2.5 bg-surface-variant rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 rounded-full"
                    style={{
                      width: `${
                        ((currentExerciseIndex + 1) / activeLevel.exercises.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* 1-Click AI Tutor Button */}
              <button
                type="button"
                onClick={() =>
                  onOpenTutor(
                    `Aufgabe ${currentExercise.number}: ${currentExercise.title}\n${currentExercise.scenario}\n${currentExercise.question}`
                  )
                }
                className="px-3 py-1.5 rounded-lg bg-primary-fixed text-on-primary-fixed hover:bg-primary-hover hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>KI-Erklärung</span>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
              {/* Exercise Header */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded bg-secondary text-white font-bold text-xs">
                    {currentExercise.unit}
                  </span>
                  <span className="text-xs text-text-muted">
                    {currentExercise.professor} · {currentExercise.points} Punkte
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-extrabold text-secondary">
                  {currentExercise.title}
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed bg-surface-container-low p-3.5 rounded-xl border border-border-hairline">
                  {currentExercise.scenario}
                </p>
                <h3 className="text-sm sm:text-base font-bold text-text-primary pt-1">
                  {currentExercise.question}
                </h3>
              </div>

              {/* Exercise Type Renderers */}
              {currentExercise.type === 'buchungssatz' && currentExercise.buchungssatz && (
                <BuchungssatzComposer
                  correctSoll={currentExercise.buchungssatz.soll}
                  correctHaben={currentExercise.buchungssatz.haben}
                  expectedEffect={currentExercise.buchungssatz.effect}
                  onSuccess={() => {
                    setIsExerciseSubmitted(true);
                    setIsExerciseCorrect(true);
                    saveProgress(xp + currentExercise.points * 2, hearts, completedLevels);
                  }}
                  onFail={() => {
                    setIsExerciseSubmitted(true);
                    setIsExerciseCorrect(false);
                    const nextHearts = Math.max(0, hearts - 1);
                    saveProgress(xp, nextHearts, completedLevels);
                  }}
                  onOpenTutor={() =>
                    onOpenTutor(
                      `Buchungssatz ${currentExercise.number}: ${currentExercise.title}`
                    )
                  }
                />
              )}

              {currentExercise.type === 'multiple_choice' && currentExercise.mcOptions && (
                <div className="space-y-3">
                  {currentExercise.mcOptions.map((opt) => {
                    const isSelected = userSelectedOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => !isExerciseSubmitted && setUserSelectedOption(opt.id)}
                        disabled={isExerciseSubmitted}
                        className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-primary-fixed/40 border-primary text-secondary font-semibold shadow-xs'
                            : 'bg-surface text-text-primary border-border-hairline hover:bg-surface-variant'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'border-primary bg-primary text-white'
                              : 'border-border-hairline'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="leading-relaxed">{opt.text}</span>
                      </button>
                    );
                  })}

                  {!isExerciseSubmitted && (
                    <button
                      type="button"
                      disabled={!userSelectedOption}
                      onClick={handleCheckMultipleChoice}
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover disabled:bg-surface-variant disabled:text-text-muted text-white font-bold text-sm shadow-sm transition-colors mt-2"
                    >
                      Antwort überprüfen
                    </button>
                  )}
                </div>
              )}

              {currentExercise.type === 'calculation' && currentExercise.calculationFields && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentExercise.calculationFields.map((field) => (
                      <div
                        key={field.id}
                        className="p-3.5 rounded-xl bg-surface-container-low border border-border-hairline space-y-1.5"
                      >
                        <label className="text-xs font-bold text-secondary">
                          {field.label}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            disabled={isExerciseSubmitted}
                            placeholder="Zahl eingeben..."
                            value={calculationInputs[field.id] || ''}
                            onChange={(e) =>
                              setCalculationInputs({
                                ...calculationInputs,
                                [field.id]: e.target.value,
                              })
                            }
                            className="w-full bg-surface border border-border-hairline px-3 py-2 rounded-lg text-sm font-mono font-bold text-text-primary"
                          />
                          {field.unit && (
                            <span className="text-xs font-bold text-text-muted">
                              {field.unit}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {!isExerciseSubmitted && (
                    <button
                      type="button"
                      onClick={handleCheckCalculation}
                      className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-sm transition-colors mt-2"
                    >
                      Rechenergebnisse überprüfen
                    </button>
                  )}
                </div>
              )}

              {/* Feedback and JLU Explanation Banner */}
              {isExerciseSubmitted && (
                <div
                  className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-200 ${
                    isExerciseCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {isExerciseCorrect ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Hervorragend gelöst! (+{currentExercise.points * 2} XP)</span>
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5 text-rose-600" />
                        <span>Leider nicht ganz richtig! (-1 Herz)</span>
                      </>
                    )}
                  </div>

                  <div className="text-xs leading-relaxed">
                    <strong className="font-semibold">JLU-Didaktik-Hinweis: </strong>
                    {currentExercise.jluNotes}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Sticky Action Bar */}
            {isExerciseSubmitted && (
              <div className="p-4 border-t border-border-hairline bg-surface-container-low flex justify-end">
                <button
                  type="button"
                  onClick={handleNextExercise}
                  className="px-6 py-2.5 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-bold text-sm shadow-sm transition-colors flex items-center gap-2"
                >
                  <span>
                    {currentExerciseIndex < activeLevel.exercises.length - 1
                      ? 'Nächste Aufgabe'
                      : 'Level abschließen!'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Level Complete Celebration Modal */}
      {showLevelCompleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-md rounded-2xl p-6 text-center space-y-4 border border-border-hairline shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-secondary">
              Level erfolgreich gemeistert!
            </h3>
            <p className="text-xs sm:text-sm text-text-muted">
              Du hast alle Übungen dieses Levels absolviert und <strong>+50 Bonus-XP</strong> erhalten. Die nächste Stufe auf deinem Weg zur 1,0 ist freigeschaltet!
            </p>
            <button
              type="button"
              onClick={() => {
                setShowLevelCompleteModal(false);
                setActiveLevel(null);
              }}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-sm transition-colors"
            >
              Weiter im Lernpfad
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
