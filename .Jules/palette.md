## 2026-10-16 - Accessible Modal Dialog Pattern
**Learning:** Modal components in Next.js require proper ARIA attributes (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`), an `aria-label` on icon-only close buttons, backdrop click listeners, and an `Escape` key event listener for complete keyboard and screen reader accessibility.
**Action:** When implementing or refining modals, always ensure dialog semantics, keyboard `Escape` dismissal, focus-visible indicators, and screen-reader accessible close button labels are included.
