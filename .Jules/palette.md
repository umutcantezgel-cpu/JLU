## 2025-05-20 - Accessible Modal Keyboard and Focus Trapping in Next.js/React 19
**Learning:** Dialog modals should always auto-focus the primary dismiss/close action on open, support `Escape` key listeners, handle backdrop clicks with `e.stopPropagation()`, and include `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and explicit `aria-label` on icon buttons.
**Action:** Apply ref-based autofocus and `Escape` key listener pattern to modal dialog overlays.
