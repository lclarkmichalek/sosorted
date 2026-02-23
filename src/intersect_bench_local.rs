
#[cfg(test)]
mod bench_manual {
    use super::*;
    use std::time::Instant;
    use std::hint::black_box;

    #[test]
    #[ignore]
    fn bench_intersect_v1_perf() {
        // Setup data for V1 case (ratio ~10:1)
        let size = 100_000;
        let a: Vec<u64> = (0..size).map(|x| x * 10).collect(); // 0, 10, 20...
        let b: Vec<u64> = (0..size*10).map(|x| x).collect();   // 0, 1, 2...
        // Intersection is all elements of a.

        // Warmup
        let mut dest = vec![0u64; size];
        for _ in 0..10 {
            black_box(intersect(black_box(&mut dest), black_box(&a), black_box(&b)));
        }

        let iterations = 100;
        let start = Instant::now();
        for _ in 0..iterations {
            black_box(intersect(black_box(&mut dest), black_box(&a), black_box(&b)));
        }
        let duration = start.elapsed();
        println!("V1 Intersect Time: {:?}", duration / iterations as u32);
    }
}
