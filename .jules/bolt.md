## 2025-10-30 - Web Audio API Singleton Caching
**Learning:** Instantiating `new AudioContext()` on every sound effect play in Web Audio API code leads to hitting browser concurrent AudioContext limits (typically ~6 contexts), throwing DOMExceptions and adding context instantiation latency.
**Action:** Always cache and reuse a module-level singleton `AudioContext` instance and resume it on user interaction.
