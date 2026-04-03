## 2026-04-03 - Derived State using useMemo
**Learning:** Using `useState` and `useEffect` for derived state causes unnecessary double-renders when the source state changes. This is an anti-pattern in React.
**Action:** Use `useMemo` to compute derived state during rendering, eliminating the extra render cycle.
