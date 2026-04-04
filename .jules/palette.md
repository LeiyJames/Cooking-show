
## 2024-05-20 - Accordion Keyboard Accessibility
**Learning:** Generic interactive elements (`<div>`) used as accordion toggles in this app's components (like `CookingProgress.tsx`) lack inherent keyboard accessibility. This prevents screen reader and keyboard-only users from expanding or collapsing steps.
**Action:** When implementing custom interactive elements or accordions, strictly polyfill them with `role="button"`, `tabIndex={0}`, an `onKeyDown` handler for Enter/Space, and ARIA attributes (`aria-expanded`, `aria-controls` matching an explicit region `id`). Ensure `focus-visible` styles are also applied for visual focus indication.
