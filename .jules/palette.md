## 2024-04-16 - Add ARIA Labels to IngredientCalculator
**Learning:** Icon-only buttons used for adjusting servings in recipe calculators lack accessible names, causing screen readers to announce them ambiguously. It is critical to add explicit `aria-label`s to these control elements.
**Action:** Always verify that buttons containing only SVG icons or generic indicators (e.g., + / -) have proper `aria-label` and `title` attributes for accessibility and tooltips.
## 2026-04-20 - Input-Label Association for Timer
**Learning:** Using React.useId() provides a robust way to associate labels with inputs in dynamic components without relying on potentially unsafe props like dish names which might contain spaces.
**Action:** Always link form labels with htmlFor and their inputs with an ID, and consider adding a cursor-pointer class to the label to hint to users that it is clickable.
