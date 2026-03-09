
## 2024-05-19 - Replacing `match a.cmp(&b)` with explicit `if-else` block
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** Replaced `match a.cmp(&b)` with explicit `if-else` blocks in `src/union.rs` and `src/difference.rs`.
