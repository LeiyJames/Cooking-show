## 2024-04-16 - Add ARIA Labels to IngredientCalculator
**Learning:** Icon-only buttons used for adjusting servings in recipe calculators lack accessible names, causing screen readers to announce them ambiguously. It is critical to add explicit `aria-label`s to these control elements.
**Action:** Always verify that buttons containing only SVG icons or generic indicators (e.g., + / -) have proper `aria-label` and `title` attributes for accessibility and tooltips.
