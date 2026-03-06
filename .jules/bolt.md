## 2024-03-06 - Avoid useEffect for derived state
**Learning:** Using `useEffect` to synchronize derived state (`scaledIngredients`) based on changes to source state (`servings`) in `IngredientCalculator.tsx` causes unnecessary double-rendering.
**Action:** Replace `useState` + `useEffect` combinations for derived state with `useMemo` so that the computed values are calculated directly during the render cycle, converting an O(N*M) render thrash into an O(N) synchronous pass.
