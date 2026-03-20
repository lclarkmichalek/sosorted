
## 2024-03-20 - [Optimal Branching in Hot Loops]
**Learning:** In hot loops within this codebase, replacing `match a.cmp(&b)` with explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks significantly improves performance by allowing the compiler to generate more optimal branch instructions.
**Action:** When working on performance-critical sections (e.g., SIMD fallbacks or scalar merge loops), prefer explicit `if`/`else if` chains over `match` statements for standard comparisons, and ensure any unused `std::cmp::Ordering` imports are removed.
