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

/// Generate a sorted array with specified number of unique values and total size
/// Duplicates are spread evenly throughout the array
fn generate_with_duplicates_spread(seed: [u8; 32], size: usize, unique_count: usize) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);

    // Generate unique values
    let mut unique_vals: Vec<u64> = (0..unique_count * 2).map(|_| rng.next_u64()).collect();
    unique_vals.sort();
    unique_vals.dedup();
    unique_vals.truncate(unique_count);

    // Spread duplicates evenly
    let mut result = Vec::with_capacity(size);
    let repeat_count = size / unique_count.max(1);
    for val in unique_vals.iter() {
        for _ in 0..repeat_count {
            result.push(*val);
        }
    }
    // Fill remainder
    while result.len() < size {
        result.push(*unique_vals.last().unwrap_or(&0));
    }
    result.truncate(size);
    result.sort();
    result
}

/// Generate a sorted array with duplicate runs of specified average length
fn generate_with_run_length(seed: [u8; 32], size: usize, avg_run_length: usize) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);

    let unique_count = size / avg_run_length.max(1);
    let mut unique_vals: Vec<u64> = (0..unique_count * 2).map(|_| rng.next_u64()).collect();
    unique_vals.sort();
    unique_vals.dedup();
    unique_vals.truncate(unique_count.max(1));

    let mut result = Vec::with_capacity(size);
    let mut idx = 0;
    while result.len() < size {
        let val = unique_vals[idx % unique_vals.len()];
        // Vary run length around the average
        let run_len = (avg_run_length as i64 + (rng.next_u64() % 3) as i64 - 1).max(1) as usize;
        for _ in 0..run_len {
            if result.len() < size {
                result.push(val);
            }
        }
        idx += 1;
    }
    result.sort();
    result
}

/// Lemire-style benchmarks testing duplicate density
/// Based on the intersection density benchmarks in intersect.rs
fn bench_lemire_duplicate_density(c: &mut Criterion) {
    let mut group = c.benchmark_group("lemire_duplicate_density");

    let size = 100_000;
    let seed: [u8; 32] = [
        165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];

    // Test cases: (unique_percentage, name)
    // Lower unique % means more duplicates
    let densities = [
        (100, "0%_dupes"), // 100% unique = 0% duplicates
        (99, "1%_dupes"),  // 99% unique = 1% duplicates
        (90, "10%_dupes"), // 90% unique = 10% duplicates
        (50, "50%_dupes"), // 50% unique = 50% duplicates
        (10, "90%_dupes"), // 10% unique = 90% duplicates
        (1, "99%_dupes"),  // 1% unique = 99% duplicates
    ];

    for (unique_pct, name) in densities.iter() {
        let unique_count = (size * unique_pct) / 100;
        let data = generate_with_duplicates_spread(seed, size, unique_count.max(1));

        group.throughput(Throughput::Elements(size as u64));

        group.bench_with_input(
            BenchmarkId::new("sosorted", name),
            &data,
            |bencher, data| {
                bencher.iter(|| {
                    let mut case = data.clone();
                    black_box(deduplicate(black_box(&mut case)))
                });
            },
        );

        group.bench_with_input(BenchmarkId::new("naive", name), &data, |bencher, data| {
            bencher.iter(|| {
                let mut case = data.clone();
                black_box(naive_deduplicate(black_box(&mut case)))
            });
        });

        group.bench_with_input(
            BenchmarkId::new("std_dedup", name),
            &data,
            |bencher, data| {
                bencher.iter(|| {
                    let mut case = data.clone();
                    case.dedup();
                    black_box(case)
                });
            },
        );
    }

    group.finish();
}

/// Benchmark with varying duplicate run lengths
/// Tests how algorithms handle short scattered runs vs long contiguous runs
fn bench_lemire_run_length(c: &mut Criterion) {
    let mut group = c.benchmark_group("lemire_run_length");

    let size = 100_000;
    let seed: [u8; 32] = [
        42, 135, 233, 92, 112, 23, 105, 79, 81, 127, 217, 1, 97, 10, 71, 36, 110, 148, 100, 78,
        122, 6, 9, 127, 13, 79, 43, 164, 178, 35, 41, 142,
    ];

    // Test cases: (average_run_length, name)
    let run_lengths = [
        (1, "no_runs"),      // All unique
        (2, "pairs"),        // Average run of 2
        (4, "short_runs"),   // Average run of 4
        (16, "medium_runs"), // Average run of 16
        (64, "long_runs"),   // Average run of 64
        (256, "very_long"),  // Average run of 256
    ];

    for (run_len, name) in run_lengths.iter() {
        let data = generate_with_run_length(seed, size, *run_len);

        group.throughput(Throughput::Elements(size as u64));

        group.bench_with_input(
            BenchmarkId::new("sosorted", name),
            &data,
            |bencher, data| {
                bencher.iter(|| {
                    let mut case = data.clone();
                    black_box(deduplicate(black_box(&mut case)))
                });
            },
        );

        group.bench_with_input(BenchmarkId::new("naive", name), &data, |bencher, data| {
            bencher.iter(|| {
                let mut case = data.clone();
                black_box(naive_deduplicate(black_box(&mut case)))
            });
        });

        group.bench_with_input(
            BenchmarkId::new("std_dedup", name),
            &data,
            |bencher, data| {
                bencher.iter(|| {
                    let mut case = data.clone();
                    case.dedup();
                    black_box(case)
                });
            },
        );
    }

    group.finish();
}

/// Size scaling comparison (analogous to algorithm_comparison in intersect.rs)
fn bench_algorithm_comparison(c: &mut Criterion) {
    let mut group = c.benchmark_group("deduplicate_algorithm_comparison");

    let sizes = [1_000, 10_000, 100_000, 1_000_000];

    let seed: [u8; 32] = [
        165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];

    for size in sizes.iter() {
        // Generate data with ~50% duplicates (moderate case)
        let unique_count = size / 2;
        let data = generate_with_duplicates_spread(seed, *size, unique_count);

        group.throughput(Throughput::Elements(*size as u64));

        group.bench_with_input(
            BenchmarkId::new("sosorted", size),
            &data,
            |bencher, data| {
                bencher.iter(|| {
                    let mut case = data.clone();
                    black_box(deduplicate(black_box(&mut case)))
                });
            },
        );

        group.bench_with_input(BenchmarkId::new("naive", size), &data, |bencher, data| {
            bencher.iter(|| {
                let mut case = data.clone();
                black_box(naive_deduplicate(black_box(&mut case)))
            });
        });

        group.bench_with_input(
            BenchmarkId::new("std_dedup", size),
            &data,
            |bencher, data| {
                bencher.iter(|| {
                    let mut case = data.clone();
                    case.dedup();
                    black_box(case)
                });
            },
        );

        group.bench_with_input(BenchmarkId::new("hashset", size), &data, |bencher, data| {
            bencher.iter(|| black_box(hashset_deduplicate(black_box(data))));
        });
    }

    group.finish();
}

criterion_group!(
    benches,
    bench_deduplicate,
    bench_deduplicate_scaling,
    bench_lemire_duplicate_density,
    bench_lemire_run_length,
    bench_algorithm_comparison
);
criterion_main!(benches);
