'use client';

import React, { useState, useEffect } from 'react';
import { examSimulations } from '@/data/examSimulationsData';
import { ExamSimulation, Exercise } from '@/data/curriculumTypes';
import { BuchungssatzComposer } from './BuchungssatzComposer';
import { playSuccessSound, playErrorSound, playFanfareSound } from '@/lib/soundEffects';
import {
  Timer,
  Play,
  Pause,
  Award,
  AlertCircle,
  Calculator,
  CheckCircle2,
  FileCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface KlausurSimulatorViewProps {
  onOpenTutor?: (context: string) => void;
}

export const KlausurSimulatorView: React.FC<KlausurSimulatorViewProps> = ({ onOpenTutor }) => {
  const [selectedExamId, setSelectedExamId] = useState<string>('klausur-1');
  const currentExam: ExamSimulation =
    examSimulations.find((e) => e.id === selectedExamId) || examSimulations[0];

  const [secondsLeft, setSecondsLeft] = useState<number>(currentExam.durationMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [showSubmissionModal, setShowSubmissionModal] = useState<boolean>(false);

  // User responses
  const [taskAnswers, setTaskAnswers] = useState<Record<string, any>>({});
  const [taskStatus, setTaskStatus] = useState<Record<string, 'pending' | 'completed'>>({});
  const [calculationInputs, setCalculationInputs] = useState<Record<string, string>>({});
  const [userSelectedOption, setUserSelectedOption] = useState<string | null>(null);

  // Exam Score calculation
  const [earnedPoints, setEarnedPoints] = useState<number>(0);

  // Reset timer on exam switch
  useEffect(() => {
    setSecondsLeft(currentExam.durationMinutes * 60);
    setIsRunning(true);
    setActiveTaskIndex(0);
    setTaskAnswers({});
    setTaskStatus({});
    setCalculationInputs({});
    setUserSelectedOption(null);
  }, [selectedExamId]);

  useEffect(() => {
    let timer: any = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentTask: Exercise = currentExam.exercises[activeTaskIndex];

  const handleCompleteCurrentTask = (earned: number) => {
    playSuccessSound();
    setEarnedPoints((prev) => prev + earned);
    setTaskStatus({ ...taskStatus, [currentTask.id]: 'completed' });
  };

  const handleCheckMultipleChoice = () => {
    if (!currentTask.mcOptions || !userSelectedOption) return;
    const opt = currentTask.mcOptions.find((o) => o.id === userSelectedOption);
    const isCorrect = !!opt?.isCorrect;
    if (isCorrect) {
      handleCompleteCurrentTask(currentTask.points);
    } else {
      playErrorSound();
      setTaskStatus({ ...taskStatus, [currentTask.id]: 'completed' });
    }
  };

  const handleCheckCalculation = () => {
    if (!currentTask.calculationFields) return;
    let earned = 0;
    const pointsPerField = currentTask.points / currentTask.calculationFields.length;

    for (const field of currentTask.calculationFields) {
      const val = parseFloat(calculationInputs[field.id]?.replace(',', '.') || '0');
      const target = field.correctValue;
      const tol = field.tolerance || 0.05;
      if (Math.abs(val - target) <= tol) {
        earned += pointsPerField;
      }
    }

    if (earned > 0) {
      handleCompleteCurrentTask(Math.round(earned));
    } else {
      playErrorSound();
      setTaskStatus({ ...taskStatus, [currentTask.id]: 'completed' });
    }
  };

  const handleFinishExam = () => {
    playFanfareSound();
    setShowSubmissionModal(true);
  };

  const percentage = Math.round((earnedPoints / currentExam.totalPoints) * 100);

  const getGermanGrade = (pct: number): { grade: string; text: string } => {
    if (pct >= 95) return { grade: '1,0', text: 'Sehr gut (Hervorragend)' };
    if (pct >= 90) return { grade: '1,3', text: 'Sehr gut' };
    if (pct >= 85) return { grade: '1,7', text: 'Gut' };
    if (pct >= 80) return { grade: '2,0', text: 'Gut' };
    if (pct >= 75) return { grade: '2,3', text: 'Gut' };
    if (pct >= 70) return { grade: '2,7', text: 'Befriedigend' };
    if (pct >= 65) return { grade: '3,0', text: 'Befriedigend' };
    if (pct >= 60) return { grade: '3,3', text: 'Befriedigend' };
    if (pct >= 55) return { grade: '3,7', text: 'Ausreichend' };
    if (pct >= 50) return { grade: '4,0', text: 'Ausreichend (Bestanden)' };
    return { grade: '5,0', text: 'Nicht ausreichend' };
  };

  const gradeInfo = getGermanGrade(percentage);

  return (
    <div className="flex flex-col w-full gap-6 pb-24">
      {/* Exam Selection Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-surface p-2 rounded-2xl border border-border-hairline shadow-2xs">
        {examSimulations.map((exam) => (
          <button
            key={exam.id}
            type="button"
            onClick={() => setSelectedExamId(exam.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              selectedExamId === exam.id
                ? 'bg-primary text-white shadow-xs'
                : 'bg-surface text-text-primary hover:bg-surface-variant'
            }`}
          >
            {exam.title.split(':')[0]} ({exam.durationMinutes} Min)
          </button>
        ))}
      </div>

      {/* Top Exam Header */}
      <div className="bg-surface rounded-2xl p-5 sm:p-7 border border-border-hairline shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary text-white font-bold text-xs uppercase tracking-wider">
              FB 02 Klausur-Modus
            </span>
            <span className="text-xs text-text-muted font-mono">
              {currentExam.semester} · {currentExam.totalPoints} Punkte
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-secondary tracking-tight">
            {currentExam.title}
          </h1>
          <p className="text-xs sm:text-sm text-text-muted">
            Prüfer: {currentExam.examiners}
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-4 bg-surface-container-low px-5 py-3 rounded-2xl border border-border-hairline shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-text-muted tracking-wider">
              Restzeit
            </span>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-amber-500" />
              <span className="font-mono text-2xl sm:text-3xl font-black text-secondary">
                {formatTime(secondsLeft)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="p-2.5 rounded-xl bg-surface hover:bg-secondary-container text-text-primary border border-border-hairline transition-colors shadow-2xs"
            title={isRunning ? 'Pause' : 'Fortsetzen'}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Task Navigator Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {currentExam.exercises.map((task, idx) => {
          const isActive = idx === activeTaskIndex;
          const isDone = taskStatus[task.id] === 'completed';

          return (
            <button
              key={task.id}
              type="button"
              onClick={() => {
                setActiveTaskIndex(idx);
                setUserSelectedOption(null);
              }}
              className={`p-3 rounded-xl border text-left flex flex-col gap-1 transition-all ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/30'
                  : isDone
                  ? 'bg-emerald-50 text-emerald-950 border-emerald-200'
                  : 'bg-surface text-text-primary border-border-hairline hover:bg-surface-variant'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold uppercase">
                <span>{task.number}</span>
                <span>{task.points} P</span>
              </div>
              <span className="text-xs font-semibold truncate leading-snug">
                {task.title}
              </span>
              <div className="mt-0.5 flex items-center gap-1 text-[10px]">
                {isDone ? (
                  <span className="flex items-center gap-1 font-bold text-emerald-700">
                    <CheckCircle2 className="w-3 h-3" /> Erledigt
                  </span>
                ) : isActive ? (
                  <span className="font-bold">Aktiv</span>
                ) : (
                  <span className="opacity-60">Offen</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Task Workspace */}
      <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border-hairline shadow-sm space-y-6">
        {/* Task Title & Meta */}
        <div className="space-y-3 border-b border-border-hairline pb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-primary-fixed text-on-primary-fixed font-mono text-xs font-bold">
                {currentTask.number}
              </span>
              <h2 className="text-lg sm:text-xl font-black text-secondary">
                {currentTask.title}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-surface-container-high text-secondary font-bold">
                {currentTask.points} Punkte · {currentTask.professor}
              </span>
              {onOpenTutor && (
                <button
                  type="button"
                  onClick={() =>
                    onOpenTutor(
                      `KLAUSURFRAGE ${currentTask.number}: ${currentTask.title}\n${currentTask.scenario}\n${currentTask.question}\n(Bitte hilf mir didaktisch ohne die Lösung sofort vorzusagen!)`
                    )
                  }
                  className="px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>💡 KI-Klausurhelfer</span>
                </button>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-xl border border-border-hairline">
            {currentTask.scenario}
          </p>

          <h3 className="text-sm sm:text-base font-extrabold text-secondary">
            {currentTask.question}
          </h3>
        </div>

        {/* Task Input Section depending on Exercise Type */}
        {currentTask.type === 'buchungssatz' && currentTask.buchungssatz && (
          <BuchungssatzComposer
            correctSoll={currentTask.buchungssatz.soll}
            correctHaben={currentTask.buchungssatz.haben}
            expectedEffect={currentTask.buchungssatz.effect}
            onSuccess={() => handleCompleteCurrentTask(currentTask.points)}
            onFail={() => playErrorSound()}
            onOpenTutor={() =>
              onOpenTutor?.(`Buchungssatz ${currentTask.number}: ${currentTask.title}`)
            }
          />
        )}

        {currentTask.type === 'multiple_choice' && currentTask.mcOptions && (
          <div className="space-y-3">
            {currentTask.mcOptions.map((opt) => {
              const isSelected = userSelectedOption === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setUserSelectedOption(opt.id)}
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
              disabled={!userSelectedOption}
              onClick={handleCheckMultipleChoice}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover disabled:bg-surface-variant disabled:text-text-muted text-white font-bold text-sm shadow-sm transition-colors mt-2"
            >
              Antwort für Aufgabe speichern &amp; prüfen
            </button>
          </div>
        )}

        {currentTask.type === 'calculation' && currentTask.calculationFields && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentTask.calculationFields.map((field) => (
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

            <button
              type="button"
              onClick={handleCheckCalculation}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-sm transition-colors mt-2 flex items-center justify-center gap-2"
            >
              <Calculator className="w-4 h-4" />
              <span>Berechnungen einreichen</span>
            </button>
          </div>
        )}

        {/* Footer Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border-hairline">
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeTaskIndex === 0}
              onClick={() => {
                setActiveTaskIndex(activeTaskIndex - 1);
                setUserSelectedOption(null);
              }}
              className="px-4 py-2.5 rounded-xl bg-surface-variant text-text-primary font-bold text-xs hover:bg-surface-container-high transition-colors disabled:opacity-40 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Vorherige</span>
            </button>
            <button
              type="button"
              disabled={activeTaskIndex === currentExam.exercises.length - 1}
              onClick={() => {
                setActiveTaskIndex(activeTaskIndex + 1);
                setUserSelectedOption(null);
              }}
              className="px-4 py-2.5 rounded-xl bg-surface-variant text-text-primary font-bold text-xs hover:bg-surface-container-high transition-colors disabled:opacity-40 flex items-center gap-1"
            >
              <span>Nächste</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleFinishExam}
            className="px-6 py-3 rounded-xl bg-secondary hover:bg-secondary-hover text-white font-extrabold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            <span>Klausur zur Benotung abgeben</span>
          </button>
        </div>
      </div>

      {/* Official JLU Grading & Evaluation Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-lg rounded-2xl shadow-2xl border border-border-hairline overflow-hidden p-6 sm:p-8 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-8 h-8" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-secondary">
                Klausur erfolgreich ausgewertet!
              </h3>
              <p className="text-xs text-text-muted">
                FB 02 Justus-Liebig-Universität Gießen · {currentExam.title}
              </p>
            </div>

            <div className="bg-surface-container-low p-5 rounded-2xl border border-border-hairline text-center space-y-2">
              <span className="text-xs font-bold uppercase text-text-muted tracking-wider">
                Ermittelte Klausurnote
              </span>
              <div className="text-4xl sm:text-5xl font-black text-primary">
                {gradeInfo.grade}
              </div>
              <div className="text-xs font-bold text-secondary">{gradeInfo.text}</div>
              <p className="text-xs text-text-muted pt-1">
                Erreichte Punkte: <strong>{earnedPoints}</strong> von {currentExam.totalPoints} Punkten ({percentage}%)
              </p>
            </div>

            <div className="text-xs text-text-primary space-y-1.5 leading-relaxed bg-surface-variant p-4 rounded-xl border border-border-hairline">
              <strong className="font-bold text-secondary">Didaktisches Feedback:</strong>
              <p>
                {percentage >= 70
                  ? 'Klasse Leistung! Du hast das Zusammenspiel aus Buchungssätzen und Kostenrechnung nach JLU-Standard verinnerlicht.'
                  : 'Gute Basis! Wiederhole die spezifischen Buchungssätze (Anzahlungen, Vorsteuer, RAP) im Fehlerstudio und nutze den 1-Klick KI-Tutor.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowSubmissionModal(false)}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-sm transition-colors"
            >
              Ergebnis speichern &amp; schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
