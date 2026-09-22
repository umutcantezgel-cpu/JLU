## 2025-02-22 - Modal Accessibility & Dismissal Patterns
**Learning:** Modals in Next.js/Tailwind components must support keypress dismissals (`Escape`), backdrop click dismissals, and standard ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-label` on close icons) to ensure seamless keyboard navigation and screen-reader usability.
**Action:** When creating or editing any overlay dialog or modal, always wrap keyboard event listeners in a `useEffect` hook and attach `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-label` to close buttons.
