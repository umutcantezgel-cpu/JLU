# Palette's Journal

## 2025-05-18 - Accessible custom modal dialog pattern
**Learning:** Custom modal overlays in this application require keyboard dismissability (listening for the `Escape` key), backdrop click dismissal with `e.stopPropagation()` on the dialog window, and complete WAI-ARIA dialog markup (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) alongside an accessible label on icon-only close buttons.
**Action:** When creating or modifying custom modal dialog components, ensure an `Escape` key event listener is bound on mount, the backdrop overlay handles click-to-dismiss while dialog content stops propagation, and heading IDs connect with `aria-labelledby`.
