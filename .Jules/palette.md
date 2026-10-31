# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-05-15 - Modal Dialog Accessibility and Dismissal Pattern
**Learning:** Custom modal overlays in this project need standard modal a11y attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and both keyboard (`Escape` listener) and backdrop click dismissal with `stopPropagation` on the modal body. Icon-only close buttons must always provide explicit `aria-label="Schließen"` for screen readers.
**Action:** When creating or editing modals or overlay sheets, ensure the container has dialog ARIA semantics, title labeling, an `Escape` key event listener, and backdrop click handler.
