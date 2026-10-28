# Bolt's Journal - Critical Learnings

## 2025-05-18 - Web Audio API AudioContext Reuse
**Learning:** Instantiating `new AudioContext()` on every sound effect play causes browsers to hit maximum concurrent AudioContext limits (~6 contexts), throwing DOMExceptions and causing hardware audio thread allocation latency on every trigger.
**Action:** Always maintain a single module-scoped `AudioContext` instance, lazy-initialize it on demand, and resume it if suspended.
