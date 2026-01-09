use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use rand::{rngs::SmallRng, RngCore, SeedableRng};
use sosorted::deduplicate;
use std::collections::HashSet;
use std::ops::Range;

const N: usize = 1024 * 1024;

pub fn naive_deduplicate(out: &mut [u64], input: &[u64]) -> usize {
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

/// Generate data with scattered duplicates by limiting the value range.
/// This simulates real-world scenarios like database foreign keys or categorical data.
fn scattered_duplicates_data(unique_ratio: f64) -> Vec<u64> {
    let seed: [u8; 32] = [
        165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];
    let mut rng = SmallRng::from_seed(seed);

    // Limit range to create natural duplicates when sorted
    let max_value = (N as f64 * unique_ratio) as u64;
    let mut data: Vec<u64> = (0..N).map(|_| rng.next_u64() % max_value).collect();
    data.sort();
    data
}

/// Generate data with Zipf-like distribution (power law).
/// A small number of values appear very frequently.
fn zipf_data() -> Vec<u64> {
    let seed: [u8; 32] = [
        42, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];
    let mut rng = SmallRng::from_seed(seed);

    // Zipf-like: value = max / rank^alpha, we approximate with exponential buckets
    let mut data: Vec<u64> = (0..N)
        .map(|_| {
            let r = rng.next_u64() as f64 / u64::MAX as f64;
            // This creates a power-law distribution
            let value = (1.0 / (1.0 - r * 0.99)).powf(1.5) as u64;
            value.min(1_000_000) // Cap at 1M distinct values
        })
        .collect();
    data.sort();
    data
}

/// Generate data with multiple small runs of duplicates (2-8 elements each).
/// This simulates scenarios like timestamps with sub-second precision.
fn small_runs_data() -> Vec<u64> {
    let seed: [u8; 32] = [
        99, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];
    let mut rng = SmallRng::from_seed(seed);

    let mut data = Vec::with_capacity(N);
    let mut current_value = 0u64;

    while data.len() < N {
        // Each run has 1-8 copies of the same value
        let run_length = (rng.next_u32() % 8 + 1) as usize;
        let copies = run_length.min(N - data.len());

        for _ in 0..copies {
            data.push(current_value);
        }

        // Jump to next value (with some gap)
        current_value += (rng.next_u32() % 100 + 1) as u64;
    }

    data
}

/// Generate data with clustered duplicates - several dense regions separated by unique data.
/// This simulates real-world scenarios like log data with bursts of repeated events.
fn clustered_data() -> Vec<u64> {
    let seed: [u8; 32] = [
        77, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];
    let mut rng = SmallRng::from_seed(seed);

    // Start with unique data
    let mut data: Vec<u64> = (0..N).map(|_| rng.next_u64()).collect();
    data.sort();

    // Add 10 clusters of duplicates at random positions
    for _ in 0..10 {
        let cluster_start = (rng.next_u32() as usize) % (N - 10000);
        let cluster_size = 5000 + (rng.next_u32() as usize % 5000); // 5000-10000 elements

        // Make all elements in the cluster the same
        let value = data[cluster_start];
        for d in data
            .iter_mut()
            .skip(cluster_start)
            .take(cluster_size.min(N - cluster_start))
        {
            *d = value;
        }
    }

    data
}

/// Generate data simulating sorted database IDs with ~10% duplicates.
fn database_ids_data() -> Vec<u64> {
    let seed: [u8; 32] = [
        123, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];
    let mut rng = SmallRng::from_seed(seed);

    let mut data = Vec::with_capacity(N);
    let mut current_id = 1000u64;

    while data.len() < N {
        // 90% chance of unique ID, 10% chance of 2-5 duplicates
        if rng.next_u32().is_multiple_of(10) {
            let dupes = (rng.next_u32() % 4 + 2) as usize;
            for _ in 0..dupes.min(N - data.len()) {
                data.push(current_id);
            }
        } else {
            data.push(current_id);
        }
        current_id += 1;
    }

    data.truncate(N);
    data
}

fn bench_deduplicate(c: &mut Criterion) {
    let mut group = c.benchmark_group("deduplicate");
    group.throughput(Throughput::Bytes((N * 8) as u64));

    // All unique
    let data = unique_data();

    group.bench_function("sosorted/all_unique", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data.len()];
            black_box(deduplicate(black_box(&mut out), black_box(&data)));
        });
    });

    group.bench_function("naive/all_unique", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data.len()];
            black_box(naive_deduplicate(black_box(&mut out), black_box(&data)));
        });
    });

    group.bench_function("std_dedup/all_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data.clone();
            case.dedup();
            black_box(());
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
            let mut out = vec![0u64; data_some.len()];
            black_box(deduplicate(black_box(&mut out), black_box(&data_some)));
        });
    });

    group.bench_function("naive/some_duplicates", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_some.len()];
            black_box(naive_deduplicate(
                black_box(&mut out),
                black_box(&data_some),
            ));
        });
    });

    group.bench_function("std_dedup/some_duplicates", |bencher| {
        bencher.iter(|| {
            let mut case = data_some.clone();
            case.dedup();
            black_box(());
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
            let mut out = vec![0u64; data_none.len()];
            black_box(deduplicate(black_box(&mut out), black_box(&data_none)));
        });
    });

    group.bench_function("naive/no_unique", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_none.len()];
            black_box(naive_deduplicate(
                black_box(&mut out),
                black_box(&data_none),
            ));
        });
    });

    group.bench_function("std_dedup/no_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data_none.clone();
            case.dedup();
            black_box(());
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
                let mut out = vec![0u64; data.len()];
                black_box(deduplicate(black_box(&mut out), black_box(&data)));
            });
        });

        group.bench_with_input(BenchmarkId::new("std_dedup", size), size, |bencher, _| {
            bencher.iter(|| {
                let mut case = data.clone();
                case.dedup();
                black_box(());
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
                    let mut out = vec![0u64; data.len()];
                    black_box(deduplicate(black_box(&mut out), black_box(data)))
                });
            },
        );

        group.bench_with_input(BenchmarkId::new("naive", name), &data, |bencher, data| {
            bencher.iter(|| {
                let mut out = vec![0u64; data.len()];
                black_box(naive_deduplicate(black_box(&mut out), black_box(data)))
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
                    let mut out = vec![0u64; data.len()];
                    black_box(deduplicate(black_box(&mut out), black_box(data)))
                });
            },
        );

        group.bench_with_input(BenchmarkId::new("naive", name), &data, |bencher, data| {
            bencher.iter(|| {
                let mut out = vec![0u64; data.len()];
                black_box(naive_deduplicate(black_box(&mut out), black_box(data)))
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
                    let mut out = vec![0u64; data.len()];
                    black_box(deduplicate(black_box(&mut out), black_box(data)))
                });
            },
        );

        group.bench_with_input(BenchmarkId::new("naive", size), &data, |bencher, data| {
            bencher.iter(|| {
                let mut out = vec![0u64; data.len()];
                black_box(naive_deduplicate(black_box(&mut out), black_box(data)))
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

/// Benchmark with realistic duplicate patterns
fn bench_deduplicate_realistic(c: &mut Criterion) {
    let mut group = c.benchmark_group("deduplicate_realistic");
    group.throughput(Throughput::Bytes((N * 8) as u64));

    // Scattered duplicates (50% unique values - moderate duplicates)
    let data_scattered_50 = scattered_duplicates_data(0.5);
    group.bench_function("sosorted/scattered_50pct_unique", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_scattered_50.len()];
            black_box(deduplicate(
                black_box(&mut out),
                black_box(&data_scattered_50),
            ));
        });
    });
    group.bench_function("naive/scattered_50pct_unique", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_scattered_50.len()];
            black_box(naive_deduplicate(
                black_box(&mut out),
                black_box(&data_scattered_50),
            ));
        });
    });
    group.bench_function("std_dedup/scattered_50pct_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data_scattered_50.clone();
            case.dedup();
            black_box(());
        });
    });

    // Scattered duplicates (10% unique values - heavy duplicates)
    let data_scattered_10 = scattered_duplicates_data(0.1);
    group.bench_function("sosorted/scattered_10pct_unique", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_scattered_10.len()];
            black_box(deduplicate(
                black_box(&mut out),
                black_box(&data_scattered_10),
            ));
        });
    });
    group.bench_function("naive/scattered_10pct_unique", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_scattered_10.len()];
            black_box(naive_deduplicate(
                black_box(&mut out),
                black_box(&data_scattered_10),
            ));
        });
    });
    group.bench_function("std_dedup/scattered_10pct_unique", |bencher| {
        bencher.iter(|| {
            let mut case = data_scattered_10.clone();
            case.dedup();
            black_box(());
        });
    });

    // Zipf distribution (power law - common in real data)
    let data_zipf = zipf_data();
    group.bench_function("sosorted/zipf", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_zipf.len()];
            black_box(deduplicate(black_box(&mut out), black_box(&data_zipf)));
        });
    });
    group.bench_function("naive/zipf", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_zipf.len()];
            black_box(naive_deduplicate(
                black_box(&mut out),
                black_box(&data_zipf),
            ));
        });
    });
    group.bench_function("std_dedup/zipf", |bencher| {
        bencher.iter(|| {
            let mut case = data_zipf.clone();
            case.dedup();
            black_box(());
        });
    });

    // Small runs (2-8 element runs - like timestamps)
    let data_small_runs = small_runs_data();
    group.bench_function("sosorted/small_runs", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_small_runs.len()];
            black_box(deduplicate(
                black_box(&mut out),
                black_box(&data_small_runs),
            ));
        });
    });
    group.bench_function("naive/small_runs", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_small_runs.len()];
            black_box(naive_deduplicate(
                black_box(&mut out),
                black_box(&data_small_runs),
            ));
        });
    });
    group.bench_function("std_dedup/small_runs", |bencher| {
        bencher.iter(|| {
            let mut case = data_small_runs.clone();
            case.dedup();
            black_box(());
        });
    });

    // Clustered duplicates (bursts of repeated events)
    let data_clustered = clustered_data();
    group.bench_function("sosorted/clustered", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_clustered.len()];
            black_box(deduplicate(black_box(&mut out), black_box(&data_clustered)));
        });
    });
    group.bench_function("naive/clustered", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_clustered.len()];
            black_box(naive_deduplicate(
                black_box(&mut out),
                black_box(&data_clustered),
            ));
        });
    });
    group.bench_function("std_dedup/clustered", |bencher| {
        bencher.iter(|| {
            let mut case = data_clustered.clone();
            case.dedup();
            black_box(());
        });
    });

    // Database IDs (~10% duplicates, mostly unique)
    let data_db_ids = database_ids_data();
    group.bench_function("sosorted/database_ids", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_db_ids.len()];
            black_box(deduplicate(black_box(&mut out), black_box(&data_db_ids)));
        });
    });
    group.bench_function("naive/database_ids", |bencher| {
        bencher.iter(|| {
            let mut out = vec![0u64; data_db_ids.len()];
            black_box(naive_deduplicate(
                black_box(&mut out),
                black_box(&data_db_ids),
            ));
        });
    });
    group.bench_function("std_dedup/database_ids", |bencher| {
        bencher.iter(|| {
            let mut case = data_db_ids.clone();
            case.dedup();
            black_box(());
        });
    });

    group.finish();
}

fn bench_deduplicate_u32(c: &mut Criterion) {
    let mut group = c.benchmark_group("deduplicate_u32");
    // Use a smaller size for u8 to keep total bytes reasonable but elements high
    let size = 1024 * 1024; 
    group.throughput(Throughput::Bytes((size * 4) as u64));

    let seed: [u8; 32] = [
        165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];
    let mut rng = SmallRng::from_seed(seed);

    // All unique (max 256 items for u8, so this loop will wrap? 
    // Wait, u8 can only have 256 unique values.
    // So "All Unique" for N=1M is impossible for u8.
    // "Scattered duplicates" is the best we can do.
    // We can simulate "sorted u8 array" which is just 0,0,0...1,1,1...255,255.
    // That's actually "High Duplicates".
    
    // To test the "Mixed" loop, we need an array that switches values often.
    // But sorted u8 switches values at most 255 times.
    // So for large N, u8 is almost ALWAYS in "Galloping" mode (identical blocks).
    // SIMD compression only matters at the boundaries (255 boundaries).
    
    // This implies SIMD compression optimization is IRRELEVANT for u8 on large arrays because 99.9% of blocks are identical.
    
    // HOWEVER, for `u16` (65k values) or `u32` (4B values), it matters.
    // Let's verify `u32`.
    
    // Switch plan: Add `bench_deduplicate_u32`.
    // 1M elements, values range up to 1M -> mostly unique is possible.
    
    let mut data: Vec<u32> = (0..size).map(|_| rng.next_u32()).collect();
    data.sort();
    
    group.bench_function("sosorted/u32_all_unique", |bencher| {
         // Create mostly unique data
        let mut d = data.clone();
        d.dedup(); // Ensure unique
        let mut out = vec![0u32; d.len()];
        bencher.iter(|| {
             black_box(deduplicate(black_box(&mut out), black_box(&d)));
        });
    });

    // Mixed duplicates
    // Create data where every element appears ~2 times on average
    let mut data_mixed: Vec<u32> = (0..size/2).map(|_| rng.next_u32()).collect();
    for _ in 0..size/2 {
        data_mixed.push(data_mixed[data_mixed.len() % (size/2)]);
    }
    data_mixed.sort();
    
    group.bench_function("sosorted/u32_mixed", |bencher| {
         let mut out = vec![0u32; data_mixed.len()];
         bencher.iter(|| {
             black_box(deduplicate(black_box(&mut out), black_box(&data_mixed)));
         });
    });

    group.finish();
}

criterion_group!(
    benches,
    bench_deduplicate,
    bench_deduplicate_realistic,
    bench_deduplicate_scaling,
    bench_lemire_duplicate_density,
    bench_lemire_run_length,
    bench_algorithm_comparison,
    bench_deduplicate_u32
);
criterion_main!(benches);
