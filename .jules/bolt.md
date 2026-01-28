## 2026-01-05 - SIMD Mask Optimization
**Learning:** `std::simd::Mask::to_bitmask` intrinsic is 4-10x faster than a manual loop for bitmask generation, resulting in ~40% speedup for intersection algorithms.
**Action:** Always prefer intrinsics over manual bit manipulation loops in SIMD code.
