//! Common benchmark utilities: data generation, datasets, and baseline implementations.
//!
//! This module provides shared infrastructure for all benchmarks:
//! - `rng`: Seed constants and RNG utilities for reproducible data
//! - `generators`: Core data generation functions
//! - `baselines`: Naive implementations for comparison
//! - `unary_datasets`: Standard datasets for unary operations (deduplicate, find_first_duplicate)
//! - `binary_datasets`: Standard datasets for binary operations (intersect, union, difference)

pub mod baselines;
pub mod binary_datasets;
pub mod generators;
pub mod rng;
pub mod unary_datasets;

// Re-export commonly used items for convenience
pub use baselines::*;
pub use binary_datasets::{standard_binary_datasets, BinaryDataset, BinaryDatasetGroup};
pub use generators::*;
pub use rng::{DEFAULT_SIZE, SEED_A, SEED_B};
pub use unary_datasets::{standard_unary_datasets, UnaryDataset, UnaryDatasetGroup};
