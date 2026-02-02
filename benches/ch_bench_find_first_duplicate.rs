//! Criterion-hypothesis harness for find_first_duplicate benchmarks.
//!
//! This harness exposes find_first_duplicate benchmarks via HTTP for
//! criterion-hypothesis orchestration.

use criterion_hypothesis_harness::{run_harness, BenchmarkRegistry};
use sosorted::find_first_duplicate;
use std::hint::black_box;
use std::time::{Duration, Instant};

mod common;
use common::{generate_sorted_unique, generate_with_unique_count};
use common::rng::{SEED_A, DEFAULT_SIZE};

/// Naive find_first_duplicate: simple loop comparing adjacent elements.
fn naive_find_first_duplicate(vec: &[u64]) -> usize {
    for i in 1..vec.len() {
        if vec[i] == vec[i - 1] {
            return i;
        }
    }
    vec.len()
}

fn main() {
    let port: u16 = std::env::var("CH_PORT")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(9100);

    // Pre-generate datasets (do this once, not per iteration)
    let all_unique = generate_sorted_unique(SEED_A, DEFAULT_SIZE);
    let half_duplicates = generate_with_unique_count(SEED_A, DEFAULT_SIZE, DEFAULT_SIZE / 2);

    // Create dataset with early duplicate
    let mut early_dup = generate_sorted_unique(SEED_A, DEFAULT_SIZE);
    early_dup[10] = early_dup[9];

    // Create dataset with late duplicate
    let mut late_dup = generate_sorted_unique(SEED_A, DEFAULT_SIZE);
    let pos = (DEFAULT_SIZE as f64 * 0.9) as usize;
    late_dup[pos] = late_dup[pos - 1];

    let mut registry = BenchmarkRegistry::new();

    // Register sosorted implementations
    {
        let data = all_unique.clone();
        registry.register("find_first_duplicate/all_unique/sosorted", move || {
            let start = Instant::now();
            black_box(find_first_duplicate(black_box(&data)));
            start.elapsed()
        });
    }
    {
        let data = all_unique.clone();
        registry.register("find_first_duplicate/all_unique/naive", move || {
            let start = Instant::now();
            black_box(naive_find_first_duplicate(black_box(&data)));
            start.elapsed()
        });
    }

    {
        let data = early_dup.clone();
        registry.register("find_first_duplicate/early_dup/sosorted", move || {
            let start = Instant::now();
            black_box(find_first_duplicate(black_box(&data)));
            start.elapsed()
        });
    }
    {
        let data = early_dup.clone();
        registry.register("find_first_duplicate/early_dup/naive", move || {
            let start = Instant::now();
            black_box(naive_find_first_duplicate(black_box(&data)));
            start.elapsed()
        });
    }

    {
        let data = late_dup.clone();
        registry.register("find_first_duplicate/late_dup/sosorted", move || {
            let start = Instant::now();
            black_box(find_first_duplicate(black_box(&data)));
            start.elapsed()
        });
    }
    {
        let data = late_dup.clone();
        registry.register("find_first_duplicate/late_dup/naive", move || {
            let start = Instant::now();
            black_box(naive_find_first_duplicate(black_box(&data)));
            start.elapsed()
        });
    }

    {
        let data = half_duplicates.clone();
        registry.register("find_first_duplicate/50pct_dups/sosorted", move || {
            let start = Instant::now();
            black_box(find_first_duplicate(black_box(&data)));
            start.elapsed()
        });
    }
    {
        let data = half_duplicates.clone();
        registry.register("find_first_duplicate/50pct_dups/naive", move || {
            let start = Instant::now();
            black_box(naive_find_first_duplicate(black_box(&data)));
            start.elapsed()
        });
    }

    run_harness(registry, port).expect("Failed to run harness");
}
