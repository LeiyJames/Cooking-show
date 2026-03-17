## 2024-05-15 - Optimize Array includes() to Set has() inside Render Loops
**Learning:** Checking for membership using `.includes()` inside a render loop (like `.map()`) can be expensive, leading to O(N*M) complexity where N is the length of the map and M is the length of the array to check against.
**Action:** Always convert the array being searched into a `Set` using `useMemo()` before the loop, and then use `.has()` during the iteration. This converts the operation complexity to O(N+M) and avoids repeated work inside the render phase.
