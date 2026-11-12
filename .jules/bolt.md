## 2025-05-18 - Web Audio API AudioContext Singleton Caching
**Learning:** Instantiating `new AudioContext()` on every UI interaction sound trigger creates new OS audio hardware pipelines each time and quickly hits browser concurrent context limits (~6 instances in Chromium and WebKit). Once reached, subsequent calls fail with DOMException, leak memory, or cause noticeable sound delays.
**Action:** Always maintain a lazily instantiated singleton `AudioContext` in client-side audio utilities and resume it on interaction if suspended.
