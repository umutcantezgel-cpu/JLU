import React, { useState } from 'react';
import { X, Key, Volume2, VolumeX, RotateCcw, Heart, ShieldCheck, ExternalLink } from 'lucide-react';
import { UserStats } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  stats: UserStats;
  onUpdateStats: (newStats: Partial<UserStats>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  stats,
  onUpdateStats
}) => {
  const [keyInput, setKeyInput] = useState(stats.geminiApiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateStats({ geminiApiKey: keyInput.trim() });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleRefillHearts = () => {
    onUpdateStats({ hearts: stats.maxHearts });
  };

  const handleToggleSound = () => {
    onUpdateStats({ soundEnabled: !stats.soundEnabled });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-4 flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900">Einstellungen</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6 text-sm text-slate-700">
          
          {/* Gemini API Key Section */}
          <div className="space-y-2.5">
            <label className="font-bold text-slate-900 flex items-center gap-2 text-xs uppercase tracking-wider">
              <Key className="w-4 h-4 text-jlu-blue" />
              <span>Google Gemini API-Key (Optional)</span>
            </label>
            <p className="text-xs text-slate-500 leading-relaxed">
              Für unbegrenzte individuelle Tutor-Rückfragen in Echtzeit. Du erhältst ihn kostenlos in Google AI Studio. Ohne Key nutzt die App den integrierten JLU-Didaktik-Modus.
            </p>
            <form onSubmit={handleSaveKey} className="space-y-2">
              <input
                type="password"
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-jlu-blue"
              />
              <div className="flex items-center justify-between">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-jlu-blue hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>Key in Google AI Studio holen</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <button
                  type="submit"
                  className="bg-jlu-blue text-white text-xs font-bold px-3.5 py-1.5 rounded-xl hover:bg-jlu-blue-hover transition-colors shadow-2xs"
                >
                  Speichern
                </button>
              </div>
              {savedSuccess && (
                <div className="text-xs text-emerald-600 font-bold flex items-center gap-1 mt-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>API-Key sicher gespeichert!</span>
                </div>
              )}
            </form>
          </div>

          <hr className="border-slate-100" />

          {/* Sound Toggle */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Duolingo-Soundeffekte</h4>
              <p className="text-xs text-slate-500">Töne bei richtigen Antworten & Fehlern</p>
            </div>
            <button
              onClick={handleToggleSound}
              className={`p-2.5 rounded-xl border transition-colors ${
                stats.soundEnabled
                  ? 'bg-blue-50 border-blue-200 text-jlu-blue'
                  : 'bg-slate-100 border-slate-200 text-slate-400'
              }`}
            >
              {stats.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>

          <hr className="border-slate-100" />

          {/* Refill Hearts */}
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Herzen auffüllen ❤️</h4>
              <p className="text-xs text-slate-500">Aktuell: {stats.hearts} von {stats.maxHearts} Leben</p>
            </div>
            <button
              onClick={handleRefillHearts}
              className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-100 transition-colors flex items-center gap-1"
            >
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>Voll auffüllen</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
