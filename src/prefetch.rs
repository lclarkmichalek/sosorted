//! Software prefetch helpers.
//!
//! Wraps `_mm_prefetch` with a cross-arch stub so callers don't need to gate
//! every call site. Non-x86_64 targets compile to a no-op.

/// Prefetch a cacheline containing `ptr` into L1 for read access.
#[inline(always)]
pub fn prefetch_read<T>(ptr: *const T) {
    #[cfg(target_arch = "x86_64")]
    unsafe {
        use std::arch::x86_64::{_mm_prefetch, _MM_HINT_T0};
        _mm_prefetch(ptr as *const i8, _MM_HINT_T0);
    }
    // Other targets: no-op. The compiler is welcome to CSE/dead-code the
    // `ptr` argument.
    #[cfg(not(target_arch = "x86_64"))]
    {
        let _ = ptr;
    }
}
