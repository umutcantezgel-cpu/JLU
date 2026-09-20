## 2025-02-18 - Memoize Search and Array Filtering in ArenaView
**Learning:** Computing array filtering with lowercasing and tag search on every component re-render (e.g. typing in search, selecting multiple choice options, entering calculation field values) causes unnecessary CPU work. Using `useMemo` for filtered datasets prevents O(N) re-filtering on every user interaction tick.
**Action:** Always memoize derived filtered lists and lookups when dependent on state like `searchQuery` and `selectedCategory`.
