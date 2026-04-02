
## 2025-04-02 - Accessible Increment/Decrement Controls
**Learning:** Increment/decrement controls without proper grouping and ARIA linkages lack context for screen readers. Icon-only buttons mapping to "increase/decrease" actions are meaningless without labels.
**Action:** When creating adjustable controls (e.g., Servings calculator), wrap the controls in `role="group"`, label the group with `aria-labelledby` linked to the main input label using `React.useId()`, ensure icon buttons have `aria-label`s, and apply `aria-live="polite"` to the dynamic value display. Include visual and semantic disabled states (`disabled`, `disabled:opacity-50`) to provide feedback when limits are reached.
