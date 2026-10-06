## 2025-05-18 - Accessible Custom Modal Dialogs & Key Navigation
**Learning:** Custom React modal components and slide-over drawers often lack basic accessibility primitives (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`, explicit `aria-label` on icon-only close buttons) and keyboard event handlers for the `Escape` key.
**Action:** When creating or updating custom dialog or drawer overlay components, always ensure standard modal ARIA attributes, explicit `aria-label="Schließen"` on close buttons, backdrop click-to-dismiss, and keydown listeners for `Escape` key navigation.
