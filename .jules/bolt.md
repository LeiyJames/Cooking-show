## 2025-02-20 - Avoid Syncing Derived State via useEffect
**Learning:** Found a common anti-pattern where derived state (`scaledIngredients` in `IngredientCalculator.tsx`) was being calculated and synchronized using `useState` and `useEffect` whenever props or dependent state (`servings`) changed. This triggered an unnecessary double-render cycle.
**Action:** Use `useMemo` to compute derived values directly during rendering to optimize React rendering performance and eliminate double-renders.
