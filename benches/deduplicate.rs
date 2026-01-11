use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use sosorted::deduplicate;
use std::collections::HashSet;

mod common;
use common::{standard_unary_datasets, UnaryDatasetGroup, DEFAULT_SIZE};

// =============================================================================
// Baseline implementations
// =============================================================================

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

/// HashSet-based deduplicate (not order-preserving, re-sorts).
fn hashset_deduplicate(data: &[u64]) -> Vec<u64> {
    let set: HashSet<_> = data.iter().copied().collect();
    let mut result: Vec<_> = set.into_iter().collect();
    result.sort_unstable();
    result
}

// =============================================================================
// Benchmarks
// =============================================================================

/// Benchmark deduplicate with standard unary datasets.
///
/// Naming pattern: deduplicate/<dataset_group>/<implementation>/<dataset_name>
fn bench_standard_datasets(c: &mut Criterion) {
    let datasets = standard_unary_datasets(DEFAULT_SIZE);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("deduplicate/{}", group.name));

        for dataset in &group.datasets {
            g.throughput(Throughput::Bytes((dataset.data.len() * 8) as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &dataset.data,
                |b, d| {
                    b.iter(|| {
                        let mut out = vec![0u64; d.len()];
                        black_box(deduplicate(black_box(&mut out), black_box(d)))
                    })
                },
            );

            g.bench_with_input(
                BenchmarkId::new("naive", dataset.name),
                &dataset.data,
                |b, d| {
                    b.iter(|| {
                        let mut out = vec![0u64; d.len()];
                        black_box(naive_deduplicate(black_box(&mut out), black_box(d)))
                    })
                },
            );

            g.bench_with_input(
                BenchmarkId::new("std_dedup", dataset.name),
                &dataset.data,
                |b, d| {
                    b.iter(|| {
                        let mut case = d.clone();
                        case.dedup();
                        black_box(case)
                    })
                },
            );

            g.bench_with_input(
                BenchmarkId::new("hashset", dataset.name),
                &dataset.data,
                |b, d| b.iter(|| black_box(hashset_deduplicate(black_box(d)))),
            );
        }
        g.finish();
    }
}

/// Custom datasets specific to deduplicate with realistic patterns.
fn custom_deduplicate_datasets(size: usize) -> Vec<UnaryDatasetGroup> {
    use common::rng::{SEED_A, SEED_CLUSTERED, SEED_DATABASE_IDS, SEED_SMALL_RUNS, SEED_ZIPF};
    use common::{
        generate_clustered, generate_database_ids, generate_small_runs,
        generate_with_duplicate_density, generate_zipf, UnaryDataset,
    };

    vec![
        UnaryDatasetGroup {
            name: "scattered",
            datasets: vec![
                UnaryDataset {
                    name: "50pct_unique",
                    data: generate_with_duplicate_density(SEED_A, size, 0.5),
                },
                UnaryDataset {
                    name: "10pct_unique",
                    data: generate_with_duplicate_density(SEED_A, size, 0.1),
                },
            ],
        },
        UnaryDatasetGroup {
            name: "distribution",
            datasets: vec![
                UnaryDataset {
                    name: "zipf",
                    data: generate_zipf(SEED_ZIPF, size),
                },
                UnaryDataset {
                    name: "small_runs",
                    data: generate_small_runs(SEED_SMALL_RUNS, size),
                },
                UnaryDataset {
                    name: "clustered",
                    data: generate_clustered(SEED_CLUSTERED, size),
                },
                UnaryDataset {
                    name: "database_ids",
                    data: generate_database_ids(SEED_DATABASE_IDS, size),
                },
            ],
        },
    ]
}

/// Benchmark deduplicate with custom realistic datasets.
fn bench_custom_datasets(c: &mut Criterion) {
    let datasets = custom_deduplicate_datasets(DEFAULT_SIZE);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("deduplicate/{}", group.name));

        for dataset in &group.datasets {
            g.throughput(Throughput::Bytes((dataset.data.len() * 8) as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &dataset.data,
                |b, d| {
                    b.iter(|| {
                        let mut out = vec![0u64; d.len()];
                        black_box(deduplicate(black_box(&mut out), black_box(d)))
                    })
                },
            );

            g.bench_with_input(
                BenchmarkId::new("naive", dataset.name),
                &dataset.data,
                |b, d| {
                    b.iter(|| {
                        let mut out = vec![0u64; d.len()];
                        black_box(naive_deduplicate(black_box(&mut out), black_box(d)))
                    })
                },
            );

            g.bench_with_input(
                BenchmarkId::new("std_dedup", dataset.name),
                &dataset.data,
                |b, d| {
                    b.iter(|| {
                        let mut case = d.clone();
                        case.dedup();
                        black_box(case)
                    })
                },
            );
        }
        g.finish();
    }
}

criterion_group!(benches, bench_standard_datasets, bench_custom_datasets);
criterion_main!(benches);
