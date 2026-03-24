## 2025-03-24 - Conditionally disabling framer-motion interactive tactile feedback
**Learning:** When applying visual disabled states (e.g., `disabled:opacity-50 disabled:cursor-not-allowed`) to `framer-motion` interactive elements, motion properties like `whileHover` and `whileTap` must be conditionally disabled (e.g., `whileHover={isDisabled ? {} : { scale: 1.05 }}`) to prevent interactive tactile feedback on visually disabled buttons.
**Action:** Always conditionally disable interactive animation properties on `motion` elements that can have a disabled state.
