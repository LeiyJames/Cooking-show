## 2024-03-16 - Debouncing localStorage writes requires cleanup
**Learning:** When debouncing state saves (like `localStorage` writes) in a component to prevent main-thread blocking, we must maintain a `ref` of the current state being saved so a cleanup function can synchronously execute any pending writes on unmount. Without this, data loss occurs if the user navigates away before the timeout fires.
**Action:** Always pair a `setTimeout` debounce with a `useEffect` cleanup returning a function that clears the timeout and executes the pending write using the `ref`.
