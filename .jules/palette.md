
## 2024-04-09 - Accordion Toggle Accessibility
**Learning:** In the `CookingProgress` component, accordion step toggles were implemented using generic `<div>` elements with `onClick` handlers. This pattern creates a significant accessibility barrier as it lacks keyboard interactability and screen reader semantics.
**Action:** When using generic elements as interactive toggles, always fully polyfill them by adding `role="button"`, `tabIndex={0}`, an `onKeyDown` handler listening for 'Enter' and ' ' (Space), along with the standard `aria-expanded` and `aria-controls` attributes, and ensure visual focus indicators are present.
