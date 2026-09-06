'use client';

import React, { useState } from 'react';
import {
  X,
  Brain,
  Lightbulb,
  ListOrdered,
  Calculator,
  AlertTriangle,
  Send,
  Sparkles,
  Scale,
  RefreshCw,
} from 'lucide-react';

interface AITutorDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeContext?: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const AITutorDrawer: React.FC<AITutorDrawerProps> = ({
  isOpen,
  onClose,
  activeContext = 'Aufgabe 2.2: Anschaffung der Küchenmaschine',
}) => {
  const [query, setQuery] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isGenerating) return;

    const userText = query.trim();
    setQuery('');
    const newMessages: ChatMessage[] = [...chatMessages, { role: 'user', content: userText }];
    setChatMessages(newMessages);
    setIsGenerating(true);

    try {
      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userText,
          context: activeContext,
          history: newMessages.slice(-4),
        }),
      });

      const data = await res.json();
      const reply = data.reply || 'Entschuldigung, die Antwort konnte nicht verarbeitet werden.';

      setChatMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (err: any) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Hinweis: Bei der Server-Kommunikation ist ein Fehler aufgetreten. Merke für die Klausur: Vorsteuer entsteht sofort bei Leistungserbringung im Soll und mindert niemals den Bruttobetrag direkt ohne Formel!',
        },
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop Scrim */}
      <div
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over Drawer */}
      <aside
        aria-label="JLU Accounting Copilot"
        className="fixed top-20 right-0 bottom-0 w-full sm:w-[460px] bg-surface shadow-[-4px_0_24px_-4px_rgba(15,23,42,0.16)] z-50 flex flex-col justify-between overflow-hidden border-l border-border-hairline"
      >
        {/* 1. Drawer Header */}
        <div className="px-5 py-4 bg-surface border-b border-border-hairline flex flex-col gap-1.5 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-base text-secondary leading-tight">
                  JLU Accounting Copilot
                </h2>
                <p className="text-xs text-text-muted">Schritt-für-Schritt Erklärung</p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Drawer schließen"
              className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Copilot Model Status Pill */}
          <div className="flex items-center gap-2 mt-1 px-2.5 py-1 rounded-md bg-surface-variant border border-border-hairline">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-[11px] text-on-surface-variant">
              Gemini 3.8 Flash aktiv (Temperatur 0.2)
            </span>
          </div>
        </div>

        {/* Scrollable Educational Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          
          {/* Sektion 1: Der Kerngedanke */}
          <section className="rounded-xl p-4 bg-primary-container text-on-primary-container border border-blue-200 flex flex-col gap-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-primary">
              <Lightbulb className="w-4 h-4 fill-primary/20" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Sektion 1 · Der Kerngedanke
              </span>
            </div>
            <h3 className="font-bold text-sm text-secondary">
              Warum ist das KEINE geleistete Anzahlung?
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-on-primary-container">
              Eine Anzahlung liegt nach <strong className="font-bold">HGB</strong> nur vor, wenn Geld fließt,{' '}
              <span className="underline decoration-primary decoration-2 font-bold">bevor</span> die Maschine geliefert wird. Da Bibi die Maschine sofort in Empfang nimmt, hat sie die volle wirtschaftliche Verfügungsmacht erlangt – die Maschine wird sofort als Anlagevermögen (BGA) aktiviert!
            </p>
          </section>

          {/* Sektion 2: Die Konten-Logik nach JLU-Didaktik */}
          <section className="bg-surface-container-low rounded-xl p-4 border border-border-hairline flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <ListOrdered className="w-4 h-4 text-secondary" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                  Sektion 2 · JLU-Konten-Logik
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] font-semibold">
                4 Schritte
              </span>
            </div>

            <div className="flex flex-col gap-1.5 text-xs sm:text-sm">
              {/* Step 1 */}
              <div className="p-2 bg-surface rounded-lg flex items-start gap-2 border border-border-hairline shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div className="flex-1">
                  <span className="text-text-primary">
                    <strong className="font-semibold">BGA</strong> (Aktivkonto) nimmt um{' '}
                    <span className="font-mono text-xs">2.000 €</span> zu
                  </span>
                  <div className="font-mono text-[11px] text-primary font-bold">➔ Buchung im SOLL</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-2 bg-surface rounded-lg flex items-start gap-2 border border-border-hairline shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-primary-container text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div className="flex-1">
                  <span className="text-text-primary">
                    <strong className="font-semibold">Vorsteuer</strong> (Forderung an Finanzamt = Aktivkonto) nimmt um{' '}
                    <span className="font-mono text-xs">380 €</span> zu
                  </span>
                  <div className="font-mono text-[11px] text-primary font-bold">➔ Buchung im SOLL</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-2 bg-surface rounded-lg flex items-start gap-2 border border-border-hairline shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div className="flex-1">
                  <span className="text-text-primary">
                    <strong className="font-semibold">Bank</strong> (Aktivkonto) nimmt um{' '}
                    <span className="font-mono text-xs">714 €</span> ab
                  </span>
                  <div className="font-mono text-[11px] text-tertiary font-bold">➔ Buchung im HABEN</div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-2 bg-surface rounded-lg flex items-start gap-2 border border-border-hairline shadow-2xs">
                <span className="w-5 h-5 rounded-full bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </span>
                <div className="flex-1">
                  <span className="text-text-primary">
                    <strong className="font-semibold">Verbindlichkeiten LuL</strong> (Passivkonto) nehmen um{' '}
                    <span className="font-mono text-xs">1.666 €</span> zu
                  </span>
                  <div className="font-mono text-[11px] text-tertiary font-bold">➔ Buchung im HABEN</div>
                </div>
              </div>
            </div>
          </section>

          {/* Sektion 3: Die exakte Rechnung & Bilanzwirkung */}
          <section className="bg-surface rounded-xl p-4 border border-border-hairline flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted">
                Sektion 3 · Rechnung &amp; Bilanzwirkung
              </span>
            </div>

            {/* Tabular Math Summary */}
            <div className="bg-surface-variant rounded-lg p-3 flex flex-col gap-1 font-mono text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Nettopreis (BGA)</span>
                <span className="font-bold text-text-primary">2.000,00 €</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>+ 19% Vorsteuer</span>
                <span className="font-bold text-text-primary">380,00 €</span>
              </div>
              <div className="flex justify-between text-secondary pt-1 border-t border-border-hairline font-bold">
                <span>Gesamtbetrag brutto</span>
                <span>2.380,00 €</span>
              </div>
              <div className="h-1" />
              <div className="flex justify-between text-on-surface-variant">
                <span>Sofortüberweisung (30%)</span>
                <span className="font-bold text-text-primary">714,00 €</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Zielverbindlichkeit (70%)</span>
                <span className="font-bold text-text-primary">1.666,00 €</span>
              </div>
            </div>

            {/* Formulaic Booking String */}
            <div className="p-3 rounded-lg bg-surface-container-high border border-border-hairline flex flex-col gap-1">
              <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
                Offizieller JLU Buchungssatz:
              </span>
              <p className="font-mono text-xs sm:text-sm text-secondary font-bold leading-relaxed">
                BGA 2.000 € und VSt 380 €<br />
                <span className="text-text-muted font-normal">an</span> Bank 714 € und Verb. LuL 1.666 €
              </p>
            </div>

            {/* Dynamic Classification Badge */}
            <div className="p-3 rounded-lg bg-success-container text-on-success-container border border-emerald-200 flex items-start gap-2.5">
              <Scale className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div className="flex flex-col text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="px-1.5 py-0.5 rounded bg-success text-white font-bold text-[10px] uppercase">
                    Bilanzverlängerung
                  </span>
                  <span className="font-mono font-bold text-success">+1.666,00 €</span>
                </div>
                <p className="mt-1 leading-relaxed text-on-success-container">
                  Aktivseite: +2.000 + 380 - 714 = <strong className="font-mono">+1.666 €</strong><br />
                  Passivseite: Verbindlichkeiten LuL = <strong className="font-mono">+1.666 €</strong>
                </p>
              </div>
            </div>
          </section>

          {/* Sektion 4: JLU Klausur-Tipp von Prof. Dr. Ewelt-Knauer */}
          <section className="rounded-xl p-4 bg-[#FEF3C7] border border-[#FDE68A] flex flex-col gap-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-[#B45309]">
              <AlertTriangle className="w-4 h-4 fill-[#B45309]/20" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                JLU Klausur-Tipp · Prof. Dr. Ewelt-Knauer
              </span>
            </div>
            <h4 className="font-bold text-xs sm:text-sm text-[#78350F]">
              Achtung Klausurfalle: Anzahlungs-Fehlurteil
            </h4>
            <p className="text-xs sm:text-sm text-[#78350F] leading-relaxed">
              <strong className="font-bold">Niemals</strong> die 30% als geleistete Anzahlung buchen, sobald die Rechnung vorliegt und die Ware übergeben wurde! Und Achtung: 19% Vorsteuer werden immer auf den Nettopreis aufgeschlagen, niemals 19% aus dem Bruttobetrag abziehen!
            </p>
          </section>

          {/* Chat History Messages */}
          {chatMessages.length > 0 && (
            <div className="flex flex-col gap-3 pt-2 border-t border-border-hairline">
              <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                Deine Nachfragen im Kontext
              </span>
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-white ml-6 rounded-tr-xs'
                      : 'bg-surface-variant text-text-primary mr-6 rounded-tl-xs border border-border-hairline whitespace-pre-line'
                  }`}
                >
                  {msg.content}
                </div>
              ))}
              {isGenerating && (
                <div className="flex items-center gap-2 text-xs text-text-muted italic px-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                  <span>JLU Accounting Copilot formuliert die Antwort...</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* 4. Interactive Footer Chat Query Input */}
        <div className="p-4 bg-surface border-t border-border-hairline flex flex-col gap-1.5 shrink-0">
          <label className="text-[11px] font-bold text-text-muted uppercase tracking-wider" htmlFor="ai-query-input">
            Rabia, hast du noch eine Rückfrage zum Sachverhalt?
          </label>
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              id="ai-query-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="z.B. Warum mindert Skonto die Vorsteuer?"
              className="w-full bg-surface-variant border border-border-hairline rounded-lg pl-3 pr-10 py-2.5 text-xs sm:text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface transition-all"
            />
            <button
              type="submit"
              disabled={!query.trim() || isGenerating}
              aria-label="Frage absenden"
              className="absolute right-1.5 p-1.5 rounded-md bg-primary text-white hover:bg-primary-hover disabled:opacity-40 transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
          <div className="flex items-center justify-between text-text-muted font-mono text-[10px]">
            <span>Prompt Context: Task #2.2</span>
            <span>JLU Accounting Engine v2.4</span>
          </div>
        </div>
      </aside>
    </>
  );
};
