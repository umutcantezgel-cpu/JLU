'use client';

import React, { useState } from 'react';
import { BookingEntry, BalanceEffect } from '@/data/curriculumTypes';
import { playSuccessSound, playErrorSound } from '@/lib/soundEffects';
import { CheckCircle2, AlertCircle, Plus, Trash2, ArrowRight, Sparkles } from 'lucide-react';

interface BuchungssatzComposerProps {
  correctSoll: BookingEntry[];
  correctHaben: BookingEntry[];
  expectedEffect?: BalanceEffect;
  onSuccess?: () => void;
  onFail?: () => void;
  onOpenTutor?: (context: string) => void;
}

const COMMON_ACCOUNTS = [
  'BGA',
  'Bank',
  'Kasse',
  'Vorsteuer (19%)',
  'Vorsteuer (7%)',
  'Geleistete Anzahlungen',
  'Verbindlichkeiten LuL',
  'Verb. ggb. Kreditinstituten',
  'Rohstoffe',
  'Aufwand für Rohstoffe',
  'Mietaufwand',
  'Zinsaufwand',
  'Umsatzerlöse',
  'Umsatzsteuer (19%)',
  'Umsatzsteuer (7%)',
  'Privatkonto',
  'Eigenkapital',
  'Abschreibungen (AfA)',
  'ARAP',
  'Sonstige Rückstellungen',
  'Eröffnungsbilanzkonto (EBK)',
  'Schlussbilanzkonto (SBK)',
];

export const BuchungssatzComposer: React.FC<BuchungssatzComposerProps> = ({
  correctSoll,
  correctHaben,
  expectedEffect,
  onSuccess,
  onFail,
  onOpenTutor,
}) => {
  const [sollEntries, setSollEntries] = useState<BookingEntry[]>([
    { account: correctSoll[0]?.account || 'BGA', amount: correctSoll[0]?.amount || 0 },
  ]);
  const [habenEntries, setHabenEntries] = useState<BookingEntry[]>([
    { account: correctHaben[0]?.account || 'Bank', amount: correctHaben[0]?.amount || 0 },
  ]);
  const [selectedEffect, setSelectedEffect] = useState<BalanceEffect>('aktivtausch');
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const addSoll = () => {
    setSollEntries([...sollEntries, { account: 'Vorsteuer (19%)', amount: 0 }]);
  };

  const removeSoll = (index: number) => {
    if (sollEntries.length > 1) {
      setSollEntries(sollEntries.filter((_, i) => i !== index));
    }
  };

  const addHaben = () => {
    setHabenEntries([...habenEntries, { account: 'Verbindlichkeiten LuL', amount: 0 }]);
  };

  const removeHaben = (index: number) => {
    if (habenEntries.length > 1) {
      setHabenEntries(habenEntries.filter((_, i) => i !== index));
    }
  };

  const totalSoll = sollEntries.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const totalHaben = habenEntries.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const isBalanced = Math.abs(totalSoll - totalHaben) < 0.01 && totalSoll > 0;

  const handleValidate = () => {
    // Check amounts balance first
    if (!isBalanced) {
      playErrorSound();
      setFeedback({
        isCorrect: false,
        message: `Bilanz-Ungleichgewicht! Soll (${totalSoll.toFixed(2)} €) entspricht nicht Haben (${totalHaben.toFixed(2)} €). Der Buchungssatz muss ausgeglichen sein.`,
      });
      onFail?.();
      return;
    }

    // Check account matches
    const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

    const checkSide = (userEntries: BookingEntry[], targetEntries: BookingEntry[]) => {
      if (userEntries.length !== targetEntries.length) return false;
      const matched = new Set<number>();

      for (const u of userEntries) {
        const uAcc = normalize(u.account);
        const idx = targetEntries.findIndex(
          (t, i) =>
            !matched.has(i) &&
            (normalize(t.account).includes(uAcc) || uAcc.includes(normalize(t.account))) &&
            Math.abs(Number(u.amount) - Number(t.amount)) < 0.05
        );
        if (idx === -1) return false;
        matched.add(idx);
      }
      return true;
    };

    const sollOk = checkSide(sollEntries, correctSoll);
    const habenOk = checkSide(habenEntries, correctHaben);
    const effectOk = !expectedEffect || selectedEffect === expectedEffect;

    if (sollOk && habenOk && effectOk) {
      playSuccessSound();
      setFeedback({
        isCorrect: true,
        message: 'Hervorragend gebucht! Sowohl Soll an Haben als auch die Beträge und die Bilanzwirkung stimmen exakt mit der JLU-Lehre überein!',
      });
      onSuccess?.();
    } else {
      playErrorSound();
      let hintMsg = 'Noch nicht ganz richtig: ';
      if (!sollOk) hintMsg += 'Überprüfe die Soll-Konten oder Beträge. ';
      if (!habenOk) hintMsg += 'Überprüfe die Haben-Konten oder Beträge. ';
      if (!effectOk) hintMsg += 'Die Bilanzwirkung ist noch nicht korrekt gewählt.';
      setFeedback({ isCorrect: false, message: hintMsg });
      onFail?.();
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5 bg-surface rounded-xl border border-border-hairline shadow-sm">
      <div className="flex items-center justify-between border-b border-border-hairline pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
          <h3 className="text-sm font-bold text-secondary uppercase tracking-wider">
            Taktiler JLU Buchungssatz-Composer
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-1 rounded-full font-mono font-bold ${
              isBalanced
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            {isBalanced ? 'Soll = Haben ✓' : 'Soll ≠ Haben'}
          </span>
          {onOpenTutor && (
            <button
              type="button"
              onClick={() => onOpenTutor('Buchungssatz Hilfe')}
              className="text-xs font-semibold text-primary hover:text-primary-hover flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              KI-Tipp
            </button>
          )}
        </div>
      </div>

      {/* Booking Canvas: SOLL an HABEN */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SOLL SIDE */}
        <div className="flex flex-col gap-3 p-3.5 bg-surface-container-low rounded-lg border border-border-hairline">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-secondary tracking-wider">
              Soll (+)
            </span>
            <button
              type="button"
              onClick={addSoll}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Weiteres Soll-Konto
            </button>
          </div>

          <div className="space-y-2">
            {sollEntries.map((entry, index) => (
              <div key={`soll-${index}`} className="flex items-center gap-2">
                <select
                  value={entry.account}
                  onChange={(e) => {
                    const next = [...sollEntries];
                    next[index].account = e.target.value;
                    setSollEntries(next);
                  }}
                  className="flex-1 bg-surface border border-border-hairline rounded-md px-2 py-1.5 text-xs text-text-primary font-medium"
                >
                  {COMMON_ACCOUNTS.map((acc) => (
                    <option key={acc} value={acc}>
                      {acc}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1 w-28">
                  <input
                    type="number"
                    step="any"
                    value={entry.amount === 0 ? '' : entry.amount}
                    onChange={(e) => {
                      const next = [...sollEntries];
                      next[index].amount = parseFloat(e.target.value) || 0;
                      setSollEntries(next);
                    }}
                    placeholder="0.00"
                    className="w-full bg-surface border border-border-hairline rounded-md px-2 py-1.5 text-xs text-right font-mono font-bold text-text-primary"
                  />
                  <span className="text-xs text-text-muted">€</span>
                </div>
                {sollEntries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSoll(index)}
                    className="text-text-muted hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs pt-1 border-t border-border-hairline font-mono font-bold text-secondary">
            <span>Summe Soll:</span>
            <span>{totalSoll.toFixed(2)} €</span>
          </div>
        </div>

        {/* HABEN SIDE */}
        <div className="flex flex-col gap-3 p-3.5 bg-surface-container-low rounded-lg border border-border-hairline">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase text-secondary tracking-wider">
              an Haben (-)
            </span>
            <button
              type="button"
              onClick={addHaben}
              className="text-[11px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Weiteres Haben-Konto
            </button>
          </div>

          <div className="space-y-2">
            {habenEntries.map((entry, index) => (
              <div key={`haben-${index}`} className="flex items-center gap-2">
                <select
                  value={entry.account}
                  onChange={(e) => {
                    const next = [...habenEntries];
                    next[index].account = e.target.value;
                    setHabenEntries(next);
                  }}
                  className="flex-1 bg-surface border border-border-hairline rounded-md px-2 py-1.5 text-xs text-text-primary font-medium"
                >
                  {COMMON_ACCOUNTS.map((acc) => (
                    <option key={acc} value={acc}>
                      {acc}
                    </option>
                  ))}
                </select>
                <div className="flex items-center gap-1 w-28">
                  <input
                    type="number"
                    step="any"
                    value={entry.amount === 0 ? '' : entry.amount}
                    onChange={(e) => {
                      const next = [...habenEntries];
                      next[index].amount = parseFloat(e.target.value) || 0;
                      setHabenEntries(next);
                    }}
                    placeholder="0.00"
                    className="w-full bg-surface border border-border-hairline rounded-md px-2 py-1.5 text-xs text-right font-mono font-bold text-text-primary"
                  />
                  <span className="text-xs text-text-muted">€</span>
                </div>
                {habenEntries.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeHaben(index)}
                    className="text-text-muted hover:text-red-500 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xs pt-1 border-t border-border-hairline font-mono font-bold text-secondary">
            <span>Summe Haben:</span>
            <span>{totalHaben.toFixed(2)} €</span>
          </div>
        </div>
      </div>

      {/* Bilanzwirkung Selector */}
      {expectedEffect && (
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
            Resultierende Bilanzveränderung:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { key: 'aktivtausch', label: 'Aktivtausch' },
              { key: 'passivtausch', label: 'Passivtausch' },
              { key: 'bilanzverlaengerung', label: 'Bilanzverlängerung' },
              { key: 'bilanzverkuerzung', label: 'Bilanzverkürzung' },
              { key: 'erfolgswirksam_aufwand', label: 'Erfolgswirksam (Aufwand)' },
              { key: 'erfolgswirksam_ertrag', label: 'Erfolgswirksam (Ertrag)' },
              { key: 'erfolgsneutral', label: 'Erfolgsneutral' },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedEffect(key as BalanceEffect)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                  selectedEffect === key
                    ? 'bg-primary text-white border-primary shadow-xs'
                    : 'bg-surface text-text-primary border-border-hairline hover:bg-surface-variant'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Alert */}
      {feedback && (
        <div
          className={`p-3.5 rounded-lg text-xs flex items-start gap-2.5 animate-in fade-in duration-200 ${
            feedback.isCorrect
              ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
              : 'bg-red-50 text-red-900 border border-red-300'
          }`}
        >
          {feedback.isCorrect ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 leading-relaxed">{feedback.message}</div>
        </div>
      )}

      {/* Validation Trigger Button */}
      <button
        type="button"
        onClick={handleValidate}
        className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-bold text-sm shadow-sm transition-colors flex items-center justify-center gap-2"
      >
        <span>Buchungssatz überprüfen</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};
