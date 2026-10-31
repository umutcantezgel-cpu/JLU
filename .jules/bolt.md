# Bolt's Performance Journal

## 2025-05-18 - Web Audio API AudioContext Singleton Pattern
**Learning:** Instantiating `new AudioContext()` on every synthesized sound effect triggers hardware context creation, causing 5–20ms latency, high GC churn, and a DOMException crash once the browser's hard limit (~6 concurrent AudioContexts in Chromium/WebKit) is reached.
**Action:** Always cache a lazily initialized `AudioContext` singleton, and call `ctx.resume()` if suspended by browser autoplay policy before playing synthesized tones.
