
## 2024-05-24 - [Replace match cmp with if/else in hot loops]
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** When working on tight loops involving comparisons, prefer direct less-than/greater-than checks over `std::cmp::Ordering` matching.
