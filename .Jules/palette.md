## 2025-02-18 - Overlay & Modal Keyboard Navigation
**Learning:** Modals and slide-over drawers missing `Escape` key handlers and ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `aria-label` on close icons) trap keyboard and screen-reader users inside open overlays.
**Action:** Always attach `Escape` key event listeners and ARIA dialog semantics to modal dialogs and slide-over drawers.
