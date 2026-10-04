## 2026-09-06 - O(1) Exercise Map Caching & Synchronous State Initializations

**Learning:** Array search operations like `Array.prototype.find()` inside render loops across nested data structures (curriculum & exam exercises) add unnecessary O(N) overhead per render. Additionally, loading persistent state from `localStorage` inside `useEffect` causes cascading re-renders and ESLint errors; using lazy initializers `useState(() => ...)` avoids extra render passes cleanly.

**Action:** Prefer lazy Map indexing for lookup functions called during React render passes and use lazy `useState` initializers for `localStorage` reads.
