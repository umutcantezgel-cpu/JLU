## 2025-05-18 - Modal & Interactive Header Element Accessibility
**Learning:** Custom modal containers and header pills with click handlers are inaccessible to screen readers and keyboard users unless accompanied by `role="dialog"`, `role="button"`, `aria-label`, and `Escape`/`Enter`/`Space` keyboard event listeners.
**Action:** Always add keyboard event listeners and appropriate ARIA roles/labels when creating modal overlays or clickable non-button header elements.
