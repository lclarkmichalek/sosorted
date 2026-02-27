#![feature(portable_simd)]
use std::simd::Simd;

fn main() {
    let v = Simd::from_array([1, 2, 3, 4]);
    let rotated = v.rotate_elements_right::<1>();
    println!("{:?}", rotated);
}
