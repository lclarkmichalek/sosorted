## 2024-05-23 - Avoid match Orderings in hot loops
**Learning:** In Rust hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by avoiding the construction of the `Ordering` enum, allowing LLVM to generate more optimal instruction pipelining and branch prediction.
**Action:** When adding or refactoring fast-path processing, prefer direct boolean comparisons over `Ord::cmp` match blocks.
