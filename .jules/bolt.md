## 2025-05-18 - Reuse AudioContext singleton for Web Audio synthesis
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation hits browser concurrent AudioContext limits (~6 contexts) and creates unnecessary GC pressure.
**Action:** Always maintain a cached singleton `AudioContext` instance across sound effect calls and resume it if suspended.
