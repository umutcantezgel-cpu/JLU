## 2025-05-18 - O(1) Pre-Indexed Map Lookup for Curriculum Data
**Learning:** Calling `.find()` repeatedly on large curriculum dataset arrays during UI navigation introduces O(N) performance overhead. Constructing a `Map` indexed by `id` at module initialization time turns lookups into O(1).
**Action:** When working with static or near-static domain data arrays that are queried frequently by ID, create a `Map` lookup table alongside the array.
