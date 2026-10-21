# Palette's Journal - Critical Learnings

## 2025-05-18 - Modal Dialog Keyboard Accessibility & Backdrop Dismissal
**Learning:** Custom overlay modals in Next.js/React applications need explicit `Escape` key handling and click-outside backdrop dismissal to satisfy keyboard and assistive tech navigation requirements, along with `role="dialog"`, `aria-modal="true"`, and `aria-labelledby`.
**Action:** Always include a `useEffect` for the `Escape` key and click propagation handling on the backdrop container for custom modal dialogs.
