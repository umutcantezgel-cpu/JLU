# Bolt's Performance Journal

Critical learnings and performance insights for this repository.

## 2025-05-18 - AudioContext Singleton Pattern
**Learning:** Instantiating `new AudioCtx()` on every sound effect invocation in Web Audio API code causes browsers to hit maximum concurrent AudioContext limits (~6 contexts), causing DOMExceptions and memory leaks / GC pressure.
**Action:** Always maintain a single cached AudioContext instance, resuming it if suspended on user gesture.
