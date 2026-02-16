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
    if start == 0 {
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

/// Benchmark to simulate database IDs with scattered duplicates and small runs
fn bench_database_ids(c: &mut Criterion) {
    let mut group = c.benchmark_group("database_ids");
    let size = 1_000_000;
    group.throughput(Throughput::Bytes((size * 8) as u64));

    let seed: [u8; 32] = [
        123, 135, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];
    let mut rng = SmallRng::from_seed(seed);

    // 1. Scattered duplicates (randomly chosen elements duplicated)
    // Simulates "almost unique" data, e.g., a primary key column with a few constraint violations
    let mut data_scattered = Vec::with_capacity(size);
    for _ in 0..size {
        data_scattered.push(rng.next_u64());
    }
    data_scattered.sort();
    // Insert a duplicate near the end to force scanning most of the array
    let last_idx = size - 100;
    data_scattered[last_idx] = data_scattered[last_idx - 1];

    group.bench_function("sosorted/scattered_duplicates", |bencher| {
        bencher.iter(|| {
            black_box(find_first_duplicate(black_box(&data_scattered)));
        });
    });
    group.bench_function("naive/scattered_duplicates", |bencher| {
        bencher.iter(|| {
            black_box(naive_find_first_duplicate(black_box(&data_scattered)));
        });
    });

    // 2. Small runs of duplicates
    // Simulates a foreign key column or categorical data
    let mut data_runs = Vec::with_capacity(size);
    for _ in 0..size / 4 {
        let val = rng.next_u64();
        // Create small runs of 1-4 elements
        let run_len = (rng.next_u64() % 4) + 1;
        for _ in 0..run_len {
            data_runs.push(val);
        }
    }
    data_runs.sort();
    // Ensure we actually search: remove early duplicates if we want to test scanning speed
    // But for "find_first_duplicate", usually we stop at the FIRST one.
    // So this benchmark essentially tests how fast we find a duplicate at index 0 or 1.
    // To make it interesting for scanning, we need a dataset that is unique for a while, then has runs.
    let mut data_runs_delayed = Vec::with_capacity(size);
    for _ in 0..size / 2 {
        data_runs_delayed.push(rng.next_u64());
    }
    // ensure first half is unique (mostly likely is with u64, but let's assume so for perf test)
    data_runs_delayed.sort();
    data_runs_delayed.dedup();
    // Fill the rest with runs
    while data_runs_delayed.len() < size {
        let val = rng.next_u64();
        data_runs_delayed.push(val);
        data_runs_delayed.push(val);
    }
    data_runs_delayed.sort();
    // Force uniqueness in the first half again just in case sorting mixed things up
    // (It's easier to just generate unique, then append runs, then sort, but sorting mixes them.
    //  If we want to test "scanning through unique data until we hit a duplicate run",
    //  we should construct it carefully.)

    // Better construction:
    // Generate N unique numbers.
    // Take the last few and duplicate them.
    // This forces scanning N-k elements.
    let mut data_long_unique = Vec::with_capacity(size);
    for _ in 0..size {
        data_long_unique.push(rng.next_u64());
    }
    data_long_unique.sort();
    data_long_unique.dedup();
    // Make sure we have enough
    while data_long_unique.len() < size {
        data_long_unique.push(rng.next_u64());
    }
    data_long_unique.sort();
    // Create a duplicate at 90%
    let pos = (size as f64 * 0.9) as usize;
    data_long_unique[pos] = data_long_unique[pos - 1];

    group.bench_function("sosorted/long_unique_run", |bencher| {
        bencher.iter(|| {
            black_box(find_first_duplicate(black_box(&data_long_unique)));
        });
    });
    group.bench_function("naive/long_unique_run", |bencher| {
        bencher.iter(|| {
            black_box(naive_find_first_duplicate(black_box(&data_long_unique)));
        });
    });

    group.finish();
}

criterion_group!(
    benches,
    bench_find_first_duplicate,
    bench_find_first_duplicate_scaling,
    bench_database_ids
);
criterion_main!(benches);
