
## 2024-03-22 - [Refactor Comparisons for Branch Optimizations]
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** When working on comparison-heavy loops in Rust, prefer explicit `if/else if/else` blocks over `match` with `std::cmp::Ordering` for primitive type comparisons.
