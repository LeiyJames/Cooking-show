## 2026-04-13 - Debounce localStorage writes for text inputs
**Learning:** Synchronous localStorage.setItem calls inside React controlled input onChange handlers (like textareas) block the main thread.
**Action:** Always debounce localStorage writes for continuous text inputs using useRef and setTimeout (e.g., 500ms delay).
