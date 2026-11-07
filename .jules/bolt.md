# Bolt's Performance Journal - Critical Learnings

## 2026-09-18 - Web Audio API AudioContext Hardware Context Limits
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API code causes browsers (Chrome, Safari, Firefox) to exhaust hardware audio threads after reaching the browser limit (~6 concurrent instances), triggering unhandled DOMExceptions ("The number of hardware contexts provided has reached the limit") and degrading sound playback performance with 10-50ms thread creation latency.
**Action:** Always maintain a module-scoped cached `AudioContext` singleton, create it lazily upon first interaction or closed state, and resume it if suspended by browser autoplay policies.
