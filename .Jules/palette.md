## 2026-09-27 - Accessible Dialog Semantics & Keyboard Shortcuts for Modals
**Learning:** Modal dialogs in the application were missing standard ARIA roles (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and `Escape` key handlers for keyboard accessibility. Icon-only close buttons lacked explicit `aria-label` attributes.
**Action:** When creating or updating overlay components/modals, always include dialog ARIA semantics, accessible `aria-label` for icon buttons, `type="button"` attributes, and an `Escape` key event listener.
