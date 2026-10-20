# Bolt's Journal - Critical Learnings

## 2025-02-14 - Web Audio API AudioContext Caching
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API synthesizer code allocates new audio engine instances and rapidly exceeds browser maximum concurrent `AudioContext` limits (~6 contexts), triggering `DOMException: The number of AudioContexts exceeds the maximum limit`.
**Action:** Always maintain a single, lazily initialized `AudioContext` singleton (and handle state auto-resumption on user interaction) when creating offline Web Audio API sound effects.
