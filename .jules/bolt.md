## 2025-05-18 - Web Audio API AudioContext Singleton Caching
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API code causes browsers to hit maximum concurrent AudioContext limits (~6 contexts in WebKit/Blink), leading to DOMExceptions, memory bloat, and initialization overhead. Caching a singleton `AudioContext` and resuming it when suspended eliminates context creation overhead and prevents DOMExceptions.
**Action:** Always reuse a module-level cached `AudioContext` singleton when building web audio sound synthesizers.
