## 2025-02-23 - Accessible Modal Dialog & Keyboard Dismissal
**Learning:** Modal components rendered as fixed overlay overlays must include ARIA roles (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), explicit `aria-label`s on icon-only close buttons, and keyboard handlers for the `Escape` key alongside backdrop click-to-close listeners.
**Action:** Always wrap modal content containers with modal ARIA properties, add `Escape` key event listeners during component mount, and prevent click propagation on the modal dialog card.
