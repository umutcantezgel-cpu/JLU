# Bolt's Performance Journal

## 2025-05-18 - Avoid instantiating AudioContext on every sound effect play
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API code causes browsers to hit maximum concurrent AudioContext limits (~6 contexts), throwing DOMExceptions and causing audio failures, GC overhead, and unnecessary hardware audio node allocation.
**Action:** Cache and reuse a shared singleton `AudioContext` instance across audio triggers, ensuring it resumes if suspended by browser autoplay policies.
