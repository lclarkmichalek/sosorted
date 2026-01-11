use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use sosorted::intersect;
use std::cmp::Ordering;
use std::collections::HashSet;

mod common;
use common::{standard_binary_datasets, BinaryDatasetGroup, DEFAULT_SIZE};

// =============================================================================
// Baseline implementations
// =============================================================================

/// Naive intersect: two-pointer merge algorithm.
fn naive_intersect(dest: &mut [u64], a: &[u64], b: &[u64]) -> usize {
    let mut i = 0;
    let mut j = 0;
    let mut count = 0;

    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => i += 1,
            Ordering::Greater => j += 1,
            Ordering::Equal => {
                dest[count] = a[i];
                i += 1;
                j += 1;
                count += 1;
            }
        }
    }
    count
}

/// HashSet-based intersect.
fn hashset_intersect(set_a: &HashSet<u64>, set_b: &HashSet<u64>) -> Vec<u64> {
    let mut result: Vec<_> = set_a.intersection(set_b).copied().collect();
    result.sort_unstable();
    result
}

// =============================================================================
// Benchmarks
// =============================================================================

/// Benchmark intersect with standard binary datasets.
///
/// Naming pattern: intersect/<dataset_group>/<implementation>/<dataset_name>
fn bench_standard_datasets(c: &mut Criterion) {
    let datasets = standard_binary_datasets(DEFAULT_SIZE);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("intersect/{}", group.name));

        for dataset in &group.datasets {
            let throughput = (dataset.a.len() + dataset.b.len()) * 8;
            g.throughput(Throughput::Bytes(throughput as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| {
                    b.iter(|| {
                        let mut dest = vec![0u64; a.len().min(b_arr.len())];
                        black_box(intersect(&mut dest, black_box(a), black_box(b_arr)))
                    })
                },
            );

            g.bench_with_input(
                BenchmarkId::new("naive", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| {
                    b.iter(|| {
                        let mut dest = vec![0u64; a.len().min(b_arr.len())];
                        black_box(naive_intersect(&mut dest, black_box(a), black_box(b_arr)))
                    })
                },
            );

            let set_a: HashSet<_> = dataset.a.iter().copied().collect();
            let set_b: HashSet<_> = dataset.b.iter().copied().collect();
            g.bench_with_input(
                BenchmarkId::new("hashset", dataset.name),
                &(&set_a, &set_b),
                |b, (sa, sb)| b.iter(|| black_box(hashset_intersect(black_box(sa), black_box(sb)))),
            );
        }
        g.finish();
    }
}

/// Custom datasets specific to intersect (Lemire-style density benchmarks).
fn custom_intersect_datasets(size: usize) -> Vec<BinaryDatasetGroup> {
    use common::rng::{SEED_A, SEED_B};
    use common::{generate_sorted_unique_bounded, generate_with_intersections, BinaryDataset};

    let max_val = size as u64 * 10;
    let base = generate_sorted_unique_bounded(SEED_A, size, max_val);

    // Intersection density tests
    let densities = vec![
        (0, "0pct"),
        (1, "1pct"),
        (10, "10pct"),
        (50, "50pct"),
        (100, "100pct"),
    ];

    let density_datasets: Vec<BinaryDataset> = densities
        .into_iter()
        .map(|(pct, name)| {
            let intersect_count = (size * pct) / 100;
            let other = generate_with_intersections(SEED_B, &base, size, intersect_count, max_val);
            BinaryDataset {
                name,
                a: base.clone(),
                b: other,
            }
        })
        .collect();

    vec![BinaryDatasetGroup {
        name: "density",
        datasets: density_datasets,
    }]
}

/// Benchmark intersect with custom datasets.
fn bench_custom_datasets(c: &mut Criterion) {
    let datasets = custom_intersect_datasets(100_000);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("intersect/{}", group.name));

        for dataset in &group.datasets {
            g.throughput(Throughput::Elements(dataset.a.len() as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| {
                    b.iter(|| {
                        let mut dest = vec![0u64; a.len().min(b_arr.len())];
                        black_box(intersect(&mut dest, black_box(a), black_box(b_arr)))
                    })
                },
            );

            g.bench_with_input(
                BenchmarkId::new("naive", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| {
                    b.iter(|| {
                        let mut dest = vec![0u64; a.len().min(b_arr.len())];
                        black_box(naive_intersect(&mut dest, black_box(a), black_box(b_arr)))
                    })
                },
            );
        }
        g.finish();
    }
}

criterion_group!(benches, bench_standard_datasets, bench_custom_datasets);
criterion_main!(benches);
