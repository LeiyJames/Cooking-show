
## 2024-05-24 - Framer Motion and Disabled States
**Learning:** When adding visual disabled states (`disabled:opacity-50`, `disabled:cursor-not-allowed`) to Framer Motion components, the component will still trigger `whileHover` and `whileTap` animations despite being semantically disabled. This creates confusing tactile feedback for keyboard and mouse users.
**Action:** Always conditionally disable motion properties on framer-motion interactive elements (e.g., `whileHover={isDisabled ? {} : { scale: 1.05 }}`) to ensure visual feedback accurately reflects the component's disabled status.
