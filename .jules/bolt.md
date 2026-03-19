## 2025-02-14 - Replace match cmp with if/else in hot loops
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** When working on performance-sensitive array operations (like merging or intersecting), prefer direct comparison operators (`<`, `>`) over `cmp()` and `Ordering` matching in scalar fallback loops.
