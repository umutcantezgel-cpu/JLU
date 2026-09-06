'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { examSimulations } from '@/data/examSimulationsData';
import { ExamSimulation, Exercise } from '@/data/curriculumTypes';
import { playSuccessSound, playErrorSound, playFanfareSound } from '@/lib/soundEffects';
import {
  Timer,
  Play,
  Pause,
  Award,
  AlertCircle,
  Calculator,
  CheckCircle2,
  XCircle,
  FileCheck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Printer,
  Flag,
  Check,
  HelpCircle,
  FileText,
  User,
  GraduationCap,
  Eye,
  List,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface KlausurSimulatorViewProps {
  initialExamId?: string;
  onOpenTutor?: (context: string) => void;
  onNavigate?: (section: string) => void;
}

export const KlausurSimulatorView: React.FC<KlausurSimulatorViewProps> = ({
  initialExamId,
  onOpenTutor,
  onNavigate,
}) => {
  const [selectedExamId, setSelectedExamId] = useState<string>(initialExamId || 'klausur-1');

  // If initialExamId changes from outside (e.g. from Lernplan)
  useEffect(() => {
    if (initialExamId) {
      setSelectedExamId(initialExamId);
    }
  }, [initialExamId]);

  const currentExam: ExamSimulation = useMemo(() => {
    return examSimulations.find((e) => e.id === selectedExamId) || examSimulations[0];
  }, [selectedExamId]);

  // Exam state
  const [studentName, setStudentName] = useState<string>('Rabia');
  const [studentMatrikel, setStudentMatrikel] = useState<string>('7482910');
  const [isCoverExpanded, setIsCoverExpanded] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'single' | 'sheet'>('single');

  // Timer state
  const [secondsLeft, setSecondsLeft] = useState<number>(currentExam.durationMinutes * 60);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);

  // Student Responses (Stored privately without revealing right/wrong before submission!)
  const [selectedMCOptions, setSelectedMCOptions] = useState<Record<string, string>>({});
  const [calculationInputs, setCalculationInputs] = useState<Record<string, Record<string, string>>>({});
  const [buchungssatzInputs, setBuchungssatzInputs] = useState<
    Record<string, { sollKonto: string; sollBetrag: string; habenKonto: string; habenBetrag: string }>
  >({});
  const [flaggedTasks, setFlaggedTasks] = useState<Record<string, boolean>>({});

  // Submission & Grading state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [submissionTime, setSubmissionTime] = useState<string | null>(null);

  // Reset exam on exam switch or restart
  const resetExam = (examId?: string) => {
    const targetExam = examSimulations.find((e) => e.id === (examId || selectedExamId)) || examSimulations[0];
    setSecondsLeft(targetExam.durationMinutes * 60);
    setIsRunning(true);
    setActiveTaskIndex(0);
    setSelectedMCOptions({});
    setCalculationInputs({});
    setBuchungssatzInputs({});
    setFlaggedTasks({});
    setIsSubmitted(false);
    setShowConfirmModal(false);
    setSubmissionTime(null);
    setIsCoverExpanded(true);
  };

  useEffect(() => {
    resetExam(selectedExamId);
  }, [selectedExamId]);

  // Live Countdown Clock
  useEffect(() => {
    let timer: any = null;
    if (isRunning && !isSubmitted && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, isSubmitted, secondsLeft]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleAutoSubmit = () => {
    setIsRunning(false);
    setIsSubmitted(true);
    setSubmissionTime(new Date().toLocaleTimeString('de-DE'));
    playFanfareSound();
  };

  // Checking task answering status
  const isTaskAnswered = (task: Exercise): boolean => {
    if (task.type === 'multiple_choice') {
      return !!selectedMCOptions[task.id];
    }
    if (task.type === 'calculation') {
      const inputs = calculationInputs[task.id];
      if (!inputs) return false;
      return Object.values(inputs).some((val) => val && val.trim().length > 0);
    }
    if (task.type === 'buchungssatz') {
      const b = buchungssatzInputs[task.id];
      return !!(b && (b.sollKonto || b.sollBetrag || b.habenKonto || b.habenBetrag));
    }
    return false;
  };

  const answeredCount = currentExam.exercises.filter(isTaskAnswered).length;
  const totalTasks = currentExam.exercises.length;

  const toggleFlag = (taskId: string) => {
    setFlaggedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Evaluation algorithm after submission
  const examEvaluation = useMemo(() => {
    if (!isSubmitted) return null;

    let totalEarned = 0;
    const taskEvaluations = currentExam.exercises.map((task) => {
      let earned = 0;
      let userChoiceText = '';
      let isCorrect = false;

      if (task.type === 'multiple_choice') {
        const userChoiceId = selectedMCOptions[task.id];
        const selectedOpt = task.mcOptions?.find((o) => o.id === userChoiceId);
        const correctOpt = task.mcOptions?.find((o) => o.isCorrect);

        userChoiceText = selectedOpt ? selectedOpt.text : 'Keine Antwort ausgewählt';
        if (selectedOpt && selectedOpt.isCorrect) {
          earned = task.points;
          isCorrect = true;
        }

        return {
          task,
          earned,
          maxPoints: task.points,
          isCorrect,
          userChoiceText,
          correctAnswerText: correctOpt?.text || '',
          userChoiceExplanation: selectedOpt?.explanation || '',
          whyIsCorrect:
            correctOpt?.explanation ||
            'Diese Antwort entspricht den Grundsätzen ordnungsmäßiger Buchführung (GoB) und den JLU-Vorlesungsinhalten.',
          jluNotes: task.jluNotes || '',
        };
      }

      if (task.type === 'calculation') {
        const inputs = calculationInputs[task.id] || {};
        const fields = task.calculationFields || [];
        let fieldPoints = 0;
        const pointsPerField = task.points / (fields.length || 1);

        const fieldDetails = fields.map((f) => {
          const rawVal = inputs[f.id] || '';
          const numVal = parseFloat(rawVal.replace(',', '.').trim() || 'NaN');
          const tol = f.tolerance !== undefined ? f.tolerance : 0.05;
          const match = !isNaN(numVal) && Math.abs(numVal - f.correctValue) <= tol;
          if (match) {
            fieldPoints += pointsPerField;
          }
          return {
            label: f.label,
            userVal: rawVal || '–',
            correctVal: `${f.correctValue} ${f.unit || ''}`,
            match,
            explanation: f.explanation || '',
          };
        });

        earned = Math.round(fieldPoints);
        isCorrect = earned === task.points;

        return {
          task,
          earned,
          maxPoints: task.points,
          isCorrect,
          userChoiceText: fieldDetails.map((fd) => `${fd.label}: ${fd.userVal}`).join(' | '),
          correctAnswerText: fieldDetails.map((fd) => `${fd.label}: ${fd.correctVal}`).join(' | '),
          fieldDetails,
          whyIsCorrect:
            fields.map((f) => f.explanation).filter(Boolean).join(' ') ||
            'Rechnerisch ermittelt nach JLU-KLR-Schema.',
          jluNotes: task.jluNotes || '',
        };
      }

      if (task.type === 'buchungssatz') {
        const bInput = buchungssatzInputs[task.id] || { sollKonto: '', sollBetrag: '', habenKonto: '', habenBetrag: '' };
        const bSolution = task.buchungssatz;

        let bPoints = 0;
        const targetSoll = bSolution?.soll?.[0]?.account.toLowerCase() || '';
        const targetHaben = bSolution?.haben?.[0]?.account.toLowerCase() || '';
        const userSoll = bInput.sollKonto.toLowerCase();
        const userHaben = bInput.habenKonto.toLowerCase();

        const sollMatch = userSoll.includes(targetSoll) || targetSoll.includes(userSoll);
        const habenMatch = userHaben.includes(targetHaben) || targetHaben.includes(userHaben);

        if (sollMatch && habenMatch && (bInput.sollBetrag || bInput.habenBetrag)) {
          bPoints = task.points;
          isCorrect = true;
        } else if (sollMatch || habenMatch) {
          bPoints = Math.round(task.points * 0.5);
        }

        earned = bPoints;
        const sollText = bSolution?.soll?.map((s) => `${s.account} ${s.amount} €`).join(', ');
        const habenText = bSolution?.haben?.map((h) => `${h.account} ${h.amount} €`).join(', ');

        return {
          task,
          earned,
          maxPoints: task.points,
          isCorrect,
          userChoiceText: `Soll: ${bInput.sollKonto || '–'} (${bInput.sollBetrag || '0'} €) an Haben: ${bInput.habenKonto || '–'} (${bInput.habenBetrag || '0'} €)`,
          correctAnswerText: `${sollText} an ${habenText}`,
          whyIsCorrect: bSolution?.explanation || 'Buchungssatz nach HGB GoB.',
          jluNotes: task.jluNotes || '',
        };
      }

      return {
        task,
        earned: 0,
        maxPoints: task.points,
        isCorrect: false,
        userChoiceText: '–',
        correctAnswerText: '–',
        whyIsCorrect: '',
        jluNotes: task.jluNotes || '',
      };
    });

    totalEarned = taskEvaluations.reduce((acc, t) => acc + t.earned, 0);
    const pct = Math.round((totalEarned / (currentExam.totalPoints || 1)) * 100);

    let grade = '5,0';
    let gradeLabel = 'Nicht ausreichend (Nicht bestanden)';
    let isPassed = false;

    if (pct >= 95) {
      grade = '1,0';
      gradeLabel = 'Sehr gut (Hervorragend)';
      isPassed = true;
    } else if (pct >= 90) {
      grade = '1,3';
      gradeLabel = 'Sehr gut';
      isPassed = true;
    } else if (pct >= 85) {
      grade = '1,7';
      gradeLabel = 'Gut';
      isPassed = true;
    } else if (pct >= 80) {
      grade = '2,0';
      gradeLabel = 'Gut';
      isPassed = true;
    } else if (pct >= 75) {
      grade = '2,3';
      gradeLabel = 'Gut';
      isPassed = true;
    } else if (pct >= 70) {
      grade = '2,7';
      gradeLabel = 'Befriedigend';
      isPassed = true;
    } else if (pct >= 65) {
      grade = '3,0';
      gradeLabel = 'Befriedigend';
      isPassed = true;
    } else if (pct >= 60) {
      grade = '3,3';
      gradeLabel = 'Befriedigend';
      isPassed = true;
    } else if (pct >= 55) {
      grade = '3,7';
      gradeLabel = 'Ausreichend';
      isPassed = true;
    } else if (pct >= 50) {
      grade = '4,0';
      gradeLabel = 'Ausreichend (Bestanden)';
      isPassed = true;
    }

    return {
      totalEarned,
      maxPoints: currentExam.totalPoints,
      percentage: pct,
      grade,
      gradeLabel,
      isPassed,
      taskEvaluations,
    };
  }, [isSubmitted, currentExam, selectedMCOptions, calculationInputs, buchungssatzInputs]);

  // Handle final submission confirmation
  const handleConfirmSubmit = () => {
    setShowConfirmModal(false);
    setIsRunning(false);
    setIsSubmitted(true);
    setSubmissionTime(new Date().toLocaleTimeString('de-DE'));
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const passed = (answeredCount / totalTasks) >= 0.5;
    if (passed) {
      playFanfareSound();
    } else {
      playErrorSound();
    }
  };

  return (
    <div className="flex flex-col w-full gap-8 pb-32">
      {/* 1. Exam Selection Tabs (Apple Segmented Bar) */}
      <div className="apple-card p-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {examSimulations.map((exam) => (
            <button
              key={exam.id}
              type="button"
              onClick={() => {
                if (!isSubmitted && answeredCount > 0) {
                  if (confirm('Achtung: Beim Wechseln der Klausur gehen ungespeicherte Eingaben verloren. Fortfahren?')) {
                    setSelectedExamId(exam.id);
                  }
                } else {
                  setSelectedExamId(exam.id);
                }
              }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 active:scale-[0.98] ${
                selectedExamId === exam.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-black/[0.04]'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{exam.title.split(':')[0]}</span>
              <span className="opacity-60 text-[10px]">({exam.durationMinutes}m)</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-2 shrink-0">
          <button
            type="button"
            onClick={() => window.print()}
            className="p-2 rounded-full bg-black/[0.04] hover:bg-black/[0.07] active:scale-[0.98] text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            title="Klausur als DIN A4 drucken oder als PDF speichern"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span className="hidden md:inline">DIN A4 Drucken / PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Top Sticky Live Exam HUD Bar (Apple Island style) */}
      <div className="sticky top-16 z-30 apple-glass rounded-2xl p-4 sm:p-5 border border-black/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-wrap items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
            JLU
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-[#0071e3] tracking-tight">
                {isSubmitted ? 'Prüfungsgutachten' : 'Klausur-Modus (Verzögerte Auswertung)'}
              </span>
              <span className="px-2 py-0.2 rounded-full bg-black/[0.05] text-[10px] font-mono font-medium text-slate-600">
                {currentExam.totalPoints} P
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-semibold text-[#1d1d1f] leading-tight truncate max-w-xs sm:max-w-md">
              {currentExam.title}
            </h2>
          </div>
        </div>

        {/* Center: Timer & Status */}
        <div className="flex items-center gap-3">
          {!isSubmitted ? (
            <div className="flex items-center gap-2.5 bg-[#f5f5f7] px-4 py-2 rounded-full border border-black/[0.04]">
              <Timer className={`w-4 h-4 ${secondsLeft < 600 ? 'text-[#ff3b30] animate-pulse' : 'text-[#0071e3]'}`} />
              <div className="flex flex-col">
                <span className="text-[9px] font-semibold uppercase text-slate-400 tracking-wider">
                  Restzeit
                </span>
                <span
                  className={`font-mono text-base sm:text-lg font-bold ${
                    secondsLeft < 600 ? 'text-[#ff3b30]' : 'text-slate-900'
                  }`}
                >
                  {formatTime(secondsLeft)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsRunning(!isRunning)}
                className="ml-1 p-1 rounded-full bg-white hover:bg-slate-100 text-slate-700 shadow-2xs transition-colors"
                title={isRunning ? 'Klausur-Uhr pausieren' : 'Klausur-Uhr fortsetzen'}
              >
                {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 bg-[#eafaf1] text-emerald-950 px-3.5 py-1.5 rounded-full border border-[#34c759]/30">
              <Award className="w-4 h-4 text-[#34c759]" />
              <span className="text-xs font-semibold">
                Note: {examEvaluation?.grade} ({examEvaluation?.totalEarned}/{currentExam.totalPoints} P)
              </span>
            </div>
          )}

          {/* Answered Counter Pill */}
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-[10px] font-semibold uppercase text-slate-400">Stand</span>
            <span className="text-xs font-mono font-medium text-slate-700">
              {answeredCount} von {totalTasks} gelöst
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="hidden lg:flex items-center bg-black/[0.04] p-1 rounded-full border border-black/[0.04]">
            <button
              type="button"
              onClick={() => setViewMode('single')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                viewMode === 'single' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Einzelfrage</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('sheet')}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                viewMode === 'sheet' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <List className="w-3 h-3" />
              <span>Klausurbogen</span>
            </button>
          </div>

          {/* Submit Action Button */}
          {!isSubmitted ? (
            <button
              type="button"
              onClick={() => setShowConfirmModal(true)}
              className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] text-white font-medium text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2"
            >
              <FileCheck className="w-4 h-4 text-amber-200" />
              <span>Klausur abgeben</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => resetExam()}
              className="px-4 py-2 rounded-full bg-black/[0.05] hover:bg-black/[0.08] active:scale-[0.98] text-slate-800 font-medium text-xs transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Klausur wiederholen</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Question Navigation Strip (Pill Bar) */}
      {!isSubmitted && (
        <div className="apple-card p-3 flex items-center justify-between gap-2 overflow-x-auto scrollbar-none print:hidden">
          <div className="flex items-center gap-1.5">
            {currentExam.exercises.map((task, idx) => {
              const isActive = idx === activeTaskIndex;
              const answered = isTaskAnswered(task);
              const flagged = !!flaggedTasks[task.id];

              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => setActiveTaskIndex(idx)}
                  className={`min-w-[42px] h-9 px-2.5 rounded-full font-mono text-xs font-semibold transition-all flex items-center justify-center gap-1 shrink-0 active:scale-[0.97] ${
                    isActive
                      ? 'bg-[#0071e3] text-white shadow-xs'
                      : answered
                      ? 'bg-[#edf5fe] text-[#0071e3] border border-[#0071e3]/20'
                      : 'bg-[#f5f5f7] text-slate-700 hover:bg-slate-200/80'
                  }`}
                  title={`${task.number}: ${task.title} (${task.points} P)`}
                >
                  <span>{task.number.replace('Aufgabe ', 'A')}</span>
                  {flagged ? (
                    <Flag className="w-3 h-3 text-amber-500 fill-amber-500" />
                  ) : answered ? (
                    <Check className="w-3 h-3 text-[#0071e3]" />
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-500 px-3 shrink-0 hidden sm:flex">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#0071e3] inline-block" /> Beantwortet
            </span>
            <span className="flex items-center gap-1">
              <Flag className="w-3 h-3 text-amber-500 fill-amber-500" /> Markiert
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-slate-300 inline-block" /> Offen
            </span>
          </div>
        </div>
      )}

      {/* 4. THE AUTHENTIC DIN A4 PAPER SHEET CONTAINER (Apple PDF style) */}
      <div className="max-w-[850px] mx-auto w-full bg-white text-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.04)] rounded-3xl border border-black/[0.06] p-7 sm:p-12 md:p-14 transition-all print:shadow-none print:border-none print:p-0 print:max-w-none print:w-full">
        {/* Official JLU Header */}
        <div className="border-b-2 border-slate-900 pb-6 mb-8 text-center space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-500">
            <span>Justus-Liebig-Universität Gießen</span>
            <span>Fachbereich 02 Wirtschaftswissenschaften</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-slate-900 pt-1">
            Modulklausur: {currentExam.title}
          </h1>

          <div className="text-xs text-slate-700 font-sans space-y-0.5">
            <p><strong>Prüfer:</strong> {currentExam.examiners}</p>
            <p className="text-[11px] text-slate-500 font-mono">
              {currentExam.semester} · Zeit: {currentExam.durationMinutes} Minuten · Gesamt: {currentExam.totalPoints} Punkte
            </p>
          </div>
        </div>

        {/* Klausur-Deckblatt (Collapsible Cover Sheet) */}
        <div className="mb-8 p-5 sm:p-6 bg-[#fafafc] border border-black/[0.05] rounded-2xl space-y-4">
          <div
            onClick={() => setIsCoverExpanded(!isCoverExpanded)}
            className="flex items-center justify-between cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-slate-700" />
              <span className="font-semibold text-xs text-slate-900 uppercase tracking-wider">
                Prüflingsangaben &amp; Klausurordnung
              </span>
            </div>
            <button type="button" className="text-slate-500 p-1">
              {isCoverExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          {isCoverExpanded && (
            <div className="space-y-4 pt-2 border-t border-black/[0.04]">
              {/* Student Fields: Apple style inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">
                    Name des Prüflings
                  </label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="z.B. Rabia"
                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0071e3]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">
                    Matrikelnummer
                  </label>
                  <input
                    type="text"
                    value={studentMatrikel}
                    onChange={(e) => setStudentMatrikel(e.target.value)}
                    placeholder="z.B. 7482910"
                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0071e3]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold uppercase text-slate-500 block mb-1">
                    Studiengang
                  </label>
                  <input
                    type="text"
                    defaultValue="B.Sc. Wirtschaftswissenschaften"
                    className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-700 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Instructions text */}
              <div className="text-[11px] text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-black/[0.04] space-y-1">
                <p className="font-semibold text-slate-800">Bearbeitungshinweise:</p>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  <li>Prüfungsbogen umfasst {currentExam.exercises.length} Aufgaben.</li>
                  <li>Kein Punktabzug bei Fehlern (kein Minus-Scoring). Alle Aufgaben ausfüllen!</li>
                  <li>Die detaillierte Auswertung und Notenberechnung erfolgt nach der Abgabe.</li>
                </ul>
              </div>

              {/* Points Matrix Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-[11px] border-collapse border border-slate-200 text-center rounded-xl overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100 font-semibold text-slate-700">
                      <th className="border border-slate-200 p-1.5">Aufgabe</th>
                      {currentExam.exercises.map((t) => (
                        <th key={t.id} className="border border-slate-200 p-1.5">
                          {t.number.replace('Aufgabe ', 'A')}
                        </th>
                      ))}
                      <th className="border border-slate-200 p-1.5 bg-slate-200">Gesamt</th>
                      <th className="border border-slate-200 p-1.5 bg-slate-200">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 p-1.5 font-semibold text-slate-600">Max.</td>
                      {currentExam.exercises.map((t) => (
                        <td key={t.id} className="border border-slate-200 p-1.5 text-slate-600">
                          {t.points}
                        </td>
                      ))}
                      <td className="border border-slate-200 p-1.5 font-bold">{currentExam.totalPoints}</td>
                      <td className="border border-slate-200 p-1.5 font-bold">100%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="border border-slate-200 p-1.5 font-semibold text-slate-900">Erreicht</td>
                      {currentExam.exercises.map((t) => {
                        const evalItem = examEvaluation?.taskEvaluations.find((te) => te.task.id === t.id);
                        return (
                          <td key={t.id} className="border border-slate-200 p-1.5 font-mono font-bold">
                            {isSubmitted && evalItem ? evalItem.earned : '–'}
                          </td>
                        );
                      })}
                      <td className="border border-slate-200 p-1.5 font-mono font-bold text-[#0071e3]">
                        {isSubmitted && examEvaluation ? examEvaluation.totalEarned : '–'}
                      </td>
                      <td className="border border-slate-200 p-1.5 font-mono font-bold text-[#0071e3]">
                        {isSubmitted && examEvaluation ? examEvaluation.grade : '–'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* 5. POST-SUBMISSION DETAILED REPORT (Apple Health style) */}
        {isSubmitted && examEvaluation && (
          <div className="mb-12 p-6 sm:p-8 rounded-3xl bg-[#fafafc] border border-black/[0.06] space-y-6 shadow-xs animate-in fade-in-50 duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.05] pb-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#34c759]/15 text-[#0e4e20] font-semibold text-xs">
                    Offizielles Klausurgutachten
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    Abgabe: {submissionTime || 'Heute'}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-[#1d1d1f] tracking-tight">
                  Klausurergebnis für {studentName} ({studentMatrikel})
                </h3>
              </div>

              {/* Grade Callout */}
              <div className="flex items-center gap-4 bg-white px-6 py-3.5 rounded-2xl border border-black/[0.06] shadow-2xs">
                <div className="text-right">
                  <span className="text-[10px] font-semibold uppercase text-slate-400 tracking-wider">
                    Ermittelte Note
                  </span>
                  <div className="text-xs font-semibold text-[#34c759]">{examEvaluation.gradeLabel}</div>
                </div>
                <div className="text-4xl sm:text-5xl font-mono font-bold text-[#0071e3]">
                  {examEvaluation.grade}
                </div>
              </div>
            </div>

            {/* Score & Benchmark bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="bg-white p-4 rounded-2xl border border-black/[0.05] shadow-2xs">
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Erreichte Punkte
                </span>
                <div className="text-2xl font-mono font-bold text-slate-900 mt-1">
                  {examEvaluation.totalEarned} / {currentExam.totalPoints}
                </div>
                <span className="text-xs text-slate-500">({examEvaluation.percentage}%)</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-black/[0.05] shadow-2xs">
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Bestehensgrenze (50%)
                </span>
                <div className="text-2xl font-mono font-bold mt-1">
                  {examEvaluation.isPassed ? (
                    <span className="text-[#34c759] flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-6 h-6" /> BESTANDEN
                    </span>
                  ) : (
                    <span className="text-[#ff3b30] flex items-center justify-center gap-1.5">
                      <XCircle className="w-6 h-6" /> NICHT BESTANDEN
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500">Mindestens {currentExam.passingScore} Punkte</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-black/[0.05] shadow-2xs">
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                  Aufgabenübersicht
                </span>
                <div className="text-2xl font-mono font-bold text-slate-900 mt-1">
                  {examEvaluation.taskEvaluations.filter((t) => t.isCorrect).length} / {totalTasks}
                </div>
                <span className="text-xs text-slate-500">Korrekt gelöst</span>
              </div>
            </div>

            {/* Qualitative Feedback */}
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-5 rounded-2xl border border-black/[0.05] shadow-2xs">
              <strong className="text-slate-900 font-semibold block mb-1">
                Didaktisches Gutachten der Professuren:
              </strong>
              {examEvaluation.percentage >= 80 ? (
                <p>
                  Hervorragende Leistung! Du beherrschst sowohl die Buchungslogik nach HGB (Prof. Ewelt-Knauer) als auch die
                  Kosten- und Leistungsrechnung (Prof. Wöhrmann) auf überdurchschnittlichem Niveau. Rabias WhatsApp-Fallen
                  wurden sicher umschifft.
                </p>
              ) : examEvaluation.percentage >= 50 ? (
                <p>
                  Solide Leistung, die Klausur ist bestanden! Allerdings gibt es in Einzelfragen (z.B. Rechnungsabgrenzungsposten,
                  Anzahlungen oder der BAB-Zuschlagskalkulation) noch punktuelle Unsicherheiten. Nutze unten die didaktische
                  Auflösung „Warum wie was ist“ und den 1-Klick KI-Tutor mit Thinking!
                </p>
              ) : (
                <p>
                  Das Ergebnis reicht noch nicht ganz zum Bestehen. Häufigste Fehlerquellen: Verwechslung von Vorsteuer (§ 15 UStG)
                  und Umsatzsteuer, das Gezeichnete Kapital fälschlich als Vermögen gewertet oder die Formel für den relativen
                  Deckungsbeitrag nicht angewendet. Gehe Phase 1 des Lernplans nochmals gezielt durch!
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs transition-all flex items-center gap-1.5 active:scale-[0.98]"
              >
                <Printer className="w-4 h-4" />
                <span>Gutachten drucken / PDF</span>
              </button>

              {onNavigate && (
                <button
                  type="button"
                  onClick={() => onNavigate('lernplan')}
                  className="px-4 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs transition-all flex items-center gap-1.5 active:scale-[0.98]"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Zum Lernplan</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* 6. EXAM BODY: QUESTIONS (Single View or Full Sheet View) */}
        <div className="space-y-12">
          {currentExam.exercises.map((task, idx) => {
            if (viewMode === 'single' && !isSubmitted && idx !== activeTaskIndex) {
              return null;
            }

            const evalItem = examEvaluation?.taskEvaluations.find((te) => te.task.id === task.id);
            const isFlagged = !!flaggedTasks[task.id];

            return (
              <div
                key={task.id}
                id={`task-${task.id}`}
                className={`space-y-6 pt-6 first:pt-0 ${
                  idx !== 0 ? 'border-t border-slate-200' : ''
                }`}
              >
                {/* Task Header Bar */}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-black text-lg text-slate-900">
                        {task.number}: {task.title}
                      </span>
                      <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                        {task.points} Punkte
                      </span>
                      <span className="text-xs text-slate-500 font-sans hidden sm:inline">
                        · {task.professor}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 uppercase tracking-wider block">
                      {task.unit}
                    </span>
                  </div>

                  {/* Flag action / Evaluation Status */}
                  <div className="flex items-center gap-2">
                    {!isSubmitted ? (
                      <button
                        type="button"
                        onClick={() => toggleFlag(task.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 active:scale-[0.98] ${
                          isFlagged
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-black/[0.04] text-slate-600 hover:bg-black/[0.07]'
                        }`}
                        title="Frage zur Wiedervorlage vormerken"
                      >
                        <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                        <span>{isFlagged ? 'Markiert' : 'Merken'}</span>
                      </button>
                    ) : evalItem ? (
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-full font-mono text-xs font-bold flex items-center gap-1.5 ${
                            evalItem.earned === task.points
                              ? 'bg-[#eafaf1] text-emerald-950 border border-[#34c759]/30'
                              : evalItem.earned > 0
                              ? 'bg-amber-50 text-amber-950 border border-amber-300'
                              : 'bg-rose-50 text-rose-950 border border-rose-300'
                          }`}
                        >
                          {evalItem.earned === task.points ? (
                            <CheckCircle2 className="w-4 h-4 text-[#34c759]" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-600" />
                          )}
                          <span>
                            {evalItem.earned} / {task.points} Punkte
                          </span>
                        </span>
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Scenario / Case Description */}
                <div className="p-5 rounded-2xl bg-[#fafafc] border border-black/[0.04] text-xs sm:text-sm text-slate-800 font-serif leading-relaxed">
                  <p>{task.scenario}</p>
                </div>

                {/* Question Prompt */}
                <div className="font-sans font-semibold text-sm sm:text-base text-[#1d1d1f]">
                  <p>{task.question}</p>
                </div>

                {/* ------------------------------------------------------------- */}
                {/* INTERACTIVE INPUT FIELD: MULTIPLE CHOICE                      */}
                {/* ------------------------------------------------------------- */}
                {task.type === 'multiple_choice' && task.mcOptions && (
                  <div className="space-y-3 pt-1">
                    {task.mcOptions.map((opt) => {
                      const isSelected = selectedMCOptions[task.id] === opt.id;
                      const isOptionCorrect = opt.isCorrect;

                      let optionStyle = 'border-black/[0.06] bg-[#fafafc] hover:bg-white hover:border-[#0071e3]/40 text-slate-900';
                      if (!isSubmitted) {
                        if (isSelected) {
                          optionStyle = 'border-[#0071e3] bg-[#edf5fe]/80 text-[#003a70] font-medium shadow-2xs ring-1 ring-[#0071e3]';
                        }
                      } else {
                        if (isOptionCorrect) {
                          optionStyle = 'border-[#34c759] bg-[#eafaf1] text-emerald-950 font-medium ring-1 ring-[#34c759]';
                        } else if (isSelected && !isOptionCorrect) {
                          optionStyle = 'border-[#ff3b30] bg-rose-50 text-rose-950 line-through opacity-80';
                        } else {
                          optionStyle = 'border-black/[0.04] bg-[#fafafc] text-slate-500 opacity-60';
                        }
                      }

                      return (
                        <div
                          key={opt.id}
                          onClick={() => {
                            if (!isSubmitted) {
                              setSelectedMCOptions({
                                ...selectedMCOptions,
                                [task.id]: opt.id,
                              });
                            }
                          }}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all text-xs sm:text-sm flex items-start gap-4 active:scale-[0.99] ${
                            !isSubmitted ? 'cursor-pointer' : 'cursor-default'
                          } ${optionStyle}`}
                        >
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? isSubmitted
                                  ? isOptionCorrect
                                    ? 'border-[#34c759] bg-[#34c759] text-white'
                                    : 'border-[#ff3b30] bg-[#ff3b30] text-white'
                                  : 'border-[#0071e3] bg-[#0071e3] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>

                          <div className="space-y-1 flex-1 leading-relaxed">
                            <span>{opt.text}</span>

                            {isSubmitted && opt.explanation && (
                              <p
                                className={`text-[11px] pt-1 font-sans ${
                                  isOptionCorrect ? 'text-emerald-800 font-semibold' : 'text-slate-500 italic'
                                }`}
                              >
                                {isOptionCorrect ? '✓ ' : '✗ '} {opt.explanation}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {!isSubmitted && (
                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 font-mono">
                        <span>
                          {selectedMCOptions[task.id] ? '✓ Antwort im Klausurbogen erfasst' : 'Noch keine Auswahl getroffen'}
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* INTERACTIVE INPUT FIELD: CALCULATION                          */}
                {/* ------------------------------------------------------------- */}
                {task.type === 'calculation' && task.calculationFields && (
                  <div className="space-y-4 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {task.calculationFields.map((field) => {
                        const userVal = calculationInputs[task.id]?.[field.id] || '';
                        const fieldEval = evalItem?.fieldDetails?.find((fd: any) => fd.label === field.label);

                        return (
                          <div
                            key={field.id}
                            className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${
                              isSubmitted
                                ? fieldEval?.match
                                  ? 'bg-[#eafaf1] border-[#34c759]/40'
                                  : 'bg-rose-50 border-rose-300'
                                : 'bg-[#fafafc] border-black/[0.05]'
                            }`}
                          >
                            <label className="text-xs font-semibold text-slate-800 block">
                              {field.label}
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                disabled={isSubmitted}
                                placeholder="Ergebnis eintragen..."
                                value={userVal}
                                onChange={(e) => {
                                  const currentTaskInputs = calculationInputs[task.id] || {};
                                  setCalculationInputs({
                                    ...calculationInputs,
                                    [task.id]: {
                                      ...currentTaskInputs,
                                      [field.id]: e.target.value,
                                    },
                                  });
                                }}
                                className="w-full bg-white border border-slate-200 px-3.5 py-2.5 rounded-xl text-sm font-mono font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-[#0071e3] disabled:bg-slate-100"
                              />
                              {field.unit && (
                                <span className="text-xs font-semibold text-slate-500 shrink-0">
                                  {field.unit}
                                </span>
                              )}
                            </div>

                            {isSubmitted && (
                              <div className="text-[11px] font-mono pt-1 text-slate-600">
                                <span>Soll-Wert: <strong>{field.correctValue} {field.unit || ''}</strong></span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* INTERACTIVE INPUT FIELD: BUCHUNGSSATZ                         */}
                {/* ------------------------------------------------------------- */}
                {task.type === 'buchungssatz' && (
                  <div className="space-y-4 pt-1">
                    <div className="p-5 rounded-2xl bg-[#fafafc] border border-black/[0.05] space-y-3.5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">
                            Soll-Konto (Aktiva / Aufwand)
                          </label>
                          <input
                            type="text"
                            disabled={isSubmitted}
                            placeholder="z.B. Vorräte / BGA / Geleistete Anzahlungen"
                            value={buchungssatzInputs[task.id]?.sollKonto || ''}
                            onChange={(e) => {
                              const curr = buchungssatzInputs[task.id] || { sollKonto: '', sollBetrag: '', habenKonto: '', habenBetrag: '' };
                              setBuchungssatzInputs({
                                ...buchungssatzInputs,
                                [task.id]: { ...curr, sollKonto: e.target.value },
                              });
                            }}
                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium text-slate-900 disabled:bg-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">
                            Soll-Betrag (€)
                          </label>
                          <input
                            type="text"
                            disabled={isSubmitted}
                            placeholder="z.B. 500"
                            value={buchungssatzInputs[task.id]?.sollBetrag || ''}
                            onChange={(e) => {
                              const curr = buchungssatzInputs[task.id] || { sollKonto: '', sollBetrag: '', habenKonto: '', habenBetrag: '' };
                              setBuchungssatzInputs({
                                ...buchungssatzInputs,
                                [task.id]: { ...curr, sollBetrag: e.target.value },
                              });
                            }}
                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-900 disabled:bg-slate-100"
                          />
                        </div>
                      </div>

                      <div className="text-center font-semibold text-slate-400 text-xs py-0.5">
                        — an —
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">
                            Haben-Konto (Passiva / Ertrag / Gegenkonto)
                          </label>
                          <input
                            type="text"
                            disabled={isSubmitted}
                            placeholder="z.B. Bank / Verbindlichkeiten LL"
                            value={buchungssatzInputs[task.id]?.habenKonto || ''}
                            onChange={(e) => {
                              const curr = buchungssatzInputs[task.id] || { sollKonto: '', sollBetrag: '', habenKonto: '', habenBetrag: '' };
                              setBuchungssatzInputs({
                                ...buchungssatzInputs,
                                [task.id]: { ...curr, habenKonto: e.target.value },
                              });
                            }}
                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-medium text-slate-900 disabled:bg-slate-100"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-700 block mb-1">
                            Haben-Betrag (€)
                          </label>
                          <input
                            type="text"
                            disabled={isSubmitted}
                            placeholder="z.B. 500"
                            value={buchungssatzInputs[task.id]?.habenBetrag || ''}
                            onChange={(e) => {
                              const curr = buchungssatzInputs[task.id] || { sollKonto: '', sollBetrag: '', habenKonto: '', habenBetrag: '' };
                              setBuchungssatzInputs({
                                ...buchungssatzInputs,
                                [task.id]: { ...curr, habenBetrag: e.target.value },
                              });
                            }}
                            className="w-full bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-mono font-medium text-slate-900 disabled:bg-slate-100"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ------------------------------------------------------------- */}
                {/* POST-SUBMISSION DETAILED EXPLANATION ("WARUM WIE WAS IST")     */}
                {/* ------------------------------------------------------------- */}
                {isSubmitted && evalItem && (
                  <div className="p-6 rounded-3xl bg-[#edf5fe]/70 border border-[#0071e3]/20 space-y-4 animate-in fade-in-50 duration-200">
                    <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[#0071e3]/15 pb-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#0071e3]" />
                        <span className="font-semibold text-xs uppercase tracking-wider text-slate-900">
                          Didaktische Auflösung: Warum wie was ist
                        </span>
                      </div>

                      {onOpenTutor && (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenTutor(
                              `KLAUSURAUFGABE ${task.number}: ${task.title}\n` +
                                `Sachverhalt: ${task.scenario}\n` +
                                `Frage: ${task.question}\n` +
                                `Meine Antwort: ${evalItem.userChoiceText}\n` +
                                `Musterlösung: ${evalItem.correctAnswerText}\n` +
                                `Erklärung: ${evalItem.whyIsCorrect}\n` +
                                `(Bitte erkläre mir das Schritt für Schritt mit Thinking!)`
                            )
                          }
                          className="px-3.5 py-1.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-2xs active:scale-[0.98]"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>💡 Mit KI-Tutor nachbesprechen</span>
                        </button>
                      )}
                    </div>

                    <div className="space-y-2.5 text-xs leading-relaxed text-slate-800">
                      <div>
                        <strong className="font-semibold text-slate-900 block mb-1">
                          Musterlösung nach JLU &amp; HGB-Standard:
                        </strong>
                        <div className="p-3 bg-white rounded-xl border border-black/[0.06] font-mono font-bold text-[#004080]">
                          {evalItem.correctAnswerText}
                        </div>
                      </div>

                      <div>
                        <strong className="font-semibold text-slate-900 block mb-1">
                          Begründung („Warum wie was ist“):
                        </strong>
                        <p className="bg-white/80 p-3.5 rounded-xl border border-black/[0.06] text-slate-700 leading-relaxed">
                          {evalItem.whyIsCorrect}
                        </p>
                      </div>

                      {evalItem.jluNotes && (
                        <div className="flex items-center gap-2 text-[11px] text-[#0071e3] font-mono pt-1">
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span>Vorlesungsbezug: {evalItem.jluNotes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Pagination for Single Mode during exam */}
        {!isSubmitted && viewMode === 'single' && (
          <div className="flex items-center justify-between gap-4 pt-8 mt-8 border-t border-slate-200 print:hidden">
            <button
              type="button"
              disabled={activeTaskIndex === 0}
              onClick={() => {
                setActiveTaskIndex((prev) => Math.max(0, prev - 1));
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.07] text-slate-700 font-medium text-xs flex items-center gap-1.5 disabled:opacity-40 transition-colors active:scale-[0.98]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Vorherige Aufgabe</span>
            </button>

            <span className="text-xs text-slate-500 font-mono font-medium">
              Aufgabe {activeTaskIndex + 1} von {totalTasks}
            </span>

            <button
              type="button"
              disabled={activeTaskIndex === totalTasks - 1}
              onClick={() => {
                setActiveTaskIndex((prev) => Math.min(totalTasks - 1, prev + 1));
                window.scrollTo({ top: 300, behavior: 'smooth' });
              }}
              className="px-4 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.07] text-slate-700 font-medium text-xs flex items-center gap-1.5 disabled:opacity-40 transition-colors active:scale-[0.98]"
            >
              <span>Nächste Aufgabe</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 7. CONFIRM SUBMISSION MODAL (Apple Sheet style) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-black/[0.06] p-7 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-12 h-12 rounded-2xl bg-[#0071e3]/10 text-[#0071e3] flex items-center justify-center mx-auto shadow-2xs">
              <FileCheck className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1.5">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight">
                Klausur zur Benotung einreichen?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Nach der Abgabe erhältst du dein Prüfungsgutachten mit Note und detaillierter
                didaktischer Herleitung jeder einzelnen Frage.
              </p>
            </div>

            <div className="bg-[#fafafc] p-4 rounded-2xl border border-black/[0.04] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Bearbeitete Aufgaben:</span>
                <span className="font-semibold font-mono text-slate-900">
                  {answeredCount} von {totalTasks}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Unbeantwortet:</span>
                <span className={`font-semibold font-mono ${totalTasks - answeredCount > 0 ? 'text-amber-600' : 'text-[#34c759]'}`}>
                  {totalTasks - answeredCount} Aufgabe(n)
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Verbleibende Prüfungszeit:</span>
                <span className="font-semibold font-mono text-slate-900">
                  {formatTime(secondsLeft)}
                </span>
              </div>

              {totalTasks - answeredCount > 0 && (
                <div className="flex items-start gap-2 bg-amber-50 text-amber-900 p-3 rounded-xl border border-amber-200/60 mt-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="text-[11px] leading-relaxed">
                    Da es keinen Punktabzug gibt, empfiehlt es sich, alle Aufgaben auszufüllen!
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-full bg-black/[0.04] hover:bg-black/[0.07] text-slate-700 font-medium text-xs transition-colors active:scale-[0.98]"
              >
                Weiter bearbeiten
              </button>

              <button
                type="button"
                onClick={handleConfirmSubmit}
                className="flex-1 py-3 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white font-medium text-xs shadow-xs transition-colors active:scale-[0.98]"
              >
                Endgültig abgeben
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
