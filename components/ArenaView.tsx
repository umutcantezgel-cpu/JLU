'use client';

import React, { useState } from 'react';
import {
  allExercises,
  rabiaWorkoutExercises,
  buchfuehrungExercises,
  kostenrechnungExercises,
  Exercise,
} from '@/data/curriculumData';
import { BuchungssatzComposer } from './BuchungssatzComposer';
import { playSuccessSound, playErrorSound } from '@/lib/soundEffects';
import {
  BookOpen,
  CheckCircle2,
  Sparkles,
  Search,
  Filter,
  ArrowRight,
  Scale,
  Award,
  Layers,
  ChevronLeft,
  ChevronRight,
  Heart,
  HelpCircle,
} from 'lucide-react';

interface ArenaViewProps {
  onOpenTutor: (context: string) => void;
  initialExerciseId?: string;
}

export const ArenaView: React.FC<ArenaViewProps> = ({ onOpenTutor, initialExerciseId }) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'rabia_special' | 'buchfuehrung' | 'kostenrechnung'
  >('rabia_special');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>(initialExerciseId || 'rabia-5'); // Default: Küchenmaschine

  React.useEffect(() => {
    if (initialExerciseId) {
      setSelectedExerciseId(initialExerciseId);
    }
  }, [initialExerciseId]);

  // Filter exercises
  const filteredExercises = allExercises.filter((ex) => {
    const matchesCat =
      selectedCategory === 'all' || ex.category === selectedCategory;
    const matchesSearch =
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const currentExercise: Exercise =
    allExercises.find((e) => e.id === selectedExerciseId) ||
    filteredExercises[0] ||
    allExercises[0];

  // User input states for current exercise
  const [mcChoice, setMcChoice] = useState<string | null>(null);
  const [calcInputs, setCalcInputs] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const handleSelectExercise = (ex: Exercise) => {
    setSelectedExerciseId(ex.id);
    setMcChoice(null);
    setCalcInputs({});
    setFeedback(null);
  };

  const handleCheckMultipleChoice = () => {
    if (!currentExercise.mcOptions || !mcChoice) return;
    const opt = currentExercise.mcOptions.find((o) => o.id === mcChoice);
    const correct = !!opt?.isCorrect;
    if (correct) {
      playSuccessSound();
      setFeedback({
        isCorrect: true,
        message: opt?.explanation || 'Hervorragend gelöst! Volle Punktzahl.',
      });
    } else {
      playErrorSound();
      setFeedback({
        isCorrect: false,
        message: opt?.explanation || 'Leider falsch. Lies den didaktischen Hinweis!',
      });
    }
  };

  const handleCheckCalculation = () => {
    if (!currentExercise.calculationFields) return;
    let allOk = true;
    for (const f of currentExercise.calculationFields) {
      const val = parseFloat(calcInputs[f.id]?.replace(',', '.') || '0');
      const tol = f.tolerance || 0.05;
      if (Math.abs(val - f.correctValue) > tol) {
        allOk = false;
        break;
      }
    }

    if (allOk) {
      playSuccessSound();
      setFeedback({
        isCorrect: true,
        message: 'Alle Rechenergebnisse stimmen exakt mit der JLU-Musterlösung überein!',
      });
    } else {
      playErrorSound();
      setFeedback({
        isCorrect: false,
        message: 'Mindestens ein Rechenergebnis weicht von der Musterlösung ab. Überprüfe deine Formeln!',
      });
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-24">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-surface p-4 rounded-2xl border border-border-hairline shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory('rabia_special')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              selectedCategory === 'rabia_special'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-surface text-text-primary hover:bg-surface-variant'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Rabias Notizen-Workout</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-[10px]">
              {rabiaWorkoutExercises.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('buchfuehrung')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'buchfuehrung'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface text-text-primary hover:bg-surface-variant'
            }`}
          >
            <span>Buchführung (Folge 1–10)</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-variant text-[10px] text-text-muted">
              {buchfuehrungExercises.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('kostenrechnung')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === 'kostenrechnung'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface text-text-primary hover:bg-surface-variant'
            }`}
          >
            <span>Kostenrechnung (LE 1–12)</span>
            <span className="ml-1 px-1.5 py-0.5 rounded-full bg-surface-variant text-[10px] text-text-muted">
              {kostenrechnungExercises.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === 'all'
                ? 'bg-secondary text-white'
                : 'bg-surface text-text-muted hover:bg-surface-variant'
            }`}
          >
            Alle ({allExercises.length})
          </button>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Aufgabe suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-surface-variant border border-border-hairline text-xs font-medium text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Main Grid: Left exercise selector list + Right active exercise canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Cols: Exercise List */}
        <div className="lg:col-span-4 bg-surface rounded-2xl border border-border-hairline p-3 shadow-sm max-h-[750px] overflow-y-auto space-y-2">
          <div className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-text-muted">
            Aufgaben ({filteredExercises.length})
          </div>

          {filteredExercises.map((ex) => {
            const isSelected = ex.id === currentExercise.id;
            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => handleSelectExercise(ex)}
                className={`w-full p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  isSelected
                    ? 'bg-primary-fixed/40 border-primary shadow-xs'
                    : 'bg-surface border-border-hairline hover:bg-surface-variant'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-surface-container-high font-mono text-[10px] font-bold text-secondary">
                    {ex.number}
                  </span>
                  <span className="text-[10px] text-text-muted">{ex.points} P</span>
                </div>
                <span className="text-xs font-bold text-secondary truncate">
                  {ex.title}
                </span>
                <span className="text-[10px] text-text-muted truncate">
                  {ex.unit}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right 8 Cols: Active Exercise Canvas */}
        <div className="lg:col-span-8 bg-surface rounded-2xl border border-border-hairline p-6 sm:p-8 shadow-sm space-y-6">
          {/* Header Bar */}
          <div className="space-y-3 border-b border-border-hairline pb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-primary-fixed text-on-primary-fixed font-mono text-xs font-bold">
                  {currentExercise.number}
                </span>
                <span className="text-xs font-bold text-text-muted">
                  {currentExercise.unit}
                </span>
              </div>

              {/* 1-Click AI Tutor Button */}
              <button
                type="button"
                onClick={() =>
                  onOpenTutor(
                    `Aufgabe ${currentExercise.number}: ${currentExercise.title}\n${currentExercise.scenario}\n${currentExercise.question}`
                  )
                }
                className="px-3.5 py-1.5 rounded-xl bg-primary-fixed text-on-primary-fixed hover:bg-primary-hover hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span>1-Klick KI-Erklärung</span>
              </button>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-secondary tracking-tight">
              {currentExercise.title}
            </h1>

            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-xl border border-border-hairline">
              {currentExercise.scenario}
            </p>

            <h3 className="text-sm sm:text-base font-extrabold text-secondary pt-1">
              {currentExercise.question}
            </h3>
          </div>

          {/* Exercise Form */}
          {currentExercise.type === 'buchungssatz' && currentExercise.buchungssatz && (
            <div className="space-y-4">
              <BuchungssatzComposer
                correctSoll={currentExercise.buchungssatz.soll}
                correctHaben={currentExercise.buchungssatz.haben}
                expectedEffect={currentExercise.buchungssatz.effect}
                onOpenTutor={() =>
                  onOpenTutor(
                    `Buchungssatz ${currentExercise.number}: ${currentExercise.title}`
                  )
                }
              />
            </div>
          )}

          {currentExercise.type === 'multiple_choice' && currentExercise.mcOptions && (
            <div className="space-y-3">
              {currentExercise.mcOptions.map((opt) => {
                const isSelected = mcChoice === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMcChoice(opt.id)}
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

              <button
                type="button"
                disabled={!mcChoice}
                onClick={handleCheckMultipleChoice}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover disabled:bg-surface-variant disabled:text-text-muted text-white font-bold text-sm shadow-sm transition-colors mt-2"
              >
                Antwort prüfen
              </button>
            </div>
          )}

          {currentExercise.type === 'calculation' && currentExercise.calculationFields && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentExercise.calculationFields.map((field) => (
                  <div
                    key={field.id}
                    className="p-4 rounded-xl bg-surface-container-low border border-border-hairline space-y-2"
                  >
                    <label className="text-xs font-bold text-secondary">
                      {field.label}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ergebnis eintragen..."
                        value={calcInputs[field.id] || ''}
                        onChange={(e) =>
                          setCalcInputs({
                            ...calcInputs,
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

              <button
                type="button"
                onClick={handleCheckCalculation}
                className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-sm transition-colors mt-2"
              >
                Ergebnisse prüfen
              </button>
            </div>
          )}

          {/* Feedback alert */}
          {feedback && (
            <div
              className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-200 ${
                feedback.isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {feedback.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Richtig!</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-5 h-5 text-rose-600" />
                    <span>Hinweis:</span>
                  </>
                )}
              </div>
              <p className="text-xs leading-relaxed">{feedback.message}</p>
            </div>
          )}

          {/* JLU Lehrmeinung Box */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-border-hairline space-y-1">
            <div className="text-[11px] font-bold uppercase text-secondary tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-primary" />
              <span>JLU Gießen Notiz / HGB Verweis:</span>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">
              {currentExercise.jluNotes}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
