# Bolt's Performance Journal

## 2025-05-24 - Web Audio API AudioContext Singleton Pattern
**Learning:** Instantiating `new AudioContext()` on every audio effect invocation in Web Audio API code causes browsers (Chrome, Safari, Firefox) to quickly hit the concurrent AudioContext limit (~6 contexts). Exceeding this limit throws DOMExceptions (`The number of AudioContexts exceeds the maximum limit`), leading to broken audio playback, memory leaks, and GC pauses on rapid UI interactions.

**Action:** Always maintain a lazily initialized shared `AudioContext` singleton. Check `sharedAudioContext.state === 'suspended'` and trigger `resume()` on user interactions to handle browser autoplay policies without re-creating context instances.
