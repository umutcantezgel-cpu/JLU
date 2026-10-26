# Palette's UX & Accessibility Journal

## 2025-05-18 - Form Input Accessibility in Financial Tooling
**Learning:** Dynamic input rows in financial/accounting composers (like Soll/Haben entries) require explicit index-based ARIA labels for select dropdowns, amount inputs, and action buttons so screen readers can distinguish between multiple similar input fields.
**Action:** Always provide contextual index-based `aria-label`s on repeated form rows when visual headings aren't linked via `<label htmlFor>`.
