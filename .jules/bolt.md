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
## 2024-05-23 - Prevent Redundant JSX Mapped Array Calculations
**Learning:** In components with high-frequency state updates like a continuous textarea input, placing `.map()` operations for complex JSX inside the main render causes expensive layout and element recalculations on every keystroke.
**Action:** Always wrap pure mapped arrays or complex objects containing JSX elements in `useMemo` dependent solely on their source data to avoid redundant recalculation.
