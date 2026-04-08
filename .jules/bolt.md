## 2025-02-21 - Debounce localStorage inside text input
**Learning:** Synchronous `localStorage.setItem` calls inside React controlled input `onChange` handlers (like textareas) block the main thread, causing significant input lag.
**Action:** Always debounce `localStorage` writes for continuous text inputs using `useRef` and `setTimeout` (e.g., 500ms delay) rather than directly calling `localStorage.setItem` synchronously.
