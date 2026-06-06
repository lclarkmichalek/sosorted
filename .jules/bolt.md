## 2025-01-05 - Optimize match cmp avoiding Ordering enum

**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by avoiding the construction of the `Ordering` enum, allowing LLVM to generate more optimal instruction pipelining and branch prediction.

**Action:** Ensure that hot loops using `match a.cmp(&b)` are rewritten to use explicit `if/else` checks to improve performance, and remove unused `std::cmp::Ordering` imports.
