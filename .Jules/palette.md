## 2026-10-20 - Interactive Composer Dynamic Controls Accessibility
**Learning:** Dynamic inline form controls (e.g., account entry rows added/removed dynamically) often lack contextual ARIA descriptions for screen readers, making row-specific input fields ambiguous ("Select account", "Amount").
**Action:** Always provide row-indexed `aria-label`s (e.g., `Soll-Konto Zeile 1`) and accessible `focus-visible` ring indicators for dynamically generated form elements.
