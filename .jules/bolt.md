## 2026-01-05 - [SIMD Bitmask Optimization]
**Learning:** The manual loop implementation of `to_bitmask` in `SimdMaskOps` was an anti-pattern, slower than the intrinsic. Also, `is_multiple_of` is preferred on nightly Rust.
**Action:** Always check if `portable_simd` intrinsics are available before implementing manual loops. Use `is_multiple_of` for modulo checks on nightly.
