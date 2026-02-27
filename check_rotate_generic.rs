#![feature(portable_simd)]
use std::simd::Simd;

fn main() {
    let v = Simd::from_array([1, 2, 3, 4]);
    // For SortedSimdElement trait, we need to know if we can expose rotate_elements_right generically
    // It seems Simd::rotate_elements_right is a const generic method on Simd<T, N>

    let rotated = v.rotate_elements_right::<1>();
    println!("{:?}", rotated);
}
