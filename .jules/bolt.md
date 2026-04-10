## 2024-05-24 - Debouncing Synchronous localStorage Writes in Controlled Inputs
**Learning:** Calling `localStorage.setItem` synchronously within the `onChange` handler of a React controlled input (like a `<textarea>`) blocks the main thread, leading to typing lag as the string gets serialized and saved on every keystroke.
**Action:** Always wrap `localStorage` writes inside frequently triggered input handlers with a debounce (using `useRef` for the timeout and `setTimeout`/`clearTimeout`, e.g., 500ms delay) to ensure continuous text inputs do not cause performance bottlenecks.
