# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-05-15 - Modal Overlay Accessibility & Keyboard Navigation Pattern
**Learning:** Custom overlay dialogs in this application (such as FormulaModal and HandwrittenNotesModal) were missing keyboard dismissal (`Escape` key), backdrop click dismissal, and proper ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), which impaired screen reader navigation and keyboard-only user experience.
**Action:** Always ensure modal overlays have an Escape key listener, backdrop dismissal via `onClick` with `e.stopPropagation()` on the modal dialog card, `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and clear `aria-label` attributes on dismiss icon buttons.
