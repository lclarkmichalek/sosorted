use std::simd::{cmp::SimdPartialEq, simd_swizzle, Simd};

use crate::simd_element::{SimdMask, SortedSimdElement, SIMD_LANES};

/// Returns the index of the first duplicate entry. If there are no duplicates, the length of the
/// slice is returned.
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
    Simd<T, SIMD_LANES>: SimdPartialEq<Mask = SimdMask<T>>,
{
    // The SIMD loop works on 4 chunks of 4, plus one additional chunk for the look ahead.
    // Practically speaking, there's no point going down that path unless we have less than 5
    // chunks
    if vec.len() < (4 + 1) * SIMD_LANES {
        return find_first_duplicate_scalar(vec);
    }

    let (pref, middle, _suffix) = vec.as_simd::<SIMD_LANES>();
    match find_first_duplicate_scalar(&vec[0..pref.len()]) {
        x if x != pref.len() => return x,
        _ => {}
    };

    // Check that the last element of prefix isn't a duplicate with the next
    if !pref.is_empty() && vec.len() > pref.len() && vec[pref.len() - 1] == vec[pref.len()] {
        return pref.len();
    }

    let mut i = 4;
    while i < middle.len() {
        let chunk1 = middle[i - 4];
        let chunk2 = middle[i - 3];
        let chunk3 = middle[i - 2];
        let chunk4 = middle[i - 1];
        let cmp1 = simd_swizzle!(middle[i - 4], middle[i - 3], [1, 2, 3, 4]);
        let cmp2 = simd_swizzle!(middle[i - 3], middle[i - 2], [1, 2, 3, 4]);
        let cmp3 = simd_swizzle!(middle[i - 2], middle[i - 1], [1, 2, 3, 4]);
        let cmp4 = simd_swizzle!(middle[i - 1], middle[i], [1, 2, 3, 4]);

        let mask1 = cmp1.simd_eq(chunk1);
        let mask2 = cmp2.simd_eq(chunk2);
        let mask3 = cmp3.simd_eq(chunk3);
        let mask4 = cmp4.simd_eq(chunk4);

        if mask1.any() || mask2.any() || mask3.any() || mask4.any() {
            let (chunk_offset, mask) = if mask1.any() {
                (0, mask1)
            } else if mask2.any() {
                (1, mask2)
            } else if mask3.any() {
                (2, mask3)
            } else {
                (3, mask4)
            };
            let lane_offset = if mask.test(0) {
                1
            } else if mask.test(1) {
                2
            } else if mask.test(2) {
                3
            } else {
                4
            };
            return pref.len() + (i - 4 + chunk_offset) * SIMD_LANES + lane_offset;
        }
        i += 4;
    }

    // test the rest by hand. we have not checked the last chunk
    let suffix_start = pref.len() + (i - 4) * SIMD_LANES;
    let suffix_dupe_index = find_first_duplicate_scalar(&vec[suffix_start..]);
    suffix_start + suffix_dupe_index
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
