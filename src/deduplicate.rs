use std::simd::{u64x4, Simd, SimdPartialEq};

use crate::find_first_duplicate;

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
/// let mut data = vec![0, 1, 1, 2];
/// let new_length = deduplicate(&mut data);
/// assert_eq!(data[..new_length], [0, 1, 2]);
/// ```
pub fn deduplicate(data: &mut [u64]) -> usize {
    let dupe_ix = find_first_duplicate(data);
    if dupe_ix == data.len() {
        return data.len();
    }

    // Ok, so how we've found the first dupe. How do we proceed? Start from the position before,
    // so we "detect" the dupe again
    let mut dupe_count = 0;
    let mut i = dupe_ix - 1;
    if data.len() > 5 {
        while i < data.len() - 5 {
            let src: u64x4 = Simd::from_slice(&data[i..i + 4]);
            let cmp: u64x4 = Simd::from_slice(&data[i + 1..i + 5]);
            let mask = src.simd_eq(cmp);

            if mask.all() {
                // Fast path - all dupes
                dupe_count += 4;
                i += 4;
                continue;
            }
            if !mask.any() {
                // Fast path - no dupes
                data.copy_within(i..i + 4, i - dupe_count);
                i += 4;
                continue;
            }

            // Slow path
            if mask.test(0) {
                dupe_count += 1;
            } else {
                data[i - dupe_count] = data[i];
            }
            if mask.test(1) {
                dupe_count += 1;
            } else {
                data[i + 1 - dupe_count] = data[i + 1];
            }
            if mask.test(2) {
                dupe_count += 1;
            } else {
                data[i + 2 - dupe_count] = data[i + 2];
            }
            if mask.test(3) {
                dupe_count += 1;
            } else {
                data[i + 3 - dupe_count] = data[i + 3];
            }

            i += 4;
        }
    }

    // At this point, data between 0 and i has been deduplicated. i to i-dupe_count are junk
    while i < data.len() {
        if data[i] == data[i - dupe_count - 1] {
            dupe_count += 1;
        } else {
            data[i - dupe_count] = data[i];
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
        let mut data = vec![1, 1, 2, 3, 4, 5, 5, 6];
        let new_len = deduplicate(&mut data[..]);
        assert_eq!(data[0..6], [1, 2, 3, 4, 5, 6]);
        assert_eq!(new_len, 6);
    }
}
