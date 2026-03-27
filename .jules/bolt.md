
## 2024-05-19 - [Performance Optimization] Render loop membership checks
**Learning:** Checking membership with `.includes()` inside `.map()` render loops (e.g., `completedSteps.includes(id)`) results in O(N*M) complexity which can impact performance as the list grows.
**Action:** When performing membership checks within render loops, optimize by deriving a `Set` from the source array via `useMemo` (`const completedStepsSet = useMemo(() => new Set(completedSteps), [completedSteps])`). This converts the operation to O(N+M) complexity, improving rendering performance.
