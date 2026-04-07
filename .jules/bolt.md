## 2025-02-23 - Synchronous localStorage writes in controlled inputs
**Learning:** Synchronous `localStorage.setItem` calls inside React controlled input `onChange` handlers block the main thread and can cause input latency, especially in textareas where users type rapidly.
**Action:** Always debounce `localStorage` writes for continuous text input states using `useRef` and `setTimeout` (e.g., 500ms delay) rather than writing synchronously on every keystroke.
