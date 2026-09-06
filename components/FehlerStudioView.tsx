'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  Lightbulb,
  Calculator,
  Bolt,
  Circle,
  CheckCircle,
  Brain,
  FileText,
  Download,
  HelpCircle,
  Info,
} from 'lucide-react';
import { HandwrittenNotesModal } from './HandwrittenNotesModal';

export const FehlerStudioView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [understoodIds, setUnderstoodIds] = useState<Record<string, boolean>>({});
  const [isNotesModalOpen, setIsNotesModalOpen] = useState(false);

  // Interactive Tax Decoupler state
  const [bruttoVal, setBruttoVal] = useState<number>(2380);
  const [taxRate, setTaxRate] = useState<number>(19);

  // Interactive Blitz Quiz state
  const [quizSelected, setQuizSelected] = useState<string>('B');

  // Calculation for tax decoupler
  const factor = 1 + taxRate / 100;
  const nettoVal = bruttoVal > 0 ? bruttoVal / factor : 0;
  const taxVal = bruttoVal - nettoVal;

  const toggleUnderstood = (cardId: string) => {
    setUnderstoodIds((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const understoodCount = Object.values(understoodIds).filter(Boolean).length;
  const totalEliminated = 6 + understoodCount;
  const progressPercent = Math.min(100, Math.round((totalEliminated / 17) * 100));

  const filterCategories = [
    { id: 'all', label: 'Alle Schwachstellen (17)' },
    { id: 'bilanz', label: 'Bilanz vs. GuV (4)' },
    { id: 'steuer', label: 'Steuerberechnung (3)' },
    { id: 'anzahlungen', label: 'Anzahlungen (3)' },
    { id: 'erfolg', label: 'Erfolgswirksamkeit (4)' },
    { id: 'buchung', label: 'Buchungssätze (3)' },
  ];

  return (
    <div className="flex flex-col w-full gap-6 pb-12">
      
      {/* Interactive Navigation & Context Bar */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-surface p-6 rounded-xl border border-border-hairline shadow-sm">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-primary text-white font-bold text-xs uppercase tracking-wider">
              JLU WiWi Tutor
            </span>
            <span className="text-xs text-text-muted">Diagnose- &amp; Trainingszentrum FB 02</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">
            Rabias Fehler-Studio – Folge 1 bis 3 meistern
          </h1>
          <p className="text-xs sm:text-sm text-on-surface-variant">
            Basierend auf deinen handschriftlichen Übungsabgaben &amp; Fehlerprotokollen der Tutorien.
          </p>
        </div>

        {/* Metric Callout & Progress Ring */}
        <div className="flex items-center gap-4 bg-surface-variant px-4 py-3 rounded-xl border border-border-hairline shrink-0">
          <div className="relative flex items-center justify-center w-14 h-14">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-secondary-container stroke-current"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeWidth="3.5"
              />
              <path
                className="text-success stroke-current"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                strokeDasharray={`${progressPercent}, 100`}
                strokeLinecap="round"
                strokeWidth="3.5"
              />
            </svg>
            <span className="absolute font-mono text-xs font-bold text-secondary">
              {progressPercent}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs sm:text-sm text-text-primary">
              {totalEliminated} von 17 eliminiert
            </span>
            <span className="text-xs text-text-muted">
              {17 - totalEliminated} Klausurfallen noch aktiv
            </span>
          </div>
        </div>
      </div>

      {/* Filter Pill Bar */}
      <div className="flex flex-wrap items-center gap-2">
        {filterCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all border ${
                isActive
                  ? 'bg-secondary text-white border-secondary shadow-xs'
                  : 'bg-surface-variant text-on-surface-variant border-border-hairline hover:bg-secondary-fixed hover:text-on-secondary-fixed'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Grid: Error Cards and Exam Side-Widget */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Main Error Deep-Dives (8 of 12 cols on desktop) */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {/* Card 1: Extern vs Intern */}
          {(activeCategory === 'all' || activeCategory === 'bilanz') && (
            <div className="bg-surface rounded-xl p-5 sm:p-6 border border-border-hairline shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-surface-variant text-secondary font-mono text-xs font-bold border border-border-hairline">
                    Aufgabe 1.1 &amp; 1.3
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-secondary">
                    Externes vs. Internes Rechnungswesen
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] uppercase">
                  Schwerpunkt Ewelt-Knauer
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rabia's Past Fallacy */}
                <div className="bg-error-container p-4 rounded-lg flex flex-col gap-2 border border-red-200">
                  <div className="flex items-center gap-1.5 text-on-error-container font-bold text-xs uppercase tracking-wider">
                    <span className="text-error font-black text-sm">✕</span>
                    <span>Häufiger Denkfehler von Rabia</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-error-container italic leading-relaxed">
                    „Externes RW prüft die Wirtschaftlichkeit der Produktion und die interne Zahlungsfähigkeit der Abteilungen.“
                  </p>
                  <div className="mt-auto pt-2 text-[11px] text-error font-medium border-t border-red-200/60">
                    Notiert am 14. Okt im Folienskript zu Folge 1.
                  </div>
                </div>

                {/* Academic Gold Standard */}
                <div className="bg-success-container p-4 rounded-lg flex flex-col gap-2 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-on-success-container font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Exakte JLU-Klausur-Logik</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-success-container leading-relaxed">
                    <strong className="font-bold text-success">FALSCH!</strong> Externes RW (HGB) dient ausschließlich der <strong className="font-bold">Dokumentation, Rechenschaftslegung für Dritte</strong> (Banken, Finanzamt) und dem <strong className="font-bold">Gläubigerschutz</strong>.
                  </p>
                  <div className="mt-auto pt-2 text-[11px] text-on-success-container font-medium border-t border-emerald-200/60">
                    Wirtschaftlichkeit &amp; Kostenstellenrechnung gehören zwingend ins <em>Interne RW</em> (KLR bei Prof. Dr. Wöhrmann)!
                  </div>
                </div>
              </div>

              {/* T-Konto Conceptual Anchor */}
              <div className="bg-surface-variant p-3 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-border-hairline">
                <div className="flex items-center gap-2 text-xs">
                  <Lightbulb className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-text-primary">
                    Merksatz: <strong className="font-bold">HGB = Schutz nach außen</strong> | <strong className="font-bold">KLR = Steuerung nach innen</strong>
                  </span>
                </div>
                <button
                  onClick={() => toggleUnderstood('card-1')}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all border shrink-0 ${
                    understoodIds['card-1']
                      ? 'bg-success-container text-success border-success'
                      : 'bg-surface hover:bg-secondary-fixed text-primary border-border-hairline'
                  }`}
                >
                  {understoodIds['card-1'] ? 'Als verstanden markiert ✓' : 'Verstanden markieren'}
                </button>
              </div>
            </div>
          )}

          {/* Card 2: Bilanzverlängerung bei Bankdarlehen */}
          {(activeCategory === 'all' || activeCategory === 'buchung' || activeCategory === 'bilanz') && (
            <div className="bg-surface rounded-xl p-5 sm:p-6 border border-border-hairline shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-surface-variant text-secondary font-mono text-xs font-bold border border-border-hairline">
                    Aufgabe 1.5
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-secondary">
                    Bilanzverlängerung bei Bankdarlehen
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-bold text-[10px] uppercase">
                  Bilanzwirksam
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rabia's Past Fallacy */}
                <div className="bg-error-container p-4 rounded-lg flex flex-col gap-2 border border-red-200">
                  <div className="flex items-center gap-1.5 text-on-error-container font-bold text-xs uppercase tracking-wider">
                    <span className="text-error font-black text-sm">✕</span>
                    <span>Häufiger Denkfehler von Rabia</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-error-container italic leading-relaxed">
                    „Kreditaufnahme von 30.000 € ist ein Passivtausch, weil es reine Schulden gegenüber der Bank sind.“
                  </p>
                  <div className="mt-auto pt-2 text-[11px] text-error font-medium border-t border-red-200/60">
                    Verwechslung: Verbindlichkeitenaustausch vs. Mittelzufluss.
                  </div>
                </div>

                {/* Academic Gold Standard */}
                <div className="bg-success-container p-4 rounded-lg flex flex-col gap-2 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-on-success-container font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Exakte JLU-Klausur-Logik</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-success-container leading-relaxed">
                    <strong className="font-bold text-success">FALSCH!</strong> Das Bankkonto wächst (+Aktiva) und gleichzeitig die Verbindlichkeit (+Passiva).
                  </p>
                  <div className="mt-auto pt-2 text-xs text-on-success-container font-medium border-t border-emerald-200/60">
                    <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded text-text-primary border border-border-hairline">
                      Bank an Verb. Kreditinst. 30.000 €
                    </span>{' '}
                    ➔ Eindeutige <strong className="font-bold">Bilanzverlängerung</strong>!
                  </div>
                </div>
              </div>

              {/* Ledger Formula Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-surface-container-low p-3.5 rounded-lg border border-border-hairline">
                <div className="bg-surface p-3 rounded border border-border-hairline shadow-2xs">
                  <span className="text-[10px] font-bold text-primary uppercase block mb-1">
                    Aktiva: Bank (Soll)
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-success font-bold">
                    + 30.000,00 € (Mittelverwendung)
                  </span>
                </div>
                <div className="bg-surface p-3 rounded border border-border-hairline shadow-2xs">
                  <span className="text-[10px] font-bold text-secondary uppercase block mb-1">
                    Passiva: Verb. ggü. KI (Haben)
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-secondary font-bold">
                    + 30.000,00 € (Mittelherkunft)
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => toggleUnderstood('card-2')}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all border shrink-0 ${
                    understoodIds['card-2']
                      ? 'bg-success-container text-success border-success'
                      : 'bg-surface hover:bg-secondary-fixed text-primary border-border-hairline'
                  }`}
                >
                  {understoodIds['card-2'] ? 'Als verstanden markiert ✓' : 'Verstanden markieren'}
                </button>
              </div>
            </div>
          )}

          {/* Card 3: Steuer im Preis vs Netto (With Interactive Calculator) */}
          {(activeCategory === 'all' || activeCategory === 'steuer') && (
            <div className="bg-surface rounded-xl p-5 sm:p-6 border border-border-hairline shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-surface-variant text-secondary font-mono text-xs font-bold border border-border-hairline">
                    Aufgabe 2.3
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-secondary">
                    Umsatzsteuer: Im Bruttobetrag vs. Aufschlag
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-error-container text-error font-bold text-[10px] uppercase">
                  Häufigster JLU Klausurfehler
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rabia's Past Fallacy */}
                <div className="bg-error-container p-4 rounded-lg flex flex-col gap-2 border border-red-200">
                  <div className="flex items-center gap-1.5 text-on-error-container font-bold text-xs uppercase tracking-wider">
                    <span className="text-error font-black text-sm">✕</span>
                    <span>Häufiger Denkfehler von Rabia</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-error-container italic leading-relaxed">
                    „Wenn eine Ware brutto 2.380 € kostet, zieht man 19% ab: 2.380 € × 0,19 = 452,20 € Vorsteuer.“
                  </p>
                  <div className="mt-auto pt-2 text-[11px] text-error font-medium border-t border-red-200/60">
                    Gravierender Rechenfehler im Buchungssatz!
                  </div>
                </div>

                {/* Academic Gold Standard */}
                <div className="bg-success-container p-4 rounded-lg flex flex-col gap-2 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-on-success-container font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Exakte JLU-Klausur-Logik</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-success-container leading-relaxed">
                    <strong className="font-bold text-success">GROSSER FEHLER!</strong> Im Bruttobetrag entsprechen die 2.380 € bereits <strong className="font-bold">119%</strong>.
                  </p>
                  <div className="mt-auto pt-2 text-xs text-on-success-container font-medium border-t border-emerald-200/60">
                    Formel: <code className="font-mono bg-surface px-1 py-0.5 rounded border">2.380 € / 1,19 = 2.000 € (Netto)</code>. Steueranteil = genau <strong className="font-bold">380,00 €</strong>!
                  </div>
                </div>
              </div>

              {/* Interactive JLU Tax Decoupler Tool */}
              <div className="bg-surface-container-low p-4 rounded-lg border border-border-hairline flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-primary" />
                    <span className="font-bold text-xs sm:text-sm text-text-primary">
                      Interaktiver JLU Steuer-Entflechter
                    </span>
                  </div>

                  <div className="flex items-center bg-surface-variant p-0.5 rounded-full border border-border-hairline">
                    <button
                      type="button"
                      onClick={() => setTaxRate(19)}
                      className={`px-3 py-1 rounded-full font-mono text-xs font-bold transition-all ${
                        taxRate === 19
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-on-surface-variant hover:text-text-primary'
                      }`}
                    >
                      19% Regel
                    </button>
                    <button
                      type="button"
                      onClick={() => setTaxRate(7)}
                      className={`px-3 py-1 rounded-full font-mono text-xs font-bold transition-all ${
                        taxRate === 7
                          ? 'bg-primary text-white shadow-xs'
                          : 'text-on-surface-variant hover:text-text-primary'
                      }`}
                    >
                      7% Ermäßigt
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-bold text-on-surface-variant uppercase" htmlFor="bruttoInput">
                      Bruttobetrag (€)
                    </label>
                    <input
                      id="bruttoInput"
                      type="number"
                      step="10"
                      value={bruttoVal}
                      onChange={(e) => setBruttoVal(parseFloat(e.target.value) || 0)}
                      className="w-full bg-surface border border-border-hairline px-3 py-2 rounded font-mono text-xs sm:text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary shadow-2xs font-bold"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase">
                      Nettowert (Warenwert)
                    </span>
                    <div className="bg-surface border border-border-hairline px-3 py-2 rounded font-mono text-xs sm:text-sm text-secondary font-bold shadow-2xs">
                      {nettoVal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-[11px] font-bold text-on-surface-variant uppercase">
                      Enthaltene USt / VSt
                    </span>
                    <div className="bg-surface border border-border-hairline px-3 py-2 rounded font-mono text-xs sm:text-sm text-tertiary font-bold shadow-2xs">
                      {taxVal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-text-muted text-[11px]">
                  <Info className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>JLU-Klausurtipp: Vorsteuer (VSt) ist eine Forderung ans Finanzamt (Aktivkonto), Umsatzsteuer (USt) eine Verbindlichkeit (Passivkonto).</span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => toggleUnderstood('card-3')}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all border shrink-0 ${
                    understoodIds['card-3']
                      ? 'bg-success-container text-success border-success'
                      : 'bg-surface hover:bg-secondary-fixed text-primary border-border-hairline'
                  }`}
                >
                  {understoodIds['card-3'] ? 'Als verstanden markiert ✓' : 'Verstanden markieren'}
                </button>
              </div>
            </div>
          )}

          {/* Card 4: Geleistete Anzahlungen */}
          {(activeCategory === 'all' || activeCategory === 'anzahlungen') && (
            <div className="bg-surface rounded-xl p-5 sm:p-6 border border-border-hairline shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-surface-variant text-secondary font-mono text-xs font-bold border border-border-hairline">
                    Aufgabe 2.2 &amp; 2.4
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-secondary">
                    Geleistete Anzahlungen vs. Sofortige Aktivierung
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px] uppercase">
                  Gefahrenübergang
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-error-container p-4 rounded-lg flex flex-col gap-2 border border-red-200">
                  <div className="flex items-center gap-1.5 text-on-error-container font-bold text-xs uppercase tracking-wider">
                    <span className="text-error font-black text-sm">✕</span>
                    <span>Häufiger Denkfehler von Rabia</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-error-container italic leading-relaxed">
                    „Wenn 30% sofort gezahlt werden und 70% Ziel sind, bucht man 30% als Geleistete Anzahlung.“
                  </p>
                </div>

                <div className="bg-success-container p-4 rounded-lg flex flex-col gap-2 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-on-success-container font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Exakte JLU-Klausur-Logik</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-success-container leading-relaxed">
                    <strong className="font-bold text-success">NEIN!</strong> Sobald die Maschine übergeben wurde, wird sie voll auf <strong className="font-bold">BGA</strong> aktiviert. Das Konto <em>Geleistete Anzahlungen</em> (§ 266 HGB) darf NUR verwendet werden, wenn Geld vor der Lieferung fließt!
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => toggleUnderstood('card-4')}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all border shrink-0 ${
                    understoodIds['card-4']
                      ? 'bg-success-container text-success border-success'
                      : 'bg-surface hover:bg-secondary-fixed text-primary border-border-hairline'
                  }`}
                >
                  {understoodIds['card-4'] ? 'Als verstanden markiert ✓' : 'Verstanden markieren'}
                </button>
              </div>
            </div>
          )}

          {/* Card 5: GuV als Unterkonto des EK */}
          {(activeCategory === 'all' || activeCategory === 'erfolg' || activeCategory === 'bilanz') && (
            <div className="bg-surface rounded-xl p-5 sm:p-6 border border-border-hairline shadow-sm flex flex-col gap-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-surface-variant text-secondary font-mono text-xs font-bold border border-border-hairline">
                    Aufgabe 3.1 &amp; 3.2
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-secondary">
                    GuV als Unterkonto des Eigenkapitals
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[10px] uppercase">
                  Erfolgswirksamkeit
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-error-container p-4 rounded-lg flex flex-col gap-2 border border-red-200">
                  <div className="flex items-center gap-1.5 text-on-error-container font-bold text-xs uppercase tracking-wider">
                    <span className="text-error font-black text-sm">✕</span>
                    <span>Häufiger Denkfehler von Rabia</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-error-container italic leading-relaxed">
                    „Aufwand und Ertrag stehen isoliert da und berühren die Bilanz nicht direkt.“
                  </p>
                </div>

                <div className="bg-success-container p-4 rounded-lg flex flex-col gap-2 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-on-success-container font-bold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-success" />
                    <span>Exakte JLU-Klausur-Logik</span>
                  </div>
                  <p className="text-xs sm:text-sm text-on-success-container leading-relaxed">
                    Die GuV ist das <strong className="font-bold">Unterkonto des Eigenkapitals</strong> (Passivseite). Aufwendungen mindern das Eigenkapital im Soll; Erträge mehren es im Haben.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => toggleUnderstood('card-5')}
                  className={`px-3 py-1.5 rounded text-xs font-bold uppercase transition-all border shrink-0 ${
                    understoodIds['card-5']
                      ? 'bg-success-container text-success border-success'
                      : 'bg-surface hover:bg-secondary-fixed text-primary border-border-hairline'
                  }`}
                >
                  {understoodIds['card-5'] ? 'Als verstanden markiert ✓' : 'Verstanden markieren'}
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Sidebar Widget: Rapid Exam Quiz & Tutor Insights (4 of 12 cols) */}
        <div className="xl:col-span-4 flex flex-col gap-6 sticky top-24">
          
          {/* 3-Minuten-Blitz-Check Quiz Card */}
          <div className="bg-surface rounded-xl p-5 sm:p-6 border border-border-hairline shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bolt className="w-5 h-5 text-tertiary" />
                <h3 className="font-bold text-base sm:text-lg text-secondary">3-Minuten-Blitz-Check</h3>
              </div>
              <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-xs font-bold">
                Folge 2
              </span>
            </div>

            <p className="text-xs sm:text-sm text-text-primary leading-relaxed">
              <em>„Bibi entnimmt Früchte für 340 € aus dem Zentrallager zur Eisherstellung. Welches Konto wird im Haben angesprochen?“</em>
            </p>

            {/* Quiz Options */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => setQuizSelected('A')}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-xs sm:text-sm ${
                  quizSelected === 'A'
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : 'bg-surface-variant border-border-hairline hover:bg-secondary-fixed'
                }`}
              >
                <span>A: Kasse</span>
                <Circle className="w-4 h-4 text-text-muted" />
              </button>

              <button
                type="button"
                onClick={() => setQuizSelected('B')}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-xs sm:text-sm ${
                  quizSelected === 'B'
                    ? 'bg-success-container border-emerald-300 text-on-success-container font-bold shadow-xs'
                    : 'bg-surface-variant border-border-hairline hover:bg-secondary-fixed'
                }`}
              >
                <span>B: Roh-, Hilfs- und Betriebsstoffe (RHB)</span>
                <CheckCircle className="w-4 h-4 text-success" />
              </button>

              <button
                type="button"
                onClick={() => setQuizSelected('C')}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-xs sm:text-sm ${
                  quizSelected === 'C'
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : 'bg-surface-variant border-border-hairline hover:bg-secondary-fixed'
                }`}
              >
                <span>C: Fertige Erzeugnisse</span>
                <Circle className="w-4 h-4 text-text-muted" />
              </button>

              <button
                type="button"
                onClick={() => setQuizSelected('D')}
                className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between text-xs sm:text-sm ${
                  quizSelected === 'D'
                    ? 'bg-rose-50 border-rose-300 text-rose-900'
                    : 'bg-surface-variant border-border-hairline hover:bg-secondary-fixed'
                }`}
              >
                <span>D: Gewinn- und Verlustkonto (GuV)</span>
                <Circle className="w-4 h-4 text-text-muted" />
              </button>
            </div>

            {/* Academic Diagnostic Feedback */}
            <div className="p-3 rounded-lg bg-surface-variant border border-border-hairline flex flex-col gap-1">
              <div className="flex items-center gap-1.5 text-primary">
                <Brain className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase tracking-wider">
                  Didaktik-Erklärung
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                <strong className="text-success font-bold">Korrekt ist B!</strong> Die Früchte stellen Rohstoffe (RHB) dar. Da das Vorratsvermögen sinkt, buchen wir das Aktivkonto im <strong className="font-bold">Haben</strong>. Die Gegenbuchung lautet im Soll <em>„Aufwendungen für Rohstoffe“</em> (GuV-Aufwandskonto).
              </p>
            </div>
          </div>

          {/* Quick Action: Review handwritten PDF scan */}
          <div className="bg-secondary text-white rounded-xl p-5 sm:p-6 shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-tertiary-fixed" />
              <h3 className="font-bold text-base text-white">Handschriftlicher Scan</h3>
            </div>
            <p className="text-xs text-secondary-fixed leading-relaxed">
              Rabias hochgeladene Übungsblätter zu Folge 1–3 mit Dozenten-Korrekturvermerken stehen als PDF bereit.
            </p>
            <button
              type="button"
              onClick={() => setIsNotesModalOpen(true)}
              className="w-full py-2.5 px-4 rounded bg-surface text-secondary hover:bg-surface-variant font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Notiz-Protokoll einsehen</span>
            </button>
          </div>

          {/* Academic Contact Note */}
          <div className="p-4 rounded-xl bg-surface border border-border-hairline flex items-center gap-3 shadow-2xs">
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs sm:text-sm text-text-primary">WiWi-Sprechstunde</span>
              <span className="text-xs text-on-surface-variant">Donnerstags 14:00 Uhr im Licher Str. 68</span>
            </div>
          </div>

        </div>

      </div>

      {/* Notes Modal */}
      <HandwrittenNotesModal
        isOpen={isNotesModalOpen}
        onClose={() => setIsNotesModalOpen(false)}
      />

    </div>
  );
};
