use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use rand::{rngs::SmallRng, RngCore, SeedableRng};
use sosorted::deduplicate;
use std::collections::HashSet;
use std::ops::Range;

const N: usize = 1024 * 1024;

pub fn naive_deduplicate(data: &mut [u64]) -> usize {
    if data.is_empty() {
        return 0;
    }

    let mut dupe_count = 0;
    for i in 1..data.len() {
        if data[i] == data[i - 1] {
            dupe_count += 1;
        } else {
            data[i - dupe_count] = data[i];
        }
    }
    data.len() - dupe_count
}

fn hashset_deduplicate(data: &[u64]) -> Vec<u64> {
    let set: HashSet<_> = data.iter().copied().collect();
    let mut result: Vec<_> = set.into_iter().collect();
    result.sort_unstable();
    result
}

fn unique_data() -> Vec<u64> {
    let seed: [u8; 32] = [
        165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];

    let mut rng = SmallRng::from_seed(seed);

    let mut data = Vec::with_capacity(N);
    for _ in 0..N {
        data.push(rng.next_u64());
    }

    data.sort();
    data
}

fn add_duplicates(data: &mut [u64], range: Range<f32>) {
    let mut start = (range.start * data.len() as f32) as usize;
    let mut end = (range.end * data.len() as f32) as usize;
    if start <= 0 {
        start = 1;
    }
    if end > data.len() {
        end = data.len()
    }
    // Add a long span of duplicates
    for i in start..end {
        data[i - 1] = data[i];
    }
}

fn bench_deduplicate(c: &mut Criterion) {
    let mut group = c.benchmark_group("deduplicate");
    group.throughput(Throughput::Bytes((N * 8) as u64));

    // All unique
    let data = unique_data();

    group.bench_function("sosorted/all_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data.clone();
            black_box(deduplicate(black_box(&mut case)));
        });
    });

    group.bench_function("naive/all_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data.clone();
            black_box(naive_deduplicate(black_box(&mut case)));
        });
    });

    group.bench_function("std_dedup/all_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data.clone();
            black_box(case.dedup());
        });
    });

    group.bench_function("hashset/all_unique", |bencher| {
        bencher.iter(|| {
            black_box(hashset_deduplicate(black_box(&data)));
        });
    });

    // Some duplicates (25% of data is duplicates)
    let mut data_some = unique_data();
    add_duplicates(&mut data_some, 0.5..0.75);

    group.bench_function("sosorted/some_duplicates", |bencher| {
        bencher.iter(|| {
            let mut case = data_some.clone();
            black_box(deduplicate(black_box(&mut case)));
        });
    });

    group.bench_function("naive/some_duplicates", |bencher| {
        bencher.iter(|| {
            let mut case = data_some.clone();
            black_box(naive_deduplicate(black_box(&mut case)));
        });
    });

    group.bench_function("std_dedup/some_duplicates", |bencher| {
        bencher.iter(|| {
            let mut case = data_some.clone();
            black_box(case.dedup());
        });
    });

    group.bench_function("hashset/some_duplicates", |bencher| {
        bencher.iter(|| {
            black_box(hashset_deduplicate(black_box(&data_some)));
        });
    });

    // All duplicates
    let mut data_none = unique_data();
    add_duplicates(&mut data_none, 0.0..1.0);

    group.bench_function("sosorted/no_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data_none.clone();
            black_box(deduplicate(black_box(&mut case)));
        });
    });

    group.bench_function("naive/no_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data_none.clone();
            black_box(naive_deduplicate(black_box(&mut case)));
        });
    });

    group.bench_function("std_dedup/no_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data_none.clone();
            black_box(case.dedup());
        });
    });

    group.bench_function("hashset/no_unique", |bencher| {
        bencher.iter(|| {
            black_box(hashset_deduplicate(black_box(&data_none)));
        });
    });

    group.finish();
}

fn bench_deduplicate_scaling(c: &mut Criterion) {
    let mut group = c.benchmark_group("deduplicate_scaling");

    let sizes = [1024, 8192, 262144, 1048576];

    for size in sizes.iter() {
        group.throughput(Throughput::Bytes((*size * 8) as u64));

        let seed: [u8; 32] = [
            165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200,
            178, 22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
        ];
        let mut rng = SmallRng::from_seed(seed);

        let mut data = Vec::with_capacity(*size);
        for _ in 0..*size {
            data.push(rng.next_u64());
        }
        data.sort();
        add_duplicates(&mut data, 0.5..0.75);

        group.bench_with_input(BenchmarkId::new("sosorted", size), size, |bencher, _| {
            bencher.iter(|| {
                let mut case = data.clone();
                black_box(deduplicate(black_box(&mut case)));
            });
        });

        group.bench_with_input(BenchmarkId::new("std_dedup", size), size, |bencher, _| {
            bencher.iter(|| {
                let mut case = data.clone();
                black_box(case.dedup());
            });
        });

        group.bench_with_input(BenchmarkId::new("hashset", size), size, |bencher, _| {
            bencher.iter(|| {
                black_box(hashset_deduplicate(black_box(&data)));
            });
        });
    }

    group.finish();
}

criterion_group!(benches, bench_deduplicate, bench_deduplicate_scaling);
criterion_main!(benches);
