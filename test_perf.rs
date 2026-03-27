use std::time::Instant;
use sosorted::{union, difference};
use rand::{rngs::StdRng, RngCore, SeedableRng};

fn main() {
    let mut rng = StdRng::seed_from_u64(42);
    let size_a = 100000;
    let size_b = 80000;

    let mut a = Vec::with_capacity(size_a);
    let mut b = Vec::with_capacity(size_b);

    for _ in 0..size_a {
        a.push(rng.next_u64() % (size_a as u64 * 2));
    }
    for _ in 0..size_b {
        b.push(rng.next_u64() % (size_a as u64 * 2));
    }

    a.sort_unstable();
    b.sort_unstable();

    let mut dest_union = vec![0; size_a + size_b];
    let mut dest_diff = vec![0; size_a];

    // Warmup
    for _ in 0..10 {
        let _ = union(&mut dest_union, &a, &b);
        let _ = difference(&mut dest_diff, &a, &b);
    }

    let start_union = Instant::now();
    for _ in 0..100 {
        let _ = union(&mut dest_union, &a, &b);
    }
    let union_duration = start_union.elapsed();

    let start_diff = Instant::now();
    for _ in 0..100 {
        let _ = difference(&mut dest_diff, &a, &b);
    }
    let diff_duration = start_diff.elapsed();

    println!("Union: {:?}", union_duration);
    println!("Difference: {:?}", diff_duration);
}
