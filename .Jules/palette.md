## 2025-02-26 - Accessible Modal Patterns in Next.js React 19 Components

**Learning:** Modal dialogs in custom Next.js UI components need `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, accessible `aria-label` on close icons, and `Escape` key listeners for keyboard accessibility. Initializing state lazily with `useState(() => ...)` also eliminates `useEffect` sync state warnings.
**Action:** Always include `role="dialog"`, `aria-modal="true"`, `aria-label="Schließen"`, `Escape` key event listener, and backdrop click handler when building overlay dialogs in this design system.
