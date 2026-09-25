# Bolt's Performance Journal

## 2026-03-31 - O(1) Hash Map Indexing for Frequently Rendered Data Lookups
**Learning:** Calling `Array.prototype.find()` repeatedly inside render loops or `.map()` (e.g., matching notes to exercises via `getExerciseById`) creates an $O(N \times M)$ linear bottleneck.
**Action:** Pre-build a `Map<string, T>` index during module initialization for static/data lookup repositories to turn repeated linear searches into $O(1)$ constant-time lookups.
