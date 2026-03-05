## 2024-05-24 - API Thrashing in TimerContext
**Learning:** React's `useEffect` with frequent state updates (like a 1-second countdown timer) in its dependency array causes constant unmounting and remounting of long-lived APIs (`setInterval` and `navigator.wakeLock`). This leads to "API thrashing" and inaccurate intervals.
**Action:** Always derive stable primitive booleans (e.g., `hasRunningTimer`) for dependency arrays when managing continuous processes.

## 2024-05-25 - Double-renders in IngredientCalculator
**Learning:** Using `useEffect` to sync derived state (e.g., `scaledIngredients` depending on `servings`) causes an unnecessary double-render cycle when the original state changes, which can impact performance especially if there are expensive renders downstream.
**Action:** Always derive state directly during the render cycle using `useMemo` (or just simple variables if calculations are cheap) to prevent unnecessary re-renders.
