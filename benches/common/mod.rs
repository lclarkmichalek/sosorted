#[allow(dead_code, unused_imports, unused_variables)]
pub mod binary_datasets;
#[allow(dead_code, unused_imports, unused_variables)]
pub mod generators;
#[allow(dead_code, unused_imports, unused_variables)]
pub mod rng;
#[allow(dead_code, unused_imports, unused_variables)]
pub mod unary_datasets;

#[allow(dead_code, unused_imports, unused_variables)]
pub use binary_datasets::{standard_binary_datasets, BinaryDataset, BinaryDatasetGroup};
#[allow(dead_code, unused_imports, unused_variables)]
pub use generators::*;
#[allow(dead_code, unused_imports, unused_variables)]
pub use rng::DEFAULT_SIZE;
#[allow(dead_code, unused_imports, unused_variables)]
pub use unary_datasets::{standard_unary_datasets, UnaryDataset, UnaryDatasetGroup};
