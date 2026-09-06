import React from 'react';
import { Flame, Heart, Sparkles, Settings as SettingsIcon, GraduationCap, ArrowLeft } from 'lucide-react';
import { UserStats } from '../types';

interface HeaderProps {
  stats: UserStats;
  currentView: 'path' | 'exercise' | 'studio';
  onBackToPath: () => void;
  onOpenSettings: () => void;
  onOpenStudio: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  currentView,
  onBackToPath,
  onOpenSettings,
  onOpenStudio
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left branding & Navigation */}
        <div className="flex items-center gap-3">
          {currentView !== 'path' ? (
            <button
              onClick={onBackToPath}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-jlu-blue hover:bg-slate-100 transition-colors flex items-center gap-1 font-bold text-sm"
              title="Zurück zur Übersicht"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Übersicht</span>
            </button>
          ) : (
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-jlu-blue flex items-center justify-center text-white font-black text-lg shadow-sm border border-jlu-blue-dark">
                J
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-slate-900 text-sm tracking-tight">JLU Accounting</span>
                  <span className="bg-jlu-light text-jlu-blue text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-blue-200">
                    Rabia Edition
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 hidden sm:inline-block">
                  Prof. Dr. Ewelt-Knauer & Prof. Dr. Wöhrmann
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Center / Right stats bar like Duolingo */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Streak */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold text-xs sm:text-sm shadow-2xs">
            <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
            <span>{stats.streakDays}</span>
          </div>

          {/* XP Gems */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-200 text-jlu-blue font-bold text-xs sm:text-sm shadow-2xs">
            <Sparkles className="w-4 h-4 text-jlu-blue fill-jlu-blue" />
            <span>{stats.xp} <span className="hidden md:inline">XP</span></span>
          </div>

          {/* Hearts / Lives */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs sm:text-sm shadow-2xs">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>{stats.hearts}</span>
          </div>

          {/* Rabia's Studio quick button */}
          {currentView === 'path' && (
            <button
              onClick={onOpenStudio}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs hover:bg-emerald-100 transition-colors"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Rabias Problem-Studio</span>
            </button>
          )}

          {/* Settings icon */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Einstellungen"
          >
            <SettingsIcon className="w-5 h-5" />
          </button>

        </div>
      </div>
    </header>
  );
};
