## 2025-02-24 - Dynamic Row Accessible Labels in Form Composers
**Learning:** Dynamic list items (like Soll/Haben booking rows) need indexed `aria-label`s on selects, inputs, and icon-only delete buttons so screen reader users can distinguish row contexts.
**Action:** Always provide `aria-label={`Row name ${index + 1}`}` and matching titles on action controls in repeatable form sections.
