## 2024-03-24 - [Optimize cmp operations in hot loops]
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** Always prefer explicit `if-else` block over `match a.cmp(&b)` when comparing primitives in performance-critical code sections in this repository.
