#![feature(portable_simd)]

mod deduplicate;
pub use deduplicate::deduplicate;

mod find_first_duplicate;
pub use find_first_duplicate::find_first_duplicate;
