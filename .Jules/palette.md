## 2026-10-16 - Dynamic booking entry controls need indexed ARIA labels
**Learning:** Dynamic list items like booking entries in custom form composers (e.g. `BuchungssatzComposer`) lack explicit accessibility labels by default when rendered inside repetitive map loops.
**Action:** Always provide indexed `aria-label` attributes for `<select>`, `<input>`, and deletion `<button>` elements rendered dynamically in form rows.
