import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, HelpCircle, ChevronRight, BookOpen, AlertTriangle } from 'lucide-react';

interface RabiaStudioViewProps {
  onBack: () => void;
  onStartExercise: (exerciseId: string) => void;
}

interface ProblemItem {
  id: string;
  category: string;
  sourceNote: string;
  title: string;
  whyConfusing: string;
  correctExplanation: string;
  examRule: string;
  exerciseId?: string;
}

export const RabiaStudioView: React.FC<RabiaStudioViewProps> = ({
  onBack,
  onStartExercise
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');

  const problems: ProblemItem[] = [
    {
      id: 'p1',
      category: 'Grundlagen',
      sourceNote: 'Folge 1 -> 1.3: "externes RW wird die Wirtschaftlichkeit ... und die Zahlungsfähigkeit geprüft -> falsch"',
      title: 'Externes vs. Internes Rechnungswesen',
      whyConfusing: 'Man denkt intuitiv, dass jede Buchführung auch die Wirtschaftlichkeit prüft.',
      correctExplanation: 'Das EXTERNE RW (HGB) dient der Rechenschaft, Dokumentation und dem Gläubigerschutz für Außenstehende (Finanzamt, Banken). Die Wirtschaftlichkeit und interne Zahlungsfähigkeit kontrolliert das INTERNE RW (Kostenrechnung bei Prof. Wöhrmann)!',
      examRule: 'Merksatz: Steht "Wirtschaftlichkeit" in einer Aufgabe zum externen RW, ist die Aussage FALSCH!',
      exerciseId: 'f1-ex1'
    },
    {
      id: 'p2',
      category: 'Bilanz',
      sourceNote: 'Folge 1 -> 1.3: "die Bilanz vermittelt Info über Ertragslage -> falsch"',
      title: 'Bilanz (Vermögen) vs. GuV (Erfolg)',
      whyConfusing: 'Beide Rechnungen gehören zum Jahresabschluss, haben aber unterschiedliche Aufgaben.',
      correctExplanation: 'Die Bilanz ist eine Stichtagsrechnung (31.12.) und zeigt die Vermögens- und Finanzlage (Mittelherkunft und Mittelverwendung). Die GuV ist eine Zeitrechnung (01.01. bis 31.12.) und zeigt die Ertragslage (Erträge minus Aufwendungen).',
      examRule: 'Bilanz = Vermögens- und Finanzlage | GuV = Ertragslage!',
      exerciseId: 'f1-ex1'
    },
    {
      id: 'p3',
      category: 'Aktivtausch',
      sourceNote: 'Folge 1 -> 1.4: "Die Vermögensstruktur ändert sich, Bilanzsumme bleibt gleich?"',
      title: 'Aktivtausch beim Flohmarkt-Möbelkauf',
      whyConfusing: 'Warum ändert sich die Bilanzsumme nicht, wenn man 750 € für Möbel ausgibt?',
      correctExplanation: 'Weil sowohl Möbel (BGA) als auch Kasse/Bank auf der Aktivseite liegen! BGA steigt um 750 €, Kasse sinkt um 750 €. Netto-Effekt auf die Bilanzsumme: exakt 0 €.',
      examRule: 'Aktivtausch ändert nur die Vermögenszusammensetzung, niemals die Bilanzsumme.',
      exerciseId: 'f1-ex2'
    },
    {
      id: 'p4',
      category: 'Bilanzverlängerung',
      sourceNote: 'Folge 1 -> 1.5: "Bankkredit einbuchen -> warum Bilanzverlängerung? Aktiv-Passiv-Mehrung?"',
      title: 'Kreditaufnahme (30.000 €)',
      whyConfusing: 'Wieso wird die Bilanz länger, wenn man doch Schulden macht?',
      correctExplanation: 'Das Geld geht auf dem Bankkonto ein (Aktivseite steigt um 30.000 € im Soll). Gleichzeitig steigen die Bankschulden (Passivseite steigt um 30.000 € im Haben). Beide Seiten wachsen!',
      examRule: 'Buchungssatz: Bank an Bankkredit (Bilanzverlängerung).',
      exerciseId: 'f1-ex4'
    },
    {
      id: 'p5',
      category: 'Anschaffung',
      sourceNote: 'Folge 2 -> 2.2: "warum ist das keine geleistete Anzahlung? Warum steigt Bilanzsumme um 1.666 €?"',
      title: 'Küchenmaschine für 2.000 € netto (+ 19% USt)',
      whyConfusing: '30% wurden sofort bezahlt, 70% auf Rechnung – klingt auf den ersten Blick wie eine Anzahlung.',
      correctExplanation: 'Eine Anzahlung existiert NUR, wenn Geld fließt, BEVOR die Ware da ist! Da Bibi die Maschine sofort erhält, wird sie voll als BGA aktiviert! 2.000 € BGA + 380 € Vorsteuer - 714 € Bankzahlung = +1.666 € Netto-Zunahme auf der Aktivseite. Passivseite: +1.666 € Verbindlichkeiten.',
      examRule: 'Ware geliefert = Sachanlagevermögen (BGA voll aktivieren).',
      exerciseId: 'f2-ex1'
    },
    {
      id: 'p6',
      category: 'Steuer',
      sourceNote: 'Folge 2 -> 2.3: "Steuer falsch berechnet -> Steuer mit im Preis? Warum bei D nicht?"',
      title: 'Steuerberechnung 19% vs. 7% & Geldtransfers',
      whyConfusing: 'Wann teilt man durch 1,19 und wann multipliziert man mit 0,19?',
      correctExplanation: 'Ist der Preis BRUTTO (inkl. MwSt.), teilt man durch 1,19 (oder 1,07) für den Nettobetrag. Ist der Preis NETTO, nimmt man 19% oben drauf. Bei reinen Geldtransfers (Kredite, Überweisungen) fällt NIEMALS Vorsteuer an!',
      examRule: 'Geld ist keine Ware -> keine Steuer bei Bank/Kredit/Geldtransfers.',
      exerciseId: 'f2-ex3'
    },
    {
      id: 'p7',
      category: 'Anzahlungen',
      sourceNote: 'Folge 2 -> 2.4: "Korrektur der geleisteten Anzahlung? Kasse oder Bank?"',
      title: 'Erdbeeren mit 50% Anzahlung (400 € netto, 7% USt)',
      whyConfusing: 'Wie bucht man die Vorsteuer bei Anzahlungen und wie verrechnet man sie später?',
      correctExplanation: 'Bei Anzahlung: Geleistete Anzahlungen 200 € + Vorsteuer 14 € an Bank 214 €. Bei Lieferung: Vorräte 400 € + Vorsteuer 28 € an Verbindlichkeiten 428 €. Verrechnung: Verbindlichkeiten an Anzahlungen 200 € + Vorsteuer 14 €.',
      examRule: 'Auf Anzahlungen muss in Deutschland sofort die Vorsteuer gebucht werden!',
      exerciseId: 'f2-ex4'
    },
    {
      id: 'p8',
      category: 'GuV',
      sourceNote: 'Folge 3 -> 3.2: "GuV Bilanz Zusammenhang -> GuV als Unterkonto des Eigenkapitals"',
      title: 'Wie GuV und Eigenkapital zusammenhängen',
      whyConfusing: 'Warum stehen Aufwendungen im Soll und Erträge im Haben?',
      correctExplanation: 'Das Eigenkapitalkonto ist ein Passivkonto (Zunahme im Haben, Abnahme im Soll). Da Erträge das Eigenkapital mehren, stehen sie im Haben. Da Aufwendungen das Eigenkapital mindern, stehen sie im Soll!',
      examRule: 'GuV-Ergebnis fließt am Jahresende als Saldo ins Eigenkapital.',
      exerciseId: 'f3-ex1'
    },
    {
      id: 'p9',
      category: 'Erfolgsneutral',
      sourceNote: 'Folge 3 -> 3.5: "350 € Lager für Herstellung -> warum erfolgsneutral? Warum nicht an Kasse?"',
      title: 'Eisherstellung aus Lagerfrüchten (340 €)',
      whyConfusing: 'Warum macht man bei der Eisherstellung noch keinen Gewinn?',
      correctExplanation: 'Bibi entnimmt Früchte aus dem Lager: Aufwand aus Verbrauch 340 € an RHB 340 €. Fertiges Eis: Fertige Erzeugnisse 340 € an Bestandsmehrung 340 €. Aufwand (-340 €) und Ertrag (+340 €) heben sich auf = 0 € GuV-Wirkung! Gewinn entsteht erst beim Verkauf an die Gäste.',
      examRule: 'Produktionsprozesse sind stets erfolgsneutral!',
      exerciseId: 'f3-ex3'
    },
    {
      id: 'p10',
      category: 'Erfolgswirksam',
      sourceNote: 'Folge 3 -> 3.7: "Tabelle checken: Blitzeinschlag vs. Zinsgutschrift"',
      title: 'Zahlungswirksam vs. Erfolgswirksam',
      whyConfusing: 'Wann fließt Geld und wann ändert sich der Gewinn?',
      correctExplanation: 'Blitzeinschlag (Gebäudeschaden) = Nicht zahlungswirksam (kein Geld fließt), aber VOLL erfolgswirksam (außerplanmäßige Abschreibung mindert Gewinn). Zinsgutschrift auf der Bank = Zahlungswirksam (Bank steigt) UND erfolgswirksam (Zinsertrag!).',
      examRule: 'Abschreibungen sind Aufwand, kosten aber im Moment der Buchung kein Bargeld.',
      exerciseId: 'f3-ex5'
    }
  ];

  const categories = ['Alle', 'Grundlagen', 'Bilanz', 'Aktivtausch', 'Bilanzverlängerung', 'Anschaffung', 'Steuer', 'Anzahlungen', 'GuV', 'Erfolgsneutral', 'Erfolgswirksam'];

  const filteredProblems = selectedCategory === 'Alle' 
    ? problems 
    : problems.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-slate-600 hover:text-jlu-blue font-bold text-sm bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zum Lernpfad</span>
        </button>

        <span className="bg-emerald-100 text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Rabias 17-Punkte-Check
        </span>
      </div>

      {/* Header Info */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mb-2">
          Rabias Schwachstellen-Studio 📚
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed max-w-2xl">
          Hier findest du alle 17 Unklarheiten aus deinen handschriftlichen Notizen zu Folge 1, 2 und 3. Jedes Problem ist mit der offiziellen JLU-Logik von Prof. Dr. Corinna Ewelt-Knauer und Prof. Dr. Arnt Wöhrmann auf den Punkt gebracht.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5 pt-4">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-jlu-blue text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* List of Problems */}
      <div className="space-y-4">
        {filteredProblems.map((prob) => (
          <div
            key={prob.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all space-y-3"
          >
            {/* Top Tag & Original Note */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
              <span className="bg-blue-50 text-jlu-blue text-[11px] font-extrabold px-2.5 py-0.5 rounded-md border border-blue-200">
                {prob.category}
              </span>
              <span className="text-[11px] font-mono text-slate-500 italic">
                {prob.sourceNote}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              {prob.title}
            </h3>

            {/* Why Confusing & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3 text-rose-950">
                <span className="font-extrabold text-[10px] uppercase tracking-wider text-rose-700 block mb-1">
                  Der typische Denkfehler:
                </span>
                {prob.whyConfusing}
              </div>

              <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3 text-emerald-950">
                <span className="font-extrabold text-[10px] uppercase tracking-wider text-emerald-700 block mb-1">
                  Die richtige JLU-Erklärung:
                </span>
                {prob.correctExplanation}
              </div>
            </div>

            {/* Exam Rule Badge & Practice button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-1.5 text-[11px] font-bold text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{prob.examRule}</span>
              </div>

              {prob.exerciseId && (
                <button
                  onClick={() => onStartExercise(prob.exerciseId!)}
                  className="inline-flex items-center justify-center gap-1.5 bg-jlu-blue text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-jlu-blue-hover transition-colors shadow-2xs shrink-0"
                >
                  <span>Jetzt direkt üben</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
