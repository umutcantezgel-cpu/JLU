## 2026-10-24 - Accessible Modal Dialog ARIA Attributes & Escape Key Navigation
**Learning:** Custom dialog overlays without explicit ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and keyboard listener (`Escape` key) prevent screen reader identification and keyboard accessibility.
**Action:** Always include proper dialog ARIA roles/labels and an `Escape` key handler in custom modal components.
