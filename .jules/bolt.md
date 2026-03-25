## 2024-05-24 - Optimizing Set Membership
**Learning:** Checking for membership inside a render loop using `Array.includes()` for an array of completed step IDs (e.g. `completedSteps.includes(step.id)`) can be slow for a large number of steps because it turns a linear iteration into an O(N*M) operation. By converting the array into a Set via `useMemo`, we can perform membership checks in O(1) time. This results in an O(N+M) time complexity.
**Action:** Use `useMemo` to convert `completedSteps` to a Set before performing multiple `.has()` lookups in `CookingProgress.tsx` components.
