## 2024-05-23 - Accessibility Patterns
**Learning:** Custom interactive elements like progress bars and accordions often miss semantic roles and ARIA attributes in this codebase.
**Action:** Always check for `role='progressbar'` and verify `div`s with `onClick` are converted to `<button>` with `aria-expanded` and `aria-controls`.
