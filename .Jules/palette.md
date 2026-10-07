## 2025-10-07 - Modal Dialog Accessibility and Keyboard Dismissal

**Learning:** Icon-only modal close buttons without explicit `aria-label` and missing Escape key event handlers impair keyboard navigation and screen reader usability in React overlay dialogs.
**Action:** Always structure modal dialogs with `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, attach an `Escape` key listener, handle backdrop clicks with `stopPropagation()`, and provide visible focus rings and accessible labels for close buttons.
