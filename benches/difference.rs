//! Criterion-hypothesis harness for difference benchmarks.
//!
//! This harness exposes difference benchmarks via HTTP for
//! criterion-hypothesis orchestration.

use criterion_hypothesis_harness::{run_harness, BenchmarkRegistry};
use sosorted::{difference, difference_size};
use std::hint::black_box;
use std::time::Instant;

mod common;
use common::rng::{DEFAULT_SIZE, SEED_A, SEED_B};
use common::{
    add_spread_intersections, generate_disjoint, generate_sorted_unique,
    generate_sorted_unique_bounded,
};

/// Naive difference: two-pointer algorithm.
fn naive_difference(a: &[u64], b: &[u64]) -> Vec<u64> {
    let mut result = Vec::with_capacity(a.len());
    let mut i = 0;
    let mut j = 0;

    while i < a.len() && j < b.len() {
        if a[i] < b[j] {
            result.push(a[i]);
            i += 1;
        } else if a[i] > b[j] {
            j += 1;
        } else {
            i += 1;
            j += 1;
        }
    }

    result.extend_from_slice(&a[i..]);
    result
}

fn main() {
    let port: u16 = std::env::var("CH_PORT")
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(9100);

    let size = DEFAULT_SIZE;
    let base = generate_sorted_unique(SEED_A, size);

    // 0% overlap - completely disjoint
    let disjoint = generate_disjoint(&base, 0.5);

    // 50% overlap
    let mut overlap_50pct = generate_disjoint(&base, 0.5);
    add_spread_intersections(&mut overlap_50pct, &base, size / 2);

    // 100% overlap - identical
    let identical = base.clone();

    // Asymmetric 10:1
    let max_val = size as u64 * 10;
    let asym_a = generate_sorted_unique_bounded(SEED_A, size, max_val);
    let asym_b = generate_sorted_unique_bounded(SEED_B, size / 10, max_val);

    let mut registry = BenchmarkRegistry::new();

    // 0pct overlap
    {
        let a = base.clone();
        let b = disjoint.clone();
        registry.register("difference/0pct_overlap/sosorted", move || {
            let mut dest = vec![0u64; a.len()];
            let start = Instant::now();
            black_box(difference(
                black_box(&mut dest),
                black_box(&a),
                black_box(&b),
            ));
            start.elapsed()
        });
    }
    {
        let a = base.clone();
        let b = disjoint.clone();
        registry.register("difference/0pct_overlap/naive", move || {
            let start = Instant::now();
            black_box(naive_difference(black_box(&a), black_box(&b)));
            start.elapsed()
        });
    }

    // 50pct overlap
    {
        let a = base.clone();
        let b = overlap_50pct.clone();
        registry.register("difference/50pct_overlap/sosorted", move || {
            let mut dest = vec![0u64; a.len()];
            let start = Instant::now();
            black_box(difference(
                black_box(&mut dest),
                black_box(&a),
                black_box(&b),
            ));
            start.elapsed()
        });
    }
    {
        let a = base.clone();
        let b = overlap_50pct.clone();
        registry.register("difference/50pct_overlap/naive", move || {
            let start = Instant::now();
            black_box(naive_difference(black_box(&a), black_box(&b)));
            start.elapsed()
        });
    }

    // 100pct overlap
    {
        let a = base.clone();
        let b = identical.clone();
        registry.register("difference/100pct_overlap/sosorted", move || {
            let mut dest = vec![0u64; a.len()];
            let start = Instant::now();
            black_box(difference(
                black_box(&mut dest),
                black_box(&a),
                black_box(&b),
            ));
            start.elapsed()
        });
    }
    {
        let a = base.clone();
        let b = identical.clone();
        registry.register("difference/100pct_overlap/naive", move || {
            let start = Instant::now();
            black_box(naive_difference(black_box(&a), black_box(&b)));
            start.elapsed()
        });
    }

    // asymmetric 10:1
    {
        let a = asym_a.clone();
        let b = asym_b.clone();
        registry.register("difference/asymmetric_10_1/sosorted", move || {
            let mut dest = vec![0u64; a.len()];
            let start = Instant::now();
            black_box(difference(
                black_box(&mut dest),
                black_box(&a),
                black_box(&b),
            ));
            start.elapsed()
        });
    }
    {
        let a = asym_a.clone();
        let b = asym_b.clone();
        registry.register("difference/asymmetric_10_1/naive", move || {
            let start = Instant::now();
            black_box(naive_difference(black_box(&a), black_box(&b)));
            start.elapsed()
        });
    }

    // difference_size entries
    {
        let a = base.clone();
        let b = disjoint.clone();
        registry.register("difference_size/0pct_overlap/sosorted", move || {
            let start = Instant::now();
            black_box(difference_size(black_box(&a), black_box(&b)));
            start.elapsed()
        });
    }
    {
        let a = base.clone();
        let b = overlap_50pct.clone();
        registry.register("difference_size/50pct_overlap/sosorted", move || {
            let start = Instant::now();
            black_box(difference_size(black_box(&a), black_box(&b)));
            start.elapsed()
        });
    }
    {
        let a = base.clone();
        let b = identical.clone();
        registry.register("difference_size/100pct_overlap/sosorted", move || {
            let start = Instant::now();
            black_box(difference_size(black_box(&a), black_box(&b)));
            start.elapsed()
        });
    }
    {
        let a = asym_a.clone();
        let b = asym_b.clone();
        registry.register("difference_size/asymmetric_10_1/sosorted", move || {
            let start = Instant::now();
            black_box(difference_size(black_box(&a), black_box(&b)));
            start.elapsed()
        });
    }

    run_harness(registry, port).expect("Failed to run harness");
}
