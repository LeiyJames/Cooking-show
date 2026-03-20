## 2025-02-28 - Optimized Membership Checks in Render Loops
**Learning:** Checking membership in arrays within React render loops (e.g., `completedSteps.includes(id)`) leads to O(N*M) time complexity, which can be a subtle bottleneck. Converting the array to a `Set` using `useMemo` optimizes this to O(N+M).
**Action:** When finding repeated `.includes()` checks on state arrays inside `.map()` functions during rendering, use a memoized `Set` to improve lookups to O(1).
