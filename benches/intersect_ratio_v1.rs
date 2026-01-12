use criterion::{black_box, criterion_group, criterion_main, BenchmarkId, Criterion, Throughput};
use rand::rngs::StdRng;
use rand::{Rng, SeedableRng};
use sosorted::intersect;

fn generate_sorted_unique(seed: u64, size: usize, max_val: u64) -> Vec<u64> {
    let mut rng = StdRng::seed_from_u64(seed);
    let mut v: Vec<u64> = (0..size).map(|_| rng.random_range(0..max_val)).collect();
    v.sort();
    v.dedup();
    v
}

fn bench_intersect_v1_ratio(c: &mut Criterion) {
    let mut group = c.benchmark_group("intersect_ratio");

    // V1 target range: 3..50
    // We'll test ratio ~10.
    // Small array: 10k. Large array: 100k.
    let small_size = 10_000;
    let large_size = 100_000;
    let max_val = large_size as u64 * 4; // Sparse enough

    let a = generate_sorted_unique(123, small_size, max_val);
    let b = generate_sorted_unique(456, large_size, max_val);

    // Ensure actual ratio is in range
    let ratio = b.len() as f64 / a.len() as f64;
    println!("Benchmarking ratio: {:.2} (Target V1)", ratio);

    group.throughput(Throughput::Elements((a.len() + b.len()) as u64));

    group.bench_with_input(
        BenchmarkId::new("v1_ratio_10", format!("{}x{}", a.len(), b.len())),
        &(&a, &b),
        |b_bench, (a_arr, b_arr)| {
            b_bench.iter(|| {
                let mut dest = vec![0u64; a_arr.len().min(b_arr.len())];
                black_box(intersect(&mut dest, black_box(a_arr), black_box(b_arr)))
            })
        },
    );

    // Also test dense intersection where the regression might happen
    // Ratio 10, but high overlap.
    let common_count = small_size / 2; // 50% overlap
    let mut b_dense = b.clone();
    // Inject common elements
    for (i, val) in a.iter().take(common_count).enumerate() {
        if i < b_dense.len() {
            b_dense[i] = *val;
        } else {
            b_dense.push(*val);
        }
    }
    b_dense.sort();
    b_dense.dedup();

    group.bench_with_input(
        BenchmarkId::new(
            "v1_ratio_10_dense",
            format!("{}x{}", a.len(), b_dense.len()),
        ),
        &(&a, &b_dense),
        |b_bench, (a_arr, b_arr)| {
            b_bench.iter(|| {
                let mut dest = vec![0u64; a_arr.len().min(b_arr.len())];
                black_box(intersect(&mut dest, black_box(a_arr), black_box(b_arr)))
            })
        },
    );

    group.finish();
}

criterion_group!(benches, bench_intersect_v1_ratio);
criterion_main!(benches);
