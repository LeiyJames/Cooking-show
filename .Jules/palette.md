## 2026-02-25 - Ensuring Unique IDs in Reusable Components
**Learning:** Hardcoded IDs or missing ID associations in reusable components (like `TimerInterface`) break accessibility when multiple instances might be rendered, as screen readers cannot associate labels with their corresponding inputs.
**Action:** Always use `React.useId()` for generating unique IDs for form elements within components to guarantee valid `htmlFor` associations regardless of usage context.
