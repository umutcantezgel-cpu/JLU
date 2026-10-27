## 2025-05-18 - Overlay Component Accessibility and Keyboard Traversal
**Learning:** Modal dialogs and slide-over drawers in this app previously lacked `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `Escape` keydown event listeners. Adding keyboard event listeners ensures screen reader and keyboard-only users can dismiss overlays seamlessly.
**Action:** Always include an `Escape` keydown listener in custom modal/drawer React components along with dialog ARIA attributes and descriptive close button labels (`aria-label="Schließen"`).
