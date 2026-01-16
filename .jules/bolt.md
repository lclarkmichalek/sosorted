## 2024-05-23 - Performance Surprise in Difference Operation
**Learning:** In SIMD-accelerated algorithms (like `difference`), explicitly checking boundary conditions with scalar comparisons (`b[j] > a[i]` and `b[j + lanes - 1] < a[i]`) can significantly outperform SIMD mask operations (`simd_gt().all()`).
**Action:** Always check if a scalar fast-path is possible and beneficial before loading data into SIMD registers, especially for sorted data where order properties allow skipping chunks based on first/last elements.

## 2024-05-23 - Regression in `intersect` with `to_bitmask`
**Learning:** Replacing a simple index increment with `to_bitmask().trailing_zeros()` caused a regression in `intersect_v1`.
**Action:** Be careful with `to_bitmask` overhead in tight loops if the match probability is low or if the current scalar logic is extremely cheap.
