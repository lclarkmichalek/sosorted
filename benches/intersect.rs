use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use rand::{rngs::SmallRng, RngCore, SeedableRng};
use sosorted::intersect;
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

criterion_group!(benches, bench_intersect, bench_intersect_scaling);
criterion_main!(benches);
