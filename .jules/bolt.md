## 2024-10-18 - [SIMD Loop Unrolling with Combined Mask Check]
**Learning:** In `intersect_v1`, unrolling the SIMD loop 4x and using `(mask1 | mask2 | mask3 | mask4).any()` to check for matches significantly reduces branching overhead.
**Action:** Apply this pattern to other search-heavy SIMD operations where the "not found" case is common in the inner loop.
## 2024-10-18 - [Logic Bugs in Unrolled SIMD Loops]
**Learning:** When unrolling search loops, using `break` to exit the unrolled loop can inadvertently fall through to the fallback scalar loop if not careful. Always use `continue 'outer` or return explicitly to skip fallbacks when a match is fully handled.
