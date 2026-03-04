
## 2024-05-18 - [Debouncing localStorage Writes for Text Inputs]
**Learning:** Calling `localStorage.setItem` synchronously inside a text area's `onChange` handler (e.g., in `RecipeSections.tsx` and `FilipinoRecipeSections.tsx` when saving cooking notes) causes main thread blocking on every keystroke. This is a noticeable performance bottleneck during rapid typing.
**Action:** When saving text input state to `localStorage`, always wrap the `localStorage.setItem` call in a `setTimeout` (e.g., 500ms) with an associated `useRef` to debounce the writes, clearing any previous timeouts and including a cleanup `useEffect` on unmount.
