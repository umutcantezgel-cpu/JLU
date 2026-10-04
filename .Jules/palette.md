## 2025-02-18 - Accessible Modal Dialog Pattern
**Learning:** React modals in this application lack default keyboard event listeners and ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-label` for icon-only close buttons).
**Action:** Always ensure modal overlay wrappers include `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` referencing the title, provide an explicit `aria-label` on close icon buttons, and attach an `Escape` key listener in a `useEffect`.
