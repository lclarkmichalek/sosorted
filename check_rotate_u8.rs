#![feature(portable_simd)]
use std::simd::Simd;

fn main() {
    let a: Simd<u8, 16> = Simd::from_array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
    let rotated = a.rotate_elements_right::<1>();
    println!("{:?}", rotated);
}
