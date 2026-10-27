## 2025-05-18 - Accessible Dialog Modals with ARIA & Keyboard Triggers
**Learning:** Reusable overlay modals in React/Tailwind lack accessibility and keyboard dismissibility unless explicitly given role="dialog", aria-modal="true", aria-labelledby, aria-label on close buttons, backdrop click handlers, and an Escape key event listener.
**Action:** Always include ARIA dialog attributes, aria-label on icon-only close buttons, backdrop click-to-close handler, and window Escape key handler when building modal overlay components.
