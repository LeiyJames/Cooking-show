## 2024-04-10 - Ingredient Calculator Grouped Control Accessibility
**Learning:** Increment/decrement controls need to be grouped correctly to be read out well by screen readers. A simple label is not enough.
**Action:** Use `role="group"` and `aria-labelledby` on the container, generate IDs with `React.useId()`, add clear `aria-label` to icon-only buttons, and use `aria-live="polite"` on dynamic text values to announce changes.
