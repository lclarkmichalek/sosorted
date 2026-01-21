use std::simd::cmp::{SimdPartialEq, SimdPartialOrd};
use std::simd::{LaneCount, Mask, MaskElement, Simd, SimdElement, SupportedLaneCount};

/// Compile-time SIMD width detection in bits.
#[cfg(target_feature = "avx512f")]
pub const SIMD_WIDTH_BITS: usize = 512;

#[cfg(all(target_feature = "avx2", not(target_feature = "avx512f")))]
pub const SIMD_WIDTH_BITS: usize = 256;

#[cfg(not(any(target_feature = "avx2", target_feature = "avx512f")))]
pub const SIMD_WIDTH_BITS: usize = 128;

/// Sealed trait pattern to prevent external implementations.
mod sealed {
    pub trait Sealed {}
}

/// Helper trait to convert various bitmask types to u64
pub trait BitMaskToU64 {
    fn to_u64(self) -> u64;
}

impl BitMaskToU64 for u8 {
    #[inline(always)]
    fn to_u64(self) -> u64 {
        self as u64
    }
}
impl BitMaskToU64 for u16 {
    #[inline(always)]
    fn to_u64(self) -> u64 {
        self as u64
    }
}
impl BitMaskToU64 for u32 {
    #[inline(always)]
    fn to_u64(self) -> u64 {
        self as u64
    }
}
impl BitMaskToU64 for u64 {
    #[inline(always)]
    fn to_u64(self) -> u64 {
        self
    }
}
impl BitMaskToU64 for [u8; 1] {
    #[inline(always)]
    fn to_u64(self) -> u64 {
        self[0] as u64
    }
}
impl BitMaskToU64 for [u8; 2] {
    #[inline(always)]
    fn to_u64(self) -> u64 {
        u16::from_ne_bytes(self) as u64
    }
}
impl BitMaskToU64 for [u8; 4] {
    #[inline(always)]
    fn to_u64(self) -> u64 {
        u32::from_ne_bytes(self) as u64
    }
}
impl BitMaskToU64 for [u8; 8] {
    #[inline(always)]
    fn to_u64(self) -> u64 {
        u64::from_ne_bytes(self)
    }
}

/// Trait for SIMD mask operations.
pub trait SimdMaskOps: Copy + std::ops::BitOr<Output = Self> {
    /// Returns true if all lanes are set.
    fn all(self) -> bool;
    /// Returns true if any lane is set.
    fn any(self) -> bool;
    /// Tests if a specific lane is set.
    fn test(self, lane: usize) -> bool;
    /// Converts the mask to a bitmask.
    fn to_bitmask(self) -> u64;
}

// Implement SimdMaskOps for all Mask types
impl<T: MaskElement, const N: usize> SimdMaskOps for Mask<T, N>
where
    LaneCount<N>: SupportedLaneCount,
    <LaneCount<N> as SupportedLaneCount>::BitMask: BitMaskToU64,
{
    #[inline(always)]
    fn all(self) -> bool {
        Mask::all(self)
    }

    #[inline(always)]
    fn any(self) -> bool {
        Mask::any(self)
    }

    #[inline(always)]
    fn test(self, lane: usize) -> bool {
        Mask::test(&self, lane)
    }

    #[inline(always)]
    fn to_bitmask(self) -> u64 {
        self.to_bitmask().to_u64()
    }
}

/// Trait for scalar types that can be used with SIMD-accelerated sorted operations.
///
/// This trait is sealed and cannot be implemented outside this crate.
/// It is implemented for all integer types: `u8`, `u16`, `u32`, `u64`, `i8`, `i16`, `i32`, `i64`.
///
/// Each type has an optimal SIMD lane count based on the target CPU's SIMD width,
/// accessible via the `LANES` associated constant.
///
/// # Example
///
/// ```
/// use sosorted::intersect;
///
/// // Works with u64
/// let a = [1u64, 2, 3, 4, 5];
/// let b = [2, 4];
/// let mut dest = [0u64; 5];
/// assert_eq!(intersect(&mut dest, &a, &b), 2);
///
/// // Works with i32
/// let c = [1i32, 3, 5, 7];
/// let d = [1, 5, 9];
/// let mut dest = [0i32; 4];
/// assert_eq!(intersect(&mut dest, &c, &d), 2);
/// ```
pub trait SortedSimdElement:
    sealed::Sealed + SimdElement + Copy + PartialOrd + PartialEq + Default + Sized
{
    /// The mask element type for this scalar type's SIMD operations.
    type MaskElement: MaskElement;

    /// The optimal number of SIMD lanes for this type based on target CPU features.
    const LANES: usize;

    /// The SIMD vector type for this element.
    type SimdVec: Copy
        + SimdPartialEq<Mask = Self::SimdMask>
        + SimdPartialOrd<Mask = Self::SimdMask>;

    /// The SIMD mask type for this element.
    type SimdMask: SimdMaskOps;

    /// Create a SIMD vector with all lanes set to the given value.
    fn simd_splat(value: Self) -> Self::SimdVec;

    /// Load a SIMD vector from a slice. The slice must have at least `LANES` elements.
    fn simd_from_slice(slice: &[Self]) -> Self::SimdVec;
}

/// Macro to implement SortedSimdElement for a given type with specific lane count.
macro_rules! impl_sorted_simd_element {
    ($ty:ty, $mask_ty:ty, $lanes:expr) => {
        impl sealed::Sealed for $ty {}

        impl SortedSimdElement for $ty
        where
            LaneCount<$lanes>: SupportedLaneCount,
        {
            type MaskElement = $mask_ty;
            const LANES: usize = $lanes;
            type SimdVec = Simd<$ty, $lanes>;
            type SimdMask = Mask<$mask_ty, $lanes>;

            #[inline(always)]
            fn simd_splat(value: Self) -> Self::SimdVec {
                Simd::splat(value)
            }

            #[inline(always)]
            fn simd_from_slice(slice: &[Self]) -> Self::SimdVec {
                Simd::from_slice(slice)
            }
        }
    };
}

// AVX-512: 512-bit registers
// u8/i8:   512 / 8  = 64 lanes
// u16/i16: 512 / 16 = 32 lanes
// u32/i32: 512 / 32 = 16 lanes
// u64/i64: 512 / 64 = 8 lanes
#[cfg(target_feature = "avx512f")]
mod impls {
    use super::*;
    impl_sorted_simd_element!(u8, i8, 64);
    impl_sorted_simd_element!(u16, i16, 32);
    impl_sorted_simd_element!(u32, i32, 16);
    impl_sorted_simd_element!(u64, i64, 8);
    impl_sorted_simd_element!(i8, i8, 64);
    impl_sorted_simd_element!(i16, i16, 32);
    impl_sorted_simd_element!(i32, i32, 16);
    impl_sorted_simd_element!(i64, i64, 8);
}

// AVX2: 256-bit registers
// u8/i8:   256 / 8  = 32 lanes
// u16/i16: 256 / 16 = 16 lanes
// u32/i32: 256 / 32 = 8 lanes
// u64/i64: 256 / 64 = 4 lanes
#[cfg(all(target_feature = "avx2", not(target_feature = "avx512f")))]
mod impls {
    use super::*;
    impl_sorted_simd_element!(u8, i8, 32);
    impl_sorted_simd_element!(u16, i16, 16);
    impl_sorted_simd_element!(u32, i32, 8);
    impl_sorted_simd_element!(u64, i64, 4);
    impl_sorted_simd_element!(i8, i8, 32);
    impl_sorted_simd_element!(i16, i16, 16);
    impl_sorted_simd_element!(i32, i32, 8);
    impl_sorted_simd_element!(i64, i64, 4);
}

// SSE2 / Fallback: 128-bit registers
// u8/i8:   128 / 8  = 16 lanes
// u16/i16: 128 / 16 = 8 lanes
// u32/i32: 128 / 32 = 4 lanes
// u64/i64: 128 / 64 = 2 lanes
#[cfg(not(any(target_feature = "avx2", target_feature = "avx512f")))]
mod impls {
    use super::*;
    impl_sorted_simd_element!(u8, i8, 16);
    impl_sorted_simd_element!(u16, i16, 8);
    impl_sorted_simd_element!(u32, i32, 4);
    impl_sorted_simd_element!(u64, i64, 2);
    impl_sorted_simd_element!(i8, i8, 16);
    impl_sorted_simd_element!(i16, i16, 8);
    impl_sorted_simd_element!(i32, i32, 4);
    impl_sorted_simd_element!(i64, i64, 2);
}
