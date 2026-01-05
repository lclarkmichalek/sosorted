use std::{
    cmp::Ordering,
    simd::{cmp::SimdPartialOrd, Simd},
};

use crate::simd_element::{SimdMask, SortedSimdElement, SIMD_LANES};

/// Computes the intersection of two sorted slices in-place.
///
/// The result is written to the beginning of `a`, and the function returns
/// the number of elements in the intersection.
///
/// # Examples
///
/// ```
/// use sosorted::intersect;
///
/// let mut a = [1u64, 2, 3, 4, 5];
/// let b = [1, 3, 5];
/// let new_len = intersect(&mut a, &b);
/// assert_eq!(new_len, 3);
/// assert_eq!(&a[..new_len], &[1, 3, 5]);
/// ```
pub fn intersect<T>(a: &mut [T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    Simd<T, SIMD_LANES>: SimdPartialOrd<Mask = SimdMask<T>>,
{
    // Rough strategy:
    // We can use SIMD instructions to find long runs of non intersecting values. However, dealing
    // with intersecting values in bulk is going to be a nightmare. So we're going to go through
    // `a` element by element, and simd search b for matches.

    // Our index in `a`
    let mut i = 0;
    // Our index in `b`
    let mut j = 0;
    // The number of intersections (and the place we will write the next intersected value into in
    // a)
    let mut intersect_count = 0;

    while i < a.len() && j + SIMD_LANES < b.len() {
        let b_vals: Simd<T, SIMD_LANES> = Simd::from_slice(&b[j..j + SIMD_LANES]);
        let a_val = Simd::<T, SIMD_LANES>::splat(a[i]);
        // If all lanes are smaller than a, we can skip forwards
        if a_val.simd_gt(b_vals).all() {
            j += SIMD_LANES;
            continue;
        }
        // If all lanes are bigger than a, a was not part of the intersection - move i forward
        if a_val.simd_lt(b_vals).all() {
            i += 1;
            continue;
        }
        // Otherwise, we may have found an intersection. Or at least, within the block, we have a
        // cross over point, and we're going to need to swap to the slow path
        for _ in 0..SIMD_LANES {
            if i >= a.len() || j >= b.len() {
                break;
            }
            match a[i].cmp(&b[j]) {
                Ordering::Less => i += 1,
                Ordering::Greater => j += 1,
                Ordering::Equal => {
                    a[intersect_count] = b[j];
                    j += 1;
                    i += 1;
                    intersect_count += 1;
                }
            }
        }
    }

    // Finally, the suffix that we couldn't fit in a SIMD register
    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => i += 1,
            Ordering::Greater => j += 1,
            Ordering::Equal => {
                a[intersect_count] = b[j];
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
        rand::rng().fill_bytes(&mut seed[..]);
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

    #[test]
    fn test_intersect_boundary_bug() {
        // This test reproduces the bug where the slow path loop runs 4 times
        // without checking bounds, causing an out-of-bounds panic.
        // The bug occurs when we enter the slow path but don't have 4 elements
        // remaining in one of the arrays.

        // Create a scenario where we enter the slow path with exactly 1 element left in `a`
        // We need at least 4 elements in `b` to trigger the SIMD path, and then
        // a crossover that puts us in the slow path with limited elements in `a`
        let mut a = vec![10, 11, 12, 13, 14, 15, 16, 17];
        let b = vec![5, 6, 7, 8, 14, 15, 16, 17];

        let result = intersect(&mut a, &b);
        assert_eq!(result, 4);
        assert_eq!(&a[..result], &[14, 15, 16, 17]);
    }

    // Tests for different numeric types
    macro_rules! test_intersect_type {
        ($name:ident, $t:ty) => {
            #[test]
            fn $name() {
                // Basic test
                let mut a: Vec<$t> = vec![1, 2, 3, 4, 5];
                let b: Vec<$t> = vec![1, 3, 5];
                let new_len = intersect(&mut a, &b);
                assert_eq!(new_len, 3);
                assert_eq!(&a[..new_len], &[1, 3, 5]);

                // Empty intersection
                let mut a: Vec<$t> = vec![1, 2, 3];
                let b: Vec<$t> = vec![4, 5, 6];
                assert_eq!(intersect(&mut a, &b), 0);

                // Large arrays to test SIMD path
                let mut a: Vec<$t> = (0..100).map(|x| x as $t).collect();
                let b: Vec<$t> = (50..150).map(|x| x as $t).collect();
                let new_len = intersect(&mut a, &b);
                assert_eq!(new_len, 50);
                for i in 0..50 {
                    assert_eq!(a[i], (50 + i) as $t);
                }
            }
        };
    }

    test_intersect_type!(test_intersect_u8, u8);
    test_intersect_type!(test_intersect_u16, u16);
    test_intersect_type!(test_intersect_u32, u32);
    test_intersect_type!(test_intersect_i8, i8);
    test_intersect_type!(test_intersect_i16, i16);
    test_intersect_type!(test_intersect_i32, i32);
    test_intersect_type!(test_intersect_i64, i64);
}
