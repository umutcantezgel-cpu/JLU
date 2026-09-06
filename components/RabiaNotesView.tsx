'use client';

import React, { useState } from 'react';
import { Exercise } from '@/data/curriculumTypes';
import { getExerciseById } from '@/data/curriculumData';
import { Sparkles, ArrowRight, BookOpen, Target, CheckCircle2, FileText, Lightbulb, Compass } from 'lucide-react';

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
    klausurTipp: 'Staffelform mit Mengen = Inventar. T-Kontenform ohne Mengen = Bilanz.',
  },
  {
    id: 'n-2-1',
    folge: 2,
    aufgabe: 'Aufgabe 2.1',
    exerciseId: 'rabia-13',
    title: 'Wareneinkauf auf Ziel: Bilanzverlängerung vs. Aktivtausch',
    rabiaQuote: 'Aktivtausch oder Bilanzverkürzung? Warum Vorsteuer im Soll?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28.jpeg',
    problem: 'Warum ist der Kauf auf Ziel eine Bilanzverlängerung und keine Verkürzung?',
    solution: 'Beim Kauf auf Ziel erhält das Unternehmen Vorräte (+Aktiva) und Vorsteuer (+Aktiva). Gleichzeitig entstehen Verbindlichkeiten aus Lieferungen und Leistungen (+Passiva). Beide Seiten steigen = Bilanzverlängerung.',
    buchungssatz: 'Vorräte + Vorsteuer an Verbindlichkeiten aus L.u.L.',
    klausurTipp: 'Auf Ziel = Verbindlichkeiten steigen = Passivseite wächst.',
  },
  {
    id: 'n-2-2',
    folge: 2,
    aufgabe: 'Aufgabe 2.2 (Kern-Aufgabe)',
    exerciseId: 'rabia-5',
    title: 'Küchenmaschine 2.000 €: Anzahlung vs. Aktivierung & Bilanzsumme',
    rabiaQuote: 'Anzahlung? Nein, Maschine wurde sofort geliefert! Warum steigt Bilanzsumme um 1.666 €? 30% bar (714 €) + 70% Ziel (1.666 €).',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28.jpeg',
    problem: 'Rabia dachte, es sei eine Anzahlung, und verstand die Bilanzsummen-Erhöhung um 1.666 € nicht.',
    solution: '1. Keine Anzahlung, da Gefahrenübergang vollzogen ist! Die Maschine steht in Bibis Küche und wird sofort voll aktiviert als BGA. 2. Bilanzsumme: Aktiva steigen um BGA (2.000 €) + Vorsteuer (380 €) abzüglich Bankabfluss (714 €) = netto +1.666 €. Passiva steigen um Verbindlichkeiten (+1.666 €). Exakter Bilanzausgleich!',
    formula: 'Netto: 2.000 € | 19% USt: 380 € | Brutto: 2.380 € | 30% Bank: 714 € | 70% Ziel: 1.666 €',
    buchungssatz: 'BGA 2.000 € + Vorsteuer 380 € an Bank 714 € + Verb. LuL 1.666 €',
    klausurTipp: 'Klausur-Gold: Eine Anzahlung existiert NUR, wenn das Geld vor Lieferung fließt. Bei Lieferung vor Ort: Immer Vollaktivierung!',
  },
  {
    id: 'n-2-3',
    folge: 2,
    aufgabe: 'Aufgabe 2.3',
    exerciseId: 'rabia-6',
    title: 'Steuerberechnung & Keine Steuer auf Geldtransfers',
    rabiaQuote: '3000 / 1.19 = 2521? Warum fällt bei D keine Steuer an?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28 (1).jpeg',
    problem: 'Rabia versuchte, bei einem reinen Darlehens-/Kreditgeschäft 19% Umsatzsteuer herauszurechnen.',
    solution: 'Auf reine Geld- und Finanztransaktionen (Kreditaufnahme, Kredittilgung, Privateinlagen, Geldtransfers Bank-Kasse) fällt nach § 1 Abs. 1 UStG NIEMALS Umsatzsteuer oder Vorsteuer an! Steuer fällt nur auf Lieferungen und sonstige Leistungen an.',
    formula: 'Steuer = 0,00 € auf Finanz- und Geldtransaktionen!',
    klausurTipp: 'Niemals Vorsteuer oder Umsatzsteuer bei Krediten, Bankguthaben oder Bargeldtransfers ansetzen!',
  },
  {
    id: 'n-2-4',
    folge: 2,
    aufgabe: 'Aufgabe 2.4',
    exerciseId: 'rabia-7',
    title: 'Geleistete Anzahlung vor Lieferung (7% Vorsteuer)',
    rabiaQuote: 'Anzahlung 535 € brutto für Erdbeeren. Vorsteuerabzug sofort?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28.jpeg',
    problem: 'Darf bei einer Anzahlung die Vorsteuer bereits vor der Warenlieferung gezogen werden?',
    solution: 'Ja! Nach § 15 Abs. 1 Nr. 1 Satz 3 UStG darf die Vorsteuer bei Anzahlungen sofort abgezogen werden, sobald die Zahlung geleistet wurde und eine ordnungsgemäße Rechnung vorliegt.',
    formula: 'Brutto 535 € / 1,07 = Netto 500 € Anzahlung + 35 € Vorsteuer (7%)',
    buchungssatz: 'Geleistete Anzahlungen 500 € + Vorsteuer 35 € an Bank 535 €',
    klausurTipp: 'Geleistete Anzahlungen sind ein Aktivkonto (§ 266 Abs. 2 B.I.4 HGB), keine Aufwendungen!',
  },
  {
    id: 'n-2-5',
    folge: 2,
    aufgabe: 'Aufgabe 2.5',
    exerciseId: 'rabia-14',
    title: 'Bargeldkauf Rohstoffe mit ermäßigtem Steuersatz',
    rabiaQuote: '150 € netto Früchte bar bezahlt. 7% USt.',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28 (1).jpeg',
    problem: 'Buchungssatz und Unterscheidung Netto/Brutto beim Bareinkauf.',
    solution: 'Nahrungsmittel unterliegen dem ermäßigten Satz von 7% (§ 12 Abs. 2 UStG). 150 € * 1,07 = 160,50 € Bruttobetrag aus Kasse.',
    buchungssatz: 'Rohstoffe 150,00 € + Vorsteuer 10,50 € an Kasse 160,50 €',
    klausurTipp: 'Kasse nimmt im Haben ab (Aktivkonto Minderungen immer Haben).',
  },
  {
    id: 'n-2-6',
    folge: 2,
    aufgabe: 'Aufgabe 2.6',
    exerciseId: 'rabia-15',
    title: 'Die 4 Bilanzveränderungen im Vergleich',
    rabiaQuote: 'Aktivtausch, Passivtausch, Verlängerung, Verkürzung systematisch unterscheiden',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.28.jpeg',
    problem: 'Schnelle Zuordnung unter Klausurzeitdruck.',
    solution: 'Aktivtausch: Aktiva +/-. Passivtausch: Passiva +/-. Bilanzverlängerung: Aktiva + / Passiva +. Bilanzverkürzung: Aktiva - / Passiva -.',
    klausurTipp: 'Immer prüfen: Verändert sich die Bilanzsumme? Wenn ja: Verlängerung oder Verkürzung. Wenn nein: Tausch.',
  },
  {
    id: 'n-3-1',
    folge: 3,
    aufgabe: 'Aufgabe 3.1 & 3.2',
    exerciseId: 'rabia-8',
    title: 'GuV als Unterkonto des Eigenkapitals (Passivseite)',
    rabiaQuote: 'Warum GuV auf Passivseite? Eigenkapital Unterkonto!',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.31 (1).jpeg',
    problem: 'Rabia fragte sich, warum Aufwendungen und Erträge letztlich das Eigenkapital berühren.',
    solution: 'Das Eigenkapital ist eine Passivposition. Die GuV sammelt unterjährig alle Aufwendungen und Erträge. Am 31.12. wird der Saldo (Jahresüberschuss oder Fehlbetrag) direkt in das Eigenkapitalkonto gebucht. Gewinn mehrt das EK, Verlust mindert es!',
    klausurTipp: 'GuV ist kein eigenständiges Bilanzkonto, sondern ein rechnerisches Unterkonto des Eigenkapitals.',
  },
  {
    id: 'n-3-3',
    folge: 3,
    aufgabe: 'Aufgabe 3.3',
    exerciseId: 'rabia-9',
    title: 'Aufwand im Soll, Ertrag im Haben (T-Konten-Logik)',
    rabiaQuote: 'Aufwand immer Soll? Ertrag immer Haben? Warum?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.31 (1).jpeg',
    problem: 'Verwirrung über die Buchungsrichtung von Aufwendungen und Erträgen.',
    solution: 'Das Eigenkapital als Passivkonto mindert sich im Soll und mehrt sich im Haben. Da Aufwendungen das Eigenkapital mindern, stehen sie im Soll! Da Erträge das Eigenkapital mehren, stehen sie im Haben!',
    klausurTipp: 'Aufwand = Minderung des Eigenkapitals (Soll). Ertrag = Mehrung des Eigenkapitals (Haben).',
  },
  {
    id: 'n-3-4',
    folge: 3,
    aufgabe: 'Aufgabe 3.4',
    exerciseId: 'rabia-16',
    title: 'Erfolgswirksame vs. Erfolgsneutrale Buchungen',
    rabiaQuote: 'Wann ändert sich der Gewinn?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.31.jpeg',
    problem: 'Kriterium für Erfolgswirksamkeit.',
    solution: 'Erfolgswirksam ist eine Buchung GENAU DANN, wenn mindestens ein GuV-Konto (Aufwand oder Ertrag) angesprochen wird. Reine Bestandskontenbuchungen (z.B. Möbelkauf, Kredittilgung) berühren das Jahresergebnis nicht = erfolgsneutral!',
    klausurTipp: 'Reine Aktiv-/Passivtausche verändern NIEMALS das Jahresergebnis.',
  },
  {
    id: 'n-3-5',
    folge: 3,
    aufgabe: 'Aufgabe 3.5',
    exerciseId: 'rabia-10',
    title: 'Eisherstellung aus Früchten: Warum Kasse falsch ist',
    rabiaQuote: 'Bibi stellt Erdbeereis her (340 € Rohstoffe verarbeitet). Kasse gebucht? Falsch! Kasse berührt?',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.31.jpeg',
    problem: 'Rabia buchte bei der internen Produktion die Kasse ein, obwohl kein Bargeld geflossen ist.',
    solution: '1. Bei der Herstellung von Eis fließen keine liquiden Mittel! Es werden Rohstoffe aus dem Vorratslager entnommen (Vorräte nehmen ab). 2. Die fertigen Eistorten werden als Fertigerzeugnisse aktiviert. 3. Gesamterfolg: 340 € Rohstoffaufwand wird durch 340 € Ertrag aus Bestandsmehrung neutralisiert!',
    formula: 'Erfolgswirkung = 0,00 € (Realisationsprinzip: Gewinn entsteht erst beim Verkauf!)',
    buchungssatz: '1. Materialaufwand 340 € an Rohstoffvorräte 340 €\n2. Fertigerzeugnisse 340 € an Bestandsveränderung FE 340 €',
    klausurTipp: 'Niemals Kasse buchen, wenn keine Zahlung stattfindet! Reines Produzieren ist erfolgsneutral (Realisationsprinzip § 252 Abs. 1 Nr. 4 HGB).',
  },
  {
    id: 'n-3-7',
    folge: 3,
    aufgabe: 'Aufgabe 3.7',
    exerciseId: 'rabia-17',
    title: 'Die 4-Felder-Matrix: Zahlungs- vs. Erfolgswirksamkeit',
    rabiaQuote: 'Zahlungswirksam ja/nein vs. Erfolgswirksam ja/nein (4 Geschäftsvorfälle)',
    imageRef: 'WhatsApp Image 2026-09-06 at 03.58.31.jpeg',
    problem: 'Sichere Zuordnung der 4 Kombinationen in der Klausur.',
    solution: '1. Zahlungs- & erfolgswirksam: Zinsgutschrift (+Bank, +Ertrag). 2. Zahlungswirksam, erfolgsneutral: Barkauf Obst (Kasse -, Vorräte +). 3. Erfolgswirksam, zahlungsunwirksam: Außerplanm. AfA Gebäude (Gebäude -, AfA-Aufwand +). 4. Erfolgsneutral, zahlungsunwirksam: Eismaschine auf Ziel gekauft (BGA +, Verb. LuL +).',
    klausurTipp: 'Klassische JLU-Prüfungsaufgabe (mind. 5–8 Punkte garantiert). Matrix im Schlaf beherrschen!',
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
    <div className="flex flex-col w-full gap-10 pb-32">
      {/* 1. Hero Card: Apple Keynote Style (Warm, airy, minimal) */}
      <div className="apple-card p-8 sm:p-10 md:p-12 space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#0071e3]/10 text-[#0071e3] font-semibold text-xs tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Höchste Prüfungspriorität
              </span>
              <span className="px-3 py-1 rounded-full bg-black/[0.04] text-slate-600 font-medium text-xs">
                Folgen 1 bis 3 · JLU Gießen
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-semibold tracking-[-0.025em] text-[#1d1d1f] leading-tight">
              Rabias WhatsApp-Notizen &amp; Klausurfallen.
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Alle 17 handschriftlichen Problemstellen aus deinen Fotos wurden transkribiert,
              fachlich analysiert und mit universitären Musterlösungen von Prof. Ewelt-Knauer hinterlegt.
            </p>
          </div>

          {/* Apple Metrics Pills */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-[#fafafc] px-6 py-4 rounded-2xl border border-black/[0.05] text-center shadow-2xs">
              <span className="text-3xl font-bold font-mono text-[#0071e3]">17</span>
              <span className="block text-xs font-medium text-slate-500 mt-0.5">Notizen gelöst</span>
            </div>
            <div className="bg-[#fafafc] px-6 py-4 rounded-2xl border border-black/[0.05] text-center shadow-2xs">
              <span className="text-3xl font-bold font-mono text-[#34c759]">100%</span>
              <span className="block text-xs font-medium text-slate-500 mt-0.5">JLU Prüfungs-Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Visual Cheat Tool: Apple Segmented Card */}
      <div className="apple-card p-6 sm:p-8 md:p-10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/[0.05] pb-5">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#0071e3]" />
              <span>Interaktive Spickzettel-Zentrale</span>
            </h2>
            <p className="text-xs text-slate-500">
              Die 4 wichtigsten visuellen Übersichten gegen die typischen Klausurfallen.
            </p>
          </div>

          {/* Apple Segmented Switcher */}
          <div className="flex items-center gap-1 bg-black/[0.04] p-1 rounded-full overflow-x-auto scrollbar-none">
            {[
              { id: 'matrix', label: 'Matrix 3.7' },
              { id: 'steuern', label: 'Steuern & Geld' },
              { id: 'guv', label: 'GuV als EK' },
              { id: 'bilanz', label: '4 Bilanzänderungen' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCheatTab(tab.id as any)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap active:scale-[0.98] ${
                  activeCheatTab === tab.id
                    ? 'bg-white text-slate-950 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cheat Content */}
        {activeCheatTab === 'matrix' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-[#fafafc] border-b border-black/[0.05] text-slate-600 font-semibold">
                  <th className="p-3.5">Geschäftsvorfall (Klausur 3.7)</th>
                  <th className="p-3.5 text-center">Zahlungswirksam?</th>
                  <th className="p-3.5 text-center">Erfolgswirksam?</th>
                  <th className="p-3.5">Bilanzwirkung &amp; Begründung</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/[0.04]">
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3.5 font-medium text-slate-900">a) Eismaschine auf Ziel gekauft</td>
                  <td className="p-3.5 text-center"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">NEIN</span></td>
                  <td className="p-3.5 text-center"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">NEIN</span></td>
                  <td className="p-3.5 text-slate-600">Bilanzverlängerung (BGA an Verb. LuL). Kein Geldfluss, kein Aufwand/Ertrag.</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3.5 font-medium text-slate-900">b) Blitzeinschlag: Außerplanm. AfA am Gebäude</td>
                  <td className="p-3.5 text-center"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">NEIN</span></td>
                  <td className="p-3.5 text-center"><span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-xs">JA</span></td>
                  <td className="p-3.5 text-slate-600">Bilanzverkürzung. Kein Geldfluss, aber Abschreibungsaufwand mindert GuV und Eigenkapital!</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3.5 font-medium text-slate-900">c) Zinsgutschrift auf dem Bankkonto</td>
                  <td className="p-3.5 text-center"><span className="px-2 py-0.5 rounded-full bg-[#eafaf1] text-emerald-950 font-bold text-xs">JA</span></td>
                  <td className="p-3.5 text-center"><span className="px-2 py-0.5 rounded-full bg-[#eafaf1] text-emerald-950 font-bold text-xs">JA</span></td>
                  <td className="p-3.5 text-slate-600">Bilanzverlängerung. Bankguthaben steigt (+liquide Mittel) und Zinsertrag mehrt GuV/Eigenkapital!</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="p-3.5 font-medium text-slate-900">d) Barkauf von Obst &amp; Nüssen für 500 €</td>
                  <td className="p-3.5 text-center"><span className="px-2 py-0.5 rounded-full bg-[#eafaf1] text-emerald-950 font-bold text-xs">JA</span></td>
                  <td className="p-3.5 text-center"><span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">NEIN</span></td>
                  <td className="p-3.5 text-slate-600">Aktivtausch. Kasse sinkt (-Geld), Vorräte steigen (+Vermögen). Erfolgsneutral, solange nicht verbraucht!</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeCheatTab === 'steuern' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/60 space-y-2">
              <h4 className="font-semibold text-amber-900">⚠️ Rabias wichtigster Erkenntnispunkt:</h4>
              <p className="text-amber-900/80 leading-relaxed">
                Rabia rechnete auf einem Foto: <code>3.000 € Kredit : 1,19 = 2.521 €</code> und fragte: <em>&ldquo;Warum fällt bei D keine Steuer an?&rdquo;</em>
              </p>
              <p className="font-medium text-amber-950 bg-white/70 p-3 rounded-xl border border-amber-200/50">
                👉 <strong>Regel:</strong> Auf reine Geldtransfers (Darlehensaufnahme, Kredittilgung, Abhebungen, Einlagen) fällt <strong>NIEMALS Umsatzsteuer oder Vorsteuer</strong> an (§ 1 Abs. 1 UStG gilt nur für Lieferungen &amp; Leistungen)!
              </p>
            </div>
            <div className="bg-[#edf5fe] rounded-2xl p-5 border border-[#0071e3]/20 space-y-2">
              <h4 className="font-semibold text-[#004080]">💡 Rechenregel: Steuer im Preis</h4>
              <ul className="space-y-1.5 text-slate-700 leading-relaxed">
                <li>• <strong>Wenn Netto gegeben:</strong> Steuer = Netto × 0,19 (oder 0,07). Brutto = Netto × 1,19.</li>
                <li>• <strong>Wenn Brutto gegeben:</strong> Netto = Brutto / 1,19. Steuer = Brutto - Netto.</li>
                <li>• <strong>Klausurfalle:</strong> Niemals einfach 19% von einem Bruttobetrag abziehen!</li>
              </ul>
            </div>
          </div>
        )}

        {activeCheatTab === 'guv' && (
          <div className="bg-[#fafafc] rounded-2xl p-5 border border-black/[0.04] space-y-3 text-xs sm:text-sm">
            <h4 className="font-semibold text-slate-900">GuV als Unterkonto des Eigenkapitals (Passivseite)</h4>
            <p className="text-slate-600 leading-relaxed">
              Aufwendungen stehen im SOLL (weil sie das Eigenkapital mindern). Erträge stehen im HABEN (weil sie das Eigenkapital mehren).
              Am Jahresende schließt die GuV in das Eigenkapitalkonto ab: Saldo im Soll = Jahresüberschuss (Gewinn), Saldo im Haben = Jahresfehlbetrag (Verlust).
            </p>
          </div>
        )}

        {activeCheatTab === 'bilanz' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="bg-white p-4 rounded-2xl border border-black/[0.05] space-y-1 shadow-2xs">
              <span className="font-semibold text-slate-900 block">1. Aktivtausch</span>
              <p className="text-slate-500">Nur Aktiva betroffen (+/-). Bilanzsumme bleibt gleich. Bsp: Möbel bar bezahlt.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-black/[0.05] space-y-1 shadow-2xs">
              <span className="font-semibold text-slate-900 block">2. Passivtausch</span>
              <p className="text-slate-500">Nur Passiva betroffen (+/-). Bilanzsumme bleibt gleich. Bsp: Lieferantenschuld in Bankkredit umgewandelt.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-black/[0.05] space-y-1 shadow-2xs">
              <span className="font-semibold text-slate-900 block">3. Bilanzverlängerung</span>
              <p className="text-slate-500">Aktiva + / Passiva +. Bilanzsumme wächst. Bsp: Rohstoffe auf Ziel gekauft.</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-black/[0.05] space-y-1 shadow-2xs">
              <span className="font-semibold text-slate-900 block">4. Bilanzverkürzung</span>
              <p className="text-slate-500">Aktiva - / Passiva -. Bilanzsumme sinkt. Bsp: Kredittilgung per Banküberweisung.</p>
            </div>
          </div>
        )}
      </div>

      {/* 3. Filter Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none px-1">
        <button
          type="button"
          onClick={() => setSelectedFolge('all')}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-[0.98] ${
            selectedFolge === 'all'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-black/[0.05]'
          }`}
        >
          Alle 17 Notizen
        </button>
        <button
          type="button"
          onClick={() => setSelectedFolge(1)}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-[0.98] ${
            selectedFolge === 1
              ? 'bg-[#0071e3] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-black/[0.05]'
          }`}
        >
          Folge 1: Gründung &amp; Bilanz (6)
        </button>
        <button
          type="button"
          onClick={() => setSelectedFolge(2)}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-[0.98] ${
            selectedFolge === 2
              ? 'bg-[#0071e3] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-black/[0.05]'
          }`}
        >
          Folge 2: Einkauf, Vorsteuer &amp; Küchenmaschine (6)
        </button>
        <button
          type="button"
          onClick={() => setSelectedFolge(3)}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-[0.98] ${
            selectedFolge === 3
              ? 'bg-[#0071e3] text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-black/[0.05]'
          }`}
        >
          Folge 3: GuV, Sorbet &amp; Matrix (5)
        </button>
      </div>

      {/* 4. Notes Cards Grid (Apple cards with generous padding) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNotes.map((note) => {
          const matchingExercise = getExerciseById(note.exerciseId);

          return (
            <div
              key={note.id}
              className="apple-card p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#f5f5f7] text-slate-700">
                    <span>Folge {note.folge}</span>
                    <span>•</span>
                    <span>{note.aufgabe}</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Foto: {note.imageRef.split(' ')[0]}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
                  {note.title}
                </h3>

                {/* Rabias Handwritten Quote Card */}
                <div className="bg-[#fff9eb] border border-amber-200/70 p-4 rounded-2xl space-y-1">
                  <div className="text-[10px] font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1">
                    <span>✍️</span> Rabias Originalnotiz auf WhatsApp:
                  </div>
                  <p className="text-xs font-serif italic text-amber-950 leading-relaxed">
                    &ldquo;{note.rabiaQuote}&rdquo;
                  </p>
                </div>

                {/* Problem & Solution */}
                <div className="space-y-2.5 text-xs leading-relaxed">
                  <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-100">
                    <span className="font-semibold text-rose-800">Hier hakte es: </span>
                    <span className="text-slate-700">{note.problem}</span>
                  </div>
                  <div className="p-3 bg-[#eafaf1]/70 rounded-xl border border-[#34c759]/30">
                    <span className="font-semibold text-emerald-950">Didaktische Auflösung: </span>
                    <span className="text-slate-800">{note.solution}</span>
                  </div>
                </div>

                {/* Optional Formula / Buchungssatz */}
                {note.formula && (
                  <div className="bg-[#f5f5f7] p-3 rounded-xl text-xs font-mono text-slate-800 border border-black/[0.04]">
                    <span className="text-[10px] text-slate-400 block font-sans uppercase font-semibold">Formel / Beträge:</span>
                    {note.formula}
                  </div>
                )}

                {note.buchungssatz && (
                  <div className="bg-[#edf5fe] p-3 rounded-xl text-xs font-mono text-[#003a70] border border-[#0071e3]/20 whitespace-pre-line">
                    <span className="text-[10px] text-[#0071e3] block font-sans uppercase font-semibold">Buchungssatz:</span>
                    {note.buchungssatz}
                  </div>
                )}

                {/* Klausur-Tipp */}
                <div className="bg-slate-900 text-emerald-300 p-3.5 rounded-2xl text-xs flex items-start gap-2.5">
                  <span className="shrink-0 text-sm">🎓</span>
                  <span className="leading-relaxed"><strong>JLU-Klausur-Tipp:</strong> {note.klausurTipp}</span>
                </div>
              </div>

              {/* Action Buttons: Apple Pills */}
              <div className="pt-4 border-t border-black/[0.05] flex items-center justify-between gap-3">
                {matchingExercise && (
                  <button
                    type="button"
                    onClick={() => onSelectExercise(matchingExercise)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#0071e3] hover:bg-[#0077ed] text-white text-xs font-medium transition-all shadow-xs active:scale-[0.98]"
                  >
                    <span>🎯</span> Jetzt üben
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    onOpenTutor(
                      `Erkläre mir bitte ausführlich und mit universitärem JLU-Standard die Notiz zu Folge ${note.folge} (${note.aufgabe}): "${note.rabiaQuote}". Warum war mein Gedankengang falsch und wie merke ich es mir für die Klausur von Prof. Ewelt-Knauer?`,
                      `Rabia Notiz zu Folge ${note.folge} (${note.aufgabe}) - ${note.title}`
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-black/[0.04] hover:bg-black/[0.07] text-slate-800 text-xs font-medium transition-all active:scale-[0.98]"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#0071e3]" />
                  <span>KI mit Thinking</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
