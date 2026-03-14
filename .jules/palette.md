## 2024-05-24 - Interactive Element Disabled States
**Learning:** When applying visual disabled states (e.g., `disabled:opacity-50 disabled:cursor-not-allowed`) to `framer-motion` interactive elements, motion properties like `whileHover` and `whileTap` must be conditionally disabled to prevent interactive tactile feedback on visually disabled buttons.
**Action:** Always conditionally apply `whileHover` and `whileTap` based on the disabled state of the component.

## 2024-05-24 - Icon-only Button Accessibility
**Learning:** Icon-only buttons lack inherent context for screen readers and tooltips for visual users.
**Action:** Ensure all icon-only buttons include `aria-label` and `title` attributes.

## 2024-05-24 - Dynamic Value Screen Reader Announcements
**Learning:** Dynamic values like counters or timers are not automatically announced by screen readers when updated.
**Action:** Use `aria-live="polite"` and `aria-atomic="true"` on elements with dynamic values to ensure updates are announced to assistive technologies.