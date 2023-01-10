use criterion::{criterion_group, criterion_main, Criterion};
use rand::{rngs::SmallRng, Rng, RngCore, SeedableRng};
use sosorted::{deduplicate, intersect};

// We'll go for one in 3 elements intersecting, randomly spread throughout the dataset
fn criterion_benchmark(c: &mut Criterion) {
    // let mut seed: [u8; 32] = [0; 32];
    // rand::thread_rng().fill_bytes(&mut seed[..]);
    // println!("seed: {:?}", seed);
    let seed: [u8; 32] = [
        165, 35, 33, 192, 12, 223, 5, 179, 181, 27, 17, 101, 197, 110, 171, 236, 10, 48, 200, 178,
        22, 106, 209, 27, 213, 179, 143, 64, 78, 135, 141, 242,
    ];

    let mut rng = SmallRng::from_seed(seed);

    static K: usize = 1024;
    let size = K * K;
    let mut all_datapoints = Vec::with_capacity(size * 3);
    for _j in 0..size {
        all_datapoints.push(rng.next_u64());
    }

    all_datapoints.sort();

    let mut intersecting = all_datapoints.clone();
    let ix = rng.gen_range(1..intersecting.len() / 2);
    // Offset everything before the ix by 1, to reduce the # of intersecting datapoints
    for i in 0..ix {
        intersecting[i] -= 1;
    }
    let mut disjoint = all_datapoints.clone();
    // Offset everything by 1, to eliminate all intersecting datapoints
    for i in 0..disjoint.len() {
        disjoint[i] -= 1;
    }

    c.bench_function("intersect l:1024 intersection:0.5", |b| {
        b.iter(|| {
            let mut data = all_datapoints.clone();
            intersect(&mut data, &intersecting);
        })
    });
    c.bench_function("intersect l:1024 intersection:1.0", |b| {
        b.iter(|| {
            let mut data = all_datapoints.clone();
            intersect(&mut data, &all_datapoints);
        })
    });
    c.bench_function("intersect l:1024 intersection:0.0", |b| {
        b.iter(|| {
            let mut data = all_datapoints.clone();
            intersect(&mut data, &disjoint);
        })
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);