## 2025-02-18 - Web Audio API AudioContext Singleton Caching
**Learning:** Instantiating `new AudioContext()` on every sound effect invocation in Web Audio API code triggers hardware audio pipeline initialization, consumes excessive memory, and causes browsers to hit maximum concurrent AudioContext limits (~6 contexts in Chrome/Firefox), throwing DOMExceptions.
**Action:** Always maintain a lazily-initialized shared `AudioContext` singleton, and resume suspended contexts on user interaction.
