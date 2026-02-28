
## 2024-11-20 - useEffect Thrashing with Long-Lived APIs
**Learning:** High-frequency state updates (like a countdown timer decrementing every second) shouldn't be used directly in the dependency array of `useEffect` hooks that manage long-lived browser APIs (like `setInterval` or `navigator.wakeLock.request`). Doing so destroys and recreates the interval every second, and blasts the browser with repeated asynchronous API requests.
**Action:** When a side-effect depends on a complex object that changes frequently, derive a stable primitive boolean (e.g., `hasActiveTimers = Object.values(timers).some(t => t.isRunning)`) outside the hook and use that boolean as the sole dependency instead.
