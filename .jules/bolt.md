## 2025-10-07 - O(1) Exercise Lookup Cache
**Learning:** `getExerciseById` was performing linear O(N) array scans through `allExercises` and `examSimulations` on every call, including repeatedly during component render maps (e.g. `RabiaNotesView`). Pre-building a `Map<string, Exercise>` cache on module initialization reduces exercise lookup overhead to O(1).
**Action:** When data repositories are queried frequently by key/ID in React render paths, index them into a module-level `Map` rather than running `.find()` on arrays.
