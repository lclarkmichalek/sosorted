use std::simd::{Mask, SimdElement};

/// The SIMD lane width used for all operations.
pub const SIMD_LANES: usize = 4;

/// Sealed trait pattern to prevent external implementations.
mod sealed {
    pub trait Sealed {}
}

/// Trait for scalar types that can be used with SIMD-accelerated sorted operations.
///
/// This trait is sealed and cannot be implemented outside this crate.
/// It is implemented for all integer types: `u8`, `u16`, `u32`, `u64`, `i8`, `i16`, `i32`, `i64`.
///
/// # Example
///
/// ```
/// use sosorted::intersect;
///
/// // Works with u64
/// let mut a = [1u64, 2, 3, 4, 5];
/// let b = [2, 4];
/// assert_eq!(intersect(&mut a, &b), 2);
///
/// // Works with i32
/// let mut c = [1i32, 3, 5, 7];
/// let d = [1, 5, 9];
/// assert_eq!(intersect(&mut c, &d), 2);
/// ```
pub trait SortedSimdElement:
    sealed::Sealed + SimdElement + Copy + PartialOrd + PartialEq + Default
{
    /// The mask element type for this scalar type's SIMD operations.
    type MaskElement: std::simd::MaskElement;
}

// Implement Sealed for all supported types
impl sealed::Sealed for u8 {}
impl sealed::Sealed for u16 {}
impl sealed::Sealed for u32 {}
impl sealed::Sealed for u64 {}
impl sealed::Sealed for i8 {}
impl sealed::Sealed for i16 {}
impl sealed::Sealed for i32 {}
impl sealed::Sealed for i64 {}

// Implement SortedSimdElement for all supported types
impl SortedSimdElement for u8 {
    type MaskElement = i8;
}
impl SortedSimdElement for u16 {
    type MaskElement = i16;
}
impl SortedSimdElement for u32 {
    type MaskElement = i32;
}
impl SortedSimdElement for u64 {
    type MaskElement = i64;
}
impl SortedSimdElement for i8 {
    type MaskElement = i8;
}
impl SortedSimdElement for i16 {
    type MaskElement = i16;
}
impl SortedSimdElement for i32 {
    type MaskElement = i32;
}
impl SortedSimdElement for i64 {
    type MaskElement = i64;
}

/// Type alias for the SIMD mask type used by a given element type.
pub type SimdMask<T> = Mask<<T as SortedSimdElement>::MaskElement, SIMD_LANES>;
