## 2024-05-18 - Memoize validation to prevent redundant parsing
**Learning:** Parsing strings to integers (e.g., `parseInt`) during render can cause unnecessary overhead, especially in components that re-render frequently like a countdown timer.
**Action:** Use `React.useMemo` to cache the results of parsing and validation, recalculating only when the input string changes.
