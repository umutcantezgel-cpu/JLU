## 2026-10-18 - Accessible Modal Dialog Conventions
**Learning:** React modal dialogs must include keyboard event listeners (`Escape` key press), backdrop click dismiss handlers, explicit ARIA dialog roles (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), and explicit `aria-label` attributes on icon-only close buttons.
**Action:** When creating or refining modals in this codebase, always wire up the `Escape` key listener with cleanup in `useEffect` and attach appropriate ARIA semantics.
