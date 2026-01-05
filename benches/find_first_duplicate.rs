use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use rand::{rngs::SmallRng, RngCore, SeedableRng};
use sosorted::find_first_duplicate;
use std::ops::Range;

const N: usize = 1024 * 1024;

fn naive_find_first_duplicate(vec: &[u64]) -> usize {
    for i in 1..vec.len() {
        if vec[i] == vec[i - 1] {
            return i;
        }
    }
    vec.len()
}

// Using windows iterator (idiomatic Rust)
fn windows_find_first_duplicate(vec: &[u64]) -> usize {
    vec.windows(2)
        .position(|w| w[0] == w[1])
        .map(|i| i + 1)
        .unwrap_or(vec.len())
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

fn bench_find_first_duplicate(c: &mut Criterion) {
    let mut group = c.benchmark_group("find_first_duplicate");
    group.throughput(Throughput::Bytes((N * 8) as u64));

    // All unique (worst case - must scan entire array)
    let data_unique = unique_data();

    group.bench_function("sosorted/all_unique", |bencher| {
        bencher.iter(|| {
            black_box(find_first_duplicate(black_box(&data_unique)));
        });
    });

    group.bench_function("naive/all_unique", |bencher| {
        bencher.iter(|| {
            black_box(naive_find_first_duplicate(black_box(&data_unique)));
        });
    });

    group.bench_function("windows/all_unique", |bencher| {
        bencher.iter(|| {
            black_box(windows_find_first_duplicate(black_box(&data_unique)));
        });
    });

    // Early duplicate (best case - duplicate at position 10)
    let mut data_early = unique_data();
    data_early[10] = data_early[9];

    group.bench_function("sosorted/early_duplicate", |bencher| {
        bencher.iter(|| {
            black_box(find_first_duplicate(black_box(&data_early)));
        });
    });

    group.bench_function("naive/early_duplicate", |bencher| {
        bencher.iter(|| {
            black_box(naive_find_first_duplicate(black_box(&data_early)));
        });
    });

    group.bench_function("windows/early_duplicate", |bencher| {
        bencher.iter(|| {
            black_box(windows_find_first_duplicate(black_box(&data_early)));
        });
    });

    // Mid duplicate (duplicate at 50% position)
    let mut data_mid = unique_data();
    let mid = data_mid.len() / 2;
    data_mid[mid] = data_mid[mid - 1];

    group.bench_function("sosorted/mid_duplicate", |bencher| {
        bencher.iter(|| {
            black_box(find_first_duplicate(black_box(&data_mid)));
        });
    });

    group.bench_function("naive/mid_duplicate", |bencher| {
        bencher.iter(|| {
            black_box(naive_find_first_duplicate(black_box(&data_mid)));
        });
    });

    group.bench_function("windows/mid_duplicate", |bencher| {
        bencher.iter(|| {
            black_box(windows_find_first_duplicate(black_box(&data_mid)));
        });
    });

    // All duplicates (best case for detection - duplicate at position 1)
    let mut data_all_dupes = unique_data();
    add_duplicates(&mut data_all_dupes, 0.0..1.0);

    group.bench_function("sosorted/all_duplicates", |bencher| {
        bencher.iter(|| {
            black_box(find_first_duplicate(black_box(&data_all_dupes)));
        });
    });

    group.bench_function("naive/all_duplicates", |bencher| {
        bencher.iter(|| {
            black_box(naive_find_first_duplicate(black_box(&data_all_dupes)));
        });
    });

    group.bench_function("windows/all_duplicates", |bencher| {
        bencher.iter(|| {
            black_box(windows_find_first_duplicate(black_box(&data_all_dupes)));
        });
    });

    group.finish();
}

fn bench_find_first_duplicate_scaling(c: &mut Criterion) {
    let mut group = c.benchmark_group("find_first_duplicate_scaling");

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

        group.bench_with_input(BenchmarkId::new("sosorted", size), size, |bencher, _| {
            bencher.iter(|| {
                black_box(find_first_duplicate(black_box(&data)));
            });
        });

        group.bench_with_input(BenchmarkId::new("naive", size), size, |bencher, _| {
            bencher.iter(|| {
                black_box(naive_find_first_duplicate(black_box(&data)));
            });
        });

        group.bench_with_input(BenchmarkId::new("windows", size), size, |bencher, _| {
            bencher.iter(|| {
                black_box(windows_find_first_duplicate(black_box(&data)));
            });
        });
    }

    group.finish();
}

criterion_group!(
    benches,
    bench_find_first_duplicate,
    bench_find_first_duplicate_scaling
);
criterion_main!(benches);
