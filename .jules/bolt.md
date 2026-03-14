## 2024-03-14 - Optimize match a[i].cmp(&b[j])
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** Replace `match a.cmp(&b)` blocks with `if / else if / else` loops, specifically in `difference.rs` and `union.rs` where this is done per element.
