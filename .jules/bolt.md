## 2025-02-18 - [Rust SIMD Intrinsics Performance]
**Learning:** Contrary to expectation, replacing a manual bitmask construction loop with `std::simd::Mask::to_bitmask` intrinsic caused a ~45% performance regression in `intersect_v3` benchmark in this environment. The manual loop was apparently better optimized by the compiler for small fixed-size arrays than the intrinsic call.
**Action:** Always benchmark "obvious" optimizations like replacing loops with intrinsics.

## 2025-02-18 - [intersect_v1 Optimization]
**Learning:** Optimizing `intersect_v1` by calculating match index and skipping ahead yielded a modest ~2.5% speedup. The primary gain came from skipping the scalar fallback loop iterations when a match was found in the SIMD loop.
**Action:** When mixing SIMD and scalar fallback, consider if SIMD success can completely bypass scalar checks to save branch/iteration overhead.
