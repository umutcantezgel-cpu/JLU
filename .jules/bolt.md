## 2025-05-18 - Web Audio API AudioContext Caching
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API code causes browsers to hit maximum concurrent AudioContext limits (~6 contexts in WebKit/Chromium), causing DOMExceptions, memory leaks, and extra Garbage Collection pressure.
**Action:** Cache a module-level singleton `AudioContext` instance and resume it on interaction if suspended by browser autoplay policy.
