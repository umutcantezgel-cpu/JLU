## 2025-02-18 - Modal Dialog Accessibility & Escape Listener Pattern
**Learning:** Modal overlays created as basic `<div>` wrappers without `role="dialog"`, `aria-modal="true"`, and keyboard `Escape` key event listeners hinder screen readers and keyboard users from easily dismissing modals.
**Action:** Always include `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, an accessible `aria-label` on icon-only close buttons, and a `keydown` listener for the `Escape` key on overlay modal components.
