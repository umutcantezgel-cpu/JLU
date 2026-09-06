'use client';

import React, { useState } from 'react';
import { Exercise } from '@/data/curriculumTypes';
import { getExerciseById } from '@/data/curriculumData';

interface RabiaNotesViewProps {
  onSelectExercise: (exercise: Exercise) => void;
  onOpenTutor: (prompt: string, context: string) => void;
}

interface NoteItem {
  id: string;
  folge: number;
  aufgabe: string;
  exerciseId: string;
  title: string;
  rabiaQuote: string;
  imageRef: string;
  problem: string;
  solution: string;
  formula?: string;
  buchungssatz?: string;
  klausurTipp: string;
}

const RABIA_NOTES: NoteItem[] = [
  {
    id: 'n-1-1',
    folge: 1,
    aufgabe: 'Aufgabe 1.1 & 1.3',
    exerciseId: 'rabia-1',
    title: 'Externes vs. Internes Rechnungswesen',
    rabiaQuote: 'Im Rahmen des externen RW wird die Wirtschaftlichkeit ... und die Zahlungsfähigkeit geprüft -> falsch -> 1.3',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28 (1).jpeg & 03.58.31 (1).jpeg',
    problem: 'Rabia dachte, die Prüfung der Wirtschaftlichkeit und der Liquidität gehöre zur Finanzbuchhaltung (externes RW).',
    solution: 'Das externe RW (HGB) dient ausschließlich Dokumentation (§ 238 HGB), Rechenschaftslegung und Gläubigerschutz nach strengen Gesetzen. Die Wirtschaftlichkeitskontrolle und interne Steuerung der Zahlungsfähigkeit ist Kernaufgabe des internen RW (Kostenrechnung / Controlling bei Prof. Dr. Wöhrmann)!',
    klausurTipp: 'Merksatz: Extern = Gesetz, Belege, Rechenschaft für Dritte (HGB). Intern = Wirtschaftlichkeit, Kostenkontrolle, Planung für das Management.',
  },
  {
    id: 'n-1-2',
    folge: 1,
    aufgabe: 'Aufgabe 1.2 & 1.3',
    exerciseId: 'rabia-2',
    title: 'Bilanz vs. GuV (Stichtag vs. Zeitraum)',
    rabiaQuote: 'die Bilanz vermittelt Info über Ertragslage -> falsch -> gibt Auskunft über Vermögens- und Finanzlage',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28 (1).jpeg',
    problem: 'Verwechslung von Bilanz und GuV bezüglich Stichtag vs. Zeitraum und Ertragslage vs. Vermögenslage.',
    solution: 'Die Bilanz ist eine Stichtagsrechnung (31.12. um 24:00 Uhr) und zeigt als Foto Vermögen (Aktiva) und Kapital/Schulden (Passiva) = Vermögens- und Finanzlage. Die GuV ist eine Zeitraumbetrachtung (01.01.-31.12.) und zeigt als Film Aufwendungen und Erträge = Ertragslage!',
    klausurTipp: 'Foto vs. Film: Bilanz = Foto zum Stichtag. GuV = Film des gesamten Geschäftsjahres.',
  },
  {
    id: 'n-1-4',
    folge: 1,
    aufgabe: 'Aufgabe 1.4',
    exerciseId: 'rabia-3',
    title: 'Flohmarkt-Möbelkauf bar (Reiner Aktivtausch)',
    rabiaQuote: 'Die Vermögensstruktur ändert sich Bilanzsumme bleibt gleich? Möbel 750 € an Bank/Kasse 750 €',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28 (1).jpeg & 03.58.31 (1).jpeg',
    problem: 'Verunsicherung, warum der Kauf von Möbeln für 450 € / 750 € die Bilanzsumme nicht erhöht.',
    solution: 'Beide Konten (BGA für Möbel und Kasse/Bank für Geld) liegen auf der Aktivseite! BGA nimmt im Soll zu (+750 €), Kasse/Bank nimmt im Haben ab (-750 €). Die Aktivseite saldiert sich zu 0 €. Die Bilanzsumme bleibt unverändert, lediglich die Zusammensetzung (Vermögensstruktur) wechselt von flüssigen Mitteln zu Sachanlagen.',
    buchungssatz: 'BGA 750,00 € an Kasse 750,00 € (bzw. 450,00 €)',
    klausurTipp: 'Ein Aktivtausch berührt NIEMALS das Eigenkapital oder die Bilanzsumme. Er ist 100% erfolgsneutral.',
  },
  {
    id: 'n-1-5',
    folge: 1,
    aufgabe: 'Aufgabe 1.5',
    exerciseId: 'rabia-4',
    title: 'Aufnahme eines Bankkredits (30.000 €)',
    rabiaQuote: 'Bankkredit einbuchen -> warum Bilanzverlängerung? Aktiv-Passiv-Mehrung? Beide Konten erhöht',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28.jpeg',
    problem: 'Warum ist ein Kredit eine Bilanzverlängerung, wenn man doch Schulden macht?',
    solution: 'Das Bankkonto (Aktiv) erhält +30.000 € Guthaben (Soll). Das Darlehenskonto (Passiv) erhält +30.000 € Schulden (Haben). Beide Seiten der Bilanz werden um 30.000 € größer. Daher: Bilanzverlängerung (Aktiv-Passiv-Mehrung)!',
    buchungssatz: 'Bank 30.000,00 € an Verbindlichkeiten ggü. Kreditinstituten 30.000,00 €',
    klausurTipp: 'Bilanzverlängerung: Beide Seiten steigen um denselben Betrag. Schuldenzuwachs = Haben-Buchung auf Passivkonto.',
  },
  {
    id: 'n-1-6',
    folge: 1,
    aufgabe: 'Aufgabe 1.6',
    exerciseId: 'rabia-11',
    title: 'Kredittilgung vs. Zinsaufwand',
    rabiaQuote: 'Die 4k wird vom BK abgebucht und wird von der Bank gezogen. Soll Bankkredit Passivk. 4.000k / Haben | Soll Bank Aktivk. / Haben 4.000k',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28.jpeg',
    problem: 'Unterscheidung zwischen Kredittilgung und Zinszahlung unklar.',
    solution: 'Der Buchungssatz "Bankkredit an Bank 4.000 €" ist eine reine Kredittilgung (Rückzahlung). Verbindlichkeiten (Passivkonto) nehmen im Soll ab, Bankguthaben (Aktivkonto) nimmt im Haben ab = Bilanzverkürzung (Aktiv-Passiv-Minderung). Dies ist vollkommen erfolgsneutral! Zinsen hingegen sind Aufwand (Zinsaufwand an Bank).',
    buchungssatz: 'Verbindlichkeiten ggü. Kreditinstituten 4.000,00 € an Bank 4.000,00 €',
    klausurTipp: 'Prof. Ewelt-Knauer trennt strikt: Tilgung = Bilanzverkürzung (Schuldenabbau, erfolgsneutral). Zins = GuV-Aufwand (Erfolgswirksam).',
  },
  {
    id: 'n-1-7',
    folge: 1,
    aufgabe: 'Aufgabe 1.7',
    exerciseId: 'rabia-12',
    title: 'Inventar vs. Bilanz: Form & Detaillierungsgrad',
    rabiaQuote: 'Inventar -> detaillierte Liste von Waren und Gegenstände des Unternehmers. Zeigt wie viel das Unternehmen zu einem bestimmten Zeitpunkt besitzt. Die Bilanz kann man durch das Inventar besser darstellen.',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28.jpeg',
    problem: 'Genaue gesetzliche Abgrenzung zwischen Inventar nach § 240 HGB und Bilanz nach § 266 HGB.',
    solution: 'Inventar = Staffelform, detailliertes Mengengerüst (kg, Liter, Stück, Einzelwerte) aus der Inventur. Bilanz = Kontenform (T-Form), aggregiert/verdichtet in gesetzliche Positionen nach § 266 HGB, rein wertmäßig in Euro ohne Mengenangaben.',
    klausurTipp: 'Inventar hat Mengenangaben und Staffelform. Bilanz hat Kontenform und nur aggregierte Geldbeträge.',
  },
  {
    id: 'n-2-1',
    folge: 2,
    aufgabe: 'Aufgabe 2.1',
    exerciseId: 'rabia-13',
    title: 'Aktivtausch vs. Bilanzverkürzung im Wareneinkauf',
    rabiaQuote: 'Aktivtausch zwischen Vorräte und Bank/Kasse... kein Aktivtausch Verbindlichkeit und Bank',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.29 (2).jpeg',
    problem: 'Sichere Abgrenzung von Vorfällen im Wareneinkauf.',
    solution: 'Vorräte an Kasse = Aktivtausch. Bank an Kasse = Aktivtausch. Aber: Verbindlichkeiten an Bank = Bilanzverkürzung (Passivkonto und Aktivkonto nehmen ab).',
    klausurTipp: 'Nur wenn ausschließlich Konten der Aktivseite berührt sind, liegt ein Aktivtausch vor!',
  },
  {
    id: 'n-2-2',
    folge: 2,
    aufgabe: 'Aufgabe 2.2',
    exerciseId: 'rabia-5',
    title: 'Küchenmaschine 2.000 €: Warum KEINE Anzahlung?',
    rabiaQuote: 'netto 2000 €, 714 € (30%) fällig, 1666 € (70%) Ziel, 19% Steuer 380 € -> Warum ist das keine geleistete Anzahlung? Warum Bilanzsumme erhöht um 1666 €?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28 (2).jpeg & 03.58.29 (2).jpeg',
    problem: 'Rabia dachte, die 30% Sofortzahlung sei eine Anzahlung und teilte die Vorsteuer in 114 € und 266 € auf.',
    solution: 'Die Maschine wurde SOFORT geliefert und abgenommen (Gefahrenübergang vollzogen)! Eine Anzahlung gibt es nur VOR Leistungserbringung. Sie wird sofort voll als BGA im Anlagevermögen aktiviert. Vorsteuer (380 €) entsteht sofort voll. Bilanzsumme steigt um 1.666 €, da Verbindlichkeiten um 1.666 € steigen und Aktiva netto (+2000 +380 -714) ebenfalls um 1.666 € steigen.',
    formula: 'Netto 2.000 € + 19% VSt 380 € = Brutto 2.380 €. 30% Bank = 714 €. 70% Verbindlichkeit = 1.666 €.',
    buchungssatz: 'BGA 2.000,00 € und Vorsteuer 380,00 € an Bank 714,00 € und Verbindlichkeiten LuL 1.666,00 €',
    klausurTipp: 'Gefahrenübergang vollzogen = Sofortige Vollaktivierung in BGA! Niemals "Anzahlung" buchen, wenn die Ware da ist.',
  },
  {
    id: 'n-2-3',
    folge: 2,
    aufgabe: 'Aufgabe 2.3',
    exerciseId: 'rabia-14',
    title: 'Keine Steuer auf Geldtransfers & Brutto/Netto-Formel',
    rabiaQuote: 'Steuer falsch berechnet -> Steuer mit im Preis? Warum bei D nicht? Bank 3000 : 1.19 = 2521 € Steuer 479 €',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.29.jpeg',
    problem: 'Rabia versuchte, Vorsteuer/USt auf einen Bankkredit (3.000 €) zu berechnen!',
    solution: 'Reine Geldtransfers (Darlehen, Tilgung, Überweisung, Bargeldabhebung) sind keine Warenlieferungen oder Dienstleistungen im Sinne des § 1 Abs. 1 UStG. Sie sind IMMER OHNE Steuer! Bei Waren mit Steuer im Preis: Netto = Brutto / 1,19. Niemals einfach 19% von Brutto abziehen!',
    formula: 'Netto = Brutto / 1,19 (bei 19%) bzw. Netto = Brutto / 1,07 (bei 7%). Kredite/Tilgung = 0% Steuer!',
    klausurTipp: 'Klausurfalle: Kredite, Zinsen, Tilgungen und Privateinlagen haben NIEMALS Vorsteuer oder Umsatzsteuer!',
  },
  {
    id: 'n-2-4',
    folge: 2,
    aufgabe: 'Aufgabe 2.4',
    exerciseId: 'rabia-6',
    title: 'Erdbeerkauf mit Anzahlung (7% Vorsteuer)',
    rabiaQuote: '40 kg Erdbeeren 400 € netto, 50% Anzahlung -> bar/Bank, 7% Steuer 28 €. Korrektur der geleisteten Anzahlung? Kasse oder Bank?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.29 (1).jpeg',
    problem: 'Wie bucht man Anzahlungen vor Lieferung und wie wird die Schlussrechnung mit Vorsteuer verrechnet?',
    solution: 'Nach § 15 Abs. 1 Nr. 1 UStG darf die Vorsteuer bei Anzahlungen VOR Lieferung sofort bei Zahlung geltend gemacht werden! Bei Lieferung wird die geleistete Anzahlung gegen die Schlussrechnung ausgebucht, damit Vorsteuer nicht doppelt gezogen wird.',
    buchungssatz: 'Anzahlung: Geleistete Anzahlungen 200 € + Vorsteuer 14 € an Bank 214 €. Schlussrechnung: Vorräte 400 € + Vorsteuer 14 € an Geleistete Anzahlungen 200 € + Verbindlichkeiten 214 €.',
    klausurTipp: 'Erdbeeren = Lebensmittel = 7% ermäßigter Steuersatz! Bei 214 € brutto: Netto = 214 / 1,07 = 200 €, Vorsteuer = 14 €.',
  },
  {
    id: 'n-2-5',
    folge: 2,
    aufgabe: 'Aufgabe 2.5',
    exerciseId: 'rabia-15',
    title: 'Rohstoffkauf bar mit 7% ermäßigter Vorsteuer',
    rabiaQuote: 'netto 150 €, 160,50 € mit 7% Steuer. Aktivtausch Vorräte 150 € und Vorsteuer 10,50 € an Kasse/Bank 160,50 €',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.29.jpeg & 03.58.29 (1).jpeg',
    problem: 'Buchungssatz und Steuerausweis bei Barzahlung von Vorräten.',
    solution: 'Vorräte (Rohstoffe) 150 € + Vorsteuer (7%) 10,50 € an Kasse 160,50 €. Reiner Aktivtausch, da Vorräte, Vorsteuerforderung und Kasse allesamt Aktivkonten sind.',
    buchungssatz: 'Vorräte 150,00 € und Vorsteuer 10,50 € an Kasse 160,50 €',
    klausurTipp: 'Vorsteuer ist eine Forderung gegenüber dem Finanzamt und steht immer als Aktivkonto im Umlaufvermögen!',
  },
  {
    id: 'n-3-1',
    folge: 3,
    aufgabe: 'Aufgabe 3.1 & 3.2',
    exerciseId: 'rabia-7',
    title: 'GuV als Unterkonto des Eigenkapitals',
    rabiaQuote: 'GuV besser verstehen -> 3.1 nicht mit Bilanz vertauschen! GuV Bilanz Zusammenhang -> 3.2. Sie hängen zusammen durch das Eigenkapital.',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.30.jpeg',
    problem: 'Wie hängen GuV und Bilanz genau zusammen und wie wird das Eigenkapital verändert?',
    solution: 'Die GuV ist keine separate Insel, sondern das Unterkonto des Eigenkapitals auf der Passivseite der Bilanz! Alle Aufwendungen und Erträge fließen in die GuV. Am 31.12. wird der Saldo ermittelt: Jahresüberschuss mehrt Eigenkapital im Haben; Jahresfehlbetrag mindert Eigenkapital im Soll.',
    klausurTipp: 'Die GuV füttert das Eigenkapitalkonto auf der Passivseite der Bilanz.',
  },
  {
    id: 'n-3-3',
    folge: 3,
    aufgabe: 'Aufgabe 3.3',
    exerciseId: 'rabia-16',
    title: 'Warum Aufwand im SOLL und Ertrag im HABEN steht',
    rabiaQuote: 'Auf welcher Seite Aufwand? Auf welcher Ertrag? Jahresfehlbetrag Haben?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.30.jpeg',
    problem: 'Warum steht Aufwand im Soll, obwohl Eigenkapital doch ein Passivkonto ist?',
    solution: 'Genau WEIL das Eigenkapital ein Passivkonto ist! Bei Passivkonten gilt: Zunahmen stehen im Haben, Abnahmen im Soll. Weil Aufwendungen das Eigenkapital vermindern, stehen sie im SOLL! Weil Erträge das Eigenkapital vermehren, stehen sie im HABEN!',
    klausurTipp: 'Passivkonto EK: Soll = Minderung (Aufwand). Haben = Mehrung (Ertrag).',
  },
  {
    id: 'n-3-5',
    folge: 3,
    aufgabe: 'Aufgabe 3.5',
    exerciseId: 'rabia-8',
    title: 'Eisherstellung 340 €: Warum KASSE FALSCH ist!',
    rabiaQuote: '350 € Lager für Herstellung -> warum erfolgsneutral? Warum Fertige Erzeugnisse an Kasse falsch ist?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.30.jpeg',
    problem: 'Rabia notierte "Fertige Eis an Kasse" und verstand nicht, warum die interne Produktion erfolgsneutral ist.',
    solution: '1. Kasse ist grundfalsch, weil kein Bargeld fließt – die Früchte lagen im Vorratslager! 2. Der Vorgang ist erfolgsneutral, weil im Gesamtkostenverfahren der Aufwand aus Rohstoffverbrauch (340 € Soll) durch den Ertrag aus Bestandsmehrung an Fertigerzeugnissen (340 € Haben) in der GuV exakt aufgehoben wird: +340 € - 340 € = 0 €! Reines Herstellen schafft noch keinen Gewinn – erst der spätere Verkauf an Kunden bringt Gewinn!',
    buchungssatz: '1. Aufwand für Rohstoffe 340 € an Rohstoffe 340 €\n2. Fertigerzeugnisse 340 € an Bestandsmehrungen (Ertrag) 340 €',
    klausurTipp: 'Realisationsprinzip § 252 Abs. 1 Nr. 4 HGB: Gewinne dürfen erst ausgewiesen werden, wenn die Leistung an Kunden erbracht wurde!',
  },
  {
    id: 'n-3-7',
    folge: 3,
    aufgabe: 'Aufgabe 3.7',
    exerciseId: 'rabia-9',
    title: 'Die 4-Felder-Matrix: Zahlungs- vs. Erfolgswirksamkeit',
    rabiaQuote: 'Tabelle checken 3.7: Warum C erfolgswirksam? Warum D richtig?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.30.jpeg',
    problem: 'Klassifikation der 4 Klausurfälle in der Tabelle.',
    solution: 'a) Kauf Eismaschine auf Ziel: Nicht zahlungswirksam (kein Geldfluss) & Nicht erfolgswirksam (Bilanzverlängerung).\nb) Blitzeinschlag / Außerplanmäßige AfA: Nicht zahlungswirksam & ERFOLGSWIRKSAM (Aufwand mindert Gewinn).\nc) Zinsgutschrift auf Bank: ZAHLUNGSWIRKSAM (Bankguthaben steigt) & ERFOLGSWIRKSAM (Zinsertrag mehrt Gewinn).\nd) Barkauf Obst für 500 €: ZAHLUNGSWIRKSAM (Kasse sinkt) & ERFOLGSNEUTRAL (Aktivtausch Kasse gegen Vorräte).',
    klausurTipp: 'Prüfe immer zwei getrennte Fragen: 1. Fließt Geld (Kasse/Bank)? -> Zahlungswirksam. 2. Verändert sich das Eigenkapital (GuV)? -> Erfolgswirksam.',
  },
];

export const RabiaNotesView: React.FC<RabiaNotesViewProps> = ({
  onSelectExercise,
  onOpenTutor,
}) => {
  const [selectedFolge, setSelectedFolge] = useState<number | 'all'>('all');
  const [activeCheatTab, setActiveCheatTab] = useState<'matrix' | 'steuern' | 'guv' | 'bilanz'>('matrix');

  const filteredNotes = selectedFolge === 'all'
    ? RABIA_NOTES
    : RABIA_NOTES.filter((n) => n.folge === selectedFolge);

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-emerald-500/30">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              WhatsApp Handschrift-Analyse & Klausurfokus
            </div>
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
              Rabias WhatsApp-Notizen (Folge 1–3)
            </h1>
            <p className="text-emerald-100/80 text-sm lg:text-base max-w-2xl leading-relaxed">
              Hier sind alle handschriftlichen Notizen, Skizzen und Fragen aus deinen WhatsApp-Bildern systematisch analysiert. Jeder Denkfehler ist entlarvt und nach den Klausur-Vorgaben von Prof. Dr. Corinna Ewelt-Knauer gelöst.
            </p>
          </div>

          <div className="flex flex-row lg:flex-col gap-3 shrink-0">
            <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl font-black text-emerald-400">17</span>
              <span className="block text-xs text-white/70">Notizen gelöst</span>
            </div>
            <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl font-black text-amber-400">100%</span>
              <span className="block text-xs text-white/70">JLU Prüfungs-Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Visual Cheat Tool */}
      <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>🧠</span> Rabias Interaktive Spickzettel-Zentrale
            </h2>
            <p className="text-sm text-slate-500">
              Die 4 wichtigsten visuellen Übersichten gegen die häufigsten Klausurfallen.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCheatTab('matrix')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeCheatTab === 'matrix'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Matrix 3.7
            </button>
            <button
              onClick={() => setActiveCheatTab('steuern')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeCheatTab === 'steuern'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Steuer & Geldtransfers
            </button>
            <button
              onClick={() => setActiveCheatTab('guv')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeCheatTab === 'guv'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              GuV als EK-Unterkonto
            </button>
            <button
              onClick={() => setActiveCheatTab('bilanz')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeCheatTab === 'bilanz'
                  ? 'bg-emerald-600 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              4 Bilanzänderungen
            </button>
          </div>
        </div>

        {/* Cheat Content */}
        {activeCheatTab === 'matrix' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <th className="p-3 font-bold">Geschäftsvorfall aus Klausur 3.7</th>
                  <th className="p-3 font-bold text-center">Zahlungswirksam?</th>
                  <th className="p-3 font-bold text-center">Erfolgswirksam?</th>
                  <th className="p-3 font-bold">Bilanzwirkung & Warum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3 font-medium text-slate-800">a) Eismaschine auf Ziel gekauft</td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">NEIN</span></td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">NEIN</span></td>
                  <td className="p-3 text-slate-600">Bilanzverlängerung (BGA an Verb. LuL). Kein Geldfluss, kein Aufwand/Ertrag.</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3 font-medium text-slate-800">b) Blitzeinschlag: Außerplanm. AfA am Gebäude</td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">NEIN</span></td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold">JA</span></td>
                  <td className="p-3 text-slate-600">Bilanzverkürzung. Kein Geldfluss, aber Abschreibungsaufwand mindert GuV und Eigenkapital!</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3 font-medium text-slate-800">c) Zinsgutschrift auf dem Bankkonto</td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">JA</span></td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">JA</span></td>
                  <td className="p-3 text-slate-600">Bilanzverlängerung. Bankguthaben steigt (+liquide Mittel) und Zinsertrag mehrt GuV/Eigenkapital!</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3 font-medium text-slate-800">d) Barkauf von Obst & Nüssen für 500 €</td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">JA</span></td>
                  <td className="p-3 text-center"><span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">NEIN</span></td>
                  <td className="p-3 text-slate-600">Aktivtausch. Kasse sinkt (-Geld), Vorräte steigen (+Vermögen). Erfolgsneutral, solange nicht verbraucht!</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeCheatTab === 'steuern' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
              <h4 className="font-bold text-amber-900 mb-2">⚠️ Rabias wichtigster Erkenntnispunkt:</h4>
              <p className="text-amber-800 text-xs mb-2">
                Rabia rechnete auf einem Foto: <code>3.000 € Kredit : 1,19 = 2.521 €</code> und fragte: <em>"Warum fällt bei D keine Steuer an?"</em>
              </p>
              <p className="font-semibold text-amber-950 text-xs">
                👉 <strong>Regel:</strong> Auf reine Geldtransfers (Darlehensaufnahme, Kredittilgung, Abhebungen, Einlagen) fällt <strong>NIEMALS Umsatzsteuer oder Vorsteuer</strong> an (§ 1 Abs. 1 UStG gilt nur für Waren & Dienstleistungen)!
              </p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
              <h4 className="font-bold text-blue-900 mb-2">💡 Rechenregel: Steuer im Preis</h4>
              <ul className="text-xs space-y-1.5 text-blue-800">
                <li>• <strong>Wenn Netto gegeben:</strong> Steuer = Netto × 0,19 (oder 0,07). Brutto = Netto × 1,19.</li>
                <li>• <strong>Wenn Brutto gegeben:</strong> Netto = Brutto / 1,19. Steuer = Brutto - Netto.</li>
                <li>• <strong>Todsünde in der Klausur:</strong> Niemals einfach 19% von einem Bruttobetrag abziehen!</li>
              </ul>
            </div>
          </div>
        )}

        {activeCheatTab === 'guv' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Passivkonto Eigenkapital</h4>
              <p className="text-xs text-slate-600 mb-2">Da EK auf der Passivseite steht:</p>
              <div className="text-xs space-y-1 font-mono">
                <div className="text-rose-600 font-bold">• Soll: Minderung des EK</div>
                <div className="text-emerald-600 font-bold">• Haben: Mehrung des EK</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">GuV-Erfolgskonten</h4>
              <p className="text-xs text-slate-600 mb-2">Warum Aufwand im Soll steht:</p>
              <div className="text-xs space-y-1 font-mono">
                <div className="text-rose-600 font-bold">• Aufwand mindert EK ➔ SOLL</div>
                <div className="text-emerald-600 font-bold">• Ertrag mehrt EK ➔ HABEN</div>
              </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-1">Abschluss am 31.12.</h4>
              <p className="text-xs text-slate-600 mb-2">GuV-Saldo fließt ins EK:</p>
              <div className="text-xs space-y-1 font-mono">
                <div className="text-emerald-600 font-bold">• Gewinn: GuV an EK</div>
                <div className="text-rose-600 font-bold">• Verlust: EK an GuV</div>
              </div>
            </div>
          </div>
        )}

        {activeCheatTab === 'bilanz' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-emerald-50 p-3 rounded-2xl border border-emerald-200 text-center">
              <div className="font-bold text-emerald-900 text-sm">Aktivtausch</div>
              <div className="text-emerald-700 mt-1">Aktiv(+) & Aktiv(-)</div>
              <div className="font-semibold text-emerald-800 mt-1">Summe: = Konstant</div>
              <div className="text-[11px] text-emerald-600 mt-1">Bargeld gegen Möbel</div>
            </div>
            <div className="bg-blue-50 p-3 rounded-2xl border border-blue-200 text-center">
              <div className="font-bold text-blue-900 text-sm">Passivtausch</div>
              <div className="text-blue-700 mt-1">Passiv(+) & Passiv(-)</div>
              <div className="font-semibold text-blue-800 mt-1">Summe: = Konstant</div>
              <div className="text-[11px] text-blue-600 mt-1">Umschuldung Kredit</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-2xl border border-purple-200 text-center">
              <div className="font-bold text-purple-900 text-sm">Bilanzverlängerung</div>
              <div className="text-purple-700 mt-1">Aktiv(+) & Passiv(+)</div>
              <div className="font-semibold text-purple-800 mt-1">Summe: ⬆ Steigt</div>
              <div className="text-[11px] text-purple-600 mt-1">Kreditaufnahme / Ziel</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 text-center">
              <div className="font-bold text-amber-900 text-sm">Bilanzverkürzung</div>
              <div className="text-amber-700 mt-1">Aktiv(-) & Passiv(-)</div>
              <div className="font-semibold text-amber-800 mt-1">Summe: ⬇ Sinkt</div>
              <div className="text-[11px] text-amber-600 mt-1">Schuldentilgung</div>
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Filter nach Vorlesung:</span>
        <button
          onClick={() => setSelectedFolge('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedFolge === 'all'
              ? 'bg-slate-900 text-white shadow'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Alle 17 Notizen
        </button>
        <button
          onClick={() => setSelectedFolge(1)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedFolge === 1
              ? 'bg-emerald-600 text-white shadow'
              : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
          }`}
        >
          Folge 1: Gründung & Bilanz (6)
        </button>
        <button
          onClick={() => setSelectedFolge(2)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedFolge === 2
              ? 'bg-blue-600 text-white shadow'
              : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
          }`}
        >
          Folge 2: Einkauf, Vorsteuer & Küchenmaschine (6)
        </button>
        <button
          onClick={() => setSelectedFolge(3)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedFolge === 3
              ? 'bg-purple-600 text-white shadow'
              : 'bg-purple-50 text-purple-800 hover:bg-purple-100'
          }`}
        >
          Folge 3: GuV, Sorbet-Herstellung & Matrix (5)
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.map((note) => {
          const matchingExercise = getExerciseById(note.exerciseId);

          return (
            <div
              key={note.id}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                    <span>Folge {note.folge}</span>
                    <span>•</span>
                    <span>{note.aufgabe}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Foto: {note.imageRef.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {note.title}
                </h3>

                {/* Rabias Handwritten Quote */}
                <div className="bg-amber-50/80 border-l-4 border-amber-400 p-3.5 rounded-r-2xl">
                  <div className="text-[10px] font-bold text-amber-700 uppercase tracking-wide flex items-center gap-1 mb-1">
                    <span>✍️</span> Rabias Notiz auf dem WhatsApp-Bild:
                  </div>
                  <p className="text-xs font-serif italic text-amber-950">
                    &ldquo;{note.rabiaQuote}&rdquo;
                  </p>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-bold text-rose-700">Hier hakte es: </span>
                    <span className="text-slate-600">{note.problem}</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-700">Didaktische Auflösung: </span>
                    <span className="text-slate-800">{note.solution}</span>
                  </div>
                </div>

                {/* Optional Formula / Buchungssatz */}
                {note.formula && (
                  <div className="bg-slate-50 p-2.5 rounded-xl text-xs font-mono text-slate-800 border border-slate-200">
                    <span className="text-[10px] text-slate-400 block font-sans uppercase font-bold">Formel / Beträge:</span>
                    {note.formula}
                  </div>
                )}

                {note.buchungssatz && (
                  <div className="bg-emerald-50/60 p-2.5 rounded-xl text-xs font-mono text-emerald-950 border border-emerald-200/60 whitespace-pre-line">
                    <span className="text-[10px] text-emerald-700 block font-sans uppercase font-bold">Buchungssatz:</span>
                    {note.buchungssatz}
                  </div>
                )}

                {/* Klausur-Tipp */}
                <div className="bg-slate-900 text-emerald-300 p-3 rounded-2xl text-xs flex items-start gap-2">
                  <span className="shrink-0 text-sm">🎓</span>
                  <span><strong>JLU-Klausur-Tipp:</strong> {note.klausurTipp}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                {matchingExercise && (
                  <button
                    onClick={() => onSelectExercise(matchingExercise)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <span>🎯</span> Jetzt üben
                  </button>
                )}

                <button
                  onClick={() =>
                    onOpenTutor(
                      `Erkläre mir bitte ausführlich und mit universitärem JLU-Standard die Notiz zu Folge ${note.folge} (${note.aufgabe}): "${note.rabiaQuote}". Warum war mein Gedankengang falsch und wie merke ich es mir für die Klausur von Prof. Ewelt-Knauer?`,
                      `Rabia Notiz zu Folge ${note.folge} (${note.aufgabe}) - ${note.title}`
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
                >
                  <span>🤖</span> KI mit Thinking
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
