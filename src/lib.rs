#![feature(portable_simd)]

pub mod sorted_vec;
pub use sorted_vec::{deduplicate, find_first_duplicate};
