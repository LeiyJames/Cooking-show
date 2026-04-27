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
## 2026-04-25 - Memoize heavy mapped arrays containing high-frequency state updates
**Learning:** In React components with high-frequency state updates (like continuous textarea inputs), inline mapped arrays (e.g., `ingredients.map(...)`) that generate heavy elements like Framer Motion components will be recreated on every single keystroke. This causes severe typing jank and high CPU usage during re-renders.
**Action:** Extract and wrap pure mapped arrays or complex objects containing JSX elements in `useMemo` dependent solely on their source data (e.g., `useMemo(() => data.map(...), [data])`). Avoid wrapping the parent container if it includes the high-frequency state itself, to prevent redundant recalculation.
