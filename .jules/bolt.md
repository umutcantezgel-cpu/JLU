## 2026-11-04 - Singleton AudioContext in Web Audio Synthesizer
**Learning:** Instantiating `new AudioContext()` on every audio effect invocation rapidly exhausts the browser's hardware audio context pool (Blink and WebKit enforce ~6 concurrent active contexts limit), causing DOMExceptions, audio dropouts, and 15–40ms startup latency per sound.
**Action:** Always maintain a lazily initialized `AudioContext` singleton, resume it if suspended by autoplay policies, and reuse it for all synthesizers.
