//! Standard datasets for unary operation benchmarks (deduplicate, find_first_duplicate).

use super::generators::*;
use super::rng::*;

/// A named dataset for unary benchmarks.
pub struct UnaryDataset {
    pub name: &'static str,
    pub data: Vec<u64>,
}

/// A group of related datasets with a common theme.
pub struct UnaryDatasetGroup {
    pub name: &'static str,
    pub datasets: Vec<UnaryDataset>,
}

/// Generate all standard unary dataset groups for a given size.
pub fn standard_unary_datasets(size: usize) -> Vec<UnaryDatasetGroup> {
    vec![
        basic_datasets(size),
        density_datasets(size),
        run_length_datasets(size),
        realistic_datasets(size),
        scaling_datasets(),
    ]
}

/// Basic duplicate patterns for quick sanity checks.
fn basic_datasets(size: usize) -> UnaryDatasetGroup {
    let base = generate_sorted_unique(SEED_A, size);

    let all_unique = base.clone();

    let mut early_dup = base.clone();
    early_dup[10] = early_dup[9];

    let mut mid_dup = base.clone();
    let mid = mid_dup.len() / 2;
    mid_dup[mid] = mid_dup[mid - 1];

    let mut late_dup = base.clone();
    let pos = (size as f64 * 0.9) as usize;
    late_dup[pos] = late_dup[pos - 1];

    let mut all_duplicates = base.clone();
    add_contiguous_duplicates(&mut all_duplicates, 0.0..1.0);

    UnaryDatasetGroup {
        name: "basic",
        datasets: vec![
            UnaryDataset {
                name: "all_unique",
                data: all_unique,
            },
            UnaryDataset {
                name: "early_dup",
                data: early_dup,
            },
            UnaryDataset {
                name: "mid_dup",
                data: mid_dup,
            },
            UnaryDataset {
                name: "late_dup",
                data: late_dup,
            },
            UnaryDataset {
                name: "all_duplicates",
                data: all_duplicates,
            },
        ],
    }
}

/// Datasets testing different duplicate densities.
fn density_datasets(size: usize) -> UnaryDatasetGroup {
    UnaryDatasetGroup {
        name: "density",
        datasets: vec![
            UnaryDataset {
                name: "0pct",
                data: generate_sorted_unique(SEED_A, size),
            },
            UnaryDataset {
                name: "1pct",
                data: generate_with_unique_count(SEED_A, size, (size as f64 * 0.99) as usize),
            },
            UnaryDataset {
                name: "10pct",
                data: generate_with_unique_count(SEED_A, size, (size as f64 * 0.90) as usize),
            },
            UnaryDataset {
                name: "50pct",
                data: generate_with_unique_count(SEED_A, size, size / 2),
            },
            UnaryDataset {
                name: "90pct",
                data: generate_with_unique_count(SEED_A, size, (size as f64 * 0.10) as usize),
            },
            UnaryDataset {
                name: "99pct",
                data: generate_with_unique_count(SEED_A, size, (size as f64 * 0.01) as usize),
            },
        ],
    }
}

/// Datasets testing different duplicate run lengths.
fn run_length_datasets(size: usize) -> UnaryDatasetGroup {
    UnaryDatasetGroup {
        name: "run_length",
        datasets: vec![
            UnaryDataset {
                name: "1",
                data: generate_sorted_unique(SEED_A, size),
            },
            UnaryDataset {
                name: "2",
                data: generate_with_run_length(SEED_B, size, 2),
            },
            UnaryDataset {
                name: "4",
                data: generate_with_run_length(SEED_B, size, 4),
            },
            UnaryDataset {
                name: "16",
                data: generate_with_run_length(SEED_B, size, 16),
            },
            UnaryDataset {
                name: "64",
                data: generate_with_run_length(SEED_B, size, 64),
            },
            UnaryDataset {
                name: "256",
                data: generate_with_run_length(SEED_B, size, 256),
            },
        ],
    }
}

/// Realistic data patterns from real-world scenarios.
fn realistic_datasets(size: usize) -> UnaryDatasetGroup {
    UnaryDatasetGroup {
        name: "realistic",
        datasets: vec![
            UnaryDataset {
                name: "zipf",
                data: generate_zipf(SEED_ZIPF, size),
            },
            UnaryDataset {
                name: "database_ids",
                data: generate_database_ids(SEED_DATABASE_IDS, size),
            },
            UnaryDataset {
                name: "clustered",
                data: generate_clustered(SEED_CLUSTERED, size),
            },
            UnaryDataset {
                name: "small_runs",
                data: generate_small_runs(SEED_SMALL_RUNS, size),
            },
        ],
    }
}

/// Datasets for testing size scaling behavior.
fn scaling_datasets() -> UnaryDatasetGroup {
    UnaryDatasetGroup {
        name: "scaling",
        datasets: vec![
            UnaryDataset {
                name: "1K",
                data: generate_with_unique_count(SEED_A, 1_000, 500),
            },
            UnaryDataset {
                name: "10K",
                data: generate_with_unique_count(SEED_A, 10_000, 5_000),
            },
            UnaryDataset {
                name: "100K",
                data: generate_with_unique_count(SEED_A, 100_000, 50_000),
            },
            UnaryDataset {
                name: "1M",
                data: generate_with_unique_count(SEED_A, 1_000_000, 500_000),
            },
        ],
    }
}
