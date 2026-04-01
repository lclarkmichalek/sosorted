## 2026-02-16 - Replace match with explicit if/else comparisons
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** Always prefer explicit `if a < b` comparisons over `match a.cmp(&b)` in hot loops for performance optimization. Ensure unused `std::cmp::Ordering` imports are removed after applying this optimization.
