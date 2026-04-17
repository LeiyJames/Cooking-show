## 2024-04-16 - Add ARIA Labels to IngredientCalculator
**Learning:** Icon-only buttons used for adjusting servings in recipe calculators lack accessible names, causing screen readers to announce them ambiguously. It is critical to add explicit `aria-label`s to these control elements.
**Action:** Always verify that buttons containing only SVG icons or generic indicators (e.g., + / -) have proper `aria-label` and `title` attributes for accessibility and tooltips.

## 2024-05-20 - Polyfilling Divs for Accordions
**Learning:** Interactive accordion toggles implemented using generic `<div>` tags lack native keyboard support and screen reader context.
**Action:** Always fully polyfill interactive `<div>` tags by adding `role="button"`, `tabIndex={0}`, `onKeyDown` listeners for Enter/Space, and `aria-expanded`/`aria-controls` attributes linked to the expandable content's `id`.
