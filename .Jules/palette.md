## 2025-02-18 - Accessible Modal Overlay and Close Button Patterns
**Learning:** Modal components (`FormulaModal`, `HandwrittenNotesModal`) in this app required explicit `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` attributes, plus explicit `aria-label` attributes on icon-only close buttons (`X`) to ensure screen readers properly announce dialog context.
**Action:** Always include `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, and `aria-label="Schließen"` when adding modal overlays.
