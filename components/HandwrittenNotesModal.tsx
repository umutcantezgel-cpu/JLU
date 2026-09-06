'use client';

import React from 'react';
import { X, Download, FileText, CheckCircle, AlertCircle } from 'lucide-react';

interface HandwrittenNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HandwrittenNotesModal: React.FC<HandwrittenNotesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-surface w-full max-w-3xl rounded-xl shadow-xl overflow-hidden border border-border-hairline animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-secondary text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-tertiary-fixed" />
            <div>
              <h3 className="font-bold text-base sm:text-lg leading-tight">
                Rabias handschriftliches Notiz-Protokoll (Folge 1–3)
              </h3>
              <span className="text-xs text-secondary-fixed">
                Mit Anmerkungen &amp; Dozenten-Korrekturen der Übungsleitung WiWi FB 02
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

        {/* Document Canvas Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-slate-50 text-xs sm:text-sm">
          
          <div className="bg-white p-5 rounded-xl border border-border-hairline shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-border-hairline pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-primary">Matrikel: 742189 · Rabia</span>
                <h4 className="font-bold text-base text-secondary">
                  Übungsabgabe 03: Fehlerquellen &amp; Verständnisfragen
                </h4>
              </div>
              <span className="px-2.5 py-1 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-xs font-bold">
                Klausurrelevant
              </span>
            </div>

            {/* Note Entry 1 */}
            <div className="p-3.5 rounded-lg bg-red-50/60 border border-red-200 space-y-2">
              <div className="flex items-center gap-2 text-error font-bold text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Punkt 1: Externes RW &amp; Wirtschaftlichkeit (Aufgabe 1.1 &amp; 1.3)</span>
              </div>
              <p className="italic text-slate-700 font-serif text-sm">
                „Rabias handschriftliche Notiz: Im externen RW wird die Wirtschaftlichkeit der Produktion und interne Zahlungsfähigkeit geprüft...“
              </p>
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 text-xs flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <div>
                  <strong>Dozenten-Vermerk:</strong> FALSCH! Wirtschaftlichkeit &amp; Abteilungscontrolling gehören zwingend in das <em>Interne Rechnungswesen</em> (KLR bei Prof. Wöhrmann). Das externe RW nach HGB schützt Gläubiger und dokumentiert für das Finanzamt.
                </div>
              </div>
            </div>

            {/* Note Entry 2 */}
            <div className="p-3.5 rounded-lg bg-red-50/60 border border-red-200 space-y-2">
              <div className="flex items-center gap-2 text-error font-bold text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Punkt 7: Gewerbe-Rührmaschine &amp; Anzahlung (Aufgabe 2.2)</span>
              </div>
              <p className="italic text-slate-700 font-serif text-sm">
                „Rabias handschriftliche Notiz: 30% sofort bezahlt &rarr; Warum ist das keine geleistete Anzahlung? Und warum erhöht sich die Bilanzsumme um 1.666 €?“
              </p>
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 text-xs flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <div>
                  <strong>Dozenten-Vermerk:</strong> Da Bibi die Maschine sofort erhält, liegt die wirtschaftliche Verfügungsmacht vor. Es wird direkt das Aktivkonto BGA (2.000 €) aktiviert! Die 30% mindern Bank (-714 €) und die 70% mehren Verbindlichkeiten (+1.666 €). Netto-Bilanzverlängerung = genau +1.666 €!
                </div>
              </div>
            </div>

            {/* Note Entry 3 */}
            <div className="p-3.5 rounded-lg bg-red-50/60 border border-red-200 space-y-2">
              <div className="flex items-center gap-2 text-error font-bold text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Punkt 8: Steuer im Preis vs. Aufschlag (Aufgabe 2.3)</span>
              </div>
              <p className="italic text-slate-700 font-serif text-sm">
                „Rabias handschriftliche Notiz: 2.380 € brutto &rarr; 19% abgezogen: 2.380 × 0,19 = 452,20 € Steuer...“
              </p>
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 text-xs flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <div>
                  <strong>Dozenten-Vermerk:</strong> Gravierender Rechenfehler! Brutto entspricht 119%. Netto = 2.380 / 1,19 = 2.000 €. Die enthaltene Vorsteuer beträgt exakt 380,00 €!
                </div>
              </div>
            </div>

            {/* Note Entry 4 */}
            <div className="p-3.5 rounded-lg bg-red-50/60 border border-red-200 space-y-2">
              <div className="flex items-center gap-2 text-error font-bold text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>Punkt 12: Lagerentnahme &amp; GuV (Aufgabe 3.4 &amp; 3.5)</span>
              </div>
              <p className="italic text-slate-700 font-serif text-sm">
                „Rabias handschriftliche Notiz: Bibi entnimmt Früchte für 340 € aus dem Lager &rarr; Fertige Erzeugnisse an Kasse gebucht?“
              </p>
              <div className="p-2.5 bg-emerald-50 border border-emerald-300 rounded text-emerald-900 text-xs flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-success shrink-0 mt-0.5" />
                <div>
                  <strong>Dozenten-Vermerk:</strong> Kasse ist völlig falsch! Es floss kein Bargeld. Buchung 1: Aufwand aus Verbrauch 340 € an RHB 340 €. Buchung 2: Fertige Erzeugnisse 340 € an Bestandsmehrung (Ertrag) 340 €. Reiner erfolgsneutraler Herstellungszyklus!
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-surface border-t border-border-hairline flex items-center justify-between">
          <span className="text-xs text-text-muted">
            Stand: Wintersemester 2024/25 · FB 02 WiWi Gießen
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert('Das handschriftliche Notiz-Protokoll wurde für den Offline-Download vorbereitet.');
              }}
              className="px-4 py-2 rounded-lg bg-surface-variant hover:bg-secondary-container text-text-primary text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Als PDF exportieren</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-secondary text-white text-xs font-semibold hover:bg-primary transition-colors"
            >
              Schließen
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
