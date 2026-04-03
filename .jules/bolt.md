## 2024-05-15 - Optimize hot loop comparisons
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** When writing performance-critical loops that compare elements, prefer explicit boolean checks over `std::cmp::Ordering` matching, and remember to remove unused imports after refactoring.
