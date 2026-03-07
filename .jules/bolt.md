## 2024-05-28 - Optimize array membership checks inside render loops
**Learning:** Checking for membership (e.g. `completedSteps.includes(step.id)`) inside a component render loop (`steps.map(...)`) results in O(N*M) time complexity.
**Action:** Always derive a `Set` via `useMemo` from the source array when performing frequent membership checks in the component render cycle, converting the complexity to O(N+M) and avoiding unnecessary performance hits.
