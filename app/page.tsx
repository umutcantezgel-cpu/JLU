'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { DashboardView } from '@/components/DashboardView';
import { ArenaView } from '@/components/ArenaView';
import { FehlerStudioView } from '@/components/FehlerStudioView';
import { KlausurSimulatorView } from '@/components/KlausurSimulatorView';
import { DuolingoPathView } from '@/components/DuolingoPathView';
import { RabiaNotesView } from '@/components/RabiaNotesView';
import { AITutorDrawer } from '@/components/AITutorDrawer';
import { FormulaModal } from '@/components/FormulaModal';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('rabia_notes'); // Default to Rabia Notes to highlight top focus!
  const [selectedArenaExerciseId, setSelectedArenaExerciseId] = useState<string>('rabia-5');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isTutorOpen, setIsTutorOpen] = useState<boolean>(false);
  const [tutorContext, setTutorContext] = useState<string>(
    'Aufgabe 2.2: Anschaffung der Küchenmaschine (2.000 € Netto + 19% Vorsteuer)'
  );
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState<boolean>(false);

  const handleOpenTutor = (context?: string) => {
    if (context) {
      setTutorContext(context);
    }
    setIsTutorOpen(true);
  };

  const handleNavigate = (section: string) => {
    setActiveSection(section);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-text-primary">
      {/* Top University App Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenTutor={() => handleOpenTutor()}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Structural Framework */}
      <div className="flex-1 flex pt-20">
        
        {/* Unified Sidebar Navigation (Desktop persistent + Mobile slide-over) */}
        <Sidebar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenTutor={() => handleOpenTutor()}
          onOpenFormulas={() => setIsFormulaModalOpen(true)}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Central Viewport Container */}
        <main className="flex-1 lg:pl-[280px] p-4 sm:p-6 lg:p-8 min-w-0 transition-all duration-200">
          <div className="max-w-7xl mx-auto w-full">
            {activeSection === 'rabia_notes' && (
              <RabiaNotesView
                onSelectExercise={(exercise) => {
                  setSelectedArenaExerciseId(exercise.id);
                  handleNavigate('arena');
                }}
                onOpenTutor={(prompt, context) => {
                  setTutorContext(context);
                  setIsTutorOpen(true);
                }}
              />
            )}

            {activeSection === 'dashboard' && (
              <DashboardView
                onNavigate={handleNavigate}
                onOpenTutor={handleOpenTutor}
              />
            )}

            {activeSection === 'path' && (
              <DuolingoPathView
                onOpenTutor={handleOpenTutor}
                onNavigateToKlausur={() => handleNavigate('klausur')}
                onNavigateToStudio={() => handleNavigate('studio')}
              />
            )}

            {activeSection === 'arena' && (
              <ArenaView
                onOpenTutor={handleOpenTutor}
                initialExerciseId={selectedArenaExerciseId}
              />
            )}

            {activeSection === 'studio' && <FehlerStudioView />}

            {activeSection === 'klausur' && (
              <KlausurSimulatorView onOpenTutor={handleOpenTutor} />
            )}
          </div>
        </main>
      </div>

      {/* Slide-Over 1-Click AI Tutor ("JLU Accounting Copilot") */}
      <AITutorDrawer
        isOpen={isTutorOpen}
        onClose={() => setIsTutorOpen(false)}
        activeContext={tutorContext}
      />

      {/* JLU KLR & Buchführung Formula Modal */}
      <FormulaModal
        isOpen={isFormulaModalOpen}
        onClose={() => setIsFormulaModalOpen(false)}
      />
    </div>
  );
}
