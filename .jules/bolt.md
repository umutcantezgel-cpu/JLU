## 2025-05-18 - Avoid Reading localStorage in useState Initializer in Next.js SSR

**Learning:** Reading `localStorage` inside `useState(() => localStorage.getItem(...))` causes SSR hydration mismatches in Next.js because server-rendered HTML uses default values while client initial render uses stored values.
**Action:** Always read `localStorage` inside `useEffect` or use a synchronized hydration hook when working with client-side state in Next.js SSR applications.
