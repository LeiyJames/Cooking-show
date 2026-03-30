## 2024-03-22 - Framer Motion Disabled States
**Learning:** When adding visual disabled states (`disabled:opacity-50 disabled:cursor-not-allowed`) to `framer-motion` interactive elements, the motion properties like `whileHover` and `whileTap` must also be conditionally disabled (e.g., `whileHover={isDisabled ? {} : { scale: 1.05 }}`) to prevent interactive tactile feedback on visually disabled buttons.
**Action:** Always conditionally disable `whileHover` and `whileTap` in `framer-motion` components when adding `disabled` attributes to ensure tactile feedback matches the visual disabled state.

## 2024-03-22 - Icon-Only Button Context
**Learning:** Icon-only buttons (like Decrease/Increase/Reset) must provide both screen-reader context (`aria-label`) and visual context on hover (`title`) to ensure full accessibility for all users. Dynamic count displays should use `aria-live="polite"` and `aria-atomic="true"` to announce changes.
**Action:** When creating icon-only interactive controls, consistently pair `aria-label` with `title`, and ensure grouped controls use `role="group"` and `aria-labelledby` linking to their visible label.
