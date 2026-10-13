## 2025-05-18 - Modal Dialog Accessibility & Escape Key Dismissal
**Learning:** Modals in custom design systems often lack basic screen-reader semantics (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and keyboard event handlers (`Escape` key press listener and backdrop dismissal), preventing full accessibility for screen readers and keyboard users.
**Action:** Always bind an `useEffect` event listener for `Escape` key dismissal and backdrop click handlers whenever implementing or refining custom modal components.
