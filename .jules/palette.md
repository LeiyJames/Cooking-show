## 2024-05-14 - Framer Motion Disabled State UX
**Learning:** When applying visual disabled states (e.g., `disabled:opacity-50 disabled:cursor-not-allowed`) to `framer-motion` interactive elements, motion properties like `whileHover` and `whileTap` must be conditionally disabled to prevent interactive tactile feedback on visually disabled buttons.
**Action:** Always conditionally return empty objects `{}` for motion properties when a component's `disabled` prop is true (e.g., `whileHover={isDisabled ? {} : { scale: 1.05 }}`).
