
## 2025-01-28 - Optimizing `match cmp` in hot loops
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions, avoiding the intermediate `Ordering` enum creation.
**Action:** Always prefer `if/else if/else` logic over `match .cmp()` in SIMD fallback and scalar hot loops.
