#[macro_use]
extern crate bencher;

use bencher::Bencher;
use rand::{rngs::SmallRng, RngCore, SeedableRng};
use sosorted::intersect;
use std::cmp::Ordering;

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

fn unique_data() -> Vec<u64> {
    // let mut seed: [u8; 32] = [0; 32];
    // rand::thread_rng().fill_bytes(&mut seed[..]);
    // println!("seed: {:?}", seed);
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

// Benchmarks using sosorted::intersect

fn intersect_no_intersections(bench: &mut Bencher) {
    let a = unique_data();
    let b = disjoint_higher_lower(&a, 0.5);

    bench.iter(|| {
        let mut case = a.clone();
        intersect(&mut case, &b);
    });
    bench.bytes = N as u64 * 4;
}

fn intersect_sparse_intersections(bench: &mut Bencher) {
    let a = unique_data();
    let mut b = disjoint_higher_lower(&a, 0.5);
    // One in 64 elements will intersect
    add_intersections(&mut b, &a, a.len() / 64);

    bench.iter(|| {
        let mut case = a.clone();
        intersect(&mut case, &b);
    });
    bench.bytes = N as u64 * 4;
}

fn intersect_all_intersections(bench: &mut Bencher) {
    let a = unique_data();
    let b = a.clone();

    bench.iter(|| {
        let mut case = a.clone();
        intersect(&mut case, &b);
    });
    bench.bytes = N as u64 * 4;
}

// Benchmarks using a naive intersection

fn naive_intersect_no_intersections(bench: &mut Bencher) {
    let a = unique_data();
    let b = disjoint_higher_lower(&a, 0.5);

    bench.iter(|| {
        let mut case = a.clone();
        naive_intersect(&mut case, &b);
    });
    bench.bytes = N as u64 * 4;
}

fn naive_intersect_sparse_intersections(bench: &mut Bencher) {
    let a = unique_data();
    let mut b = disjoint_higher_lower(&a, 0.5);
    // One in 64 elements will intersect
    add_intersections(&mut b, &a, a.len() / 64);

    bench.iter(|| {
        let mut case = a.clone();
        naive_intersect(&mut case, &b);
    });
    bench.bytes = N as u64 * 4;
}

fn naive_intersect_all_intersections(bench: &mut Bencher) {
    let a = unique_data();
    let b = a.clone();

    bench.iter(|| {
        let mut case = a.clone();
        naive_intersect(&mut case, &b);
    });
    bench.bytes = N as u64 * 4;
}

benchmark_group!(
    benches,
    intersect_no_intersections,
    intersect_sparse_intersections,
    intersect_all_intersections,
    naive_intersect_no_intersections,
    naive_intersect_sparse_intersections,
    naive_intersect_all_intersections,
);
benchmark_main!(benches);
