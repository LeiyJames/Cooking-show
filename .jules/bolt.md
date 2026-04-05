## 2024-05-24 - Replace derived state effect with useMemo
**Learning:** Derived state should be calculated using `useMemo` during rendering rather than synced via `useEffect` and `useState` to avoid unnecessary double-renders.
**Action:** Use `useMemo` instead of `useEffect` for derived states to prevent unnecessary double renders.