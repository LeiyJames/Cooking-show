## 2024-04-16 - Add ARIA Labels to IngredientCalculator
**Learning:** Icon-only buttons used for adjusting servings in recipe calculators lack accessible names, causing screen readers to announce them ambiguously. It is critical to add explicit `aria-label`s to these control elements.
**Action:** Always verify that buttons containing only SVG icons or generic indicators (e.g., + / -) have proper `aria-label` and `title` attributes for accessibility and tooltips.

## 2024-05-24 - Timer Input Label Associations
**Learning:** Reusable components like TimerInterface can suffer from invalid HTML IDs or ID collisions if they rely on external strings (like dish names) for IDs. Missing `id` and `htmlFor` associations on inputs/labels cause accessibility failures.
**Action:** Always use `React.useId()` for robust input/label associations in reusable components to ensure unique, valid IDs across the application and maintain accessibility.
