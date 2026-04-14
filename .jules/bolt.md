## 2024-04-14 - Optimize Derived State
**Learning:** Found a common anti-pattern where derived state was synced via `useEffect` and `useState` in `IngredientCalculator.tsx`. This causes an unnecessary double-render cycle.
**Action:** Use `useMemo` to calculate derived state synchronously during rendering to improve performance and prevent unnecessary re-renders.
