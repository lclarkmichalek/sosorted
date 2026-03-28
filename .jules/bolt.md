## 2024-05-18 - [Optimization in `union.rs` and `difference.rs`]
**Learning:** In Rust hot loops, replacing `match a.cmp(&b)` with an explicit `if a < b { ... } else if a > b { ... } else { ... }` block significantly improves performance because it allows the compiler to generate more optimal branch instructions.
**Action:** I replaced all usages of `match a.cmp(&b)` with `if`/`else if` in `src/union.rs` and `src/difference.rs`.
