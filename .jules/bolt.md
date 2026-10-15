## 2025-05-18 - Web Audio API AudioContext Singleton
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API code causes browsers to hit maximum concurrent AudioContext limits (~6 contexts), causing DOMExceptions and memory leaks.
**Action:** Always cache and reuse a shared module-level `AudioContext` singleton for sound synthesizers.
