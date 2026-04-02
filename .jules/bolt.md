## 2025-04-02 - Optimize comparisons in difference and union
**Learning:** Using `if a < b` and `else if a > b` instead of `match a.cmp(&b)` speeds up the hot loops in `union` and `difference` methods.
**Action:** Continue using `if` / `else if` for primitive comparisons in hot paths instead of `match a.cmp(&b)`.
