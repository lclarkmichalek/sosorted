## 2026-03-21 - [Optimize comparisons in union and difference operations]
**Learning:** In Rust hot loops, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** When optimizing tight comparison loops, prefer explicit conditionals over `cmp` and `Ordering` matching if branches are highly predictable or straightforward.
