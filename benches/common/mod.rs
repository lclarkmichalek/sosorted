//! Common benchmark utilities: data generation and datasets.
//!
//! This module provides shared infrastructure for all benchmarks:
//! - `rng`: Seed constants and RNG utilities for reproducible data
//! - `generators`: Core data generation functions
//! - `unary_datasets`: Standard datasets for unary operations (deduplicate, find_first_duplicate)
//! - `binary_datasets`: Standard datasets for binary operations (intersect, union, difference)

// Allow dead code and unused imports since this is shared across benchmarks
#![allow(dead_code)]
#![allow(unused_imports)]

pub mod binary_datasets;
pub mod generators;
pub mod rng;
pub mod unary_datasets;

// Re-export commonly used items for convenience
pub use binary_datasets::{standard_binary_datasets, BinaryDataset, BinaryDatasetGroup};
pub use generators::*;
pub use rng::DEFAULT_SIZE;
pub use unary_datasets::{standard_unary_datasets, UnaryDataset, UnaryDatasetGroup};
