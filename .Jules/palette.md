## 2026-10-19 - Focus-visible and ARIA semantics on custom interactive header elements
**Learning:** Clickable custom header elements (like progress indicators and brand monograms) need explicit `role="button"`, `tabIndex={0}`, keyboard handlers, and visible focus rings to be accessible to screen reader and keyboard users in Next.js/Tailwind applications.
**Action:** Always add `role="button"`, `tabIndex={0}`, `onKeyDown` handlers for Enter/Space, and `focus-visible:ring-2` to non-`<button>` interactive components.
