#![feature(portable_simd)]
use std::simd::Mask;
use std::simd::cmp::SimdPartialEq;
use std::simd::Simd;

fn main() {
    let a = Simd::from_array([1, 2, 3, 4]);
    let b = Simd::from_array([1, 2, 0, 4]);
    let mask: Mask<i32, 4> = a.simd_eq(b);
    let bitmask = mask.to_bitmask();
    println!("Bitmask type name: {}", std::any::type_name_of_val(&bitmask));
    println!("Bitmask value: {:b}", bitmask);

    let a8 = Simd::<u8, 16>::splat(0);
    let mask8 = a8.simd_eq(a8);
    let bitmask8 = mask8.to_bitmask();
    println!("Bitmask8 type name: {}", std::any::type_name_of_val(&bitmask8));
}
