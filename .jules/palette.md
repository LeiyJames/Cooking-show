## 2024-04-16 - Add ARIA Labels to IngredientCalculator
**Learning:** Icon-only buttons used for adjusting servings in recipe calculators lack accessible names, causing screen readers to announce them ambiguously. It is critical to add explicit `aria-label`s to these control elements.
**Action:** Always verify that buttons containing only SVG icons or generic indicators (e.g., + / -) have proper `aria-label` and `title` attributes for accessibility and tooltips.
## 2024-05-15 - Polyfilling Custom Interactive Accordion Headers
**Learning:** Interactive accordion headers built with custom `<div>` tags instead of native `<button>` tags frequently break keyboard accessibility. They omit focusability, screen reader semantics, and lack Space/Enter interaction defaults.
**Action:** When identifying custom interactive `<div>` elements, always polyfill them explicitly with `role="button"`, `tabIndex={0}`, a keyboard handler like `onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleAction() } }}`, and aria attributes like `aria-expanded` and `aria-controls`.
## 2026-04-23 - Enhance Accessibility for Accordions and Modals
**Learning:** Icon-only buttons inside modals (like a close button) require explicit `aria-label` attributes for screen readers. Accordion headers must link to their content regions using `aria-expanded` and `aria-controls`. Custom modals require an `Escape` key listener to allow keyboard users to easily dismiss them.
**Action:** Always add `aria-label` to icon-only buttons, link accordion elements with `aria-expanded` and `aria-controls`, and implement `Escape` key listeners on custom modals.
