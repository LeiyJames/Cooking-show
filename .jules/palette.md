## 2024-03-15 - Interactive Framer Motion Disabled States
**Learning:** Adding standard HTML disabled attributes (`disabled`) and visual styling (`opacity-50 cursor-not-allowed`) to a `framer-motion` `<motion.button>` does not stop its `whileHover` and `whileTap` animations. The user can still physically interact with the button via animation scaling.
**Action:** When disabling `<motion.button>` elements, conditionally disable the animation props as well (e.g., `whileHover={isDisabled ? {} : { scale: 1.05 }}`) to ensure tactile feedback matches the visual disabled state.
