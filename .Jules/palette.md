## 2025-05-20 - Navigation Header Keyboard Accessibility & ARIA Labels
**Learning:** Interactive header components built with non-semantic elements (`<div>` with `onClick`) exclude keyboard users and screen reader users from accessing key global navigation shortcuts (e.g. returning to the Lernplan or checking progress). Converting them to `<button type="button">` with focus-visible indicators ensures full keyboard navigation compliance.
**Action:** Always use semantic `<button type="button">` with `aria-label` and `focus-visible:ring-2` for top-level header navigation items.
