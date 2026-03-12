## 2024-03-12 - [Optimize difference with explicit branches]
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** Always prefer explicit `if-else` comparisons over `match a.cmp(&b)` in performance-critical hot loops.
