## 2025-05-18 - Accessible Modal Close Buttons & Focus Rings
**Learning:** Icon-only modal close buttons without accessible labels or visible focus rings create keyboard and screen reader accessibility barriers in dialog overlays.
**Action:** Always add descriptive `aria-label` attributes and Tailwind `focus-visible:ring-2 focus-visible:outline-none` focus rings to icon-only control buttons in modals.
