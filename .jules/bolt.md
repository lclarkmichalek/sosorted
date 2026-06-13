## 2026-01-05 - Avoid Ordering Enum Construction in Hot Loops
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by avoiding the construction of the `Ordering` enum, allowing LLVM to generate more optimal instruction pipelining and branch prediction.
**Action:** Always prefer explicit `if a < b` comparisons over `match a.cmp(&b)` inside tight loops. Ensure unused `std::cmp::Ordering` imports are removed.
