'use client';

import React from 'react';
import Image from 'next/image';
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
    <header className="fixed top-0 left-0 right-0 h-20 bg-surface/95 backdrop-blur-md border-b border-border-hairline z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Mobile hamburger + University Branding */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={handleToggle}
            className="p-2 -ml-1 text-secondary hover:bg-surface-variant rounded-lg lg:hidden transition-colors"
            aria-label="Navigation umschalten"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div
            onClick={() => onNavigate?.('dashboard')}
            className="flex items-center gap-3 cursor-pointer"
          >
            {/* University Crest / Logo Badge */}
            <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-on-primary font-bold text-base shadow-sm shrink-0">
              JLU
            </div>

            {/* University & Chair Name */}
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base text-secondary leading-tight tracking-tight">
                Justus-Liebig-Universität Gießen
              </span>
              <span className="text-[11px] sm:text-xs text-text-muted hidden sm:inline leading-normal">
                FB 02 Wirtschaftswissenschaften · Prof. Dr. Ewelt-Knauer &amp; Prof. Dr. Wöhrmann
              </span>
            </div>
          </div>

          {/* Module Tag */}
          <div className="hidden xl:flex items-center px-3 py-1 rounded-full bg-surface-variant border border-border-hairline ml-2">
            <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
              Buchführung &amp; Kostenrechnung
            </span>
          </div>
        </div>

        {/* Right: Exam Countdown & Rabia Profile */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* AI Copilot Quick Launcher Button */}
          <button
            onClick={onOpenTutor}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-xs transition-colors border border-primary/20"
            title="JLU Accounting Copilot öffnen"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>KI-Copilot</span>
          </button>

          {/* Countdown Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container border border-blue-200">
            <Timer className="w-4 h-4 text-primary shrink-0" />
            <span className="text-xs font-bold tracking-tight">Noch 18 Tage bis zur Klausur</span>
          </div>

          {/* Rabia's Progress Widget */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-border-hairline">
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-text-primary">Rabia</span>
                <span className="px-1.5 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-[11px] font-semibold">
                  62%
                </span>
              </div>
              <div className="w-20 sm:w-24 h-1.5 rounded-full bg-secondary-container overflow-hidden mt-1">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: '62%' }}
                />
              </div>
            </div>

            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-xs">
              <User className="w-4 h-4" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
