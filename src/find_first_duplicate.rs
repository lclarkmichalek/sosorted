use std::simd::cmp::SimdPartialEq;

use crate::simd_element::{SimdMaskOps, SortedSimdElement};

/// Returns the index of the second element of the first duplicate pair found. If there are no duplicates, the length of the slice is returned.
///
/// # Examples
///
/// ```
/// use sosorted::find_first_duplicate;
///
/// let data = vec![0u64, 1, 2, 2];
/// assert_eq!(3, find_first_duplicate(&data[..]));
/// ```
pub fn find_first_duplicate<T>(vec: &[T]) -> usize
where
    T: SortedSimdElement,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    let lanes = T::LANES;

    // Need at least 2 elements for there to be a duplicate
    if vec.len() < 2 {
        return vec.len();
    }

    // For small arrays or when SIMD won't help much, use scalar
    // We need at least lanes + 1 elements for the SIMD loop to make sense
    if vec.len() < lanes + 1 {
        return find_first_duplicate_scalar(vec);
    }

    let mut i = 0;

    // Unrolled loop: process 4 chunks at a time (4x unrolling)
    // We need enough space for 4 * lanes + 1 (shifted) elements
    while i + 4 * lanes < vec.len() {
        let chunk1 = T::simd_from_slice(&vec[i..i + lanes]);
        let next1 = T::simd_from_slice(&vec[i + 1..i + lanes + 1]);

        let chunk2 = T::simd_from_slice(&vec[i + lanes..i + 2 * lanes]);
        let next2 = T::simd_from_slice(&vec[i + lanes + 1..i + 2 * lanes + 1]);

        let chunk3 = T::simd_from_slice(&vec[i + 2 * lanes..i + 3 * lanes]);
        let next3 = T::simd_from_slice(&vec[i + 2 * lanes + 1..i + 3 * lanes + 1]);

        let chunk4 = T::simd_from_slice(&vec[i + 3 * lanes..i + 4 * lanes]);
        let next4 = T::simd_from_slice(&vec[i + 3 * lanes + 1..i + 4 * lanes + 1]);

        let mask1 = chunk1.simd_eq(next1);
        let mask2 = chunk2.simd_eq(next2);
        let mask3 = chunk3.simd_eq(next3);
        let mask4 = chunk4.simd_eq(next4);

        // Optimization: Check combined mask to reduce branching in the common case (no duplicates)
        if (mask1 | mask2 | mask3 | mask4).any() {
            if mask1.any() {
                return i + mask1.to_bitmask().trailing_zeros() as usize + 1;
            }
            if mask2.any() {
                return i + lanes + mask2.to_bitmask().trailing_zeros() as usize + 1;
            }
            if mask3.any() {
                return i + 2 * lanes + mask3.to_bitmask().trailing_zeros() as usize + 1;
            }
            if mask4.any() {
                return i + 3 * lanes + mask4.to_bitmask().trailing_zeros() as usize + 1;
            }
        }

        i += 4 * lanes;
    }

    // Process remaining chunks (2x unrolling fallback if possible, or just standard loop)
    // Let's stick to standard loop for simplicity of tail handling, as 2x unrolling is already handled by original code logic structure but we replaced it.
    // Actually, we can keep the 2x loop if we want, but simple loop is fine for tail.

    // Process remaining chunks (one at a time)
    // For each position i, we compare vec[i..i+lanes] with vec[i+1..i+lanes+1]
    while i + lanes < vec.len() {
        let current = T::simd_from_slice(&vec[i..i + lanes]);
        let next = T::simd_from_slice(&vec[i + 1..i + lanes + 1]);
        let mask = current.simd_eq(next);

        if mask.any() {
            return i + mask.to_bitmask().trailing_zeros() as usize + 1;
        }

        i += lanes;
    }

    // Scalar fallback for remaining elements
    let scalar_result = find_first_duplicate_scalar(&vec[i..]);
    if scalar_result < vec.len() - i {
        i + scalar_result
    } else {
        vec.len()
    }
}

#[inline(always)]
fn find_first_duplicate_scalar<T: PartialEq>(vec: &[T]) -> usize {
    for i in 1..vec.len() {
        if vec[i] == vec[i - 1] {
            return i;
        }
    }
    vec.len()
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::rngs::SmallRng;
    use rand::{RngCore, SeedableRng};

    #[test]
    fn test_first_dupe() {
        let data = vec![
            1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 11, 12, 13, 14, 15, 16, 17, 18, 18, 18, 18, 18, 18,
            18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18,
            18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18,
        ];
        let first_dupe = find_first_duplicate(&data[..]);
        assert_eq!(first_dupe, 9);
        assert_eq!(first_dupe, find_first_duplicate_scalar(&data[..]));
    }

    #[test]
    fn test_find_first_dupe_fuzz() {
        let mut seed: [u8; 32] = [0; 32];
        rand::rng().fill_bytes(&mut seed[..]);
        println!("seed: {:?}", seed);

        let mut rng = SmallRng::from_seed(seed);

        const TEST_DATA_SIZE: usize = 1024;
        const TEST_ITERATION_COUNT: usize = 10240;
        for _i in 0..TEST_ITERATION_COUNT {
            let mut data = Vec::with_capacity(TEST_DATA_SIZE);
            for _j in 0..TEST_DATA_SIZE {
                data.push(rng.next_u64());
            }

            data.sort();

            assert_eq!(
                find_first_duplicate(&data[..]),
                find_first_duplicate_scalar(&data[..]),
            );
        }
    }

    // Tests for different numeric types
    macro_rules! test_find_first_duplicate_type {
        ($name:ident, $t:ty) => {
            #[test]
            fn $name() {
                // No duplicates
                let data: Vec<$t> = vec![1, 2, 3, 4, 5];
                assert_eq!(find_first_duplicate(&data), data.len());

                // Duplicate at the beginning
                let data: Vec<$t> = vec![1, 1, 2, 3, 4];
                assert_eq!(find_first_duplicate(&data), 1);

                // Duplicate at the end
                let data: Vec<$t> = vec![1, 2, 3, 4, 4];
                assert_eq!(find_first_duplicate(&data), 4);

                // Large array with no duplicates (test SIMD path)
                let data: Vec<$t> = (0..100).map(|x| x as $t).collect();
                assert_eq!(find_first_duplicate(&data), 100);

                // Large array with duplicate in middle
                let mut data: Vec<$t> = (0..100).map(|x| x as $t).collect();
                data[50] = data[49]; // Create duplicate
                assert_eq!(find_first_duplicate(&data), 50);
            }
        };
    }

    test_find_first_duplicate_type!(test_find_first_duplicate_u8, u8);
    test_find_first_duplicate_type!(test_find_first_duplicate_u16, u16);
    test_find_first_duplicate_type!(test_find_first_duplicate_u32, u32);
    test_find_first_duplicate_type!(test_find_first_duplicate_i8, i8);
    test_find_first_duplicate_type!(test_find_first_duplicate_i16, i16);
    test_find_first_duplicate_type!(test_find_first_duplicate_i32, i32);
    test_find_first_duplicate_type!(test_find_first_duplicate_i64, i64);
}
