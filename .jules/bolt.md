## 2025-05-20 - Fast O(1) Exercise Lookup
**Learning:** `getExerciseById` was performing sequential linear searches through all exercises and exam simulations on every exercise lookup. Building a static `Map` index at module evaluation time turns O(N) array searching into O(1) constant time dictionary lookups.
**Action:** Pre-build static Map or object indices for frequently looked-up entities in curriculum and exercise data.
