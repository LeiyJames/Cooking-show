## 2024-05-24 - Array.includes vs Set.has in React Render Loops
**Learning:** Membership checks within render loops (e.g., `completedSteps.includes(id)`) lead to O(N*M) search operations, which scales poorly as the array of items and list of checks grow. By deriving a `Set` using `useMemo` from the source array, we convert this to an O(N+M) complexity.
**Action:** When finding array membership lookups inside a `.map` or loop inside a React render function, pull the array into a `useMemo` wrapped `Set` and replace `.includes()` with `.has()`.
