## 2026-09-22 - Prevent Cascading Re-renders from Post-Mount LocalStorage State Sync
**Learning:** Using `useEffect` to populate initial state from `localStorage` triggers an unnecessary initial render cycle and ESLint `react-hooks/set-state-in-effect` violations in React 19 / Next.js.
**Action:** Use lazy initializers in `useState(() => ...)` for state derived from `localStorage` to evaluate initial state synchronously during mount without causing cascading re-renders.
