#![feature(portable_simd)]

mod simd_element;
pub use simd_element::{SortedSimdElement, SIMD_LANES};

mod deduplicate;
pub use deduplicate::deduplicate;

mod find_first_duplicate;
pub use find_first_duplicate::find_first_duplicate;

mod intersect;
pub use intersect::intersect;

mod intersect_lemire;
pub use intersect_lemire::{intersect_adaptive, intersect_simd_galloping, intersect_v1, intersect_v3};

mod union;
pub use union::{union, union_size};

mod difference;
pub use difference::{difference, difference_size};
