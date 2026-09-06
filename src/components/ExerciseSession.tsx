import React, { useState } from 'react';
import { X, Sparkles, Check, ArrowRight, RotateCcw, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Exercise } from '../types';
import { sound } from '../utils/audio';
import { TKontoCard } from './TKontoCard';
import { AITutorModal } from './AITutorModal';

interface ExerciseSessionProps {
  exercise: Exercise;
  currentIndex: number;
  totalExercises: number;
  onFinishExercise: (isCorrect: boolean) => void;
  onCloseSession: () => void;
  apiKey?: string;
}

export const ExerciseSession: React.FC<ExerciseSessionProps> = ({
  exercise,
  currentIndex,
  totalExercises,
  onFinishExercise,
  onCloseSession,
  apiKey
}) => {
  // Chips state for chips_booking
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  
  // Option state for choices
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  // Status state
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showAITutor, setShowAITutor] = useState(false);

  // Calculate progress percentage
  const progressPercent = Math.round(((currentIndex + 1) / totalExercises) * 100);

  // Handle clicking a chip from available chips
  const handleAddChip = (chip: string) => {
    if (status !== 'idle') return;
    sound.playTap();
    setSelectedChips(prev => [...prev, chip]);
  };

  // Handle removing a chip from selected chips
  const handleRemoveChip = (indexToRemove: number) => {
    if (status !== 'idle') return;
    sound.playTap();
    setSelectedChips(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  // Check the answer
  const handleCheck = () => {
    if (exercise.type === 'chips_booking') {
      if (!exercise.targetChipsOrder) return;
      const isMatch = selectedChips.length === exercise.targetChipsOrder.length &&
        selectedChips.every((chip, i) => chip === exercise.targetChipsOrder![i]);

      if (isMatch) {
        setStatus('correct');
        sound.playCorrect();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } else {
        setStatus('wrong');
        sound.playWrong();
      }
    } else {
      if (!selectedOptionId) return;
      const selectedOption = exercise.options?.find(o => o.id === selectedOptionId);
      if (selectedOption?.isCorrect) {
        setStatus('correct');
        sound.playCorrect();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      } else {
        setStatus('wrong');
        sound.playWrong();
      }
    }
  };

  // Move to next exercise
  const handleContinue = () => {
    onFinishExercise(status === 'correct');
  };

  // Check if check button should be enabled
  const canCheck = exercise.type === 'chips_booking' 
    ? selectedChips.length > 0 
    : selectedOptionId !== null;

  return (
    <div className="min-h-screen bg-jlu-canvas flex flex-col justify-between">
      
      {/* Top Header with Progress Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 px-4 py-3 shadow-2xs">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <button
            onClick={onCloseSession}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl transition-colors"
            title="Lerneinheit beenden"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Duolingo Progress Bar */}
          <div className="flex-1 bg-slate-200 h-3.5 rounded-full overflow-hidden relative">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300 relative shadow-inner"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 rounded-t-full" />
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-slate-500 whitespace-nowrap">
            {currentIndex + 1} / {totalExercises}
          </span>
        </div>
      </div>

      {/* Main Exercise Canvas */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-6 sm:py-8 flex flex-col justify-center">
        
        {/* Unit & Context Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="bg-jlu-light text-jlu-blue border border-blue-200 font-extrabold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full">
            {exercise.lessonTitle}
          </span>
          {exercise.contextBadges?.map((badge, idx) => (
            <span key={idx} className="bg-slate-100 text-slate-600 font-semibold text-[11px] px-2 py-0.5 rounded-md">
              {badge}
            </span>
          ))}
        </div>

        {/* Story prompt */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-5">
          <p className="text-slate-800 text-sm sm:text-base font-medium leading-relaxed">
            {exercise.storyPrompt}
          </p>
        </div>

        {/* The Question */}
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mb-6 tracking-tight">
          {exercise.question}
        </h2>

        {/* T-Accounts Visualizer (if available for this question) */}
        {exercise.tKontenVisual && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {exercise.tKontenVisual.map((tk, i) => (
              <TKontoCard key={i} entry={tk} />
            ))}
          </div>
        )}

        {/* INTERACTION MODE 1: CHIPS BOOKING (Duolingo Satzbau) */}
        {exercise.type === 'chips_booking' && (
          <div className="space-y-6">
            
            {/* Upper Selected Chips Target Area */}
            <div className="min-h-[72px] sm:min-h-[84px] bg-white border-2 border-dashed border-slate-300 rounded-2xl p-3 flex flex-wrap items-center gap-2 relative">
              {selectedChips.length === 0 ? (
                <span className="text-slate-400 text-xs sm:text-sm italic mx-auto select-none">
                  Tippe auf die Konten und Beträge unten, um den Buchungssatz zu bauen
                </span>
              ) : (
                selectedChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleRemoveChip(idx)}
                    disabled={status !== 'idle'}
                    className={`btn-duo-chip font-mono ${
                      chip === 'an' 
                        ? 'bg-amber-100 text-amber-900 border-amber-300' 
                        : 'bg-jlu-light text-jlu-blue-dark border-blue-300'
                    }`}
                  >
                    {chip}
                  </button>
                ))
              )}
            </div>

            {/* Reset Chips Button */}
            {selectedChips.length > 0 && status === 'idle' && (
              <div className="flex justify-end">
                <button
                  onClick={() => setSelectedChips([])}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Neu anordnen
                </button>
              </div>
            )}

            {/* Bottom Available Chips Pool */}
            <div className="flex flex-wrap justify-center gap-2.5 pt-2">
              {exercise.availableChips?.map((chip, idx) => {
                // Count how many times this chip was chosen
                const countInSelected = selectedChips.filter(c => c === chip).length;
                const countInAvailable = exercise.availableChips!.filter(c => c === chip).length;
                const isExhausted = countInSelected >= countInAvailable;

                return (
                  <button
                    key={idx}
                    disabled={isExhausted || status !== 'idle'}
                    onClick={() => handleAddChip(chip)}
                    className={`font-mono ${isExhausted ? 'btn-duo-chip-selected' : 'btn-duo-chip hover:border-slate-300'}`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* INTERACTION MODE 2 & 3: CHOICES & BALANCE EFFECTS */}
        {(exercise.type === 'balance_effect' || exercise.type === 'true_false_choice' || exercise.type === 'calculation_step') && (
          <div className="space-y-3">
            {exercise.options?.map((option) => {
              const isSelected = selectedOptionId === option.id;
              let borderClass = 'border-slate-200 hover:border-slate-300 bg-white';

              if (status === 'idle' && isSelected) {
                borderClass = 'border-jlu-blue bg-blue-50/60 ring-2 ring-jlu-blue/30';
              } else if (status === 'correct' && isSelected) {
                borderClass = 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500';
              } else if (status === 'wrong' && isSelected) {
                borderClass = 'border-rose-500 bg-rose-50 ring-2 ring-rose-500';
              }

              return (
                <button
                  key={option.id}
                  disabled={status !== 'idle'}
                  onClick={() => {
                    sound.playTap();
                    setSelectedOptionId(option.id);
                  }}
                  className={`w-full text-left p-4 rounded-2xl border-2 border-b-4 transition-all flex items-start gap-3.5 shadow-xs ${borderClass}`}
                >
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border ${
                    isSelected ? 'bg-jlu-blue text-white border-jlu-blue' : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}>
                    {isSelected ? <Check className="w-4 h-4" /> : null}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm sm:text-base leading-snug">
                      {option.text}
                    </p>
                    {status !== 'idle' && option.explanation && (
                      <p className={`text-xs mt-1.5 font-medium ${option.isCorrect ? 'text-emerald-700' : 'text-slate-500'}`}>
                        {option.explanation}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

      </main>

      {/* Bottom Sticky Action / Feedback Bar */}
      <footer className={`border-t transition-all duration-300 ${
        status === 'idle' 
          ? 'bg-white border-slate-200 py-4 px-4' 
          : status === 'correct'
          ? 'bg-emerald-100/90 border-emerald-300 py-4 sm:py-5 px-4'
          : 'bg-rose-100/90 border-rose-300 py-4 sm:py-5 px-4'
      }`}>
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Status Message */}
          {status === 'idle' ? (
            <div className="text-xs text-slate-500 hidden sm:block">
              Wähle deine Antwort und klicke auf Prüfen.
            </div>
          ) : status === 'correct' ? (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-black shadow-xs shrink-0">
                ✓
              </div>
              <div>
                <h4 className="font-black text-emerald-900 text-base leading-tight">Super gemacht!</h4>
                <p className="text-xs text-emerald-700 font-medium">Genau das ist die richtige Buchungslogik.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full sm:w-auto gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-rose-500 text-white flex items-center justify-center font-black shadow-xs shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-black text-rose-900 text-base leading-tight">Noch nicht ganz richtig!</h4>
                  <p className="text-xs text-rose-700 font-medium">Schau dir die didaktische Erklärung an.</p>
                </div>
              </div>

              {/* 1-Click AI Explanation Button */}
              <button
                onClick={() => setShowAITutor(true)}
                className="bg-white text-jlu-blue font-extrabold text-xs px-3.5 py-2 rounded-xl border border-blue-200 shadow-sm hover:bg-blue-50 transition-colors flex items-center gap-1.5 shrink-0"
              >
                <Sparkles className="w-4 h-4 text-jlu-blue fill-jlu-blue/30" />
                <span>Erklär's mir mit KI</span>
              </button>
            </div>
          )}

          {/* Action Button: Prüfen vs. Weiter */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {status === 'idle' ? (
              <button
                disabled={!canCheck}
                onClick={handleCheck}
                className={`w-full sm:w-44 py-3.5 btn-duo-green ${!canCheck ? 'opacity-40 cursor-not-allowed border-b-2' : ''}`}
              >
                Prüfen
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`w-full sm:w-44 py-3.5 font-bold rounded-2xl border-b-4 flex items-center justify-center gap-2 shadow-sm text-white ${
                  status === 'correct'
                    ? 'bg-emerald-600 border-emerald-800 hover:bg-emerald-700'
                    : 'bg-rose-600 border-rose-800 hover:bg-rose-700'
                }`}
              >
                <span>Weiter</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>

        </div>
      </footer>

      {/* 1-Click AI Tutor Modal */}
      <AITutorModal
        exercise={exercise}
        isOpen={showAITutor}
        onClose={() => setShowAITutor(false)}
        apiKey={apiKey}
      />

    </div>
  );
};
