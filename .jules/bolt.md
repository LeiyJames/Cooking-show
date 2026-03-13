
## 2024-05-28 - [Memoizing Set for Render Loop Optimization]
**Learning:** O(N*M) membership checks inside React render loops (like `.includes()` on arrays inside `.map()` or `.filter()`) can be a significant performance bottleneck.
**Action:** When a membership check is needed inside a render loop, optimize it by deriving a `Set` from the source array via `useMemo`. This reduces the time complexity from O(N*M) to O(N+M) and is a valuable low-risk performance improvement.
