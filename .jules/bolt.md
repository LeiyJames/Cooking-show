## 2024-05-28 - Optimize Array Membership Checks in Render Loops
**Learning:** Membership checks within render loops (like `.includes()` inside `.map()`) create an O(N*M) performance bottleneck, especially as the number of elements grows.
**Action:** Always derive a `Set` from the source array using `useMemo` before the render loop, and use `.has()` instead of `.includes()`. This converts the O(N*M) complexity into O(N+M) complexity, significantly improving rendering performance.
