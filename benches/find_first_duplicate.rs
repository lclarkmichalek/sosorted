use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use sosorted::find_first_duplicate;

mod common;
use common::{
    naive_find_first_duplicate, standard_unary_datasets, windows_find_first_duplicate,
    UnaryDatasetGroup, DEFAULT_SIZE,
};

/// Benchmark find_first_duplicate with standard unary datasets.
///
/// Naming pattern: find_first_duplicate/<dataset_group>/<implementation>/<dataset_name>
fn bench_standard_datasets(c: &mut Criterion) {
    let datasets = standard_unary_datasets(DEFAULT_SIZE);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("find_first_duplicate/{}", group.name));

        for dataset in &group.datasets {
            g.throughput(Throughput::Bytes((dataset.data.len() * 8) as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &dataset.data,
                |b, d| b.iter(|| black_box(find_first_duplicate(black_box(d)))),
            );

            g.bench_with_input(
                BenchmarkId::new("naive", dataset.name),
                &dataset.data,
                |b, d| b.iter(|| black_box(naive_find_first_duplicate(black_box(d)))),
            );

            g.bench_with_input(
                BenchmarkId::new("windows", dataset.name),
                &dataset.data,
                |b, d| b.iter(|| black_box(windows_find_first_duplicate(black_box(d)))),
            );
        }
        g.finish();
    }
}

/// Custom datasets specific to find_first_duplicate.
fn custom_find_first_duplicate_datasets(size: usize) -> Vec<UnaryDatasetGroup> {
    use common::rng::SEED_DATABASE_IDS;
    use common::{generate_sorted_unique, UnaryDataset};
    use rand::{rngs::SmallRng, RngCore, SeedableRng};

    let mut rng = SmallRng::from_seed(SEED_DATABASE_IDS);

    // Scattered duplicates near the end (forces scanning most of the array)
    let mut scattered = generate_sorted_unique(SEED_DATABASE_IDS, size);
    let last_idx = size - 100;
    scattered[last_idx] = scattered[last_idx - 1];

    // Long unique run followed by duplicate at 90%
    let mut long_unique = Vec::with_capacity(size);
    for _ in 0..size {
        long_unique.push(rng.next_u64());
    }
    long_unique.sort();
    long_unique.dedup();
    while long_unique.len() < size {
        long_unique.push(rng.next_u64());
    }
    long_unique.sort();
    let pos = (size as f64 * 0.9) as usize;
    long_unique[pos] = long_unique[pos - 1];

    vec![UnaryDatasetGroup {
        name: "database_ids",
        datasets: vec![
            UnaryDataset {
                name: "scattered",
                data: scattered,
            },
            UnaryDataset {
                name: "long_unique_run",
                data: long_unique,
            },
        ],
    }]
}

/// Benchmark find_first_duplicate with custom datasets.
fn bench_custom_datasets(c: &mut Criterion) {
    let datasets = custom_find_first_duplicate_datasets(DEFAULT_SIZE);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("find_first_duplicate/{}", group.name));

        for dataset in &group.datasets {
            g.throughput(Throughput::Bytes((dataset.data.len() * 8) as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &dataset.data,
                |b, d| b.iter(|| black_box(find_first_duplicate(black_box(d)))),
            );

            g.bench_with_input(
                BenchmarkId::new("naive", dataset.name),
                &dataset.data,
                |b, d| b.iter(|| black_box(naive_find_first_duplicate(black_box(d)))),
            );
        }
        g.finish();
    }
}

criterion_group!(benches, bench_standard_datasets, bench_custom_datasets);
criterion_main!(benches);
