# Palette's UX Journal

## 2026-09-06 - Accessible Modal Dialogs Pattern
**Learning:** Custom modal overlays without explicit keyboard listeners trap users who rely on the `Escape` key, and lack of backdrop click dismissal creates frustration when attempting to dismiss reference sheets. Additionally, screen readers require `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and descriptive `aria-label`s on icon-only close buttons to provide accessible context.
**Action:** When implementing or updating modal dialogs in this codebase, ensure the Escape listener is attached on `window` during mounting/open state, handle backdrop dismissal with `stopPropagation` on the modal dialog card, and connect heading labels via `aria-labelledby`.
