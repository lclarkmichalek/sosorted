//! Criterion-hypothesis harness for roaring bitmap benchmarks.
//!
//! This harness exposes roaring bitmap benchmarks via HTTP for
//! criterion-hypothesis orchestration.

use criterion_hypothesis_harness::{run_harness, BenchmarkRegistry};
use rand::rngs::SmallRng;
use rand::{Rng, SeedableRng};
use sosorted::Bitmap;
use std::collections::HashSet;
use std::hint::black_box;
use std::time::Instant;

// =============================================================================
// Dataset Generation (copied from roaring.rs)
// =============================================================================

fn generate_sparse(count: usize, seed: u64) -> Vec<u32> {
    let mut rng = SmallRng::seed_from_u64(seed);
    let mut values: Vec<u32> = (0..count).map(|_| rng.random_range(0..1_000_000)).collect();
    values.sort_unstable();
    values.dedup();
    values
}

fn generate_dense(count: usize) -> Vec<u32> {
    (0..count as u32).collect()
}

fn generate_mixed(count: usize, seed: u64) -> Vec<u32> {
    let mut rng = SmallRng::seed_from_u64(seed);
    let mut values = Vec::new();

    for base in [0, 10000, 100000, 1000000] {
        let region_size = count / 8;
        values.extend(base..base + region_size as u32);
    }

    for _ in 0..count / 2 {
        values.push(rng.random_range(0..10_000_000));
    }

    values.sort_unstable();
    values.dedup();
    values.truncate(count);
    values
}

fn main() {
    let port: u16 = std::env::var("CH_PORT")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(9100);

    // Pre-generate datasets
    let sparse_10k = generate_sparse(10000, 42);
    let dense_10k = generate_dense(10000);
    let mixed_10k = generate_mixed(10000, 42);

    let sparse_10k_b = generate_sparse(10000, 43);
    let dense_15k = generate_dense(15000);
    let mixed_10k_b = generate_mixed(10000, 43);

    let mut registry = BenchmarkRegistry::new();

    // =========================================================================
    // Construction benchmarks
    // =========================================================================
    {
        let data = sparse_10k.clone();
        registry.register("roaring/construction/sparse_10k/bitmap", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                black_box(Bitmap::from_sorted_slice(black_box(&data)));
            }
            start.elapsed()
        });
    }
    {
        let data = sparse_10k.clone();
        registry.register("roaring/construction/sparse_10k/hashset", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                let set: HashSet<u32> = black_box(data.iter().copied().collect());
                black_box(set);
            }
            start.elapsed()
        });
    }

    {
        let data = dense_10k.clone();
        registry.register("roaring/construction/dense_10k/bitmap", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                black_box(Bitmap::from_sorted_slice(black_box(&data)));
            }
            start.elapsed()
        });
    }
    {
        let data = dense_10k.clone();
        registry.register("roaring/construction/dense_10k/hashset", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                let set: HashSet<u32> = black_box(data.iter().copied().collect());
                black_box(set);
            }
            start.elapsed()
        });
    }

    {
        let data = mixed_10k.clone();
        registry.register("roaring/construction/mixed_10k/bitmap", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                black_box(Bitmap::from_sorted_slice(black_box(&data)));
            }
            start.elapsed()
        });
    }
    {
        let data = mixed_10k.clone();
        registry.register("roaring/construction/mixed_10k/hashset", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                let set: HashSet<u32> = black_box(data.iter().copied().collect());
                black_box(set);
            }
            start.elapsed()
        });
    }

    // =========================================================================
    // Contains benchmarks
    // =========================================================================
    {
        let bitmap = Bitmap::from_sorted_slice(&sparse_10k);
        let test_values: Vec<u32> = (0..100)
            .map(|i| {
                if i % 2 == 0 {
                    sparse_10k[i * sparse_10k.len() / 200]
                } else {
                    sparse_10k[i * sparse_10k.len() / 200] + 1
                }
            })
            .collect();
        registry.register("roaring/contains/sparse_10k/bitmap", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                for &value in &test_values {
                    black_box(bitmap.contains(black_box(value)));
                }
            }
            start.elapsed()
        });
    }
    {
        let hashset: HashSet<u32> = sparse_10k.iter().copied().collect();
        let test_values: Vec<u32> = (0..100)
            .map(|i| {
                if i % 2 == 0 {
                    sparse_10k[i * sparse_10k.len() / 200]
                } else {
                    sparse_10k[i * sparse_10k.len() / 200] + 1
                }
            })
            .collect();
        registry.register("roaring/contains/sparse_10k/hashset", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                for &value in &test_values {
                    black_box(hashset.contains(black_box(&value)));
                }
            }
            start.elapsed()
        });
    }

    {
        let bitmap = Bitmap::from_sorted_slice(&dense_10k);
        let test_values: Vec<u32> = (0..100)
            .map(|i| {
                if i % 2 == 0 {
                    dense_10k[i * dense_10k.len() / 200]
                } else {
                    dense_10k[i * dense_10k.len() / 200] + 1
                }
            })
            .collect();
        registry.register("roaring/contains/dense_10k/bitmap", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                for &value in &test_values {
                    black_box(bitmap.contains(black_box(value)));
                }
            }
            start.elapsed()
        });
    }
    {
        let hashset: HashSet<u32> = dense_10k.iter().copied().collect();
        let test_values: Vec<u32> = (0..100)
            .map(|i| {
                if i % 2 == 0 {
                    dense_10k[i * dense_10k.len() / 200]
                } else {
                    dense_10k[i * dense_10k.len() / 200] + 1
                }
            })
            .collect();
        registry.register("roaring/contains/dense_10k/hashset", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                for &value in &test_values {
                    black_box(hashset.contains(black_box(&value)));
                }
            }
            start.elapsed()
        });
    }

    // =========================================================================
    // Union benchmarks
    // =========================================================================
    {
        let bitmap1 = Bitmap::from_sorted_slice(&sparse_10k);
        let bitmap2 = Bitmap::from_sorted_slice(&sparse_10k_b);
        registry.register("roaring/union/sparse_10k/bitmap", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                black_box(black_box(&bitmap1).union(black_box(&bitmap2)));
            }
            start.elapsed()
        });
    }
    {
        let set1: HashSet<u32> = sparse_10k.iter().copied().collect();
        let set2: HashSet<u32> = sparse_10k_b.iter().copied().collect();
        registry.register("roaring/union/sparse_10k/hashset", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                let result: HashSet<u32> = black_box(&set1).union(black_box(&set2)).copied().collect();
                black_box(result);
            }
            start.elapsed()
        });
    }

    {
        let bitmap1 = Bitmap::from_sorted_slice(&dense_10k);
        let bitmap2 = Bitmap::from_sorted_slice(&dense_15k);
        registry.register("roaring/union/dense_10k/bitmap", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                black_box(black_box(&bitmap1).union(black_box(&bitmap2)));
            }
            start.elapsed()
        });
    }
    {
        let set1: HashSet<u32> = dense_10k.iter().copied().collect();
        let set2: HashSet<u32> = dense_15k.iter().copied().collect();
        registry.register("roaring/union/dense_10k/hashset", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                let result: HashSet<u32> = black_box(&set1).union(black_box(&set2)).copied().collect();
                black_box(result);
            }
            start.elapsed()
        });
    }

    // =========================================================================
    // Intersection benchmarks
    // =========================================================================
    {
        let bitmap1 = Bitmap::from_sorted_slice(&sparse_10k);
        let bitmap2 = Bitmap::from_sorted_slice(&sparse_10k_b);
        registry.register("roaring/intersection/sparse_10k/bitmap", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                black_box(black_box(&bitmap1).intersection(black_box(&bitmap2)));
            }
            start.elapsed()
        });
    }
    {
        let set1: HashSet<u32> = sparse_10k.iter().copied().collect();
        let set2: HashSet<u32> = sparse_10k_b.iter().copied().collect();
        registry.register("roaring/intersection/sparse_10k/hashset", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                let result: HashSet<u32> = black_box(&set1)
                    .intersection(black_box(&set2))
                    .copied()
                    .collect();
                black_box(result);
            }
            start.elapsed()
        });
    }

    {
        let bitmap1 = Bitmap::from_sorted_slice(&dense_10k);
        let bitmap2 = Bitmap::from_sorted_slice(&dense_15k);
        registry.register("roaring/intersection/dense_10k/bitmap", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                black_box(black_box(&bitmap1).intersection(black_box(&bitmap2)));
            }
            start.elapsed()
        });
    }
    {
        let set1: HashSet<u32> = dense_10k.iter().copied().collect();
        let set2: HashSet<u32> = dense_15k.iter().copied().collect();
        registry.register("roaring/intersection/dense_10k/hashset", move |n| {
            let start = Instant::now();
            for _ in 0..n {
                let result: HashSet<u32> = black_box(&set1)
                    .intersection(black_box(&set2))
                    .copied()
                    .collect();
                black_box(result);
            }
            start.elapsed()
        });
    }

    run_harness(registry, port).expect("Failed to run harness");
}
