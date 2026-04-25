## 2024-04-16 - Add ARIA Labels to IngredientCalculator
**Learning:** Icon-only buttons used for adjusting servings in recipe calculators lack accessible names, causing screen readers to announce them ambiguously. It is critical to add explicit `aria-label`s to these control elements.
**Action:** Always verify that buttons containing only SVG icons or generic indicators (e.g., + / -) have proper `aria-label` and `title` attributes for accessibility and tooltips.
## 2024-05-15 - Polyfilling Custom Interactive Accordion Headers
**Learning:** Interactive accordion headers built with custom `<div>` tags instead of native `<button>` tags frequently break keyboard accessibility. They omit focusability, screen reader semantics, and lack Space/Enter interaction defaults.
**Action:** When identifying custom interactive `<div>` elements, always polyfill them explicitly with `role="button"`, `tabIndex={0}`, a keyboard handler like `onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAction() } }}`, and aria attributes like `aria-expanded` and `aria-controls`.
## 2026-04-25 - Add ARIA attributes to recipe section accordions
**Learning:** Interactive headers acting as accordions need explicit aria-expanded and aria-controls attributes matching the expandable content's id to properly convey state to screen readers.
**Action:** Always add aria-expanded, aria-controls, and matching id attributes to accordion toggle buttons and their respective content panels.
