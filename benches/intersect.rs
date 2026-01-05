use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use rand::{rngs::SmallRng, RngCore, SeedableRng};
use sosorted::{intersect, intersect_adaptive, intersect_simd_galloping, intersect_v1, intersect_v3};
use std::cmp::Ordering;
use std::collections::HashSet;

static N: usize = 1024 * 1024;

fn naive_intersect(a: &mut [u64], b: &[u64]) -> usize {
    let mut i = 0;
    let mut j = 0;
    let mut intersect_count = 0;

    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => i += 1,
            Ordering::Greater => j += 1,
            _ => {
                a[intersect_count] = b[j];
                j += 1;
                i += 1;
                intersect_count += 1;
            }
        }
    }
    intersect_count
}

fn hashset_intersect(a: &[u64], b: &[u64]) -> Vec<u64> {
    let set_a: HashSet<_> = a.iter().copied().collect();
    let set_b: HashSet<_> = b.iter().copied().collect();
    let mut result: Vec<_> = set_a.intersection(&set_b).copied().collect();
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

/// Generate a sorted array of `size` unique random values within [0, max_val)
fn generate_sorted_unique(seed: [u8; 32], size: usize, max_val: u64) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);
    let mut data: Vec<u64> = (0..size * 2)
        .map(|_| rng.next_u64() % max_val)
        .collect();
    data.sort();
    data.dedup();
    data.truncate(size);
    data
}

/// Generate a second array that has `intersect_count` elements in common with `base`
fn generate_with_intersections(
    seed: [u8; 32],
    base: &[u64],
    size: usize,
    intersect_count: usize,
    max_val: u64,
) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);

    // Start with some elements from base
    let stride = base.len() / intersect_count.max(1);
    let mut result: Vec<u64> = (0..intersect_count)
        .map(|i| base[(i * stride).min(base.len() - 1)])
        .collect();

    // Add random non-intersecting elements
    while result.len() < size {
        let val = rng.next_u64() % max_val;
        // Check it's not in base (simple linear check is fine for benchmarks)
        if base.binary_search(&val).is_err() {
            result.push(val);
        }
    }

    result.sort();
    result.dedup();
    result.truncate(size);
    result
}

// Generate a dataset that is disjoint - initially due to all values being higher, and then after
// `pivot_prop`, lower
fn disjoint_higher_lower(data: &[u64], pivot_prop: f32) -> Vec<u64> {
    let mut disjoint = data.to_vec();
    let pivot_ix = (data.len() as f32 * pivot_prop + 1.0) as usize;
    let pivot_val = data[pivot_ix];
    for i in 0..pivot_ix {
        let val = (disjoint[i] + pivot_val) / 2;
        if data.binary_search(&val).is_ok() {
            panic!("could not make disjoint dataset");
        }
        disjoint[i] = val
    }
    for i in pivot_ix..data.len() {
        let val = disjoint[i] + (disjoint[i] + pivot_val) / 2;
        if data.binary_search(&val).is_ok() {
            panic!("could not make disjoint dataset");
        }
        disjoint[i] = val
    }
    disjoint
}

// Generate a dataset that intersects with `data` `intersect_count` times. Intersections will be
// evenly spread
fn add_intersections(data: &mut [u64], intersect_with: &[u64], intersect_count: usize) {
    let stride = data.len() / intersect_count;
    for i in 0..intersect_count {
        data[i * stride] = intersect_with[i * stride];
    }
}

fn bench_intersect(c: &mut Criterion) {
    let mut group = c.benchmark_group("intersect");
    group.throughput(Throughput::Bytes((N * 8) as u64));

    // No intersections
    let a = unique_data();
    let b = disjoint_higher_lower(&a, 0.5);

    group.bench_function("sosorted/no_intersections", |bencher| {
        bencher.iter(|| {
            let mut case = a.clone();
            black_box(intersect(&mut case, black_box(&b)));
        });
    });

    group.bench_function("naive/no_intersections", |bencher| {
        bencher.iter(|| {
            let mut case = a.clone();
            black_box(naive_intersect(&mut case, black_box(&b)));
        });
    });

    group.bench_function("hashset/no_intersections", |bencher| {
        bencher.iter(|| {
            black_box(hashset_intersect(black_box(&a), black_box(&b)));
        });
    });

    // Sparse intersections (1 in 64 elements)
    let a_sparse = unique_data();
    let mut b_sparse = disjoint_higher_lower(&a_sparse, 0.5);
    add_intersections(&mut b_sparse, &a_sparse, a_sparse.len() / 64);

    group.bench_function("sosorted/sparse_intersections", |bencher| {
        bencher.iter(|| {
            let mut case = a_sparse.clone();
            black_box(intersect(&mut case, black_box(&b_sparse)));
        });
    });

    group.bench_function("naive/sparse_intersections", |bencher| {
        bencher.iter(|| {
            let mut case = a_sparse.clone();
            black_box(naive_intersect(&mut case, black_box(&b_sparse)));
        });
    });

    group.bench_function("hashset/sparse_intersections", |bencher| {
        bencher.iter(|| {
            black_box(hashset_intersect(black_box(&a_sparse), black_box(&b_sparse)));
        });
    });

    // All intersections
    let a_all = unique_data();
    let b_all = a_all.clone();

    group.bench_function("sosorted/all_intersections", |bencher| {
        bencher.iter(|| {
            let mut case = a_all.clone();
            black_box(intersect(&mut case, black_box(&b_all)));
        });
    });

    group.bench_function("naive/all_intersections", |bencher| {
        bencher.iter(|| {
            let mut case = a_all.clone();
            black_box(naive_intersect(&mut case, black_box(&b_all)));
        });
    });

    group.bench_function("hashset/all_intersections", |bencher| {
        bencher.iter(|| {
            black_box(hashset_intersect(black_box(&a_all), black_box(&b_all)));
        });
    });

    group.finish();
}

fn bench_intersect_scaling(c: &mut Criterion) {
    let mut group = c.benchmark_group("intersect_scaling");

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

        let mut b = disjoint_higher_lower(&data, 0.5);
        add_intersections(&mut b, &data, data.len() / 64);

        group.bench_with_input(BenchmarkId::new("sosorted", size), size, |bencher, _| {
            bencher.iter(|| {
                let mut case = data.clone();
                black_box(intersect(&mut case, black_box(&b)));
            });
        });

        group.bench_with_input(BenchmarkId::new("hashset", size), size, |bencher, _| {
            bencher.iter(|| {
                black_box(hashset_intersect(black_box(&data), black_box(&b)));
            });
        });
    }

    group.finish();
}

/// Lemire-style benchmarks testing asymmetric array sizes
/// Based on the paper "SIMD Compression and the Intersection of Sorted Integers"
fn bench_lemire_asymmetric(c: &mut Criterion) {
    let mut group = c.benchmark_group("lemire_asymmetric");

    // Test various size ratios as in the paper
    // Format: (freq_size, rare_size, ratio_name)
    let test_cases = [
        (100_000, 100_000, "1:1"),
        (100_000, 10_000, "10:1"),
        (100_000, 2_000, "50:1"),
        (100_000, 1_000, "100:1"),
        (1_000_000, 1_000, "1000:1"),
        (1_000_000, 100, "10000:1"),
    ];

    let seed1: [u8; 32] = [
        165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];
    let seed2: [u8; 32] = [
        42, 135, 233, 92, 112, 23, 105, 79, 81, 127, 217, 1, 97, 10, 71, 36, 110, 148, 100, 78, 122,
        6, 9, 127, 13, 79, 43, 164, 178, 35, 41, 142,
    ];

    for (freq_size, rare_size, ratio_name) in test_cases.iter() {
        // Generate test data
        let max_val = (*freq_size as u64) * 10;
        let freq = generate_sorted_unique(seed1, *freq_size, max_val);
        let rare = generate_sorted_unique(seed2, *rare_size, max_val);

        // Calculate actual intersection size (for verification if needed)
        let _freq_set: HashSet<_> = freq.iter().copied().collect();
        let _actual_intersect: usize = rare.iter().filter(|x| _freq_set.contains(x)).count();

        // Throughput based on smaller array (rare) since that's the bottleneck
        group.throughput(Throughput::Elements(*rare_size as u64));

        // Current sosorted implementation
        group.bench_with_input(
            BenchmarkId::new("sosorted", ratio_name),
            &(&freq, &rare),
            |bencher, (freq, rare)| {
                bencher.iter(|| {
                    let mut a = (*rare).clone();
                    black_box(intersect(&mut a, black_box(freq)));
                });
            },
        );

        // V1 (optimized for ratios up to 50:1)
        group.bench_with_input(
            BenchmarkId::new("v1", ratio_name),
            &(&freq, &rare),
            |bencher, (freq, rare)| {
                bencher.iter(|| {
                    let mut a = (*rare).clone();
                    black_box(intersect_v1(&mut a, black_box(freq)));
                });
            },
        );

        // V3 (optimized for ratios 50:1 to 1000:1)
        group.bench_with_input(
            BenchmarkId::new("v3", ratio_name),
            &(&freq, &rare),
            |bencher, (freq, rare)| {
                bencher.iter(|| {
                    let mut a = (*rare).clone();
                    black_box(intersect_v3(&mut a, black_box(freq)));
                });
            },
        );

        // SIMD Galloping (optimized for ratios > 1000:1)
        group.bench_with_input(
            BenchmarkId::new("galloping", ratio_name),
            &(&freq, &rare),
            |bencher, (freq, rare)| {
                bencher.iter(|| {
                    let mut a = (*rare).clone();
                    black_box(intersect_simd_galloping(&mut a, black_box(freq)));
                });
            },
        );

        // Adaptive (automatically selects best algorithm)
        group.bench_with_input(
            BenchmarkId::new("adaptive", ratio_name),
            &(&freq, &rare),
            |bencher, (freq, rare)| {
                bencher.iter(|| {
                    let mut a = (*rare).clone();
                    black_box(intersect_adaptive(&mut a, black_box(freq)));
                });
            },
        );

        // Naive scalar baseline
        group.bench_with_input(
            BenchmarkId::new("naive", ratio_name),
            &(&freq, &rare),
            |bencher, (freq, rare)| {
                bencher.iter(|| {
                    let mut a = (*rare).clone();
                    black_box(naive_intersect(&mut a, black_box(freq)));
                });
            },
        );
    }

    group.finish();
}

/// Benchmark intersection with varying intersection densities
/// Tests how algorithms perform with different amounts of actual matches
fn bench_intersection_density(c: &mut Criterion) {
    let mut group = c.benchmark_group("intersection_density");

    let size = 100_000;
    let seed: [u8; 32] = [
        165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];

    let base = generate_sorted_unique(seed, size, size as u64 * 10);

    // Test cases: (intersection_percentage, name)
    let densities = [
        (0, "0%"),
        (1, "1%"),
        (10, "10%"),
        (50, "50%"),
        (100, "100%"),
    ];

    for (pct, name) in densities.iter() {
        let intersect_count = (size * pct) / 100;
        let seed2: [u8; 32] = [
            42, 135, 233, 92, 112, 23, 105, 79, 81, 127, 217, 1, 97, 10, 71, 36, 110, 148, 100, 78,
            122, 6, 9, 127, 13, 79, 43, 164, 178, 35, 41, 142,
        ];

        let other = generate_with_intersections(seed2, &base, size, intersect_count, size as u64 * 10);

        group.throughput(Throughput::Elements(size as u64));

        group.bench_with_input(
            BenchmarkId::new("sosorted", name),
            &(&base, &other),
            |bencher, (base, other)| {
                bencher.iter(|| {
                    let mut a = (*base).clone();
                    black_box(intersect(&mut a, black_box(other)));
                });
            },
        );

        group.bench_with_input(
            BenchmarkId::new("v1", name),
            &(&base, &other),
            |bencher, (base, other)| {
                bencher.iter(|| {
                    let mut a = (*base).clone();
                    black_box(intersect_v1(&mut a, black_box(other)));
                });
            },
        );

        group.bench_with_input(
            BenchmarkId::new("adaptive", name),
            &(&base, &other),
            |bencher, (base, other)| {
                bencher.iter(|| {
                    let mut a = (*base).clone();
                    black_box(intersect_adaptive(&mut a, black_box(other)));
                });
            },
        );

        group.bench_with_input(
            BenchmarkId::new("naive", name),
            &(&base, &other),
            |bencher, (base, other)| {
                bencher.iter(|| {
                    let mut a = (*base).clone();
                    black_box(naive_intersect(&mut a, black_box(other)));
                });
            },
        );
    }

    group.finish();
}

/// Direct algorithm comparison on equal-sized arrays
fn bench_algorithm_comparison(c: &mut Criterion) {
    let mut group = c.benchmark_group("algorithm_comparison");

    let sizes = [1_000, 10_000, 100_000, 1_000_000];

    let seed1: [u8; 32] = [
        165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];
    let seed2: [u8; 32] = [
        42, 135, 233, 92, 112, 23, 105, 79, 81, 127, 217, 1, 97, 10, 71, 36, 110, 148, 100, 78, 122,
        6, 9, 127, 13, 79, 43, 164, 178, 35, 41, 142,
    ];

    for size in sizes.iter() {
        let max_val = (*size as u64) * 10;
        let a = generate_sorted_unique(seed1, *size, max_val);
        let b = generate_sorted_unique(seed2, *size, max_val);

        group.throughput(Throughput::Elements(*size as u64));

        group.bench_with_input(
            BenchmarkId::new("sosorted", size),
            &(&a, &b),
            |bencher, (a, b)| {
                bencher.iter(|| {
                    let mut arr = (*a).clone();
                    black_box(intersect(&mut arr, black_box(b)));
                });
            },
        );

        group.bench_with_input(BenchmarkId::new("v1", size), &(&a, &b), |bencher, (a, b)| {
            bencher.iter(|| {
                let mut arr = (*a).clone();
                black_box(intersect_v1(&mut arr, black_box(b)));
            });
        });

        group.bench_with_input(BenchmarkId::new("v3", size), &(&a, &b), |bencher, (a, b)| {
            bencher.iter(|| {
                let mut arr = (*a).clone();
                black_box(intersect_v3(&mut arr, black_box(b)));
            });
        });

        group.bench_with_input(
            BenchmarkId::new("galloping", size),
            &(&a, &b),
            |bencher, (a, b)| {
                bencher.iter(|| {
                    let mut arr = (*a).clone();
                    black_box(intersect_simd_galloping(&mut arr, black_box(b)));
                });
            },
        );

        group.bench_with_input(
            BenchmarkId::new("adaptive", size),
            &(&a, &b),
            |bencher, (a, b)| {
                bencher.iter(|| {
                    let mut arr = (*a).clone();
                    black_box(intersect_adaptive(&mut arr, black_box(b)));
                });
            },
        );

        group.bench_with_input(
            BenchmarkId::new("naive", size),
            &(&a, &b),
            |bencher, (a, b)| {
                bencher.iter(|| {
                    let mut arr = (*a).clone();
                    black_box(naive_intersect(&mut arr, black_box(b)));
                });
            },
        );
    }

    group.finish();
}

criterion_group!(
    benches,
    bench_intersect,
    bench_intersect_scaling,
    bench_lemire_asymmetric,
    bench_intersection_density,
    bench_algorithm_comparison
);
criterion_main!(benches);
