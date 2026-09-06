'use client';

import React from 'react';
import { X, BookOpen, AlertCircle } from 'lucide-react';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaModal: React.FC<FormulaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-3xl rounded-xl shadow-xl overflow-hidden border border-border-hairline animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-secondary text-on-secondary px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-secondary-fixed" />
            <div>
              <h3 className="font-bold text-base sm:text-lg text-white leading-tight">
                JLU Formelsammlung KLR &amp; Buchführung
              </h3>
              <span className="text-xs text-secondary-fixed">
                Prof. Dr. Ewelt-Knauer &amp; Prof. Dr. Wöhrmann · Stand WS 2024/25
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-secondary-container/20 text-white flex items-center justify-center hover:bg-surface/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4 text-xs sm:text-sm">
          
          {/* Section 1 */}
          <div className="p-4 rounded-lg bg-surface-variant border border-border-hairline">
            <h4 className="font-bold text-primary mb-2">1. Ermittlung der Zuschlagssätze (BAB)</h4>
            <div className="font-mono space-y-1.5 text-text-primary text-xs">
              <p><strong>Materialzuschlagssatz (MGKZ)</strong> = (Materialgemeinkosten / Fertigungsmaterial) × 100</p>
              <p><strong>Fertigungszuschlagssatz (FGKZ)</strong> = (Fertigungsgemeinkosten / Fertigungslöhne) × 100</p>
              <p><strong>Verwaltungszuschlagssatz (VwGKZ)</strong> = (Verwaltungsgemeinkosten / Herstellkosten d. Erzeugung) × 100</p>
              <p><strong>Vertriebszuschlagssatz (VtGKZ)</strong> = (Vertriebsgemeinkosten / Herstellkosten d. Umsatzes) × 100</p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="p-4 rounded-lg bg-surface-container-low border border-border-hairline">
            <h4 className="font-bold text-secondary mb-2">2. Standardkalkulationsschema (Kostenträgerstückrechnung)</h4>
            <div className="font-mono space-y-1 text-xs text-text-primary">
              <p>Fertigungsmaterial (FM)</p>
              <p>+ Materialgemeinkosten (MGK = FM × MGKZ)</p>
              <p className="text-primary font-bold">= Materialkosten (MK)</p>
              <p>+ Fertigungslöhne (FL)</p>
              <p>+ Fertigungsgemeinkosten (FGK = FL × FGKZ)</p>
              <p className="text-primary font-bold">= Fertigungskosten (FK)</p>
              <p className="font-bold text-secondary border-t border-border-hairline pt-1">= Herstellkosten der Erzeugung (HK)</p>
              <p>+ Verwaltungsgemeinkosten (VwGK = HK × VwGKZ)</p>
              <p>+ Vertriebsgemeinkosten (VtGK = HK × VtGKZ)</p>
              <p className="font-bold text-secondary border-t border-border-hairline pt-1 text-sm">= Selbstkosten (SK)</p>
            </div>
          </div>

          {/* Section 3: Klausurfalle */}
          <div className="p-3.5 rounded-lg bg-tertiary-fixed border border-amber-300 text-on-tertiary-fixed flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-tertiary shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <strong className="font-bold">JLU Klausur-Falle:</strong> Verwenden Sie bei Verwaltung und Vertrieb als Zuschlagsbasis niemals nur das Material oder die Löhne, sondern stets die gesamten <em>Herstellkosten</em>!
            </div>
          </div>

          {/* Section 4: Bilanzierungsregeln */}
          <div className="p-4 rounded-lg bg-surface border border-border-hairline shadow-2xs">
            <h4 className="font-bold text-secondary mb-2">3. Wesentliche HGB-Buchungsregeln</h4>
            <ul className="list-disc list-inside space-y-1 text-on-surface-variant text-xs">
              <li><strong>§ 253 Abs. 1 HGB:</strong> Vermögensgegenstände werden zu Anschaffungskosten (Netto) aktiviert. Vorsteuer stellt eine Forderung dar.</li>
              <li><strong>Vorsteuer (§ 15 UStG):</strong> Entsteht mit Leistungserbringung und ordnungsgemäßer Rechnung sofort in voller Höhe.</li>
              <li><strong>Geleistete Anzahlungen (§ 266 HGB):</strong> Nur bei Zahlung vor Gefahrenübergang. Sobald die Ware geliefert ist, wird voll aktiviert.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-surface-variant border-t border-border-hairline flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-secondary text-white text-xs sm:text-sm font-semibold hover:bg-primary transition-colors"
          >
            Schließen
          </button>
        </div>

      </div>
    </div>
  );
};
