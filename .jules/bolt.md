
## 2024-05-20 - [Optimize React Effects Managing Browser APIs]
**Learning:** Including frequently updated state objects (like a ticking timer object) in dependency arrays of `useEffect` hooks causes heavy API thrashing for long-lived browser APIs (e.g. `setInterval`, `navigator.wakeLock`).
**Action:** Always derive primitive booleans (e.g. `hasRunningTimer`) via `useMemo` from the frequent state object and use those booleans in the `useEffect` dependencies to manage the API lifecycle optimally.
