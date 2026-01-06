use std::simd::cmp::SimdPartialEq;

use crate::find_first_duplicate;
use crate::simd_element::{SimdMaskOps, SortedSimdElement};

/// Removes repeated elements in the slice. Returns the length of the prefix that does not contain
/// repeated elements.
///
/// Elements past the prefix contain undefined garbage.
///
/// # Examples
///
/// ```
/// use sosorted::deduplicate;
///
/// let mut data = vec![0u64, 1, 1, 2];
/// let new_length = deduplicate(&mut data);
/// assert_eq!(data[..new_length], [0, 1, 2]);
/// ```
pub fn deduplicate<T>(data: &mut [T]) -> usize
where
    T: SortedSimdElement,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    let dupe_ix = find_first_duplicate(data);
    if dupe_ix == data.len() {
        return data.len();
    }

    let lanes = T::LANES;

    // Ok, so how we've found the first dupe. How do we proceed? Start from the position before,
    // so we "detect" the dupe again
    let mut dupe_count = 0;
    let mut i = dupe_ix - 1;
    if data.len() > lanes + 1 {
        while i < data.len() - (lanes + 1) {
            let src = T::simd_from_slice(&data[i..i + lanes]);
            let cmp = T::simd_from_slice(&data[i + 1..i + lanes + 1]);
            let mask = src.simd_eq(cmp);

            if mask.all() {
                // Fast path - all dupes
                dupe_count += lanes;
                i += lanes;
                continue;
            }
            if !mask.any() {
                // Fast path - no dupes
                data.copy_within(i..i + lanes, i - dupe_count);
                i += lanes;
                continue;
            }

            // Slow path - process each lane individually
            for lane in 0..lanes {
                if mask.test(lane) {
                    dupe_count += 1;
                } else {
                    data[i + lane - dupe_count] = data[i + lane];
                }
            }

            i += lanes;
        }
    }

    // At this point, data between 0 and i has been deduplicated. i to i-dupe_count are junk
    while i < data.len() {
        let write_pos = i - dupe_count;
        // Check if there's a previous element to compare with
        if write_pos > 0 && data[i] == data[write_pos - 1] {
            dupe_count += 1;
        } else {
            data[write_pos] = data[i];
        }
        i += 1;
    }
    data.len() - dupe_count
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_deduplicate_empty() {
        let mut data: Vec<u64> = vec![];
        let new_len = deduplicate(&mut data[..]);
        assert_eq!(new_len, 0);
    }

    #[test]
    fn test_deduplicate_tail_dupe() {
        let mut data = vec![1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        let new_len = deduplicate(&mut data[..]);
        assert_eq!(new_len, 3);
        assert_eq!(data[0..new_len], [1, 2, 3]);
    }

    #[test]
    fn test_deduplicate_head_tail_dupe() {
        let mut data = vec![1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        let new_len = deduplicate(&mut data[..]);
        assert_eq!(new_len, 2);
        assert_eq!(data[0..new_len], [1, 3]);
    }

    #[test]
    fn test_deduplicate_one_early() {
        let mut data = vec![1, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
        let new_len = deduplicate(&mut data[..]);
        assert_eq!(new_len, 17);
        assert_eq!(
            data[0..new_len],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        );
    }

    #[test]
    fn test_deduplicate_many() {
        let mut data = [1, 1, 2, 3, 4, 5, 5, 6];
        let new_len = deduplicate(&mut data[..]);
        assert_eq!(data[0..6], [1, 2, 3, 4, 5, 6]);
        assert_eq!(new_len, 6);
    }

    // Tests for different numeric types
    macro_rules! test_deduplicate_type {
        ($name:ident, $t:ty) => {
            #[test]
            fn $name() {
                // Basic test
                let mut data: Vec<$t> = vec![1, 1, 2, 3, 3, 4];
                let new_len = deduplicate(&mut data);
                assert_eq!(new_len, 4);
                assert_eq!(&data[..new_len], &[1, 2, 3, 4]);

                // No duplicates
                let mut data: Vec<$t> = vec![1, 2, 3, 4, 5];
                assert_eq!(deduplicate(&mut data), 5);

                // All duplicates
                let mut data: Vec<$t> = vec![5, 5, 5, 5, 5];
                assert_eq!(deduplicate(&mut data), 1);

                // Large array with scattered duplicates (test SIMD path)
                let mut data: Vec<$t> = (0..100).map(|x| (x / 2) as $t).collect();
                let new_len = deduplicate(&mut data);
                assert_eq!(new_len, 50);
            }
        };
    }

    test_deduplicate_type!(test_deduplicate_u8, u8);
    test_deduplicate_type!(test_deduplicate_u16, u16);
    test_deduplicate_type!(test_deduplicate_u32, u32);
    test_deduplicate_type!(test_deduplicate_i8, i8);
    test_deduplicate_type!(test_deduplicate_i16, i16);
    test_deduplicate_type!(test_deduplicate_i32, i32);
    test_deduplicate_type!(test_deduplicate_i64, i64);
}
