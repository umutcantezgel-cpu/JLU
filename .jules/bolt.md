# Bolt's Performance Journal

## 2026-11-03 - Web Audio API AudioContext Singleton Reuse
**Learning:** Instantiating `new AudioContext()` on every synthesized UI sound effect triggers heavy audio thread initialization, consumes system resources, and quickly hits the browser's hard limit for concurrent unclosed hardware audio contexts (~6 in Chrome/WebKit/Blink), throwing fatal `DOMException` errors and leaking memory.
**Action:** Always maintain a single cached `AudioContext` singleton for synthesized sounds, lazily initializing on first user interaction and resuming it via `.resume()` if suspended by browser autoplay policy.
