## 2026-03-08 - Optimize Array Membership Checks in Render Loops
**Learning:** Checking array membership with `.includes()` inside render loops (like `.map()`) creates an O(N*M) performance bottleneck, especially as the number of items or steps grows.
**Action:** Always derive a `Set` from the source array using `useMemo` and use `.has()` for O(1) lookups, converting the overall complexity to O(N+M).
