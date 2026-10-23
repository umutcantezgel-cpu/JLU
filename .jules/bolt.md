## 2025-05-22 - Reusing Web Audio API Contexts & In-Memory Mute State
**Learning:** Creating a `new AudioCtx()` on every sound effect trigger rapidy exhausts browser concurrent context limits (~6 active AudioContexts), throwing DOMExceptions and causing memory leaks. Similarly, synchronously querying `localStorage` on every audio play introduces unnecessary disk I/O.
**Action:** Always maintain a single cached `AudioContext` singleton (auto-resuming when suspended) and cache settings like mute flags in memory on initial access.
