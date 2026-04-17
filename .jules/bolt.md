## 2025-02-28 - Derived state calculated during render instead of useEffect
**Learning:** Calculating derived state (like `scaledIngredients` from `servings`) directly during component render avoids triggering a secondary, unnecessary React render pass, which happens when updating a separate state variable using `useState` and `useEffect`.
**Action:** Always derive values synchronously within the component's body rather than syncing multiple state variables using `useEffect`.
