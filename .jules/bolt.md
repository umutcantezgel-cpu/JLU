# Bolt's Performance Journal

## 2026-09-18 - Web Audio API AudioContext Singleton Caching
**Learning:** Instantiating `new AudioContext()` on every sound effect call (`playSuccessSound`, `playErrorSound`, `playFanfareSound`) exhausts the browser's hardware limit of ~6 concurrent active `AudioContext` instances in Chromium/Safari, throwing DOMExceptions, leaking audio threads, and causing audio latency.
**Action:** Always maintain a lazily instantiated module-level `AudioContext` singleton, check for `'closed'` state before reusing, and call `.resume()` to respect browser autoplay policies on user interaction.
