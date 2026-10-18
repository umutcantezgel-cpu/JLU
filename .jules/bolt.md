## 2025-05-18 - AudioContext Singleton Pattern in Web Audio API
**Learning:** Instantiating `new AudioCtx()` on every sound effect trigger in client-side components causes browsers to rapidly hit maximum concurrent AudioContext limits (~6 concurrent instances), triggering DOMExceptions and causing silent audio playback failures and GC memory allocation churn.
**Action:** Always maintain a single, cached `AudioContext` singleton instance across sound effect helpers, and call `resume()` when suspended by browser autoplay policies.
