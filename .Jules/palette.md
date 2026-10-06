## 2025-05-18 - Modal Dialog Accessibility and Keyboard Dismissal
**Learning:** Custom overlay modals built with Tailwind CSS/divs often miss ARIA dialog semantics (`role="dialog"`, `aria-modal="true"`, `aria-labelledby`) and keyboard escape listener. Adding `aria-label="Schließen"` on icon-only close buttons ensures screen reader compatibility.
**Action:** When implementing or editing modal components, always verify `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, `Escape` key event listener, and explicit `aria-label`s on icon close buttons.
