## 2025-05-15 - Modal Dialog Accessibility & Dismissal
**Learning:** In this design system, overlay modals lacked explicit `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-label` for close buttons, and `Escape` key event listeners for keyboard dismissal.
**Action:** Always wrap modal dialogues with a backdrop overlay supporting backdrop click dismiss (`onClick={onClose}` + child `e.stopPropagation()`), add `Escape` key event listeners in `useEffect`, and apply dialog ARIA roles.
