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
  Calendar,
  Sparkles,
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
      id: 'lernplan',
      label: 'Offizieller Lernplan',
      icon: Calendar,
      badge: '18 Tage',
    },
    {
      id: 'rabia_notes',
      label: 'Rabias Notizen (Folge 1–3)',
      icon: FileText,
      badge: 'Fokus!',
    },
    {
      id: 'klausur',
      label: 'Klausur-Simulator (DIN A4)',
      icon: CheckSquare,
      badge: 'Neu',
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
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Persistent Apple-style macOS Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-[270px] bg-[#fbfbfd]/90 backdrop-blur-xl border-r border-black/[0.06] z-40 flex flex-col justify-between py-6 px-3.5 transition-transform duration-300 ease-out select-none ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        } ${className}`}
      >
        <div className="flex flex-col gap-5">
          <div className="px-3 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Navigation
            </span>
          </div>

          <nav className="flex flex-col gap-1" aria-label="Hauptnavigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left active:scale-[0.98] ${
                    isActive
                      ? 'bg-[#0071e3] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-black/[0.04] hover:text-slate-950'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-white' : 'text-slate-500'
                    }`}
                  />
                  <span className="truncate flex-1 tracking-tight">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.badge === 'Fokus!'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-black/[0.05] text-slate-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action: Formelsammlung */}
          {onOpenFormulas && (
            <div className="px-1 pt-2 border-t border-black/[0.05]">
              <button
                onClick={onOpenFormulas}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-black/[0.04] transition-all text-left active:scale-[0.98]"
              >
                <Calculator className="w-4 h-4 shrink-0 text-[#0071e3]" />
                <span className="truncate tracking-tight">JLU-Formelsammlung</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom JLU Exam Tip Card (Apple notification card style) */}
        <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="text-[11px] font-semibold text-slate-900 tracking-tight">
              Klausur-Tipp
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Vorsteuer (§ 15 UStG) = Forderung im Soll. Niemals mit Umsatzsteuer (Verbindlichkeit) verwechseln!
          </p>
        </div>
      </aside>
    </>
  );
};
