## 2024-05-18 - O(N) lookup inside map loop
**Learning:** Using `Array.includes` inside a map loop creates an O(N^2) operation. Converting the array to a Set before the loop reduces lookup time to O(1), improving render performance, especially with large lists.
**Action:** Always convert arrays to Sets for repeated lookups inside loops or renders.
