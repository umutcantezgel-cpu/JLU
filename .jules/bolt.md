## 2026-10-01 - O(1) Data Lookup & Elimination of Effect Cascades

**Learning:**
1. In static dataset setups, linear array scans (`Array.prototype.find`) on nested structures (like curriculum exercises inside exam simulations) introduce redundant O(N) overhead across multiple component re-renders. Replacing them with a module-level pre-computed `Map` provides instantaneous O(1) lookups.
2. Synchronizing props or `localStorage` into component state via `useEffect` causes synchronous re-render cascades and ESLint errors. Using state-adjustment during render for props and `React.startTransition` for non-urgent client storage hydration avoids blocking main thread renders and eliminates ESLint warnings.

**Action:**
Pre-compute static maps for dataset lookups and adjust derived state during render rather than inside `useEffect`.
