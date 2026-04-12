## 2024-05-24 - Prevent Double Renders with useMemo
**Learning:** Synchronizing derived state using `useEffect` and `useState` causes unnecessary double-renders (once for the parent state change, again for the derived state update), degrading performance.
**Action:** Always calculate derived state directly during render using `useMemo` to avoid triggering an additional render cycle, improving frontend efficiency.
