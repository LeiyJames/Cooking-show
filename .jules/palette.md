## 2024-05-15 - Make cooking steps keyboard accessible
**Learning:** When interactive elements like accordion toggles are implemented using generic `<div>` tags (e.g., step toggles in `CookingProgress.tsx`), they must be fully polyfilled for keyboard accessibility by adding `role="button"`, `tabIndex={0}`, and an `onKeyDown` handler to listen for 'Enter' and 'Space' keys, in addition to standard `aria-expanded` and `aria-controls` attributes.
**Action:** Always verify keyboard focus, tab order, and interaction with generic HTML elements acting as buttons.
