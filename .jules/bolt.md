## 2024-05-24 - Array Membership Checks Inside Render Loops
**Learning:** Checking for membership using `array.includes(id)` inside render loops (like mapping over steps to display icons or determine completion status) has O(N*M) complexity. This codebase specifically has this pattern in `CookingProgress.tsx` and `app/filipino/[dish]/page.tsx` for `completedSteps`.
**Action:** Always derive a `Set` from the source array via `useMemo` when membership checks are performed within render loops. This optimizes the search operation to O(1) and overall complexity to O(N+M).
