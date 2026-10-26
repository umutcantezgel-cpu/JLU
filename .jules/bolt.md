## 2025-05-18 - Cache AudioContext singleton in Web Audio API sound synthesizers
**Learning:** Instantiating `new AudioContext()` on every sound effect invocation quickly causes browsers (Chrome/Firefox/Safari) to throw `DOMException: The number of AudioContexts exceeds the maximum limit` (typically ~6 max contexts). Furthermore, creating new contexts causes unneeded object allocation and GC pauses.
**Action:** Always maintain a single module-scoped `cachedAudioCtx` instance in audio utility modules, resume it if suspended on user interaction, and reuse it for all synthesizers/oscillators.
