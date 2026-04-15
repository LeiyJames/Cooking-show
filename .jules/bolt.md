## 2024-05-24 - Debouncing localStorage writes in controlled inputs
**Learning:** Synchronous `localStorage.setItem` calls inside React controlled input `onChange` handlers (like textareas for notes) block the main thread and can cause typing latency. This is a common but subtle performance bottleneck in React applications.
**Action:** Always debounce `localStorage` writes for continuous text inputs using `useRef` and `setTimeout` (e.g., 500ms delay) to keep the UI responsive while ensuring data is still saved.
