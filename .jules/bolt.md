## 2025-03-31 - Lazy Indexed Map vs O(N) Lookups & Next.js Hydration Rules
**Learning:** Initializing data structures like `Map` indices lazily avoids top-level module load order issues with circular imports. Additionally, reading `localStorage` synchronously during `useState` initialization causes Next.js hydration mismatches; post-mount `useEffect` or client-only flags are required.
**Action:** Always lazy-initialize lookup caches in data files and keep `localStorage` access isolated from initial SSR state values.
