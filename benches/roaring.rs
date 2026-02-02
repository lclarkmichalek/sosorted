use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};
use rand::rngs::SmallRng;
use rand::{Rng, SeedableRng};
use sosorted::Bitmap;
use std::collections::HashSet;

// =============================================================================
// Dataset Generation
// =============================================================================

/// Generates sparse dataset (low density).
fn generate_sparse(count: usize, seed: u64) -> Vec<u32> {
    let mut rng = SmallRng::seed_from_u64(seed);
    let mut values: Vec<u32> = (0..count).map(|_| rng.random_range(0..1_000_000)).collect();
    values.sort_unstable();
    values.dedup();
    values
}

/// Generates dense dataset (high density within ranges).
fn generate_dense(count: usize) -> Vec<u32> {
    (0..count as u32).collect()
}

/// Generates mixed dataset (some sparse, some dense regions).
fn generate_mixed(count: usize, seed: u64) -> Vec<u32> {
    let mut rng = SmallRng::seed_from_u64(seed);
    let mut values = Vec::new();

    // Add some dense regions
    for base in [0, 10000, 100000, 1000000] {
        let region_size = count / 8;
        values.extend(base..base + region_size as u32);
    }

    // Add some sparse values
    for _ in 0..count / 2 {
        values.push(rng.random_range(0..10_000_000));
    }

    values.sort_unstable();
    values.dedup();
    values.truncate(count);
    values
}

/// Generates values that span multiple containers.
fn generate_multi_container(count: usize, seed: u64) -> Vec<u32> {
    let mut rng = SmallRng::seed_from_u64(seed);
    let mut values = Vec::new();

    // Spread values across different high-bit ranges
    let containers = 10;
    let per_container = count / containers;

    for i in 0..containers {
        let base = (i as u32) << 16; // Different high 16 bits
        for _ in 0..per_container {
            values.push(base + rng.random_range(0..65536));
        }
    }

    values.sort_unstable();
    values.dedup();
    values
}

// =============================================================================
// Construction Benchmarks
// =============================================================================

fn bench_construction(c: &mut Criterion) {
    let datasets = vec![
        ("sparse_1k", generate_sparse(1000, 42)),
        ("sparse_10k", generate_sparse(10000, 42)),
        ("dense_1k", generate_dense(1000)),
        ("dense_10k", generate_dense(10000)),
        ("mixed_1k", generate_mixed(1000, 42)),
        ("mixed_10k", generate_mixed(10000, 42)),
        ("multi_container", generate_multi_container(10000, 42)),
    ];

    for (name, data) in &datasets {
        let mut g = c.benchmark_group(format!("roaring/construction/{}", name));
        g.throughput(Throughput::Elements(data.len() as u64));

        // Bitmap from sorted slice
        g.bench_function("bitmap_from_sorted", |b| {
            b.iter(|| black_box(Bitmap::from_sorted_slice(black_box(data))))
        });

        // Bitmap from iterator (unsorted)
        let mut unsorted = data.clone();
        unsorted.reverse();
        g.bench_function("bitmap_from_iter", |b| {
            b.iter(|| {
                let bitmap: Bitmap = black_box(unsorted.iter().copied().collect());
                black_box(bitmap)
            })
        });

        // HashSet for comparison
        g.bench_function("hashset", |b| {
            b.iter(|| {
                let set: HashSet<u32> = black_box(data.iter().copied().collect());
                black_box(set)
            })
        });

        // Vec with sort for comparison
        g.bench_function("vec_sorted", |b| {
            b.iter(|| {
                let mut vec = black_box(data.clone());
                vec.sort_unstable();
                black_box(vec)
            })
        });

        g.finish();
    }
}

// =============================================================================
// Query Benchmarks (contains)
// =============================================================================

fn bench_contains(c: &mut Criterion) {
    let datasets = vec![
        ("sparse_10k", generate_sparse(10000, 42)),
        ("dense_10k", generate_dense(10000)),
        ("mixed_10k", generate_mixed(10000, 42)),
    ];

    for (name, data) in &datasets {
        let mut g = c.benchmark_group(format!("roaring/contains/{}", name));
        g.throughput(Throughput::Elements(100));

        let bitmap = Bitmap::from_sorted_slice(data);
        let hashset: HashSet<u32> = data.iter().copied().collect();

        // Test values: mix of present and absent
        let test_values: Vec<u32> = (0..100)
            .map(|i| {
                if i % 2 == 0 {
                    data[i * data.len() / 200] // Present
                } else {
                    data[i * data.len() / 200] + 1 // Likely absent
                }
            })
            .collect();

        g.bench_function("bitmap", |b| {
            b.iter(|| {
                for &value in &test_values {
                    black_box(bitmap.contains(black_box(value)));
                }
            })
        });

        g.bench_function("hashset", |b| {
            b.iter(|| {
                for &value in &test_values {
                    black_box(hashset.contains(black_box(&value)));
                }
            })
        });

        g.bench_function("vec_binary_search", |b| {
            b.iter(|| {
                for &value in &test_values {
                    black_box(data.binary_search(black_box(&value)).is_ok());
                }
            })
        });

        g.finish();
    }
}

// =============================================================================
// Union Benchmarks
// =============================================================================

fn bench_union(c: &mut Criterion) {
    let test_cases = vec![
        (
            "sparse_1k",
            generate_sparse(1000, 42),
            generate_sparse(1000, 43),
        ),
        (
            "sparse_10k",
            generate_sparse(10000, 42),
            generate_sparse(10000, 43),
        ),
        ("dense_1k", generate_dense(1000), generate_dense(1500)),
        ("dense_10k", generate_dense(10000), generate_dense(15000)),
        ("mixed", generate_mixed(5000, 42), generate_mixed(5000, 43)),
    ];

    for (name, data1, data2) in &test_cases {
        let mut g = c.benchmark_group(format!("roaring/union/{}", name));
        g.throughput(Throughput::Elements((data1.len() + data2.len()) as u64));

        let bitmap1 = Bitmap::from_sorted_slice(data1);
        let bitmap2 = Bitmap::from_sorted_slice(data2);

        let set1: HashSet<u32> = data1.iter().copied().collect();
        let set2: HashSet<u32> = data2.iter().copied().collect();

        g.bench_function("bitmap", |b| {
            b.iter(|| black_box(black_box(&bitmap1).union(black_box(&bitmap2))))
        });

        g.bench_function("bitmap_operator", |b| {
            b.iter(|| black_box(black_box(&bitmap1) | black_box(&bitmap2)))
        });

        g.bench_function("hashset", |b| {
            b.iter(|| {
                let result: HashSet<u32> =
                    black_box(&set1).union(black_box(&set2)).copied().collect();
                black_box(result)
            })
        });

        g.bench_function("sosorted_union", |b| {
            b.iter(|| {
                let mut dest = vec![0u32; data1.len() + data2.len()];
                let len = sosorted::union(black_box(&mut dest), black_box(data1), black_box(data2));
                black_box(len)
            })
        });

        g.finish();
    }
}

// =============================================================================
// Intersection Benchmarks
// =============================================================================

fn bench_intersection(c: &mut Criterion) {
    let test_cases = vec![
        (
            "sparse_1k",
            generate_sparse(1000, 42),
            generate_sparse(1000, 43),
        ),
        (
            "sparse_10k",
            generate_sparse(10000, 42),
            generate_sparse(10000, 43),
        ),
        ("dense_1k", generate_dense(1000), generate_dense(1500)),
        ("dense_10k", generate_dense(10000), generate_dense(15000)),
        ("mixed", generate_mixed(5000, 42), generate_mixed(5000, 43)),
    ];

    for (name, data1, data2) in &test_cases {
        let mut g = c.benchmark_group(format!("roaring/intersection/{}", name));
        g.throughput(Throughput::Elements(data1.len().min(data2.len()) as u64));

        let bitmap1 = Bitmap::from_sorted_slice(data1);
        let bitmap2 = Bitmap::from_sorted_slice(data2);

        let set1: HashSet<u32> = data1.iter().copied().collect();
        let set2: HashSet<u32> = data2.iter().copied().collect();

        g.bench_function("bitmap", |b| {
            b.iter(|| black_box(black_box(&bitmap1).intersection(black_box(&bitmap2))))
        });

        g.bench_function("bitmap_operator", |b| {
            b.iter(|| black_box(black_box(&bitmap1) & black_box(&bitmap2)))
        });

        g.bench_function("hashset", |b| {
            b.iter(|| {
                let result: HashSet<u32> = black_box(&set1)
                    .intersection(black_box(&set2))
                    .copied()
                    .collect();
                black_box(result)
            })
        });

        g.bench_function("sosorted_intersect", |b| {
            b.iter(|| {
                let min_len = data1.len().min(data2.len());
                let mut dest = vec![0u32; min_len];
                let len =
                    sosorted::intersect(black_box(&mut dest), black_box(data1), black_box(data2));
                black_box(len)
            })
        });

        g.finish();
    }
}

// =============================================================================
// Conversion Benchmarks (to_vec)
// =============================================================================

fn bench_to_vec(c: &mut Criterion) {
    let datasets = vec![
        ("sparse_1k", generate_sparse(1000, 42)),
        ("sparse_10k", generate_sparse(10000, 42)),
        ("dense_1k", generate_dense(1000)),
        ("dense_10k", generate_dense(10000)),
        ("mixed_10k", generate_mixed(10000, 42)),
    ];

    for (name, data) in &datasets {
        let mut g = c.benchmark_group(format!("roaring/to_vec/{}", name));
        g.throughput(Throughput::Elements(data.len() as u64));

        let bitmap = Bitmap::from_sorted_slice(data);
        let hashset: HashSet<u32> = data.iter().copied().collect();

        g.bench_function("bitmap", |b| {
            b.iter(|| black_box(black_box(&bitmap).to_vec()))
        });

        g.bench_function("bitmap_iter", |b| {
            b.iter(|| {
                let vec: Vec<u32> = black_box(&bitmap).iter().collect();
                black_box(vec)
            })
        });

        g.bench_function("hashset", |b| {
            b.iter(|| {
                let mut vec: Vec<u32> = black_box(&hashset).iter().copied().collect();
                vec.sort_unstable();
                black_box(vec)
            })
        });

        g.finish();
    }
}

// =============================================================================
// Criterion Configuration
// =============================================================================

criterion_group!(
    benches,
    bench_construction,
    bench_contains,
    bench_union,
    bench_intersection,
    bench_to_vec
);
criterion_main!(benches);
