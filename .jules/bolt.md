## YYYY-MM-DD - [Title]
**Learning:** [Insight]
**Action:** [How to apply next time]
## 2024-05-24 - Avoid syncing derivable data in state via useEffect
**Learning:** In React components like `IngredientCalculator`, syncing derived values (like `scaledIngredients`) into state via `useEffect` causes unnecessary double re-renders whenever the dependency (`servings`) changes.
**Action:** Always derive values directly during render or use `useMemo` for complex calculations instead of copying them into state using `useEffect`.
## 2024-05-24 - Array includes inside loops and renders
**Learning:** Using `Array.includes()` inside loops or maps during render results in O(n^2) or O(n * m) complexity, negatively impacting performance, especially for frequent renders.
**Action:** Convert arrays to Sets using `useMemo` for repeated lookups to reduce lookup complexity to O(1).
## 2024-05-24 - Debounce localStorage writes in controlled inputs
**Learning:** Synchronous `localStorage.setItem` calls inside React controlled input `onChange` handlers (like textareas) block the main thread and cause input lag.
**Action:** Always debounce `localStorage` writes for continuous text inputs using `useRef` and `setTimeout`. Strictly prevent data loss by flushing the latest value synchronously to `localStorage` in the `useEffect` cleanup function upon unmount.
