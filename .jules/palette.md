# Palette's UX Journal

## 2025-03-05 - [Add Accessible Controls and Live Region to Counters]
**Learning:** When dealing with dynamic counter components like the Ingredient Calculator's servings adjustments, setting `aria-live="polite"` and `aria-atomic="true"` on the changing text region significantly improves accessibility. Additionally, icon-only buttons like Plus/Minus require both `aria-label` for screen-readers and `title` attributes for sighted users, alongside clear visual indicators (`opacity-50`, `cursor-not-allowed`) for disabled states.
**Action:** Always wrap dynamically changing numbers with an `aria-live` region, and enforce `title` and `aria-label` attributes with explicit disabled visual states on icon-only control buttons.