use std::{cmp::Ordering, simd::cmp::SimdPartialOrd};

use crate::simd_element::{SimdMaskOps, SortedSimdElement};

/// Calculates the size of the set difference (a \ b) without modifying the input.
///
/// Returns the count of elements in `a` that are NOT in `b`.
///
/// If an element appears in `b`, *all* occurrences of that element in `a` are excluded from the count.
/// Duplicates in `a` that are NOT in `b` are preserved in the count.
///
/// Uses SIMD acceleration to quickly skip over non-overlapping regions.
///
/// # Examples
///
/// ```
/// use sosorted::difference_size;
///
/// let a = [1u64, 2, 3, 4, 5];
/// let b = [2, 4];
/// assert_eq!(difference_size(&a, &b), 3); // [1, 3, 5]
/// ```
pub fn difference_size<T>(a: &[T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialOrd<Mask = T::SimdMask>,
{
    // Handle edge cases
    if a.is_empty() {
        return 0;
    }
    if b.is_empty() {
        return a.len();
    }

    // Fast path: disjoint ranges
    // If max(a) < min(b), no elements of a can be in b
    if a[a.len() - 1] < b[0] {
        return a.len();
    }
    // If max(b) < min(a), no elements of a can be in b
    if b[b.len() - 1] < a[0] {
        return a.len();
    }

    let lanes = T::LANES;
    let mut i = 0;
    let mut j = 0;
    let mut count = 0;

    // SIMD-accelerated loop
    while i < a.len() && j + lanes <= b.len() {
        let b_chunk = T::simd_from_slice(&b[j..j + lanes]);
        let a_splat = T::simd_splat(a[i]);

        // Fast path: all elements in b_chunk are less than a[i]
        // We can skip this entire chunk of b
        if b_chunk.simd_lt(a_splat).all() {
            j += lanes;
            continue;
        }

        // Fast path: a chunk of a is less than b[j]
        // We can include this entire chunk of a
        if i + lanes <= a.len() && b[j] > a[i + lanes - 1] {
            count += lanes;
            i += lanes;
            continue;
        }

        // Fast path: all elements in b_chunk are greater than a[i]
        // a[i] is definitely not in b, count it
        if b_chunk.simd_gt(a_splat).all() {
            count += 1;
            i += 1;
            continue;
        }

        // Slow path: mixed comparison, process element by element
        for _ in 0..lanes {
            if i >= a.len() || j >= b.len() {
                break;
            }

            match a[i].cmp(&b[j]) {
                Ordering::Less => {
                    // a[i] is not in b (at least not at current position)
                    count += 1;
                    i += 1;
                }
                Ordering::Greater => {
                    // Haven't reached a[i] in b yet
                    j += 1;
                }
                Ordering::Equal => {
                    // a[i] is in b, skip ALL duplicates of this value in both arrays
                    let matched_val = a[i];
                    while i < a.len() && a[i] == matched_val {
                        i += 1;
                    }
                    while j < b.len() && b[j] == matched_val {
                        j += 1;
                    }
                }
            }
        }
    }

    // Scalar loop for remaining elements
    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => {
                count += 1;
                i += 1;
            }
            Ordering::Greater => {
                j += 1;
            }
            Ordering::Equal => {
                // Skip ALL duplicates of this value in both arrays
                let matched_val = a[i];
                while i < a.len() && a[i] == matched_val {
                    i += 1;
                }
                while j < b.len() && b[j] == matched_val {
                    j += 1;
                }
            }
        }
    }

    // All remaining elements in a are not in b
    count += a.len() - i;

    count
}

/// Computes the set difference (a \ b).
///
/// Returns elements in `a` that are NOT in `b`. The result is written to `dest`,
/// and the function returns the count of elements in the result.
///
/// If an element appears in `b`, *all* occurrences of that element in `a` are removed.
/// Duplicates in `a` that are NOT in `b` are preserved.
///
/// Uses SIMD acceleration to quickly skip over non-overlapping regions.
///
/// # Arguments
/// * `dest` - Destination buffer for the difference result
/// * `a` - First sorted array (elements to keep if not in b)
/// * `b` - Second sorted array (elements to exclude)
///
/// # Returns
/// The number of elements in the difference
///
/// # Panics
/// Panics if `dest.len() < a.len()` (insufficient capacity for worst case).
///
/// # Examples
///
/// ```
/// use sosorted::difference;
///
/// let a = [1u64, 2, 3, 4, 5];
/// let b = [2, 4];
/// let mut dest = [0u64; 5];
/// let len = difference(&mut dest, &a, &b);
/// assert_eq!(&dest[..len], &[1, 3, 5]);
/// ```
///
/// # Example with duplicates
///
/// ```
/// use sosorted::difference;
///
/// let a = [1u64, 2, 2, 3, 4, 5];
/// let b = [2, 4];
/// let mut dest = [0u64; 6];
/// let len = difference(&mut dest, &a, &b);
/// assert_eq!(&dest[..len], &[1, 3, 5]); // Both 2s were in b, so both removed
/// ```
pub fn difference<T>(dest: &mut [T], a: &[T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialOrd<Mask = T::SimdMask>,
{
    // Handle edge cases
    if a.is_empty() {
        return 0;
    }

    // Check capacity
    assert!(
        dest.len() >= a.len(),
        "Insufficient capacity: dest.len()={}, need at least {}",
        dest.len(),
        a.len()
    );

    if b.is_empty() {
        // All of a is the result, copy to dest
        dest[..a.len()].copy_from_slice(a);
        return a.len();
    }

    // Fast path: disjoint ranges
    // If max(a) < min(b), no elements of a can be in b
    if a[a.len() - 1] < b[0] {
        dest[..a.len()].copy_from_slice(a);
        return a.len();
    }
    // If max(b) < min(a), no elements of a can be in b
    if b[b.len() - 1] < a[0] {
        dest[..a.len()].copy_from_slice(a);
        return a.len();
    }

    let lanes = T::LANES;
    let mut i = 0; // Read position in a
    let mut j = 0; // Position in b
    let mut write = 0; // Write position in dest

    // SIMD-accelerated loop
    while i < a.len() && j + lanes <= b.len() {
        let b_chunk = T::simd_from_slice(&b[j..j + lanes]);
        let a_splat = T::simd_splat(a[i]);

        // Fast path: all elements in b_chunk are less than a[i]
        // We can skip this entire chunk of b
        if b_chunk.simd_lt(a_splat).all() {
            j += lanes;
            continue;
        }

        // Fast path: a chunk of a is less than b[j]
        // We can include this entire chunk of a
        if i + lanes <= a.len() && b[j] > a[i + lanes - 1] {
            dest[write..write + lanes].copy_from_slice(&a[i..i + lanes]);
            write += lanes;
            i += lanes;
            continue;
        }

        // Fast path: all elements in b_chunk are greater than a[i]
        // a[i] is definitely not in b, include it
        if b_chunk.simd_gt(a_splat).all() {
            dest[write] = a[i];
            write += 1;
            i += 1;
            continue;
        }

        // Slow path: mixed comparison, process element by element
        for _ in 0..lanes {
            if i >= a.len() || j >= b.len() {
                break;
            }

            match a[i].cmp(&b[j]) {
                Ordering::Less => {
                    // a[i] is not in b, include it
                    dest[write] = a[i];
                    write += 1;
                    i += 1;
                }
                Ordering::Greater => {
                    // Haven't reached a[i] in b yet
                    j += 1;
                }
                Ordering::Equal => {
                    // a[i] is in b, skip ALL duplicates of this value in both arrays
                    let matched_val = a[i];
                    while i < a.len() && a[i] == matched_val {
                        i += 1;
                    }
                    while j < b.len() && b[j] == matched_val {
                        j += 1;
                    }
                }
            }
        }
    }

    // Scalar loop for remaining elements
    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => {
                dest[write] = a[i];
                write += 1;
                i += 1;
            }
            Ordering::Greater => {
                j += 1;
            }
            Ordering::Equal => {
                // Skip ALL duplicates of this value in both arrays
                let matched_val = a[i];
                while i < a.len() && a[i] == matched_val {
                    i += 1;
                }
                while j < b.len() && b[j] == matched_val {
                    j += 1;
                }
            }
        }
    }

    // Copy remaining elements from a (they're all not in b since b is exhausted)
    while i < a.len() {
        dest[write] = a[i];
        write += 1;
        i += 1;
    }

    write
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::{rngs::SmallRng, RngCore, SeedableRng};

    // ==================== difference_size tests ====================

    #[test]
    fn test_difference_size_basic() {
        let a = [1u64, 2, 3, 4, 5];
        let b = [2u64, 4];
        assert_eq!(difference_size(&a, &b), 3);
    }

    #[test]
    fn test_difference_size_no_overlap() {
        let a = [1u64, 3, 5];
        let b = [2u64, 4, 6];
        assert_eq!(difference_size(&a, &b), 3);
    }

    #[test]
    fn test_difference_size_complete_overlap() {
        let a = [1u64, 2, 3];
        let b = [1u64, 2, 3];
        assert_eq!(difference_size(&a, &b), 0);
    }

    #[test]
    fn test_difference_size_empty_a() {
        let a: [u64; 0] = [];
        let b = [1u64, 2, 3];
        assert_eq!(difference_size(&a, &b), 0);
    }

    #[test]
    fn test_difference_size_empty_b() {
        let a = [1u64, 2, 3];
        let b: [u64; 0] = [];
        assert_eq!(difference_size(&a, &b), 3);
    }

    #[test]
    fn test_difference_size_both_empty() {
        let a: [u64; 0] = [];
        let b: [u64; 0] = [];
        assert_eq!(difference_size(&a, &b), 0);
    }

    #[test]
    fn test_difference_size_a_subset_of_b() {
        let a = [2u64, 4];
        let b = [1u64, 2, 3, 4, 5];
        assert_eq!(difference_size(&a, &b), 0);
    }

    #[test]
    fn test_difference_size_b_subset_of_a() {
        let a = [1u64, 2, 3, 4, 5];
        let b = [2u64, 4];
        assert_eq!(difference_size(&a, &b), 3);
    }

    #[test]
    fn test_difference_size_disjoint_a_lower() {
        let a = [1u64, 2, 3];
        let b = [10u64, 20, 30];
        assert_eq!(difference_size(&a, &b), 3);
    }

    #[test]
    fn test_difference_size_disjoint_a_higher() {
        let a = [10u64, 20, 30];
        let b = [1u64, 2, 3];
        assert_eq!(difference_size(&a, &b), 3);
    }

    #[test]
    fn test_difference_size_with_duplicates_in_a() {
        let a = [1u64, 2, 2, 3, 4, 4, 5];
        let b = [2u64, 4];
        // Both 2s and both 4s are removed
        assert_eq!(difference_size(&a, &b), 3);
    }

    #[test]
    fn test_difference_size_with_duplicates_in_b() {
        let a = [1u64, 2, 3, 4, 5];
        let b = [2u64, 2, 4, 4];
        assert_eq!(difference_size(&a, &b), 3);
    }

    #[test]
    fn test_difference_size_single_elements() {
        let a = [5u64];
        let b = [3u64];
        assert_eq!(difference_size(&a, &b), 1);

        let a = [5u64];
        let b = [5u64];
        assert_eq!(difference_size(&a, &b), 0);
    }

    // ==================== difference tests ====================

    #[test]
    fn test_difference_basic() {
        let a = [1u64, 2, 3, 4, 5];
        let b = [2u64, 4];
        let mut dest = [0u64; 5];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 3, 5]);
    }

    #[test]
    fn test_difference_no_overlap() {
        let a = [1u64, 3, 5];
        let b = [2u64, 4, 6];
        let mut dest = [0u64; 3];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 3, 5]);
    }

    #[test]
    fn test_difference_complete_overlap() {
        let a = [1u64, 2, 3];
        let b = [1u64, 2, 3];
        let mut dest = [0u64; 3];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 0);
    }

    #[test]
    fn test_difference_empty_a() {
        let a: [u64; 0] = [];
        let b = [1u64, 2, 3];
        let mut dest = [0u64; 3];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 0);
    }

    #[test]
    fn test_difference_empty_b() {
        let a = [1u64, 2, 3];
        let b: [u64; 0] = [];
        let mut dest = [0u64; 3];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 2, 3]);
    }

    #[test]
    fn test_difference_both_empty() {
        let a: [u64; 0] = [];
        let b: [u64; 0] = [];
        let mut dest = [0u64; 1];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 0);
    }

    #[test]
    fn test_difference_a_subset_of_b() {
        let a = [2u64, 4];
        let b = [1u64, 2, 3, 4, 5];
        let mut dest = [0u64; 2];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 0);
    }

    #[test]
    fn test_difference_b_subset_of_a() {
        let a = [1u64, 2, 3, 4, 5];
        let b = [2u64, 4];
        let mut dest = [0u64; 5];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 3, 5]);
    }

    #[test]
    fn test_difference_disjoint_a_lower() {
        let a = [1u64, 2, 3];
        let b = [10u64, 20, 30];
        let mut dest = [0u64; 3];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 2, 3]);
    }

    #[test]
    fn test_difference_disjoint_a_higher() {
        let a = [10u64, 20, 30];
        let b = [1u64, 2, 3];
        let mut dest = [0u64; 3];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[10, 20, 30]);
    }

    #[test]
    fn test_difference_with_duplicates_in_a() {
        let a = [1u64, 2, 2, 3, 4, 4, 5];
        let b = [2u64, 4];
        let mut dest = [0u64; 7];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 3, 5]);
    }

    #[test]
    fn test_difference_with_duplicates_in_b() {
        let a = [1u64, 2, 3, 4, 5];
        let b = [2u64, 2, 4, 4];
        let mut dest = [0u64; 5];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 3, 5]);
    }

    #[test]
    fn test_difference_preserves_duplicates_not_in_b() {
        let a = [1u64, 1, 2, 3, 3, 3, 4, 5, 5];
        let b = [2u64, 4];
        let mut dest = [0u64; 9];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 7);
        assert_eq!(&dest[..len], &[1, 1, 3, 3, 3, 5, 5]);
    }

    #[test]
    fn test_difference_single_elements() {
        let a = [5u64];
        let b = [3u64];
        let mut dest = [0u64; 1];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 1);
        assert_eq!(&dest[..len], &[5]);

        let a = [5u64];
        let b = [5u64];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 0);
    }

    // ==================== SIMD-specific tests ====================

    #[test]
    fn test_difference_simd_aligned() {
        // Test with exactly 4 elements (one SIMD chunk) in b
        let a = [1u64, 2, 3, 4, 5, 6, 7, 8];
        let b = [2u64, 4, 6, 8];
        let mut dest = [0u64; 8];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 4);
        assert_eq!(&dest[..len], &[1, 3, 5, 7]);
    }

    #[test]
    fn test_difference_simd_all_b_less_than_a() {
        // Fast path: all b elements less than current a element
        let a = [100u64, 101, 102, 103, 104, 105, 106, 107];
        let b = [1u64, 2, 3, 4, 5, 6, 7, 8];
        let mut dest = [0u64; 8];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 8);
        assert_eq!(&dest[..len], &[100, 101, 102, 103, 104, 105, 106, 107]);
    }

    #[test]
    fn test_difference_simd_all_b_greater_than_a() {
        // Fast path: all b elements greater than current a element
        let a = [1u64, 2, 3, 4, 5, 6, 7, 8];
        let b = [100u64, 101, 102, 103, 104, 105, 106, 107];
        let mut dest = [0u64; 8];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 8);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5, 6, 7, 8]);
    }

    #[test]
    fn test_difference_simd_long_run_from_a() {
        // Long run where we include many elements from a
        let a: Vec<u64> = (1..=20).collect();
        let b = [100u64, 101, 102, 103]; // All greater than a
        let mut dest = vec![0u64; 20];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 20);
        assert_eq!(&dest[..len], &(1..=20).collect::<Vec<_>>()[..]);
    }

    #[test]
    fn test_difference_simd_interleaved() {
        // Heavily interleaved data
        let a: Vec<u64> = (1..=16).collect();
        let b: Vec<u64> = (1..=16).step_by(2).collect(); // [1, 3, 5, 7, 9, 11, 13, 15]
        let mut dest = vec![0u64; 16];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 8);
        assert_eq!(&dest[..len], &[2, 4, 6, 8, 10, 12, 14, 16]);
    }

    #[test]
    fn test_difference_simd_boundary() {
        // Test at SIMD chunk boundaries
        let a = [1u64, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let b = [4u64, 5, 6, 7, 8, 9, 10, 11]; // Overlaps middle
        let mut dest = [0u64; 12];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 4);
        assert_eq!(&dest[..len], &[1, 2, 3, 12]);
    }

    #[test]
    fn test_difference_simd_unaligned_sizes() {
        // Sizes that don't align with SIMD width
        let a = [1u64, 2, 3, 4, 5];
        let b = [2u64, 4, 6];
        let mut dest = [0u64; 5];
        let len = difference(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 3, 5]);
    }

    #[test]
    fn test_difference_simd_large_arrays() {
        // Large arrays to test SIMD performance
        let a_data: Vec<u64> = (0..1000).collect();
        let b_data: Vec<u64> = (0..1000).step_by(2).collect(); // Even numbers

        let expected_size = difference_size(&a_data, &b_data);
        let mut dest = vec![0u64; 1000];
        let len = difference(&mut dest, &a_data, &b_data);

        assert_eq!(len, expected_size);
        assert_eq!(len, 500); // Odd numbers 1, 3, 5, ..., 999

        // Verify result is correct
        for (i, &value) in dest.iter().enumerate().take(len) {
            assert_eq!(value, (i * 2 + 1) as u64);
        }
    }

    // ==================== Fuzz tests ====================

    #[test]
    fn test_difference_fuzz() {
        let mut seed: [u8; 32] = [0; 32];
        rand::rng().fill_bytes(&mut seed[..]);
        println!("seed: {:?}", seed);

        let mut rng = SmallRng::from_seed(seed);

        const TEST_DATA_SIZE: usize = 256;
        const TEST_ITERATION_COUNT: usize = 1000;

        for _ in 0..TEST_ITERATION_COUNT {
            // Generate two random sorted arrays
            let a_size = (rng.next_u64() % TEST_DATA_SIZE as u64) as usize;
            let b_size = (rng.next_u64() % TEST_DATA_SIZE as u64) as usize;

            let mut a_data = Vec::with_capacity(a_size);
            for _ in 0..a_size {
                a_data.push(rng.next_u64() % (TEST_DATA_SIZE as u64 * 2));
            }
            a_data.sort();

            let mut b_data = Vec::with_capacity(b_size);
            for _ in 0..b_size {
                b_data.push(rng.next_u64() % (TEST_DATA_SIZE as u64 * 2));
            }
            b_data.sort();

            // Calculate expected size
            let expected_size = difference_size(&a_data, &b_data);

            // Perform difference
            let mut dest = vec![0u64; a_data.len().max(1)];
            let actual_size = difference(&mut dest, &a_data, &b_data);

            // Verify size matches
            assert_eq!(
                actual_size, expected_size,
                "Size mismatch: expected {}, got {}",
                expected_size, actual_size
            );

            // Verify result is sorted
            for i in 1..actual_size {
                assert!(
                    dest[i - 1] <= dest[i],
                    "Result not sorted at index {}: {} > {}",
                    i,
                    dest[i - 1],
                    dest[i]
                );
            }

            // Verify all elements in result were in original a
            let result = &dest[..actual_size];
            for &elem in result {
                assert!(
                    a_data.binary_search(&elem).is_ok(),
                    "Element {} in result was not in original a",
                    elem
                );
            }

            // Verify no elements in result are in b
            for &elem in result {
                assert!(
                    b_data.binary_search(&elem).is_err(),
                    "Element {} in result should not be in b",
                    elem
                );
            }

            // Verify all elements from a that are not in b are in result
            for &elem in &a_data {
                if b_data.binary_search(&elem).is_err() {
                    assert!(
                        result.binary_search(&elem).is_ok(),
                        "Element {} from a (not in b) should be in result",
                        elem
                    );
                }
            }
        }
    }

    #[test]
    fn test_difference_size_fuzz() {
        let mut seed: [u8; 32] = [0; 32];
        rand::rng().fill_bytes(&mut seed[..]);
        println!("seed: {:?}", seed);

        let mut rng = SmallRng::from_seed(seed);

        const TEST_DATA_SIZE: usize = 256;
        const TEST_ITERATION_COUNT: usize = 1000;

        for _ in 0..TEST_ITERATION_COUNT {
            let a_size = (rng.next_u64() % TEST_DATA_SIZE as u64) as usize;
            let b_size = (rng.next_u64() % TEST_DATA_SIZE as u64) as usize;

            let mut a_data = Vec::with_capacity(a_size);
            for _ in 0..a_size {
                a_data.push(rng.next_u64() % (TEST_DATA_SIZE as u64 * 2));
            }
            a_data.sort();

            let mut b_data = Vec::with_capacity(b_size);
            for _ in 0..b_size {
                b_data.push(rng.next_u64() % (TEST_DATA_SIZE as u64 * 2));
            }
            b_data.sort();

            // Calculate expected size using naive method
            let mut expected = 0;
            let mut i = 0;
            let mut j = 0;
            while i < a_data.len() {
                if j >= b_data.len() {
                    expected += a_data.len() - i;
                    break;
                }
                match a_data[i].cmp(&b_data[j]) {
                    Ordering::Less => {
                        expected += 1;
                        i += 1;
                    }
                    Ordering::Greater => {
                        j += 1;
                    }
                    Ordering::Equal => {
                        // Skip ALL duplicates of matched value in both arrays
                        let matched_val = a_data[i];
                        while i < a_data.len() && a_data[i] == matched_val {
                            i += 1;
                        }
                        while j < b_data.len() && b_data[j] == matched_val {
                            j += 1;
                        }
                    }
                }
            }

            let actual = difference_size(&a_data, &b_data);
            assert_eq!(
                actual, expected,
                "Size mismatch: expected {}, got {}",
                expected, actual
            );
        }
    }

    #[test]
    fn test_difference_specific_seed() {
        // Placeholder for debugging specific failing seeds
        let seed: [u8; 32] = [0; 32];
        let mut rng = SmallRng::from_seed(seed);

        const TEST_DATA_SIZE: usize = 256;
        let a_size = (rng.next_u64() % TEST_DATA_SIZE as u64) as usize;
        let b_size = (rng.next_u64() % TEST_DATA_SIZE as u64) as usize;

        let mut a_data = Vec::with_capacity(a_size);
        for _ in 0..a_size {
            a_data.push(rng.next_u64() % (TEST_DATA_SIZE as u64 * 2));
        }
        a_data.sort();

        let mut b_data = Vec::with_capacity(b_size);
        for _ in 0..b_size {
            b_data.push(rng.next_u64() % (TEST_DATA_SIZE as u64 * 2));
        }
        b_data.sort();

        let expected_size = difference_size(&a_data, &b_data);
        let mut dest = vec![0u64; a_data.len().max(1)];
        let actual_size = difference(&mut dest, &a_data, &b_data);

        assert_eq!(actual_size, expected_size);
    }

    // ==================== Tests for different numeric types ====================

    macro_rules! test_difference_type {
        ($name:ident, $t:ty) => {
            #[test]
            fn $name() {
                // Basic difference
                let a: Vec<$t> = vec![1, 2, 3, 4, 5];
                let b: Vec<$t> = vec![2, 4];
                let mut dest = vec![0 as $t; 5];
                let len = difference(&mut dest, &a, &b);
                assert_eq!(len, 3);
                assert_eq!(&dest[..len], &[1, 3, 5]);

                // No overlap
                let a: Vec<$t> = vec![1, 2, 3];
                let b: Vec<$t> = vec![4, 5, 6];
                let mut dest = vec![0 as $t; 3];
                let len = difference(&mut dest, &a, &b);
                assert_eq!(len, 3);
                assert_eq!(&dest[..len], &[1, 2, 3]);

                // Complete overlap
                let a: Vec<$t> = vec![1, 2, 3];
                let b: Vec<$t> = vec![1, 2, 3];
                let mut dest = vec![0 as $t; 3];
                let len = difference(&mut dest, &a, &b);
                assert_eq!(len, 0);

                // difference_size test
                let a: Vec<$t> = vec![1, 3, 5, 7];
                let b: Vec<$t> = vec![2, 3, 6, 7];
                assert_eq!(difference_size(&a, &b), 2);

                // Large arrays to test SIMD path
                let a: Vec<$t> = (0..50).map(|x| x as $t).collect();
                let b: Vec<$t> = (25..75).map(|x| x as $t).collect();
                let mut dest = vec![0 as $t; 50];
                let len = difference(&mut dest, &a, &b);
                assert_eq!(len, 25);
                for i in 0..25 {
                    assert_eq!(dest[i], i as $t);
                }
            }
        };
    }

    test_difference_type!(test_difference_u8, u8);
    test_difference_type!(test_difference_u16, u16);
    test_difference_type!(test_difference_u32, u32);
    test_difference_type!(test_difference_i8, i8);
    test_difference_type!(test_difference_i16, i16);
    test_difference_type!(test_difference_i32, i32);
    test_difference_type!(test_difference_i64, i64);
}
