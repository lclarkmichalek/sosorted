#![feature(portable_simd)]
use std::simd::{LaneCount, Mask, SupportedLaneCount, MaskElement};

pub trait SimdMaskOps: Copy + std::ops::BitOr<Output = Self> {
    fn to_bitmask(self) -> u64;
}

impl<T: MaskElement, const N: usize> SimdMaskOps for Mask<T, N>
where
    LaneCount<N>: SupportedLaneCount,
{
    #[inline(always)]
    fn to_bitmask(self) -> u64 {
        Mask::to_bitmask(self).into()
    }
}

fn main() {
    type M = Mask<i32, 4>;
    let m = M::splat(true);
    let bm = SimdMaskOps::to_bitmask(m);
    println!("Bitmask: {}", bm);
}
