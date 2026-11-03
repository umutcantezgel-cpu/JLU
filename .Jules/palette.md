# Palette's Critical UX Learnings

## 2025-05-14 - Modal Dialog Accessibility and Dismissal Pattern
**Learning:** Custom modal overlays rendered via React portals or fixed containers in this application lack keyboard escape listener, backdrop click dismissals, and ARIA dialog semantics (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`). Icon-only close buttons lacked explicit `aria-label` attributes and keyboard focus rings.
**Action:** When implementing or modifying modal dialogs in this repository, always attach an `Escape` key event listener in `useEffect`, attach backdrop click handler with `stopPropagation()` on the dialog container, and assign proper ARIA roles and labels to close buttons.
