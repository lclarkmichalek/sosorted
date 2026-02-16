//! Criterion-hypothesis harness for deduplicate benchmarks.
//!
//! This harness exposes deduplicate benchmarks via HTTP for
//! criterion-hypothesis orchestration.

use criterion_hypothesis_harness::{run_harness, BenchmarkRegistry};
use sosorted::deduplicate;
use std::hint::black_box;
use std::time::Instant;

mod common;
use common::rng::{DEFAULT_SIZE, SEED_A, SEED_CLUSTERED, SEED_ZIPF};
use common::{
    generate_clustered, generate_sorted_unique, generate_with_unique_count, generate_zipf,
};

/// Naive deduplicate: simple loop writing unique elements.
fn naive_deduplicate(out: &mut [u64], input: &[u64]) -> usize {
    if input.is_empty() {
        return 0;
    }

    out[0] = input[0];
    let mut write_pos = 1;
    for i in 1..input.len() {
        if input[i] != input[i - 1] {
            out[write_pos] = input[i];
            write_pos += 1;
        }
    }
    write_pos
}

fn main() {
    let port: u16 = std::env::var("CH_PORT")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(9100);

    // Pre-generate datasets
    let all_unique = generate_sorted_unique(SEED_A, DEFAULT_SIZE);
    let half_dups = generate_with_unique_count(SEED_A, DEFAULT_SIZE, DEFAULT_SIZE / 2);
    let zipf = generate_zipf(SEED_ZIPF, DEFAULT_SIZE);
    let clustered = generate_clustered(SEED_CLUSTERED, DEFAULT_SIZE);

    let mut registry = BenchmarkRegistry::new();

    // all_unique
    {
        let data = all_unique.clone();
        registry.register("deduplicate/all_unique/sosorted", move || {
            let mut out = vec![0u64; data.len()];
            let start = Instant::now();
            black_box(deduplicate(black_box(&mut out), black_box(&data)));
            start.elapsed()
        });
    }
    {
        let data = all_unique.clone();
        registry.register("deduplicate/all_unique/naive", move || {
            let mut out = vec![0u64; data.len()];
            let start = Instant::now();
            black_box(naive_deduplicate(black_box(&mut out), black_box(&data)));
            start.elapsed()
        });
    }

    // 50pct_dups
    {
        let data = half_dups.clone();
        registry.register("deduplicate/50pct_dups/sosorted", move || {
            let mut out = vec![0u64; data.len()];
            let start = Instant::now();
            black_box(deduplicate(black_box(&mut out), black_box(&data)));
            start.elapsed()
        });
    }
    {
        let data = half_dups.clone();
        registry.register("deduplicate/50pct_dups/naive", move || {
            let mut out = vec![0u64; data.len()];
            let start = Instant::now();
            black_box(naive_deduplicate(black_box(&mut out), black_box(&data)));
            start.elapsed()
        });
    }

    // zipf
    {
        let data = zipf.clone();
        registry.register("deduplicate/zipf/sosorted", move || {
            let mut out = vec![0u64; data.len()];
            let start = Instant::now();
            black_box(deduplicate(black_box(&mut out), black_box(&data)));
            start.elapsed()
        });
    }
    {
        let data = zipf.clone();
        registry.register("deduplicate/zipf/naive", move || {
            let mut out = vec![0u64; data.len()];
            let start = Instant::now();
            black_box(naive_deduplicate(black_box(&mut out), black_box(&data)));
            start.elapsed()
        });
    }

    // clustered
    {
        let data = clustered.clone();
        registry.register("deduplicate/clustered/sosorted", move || {
            let mut out = vec![0u64; data.len()];
            let start = Instant::now();
            black_box(deduplicate(black_box(&mut out), black_box(&data)));
            start.elapsed()
        });
    }
    {
        let data = clustered.clone();
        registry.register("deduplicate/clustered/naive", move || {
            let mut out = vec![0u64; data.len()];
            let start = Instant::now();
            black_box(naive_deduplicate(black_box(&mut out), black_box(&data)));
            start.elapsed()
        });
    }

    run_harness(registry, port).expect("Failed to run harness");
}
