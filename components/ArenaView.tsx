'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Lightbulb,
  RotateCcw,
  Sparkles,
  Info,
  Scale,
  HelpCircle,
  ArrowDown,
  Bookmark,
} from 'lucide-react';

interface ArenaViewProps {
  onOpenTutor: (context?: string) => void;
}

export const ArenaView: React.FC<ArenaViewProps> = ({ onOpenTutor }) => {
  const [selectedEffect, setSelectedEffect] = useState<'aktivtausch' | 'passivtausch' | 'verlaengerung' | 'verkuerzung'>('verlaengerung');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showCheckToast, setShowCheckToast] = useState(false);
  const [showBookmarkToast, setShowBookmarkToast] = useState(false);

  // Editable amounts
  const [bgaAmount, setBgaAmount] = useState('2.000,00');
  const [vstAmount, setVstAmount] = useState('380,00');
  const [bankAmount, setBankAmount] = useState('714,00');
  const [verbAmount, setVerbAmount] = useState('1.666,00');

  const handleReset = () => {
    setBgaAmount('2.000,00');
    setVstAmount('380,00');
    setBankAmount('714,00');
    setVerbAmount('1.666,00');
    setSelectedEffect('verlaengerung');
  };

  const handleCheck = () => {
    setShowCheckToast(true);
    setTimeout(() => setShowCheckToast(false), 3500);
  };

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    setShowBookmarkToast(true);
    setTimeout(() => setShowBookmarkToast(false), 2500);
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-20">
      
      {/* Top Academic Breadcrumb & Context Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-surface p-3.5 rounded-xl border border-border-hairline shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold uppercase tracking-wider">
            <span>Folge 2: Der Wareneinkauf &amp; Anlagevermögen</span>
          </div>
          <span className="text-text-muted font-mono text-xs">/</span>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-variant text-text-primary text-xs font-semibold border border-border-hairline">
            <span className="text-tertiary font-bold">!</span>
            <span>Rabia Fokus-Thema: Anzahlung vs. Anlage</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-text-muted text-xs">
          <CheckCircle2 className="w-4 h-4 text-success" />
          <span className="font-semibold text-secondary">
            Prof. Dr. Corinna Ewelt-Knauer · Professur für ABWL &amp; Controlling
          </span>
        </div>
      </div>

      {/* Case Study Problem Description Card */}
      <div className="w-full rounded-xl bg-surface border border-border-hairline shadow-sm p-6 sm:p-7">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="max-w-3xl space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-mono text-xs font-bold">
                Aufgabe 2.2
              </span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-secondary tracking-tight">
                Anschaffung der Gewerbe-Küchenmaschine
              </h1>
            </div>

            <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
              <strong className="text-text-primary font-bold">Bibi Bilanzierung e.K.</strong> investiert in die Modernisierung ihrer Manufaktur und erwirbt eine neue Hochleistungs-Küchenmaschine für{' '}
              <strong className="text-text-primary font-bold">2.000,00 € netto</strong> (zzgl. 19% USt). Vereinbarungsgemäß begleicht sie{' '}
              <strong className="text-text-primary font-bold">30% des Bruttobetrags sofort per Banküberweisung</strong>; die verbleibenden{' '}
              <strong className="text-text-primary font-bold">70%</strong> werden vom Lieferanten auf Zahlungsziel geliefert (Kauf auf Ziel).
            </p>

            <div className="flex items-center gap-2 text-primary font-medium text-xs sm:text-sm pt-1">
              <Info className="w-4 h-4 shrink-0" />
              <span>Formulieren Sie den zusammengesetzten Buchungssatz und bestimmen Sie die resultierende Bilanzwirkung.</span>
            </div>
          </div>

          {/* Financial Calculation Summary Matrix */}
          <div className="w-full lg:w-72 shrink-0 bg-surface-container-low border border-border-hairline rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between gap-2 border-b border-border-hairline pb-2">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Berechnungsgrundlage
              </span>
              <span className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-surface-variant text-on-surface-variant font-semibold">
                19% Vorsteuer
              </span>
            </div>

            <div className="flex flex-col gap-1.5 font-mono text-xs">
              <div className="flex items-center justify-between bg-surface px-2.5 py-1.5 rounded border border-border-hairline">
                <span className="text-on-surface-variant font-sans">Netto (BGA):</span>
                <span className="font-bold text-text-primary">2.000,00 €</span>
              </div>
              <div className="flex items-center justify-between bg-surface px-2.5 py-1.5 rounded border border-border-hairline">
                <span className="text-on-surface-variant font-sans">+ Vorsteuer (19%):</span>
                <span className="font-bold text-text-primary">380,00 €</span>
              </div>
              <div className="flex items-center justify-between bg-secondary-fixed text-on-secondary-fixed px-2.5 py-1.5 rounded font-bold">
                <span className="font-sans">Gesamt brutto:</span>
                <span>2.380,00 €</span>
              </div>
              <div className="flex items-center justify-between bg-surface px-2.5 py-1.5 rounded border border-border-hairline">
                <span className="text-on-surface-variant font-sans">30% Sofort (Bank):</span>
                <span className="text-tertiary font-bold">714,00 €</span>
              </div>
              <div className="flex items-center justify-between bg-surface px-2.5 py-1.5 rounded border border-border-hairline">
                <span className="text-on-surface-variant font-sans">70% Ziel (Verb. LuL):</span>
                <span className="text-primary font-bold">1.666,00 €</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Operational Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Composer & Bilanzwirkung (7 Cols) */}
        <div className="xl:col-span-7 flex flex-col gap-6">
          
          {/* Composer Box */}
          <div className="bg-surface rounded-xl p-6 border border-border-hairline shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 rounded-full bg-primary" />
                <h2 className="text-base sm:text-lg font-bold text-secondary">
                  JLU Buchungssatz-Composer
                </h2>
              </div>
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Zusammengesetzter Satz
              </span>
            </div>

            {/* Composer Canvas Rows */}
            <div className="space-y-3 bg-surface-container-low p-4 rounded-lg border border-border-hairline">
              
              {/* Soll Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary text-white font-bold text-xs uppercase tracking-wider">
                    SOLL
                  </span>
                  <span className="text-xs text-text-muted">
                    Mittelverwendung / Aufwand &amp; Vermögensmehrung
                  </span>
                </div>
                <span className="font-mono text-xs text-primary font-bold">
                  Summe Soll: 2.380,00 €
                </span>
              </div>

              {/* Soll Row 1: BGA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-surface p-2.5 rounded-lg border border-border-hairline shadow-2xs">
                <div className="flex items-center gap-2 shrink-0 w-24">
                  <span className="font-mono text-xs text-text-muted">Per</span>
                  <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-xs font-bold">
                    0840
                  </span>
                </div>
                <div className="flex-1">
                  <div className="w-full px-3 py-1.5 bg-surface-variant rounded text-xs sm:text-sm font-semibold text-text-primary flex items-center justify-between">
                    <span>Betriebs- &amp; Geschäftsausstattung (BGA)</span>
                    <span className="text-[10px] font-bold text-primary uppercase">Aktivkonto</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:w-36 bg-surface-variant px-3 py-1.5 rounded border border-border-hairline">
                  <span className="text-xs text-text-muted font-mono">€</span>
                  <input
                    type="text"
                    value={bgaAmount}
                    onChange={(e) => setBgaAmount(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs sm:text-sm text-text-primary text-right outline-none font-bold"
                  />
                </div>
              </div>

              {/* Soll Row 2: Vorsteuer */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-surface p-2.5 rounded-lg border border-border-hairline shadow-2xs">
                <div className="flex items-center gap-2 shrink-0 w-24">
                  <span className="font-mono text-xs text-text-muted">und</span>
                  <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-xs font-bold">
                    2600
                  </span>
                </div>
                <div className="flex-1">
                  <div className="w-full px-3 py-1.5 bg-surface-variant rounded text-xs sm:text-sm font-semibold text-text-primary flex items-center justify-between">
                    <span>Vorsteuer 19%</span>
                    <span className="text-[10px] font-bold text-primary uppercase">Aktivkonto</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:w-36 bg-surface-variant px-3 py-1.5 rounded border border-border-hairline">
                  <span className="text-xs text-text-muted font-mono">€</span>
                  <input
                    type="text"
                    value={vstAmount}
                    onChange={(e) => setVstAmount(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs sm:text-sm text-text-primary text-right outline-none font-bold"
                  />
                </div>
              </div>

              {/* Divider "AN" Transition */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="w-full h-px bg-border-hairline" />
                <div className="absolute bg-secondary text-white px-4 py-0.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xs flex items-center gap-1">
                  <span>an</span>
                  <ArrowDown className="w-3 h-3" />
                </div>
              </div>

              {/* Haben Header */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-secondary text-white font-bold text-xs uppercase tracking-wider">
                    HABEN
                  </span>
                  <span className="text-xs text-text-muted">
                    Mittelherkunft / Vermögensminderung &amp; Schuldzuwachs
                  </span>
                </div>
                <span className="font-mono text-xs text-secondary font-bold">
                  Summe Haben: 2.380,00 €
                </span>
              </div>

              {/* Haben Row 1: Bank */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-surface p-2.5 rounded-lg border border-border-hairline shadow-2xs">
                <div className="flex items-center gap-2 shrink-0 w-24">
                  <span className="font-mono text-xs text-text-muted">Posten</span>
                  <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-xs font-bold">
                    2800
                  </span>
                </div>
                <div className="flex-1">
                  <div className="w-full px-3 py-1.5 bg-surface-variant rounded text-xs sm:text-sm font-semibold text-text-primary flex items-center justify-between">
                    <span>Bankguthaben (30% Barüberweisung)</span>
                    <span className="text-[10px] font-bold text-primary uppercase">Aktivkonto</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:w-36 bg-surface-variant px-3 py-1.5 rounded border border-border-hairline">
                  <span className="text-xs text-text-muted font-mono">€</span>
                  <input
                    type="text"
                    value={bankAmount}
                    onChange={(e) => setBankAmount(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs sm:text-sm text-text-primary text-right outline-none font-bold"
                  />
                </div>
              </div>

              {/* Haben Row 2: Verbindlichkeiten LuL */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 bg-surface p-2.5 rounded-lg border border-border-hairline shadow-2xs">
                <div className="flex items-center gap-2 shrink-0 w-24">
                  <span className="font-mono text-xs text-text-muted">und</span>
                  <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-xs font-bold">
                    4400
                  </span>
                </div>
                <div className="flex-1">
                  <div className="w-full px-3 py-1.5 bg-surface-variant rounded text-xs sm:text-sm font-semibold text-text-primary flex items-center justify-between">
                    <span>Verbindlichkeiten aus LuL (70% Ziel)</span>
                    <span className="text-[10px] font-bold text-tertiary uppercase">Passivkonto</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 sm:w-36 bg-surface-variant px-3 py-1.5 rounded border border-border-hairline">
                  <span className="text-xs text-text-muted font-mono">€</span>
                  <input
                    type="text"
                    value={verbAmount}
                    onChange={(e) => setVerbAmount(e.target.value)}
                    className="w-full bg-transparent font-mono text-xs sm:text-sm text-text-primary text-right outline-none font-bold"
                  />
                </div>
              </div>

            </div>

            {/* Live Balancing Indicator Card */}
            <div className="flex items-center justify-between p-3.5 rounded-lg bg-success-container text-on-success-container border border-emerald-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                <div className="text-xs sm:text-sm">
                  <strong className="font-bold">Buchungsgleichung erfüllt:</strong>
                  <span className="font-mono ml-2">Soll (2.380,00 €) = Haben (2.380,00 €)</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-success text-white font-bold text-[11px] uppercase tracking-wider">
                Ausgeglichen ✓
              </span>
            </div>

            {/* Bilanzwirkung Selector */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="font-bold text-xs sm:text-sm text-secondary">
                  Auswirkung auf die Bilanzstruktur
                </label>
                <span className="text-xs text-text-muted">
                  Wählen Sie den zutreffenden Bilanzvorfall:
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedEffect('aktivtausch')}
                  className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold text-center transition-all border ${
                    selectedEffect === 'aktivtausch'
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-variant text-text-primary border-border-hairline hover:bg-secondary-container'
                  }`}
                >
                  Aktivtausch
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEffect('passivtausch')}
                  className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold text-center transition-all border ${
                    selectedEffect === 'passivtausch'
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-variant text-text-primary border-border-hairline hover:bg-secondary-container'
                  }`}
                >
                  Passivtausch
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEffect('verlaengerung')}
                  className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold text-center transition-all border ${
                    selectedEffect === 'verlaengerung'
                      ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/30'
                      : 'bg-surface-variant text-text-primary border-border-hairline hover:bg-secondary-container'
                  }`}
                >
                  Bilanzverlängerung
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedEffect('verkuerzung')}
                  className={`py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold text-center transition-all border ${
                    selectedEffect === 'verkuerzung'
                      ? 'bg-primary text-white border-primary shadow-sm'
                      : 'bg-surface-variant text-text-primary border-border-hairline hover:bg-secondary-container'
                  }`}
                >
                  Bilanzverkürzung
                </button>
              </div>

              {/* Didactic explanation for Bilanzwirkung */}
              <div className="p-3.5 rounded-lg bg-surface-container-low border border-border-hairline flex items-start gap-2.5 text-xs sm:text-sm">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-text-primary leading-relaxed">
                  <strong className="font-semibold text-secondary">Didaktische Einordnung:</strong> Durch die Anschaffung erhöht sich das Anlagevermögen (BGA +2.000 €) und die Vorsteuerforderung (+380 €). Die Barzahlung mindert das Bankkonto (-714 €), während die Verbindlichkeiten um 1.666 € steigen.{' '}
                  <span className="text-primary font-bold">
                    Netto-Erhöhung der Bilanzsumme: +1.666,00 € (Bilanzverlängerung / Aktiv-Passiv-Mehrung).
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Interactive Hint Tile */}
          <div className="bg-surface rounded-xl p-4 border border-border-hairline shadow-2xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-text-primary">
                Klausur-Merksatz: Sofortige Vorsteuerabzugsberechtigung
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Die Vorsteuer (§ 15 UStG) entsteht sofort in voller Höhe bei Rechnungsempfang &amp; Leistungserbringung – unabhängig davon, ob 30% oder 100% beglichen wurden.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: 4 Live T-Accounts in 2x2 Grid (5 Cols) */}
        <div className="xl:col-span-5 flex flex-col gap-6">
          
          <div className="bg-surface rounded-xl p-5 sm:p-6 border border-border-hairline shadow-sm flex flex-col gap-4">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 rounded-full bg-secondary" />
                <h2 className="text-base sm:text-lg font-bold text-secondary">
                  Hauptbuch Live-Wirkung
                </h2>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-bold">
                4 Konten betroffen
              </span>
            </div>

            {/* 2x2 Grid of Academic T-Accounts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* T-KONTO 1: BGA */}
              <div className="bg-surface-container-low rounded-lg p-2.5 border border-border-hairline shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-full bg-surface-variant text-center py-1 px-2 rounded mb-1.5 border border-border-hairline">
                    <span className="text-[10px] font-bold text-text-muted block">Aktivkonto 0840</span>
                    <span className="font-bold text-xs text-secondary uppercase tracking-wider">BGA</span>
                  </div>
                  <div className="grid grid-cols-2 text-center pb-1 text-xs font-bold text-primary border-b border-border-hairline">
                    <span>Soll</span>
                    <span>Haben</span>
                  </div>
                  <div className="grid grid-cols-2 min-h-[75px] bg-surface rounded p-1.5 text-xs font-mono">
                    <div className="pr-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="text-[10px] text-text-muted font-sans">Zugang</span>
                        <span className="font-bold text-primary">2.000,00</span>
                      </div>
                      <span className="text-[10px] text-text-muted text-right">Summe: 2.000</span>
                    </div>
                    <div className="pl-1 border-l border-border-hairline flex flex-col justify-between">
                      <span className="text-text-muted text-center">-</span>
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="text-[10px] text-text-muted font-sans">Saldo</span>
                        <span className="font-bold">2.000,00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-1 border-t-2 border-double border-slate-400 flex justify-between px-1 font-mono text-[11px] font-bold text-secondary">
                  <span>2.000,00 €</span>
                  <span>2.000,00 €</span>
                </div>
              </div>

              {/* T-KONTO 2: Vorsteuer */}
              <div className="bg-surface-container-low rounded-lg p-2.5 border border-border-hairline shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-full bg-surface-variant text-center py-1 px-2 rounded mb-1.5 border border-border-hairline">
                    <span className="text-[10px] font-bold text-text-muted block">Aktivkonto 2600</span>
                    <span className="font-bold text-xs text-secondary uppercase tracking-wider">Vorsteuer</span>
                  </div>
                  <div className="grid grid-cols-2 text-center pb-1 text-xs font-bold text-primary border-b border-border-hairline">
                    <span>Soll</span>
                    <span>Haben</span>
                  </div>
                  <div className="grid grid-cols-2 min-h-[75px] bg-surface rounded p-1.5 text-xs font-mono">
                    <div className="pr-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="text-[10px] text-text-muted font-sans">19% USt</span>
                        <span className="font-bold text-primary">380,00</span>
                      </div>
                      <span className="text-[10px] text-text-muted text-right">Summe: 380</span>
                    </div>
                    <div className="pl-1 border-l border-border-hairline flex flex-col justify-between">
                      <span className="text-text-muted text-center">-</span>
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="text-[10px] text-text-muted font-sans">Saldo</span>
                        <span className="font-bold">380,00</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-1 border-t-2 border-double border-slate-400 flex justify-between px-1 font-mono text-[11px] font-bold text-secondary">
                  <span>380,00 €</span>
                  <span>380,00 €</span>
                </div>
              </div>

              {/* T-KONTO 3: Bank */}
              <div className="bg-surface-container-low rounded-lg p-2.5 border border-border-hairline shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-full bg-surface-variant text-center py-1 px-2 rounded mb-1.5 border border-border-hairline">
                    <span className="text-[10px] font-bold text-text-muted block">Aktivkonto 2800</span>
                    <span className="font-bold text-xs text-secondary uppercase tracking-wider">Bank</span>
                  </div>
                  <div className="grid grid-cols-2 text-center pb-1 text-xs font-bold text-primary border-b border-border-hairline">
                    <span>Soll</span>
                    <span>Haben</span>
                  </div>
                  <div className="grid grid-cols-2 min-h-[75px] bg-surface rounded p-1.5 text-xs font-mono">
                    <div className="pr-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="text-[10px] text-text-muted font-sans">AB</span>
                        <span>15.000</span>
                      </div>
                      <span className="text-[10px] text-text-muted text-right">15.000</span>
                    </div>
                    <div className="pl-1 border-l border-border-hairline flex flex-col justify-between">
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="text-[10px] text-text-muted font-sans">30% Abg.</span>
                        <span className="font-bold text-tertiary">714,00</span>
                      </div>
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="text-[10px] text-text-muted font-sans">Schluss</span>
                        <span className="font-bold">14.286</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-1 border-t-2 border-double border-slate-400 flex justify-between px-1 font-mono text-[11px] font-bold text-secondary">
                  <span>15.000,00 €</span>
                  <span>15.000,00 €</span>
                </div>
              </div>

              {/* T-KONTO 4: Verbindlichkeiten LuL */}
              <div className="bg-surface-container-low rounded-lg p-2.5 border border-border-hairline shadow-2xs flex flex-col justify-between">
                <div>
                  <div className="w-full bg-surface-variant text-center py-1 px-2 rounded mb-1.5 border border-border-hairline">
                    <span className="text-[10px] font-bold text-text-muted block">Passivkonto 4400</span>
                    <span className="font-bold text-xs text-secondary uppercase tracking-wider">Verb. LuL</span>
                  </div>
                  <div className="grid grid-cols-2 text-center pb-1 text-xs font-bold text-primary border-b border-border-hairline">
                    <span>Soll</span>
                    <span>Haben</span>
                  </div>
                  <div className="grid grid-cols-2 min-h-[75px] bg-surface rounded p-1.5 text-xs font-mono">
                    <div className="pr-1 flex flex-col justify-between">
                      <span className="text-text-muted text-center">-</span>
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="text-[10px] text-text-muted font-sans">Saldo</span>
                        <span className="font-bold">1.666,00</span>
                      </div>
                    </div>
                    <div className="pl-1 border-l border-border-hairline flex flex-col justify-between">
                      <div className="flex items-center justify-between text-text-primary">
                        <span className="text-[10px] text-text-muted font-sans">Zugang 70%</span>
                        <span className="font-bold text-primary">1.666,00</span>
                      </div>
                      <span className="text-[10px] text-text-muted text-right">Summe: 1.666</span>
                    </div>
                  </div>
                </div>
                <div className="mt-2 pt-1 border-t-2 border-double border-slate-400 flex justify-between px-1 font-mono text-[11px] font-bold text-secondary">
                  <span>1.666,00 €</span>
                  <span>1.666,00 €</span>
                </div>
              </div>

            </div>

            {/* Academic Balance Check Badge */}
            <div className="p-3 bg-surface-variant rounded-lg border border-border-hairline flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-secondary shrink-0" />
                <span className="text-on-surface-variant">
                  Doppelte Buchführung: Saldenfortschreibung synchronisiert.
                </span>
              </div>
              <span className="font-mono text-primary font-bold">Gutschrift = Lastschrift</span>
            </div>

          </div>

          {/* Historical Precedent Card */}
          <div className="bg-surface rounded-xl p-4 border border-border-hairline shadow-2xs space-y-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-primary" />
              <h3 className="font-bold text-xs sm:text-sm text-secondary">Verknüpfte GoB-Grundsätze</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Gemäß <strong className="font-bold">§ 253 Abs. 1 HGB</strong> sind Vermögensgegenstände höchstens mit den Anschaffungskosten (Netto ohne Vorsteuer) anzusetzen. Die Vorsteuer stellt eine Forderung gegenüber dem Finanzamt dar und erhöht nicht die Anschaffungskosten des Wirtschaftsguts.
            </p>
          </div>

        </div>

      </div>

      {/* Bottom Floating Action Bar */}
      <div className="fixed bottom-4 left-4 right-4 lg:left-[300px] z-30 p-3 bg-surface/95 backdrop-blur-md rounded-xl border border-border-hairline shadow-lg flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-lg bg-surface-variant text-text-muted hover:text-text-primary hover:bg-secondary-container transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold border border-border-hairline"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Zurücksetzen</span>
          </button>
          <button
            onClick={handleToggleBookmark}
            className="px-4 py-2 rounded-lg bg-surface-variant text-on-surface-variant hover:bg-secondary-container transition-all flex items-center gap-1.5 text-xs sm:text-sm font-semibold border border-border-hairline"
          >
            {isBookmarked ? (
              <>
                <Bookmark className="w-4 h-4 text-primary fill-primary" />
                <span className="text-primary font-bold">Gemerkt</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Für Wiederholung merken</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          <button
            onClick={() => onOpenTutor('Aufgabe 2.2: Anschaffung der Küchenmaschine (2.000 € Netto)')}
            className="flex-1 md:flex-none px-5 py-2.5 rounded-lg bg-primary text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-primary-hover transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Schritt-für-Schritt mit KI erklären</span>
          </button>
          <button
            onClick={handleCheck}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-lg bg-success text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:brightness-105 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Eingabe prüfen</span>
          </button>
        </div>
      </div>

      {/* Notifications Toasts */}
      {showCheckToast && (
        <div className="fixed top-24 right-6 z-50 bg-success text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5" />
          <div className="text-xs sm:text-sm">
            <div className="font-bold">Hervorragend, Rabia!</div>
            <div>Buchungssatz und Bilanzverlängerung (+1.666,00 €) sind zu 100% korrekt!</div>
          </div>
        </div>
      )}

      {showBookmarkToast && (
        <div className="fixed top-24 right-6 z-50 bg-secondary text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Bookmark className="w-5 h-5 text-tertiary-fixed" />
          <div className="text-xs sm:text-sm">
            <div className="font-bold">Lernplan aktualisiert</div>
            <div>{isBookmarked ? 'Aufgabe 2.2 zur Wiederholung vorgemerkt!' : 'Aufgabe aus Merkliste entfernt.'}</div>
          </div>
        </div>
      )}

    </div>
  );
};
