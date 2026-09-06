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
    <div className="flex flex-col w-full gap-8 pb-24">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-secondary to-blue-950 text-white p-6 sm:p-10 shadow-xl border border-blue-900/30">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 fill-slate-950" />
                18-Tage-Klausurfahrplan
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white font-mono text-xs backdrop-blur-xs">
                FB 02 JLU Gießen · Accounting
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
              Rabias persönlicher Lernplan &amp; Prüfungscountdown
            </h1>

            <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
              Vier maßgeschneiderte Phasen: Von Bibi &amp; Rabias 17 WhatsApp-Klausurfallen über
              die HGB-Finanzbuchführung bis zu Prof. Wöhrmanns KLR und den offiziellen DIN A4-Testsimulationen.
            </p>

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
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-md flex items-center gap-2"
              >
                <Target className="w-4 h-4" />
                <span>Jetzt Teilprüfung 3 (Rabia-Spezial) testen</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/20 flex items-center gap-2"
              >
                <Printer className="w-4 h-4" />
                <span>Lernplan drucken / PDF</span>
              </button>
            </div>
          </div>

          {/* Progress Card */}
          <div className="w-full lg:w-72 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 shrink-0 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Gesamter Lernfortschritt
              </span>
              <span className="font-mono text-lg font-black text-amber-300">
                {progressPercent}%
              </span>
            </div>

            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="text-xs text-blue-100 flex items-center justify-between pt-1">
              <span>{completedCount} von {allTopics.length} Lerneinheiten</span>
              <span>{allTopics.length - completedCount} offen</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Phases of the Curriculum */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-secondary tracking-tight">
              Die 4 Lernphasen bis zum Klausurtag
            </h2>
            <p className="text-xs sm:text-sm text-text-muted">
              Klicke auf die Checkboxen, um deinen täglichen Lernfortschritt zu dokumentieren.
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
              className="text-xs font-bold text-primary hover:underline px-3 py-1.5 rounded-lg bg-surface border border-border-hairline"
            >
              Alle aufklappen
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
              className="text-xs font-bold text-text-muted hover:underline px-3 py-1.5 rounded-lg bg-surface border border-border-hairline"
            >
              Alle einklappen
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
              className="bg-surface rounded-2xl border border-border-hairline shadow-sm overflow-hidden transition-all duration-200"
            >
              {/* Phase Header */}
              <div
                onClick={() => togglePhase(phase.phaseNumber)}
                className="p-5 sm:p-6 cursor-pointer hover:bg-surface-variant/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-hairline select-none"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container text-secondary flex items-center justify-center font-black text-lg shrink-0 shadow-2xs">
                    {phase.phaseNumber}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold text-xs">
                        {phase.timeHorizon}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                        {phase.badge}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-secondary">
                      {phase.phaseTitle}
                    </h3>

                    <p className="text-xs sm:text-sm text-text-muted">{phase.subtitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end md:self-center">
                  <div className="text-right">
                    <span className="text-xs font-mono font-bold text-secondary">
                      {phaseCompleted}/{phaseTopics.length} erledigt
                    </span>
                    <div className="w-24 h-2 bg-surface-variant rounded-full overflow-hidden mt-1">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${phasePercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="p-2 rounded-xl bg-surface-variant text-text-muted hover:text-text-primary"
                  >
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Expanded Phase Content */}
              {isExpanded && (
                <div className="p-5 sm:p-8 space-y-8 bg-surface-container-lowest/50">
                  {/* Phase Description & Target Competencies */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 bg-surface p-5 rounded-2xl border border-border-hairline space-y-3">
                      <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                        <Compass className="w-4 h-4 text-primary" />
                        <span>Fokus &amp; Zielsetzung</span>
                      </div>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {phase.description}
                      </p>
                    </div>

                    <div className="lg:col-span-2 bg-surface p-5 rounded-2xl border border-border-hairline space-y-3">
                      <div className="flex items-center gap-2 text-secondary font-bold text-sm">
                        <GraduationCap className="w-4 h-4 text-primary" />
                        <span>Klausurrelevante Kernkompetenzen</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {phase.targetCompetencies.map((comp, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-on-surface-variant flex items-start gap-2 bg-surface-container-low p-2.5 rounded-xl border border-border-hairline"
                          >
                            <span className="text-primary font-bold shrink-0">•</span>
                            <span className="leading-snug">{comp}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Units in this Phase */}
                  <div className="space-y-6">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-text-muted">
                      Lerneinheiten &amp; Meilenstein-Prüfungen
                    </h4>

                    {phase.units.map((unit) => (
                      <div
                        key={unit.id}
                        className="bg-surface rounded-2xl border border-border-hairline p-5 sm:p-6 shadow-2xs space-y-5"
                      >
                        {/* Unit Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border-hairline pb-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="px-2.5 py-0.5 rounded-lg bg-secondary text-white font-mono text-xs font-bold">
                                {unit.dayRange}
                              </span>
                              <span className="text-xs font-bold text-primary">
                                {unit.focus}
                              </span>
                            </div>
                            <h5 className="text-base sm:text-lg font-black text-secondary">
                              {unit.title}
                            </h5>
                          </div>

                          <div className="flex items-center gap-3 text-xs text-text-muted font-mono shrink-0">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-primary" />
                              <span>{unit.allocatedMinutesPerDay} Min / Tag</span>
                            </div>
                            <span>·</span>
                            <span>{unit.professor}</span>
                          </div>
                        </div>

                        {/* Topics Checklist */}
                        <div className="space-y-2.5">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                            Themen-Checkliste (zum Abhaken):
                          </span>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {unit.topics.map((topic) => {
                              const isChecked = !!completedTopics[topic.id];
                              return (
                                <div
                                  key={topic.id}
                                  onClick={() => toggleTopic(topic.id)}
                                  className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 select-none ${
                                    isChecked
                                      ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950'
                                      : 'bg-surface-container-low hover:bg-surface-variant border-border-hairline text-text-primary'
                                  }`}
                                >
                                  <button
                                    type="button"
                                    className="mt-0.5 text-primary shrink-0 focus:outline-hidden"
                                  >
                                    {isChecked ? (
                                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                                    ) : (
                                      <Circle className="w-5 h-5 text-slate-400" />
                                    )}
                                  </button>

                                  <div className="space-y-1 flex-1">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span
                                        className={`text-xs font-bold leading-tight ${
                                          isChecked ? 'line-through text-emerald-800' : ''
                                        }`}
                                      >
                                        {topic.title}
                                      </span>
                                      {topic.isKeyTrap && (
                                        <span className="px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold text-[10px]">
                                          Rabia-Falle!
                                        </span>
                                      )}
                                      {topic.legalBasis && (
                                        <span className="px-1.5 py-0.2 rounded bg-slate-200 text-slate-800 font-mono text-[10px]">
                                          {topic.legalBasis}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                                      {topic.description}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Milestone Exam Box */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-primary">
                              <Award className="w-4 h-4" />
                              <span>MEILENSTEIN-PRÜFUNG IM DIN A4-SIMULATOR</span>
                            </div>
                            <h6 className="text-sm font-extrabold text-secondary">
                              {unit.milestoneExam.title}
                            </h6>
                            <p className="text-xs text-text-muted">
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
                            className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-xs transition-colors shadow-xs shrink-0 flex items-center gap-2"
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

      {/* Official JLU Exam Strategy Box */}
      <div className="bg-surface rounded-2xl p-6 sm:p-8 border border-border-hairline shadow-sm space-y-4">
        <div className="flex items-center gap-2 text-secondary font-black text-lg">
          <GraduationCap className="w-5 h-5 text-tertiary" />
          <span>Die 5 goldenen Klausurregeln für Accounting (FB 02)</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {examTips.map((tip, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-surface-container-low border border-border-hairline space-y-1.5"
            >
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-secondary text-white font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="font-bold text-xs text-secondary">{tip.title}</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed pl-7">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
