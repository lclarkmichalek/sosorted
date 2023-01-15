#[macro_use]
extern crate bencher;

use bencher::Bencher;
use rand::{rngs::SmallRng, RngCore, SeedableRng};
use sosorted::find_first_duplicate;
use std::ops::Range;

const N: usize = 1024 * 1024;

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

fn add_duplicates(data: &mut [u64], range: Range<f32>) {
    let mut start = (range.start * data.len() as f32) as usize;
    let mut end = (range.end * data.len() as f32) as usize;
    if start <= 0 {
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

fn find_first_dupe_all_unique(bench: &mut Bencher) {
    let data = unique_data();
    bench.iter(|| {
        find_first_duplicate(&data);
    });
    bench.bytes = N as u64 * 4;
}

fn find_first_dupe_no_unique(bench: &mut Bencher) {
    let mut data = unique_data();
    add_duplicates(&mut data, 0.0..1.0);
    bench.iter(|| {
        find_first_duplicate(&data);
    });
    bench.bytes = N as u64 * 4;
}

benchmark_group!(
    benches,
    find_first_dupe_all_unique,
    find_first_dupe_no_unique
);
benchmark_main!(benches);
