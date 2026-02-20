## 2026-02-20 - Accessibility Gaps in Timer Interface
**Learning:** The Timer component lacked programmatic association between labels and inputs (using `for`/`id`) and `aria-label`s for icon-only buttons, making it inaccessible to screen readers.
**Action:** Always use `useId` for unique input IDs in reusable components and ensure all interactive elements have descriptive accessible names.
