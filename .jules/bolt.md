# Bolt's Performance Journal

Critical learnings only. Format: `## YYYY-MM-DD - [Title]` followed by `**Learning:**` and `**Action:**`.

## 2026-03-31 - Web Audio API Hardware Context Limits and Singleton Caching

**Learning:** Re-instantiating `new AudioContext()` on every UI sound effect invocation quickly triggers browser hard limits (~6 concurrent active audio contexts in Chromium and WebKit), which results in DOMExceptions (`The number of hardware contexts provided has reached the maximum`), audio dropouts, and GC pressure during interactive learning sessions.
**Action:** Always maintain a single module-level `AudioContext` singleton, lazily initialize it on first user gesture, and check `context.state === 'suspended'` to call `context.resume()` instead of constructing new contexts.
