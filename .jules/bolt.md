# Bolt's Performance Journal

Critical performance learnings and architectural discoveries.

## 2025-05-18 - Web Audio API Singleton Caching
**Learning:** Instantiating `new AudioContext()` on every UI sound invocation allocates hardware audio threads, incurs 10-50ms initialization latency, causes GC pressure, and crashes with a `DOMException` once browsers reach their maximum limit of ~6 concurrent AudioContext instances per tab.
**Action:** Always maintain a lazily initialized, shared module-level `AudioContext` singleton. When reusing, check if `state === 'suspended'` and trigger `.resume()` inside user gesture callbacks to satisfy autoplay policies.
