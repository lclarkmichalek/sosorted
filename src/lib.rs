#![feature(portable_simd)]

mod deduplicate;
pub use deduplicate::deduplicate;

mod find_first_duplicate;
pub use find_first_duplicate::find_first_duplicate;

mod intersect;
pub use intersect::intersect;

mod union;
pub use union::{union, union_size};
