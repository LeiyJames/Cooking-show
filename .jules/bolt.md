## 2024-05-24 - Debounce localStorage writes for text inputs
**Learning:** Synchronous `localStorage.setItem` calls inside React controlled input `onChange` handlers (like textareas) block the main thread, leading to poor performance and delayed keystroke rendering, particularly with rapidly changing inputs.
**Action:** Always debounce `localStorage` writes for continuous text inputs using `useRef` and `setTimeout` (e.g., 500ms delay) to ensure smooth UI responsiveness. Clean up timeouts on unmount.
