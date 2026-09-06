import React, { useState } from 'react';
import { X, Sparkles, Send, Lightbulb, CheckCircle2, AlertCircle, BookOpen } from 'lucide-react';
import { Exercise } from '../types';

interface AITutorModalProps {
  exercise: Exercise;
  isOpen: boolean;
  onClose: () => void;
  apiKey?: string;
}

export const AITutorModal: React.FC<AITutorModalProps> = ({
  exercise,
  isOpen,
  onClose,
  apiKey
}) => {
  const [customQuestion, setCustomQuestion] = useState('');
  const [conversation, setConversation] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleAskGemini = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;

    const userText = customQuestion.trim();
    setCustomQuestion('');
    setConversation(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    if (apiKey) {
      try {
        const prompt = `Du bist der offizielle Accounting-Tutor der Justus-Liebig-Universität Gießen (JLU) für Studentin Rabia.
Aufgabe: ${exercise.storyPrompt}
Frage der Aufgabe: ${exercise.question}
Rabias Frage an dich: ${userText}
Bitte antworte kurz, didaktisch brillant, ermutigend und universitätskonform (Prof. Dr. Corinna Ewelt-Knauer / Prof. Dr. Arnt Wöhrmann).`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.2 }
          })
        });

        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Konnte leider keine Antwort generieren.';
        setConversation(prev => [...prev, { role: 'assistant', text: reply }]);
      } catch (err: any) {
        setConversation(prev => [...prev, {
          role: 'assistant',
          text: `Entschuldigung, beim Abruf über den API-Key gab es einen Fehler: ${err.message}. Aber keine Sorge: Oben findest du bereits die vollständige JLU-Erklärung Schritt für Schritt!`
        }]);
      }
    } else {
      // Local didactic intelligent fallback
      setTimeout(() => {
        let simulatedReply = `Tolle Frage! Bei "${userText}" musst du immer im Hinterkopf behalten: `;
        if (userText.toLowerCase().includes('steuer') || userText.toLowerCase().includes('vorsteuer')) {
          simulatedReply += `Vorsteuer ist eine Forderung an das Finanzamt (Aktivkonto, Zugang im Soll). Sie wird auf Lieferungen und Leistungen fällig – aber NIEMALS bei Geldtransfers oder Krediten!`;
        } else if (userText.toLowerCase().includes('anzahlung')) {
          simulatedReply += `Geleistete Anzahlungen nutzt man nur, wenn Geld fließt BEVOR die Ware da ist. Sobald die Ware geliefert wurde, wird sie direkt voll als Anlagegut (BGA) oder Vorrat erfasst!`;
        } else if (userText.toLowerCase().includes('guv') || userText.toLowerCase().includes('eigenkapital')) {
          simulatedReply += `Die GuV ist das Unterkonto des Eigenkapitals. Erträge stehen im Haben (mehren das EK), Aufwendungen im Soll (mindern das EK).`;
        } else {
          simulatedReply += `Im HGB gilt: Prüfe erst, welches Konto betroffen ist (Aktiv, Passiv, Aufwand, Ertrag). Ein Aktivkonto nimmt im Soll zu und im Haben ab – ein Passivkonto genau umgekehrt!`;
        }
        setConversation(prev => [...prev, { role: 'assistant', text: simulatedReply }]);
        setIsLoading(false);
      }, 700);
      return;
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-2xl max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
        
        {/* Drawer Header */}
        <div className="bg-jlu-blue text-white px-5 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/15 text-white">
              <Sparkles className="w-5 h-5 fill-white/80" />
            </div>
            <div>
              <h3 className="font-extrabold text-base tracking-tight flex items-center gap-2">
                JLU Accounting KI-Tutor
                <span className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full font-semibold">
                  {apiKey ? 'Gemini 1.5 Pro' : 'Didaktik-Modus'}
                </span>
              </h3>
              <p className="text-xs text-blue-100 font-medium">{exercise.lessonTitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-slate-800 text-sm">
          
          {/* 1. Der Kerngedanke */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 font-extrabold text-jlu-blue mb-1 text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-jlu-blue fill-jlu-blue/30" />
              1. Der Kerngedanke (Auf den Punkt)
            </div>
            <p className="text-slate-800 font-medium leading-relaxed">
              {exercise.didacticExplanation.coreIdea}
            </p>
          </div>

          {/* 2. Die Konten-Logik */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 font-extrabold text-slate-800 mb-2 text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-slate-600" />
              2. Die Konten-Logik Schritt für Schritt
            </div>
            <ul className="space-y-1.5">
              {exercise.didacticExplanation.accountLogic.map((logic, i) => (
                <li key={i} className="flex items-start gap-2 text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{logic}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Die exakte Rechnung */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs">
            <div className="font-extrabold text-slate-800 mb-1 text-xs uppercase tracking-wider">
              3. Die Rechnung & Buchungssatz
            </div>
            <p className="font-mono text-xs sm:text-sm text-jlu-blue-dark font-semibold bg-slate-100 p-2.5 rounded-xl border border-slate-200">
              {exercise.didacticExplanation.calculation}
            </p>
          </div>

          {/* 4. JLU Klausur-Tipp */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 font-extrabold text-amber-800 mb-1 text-xs uppercase tracking-wider">
              <AlertCircle className="w-4 h-4 text-amber-600 fill-amber-600/30" />
              4. Offizieller JLU Klausur-Tipp (Prof. Ewelt-Knauer)
            </div>
            <p className="text-amber-900 font-medium text-xs leading-relaxed">
              {exercise.didacticExplanation.examTip}
            </p>
          </div>

          {/* Interactive Chat Thread with Gemini */}
          {conversation.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-slate-200">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Dein Dialog mit dem Tutor</h4>
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl max-w-[85%] ${
                    msg.role === 'user'
                      ? 'ml-auto bg-jlu-blue text-white rounded-br-xs'
                      : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-bl-xs'
                  }`}
                >
                  <p className="text-xs leading-relaxed whitespace-pre-line">{msg.text}</p>
                </div>
              ))}
              {isLoading && (
                <div className="p-3 bg-slate-100 rounded-2xl max-w-[80%] flex items-center gap-2 text-xs text-slate-500 italic">
                  <Sparkles className="w-3.5 h-3.5 animate-spin text-jlu-blue" />
                  Dein Tutor denkt nach...
                </div>
              )}
            </div>
          )}

        </div>

        {/* Bottom interactive question input */}
        <form onSubmit={handleAskGemini} className="p-3.5 bg-slate-50 border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={customQuestion}
            onChange={(e) => setCustomQuestion(e.target.value)}
            placeholder="Etwas noch unklar? Frag deinen JLU-Tutor..."
            className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-jlu-blue focus:border-jlu-blue"
          />
          <button
            type="submit"
            disabled={!customQuestion.trim() || isLoading}
            className="p-2.5 rounded-xl bg-jlu-blue text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-jlu-blue-hover transition-all shrink-0"
            title="Frage senden"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
