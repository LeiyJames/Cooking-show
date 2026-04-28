## YYYY-MM-DD - [Title]
**Learning:** [Insight]
**Action:** [How to apply next time]
## 2024-05-24 - Avoid syncing derivable data in state via useEffect
**Learning:** In React components like `IngredientCalculator`, syncing derived values (like `scaledIngredients`) into state via `useEffect` causes unnecessary double re-renders whenever the dependency (`servings`) changes.
**Action:** Always derive values directly during render or use `useMemo` for complex calculations instead of copying them into state using `useEffect`.
## 2024-05-24 - Array includes inside loops and renders
**Learning:** Using `Array.includes()` inside loops or maps during render results in O(n^2) or O(n * m) complexity, negatively impacting performance, especially for frequent renders.
**Action:** Convert arrays to Sets using `useMemo` for repeated lookups to reduce lookup complexity to O(1).
## 2024-05-24 - Debouncing React Controlled Textareas
**Learning:** Synchronous `localStorage.setItem` calls inside React controlled input `onChange` handlers (like textareas for notes) block the main thread and impact typing performance.
**Action:** Always debounce `localStorage` writes for continuous text inputs using `useRef` and `setTimeout`, and ensure data isn't lost during fast navigation by synchronously flushing the latest tracking ref in the component unmount cleanup `useEffect`.
## 2024-05-24 - Array to Set conversion overhead in React state
**Learning:** For React state managing collections of unique identifiers (e.g., step IDs) that require frequent membership checks throughout the component tree on every render, using `useState` with an `Array` and deriving a `Set` via `useMemo` introduces a performance overhead (O(n) creation).
**Action:** Prefer storing the `Set` directly in `useState<Set<number>>(new Set())` and passing it down directly to avoid redundant `Array.from` and `new Set()` conversions on each render, providing true O(1) lookups everywhere.
