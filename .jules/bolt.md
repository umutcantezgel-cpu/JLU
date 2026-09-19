# Bolt's Journal - Critical Learnings

## 2025-05-19 - O(1) Map Lookup for Curriculum Data & Avoiding Cascading Re-renders
**Learning:** Initializing static level definitions with linear `.find()` on large datasets causes repeated $O(N)$ searches on module load. In addition, using synchronous `setState` in React effects for prop synchronization causes cascading re-renders and violates React 19 / ESLint strict rules.
**Action:** Always pre-build `Map` lookups for static IDs and perform state initialization or derived state computation during render / lazy state initializer rather than inside `useEffect`.
