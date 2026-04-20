//! Software prefetch helpers.
//!
//! Wraps `_mm_prefetch` with a cross-arch stub so callers don't need to gate
//! every call site. Non-x86_64 targets compile to a no-op.

/// Prefetch the cacheline at `base + offset` (in elements) into L1 for read.
///
/// Uses `wrapping_add` so callers don't need a bounds check: the x86 PREFETCH
/// instruction is a hint and never faults, even on unmapped addresses, so it
/// is safe to issue past the end of a slice. On non-x86_64 targets this
/// compiles to a no-op and the arithmetic is elided.
#[inline(always)]
pub fn prefetch_read_at<T>(base: *const T, offset: usize) {
    #[cfg(target_arch = "x86_64")]
    {
        use std::arch::x86_64::{_mm_prefetch, _MM_HINT_T0};
        // wrapping_offset keeps this defined even if offset pushes past the
        // slice bounds; PREFETCH ignores bad addresses.
        let ptr = base.wrapping_add(offset);
        unsafe {
            _mm_prefetch(ptr as *const i8, _MM_HINT_T0);
        }
    }
    #[cfg(not(target_arch = "x86_64"))]
    {
        let _ = (base, offset);
    }
}
