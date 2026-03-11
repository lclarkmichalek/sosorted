## 2024-05-15 - Replace match with explicit if-else blocks for std::cmp::Ordering
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions. Ensure unused `std::cmp::Ordering` imports are removed after applying this optimization.
**Action:** Apply this transformation to `union`, `union_size`, `difference`, and `difference_size` scalar fallback loops.
