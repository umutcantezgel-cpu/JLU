## 2026-04-18 - AudioContext Singleton Reuse in Sound Synthesis
**Learning:** Instantiating `new AudioContext()` on every sound effect invocation causes browser resource exhaustion, hitting the maximum concurrent AudioContext limit (~6 in WebKit/Blink) and throwing DOMExceptions or leaking system audio threads.
**Action:** Always maintain a module-scoped cached `AudioContext` singleton, reinstantiating only if closed, and resuming if suspended due to autoplay restrictions.
