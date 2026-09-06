'use client';

import React, { useState, useEffect } from 'react';
import {
  jluLernplan,
  examTips,
  LernplanPhase,
  LernplanUnit,
} from '@/data/lernplanData';
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Award,
  Sparkles,
  BookOpen,
  ArrowRight,
  GraduationCap,
  FileText,
  AlertTriangle,
  Calculator,
  ChevronDown,
  ChevronUp,
  Target,
  Flame,
  Printer,
  Compass,
  Smile,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface LernplanViewProps {
  onNavigate: (section: string, param?: string) => void;
  onOpenTutor?: (context: string) => void;
  onStartExam?: (examId: string) => void;
}

export const LernplanView: React.FC<LernplanViewProps> = ({
  onNavigate,
  onOpenTutor,
  onStartExam,
}) => {
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});
  const [expandedPhases, setExpandedPhases] = useState<Record<number, boolean>>({
    1: true,
    2: false,
    3: false,
    4: false,
  });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rabia_lernplan_completed');
      if (saved) {
        setCompletedTopics(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not read lernplan progress from localStorage', e);
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    const updated = {
      ...completedTopics,
      [topicId]: !completedTopics[topicId],
    };
    setCompletedTopics(updated);
    try {
      localStorage.setItem('rabia_lernplan_completed', JSON.stringify(updated));
    } catch (e) {
      console.warn('Could not save lernplan progress', e);
    }
  };

  const togglePhase = (phaseNumber: number) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseNumber]: !prev[phaseNumber],
    }));
  };

  // Calculate total and completed topic count
  const allTopics: string[] = [];
  jluLernplan.forEach((phase) => {
    phase.units.forEach((u) => {
      u.topics.forEach((t) => allTopics.push(t.id));
    });
  });

  const completedCount = allTopics.filter((id) => !!completedTopics[id]).length;
  const progressPercent = Math.round((completedCount / (allTopics.length || 1)) * 100);

  return (
    <div className="flex flex-col w-full gap-10 pb-28">
      {/* 1. Hero Banner: Apple Keynote Style (Warm, airy, minimal, stress-free) */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-black/[0.06] p-7 sm:p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.03)] transition-all">
        {/* Subtle decorative background ambient glow */}
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 bg-gradient-to-br from-[#0071e3]/10 via-[#5856d6]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold text-xs tracking-tight flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                18-Tage-Klausurplan
              </span>
              <span className="px-3 py-1 rounded-full bg-black/[0.04] text-slate-600 font-medium text-xs">
                FB 02 JLU Gießen · Accounting
              </span>
            </div>

            {/* Apple-style typography */}
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-tight">
              Rabias strukturierter Lernplan.
              <span className="block text-slate-400 font-normal text-xl sm:text-2xl mt-1">
                Klarheit statt Klausurstress.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#515154] leading-relaxed">
              In 4 überschaubaren Schritten zur Note 1,0: Von den 17 handschriftlichen
              WhatsApp-Klausurfallen über die HGB-Finanzbuchführung bis zur KLR und den offiziellen DIN A4-Simulationen.
            </p>

            {/* Apple Action Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  if (onStartExam) {
                    onStartExam('klausur-4');
                  } else {
                    onNavigate('klausur');
                  }
                }}
                className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] text-white font-medium text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                <span>Rabia-Spezial Prüfung starten</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.07] active:scale-[0.98] text-slate-700 font-medium text-xs sm:text-sm transition-all flex items-center gap-2 border border-black/[0.04]"
              >
                <Printer className="w-4 h-4 text-slate-500" />
                <span>Lernplan drucken / PDF</span>
              </button>
            </div>
          </div>

          {/* Apple Health / Activity Style Progress Ring Card */}
          <div className="w-full lg:w-72 bg-[#fafafc] rounded-2xl p-6 border border-black/[0.06] shrink-0 flex flex-col gap-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Fortschritt
              </span>
              <span className="font-mono text-xl font-bold text-[#0071e3]">
                {progressPercent}%
              </span>
            </div>

            <div className="w-full h-2.5 bg-black/[0.06] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#0071e3] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="text-xs text-slate-500 flex items-center justify-between pt-1">
              <span>{completedCount} von {allTopics.length} Einheiten</span>
              <span className="font-medium text-slate-700">{allTopics.length - completedCount} offen</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Stress-Reduction Guide: "In 3 Schritten entspannt durch den Tag" */}
      <div className="rounded-3xl bg-gradient-to-r from-[#edf5fe] to-[#f5f5f7] border border-[#0071e3]/15 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2 text-[#0071e3] font-semibold text-xs uppercase tracking-wider">
            <Smile className="w-4 h-4" />
            <span>Klausur-Entlastung</span>
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-[#1d1d1f]">
            Wie lernt man hier am besten ohne Überforderung?
          </h3>
          <p className="text-xs sm:text-sm text-[#515154] leading-relaxed">
            Niemand muss stundenlang pauken: <strong>45 bis 60 Minuten am Tag</strong> genügen völlig.
            Lies kurz Rabias Notiz durch, mach 3 Buchungssätze in der Arena und teste dich einmal die Woche im DIN A4-Simulator.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('rabia_notes')}
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 active:scale-[0.98] text-[#1d1d1f] font-medium text-xs shadow-2xs border border-black/[0.06] transition-all flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-[#0071e3]" />
            <span>Rabias Notizen aufrufen</span>
          </button>
        </div>
      </div>

      {/* 3. The 4 Phases of the Curriculum (Apple Card Stack with generous padding) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4 px-1">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-[-0.02em] text-[#1d1d1f]">
              Die 4 Lernphasen
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Hake erledigte Themen einfach ab. Dein Fortschritt bleibt automatisch gespeichert.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                setExpandedPhases({
                  1: true,
                  2: true,
                  3: true,
                  4: true,
                })
              }
              className="text-xs font-medium text-[#0071e3] hover:underline px-3 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-2xs transition-all"
            >
              Alle öffnen
            </button>
            <button
              type="button"
              onClick={() =>
                setExpandedPhases({
                  1: false,
                  2: false,
                  3: false,
                  4: false,
                })
              }
              className="text-xs font-medium text-slate-500 hover:underline px-3 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-2xs transition-all"
            >
              Alle schließen
            </button>
          </div>
        </div>

        {jluLernplan.map((phase) => {
          const isExpanded = !!expandedPhases[phase.phaseNumber];
          const phaseTopics = phase.units.flatMap((u) => u.topics.map((t) => t.id));
          const phaseCompleted = phaseTopics.filter((id) => !!completedTopics[id]).length;
          const phasePercent = Math.round((phaseCompleted / (phaseTopics.length || 1)) * 100);

          return (
            <div
              key={phase.phaseNumber}
              className="apple-card overflow-hidden transition-all duration-300"
            >
              {/* Phase Header: Apple interactive card banner */}
              <div
                onClick={() => togglePhase(phase.phaseNumber)}
                className="p-6 sm:p-8 cursor-pointer hover:bg-black/[0.015] active:bg-black/[0.03] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-black/[0.05] select-none"
              >
                <div className="flex items-start gap-5">
                  {/* Apple number badge */}
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center font-bold text-base shrink-0 border border-black/[0.04]">
                    {phase.phaseNumber}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold text-xs">
                        {phase.timeHorizon}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60 font-medium text-xs">
                        {phase.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-semibold text-[#1d1d1f] tracking-tight">
                      {phase.phaseTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                      {phase.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 self-end md:self-center">
                  <div className="text-right">
                    <span className="text-xs font-mono font-medium text-slate-600">
                      {phaseCompleted}/{phaseTopics.length} erledigt
                    </span>
                    <div className="w-28 h-1.5 bg-black/[0.06] rounded-full overflow-hidden mt-1.5">
                      <div
                        className="h-full bg-[#0071e3] rounded-full transition-all duration-500"
                        style={{ width: `${phasePercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-black/[0.04] text-slate-600 flex items-center justify-center shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Phase Content */}
              {isExpanded && (
                <div className="p-6 sm:p-8 md:p-10 space-y-8 bg-[#fafafc]">
                  {/* Competency & Focus Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-black/[0.05] space-y-2.5 shadow-2xs">
                      <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs tracking-tight">
                        <Compass className="w-4 h-4 text-[#0071e3]" />
                        <span>Fokus &amp; Ziel dieser Phase</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {phase.description}
                      </p>
                    </div>

                    <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-black/[0.05] space-y-3 shadow-2xs">
                      <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs tracking-tight">
                        <ShieldCheck className="w-4 h-4 text-[#34c759]" />
                        <span>Wichtige Prüfungskompetenzen</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {phase.targetCompetencies.map((comp, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-slate-700 flex items-start gap-2 bg-[#f5f5f7] p-3 rounded-xl"
                          >
                            <span className="text-[#0071e3] font-bold shrink-0">•</span>
                            <span className="leading-snug">{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Units in this Phase */}
                  <div className="space-y-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1">
                      Lerneinheiten &amp; Aufgaben
                    </h4>

                    {phase.units.map((unit) => (
                      <div
                        key={unit.id}
                        className="bg-white rounded-2xl border border-black/[0.05] p-6 sm:p-7 shadow-2xs space-y-6"
                      >
                        {/* Unit Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/[0.05] pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white font-mono text-xs font-medium">
                                {unit.dayRange}
                              </span>
                              <span className="text-xs font-medium text-[#0071e3]">
                                {unit.focus}
                              </span>
                            </div>
                            <h5 className="text-base sm:text-lg font-semibold text-slate-900">
                              {unit.title}
                            </h5>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-slate-500 shrink-0">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              <span>{unit.allocatedMinutesPerDay} Min / Tag</span>
                            </div>
                            <span>·</span>
                            <span className="truncate">{unit.professor}</span>
                          </div>
                        </div>

                        {/* Topics Checklist (Apple Reminders style) */}
                        <div className="space-y-2.5">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                            Themen zum Abhaken:
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {unit.topics.map((topic) => {
                              const isChecked = !!completedTopics[topic.id];
                              return (
                                <div
                                  key={topic.id}
                                  onClick={() => toggleTopic(topic.id)}
                                  className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3.5 select-none active:scale-[0.99] ${
                                    isChecked
                                      ? 'bg-[#eafaf1]/70 border-[#34c759]/30 text-emerald-950'
                                      : 'bg-[#fafafc] hover:bg-slate-100/70 border-black/[0.04] text-slate-800'
                                  }`}
                                >
                                  {/* Apple Reminders round checkbox */}
                                  <div
                                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                      isChecked
                                        ? 'border-[#34c759] bg-[#34c759] text-white shadow-2xs'
                                        : 'border-slate-300 bg-white hover:border-slate-400'
                                    }`}
                                  >
                                    {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>

                                  <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span
                                        className={`text-xs font-semibold leading-tight ${
                                          isChecked ? 'line-through text-emerald-800 opacity-75' : 'text-slate-900'
                                        }`}
                                      >
                                        {topic.title}
                                      </span>
                                      {topic.isKeyTrap && (
                                        <span className="px-2 py-0.2 rounded-full bg-amber-100 text-amber-900 font-medium text-[10px]">
                                          Rabia-Falle!
                                        </span>
                                      )}
                                      {topic.legalBasis && (
                                        <span className="px-2 py-0.2 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px]">
                                          {topic.legalBasis}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-slate-500 leading-relaxed">
                                      {topic.description}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Milestone Exam Box: Apple Card with direct action */}
                        <div className="bg-[#f0f6fe] border border-[#0071e3]/20 p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0071e3]">
                              <Award className="w-4 h-4" />
                              <span className="tracking-tight">MEILENSTEIN-PRÜFUNG IM DIN A4-SIMULATOR</span>
                            </div>
                            <h6 className="text-sm font-semibold text-slate-900">
                              {unit.milestoneExam.title}
                            </h6>
                            <p className="text-xs text-slate-600">
                              {unit.milestoneExam.description} · Zeit: {unit.milestoneExam.durationMinutes} Min · Ziel:{' '}
                              {unit.milestoneExam.targetScore} P
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (onStartExam) {
                                onStartExam(unit.milestoneExam.examId);
                              } else {
                                onNavigate('klausur', unit.milestoneExam.examId);
                              }
                            }}
                            className="px-5 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] active:scale-[0.98] text-white font-medium text-xs shadow-xs shrink-0 flex items-center gap-2 transition-all"
                          >
                            <span>Simulation starten</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Golden Exam Rules (Apple Bento Cards) */}
      <div className="apple-card p-6 sm:p-8 md:p-10 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-slate-900 font-semibold text-lg">
            <GraduationCap className="w-5 h-5 text-[#0071e3]" />
            <span>Die 5 goldenen Klausurregeln für Accounting (FB 02)</span>
          </div>
          <p className="text-xs text-slate-500">
            Von den Professuren Ewelt-Knauer und Wöhrmann für maximale Punktzahl empfohlen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {examTips.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#fafafc] border border-black/[0.04] space-y-2 hover:bg-slate-100/60 transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-semibold text-xs text-slate-900 tracking-tight">
                  {tip.title}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-8.5">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
