
## 2024-05-28 - Optimize Membership Checks in Render Loops
**Learning:** Membership checks within render loops (e.g., `completedSteps.includes(id)`) can be O(N^2) if the array is large. Converting the array to a `Set` via `useMemo` changes the lookup to O(1), improving performance.
**Action:** When repeatedly checking membership inside a loop in a React component, always memoize the array into a `Set` using `useMemo` first, and use `.has()` instead of `.includes()`. Ensure `useMemo` is placed before early returns.
