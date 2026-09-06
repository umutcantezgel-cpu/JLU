'use client';

import React from 'react';
import {
  LayoutGrid,
  Edit3,
  Brain,
  FileCheck2,
  CheckSquare,
  GraduationCap,
  Calculator,
  FileText,
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  onOpenTutor?: () => void;
  onOpenFormulas?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onNavigate,
  isOpenMobile = false,
  onCloseMobile,
  onOpenTutor,
  onOpenFormulas,
  className = '',
}) => {
  const navItems = [
    {
      id: 'rabia_notes',
      label: 'Rabias Notizen (Folge 1–3)',
      icon: FileText,
      badge: 'Fokus!',
    },
    {
      id: 'path',
      label: 'Lernpfad (Duolingo)',
      icon: GraduationCap,
    },
    {
      id: 'dashboard',
      label: 'Dashboard & Module',
      icon: LayoutGrid,
    },
    {
      id: 'klausur',
      label: 'Klausur-Simulator',
      icon: CheckSquare,
    },
    {
      id: 'arena',
      label: 'Buchungs-Arena',
      icon: Edit3,
    },
    {
      id: 'studio',
      label: 'Fehler-Studio Rabia',
      icon: FileCheck2,
    },
    {
      id: 'ai-tutor',
      label: '1-Klick KI-Tutor',
      icon: Brain,
    },
  ];

  const handleSelect = (id: string) => {
    if (id === 'ai-tutor' && onOpenTutor) {
      onOpenTutor();
      if (onCloseMobile) onCloseMobile();
      return;
    }
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Persistent Sidebar */}
      <aside
        className={`fixed left-0 top-20 bottom-0 w-[280px] bg-surface-container-low border-r border-border-hairline z-40 flex flex-col justify-between py-6 px-4 shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-300 ease-in-out ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${className}`}
      >
        <div className="flex flex-col gap-4">
          <div className="px-2">
            <span className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
              Lernpfad &amp; Module
            </span>
          </div>

          <nav className="flex flex-col gap-1.5" aria-label="Hauptnavigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:bg-surface-variant hover:text-text-primary'
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span className="truncate flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950 shrink-0 shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action: Formelsammlung */}
          {onOpenFormulas && (
            <button
              onClick={onOpenFormulas}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all text-left text-secondary bg-surface-variant/80 hover:bg-secondary-fixed border border-border-hairline"
            >
              <Calculator className="w-5 h-5 shrink-0 text-primary" />
              <span className="truncate">JLU-Formelsammlung</span>
            </button>
          )}
        </div>

        {/* Bottom JLU Exam Tip Card */}
        <div className="p-4 rounded-xl bg-surface border border-border-hairline shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <GraduationCap className="w-4 h-4 text-tertiary shrink-0" />
            <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider">
              JLU Klausur-Tipp
            </span>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Soll an Haben: Umsatzsteuer-Buchungssätze stets vor Saldo-Ziehung doppelt prüfen.
          </p>
        </div>
      </aside>
    </>
  );
};
