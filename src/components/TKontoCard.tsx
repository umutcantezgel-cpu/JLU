import React from 'react';
import { TKontoEntry } from '../types';

interface TKontoCardProps {
  entry: TKontoEntry;
}

export const TKontoCard: React.FC<TKontoCardProps> = ({ entry }) => {
  const sollSum = entry.sollEntries.reduce((acc, curr) => acc + curr.amount, 0);
  const habenSum = entry.habenEntries.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden text-xs sm:text-sm my-2">
      {/* Account Title Bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-3 py-1.5 flex items-center justify-between">
        <span className="font-bold text-slate-800 tracking-tight flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${entry.isAktiv ? 'bg-blue-500' : 'bg-amber-500'}`} />
          {entry.accountName}
        </span>
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          {entry.isAktiv ? 'Aktivkonto' : 'Passivkonto'}
        </span>
      </div>

      {/* The T-Table */}
      <div className="grid grid-cols-2 relative">
        {/* Center T-bar */}
        <div className="absolute top-0 bottom-0 left-1/2 -ml-px w-[2px] bg-slate-300" />

        {/* Left: SOLL */}
        <div className="p-2.5 pr-3 space-y-1 bg-white">
          <div className="text-[11px] font-extrabold text-jlu-blue uppercase border-b border-slate-200 pb-1 mb-1.5 flex justify-between">
            <span>Soll</span>
            <span className="text-slate-400 font-normal">Zunahme</span>
          </div>
          {entry.sollEntries.length === 0 ? (
            <div className="text-slate-300 text-center py-2 text-xs italic">-</div>
          ) : (
            entry.sollEntries.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-700 font-mono text-xs">
                <span className="truncate pr-1 font-sans">{item.text}</span>
                <span className="font-bold whitespace-nowrap">{item.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
              </div>
            ))
          )}
        </div>

        {/* Right: HABEN */}
        <div className="p-2.5 pl-3 space-y-1 bg-white">
          <div className="text-[11px] font-extrabold text-jlu-blue uppercase border-b border-slate-200 pb-1 mb-1.5 flex justify-between">
            <span>Haben</span>
            <span className="text-slate-400 font-normal">Abnahme</span>
          </div>
          {entry.habenEntries.length === 0 ? (
            <div className="text-slate-300 text-center py-2 text-xs italic">-</div>
          ) : (
            entry.habenEntries.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center text-slate-700 font-mono text-xs">
                <span className="truncate pr-1 font-sans">{item.text}</span>
                <span className="font-bold whitespace-nowrap">{item.amount.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom double line & total */}
      <div className="bg-slate-50 border-t border-slate-200 px-3 py-1 flex justify-between text-[11px] font-mono text-slate-600 border-b-2 border-double border-slate-400">
        <span>Summe Soll: {sollSum.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
        <span>Summe Haben: {habenSum.toLocaleString('de-DE', { minimumFractionDigits: 2 })} €</span>
      </div>
    </div>
  );
};
