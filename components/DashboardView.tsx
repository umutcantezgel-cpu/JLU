'use client';

import React, { useState } from 'react';
import {
  School,
  CheckCircle2,
  Lock,
  Bolt,
  SlidersHorizontal,
  Calendar,
  ArrowRight,
  Play,
  RotateCcw,
  Radar,
  Brain,
  Calculator,
  BookOpen,
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (section: string) => void;
  onOpenTutor: (context?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenTutor,
}) => {
  const [activeTab, setActiveTab] = useState<'buchfuehrung' | 'kostenrechnung'>('buchfuehrung');

  return (
    <div className="flex flex-col w-full gap-8">
      
      {/* Top Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Left 8 Cols: Welcome Hero + Lecture List */}
        <div className="xl:col-span-8 flex flex-col gap-6">
          
          {/* Welcome Card */}
          <div className="relative overflow-hidden rounded-xl bg-surface p-6 sm:p-8 border border-border-hairline shadow-sm">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-container/40 pointer-events-none blur-3xl" />
            
            <div className="relative z-10 flex flex-col gap-5">
              
              {/* Badges Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs">
                    JLU GIESSEN · FB 02 WIWI
                  </span>
                  <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-surface-variant text-text-muted font-mono text-xs">
                    WS 2024/25
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-tertiary">
                  <Calendar className="w-4 h-4 text-tertiary shrink-0" />
                  <span className="text-xs font-bold text-tertiary">
                    Klausurtermin: 18 Tage verbleibend
                  </span>
                </div>
              </div>

              {/* Greeting */}
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary tracking-tight">
                  Willkommen zurück, Rabia!
                </h1>
                <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl leading-relaxed">
                  Nächstes Ziel: Folge 1–3 Wissenslücken schließen. Prof. Dr. Ewelt-Knauer &amp; Prof. Dr. Wöhrmann Klausurvorbereitung.
                </p>
              </div>

              {/* 3 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                
                {/* Metric 1 */}
                <div className="rounded-lg bg-surface-container-low border border-border-hairline p-4 flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    Gesamtfortschritt
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-primary">62%</span>
                    <span className="text-xs text-text-muted">im Soll</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-surface-variant overflow-hidden mt-1">
                    <div className="h-full bg-primary rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="rounded-lg bg-surface-container-low border border-border-hairline p-4 flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    Bearbeitete Aufgaben
                  </span>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-secondary">24</span>
                    <span className="text-lg font-bold text-text-muted">/ 38</span>
                  </div>
                  <span className="text-xs text-success font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    63% Quote korrekt
                  </span>
                </div>

                {/* Metric 3 */}
                <div className="rounded-lg bg-surface-container-low border border-border-hairline p-4 flex flex-col gap-1">
                  <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                    Fokus heute
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-black text-tertiary">Folge 2 &amp; 3</span>
                  </div>
                  <span className="text-xs text-on-surface-variant">
                    Anzahlungen &amp; Erfolgswirksamkeit
                  </span>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onNavigate('path')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-hover transition-colors shadow-sm"
                  >
                    <Bolt className="w-4 h-4" />
                    <span>Duolingo-Lernpfad fortsetzen</span>
                  </button>
                  <button
                    onClick={() => onNavigate('klausur')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-secondary text-white font-bold text-sm hover:bg-secondary-hover transition-colors shadow-xs"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Klausur-Simulation (90 Min)</span>
                  </button>
                  <button
                    onClick={() => onNavigate('arena')}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-variant text-text-primary font-bold text-sm hover:bg-secondary-container transition-colors border border-border-hairline"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    <span>Trainings-Arena</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 text-text-muted font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-success" />
                  <span>Synchronisiert mit Stud.IP · Stand: Heute 08:30 Uhr</span>
                </div>
              </div>

            </div>
          </div>

          {/* Module Switcher Tabs */}
          <div className="flex flex-col gap-4">
            
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 bg-surface-container-low p-1 rounded-lg border border-border-hairline">
                <button
                  onClick={() => setActiveTab('buchfuehrung')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs sm:text-sm transition-all ${
                    activeTab === 'buchfuehrung'
                      ? 'bg-surface text-primary shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <School className="w-4 h-4" />
                  <span>1. Buchführung &amp; Bilanzierung</span>
                  <span className="px-1.5 py-0.5 rounded bg-primary-container text-primary font-mono text-[11px]">
                    10 Folgen
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('kostenrechnung')}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-md font-bold text-xs sm:text-sm transition-all ${
                    activeTab === 'kostenrechnung'
                      ? 'bg-surface text-primary shadow-sm'
                      : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <Calculator className="w-4 h-4" />
                  <span>2. Kosten- &amp; Leistungsrechnung</span>
                  <span className="px-1.5 py-0.5 rounded bg-surface-variant text-text-muted font-mono text-[11px]">
                    12 LE
                  </span>
                </button>
              </div>

              <span className="hidden md:inline-flex text-text-muted font-mono text-xs">
                Modul-Code: 02-BWL:BSc-B1-1
              </span>
            </div>

            {/* TAB 1: BUCHFÜHRUNG */}
            {activeTab === 'buchfuehrung' && (
              <div className="flex flex-col gap-3">
                
                {/* Chair Info Card */}
                <div className="flex items-center justify-between rounded-lg bg-surface p-4 border border-border-hairline shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary-container flex items-center justify-center text-primary shrink-0">
                      <School className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm sm:text-base text-secondary">
                        Prof. Dr. Corinna Ewelt-Knauer
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        Lehrstuhl für BWL II · Fallstudie: Bibi Bilanzierung &amp; N.Icecream GmbH
                      </span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-bold text-text-muted uppercase">Mastery</span>
                    <p className="font-mono text-xs sm:text-sm text-secondary font-bold">3 / 10 Abgeschlossen</p>
                  </div>
                </div>

                {/* Folge 1 */}
                <div className="rounded-xl bg-surface p-4 border border-border-hairline shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-success-container text-success flex items-center justify-center font-mono font-bold text-sm shrink-0">
                      01
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-text-primary">
                          Folge 1: Die Gründung &amp; Grundlagen der Bilanz
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-success-container text-success font-bold text-[10px] uppercase">
                          Abgeschlossen
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        Eigenkapital-Einbringung, Bankkonto-Eröffnung, Aktiv- &amp; Passivtausch, Bilanzverkürzung/-verlängerung.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-sm font-bold text-success">100%</span>
                      <span className="font-mono text-[11px] text-text-muted">4/4 Korrekt</span>
                    </div>
                    <button
                      onClick={() => onNavigate('arena')}
                      className="px-4 py-2 rounded bg-surface-variant text-text-primary font-bold text-xs hover:bg-secondary-container transition-colors"
                    >
                      Wiederholen
                    </button>
                  </div>
                </div>

                {/* Folge 2: Highlighted Error Need */}
                <div className="rounded-xl bg-surface p-4 border-2 border-error/30 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-error-container text-error flex items-center justify-center font-mono font-bold text-sm shrink-0">
                      02
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-text-primary">
                          Folge 2: Der Wareneinkauf &amp; Vorsteuer
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-error-container text-error font-bold text-[10px] uppercase">
                          Wiederholen nötig
                        </span>
                        <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-mono text-[11px]">
                          Rabias Notiz: Anzahlung &amp; Vorsteuer!
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        Lieferantenverbindlichkeiten, Skontoabzug, Vorsteuerkonto 19% &amp; 7%, Geleistete Anzahlungen auf Maschinen.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-sm font-bold text-error">45%</span>
                      <span className="font-mono text-[11px] text-text-muted">2/5 Korrekt</span>
                    </div>
                    <button
                      onClick={() => onNavigate('arena')}
                      className="px-4 py-2 rounded bg-primary text-white font-bold text-xs hover:bg-primary-hover shadow-sm transition-colors"
                    >
                      Lücke schließen
                    </button>
                  </div>
                </div>

                {/* Folge 3 */}
                <div className="rounded-xl bg-surface p-4 border border-border-hairline shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary-container text-primary flex items-center justify-center font-mono font-bold text-sm shrink-0">
                      03
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-text-primary">
                          Folge 3: Die Eisherstellung &amp; GuV als EK-Unterkonto
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-primary-container text-primary font-bold text-[10px] uppercase">
                          In Bearbeitung
                        </span>
                        <span className="px-2 py-0.5 rounded bg-surface-variant text-text-muted font-mono text-[11px]">
                          Rabias Notiz: Erfolgswirksamkeit
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        Rohstoffeinsatz (Milch, Früchte), Bestandsveränderungen, Umsatzerlöse, GuV-Abschluss über Eigenkapital.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-sm font-bold text-primary">60%</span>
                      <span className="font-mono text-[11px] text-text-muted">3/5 Korrekt</span>
                    </div>
                    <button
                      onClick={() => onNavigate('arena')}
                      className="px-4 py-2 rounded bg-secondary text-white font-bold text-xs hover:bg-primary transition-colors"
                    >
                      Fortsetzen
                    </button>
                  </div>
                </div>

                {/* Folge 4 */}
                <div className="rounded-xl bg-surface p-4 border border-border-hairline shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-variant text-on-surface-variant flex items-center justify-center font-mono font-bold text-sm shrink-0">
                      04
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-text-primary">
                          Folge 4: Personal- &amp; Sachaufwand
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-[10px] uppercase">
                          Freigeschaltet
                        </span>
                      </div>
                      <p className="text-xs text-on-surface-variant">
                        Brutto- vs. Nettolohn, Arbeitgeberanteil Sozialversicherung, Miete Eisdiele, Strom &amp; Nebenkosten.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end shrink-0">
                    <div className="flex flex-col items-end">
                      <span className="font-mono text-sm font-bold text-text-muted">0%</span>
                      <span className="font-mono text-[11px] text-text-muted">0/6 Bearbeitet</span>
                    </div>
                    <button
                      onClick={() => onNavigate('arena')}
                      className="px-4 py-2 rounded bg-surface-variant text-text-primary font-bold text-xs hover:bg-secondary-container transition-colors"
                    >
                      Starten
                    </button>
                  </div>
                </div>

                {/* Folge 5: Locked */}
                <div className="rounded-xl bg-surface/70 p-4 border border-border-hairline shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 opacity-75">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-variant text-text-muted flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-text-muted">
                          Folge 5: Forderungen &amp; Abschreibungen
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-variant text-text-muted font-bold text-[10px] uppercase">
                          Gesperrt
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">
                        Einzel- und Pauschalwertberichtigungen (EWB/PWB), lineare AfA Eismaschine, zweifelhafte Debitoren.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-text-muted">Freischaltung nach Folge 4</span>
                </div>

                {/* Folge 6–10: Locked */}
                <div className="rounded-xl bg-surface/70 p-4 border border-border-hairline shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4 opacity-75">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-variant text-text-muted flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm sm:text-base text-text-muted">
                          Folge 6–10: Jahresabschluss &amp; Bilanzierung
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-variant text-text-muted font-bold text-[10px] uppercase">
                          Gesperrt
                        </span>
                      </div>
                      <p className="text-xs text-text-muted">
                        Aktive/Passive Rechnungsabgrenzung (ARAP/PRAP), Rückstellungen § 249 HGB, Inventur &amp; Schlussbilanzkonto.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-text-muted">Freischaltung in Phase 3</span>
                </div>

              </div>
            )}

            {/* TAB 2: KOSTENRECHNUNG */}
            {activeTab === 'kostenrechnung' && (
              <div className="flex flex-col gap-3">
                
                {/* Chair Info Card */}
                <div className="flex items-center justify-between rounded-lg bg-surface p-4 border border-border-hairline shadow-2xs">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0">
                      <Calculator className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm sm:text-base text-secondary">
                        Prof. Dr. Arnt Wöhrmann
                      </span>
                      <span className="text-xs text-on-surface-variant">
                        Professur für Managerial Accounting · Interne Unternehmensrechnung
                      </span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-[11px] font-bold text-text-muted uppercase">Mastery</span>
                    <p className="font-mono text-xs sm:text-sm text-secondary font-bold">2 / 12 Abgeschlossen</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* LE 01-03 */}
                  <div className="rounded-xl bg-surface p-4 border border-border-hairline shadow-2xs flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-primary-container text-primary font-mono text-[11px] font-bold">
                          LE 01 - LE 03
                        </span>
                        <span className="text-success font-mono text-xs font-bold">Fertig</span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-secondary">Kostenartenrechnung</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Erfassung kalkulatorischer Kosten (Miete, Zinsen, Unternehmerlohn), Abgrenzungsrechnung &amp; Ergebnistabelle.
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('klausur')}
                      className="w-full py-2 rounded bg-surface-variant text-text-primary font-bold text-xs hover:bg-secondary-container transition-colors"
                    >
                      Wiederholen
                    </button>
                  </div>

                  {/* LE 04-06 */}
                  <div className="rounded-xl bg-surface p-4 border-2 border-tertiary/40 shadow-2xs flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-mono text-[11px] font-bold">
                          LE 04 - LE 06
                        </span>
                        <span className="text-tertiary font-mono text-xs font-bold">Empfohlen für heute</span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-secondary">Betriebsabrechnungsbogen (BAB)</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Primärkostenverteilung, Sekundärkostenverrechnung (Stufenleiter- &amp; Gleichungsverfahren), Gemeinkostenzuschlagssätze.
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('klausur')}
                      className="w-full py-2 rounded bg-primary text-white font-bold text-xs hover:bg-primary-hover shadow-sm transition-colors"
                    >
                      Jetzt trainieren
                    </button>
                  </div>

                  {/* LE 07-09 */}
                  <div className="rounded-xl bg-surface p-4 border border-border-hairline shadow-2xs flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-surface-variant text-text-muted font-mono text-[11px]">
                          LE 07 - LE 09
                        </span>
                        <span className="text-text-muted font-mono text-xs">Bereit</span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-secondary">Kostenträgerzeit- &amp; Stückrechnung</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Zuschlagskalkulation (vorwärts/rückwärts), Divisions- &amp; Äquivalenzziffernkalkulation, Kuppelproduktion.
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('klausur')}
                      className="w-full py-2 rounded bg-surface-variant text-text-primary font-bold text-xs hover:bg-secondary-container transition-colors"
                    >
                      Starten
                    </button>
                  </div>

                  {/* LE 10-12 */}
                  <div className="rounded-xl bg-surface p-4 border border-border-hairline shadow-2xs flex flex-col justify-between gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-surface-variant text-text-muted font-mono text-[11px]">
                          LE 10 - LE 12
                        </span>
                        <span className="text-text-muted font-mono text-xs">Bereit</span>
                      </div>
                      <h3 className="font-bold text-sm sm:text-base text-secondary">Deckungsbeitragsrechnung (DLR)</h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Einstufige &amp; mehrstufige DB-Rechnung, Break-Even-Analyse, relativer Deckungsbeitrag bei Engpasskapazitäten.
                      </p>
                    </div>
                    <button
                      onClick={() => onNavigate('klausur')}
                      className="w-full py-2 rounded bg-surface-variant text-text-primary font-bold text-xs hover:bg-secondary-container transition-colors"
                    >
                      Starten
                    </button>
                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* Right 4 Cols: Rabias Fehler-Radar + 1-Klick KI-Tutor */}
        <div className="xl:col-span-4 flex flex-col gap-5">
          
          {/* Fehler-Radar Card */}
          <div className="rounded-xl bg-surface p-5 border border-border-hairline shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radar className="w-5 h-5 text-tertiary" />
                <h2 className="font-bold text-base sm:text-lg text-secondary">Rabias Fehler-Radar</h2>
              </div>
              <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-mono text-xs font-bold">
                Folge 1–3
              </span>
            </div>
            
            <p className="text-xs text-on-surface-variant">
              Automatisch extrahiert aus deinen bisherigen Buchungssätzen und handschriftlichen Notizen:
            </p>

            <div className="flex flex-col gap-3">
              
              {/* Item 1 */}
              <div className="rounded-lg bg-surface-container-low border border-border-hairline p-3 flex flex-col gap-1.5 transition hover:bg-surface-variant">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-error uppercase">Schwerpunkt 1</span>
                  <span className="font-mono text-[11px] text-text-muted">Aufg. 2.2 &amp; 2.4</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-text-primary">
                  Geleistete Anzahlungen vs. Sofortige Aktivierung BGA
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Falle: Maschinenanzahlung vor Gefahrenübergang darf nicht direkt auf Konto BGA gebucht werden.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-xs text-error font-semibold">Fehlerquote: 68%</span>
                  <button
                    onClick={() => onNavigate('studio')}
                    className="text-primary hover:text-secondary font-bold text-xs inline-flex items-center gap-1"
                  >
                    <span>Jetzt trainieren</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="rounded-lg bg-surface-container-low border border-border-hairline p-3 flex flex-col gap-1.5 transition hover:bg-surface-variant">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-error uppercase">Schwerpunkt 2</span>
                  <span className="font-mono text-[11px] text-text-muted">Aufg. 2.3</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-text-primary">
                  Steuer im Preis vs. auf Nettobetrag (19% &amp; 7%)
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Falle: Herausrechnen aus Brutto (/1,19 vs. *0,19). Unterscheidung Vorsteuer / Umsatzsteuer.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-xs text-error font-semibold">Fehlerquote: 54%</span>
                  <button
                    onClick={() => onNavigate('studio')}
                    className="text-primary hover:text-secondary font-bold text-xs inline-flex items-center gap-1"
                  >
                    <span>Jetzt trainieren</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Item 3 */}
              <div className="rounded-lg bg-surface-container-low border border-border-hairline p-3 flex flex-col gap-1.5 transition hover:bg-surface-variant">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-tertiary uppercase">Schwerpunkt 3</span>
                  <span className="font-mono text-[11px] text-text-muted">Aufg. 1.4 &amp; 1.5</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-text-primary">
                  Bilanzverlängerung vs. Aktivtausch
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Falle: Barzahlung einer Lieferantenverbindlichkeit vs. Kauf von Rohstoffen auf Ziel.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-xs text-tertiary font-semibold">Fehlerquote: 41%</span>
                  <button
                    onClick={() => onNavigate('studio')}
                    className="text-primary hover:text-secondary font-bold text-xs inline-flex items-center gap-1"
                  >
                    <span>Jetzt trainieren</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Item 4 */}
              <div className="rounded-lg bg-surface-container-low border border-border-hairline p-3 flex flex-col gap-1.5 transition hover:bg-surface-variant">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-tertiary uppercase">Schwerpunkt 4</span>
                  <span className="font-mono text-[11px] text-text-muted">Aufg. 3.1 &amp; 3.2</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-text-primary">
                  GuV als Unterkonto des Eigenkapitals
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Falle: Aufwendungen mindern das Eigenkapital im Soll; Erträge mehren es im Haben.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-xs text-tertiary font-semibold">Fehlerquote: 39%</span>
                  <button
                    onClick={() => onNavigate('studio')}
                    className="text-primary hover:text-secondary font-bold text-xs inline-flex items-center gap-1"
                  >
                    <span>Jetzt trainieren</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Item 5 */}
              <div className="rounded-lg bg-surface-container-low border border-border-hairline p-3 flex flex-col gap-1.5 transition hover:bg-surface-variant">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-primary uppercase">Schwerpunkt 5</span>
                  <span className="font-mono text-[11px] text-text-muted">Aufg. 3.4 &amp; 3.5</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-text-primary">
                  Erfolgswirksamkeit bei Lagerentnahme
                </h4>
                <p className="text-xs text-on-surface-variant">
                  Falle: Reine Umbuchung Rohstoffbestand an Aufwand für Rohstoffe erst bei Verbrauch.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-xs text-primary font-semibold">Fehlerquote: 32%</span>
                  <button
                    onClick={() => onNavigate('studio')}
                    className="text-primary hover:text-secondary font-bold text-xs inline-flex items-center gap-1"
                  >
                    <span>Jetzt trainieren</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* 1-Klick KI-Tutor: Quick recommendation */}
          <div className="rounded-xl bg-surface p-5 border border-border-hairline shadow-sm flex flex-col gap-3">
            <div className="flex items-center gap-2 text-secondary">
              <Brain className="w-5 h-5" />
              <h3 className="font-bold text-sm sm:text-base">1-Klick KI-Tutor: Nächste Empfehlung</h3>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Basierend auf deinem Fehlerprofil empfiehlt der Tutor eine 12-minütige Drill-Session zu Buchungssätzen mit Vorsteuerkorrektur.
            </p>
            <button
              onClick={() => onOpenTutor('Drill-Session: Buchungssätze mit Vorsteuerkorrektur')}
              className="w-full py-2.5 rounded-lg bg-secondary text-white font-bold text-xs sm:text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>12-Minuten Drill starten</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
