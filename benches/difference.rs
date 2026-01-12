use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use sosorted::{difference, difference_size};
use std::cmp::Ordering;
use std::collections::HashSet;

mod common;
use common::{standard_binary_datasets, DEFAULT_SIZE};

// =============================================================================
// Baseline implementations
// =============================================================================

/// Naive difference: two-pointer algorithm.
fn naive_difference(a: &[u64], b: &[u64]) -> Vec<u64> {
    let mut result = Vec::with_capacity(a.len());
    let mut i = 0;
    let mut j = 0;

    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => {
                result.push(a[i]);
                i += 1;
            }
            Ordering::Greater => {
                j += 1;
            }
            Ordering::Equal => {
                i += 1;
                j += 1;
            }
        }
    }

    result.extend_from_slice(&a[i..]);
    result
}

/// HashSet-based difference.
fn hashset_difference(a: &[u64], set_b: &HashSet<u64>) -> Vec<u64> {
    let mut result: Vec<_> = a.iter().copied().filter(|x| !set_b.contains(x)).collect();
    result.sort_unstable();
    result
}

// =============================================================================
// Benchmarks
// =============================================================================

/// Benchmark difference with standard binary datasets.
///
/// Naming pattern: difference/<dataset_group>/<implementation>/<dataset_name>
fn bench_standard_datasets(c: &mut Criterion) {
    let datasets = standard_binary_datasets(DEFAULT_SIZE);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("difference/{}", group.name));

        for dataset in &group.datasets {
            let throughput = (dataset.a.len() + dataset.b.len()) * 8;
            g.throughput(Throughput::Bytes(throughput as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| {
                    b.iter(|| {
                        let mut dest = vec![0u64; a.len()];
                        black_box(difference(&mut dest, black_box(a), black_box(b_arr)))
                    })
                },
            );

            g.bench_with_input(
                BenchmarkId::new("naive", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| {
                    b.iter(|| black_box(naive_difference(black_box(a), black_box(b_arr))))
                },
            );

            let set_b: HashSet<_> = dataset.b.iter().copied().collect();
            g.bench_with_input(
                BenchmarkId::new("hashset", dataset.name),
                &(&dataset.a, &set_b),
                |b, (a, sb)| b.iter(|| black_box(hashset_difference(black_box(a), black_box(sb)))),
            );
        }
        g.finish();
    }
}

/// Benchmark difference_size with standard binary datasets.
///
/// Naming pattern: difference_size/<dataset_group>/<implementation>/<dataset_name>
fn bench_difference_size(c: &mut Criterion) {
    let datasets = standard_binary_datasets(DEFAULT_SIZE);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("difference_size/{}", group.name));

        for dataset in &group.datasets {
            let throughput = (dataset.a.len() + dataset.b.len()) * 8;
            g.throughput(Throughput::Bytes(throughput as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| {
                    b.iter(|| black_box(difference_size(black_box(a), black_box(b_arr))))
                },
            );
        }
        g.finish();
    }
}

criterion_group!(benches, bench_standard_datasets, bench_difference_size);
criterion_main!(benches);
