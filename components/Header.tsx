'use client';

import React from 'react';
import { Timer, User, Menu, X, Sparkles, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
  onOpenTutor?: () => void;
  onNavigate?: (section: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMobileMenu,
  onToggleMobileMenu,
  isMobileMenuOpen,
  onOpenTutor,
  onNavigate,
  activeSection,
}) => {
  const handleToggle = onToggleMobileMenu || onOpenMobileMenu;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 apple-glass z-50 transition-all">
      <div className="h-16 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Mobile hamburger + University Branding */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={handleToggle}
            className="p-2 -ml-1 text-slate-700 hover:bg-black/[0.04] active:bg-black/[0.08] rounded-xl lg:hidden transition-colors"
            aria-label="Navigation umschalten"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div
            onClick={() => onNavigate?.('lernplan')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* University Monogram Pill */}
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-xs transition-transform group-hover:scale-105">
              JLU
            </div>

            {/* University & Module Name */}
            <div className="flex flex-col">
              <span className="font-semibold text-xs sm:text-sm text-slate-900 leading-tight tracking-tight">
                Accounting Tutor
              </span>
              <span className="text-[11px] text-slate-500 hidden sm:inline leading-none mt-0.5">
                FB 02 Wirtschaftswissenschaften · Gießen
              </span>
            </div>
          </div>

          {/* Module Subtle Pill */}
          <div className="hidden xl:flex items-center px-2.5 py-0.5 rounded-full bg-black/[0.03] border border-black/[0.04] ml-2">
            <span className="text-[10px] font-medium text-slate-600 tracking-tight">
              Buchführung &amp; Kostenrechnung
            </span>
          </div>
        </div>

        {/* Right: Actions & Student Status */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Copilot Quick Launcher Button */}
          <button
            onClick={onOpenTutor}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0071e3]/10 hover:bg-[#0071e3]/15 active:bg-[#0071e3]/20 text-[#0071e3] font-medium text-xs transition-all active:scale-[0.98]"
            title="JLU Accounting Copilot öffnen"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">KI-Copilot</span>
          </button>

          {/* Countdown Pill -> Navigates to Lernplan */}
          <button
            type="button"
            onClick={() => onNavigate?.('lernplan')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/[0.03] hover:bg-black/[0.06] text-slate-700 border border-black/[0.05] transition-all cursor-pointer select-none active:scale-[0.98]"
            title="Offiziellen JLU-Lernplan öffnen"
          >
            <Timer className="w-3.5 h-3.5 text-[#0071e3] shrink-0" />
            <span className="text-xs font-medium tracking-tight">18 Tage bis zur Klausur</span>
          </button>

          {/* Rabia's Progress Pill (Apple Health / Activity style) */}
          <div
            onClick={() => onNavigate?.('lernplan')}
            className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-black/[0.06] cursor-pointer group select-none"
            title="Lernfortschritt anzeigen"
          >
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs text-slate-800">Rabia</span>
                <span className="text-[11px] font-mono font-medium text-slate-500">
                  62%
                </span>
              </div>
              <div className="w-16 sm:w-20 h-1 bg-black/[0.06] rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-[#0071e3] rounded-full transition-all duration-500"
                  style={{ width: '62%' }}
                />
              </div>
            </div>

            {/* Profile Avatar */}
            <div className="w-7 h-7 rounded-full bg-slate-100 border border-black/[0.06] flex items-center justify-center text-slate-700 shadow-2xs group-hover:border-slate-400 transition-colors">
              <User className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
