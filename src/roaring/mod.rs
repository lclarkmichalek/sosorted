//! Roaring bitmap implementation for efficient set operations on `u32` values.
//!
//! This module provides a memory-efficient, immutable bitmap data structure specialized
//! for storing and manipulating sets of `u32` values using the roaring bitmap approach.
//!
//! # Key Features
//!
//! - **Immutable**: Operations return new bitmaps rather than mutating in place
//! - **Memory-efficient**: Hybrid container approach (array for sparse, bitmap for dense)
//! - **Fast operations**: Union and intersection leveraging SIMD where applicable
//! - **Idiomatic Rust**: Implements standard traits (`Eq`, `Hash`, `Clone`, `Debug`, etc.)
//! - **Ergonomic**: Operator overloading (`&bitmap1 | &bitmap2`)
//!
//! # Example
//!
//! ```
//! use sosorted::Bitmap;
//!
//! // Create bitmaps from sorted data
//! let bitmap1 = Bitmap::from_sorted_slice(&[1, 5, 100, 1000, 10000]);
//! let bitmap2 = Bitmap::from_sorted_slice(&[42, 100, 200]);
//!
//! // Query operations
//! assert!(bitmap1.contains(100));
//! assert_eq!(bitmap1.len(), 5);
//!
//! // Set operations
//! let union = bitmap1.union(&bitmap2);
//! assert_eq!(union.len(), 7);
//!
//! let intersection = bitmap1.intersection(&bitmap2);
//! assert_eq!(intersection.len(), 1);
//!
//! // Operator overloading
//! let union2 = &bitmap1 | &bitmap2;
//! let inter2 = &bitmap1 & &bitmap2;
//! ```

mod bitmap;
mod container;
mod iter;

pub use bitmap::Bitmap;
pub use iter::BitmapIter;
