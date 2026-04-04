## 2025-04-04 - [Performance] Replace Ordering match with if/else chains
**Learning:** In Rust hot loops within this codebase, explicit `if a < b { ... } else if a > b { ... } else { ... }` blocks compile to much more optimal branch instructions than `match a.cmp(&b)` with the `std::cmp::Ordering` enum.
**Action:** Replaced `match a.cmp(&b)` constructs in `src/union.rs` and `src/difference.rs` with explicit `if / else if / else` chains, resulting in a ~20% performance improvement in local micro-benchmarks.
