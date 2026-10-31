# Palette's Journal - Critical UX & Accessibility Learnings

## 2025-05-14 - Modal Dialog Keyboard Dismissal & ARIA Semantics
**Learning:** Custom overlay dialogs in this Next.js app often lack `role="dialog"`, `aria-modal="true"`, heading associations via `aria-labelledby`, and `Escape` key event listeners, making them difficult to navigate for keyboard-only and screen reader users. Additionally, backdrop clicks should trigger close handlers while inner container clicks stop propagation.
**Action:** When creating or reviewing modal dialogs and slide-over panels in this codebase, ensure an `Escape` key listener is attached on mount when `isOpen` is true, backdrop click-to-dismiss is implemented with `e.stopPropagation()` on the modal body, and dialog ARIA roles/labels are explicitly defined.
