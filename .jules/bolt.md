## 2025-02-28 - Web Audio API AudioContext Singleton Reuse
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API code causes browsers to hit maximum concurrent AudioContext limits (~6 contexts), causing DOMExceptions and memory overhead.
**Action:** Always cache and reuse a single `AudioContext` singleton, calling `.resume()` if suspended when playing sound effects.
