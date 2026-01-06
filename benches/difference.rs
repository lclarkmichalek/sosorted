use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};
use rand::{rngs::SmallRng, RngCore, SeedableRng};
use sosorted::{difference, difference_size};
use std::cmp::Ordering;
use std::collections::HashSet;

static N: usize = 1024 * 1024;

fn naive_difference(a: &[u64], b: &[u64]) -> Vec<u64> {
    let mut result = Vec::with_capacity(a.len());
    let mut i = 0;
    let mut j = 0;

    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => {
                result.push(a[i]);
                i += 1;
            }
            Ordering::Greater => {
                j += 1;
            }
            Ordering::Equal => {
                i += 1;
                j += 1;
            }
        }
    }

    result.extend_from_slice(&a[i..]);
    result
}

fn hashset_difference(a: &[u64], set_b: &HashSet<u64>) -> Vec<u64> {
    let mut result: Vec<_> = a.iter().copied().filter(|x| !set_b.contains(x)).collect();
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

// Generate a dataset that intersects with `data` `intersect_count` times. Intersections will be
// evenly spread
fn add_intersections(data: &mut [u64], intersect_with: &[u64], intersect_count: usize) {
    let stride = data.len() / intersect_count;
    for i in 0..intersect_count {
        data[i * stride] = intersect_with[i * stride];
    }
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

fn bench_difference(c: &mut Criterion) {
    let mut group = c.benchmark_group("difference");
    group.throughput(Throughput::Bytes((N * 8) as u64));

    // No overlap (completely disjoint sets) - best case: all of a returned
    let a = unique_data();
    let b = disjoint_higher_lower(&a, 0.5);
    let set_b: HashSet<_> = b.iter().copied().collect();

    group.bench_function("sosorted/no_overlap", |bencher| {
        bencher.iter(|| {
            let mut dest = vec![0u64; a.len()];
            black_box(difference(&mut dest, black_box(&a), black_box(&b)));
        });
    });

    group.bench_function("naive/no_overlap", |bencher| {
        bencher.iter(|| {
            black_box(naive_difference(black_box(&a), black_box(&b)));
        });
    });

    group.bench_function("hashset/no_overlap", |bencher| {
        bencher.iter(|| {
            black_box(hashset_difference(black_box(&a), black_box(&set_b)));
        });
    });

    // Sparse overlap (some common elements removed)
    let a_sparse = unique_data();
    let mut b_sparse = disjoint_higher_lower(&a_sparse, 0.5);
    add_intersections(&mut b_sparse, &a_sparse, a_sparse.len() / 64);
    let set_b_sparse: HashSet<_> = b_sparse.iter().copied().collect();

    group.bench_function("sosorted/sparse_overlap", |bencher| {
        bencher.iter(|| {
            let mut dest = vec![0u64; a_sparse.len()];
            black_box(difference(&mut dest, black_box(&a_sparse), black_box(&b_sparse)));
        });
    });

    group.bench_function("naive/sparse_overlap", |bencher| {
        bencher.iter(|| {
            black_box(naive_difference(black_box(&a_sparse), black_box(&b_sparse)));
        });
    });

    group.bench_function("hashset/sparse_overlap", |bencher| {
        bencher.iter(|| {
            black_box(hashset_difference(
                black_box(&a_sparse),
                black_box(&set_b_sparse),
            ));
        });
    });

    // Complete overlap (identical sets) - worst case: empty result
    let a_identical = unique_data();
    let b_identical = a_identical.clone();
    let set_b_identical: HashSet<_> = b_identical.iter().copied().collect();

    group.bench_function("sosorted/complete_overlap", |bencher| {
        bencher.iter(|| {
            let mut dest = vec![0u64; a_identical.len()];
            black_box(difference(&mut dest, black_box(&a_identical), black_box(&b_identical)));
        });
    });

    group.bench_function("naive/complete_overlap", |bencher| {
        bencher.iter(|| {
            black_box(naive_difference(
                black_box(&a_identical),
                black_box(&b_identical),
            ));
        });
    });

    group.bench_function("hashset/complete_overlap", |bencher| {
        bencher.iter(|| {
            black_box(hashset_difference(
                black_box(&a_identical),
                black_box(&set_b_identical),
            ));
        });
    });

    group.finish();
}

fn bench_difference_size(c: &mut Criterion) {
    let mut group = c.benchmark_group("difference_size");
    group.throughput(Throughput::Bytes((N * 8) as u64));

    let a = unique_data();
    let b = disjoint_higher_lower(&a, 0.5);

    group.bench_function("sosorted/no_overlap", |bencher| {
        bencher.iter(|| {
            black_box(difference_size(black_box(&a), black_box(&b)));
        });
    });

    let a_sparse = unique_data();
    let mut b_sparse = disjoint_higher_lower(&a_sparse, 0.5);
    add_intersections(&mut b_sparse, &a_sparse, a_sparse.len() / 64);

    group.bench_function("sosorted/sparse_overlap", |bencher| {
        bencher.iter(|| {
            black_box(difference_size(black_box(&a_sparse), black_box(&b_sparse)));
        });
    });

    let a_identical = unique_data();
    let b_identical = a_identical.clone();

    group.bench_function("sosorted/complete_overlap", |bencher| {
        bencher.iter(|| {
            black_box(difference_size(
                black_box(&a_identical),
                black_box(&b_identical),
            ));
        });
    });

    group.finish();
}

criterion_group!(benches, bench_difference, bench_difference_size);
criterion_main!(benches);
