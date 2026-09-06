'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

export const KlausurSimulatorView: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState<number>(5385); // ~89 min 45 sec
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(3); // Task 4: BAB
  const [showSubmissionModal, setShowSubmissionModal] = useState<boolean>(false);

  // BAB Inputs
  const [mgkzInput, setMgkzInput] = useState<string>('12.5');
  const [fgkzInput, setFgkzInput] = useState<string>('145.0');
  const [vwgkzInput, setVwgkzInput] = useState<string>('8.2');
  const [vtgkzInput, setVtgkzInput] = useState<string>('6.4');
  const [isBabChecked, setIsBabChecked] = useState<boolean>(false);

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

  const tasks = [
    { id: 1, title: 'Aufgabe 1: Grundlagen & Bilanzarten', points: 15, status: 'completed' },
    { id: 2, title: 'Aufgabe 2: Wareneinkauf & Vorsteuer', points: 20, status: 'completed' },
    { id: 3, title: 'Aufgabe 3: Personalaufwand & GuV', points: 15, status: 'completed' },
    { id: 4, title: 'Aufgabe 4: KLR - Betriebsabrechnungsbogen (BAB)', points: 20, status: 'in_progress' },
    { id: 5, title: 'Aufgabe 5: Zuschlagskalkulation Kostenträger', points: 10, status: 'pending' },
    { id: 6, title: 'Aufgabe 6: GuV-Abschluss & Bilanz', points: 10, status: 'pending' },
  ];

  return (
    <div className="flex flex-col w-full gap-6 pb-20">
      
      {/* Top Exam Header */}
      <div className="bg-surface rounded-xl p-5 sm:p-6 border border-border-hairline shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-secondary text-white font-bold text-xs uppercase tracking-wider">
              FB 02 Klausur-Modus
            </span>
            <span className="text-xs text-text-muted">Wintersemester 2024/25 · 90 Punkte</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight mt-1">
            JLU Probeklausur: Buchführung &amp; Kostenrechnung
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Prüfer: Prof. Dr. Corinna Ewelt-Knauer &amp; Prof. Dr. Arnt Wöhrmann
          </p>
        </div>

        {/* Live Countdown Clock */}
        <div className="flex items-center gap-4 bg-surface-variant px-5 py-3 rounded-xl border border-border-hairline shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase text-text-muted">Restzeit</span>
            <div className="flex items-center gap-2">
              <Timer className="w-5 h-5 text-tertiary" />
              <span className="font-mono text-2xl font-bold text-secondary">
                {formatTime(secondsLeft)}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsRunning(!isRunning)}
            className="p-2 rounded-lg bg-surface hover:bg-secondary-fixed text-text-primary border border-border-hairline transition-colors"
            title={isRunning ? 'Pause' : 'Fortsetzen'}
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Task Navigator Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {tasks.map((task, idx) => {
          const isActive = idx === activeTaskIndex;
          return (
            <button
              key={task.id}
              onClick={() => setActiveTaskIndex(idx)}
              className={`p-3 rounded-lg border text-left flex flex-col gap-1 transition-all ${
                isActive
                  ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/30'
                  : task.status === 'completed'
                  ? 'bg-success-container text-on-success-container border-emerald-200'
                  : 'bg-surface text-text-primary border-border-hairline hover:bg-surface-variant'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold uppercase">
                <span>Teil {task.id}</span>
                <span>{task.points} P</span>
              </div>
              <span className="text-xs font-semibold truncate leading-snug">
                {task.title.split(':')[1]}
              </span>
              <div className="mt-1 flex items-center gap-1 text-[10px]">
                {task.status === 'completed' ? (
                  <span className="flex items-center gap-1 font-bold">
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

      {/* Active Task Workspace (Example: Task 4 BAB) */}
      <div className="bg-surface rounded-xl p-6 border border-border-hairline shadow-sm space-y-6">
        
        {/* Task Title & Scenario */}
        <div className="space-y-2 border-b border-border-hairline pb-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-secondary">
              Aufgabe 4: Betriebsabrechnungsbogen (BAB) &amp; Gemeinkostenzuschlagssätze
            </h2>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold">
              20 Punkte · Professur Wöhrmann
            </span>
          </div>
          <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
            In der Manufaktur der <em>N.Icecream GmbH</em> wurden im vergangenen Abrechnungsmonat folgende primäre Gemeinkosten erfasst und verteilt. Führen Sie die Gemeinkostenzuschlagskalkulation durch und ermitteln Sie die exakten Zuschlagssätze.
          </p>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs border border-border-hairline rounded-lg">
            <thead className="bg-surface-variant text-text-muted uppercase text-[10px] font-bold">
              <tr>
                <th className="p-3">Kostenstelle</th>
                <th className="p-3">Gemeinkosten (€)</th>
                <th className="p-3">Zuschlagsbasis</th>
                <th className="p-3">Wert der Basis (€)</th>
                <th className="p-3">Zuschlagssatz (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-hairline bg-surface">
              <tr>
                <td className="p-3 font-sans font-bold text-text-primary">1. Materialbereich</td>
                <td className="p-3 font-bold text-secondary">25.000,00 €</td>
                <td className="p-3 font-sans text-on-surface-variant">Fertigungsmaterial (FM)</td>
                <td className="p-3">200.000,00 €</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={mgkzInput}
                      onChange={(e) => setMgkzInput(e.target.value)}
                      className="w-20 bg-surface-variant border border-border-hairline px-2 py-1 rounded text-right font-bold text-text-primary"
                    />
                    <span>%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-bold text-text-primary">2. Fertigungsbereich</td>
                <td className="p-3 font-bold text-secondary">217.500,00 €</td>
                <td className="p-3 font-sans text-on-surface-variant">Fertigungslöhne (FL)</td>
                <td className="p-3">150.000,00 €</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={fgkzInput}
                      onChange={(e) => setFgkzInput(e.target.value)}
                      className="w-20 bg-surface-variant border border-border-hairline px-2 py-1 rounded text-right font-bold text-text-primary"
                    />
                    <span>%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-bold text-text-primary">3. Verwaltung</td>
                <td className="p-3 font-bold text-secondary">48.585,00 €</td>
                <td className="p-3 font-sans text-on-surface-variant">Herstellkosten d. Erzeugung</td>
                <td className="p-3">592.500,00 €</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={vwgkzInput}
                      onChange={(e) => setVwgkzInput(e.target.value)}
                      className="w-20 bg-surface-variant border border-border-hairline px-2 py-1 rounded text-right font-bold text-text-primary"
                    />
                    <span>%</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-bold text-text-primary">4. Vertrieb</td>
                <td className="p-3 font-bold text-secondary">37.920,00 €</td>
                <td className="p-3 font-sans text-on-surface-variant">Herstellkosten d. Umsatzes</td>
                <td className="p-3">592.500,00 €</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <input
                      type="text"
                      value={vtgkzInput}
                      onChange={(e) => setVtgkzInput(e.target.value)}
                      className="w-20 bg-surface-variant border border-border-hairline px-2 py-1 rounded text-right font-bold text-text-primary"
                    />
                    <span>%</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Calculation & Check Area */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsBabChecked(!isBabChecked)}
              className="px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover transition-colors flex items-center gap-2 shadow-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>Ergebnisse prüfen</span>
            </button>
            <button
              onClick={() => {
                setMgkzInput('12.5');
                setFgkzInput('145.0');
                setVwgkzInput('8.2');
                setVtgkzInput('6.4');
                setIsBabChecked(false);
              }}
              className="px-4 py-2.5 rounded-lg bg-surface-variant text-text-primary font-semibold text-xs hover:bg-secondary-container transition-colors border border-border-hairline"
            >
              Zurücksetzen
            </button>
          </div>

          <button
            onClick={() => setShowSubmissionModal(true)}
            className="px-6 py-2.5 rounded-lg bg-secondary text-white font-bold text-xs sm:text-sm hover:bg-primary transition-colors flex items-center gap-2 shadow-sm"
          >
            <FileCheck className="w-4 h-4" />
            <span>Klausur zur Benotung abgeben</span>
          </button>
        </div>

        {/* Feedback Banner if checked */}
        {isBabChecked && (
          <div className="p-4 rounded-xl bg-success-container text-on-success-container border border-emerald-300 space-y-2 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 font-bold text-sm text-success">
              <CheckCircle2 className="w-5 h-5" />
              <span>Volle Punktzahl: 20 / 20 Punkte erreicht!</span>
            </div>
            <p className="text-xs leading-relaxed">
              Exzellent berechnet, Rabia! Alle vier Zuschlagssätze stimmen exakt mit der JLU-Musterlösung überein:
              <br />
              • Material: 25.000 / 200.000 = <strong>12,50%</strong>
              <br />
              • Fertigung: 217.500 / 150.000 = <strong>145,00%</strong>
              <br />
              • Verwaltung: 48.585 / 592.500 = <strong>8,20%</strong>
              <br />
              • Vertrieb: 37.920 / 592.500 = <strong>6,40%</strong>
            </p>
          </div>
        )}

      </div>

      {/* Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-lg rounded-xl shadow-xl overflow-hidden border border-border-hairline animate-in fade-in zoom-in-95 duration-200 p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-success-container text-success flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-xl font-bold text-secondary">
                Probeklausur erfolgreich bewertet!
              </h3>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                FB 02 Justus-Liebig-Universität Gießen · WS 2024/25
              </p>
            </div>

            <div className="bg-surface-variant p-4 rounded-xl border border-border-hairline text-center space-y-2">
              <span className="text-xs font-bold uppercase text-text-muted tracking-wider">
                Vorläufige Klausurnote
              </span>
              <div className="text-4xl font-black text-primary">1,7 (Gut)</div>
              <p className="text-xs text-on-surface-variant">
                Erreichte Punkte: <strong>76 von 90 Punkten</strong> (84,4%)
              </p>
            </div>

            <div className="text-xs text-text-primary space-y-1.5 leading-relaxed bg-surface-container-low p-3.5 rounded-lg border border-border-hairline">
              <strong className="font-semibold text-secondary">Feedback der Korrektur-Kommission:</strong>
              <p>
                Starke Leistung im KLR-Teil (BAB fehlerfrei!). Im Buchführungsteil ist die Unterscheidung zwischen geleisteten Anzahlungen und sofortiger Aktivierung nach Gefahrenübergang weiter zu festigen.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowSubmissionModal(false)}
                className="px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-xs sm:text-sm hover:bg-primary-hover transition-colors w-full"
              >
                Ergebnisse im Dashboard speichern
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
