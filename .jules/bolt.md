## 2025-01-28 - Branch optimization over `match cmp` in `sosorted` hot loops
**Learning:** Using an explicit `if a < b { ... } else if a > b { ... } else { ... }` chain significantly outperforms `match a.cmp(&b)` in hot tight loops processing sorted elements. It allows the compiler to generate more optimal branch instructions than with the generic `Ordering` match structure.
**Action:** When writing performance critical tight loops iterating over sorted data, opt for direct explicit comparison `if/else` chains instead of the seemingly idiomatic `std::cmp::Ordering` match.
