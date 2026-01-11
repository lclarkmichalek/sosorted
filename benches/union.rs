use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use sosorted::{union, union_size};
use std::collections::HashSet;

mod common;
use common::{hashset_union, naive_union, standard_binary_datasets, DEFAULT_SIZE};

/// Benchmark union with standard binary datasets.
///
/// Naming pattern: union/<dataset_group>/<implementation>/<dataset_name>
fn bench_standard_datasets(c: &mut Criterion) {
    let datasets = standard_binary_datasets(DEFAULT_SIZE);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("union/{}", group.name));

        for dataset in &group.datasets {
            let throughput = (dataset.a.len() + dataset.b.len()) * 8;
            g.throughput(Throughput::Bytes(throughput as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| {
                    b.iter(|| {
                        let mut dest = vec![0u64; a.len() + b_arr.len()];
                        black_box(union(&mut dest, black_box(a), black_box(b_arr)))
                    })
                },
            );

            g.bench_with_input(
                BenchmarkId::new("naive", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| b.iter(|| black_box(naive_union(black_box(a), black_box(b_arr)))),
            );

            let set_a: HashSet<_> = dataset.a.iter().copied().collect();
            let set_b: HashSet<_> = dataset.b.iter().copied().collect();
            g.bench_with_input(
                BenchmarkId::new("hashset", dataset.name),
                &(&set_a, &set_b),
                |b, (sa, sb)| b.iter(|| black_box(hashset_union(black_box(sa), black_box(sb)))),
            );
        }
        g.finish();
    }
}

/// Benchmark union_size with standard binary datasets.
///
/// Naming pattern: union_size/<dataset_group>/<implementation>/<dataset_name>
fn bench_union_size(c: &mut Criterion) {
    let datasets = standard_binary_datasets(DEFAULT_SIZE);

    for group in &datasets {
        let mut g = c.benchmark_group(format!("union_size/{}", group.name));

        for dataset in &group.datasets {
            let throughput = (dataset.a.len() + dataset.b.len()) * 8;
            g.throughput(Throughput::Bytes(throughput as u64));

            g.bench_with_input(
                BenchmarkId::new("sosorted", dataset.name),
                &(&dataset.a, &dataset.b),
                |b, (a, b_arr)| b.iter(|| black_box(union_size(black_box(a), black_box(b_arr)))),
            );
        }
        g.finish();
    }
}

criterion_group!(benches, bench_standard_datasets, bench_union_size);
criterion_main!(benches);
