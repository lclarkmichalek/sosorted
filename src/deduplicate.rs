use std::simd::cmp::SimdPartialEq;

use crate::simd_element::{SimdMaskOps, SortedSimdElement};

/// Copies elements from `input` to `out`, removing consecutive duplicates.
/// Returns the number of elements written to `out`.
///
/// This implementation uses Compress & Store with Adaptive Galloping:
/// 1. **Galloping**: Checks if `input[i] == input[i + LANES - 1]`. Since data is sorted,
///    if the first and last elements of a block are equal, the entire block is identical.
///    We can skip it entirely or write just one element.
/// 2. **Compress & Store**: Iterates through the mask to compress unique elements,
///    avoiding branch misprediction on scattered duplicates.
///
/// # Panics
///
/// Panics if `out` is smaller than `input`.
///
/// # Examples
///
/// ```
/// use sosorted::deduplicate;
///
/// let input = [0u64, 1, 1, 2];
/// let mut out = vec![0u64; input.len()];
/// let new_length = deduplicate(&mut out, &input);
/// assert_eq!(out[..new_length], [0, 1, 2]);
/// ```
pub fn deduplicate<T>(out: &mut [T], input: &[T]) -> usize
where
    T: SortedSimdElement,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    assert!(
        out.len() >= input.len(),
        "output slice must be at least as large as input"
    );

    if input.is_empty() {
        return 0;
    }

    let lanes = T::LANES;

    // Write the first element unconditionally
    out[0] = input[0];
    let mut write_pos = 1;
    let mut i = 1;

    // Main SIMD loop with galloping
    while i + lanes <= input.len() {
        // Galloping check: if first and last elements of the block are equal,
        // the entire block is identical (since data is sorted)
        if input[i] == input[i + lanes - 1] {
            // All elements in this block are the same
            // Check if it's different from the last written element
            if input[i] != out[write_pos - 1] {
                out[write_pos] = input[i];
                write_pos += 1;
            }
            i += lanes;
            continue;
        }

        // Load current block and previous block (shifted by 1)
        let curr = T::simd_from_slice(&input[i..i + lanes]);
        let prev = T::simd_from_slice(&input[i - 1..i + lanes - 1]);

        // Compare: mask bit is set where curr != prev (i.e., element is unique)
        let ne_mask = curr.simd_ne(prev);

        // Fast path: all elements are unique
        if ne_mask.all() {
            out[write_pos..write_pos + lanes].copy_from_slice(&input[i..i + lanes]);
            write_pos += lanes;
            i += lanes;
            continue;
        }

        // Compress and store: copy only unique elements
        let mut bitmask = ne_mask.to_bitmask();
        while bitmask != 0 {
            let idx = bitmask.trailing_zeros() as usize;
            out[write_pos] = input[i + idx];
            write_pos += 1;
            // clear the lowest set bit
            bitmask &= bitmask - 1;
        }
        i += lanes;
    }

    // Handle remaining elements with scalar loop
    while i < input.len() {
        if input[i] != out[write_pos - 1] {
            out[write_pos] = input[i];
            write_pos += 1;
        }
        i += 1;
    }

    write_pos
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_deduplicate_empty() {
        let input: Vec<u64> = vec![];
        let mut out: Vec<u64> = vec![];
        let new_len = deduplicate(&mut out[..], &input[..]);
        assert_eq!(new_len, 0);
    }

    #[test]
    fn test_deduplicate_tail_dupe() {
        let input = vec![1u64, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        let mut out = vec![0u64; input.len()];
        let new_len = deduplicate(&mut out[..], &input[..]);
        assert_eq!(new_len, 3);
        assert_eq!(out[0..new_len], [1, 2, 3]);
    }

    #[test]
    fn test_deduplicate_head_tail_dupe() {
        let input = vec![1u64, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
        let mut out = vec![0u64; input.len()];
        let new_len = deduplicate(&mut out[..], &input[..]);
        assert_eq!(new_len, 2);
        assert_eq!(out[0..new_len], [1, 3]);
    }

    #[test]
    fn test_deduplicate_one_early() {
        let input = vec![
            1u64, 2, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
        ];
        let mut out = vec![0u64; input.len()];
        let new_len = deduplicate(&mut out[..], &input[..]);
        assert_eq!(new_len, 17);
        assert_eq!(
            out[0..new_len],
            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
        );
    }

    #[test]
    fn test_deduplicate_many() {
        let input = vec![1u64, 1, 2, 3, 4, 5, 5, 6];
        let mut out = vec![0u64; input.len()];
        let new_len = deduplicate(&mut out[..], &input[..]);
        assert_eq!(out[0..6], [1, 2, 3, 4, 5, 6]);
        assert_eq!(new_len, 6);
    }

    // Tests for different numeric types
    macro_rules! test_deduplicate_type {
        ($name:ident, $t:ty) => {
            #[test]
            fn $name() {
                // Basic test
                let input: Vec<$t> = vec![1, 1, 2, 3, 3, 4];
                let mut out: Vec<$t> = vec![0; input.len()];
                let new_len = deduplicate(&mut out, &input);
                assert_eq!(new_len, 4);
                assert_eq!(&out[..new_len], &[1, 2, 3, 4]);

                // No duplicates
                let input: Vec<$t> = vec![1, 2, 3, 4, 5];
                let mut out: Vec<$t> = vec![0; input.len()];
                assert_eq!(deduplicate(&mut out, &input), 5);

                // All duplicates
                let input: Vec<$t> = vec![5, 5, 5, 5, 5];
                let mut out: Vec<$t> = vec![0; input.len()];
                assert_eq!(deduplicate(&mut out, &input), 1);

                // Large array with scattered duplicates (test SIMD path)
                let input: Vec<$t> = (0..100).map(|x| (x / 2) as $t).collect();
                let mut out: Vec<$t> = vec![0; input.len()];
                let new_len = deduplicate(&mut out, &input);
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
