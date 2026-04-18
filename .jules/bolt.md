## YYYY-MM-DD - [Title]
**Learning:** [Insight]
**Action:** [How to apply next time]
## 2024-05-24 - Avoid syncing derivable data in state via useEffect
**Learning:** In React components like `IngredientCalculator`, syncing derived values (like `scaledIngredients`) into state via `useEffect` causes unnecessary double re-renders whenever the dependency (`servings`) changes.
**Action:** Always derive values directly during render or use `useMemo` for complex calculations instead of copying them into state using `useEffect`.
## 2024-06-19 - React Controlled Inputs and localStorage Performance
**Learning:** Writing to `localStorage` synchronously inside an `onChange` handler for React controlled inputs (like textareas) blocks the main thread on every keystroke, causing severe UI jank.
**Action:** Always debounce `localStorage` writes for continuous inputs using `useRef` to hold the timer and current value, and a 500ms `setTimeout`. Crucially, flush the pending write synchronously in a `useEffect` cleanup function on unmount (or when dependency keys change) to strictly prevent data loss if the user navigates away before the debounce timer fires.
