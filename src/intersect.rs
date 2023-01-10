use std::{
    cmp::Ordering,
    simd::{simd_swizzle, u64x4, SimdPartialOrd},
};

pub fn intersect(a: &mut [u64], b: &[u64]) -> usize {
    // Rough strategy:
    // We can use SIMD instructions to find long runs of non intersecting values. However, dealing
    // with intersecting values in bulk is going to be a nightmare. So we're going to go through
    // `a` element by element, and simd search b for matches.
    let (b_prefix, b_middle, b_suffix) = b.as_simd::<4>();

    // Our index in `a`
    let mut i = 0;
    // Our index in `b`
    let mut j = 0;
    // The number of intersections (and the place we will write the next intersected value into in
    // a)
    let mut intersect_count = 0;

    // Do the prefix with scalars
    while i < a.len() && j < b_prefix.len() {
        match a[i].cmp(&b_prefix[j]) {
            Ordering::Less => i += 1,
            Ordering::Greater => j += 1,
            _ => {
                a[intersect_count] = b_prefix[j];
                j += 1;
                i += 1;
                intersect_count += 1;
            }
        }
    }

    // j is now the index of a lane in b_middle - each entry in b_middle is 4 lanes wide
    j = 0;
    while i < a.len() && j / 4 < b_middle.len() {
        // If we're offset, we may have issues
        let b_vals = match j % 4 {
            1 => simd_swizzle!(b_middle[j / 4], [1, 1, 2, 3]),
            2 => simd_swizzle!(b_middle[j / 4], [2, 2, 2, 3]),
            3 => simd_swizzle!(b_middle[j / 4], [3, 3, 3, 3]),
            _ => b_middle[j / 4],
        };
        let a_val = u64x4::splat(a[i]);
        // If all lanes are smaller than a, we can skip forwards
        if a_val.simd_gt(b_vals).all() {
            j += 4 - j % 4;
            continue;
        }
        // If all lanes are bigger than a, a was not part of the intersection - move i forward
        if a_val.simd_lt(b_vals).all() {
            i += 1;
            continue;
        }
        // Otherwise, we may have found an intersection. Or at least, within the block, we have a
        // cross over point, and we're going to need to swap to the slow path
        for _ in j % 4..4 {
            match a[i].cmp(&b[b_prefix.len() + j]) {
                Ordering::Less => i += 1,
                Ordering::Greater => j += 1,
                _ => {
                    a[intersect_count] = b[b_prefix.len() + j];
                    j += 1;
                    i += 1;
                    intersect_count += 1;
                }
            }
        }
    }

    // Finally, the suffix. j is now the index in b_suffix
    j = 0;
    while i < a.len() && j < b_suffix.len() {
        match a[i].cmp(&b_suffix[j]) {
            Ordering::Less => i += 1,
            Ordering::Greater => j += 1,
            _ => {
                a[intersect_count] = b_suffix[j];
                j += 1;
                i += 1;
                intersect_count += 1;
            }
        }
    }

    intersect_count
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::{rngs::SmallRng, RngCore, SeedableRng};

    #[test]
    fn test_intersect_example() {
        let mut a = [1, 2, 3, 4, 5];
        let new_len = intersect(&mut a, &[1, 3, 5]);
        assert_eq!(new_len, 3);
        assert_eq!(a[..new_len], [1, 3, 5]);
    }

    #[test]
    fn test_intersect_all() {
        let mut a = [1, 2, 3, 4, 5];
        let b = a.clone();
        let new_len = intersect(&mut a, &b);
        assert_eq!(new_len, a.len());
        assert_eq!(a, b);
    }

    #[test]
    fn test_intersect_fuzz() {
        let mut seed: [u8; 32] = [0; 32];
        rand::thread_rng().fill_bytes(&mut seed[..]);
        println!("seed: {:?}", seed);

        let mut rng = SmallRng::from_seed(seed);

        const TEST_DATA_SIZE: usize = 1024;
        const TEST_ITERATION_COUNT: usize = 10240;
        for _i in 0..TEST_ITERATION_COUNT {
            let mut data = Vec::with_capacity(TEST_DATA_SIZE);
            for _j in 0..TEST_DATA_SIZE {
                data.push(rng.next_u64() % TEST_DATA_SIZE as u64 * 4);
            }
            data.sort();

            let intersection_len = TEST_DATA_SIZE / 2;
            let mut data2 = data.clone();
            data2.rotate_left(intersection_len);

            assert_eq!(
                intersect(&mut data[..], &data2[..intersection_len]),
                intersection_len,
            );
            assert_eq!(data[..intersection_len], data2[..intersection_len]);
        }
    }
}
