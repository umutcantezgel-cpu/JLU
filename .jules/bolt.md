## 2025-05-18 - Reuse AudioContext Singleton to Prevent Browser Resource Exhaustion and Latency

**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API code causes browsers (Chrome, Safari) to quickly hit maximum concurrent AudioContext limits (~6 contexts), causing DOMExceptions, silent audio failures, and memory leaks.

**Action:** Always maintain a cached singleton `AudioContext` instance in Web Audio utilities and invoke `resume()` if the context state is suspended.
