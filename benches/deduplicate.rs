use criterion::{criterion_group, criterion_main, Criterion};
use rand::{rngs::SmallRng, Rng, RngCore, SeedableRng};
use sosorted::deduplicate;

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
    let mut data = Vec::with_capacity(size);
    for _j in 0..size {
        data.push(rng.next_u64());
    }

    data.sort();

    let unique = data.clone();
    let mut with_duplicates = data.clone();
    let ix = rng.gen_range(1..with_duplicates.len());
    with_duplicates[ix] = with_duplicates[ix] - 1;

    c.bench_function("deduplicate l:1024 d:0", |b| {
        b.iter(|| {
            let mut data = unique.clone();
            deduplicate(&mut data[..]);
        })
    });
    c.bench_function("deduplicate l:1024 d:1", |b| {
        b.iter(|| {
            let mut data = with_duplicates.clone();
            deduplicate(&mut data[..]);
        })
    });

    c.bench_function("deduplicate naive l:1024 d:0", |b| {
        b.iter(|| {
            let mut data = unique.clone();
            naive_deduplicate(&mut data[..]);
        })
    });
    c.bench_function("deduplicate naive l:1024 d:1", |b| {
        b.iter(|| {
            let mut data = with_duplicates.clone();
            naive_deduplicate(&mut data[..]);
        })
    });
}

criterion_group!(benches, criterion_benchmark);
criterion_main!(benches);
