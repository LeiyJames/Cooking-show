## 2025-02-14 - Add aria-live to Dynamic Scaler State
**Learning:** Screen readers do not automatically announce dynamic state changes (like the "Servings" counter) during interactive button clicks unless explicitly wrapped with `aria-live`.
**Action:** When creating up/down quantity scalers or interactive dynamic text, always wrap the counter span with `aria-live="polite"` and `aria-atomic="true"` so value changes are read contextually.
