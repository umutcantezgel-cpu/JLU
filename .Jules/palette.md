# Palette's Journal - Critical Learnings Only

## 2025-02-28 - Custom Modal Overlay Accessibility & Dismissal
**Learning:** Custom overlay modals in this app require explicit Escape key listeners, backdrop click dismissal with `stopPropagation` on the modal box, and ARIA dialog semantics (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) along with accessible `aria-label` and `focus-visible` styles on close buttons to meet accessibility standards.
**Action:** When creating or maintaining modal dialogs, ensure backdrop click closing, Escape key event handling, ARIA dialog roles, and focus-visible indicators are included by default.
