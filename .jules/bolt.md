## 2026-02-17 - SIMD Intrinsic Performance
**Learning:** `std::simd::Mask::to_bitmask` intrinsic is significantly faster (~2x) than a manual loop on AVX2 targets (32/4 lanes) and scales better for larger vectors (AVX-512). However, on default targets (SSE2, 16 lanes), it might be slower due to emulation or overhead, but the trade-off favors modern hardware.
**Action:** Always prefer SIMD intrinsics for vector operations unless profiling proves otherwise on the specific target hardware of interest. Verify performance with `-C target-cpu=native`.
