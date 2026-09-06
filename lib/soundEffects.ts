// Web Audio API Sound Synthesizer for Duolingo-style feedback
// Works completely offline without external audio files, with mute toggle support

let isMuted = false;

export const setAudioMuted = (muted: boolean) => {
  isMuted = muted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('jlu_audio_muted', muted ? 'true' : 'false');
  }
};

export const getAudioMuted = (): boolean => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('jlu_audio_muted') === 'true';
  }
  return isMuted;
};

const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;
  return new AudioCtx();
};

export const playSuccessSound = () => {
  if (getAudioMuted()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Pleasant Duolingo-like major triad arpeggio (C5 -> E5 -> G5)
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

      gain.gain.setValueAtTime(0, ctx.currentTime + index * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + index * 0.08 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + index * 0.08);
      osc.stop(ctx.currentTime + index * 0.08 + 0.36);
    });
  } catch (e) {
    console.debug('Web Audio not supported or blocked:', e);
  }
};

export const playErrorSound = () => {
  if (getAudioMuted()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Gentle, non-harsh error drop (E3 -> B2)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(164.81, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(123.47, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.32);
  } catch (e) {
    console.debug('Web Audio not supported or blocked:', e);
  }
};

export const playFanfareSound = () => {
  if (getAudioMuted()) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Triumphant level-up / exam passed fanfare
    const chords = [
      { notes: [523.25, 659.25], start: 0, dur: 0.15 },
      { notes: [587.33, 739.99], start: 0.15, dur: 0.15 },
      { notes: [659.25, 783.99], start: 0.30, dur: 0.15 },
      { notes: [783.99, 1046.50], start: 0.45, dur: 0.55 },
    ];

    chords.forEach(({ notes, start, dur }) => {
      notes.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

        gain.gain.setValueAtTime(0, ctx.currentTime + start);
        gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + dur);
      });
    });
  } catch (e) {
    console.debug('Web Audio not supported or blocked:', e);
  }
};
