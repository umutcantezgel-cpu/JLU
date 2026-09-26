## 2026-09-26 - O(1) Map Caching for Frequently Queried Repositories

**Learning:** Linear array searches (`.find()`) across combined data structures (like `allExercises` and `examSimulations`) executed repeatedly during render loops (e.g. 17 times per render in `RabiaNotesView`) cause cumulative performance overhead (~13x slower in benchmarks compared to Map lookup). In Next.js SSR apps, `localStorage` must be restored in `useEffect` (or post-hydration queue) rather than lazy `useState` initializers to prevent hydration mismatches.

**Action:** Map pre-populated repositories into a `Map` cache for $O(1)$ lookups. Restore client-side state in post-hydration effects using `queueMicrotask` to avoid synchronous cascading renders while maintaining SSR compatibility.
