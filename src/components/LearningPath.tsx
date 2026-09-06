import React from 'react';
import { BookOpen, ShoppingBag, Sparkles, Trophy, Check, Lock, Play, Star, Award, GraduationCap } from 'lucide-react';
import { LessonUnit } from '../types';

interface LearningPathProps {
  units: LessonUnit[];
  onSelectUnit: (unitId: string) => void;
  onOpenStudio: () => void;
}

export const LearningPath: React.FC<LearningPathProps> = ({
  units,
  onSelectUnit,
  onOpenStudio
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'ShoppingBag': return <ShoppingBag className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Trophy': return <Trophy className="w-6 h-6" />;
      default: return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-8 space-y-10">
      
      {/* Hero Welcome Card for Rabia */}
      <div className="bg-gradient-to-br from-jlu-blue to-jlu-blue-dark text-white rounded-3xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-bold mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>JLU Gießen — B.Sc. Wirtschaftswissenschaften</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
            Willkommen, Rabia! 🎓
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm max-w-md font-medium leading-relaxed mb-4">
            Meistere alle Buchungssätze und Aufgaben aus den Vorlesungen von Prof. Dr. Ewelt-Knauer und Prof. Dr. Wöhrmann Schritt für Schritt wie bei Duolingo.
          </p>
          <button
            onClick={onOpenStudio}
            className="bg-white text-jlu-blue font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-2xl shadow-sm hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Deine 17 Problem-Punkte trainieren</span>
          </button>
        </div>
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none" />
      </div>

      {/* Path Units */}
      <div className="space-y-12">
        {units.map((unit, unitIdx) => {
          const isStudio = unit.id === 'rabia-studio';

          return (
            <div key={unit.id} className="space-y-4">
              
              {/* Unit Header Banner */}
              <div className={`rounded-2xl p-4 sm:p-5 flex items-center justify-between border shadow-2xs ${
                isStudio 
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-white border-slate-200 text-slate-900'
              }`}>
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white shadow-xs ${
                    isStudio ? 'bg-emerald-600' : 'bg-jlu-blue'
                  }`}>
                    {getIcon(unit.iconName)}
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                      Lerneinheit {unit.number}
                    </span>
                    <h2 className="text-base sm:text-lg font-black tracking-tight">
                      {unit.title}
                    </h2>
                    <p className="text-xs text-slate-600 font-medium">
                      {unit.subtitle}
                    </p>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-xs font-mono font-bold text-slate-500">
                    {unit.completedExercises} / {unit.totalExercises} Erledigt
                  </span>
                </div>
              </div>

              {/* Duolingo Winding Stepper Nodes */}
              <div className="flex flex-col items-center gap-6 py-2">
                {/* Single main action node for this unit */}
                <div className="relative group">
                  
                  {/* Floating tooltip */}
                  <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-slate-900 text-white font-bold text-[11px] px-3 py-1 rounded-xl shadow-md whitespace-nowrap opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {unit.completedExercises === unit.totalExercises ? 'Erledigt! Wiederholen?' : 'Lektion starten'}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                  </div>

                  {/* Circular Node Button */}
                  <button
                    onClick={() => onSelectUnit(unit.id)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-b-[6px] active:border-b-2 active:translate-y-1 transition-all shadow-md flex flex-col items-center justify-center relative ${
                      isStudio
                        ? 'bg-emerald-600 border-emerald-800 text-white hover:bg-emerald-500'
                        : unit.completedExercises === unit.totalExercises
                        ? 'bg-amber-400 border-amber-600 text-slate-900 hover:bg-amber-300'
                        : 'bg-jlu-blue border-jlu-blue-dark text-white hover:bg-jlu-blue-hover'
                    }`}
                  >
                    {unit.completedExercises === unit.totalExercises ? (
                      <Check className="w-9 h-9 stroke-[3]" />
                    ) : (
                      <Play className="w-8 h-8 fill-current ml-1" />
                    )}
                  </button>

                  {/* Small Star badge on node */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-amber-400 border-2 border-white shadow-xs flex items-center justify-center text-slate-900">
                    <Star className="w-3.5 h-3.5 fill-slate-900" />
                  </div>
                </div>

                {/* Connecting vertical dots */}
                {unitIdx < units.length - 1 && (
                  <div className="flex flex-col items-center gap-1.5 py-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  </div>
                )}

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
