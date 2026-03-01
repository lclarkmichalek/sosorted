
## 2024-05-18 - [Optimizing deduplicate in sosorted]
**Learning:** In SIMD applications like `deduplicate`, the "Compress & Store" approach can be significantly improved by replacing an iteration over each lane `for lane in 0..lanes { if ne_mask.test(lane) { ... } }` with bitmask processing using `trailing_zeros()`: `let mut bitmask = ne_mask.to_bitmask(); while bitmask != 0 { let lane = bitmask.trailing_zeros() as usize; ... bitmask &= bitmask - 1; }`. This branchless-like approach scales better and reduces overhead, especially for larger lane counts.
**Action:** Replace manual lane iteration with bitmask trailing_zeros when extracting matched elements from a SIMD mask.
