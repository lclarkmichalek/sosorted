//! Standard datasets for binary operation benchmarks (intersect, union, difference).

use super::generators::*;
use super::rng::*;

/// A named dataset pair for binary benchmarks.
pub struct BinaryDataset {
    pub name: &'static str,
    pub a: Vec<u64>,
    pub b: Vec<u64>,
}

/// A group of related binary datasets with a common theme.
pub struct BinaryDatasetGroup {
    pub name: &'static str,
    pub datasets: Vec<BinaryDataset>,
}

/// Generate all standard binary dataset groups for a given size.
pub fn standard_binary_datasets(size: usize) -> Vec<BinaryDatasetGroup> {
    vec![
        overlap_datasets(size),
        asymmetric_datasets(size),
        scaling_datasets(),
    ]
}

/// Datasets testing different overlap/intersection densities.
fn overlap_datasets(size: usize) -> BinaryDatasetGroup {
    let base = generate_sorted_unique(SEED_A, size);
    let max_val = size as u64 * 10;

    // 0% overlap - completely disjoint
    let disjoint = generate_disjoint(&base, 0.5);

    // 1% overlap
    let mut overlap_1pct = generate_disjoint(&base, 0.5);
    add_spread_intersections(&mut overlap_1pct, &base, size / 100);

    // 10% overlap
    let mut overlap_10pct = generate_disjoint(&base, 0.5);
    add_spread_intersections(&mut overlap_10pct, &base, size / 10);

    // 50% overlap
    let mut overlap_50pct = generate_disjoint(&base, 0.5);
    add_spread_intersections(&mut overlap_50pct, &base, size / 2);

    // 100% overlap - identical
    let identical = base.clone();

    BinaryDatasetGroup {
        name: "overlap",
        datasets: vec![
            BinaryDataset {
                name: "0pct",
                a: base.clone(),
                b: disjoint,
            },
            BinaryDataset {
                name: "1pct",
                a: base.clone(),
                b: overlap_1pct,
            },
            BinaryDataset {
                name: "10pct",
                a: base.clone(),
                b: overlap_10pct,
            },
            BinaryDataset {
                name: "50pct",
                a: base.clone(),
                b: overlap_50pct,
            },
            BinaryDataset {
                name: "100pct",
                a: base,
                b: identical,
            },
        ],
    }
}

/// Datasets testing asymmetric array sizes (Lemire-style).
fn asymmetric_datasets(size: usize) -> BinaryDatasetGroup {
    let max_val = size as u64 * 10;

    BinaryDatasetGroup {
        name: "asymmetric",
        datasets: vec![
            BinaryDataset {
                name: "1:1",
                a: generate_sorted_unique_bounded(SEED_A, size, max_val),
                b: generate_sorted_unique_bounded(SEED_B, size, max_val),
            },
            BinaryDataset {
                name: "10:1",
                a: generate_sorted_unique_bounded(SEED_A, size, max_val),
                b: generate_sorted_unique_bounded(SEED_B, size / 10, max_val),
            },
            BinaryDataset {
                name: "50:1",
                a: generate_sorted_unique_bounded(SEED_A, size, max_val),
                b: generate_sorted_unique_bounded(SEED_B, size / 50, max_val),
            },
            BinaryDataset {
                name: "100:1",
                a: generate_sorted_unique_bounded(SEED_A, size, max_val),
                b: generate_sorted_unique_bounded(SEED_B, size / 100, max_val),
            },
            BinaryDataset {
                name: "1000:1",
                a: generate_sorted_unique_bounded(SEED_A, size, max_val),
                b: generate_sorted_unique_bounded(SEED_B, size / 1000, max_val),
            },
        ],
    }
}

/// Datasets for testing size scaling behavior.
fn scaling_datasets() -> BinaryDatasetGroup {
    BinaryDatasetGroup {
        name: "scaling",
        datasets: vec![
            BinaryDataset {
                name: "1K",
                a: generate_sorted_unique_bounded(SEED_A, 1_000, 10_000),
                b: generate_sorted_unique_bounded(SEED_B, 1_000, 10_000),
            },
            BinaryDataset {
                name: "10K",
                a: generate_sorted_unique_bounded(SEED_A, 10_000, 100_000),
                b: generate_sorted_unique_bounded(SEED_B, 10_000, 100_000),
            },
            BinaryDataset {
                name: "100K",
                a: generate_sorted_unique_bounded(SEED_A, 100_000, 1_000_000),
                b: generate_sorted_unique_bounded(SEED_B, 100_000, 1_000_000),
            },
            BinaryDataset {
                name: "1M",
                a: generate_sorted_unique_bounded(SEED_A, 1_000_000, 10_000_000),
                b: generate_sorted_unique_bounded(SEED_B, 1_000_000, 10_000_000),
            },
        ],
    }
}
