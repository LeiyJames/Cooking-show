
## 2026-03-21 - Optimize Array Membership Checks in Render Loops
**Learning:** Found an $O(N \times M)$ performance bottleneck where array `.includes()` was being called inside a render loop (e.g., mapping over steps and checking `completedSteps.includes(id)`).
**Action:** When performing membership checks within render loops (e.g., `array.includes(id)`), optimize by deriving a `Set` from the source array via `useMemo` at the top level of the component. This converts O(N*M) search operations into O(N+M) complexity, significantly speeding up large list rendering.
