## 2026-10-09 - O(1) Curriculum Exercise Indexing & Cascading Render Elimination

**Learning:** Pre-indexing multi-source curriculum exercises (combining workouts, modules, and exam tasks) into a `Map<string, Exercise>` on module load eliminates repetitive O(N) array scans during list rendering. Furthermore, initializing client-side state with lazy `useState` initializers (checking `typeof window !== 'undefined'`) avoids mount-phase `setState` calls in `useEffect`, eliminating cascading re-render passes.
**Action:** Always pre-index static data collections accessed frequently in render loops and prefer lazy state initialization over mount-effect state setters.
