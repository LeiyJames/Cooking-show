## 2024-05-24 - Debouncing localStorage in controlled inputs
**Learning:** Synchronous localStorage.setItem calls inside React controlled input onChange handlers block the main thread and can cause typing lag.
**Action:** Always debounce localStorage writes for continuous text inputs using useRef and setTimeout. Use a useEffect cleanup to flush pending saves synchronously on unmount to prevent data loss.
