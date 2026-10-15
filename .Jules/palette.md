## 2025-05-18 - Accessibility & Keyboard Navigation for Modals
**Learning:** Modals in Next.js/Tailwind components require explicit `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, aria-label on icon-only close buttons, as well as `Escape` key and backdrop click handlers to meet screen reader and keyboard accessibility standards.
**Action:** Apply modal dialog ARIA roles, `Escape` key event listeners, and backdrop click handlers whenever creating or updating modal components.
