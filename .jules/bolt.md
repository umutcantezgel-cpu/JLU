## 2026-03-31 - Web Audio Context Singleton Caching
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API code causes browsers to hit maximum concurrent AudioContext limits (~6 contexts in Chrome/Safari), throwing DOMExceptions and causing audio playback latency and memory leaks.
**Action:** Always maintain a cached `AudioContext` singleton instance and call `.resume()` if suspended instead of creating new instances.
