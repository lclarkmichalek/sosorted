use std::{
    cmp::Ordering,
    simd::{cmp::SimdPartialOrd, Simd},
};

use crate::simd_element::{SimdMask, SortedSimdElement, SIMD_LANES};

/// Calculates the size of the union of two sorted arrays without allocating.
///
/// # Examples
///
/// ```
/// use sosorted::union_size;
///
/// let a = [1u64, 3, 5];
/// let b = [2u64, 3, 4];
/// assert_eq!(union_size(&a, &b), 5); // [1, 2, 3, 4, 5]
/// ```
pub fn union_size<T>(a: &[T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
{
    let mut i = 0;
    let mut j = 0;
    let mut count = 0;
    let mut last_value: Option<T> = None;

    while i < a.len() && j < b.len() {
        let val = match a[i].cmp(&b[j]) {
            Ordering::Less => {
                let v = a[i];
                i += 1;
                v
            }
            Ordering::Greater => {
                let v = b[j];
                j += 1;
                v
            }
            Ordering::Equal => {
                let v = a[i];
                i += 1;
                j += 1;
                v
            }
        };

        if last_value != Some(val) {
            count += 1;
            last_value = Some(val);
        }
    }

    // Add remaining elements from a, deduplicating
    while i < a.len() {
        if last_value != Some(a[i]) {
            count += 1;
            last_value = Some(a[i]);
        }
        i += 1;
    }

    // Add remaining elements from b, deduplicating
    while j < b.len() {
        if last_value != Some(b[j]) {
            count += 1;
            last_value = Some(b[j]);
        }
        j += 1;
    }

    count
}

/// Computes the union of two sorted arrays, merging them into a destination buffer.
///
/// The destination buffer must have sufficient capacity to hold the union result.
/// In the worst case (no overlapping elements), the required capacity is `a.len() + b.len()`.
///
/// Returns the length of the union. Elements past this length contain undefined data.
///
/// # Examples
///
/// ```
/// use sosorted::union;
///
/// let a = [1u64, 3, 5];
/// let b = [2u64, 3, 4];
/// let mut dest = [0u64; 6];  // Max possible size
/// let union_len = union(&mut dest, &a, &b);
/// assert_eq!(&dest[..union_len], &[1, 2, 3, 4, 5]);
/// ```
///
/// # Panics
///
/// Panics if `dest.len() < a.len() + b.len()` (insufficient capacity).
pub fn union<T>(dest: &mut [T], a: &[T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    Simd<T, SIMD_LANES>: SimdPartialOrd<Mask = SimdMask<T>>,
{
    // Handle edge cases
    if a.is_empty() && b.is_empty() {
        return 0;
    }
    if a.is_empty() {
        // Deduplicate b into dest
        dest[0] = b[0];
        let mut write = 1;
        for i in 1..b.len() {
            if b[i] != b[i - 1] {
                dest[write] = b[i];
                write += 1;
            }
        }
        return write;
    }
    if b.is_empty() {
        // Deduplicate a into dest
        dest[0] = a[0];
        let mut write = 1;
        for i in 1..a.len() {
            if a[i] != a[i - 1] {
                dest[write] = a[i];
                write += 1;
            }
        }
        return write;
    }

    // Verify we have enough capacity
    assert!(
        dest.len() >= a.len() + b.len(),
        "Insufficient capacity: dest.len()={}, a.len()={}, b.len()={}, need at least {}",
        dest.len(),
        a.len(),
        b.len(),
        a.len() + b.len()
    );

    // Fast path: disjoint ranges
    if a[a.len() - 1] < b[0] {
        // All of a comes before all of b - copy both with deduplication
        dest[0] = a[0];
        let mut write = 1;
        for i in 1..a.len() {
            if a[i] != a[i - 1] {
                dest[write] = a[i];
                write += 1;
            }
        }
        // Append b
        if b[0] != dest[write - 1] {
            dest[write] = b[0];
            write += 1;
        }
        for i in 1..b.len() {
            if b[i] != b[i - 1] {
                dest[write] = b[i];
                write += 1;
            }
        }
        return write;
    }
    if b[b.len() - 1] < a[0] {
        // All of b comes before all of a - copy both with deduplication
        dest[0] = b[0];
        let mut write = 1;
        for i in 1..b.len() {
            if b[i] != b[i - 1] {
                dest[write] = b[i];
                write += 1;
            }
        }
        // Append a
        if a[0] != dest[write - 1] {
            dest[write] = a[0];
            write += 1;
        }
        for i in 1..a.len() {
            if a[i] != a[i - 1] {
                dest[write] = a[i];
                write += 1;
            }
        }
        return write;
    }

    // Hybrid SIMD + scalar merge - clean and simple with separate destination buffer
    let mut i = 0;
    let mut j = 0;
    let mut write = 0;
    let mut last_written: Option<T> = None;

    // SIMD-accelerated merge loop
    while i < a.len() && j + SIMD_LANES <= b.len() {
        let b_chunk: Simd<T, SIMD_LANES> = Simd::from_slice(&b[j..j + SIMD_LANES]);
        let a_splat = Simd::<T, SIMD_LANES>::splat(a[i]);

        // If all elements in b_chunk are less than a[i], we can bulk copy from b
        if b_chunk.simd_lt(a_splat).all() {
            // Copy up to SIMD_LANES elements from b (with deduplication)
            for k in 0..SIMD_LANES {
                let val = b[j + k];
                if last_written != Some(val) {
                    dest[write] = val;
                    write += 1;
                    last_written = Some(val);
                }
            }
            j += SIMD_LANES;
            continue;
        }

        // If all elements in b_chunk are greater than a[i], take a[i]
        if b_chunk.simd_gt(a_splat).all() {
            let val = a[i];
            if last_written != Some(val) {
                dest[write] = val;
                write += 1;
                last_written = Some(val);
            }
            i += 1;
            continue;
        }

        // Overlap detected - fall back to scalar for this chunk
        // Process up to SIMD_LANES elements carefully
        for _ in 0..SIMD_LANES {
            if i >= a.len() || j >= b.len() {
                break;
            }

            let val = match a[i].cmp(&b[j]) {
                Ordering::Less => {
                    let v = a[i];
                    i += 1;
                    v
                }
                Ordering::Greater => {
                    let v = b[j];
                    j += 1;
                    v
                }
                Ordering::Equal => {
                    let v = a[i];
                    i += 1;
                    j += 1;
                    v
                }
            };

            if last_written != Some(val) {
                dest[write] = val;
                write += 1;
                last_written = Some(val);
            }
        }
    }

    // Scalar merge for remaining elements
    while i < a.len() && j < b.len() {
        let val = match a[i].cmp(&b[j]) {
            Ordering::Less => {
                let v = a[i];
                i += 1;
                v
            }
            Ordering::Greater => {
                let v = b[j];
                j += 1;
                v
            }
            Ordering::Equal => {
                let v = a[i];
                i += 1;
                j += 1;
                v
            }
        };

        if last_written != Some(val) {
            dest[write] = val;
            write += 1;
            last_written = Some(val);
        }
    }

    // Copy remaining elements from a
    while i < a.len() {
        let val = a[i];
        if last_written != Some(val) {
            dest[write] = val;
            write += 1;
            last_written = Some(val);
        }
        i += 1;
    }

    // Copy remaining elements from b
    while j < b.len() {
        let val = b[j];
        if last_written != Some(val) {
            dest[write] = val;
            write += 1;
            last_written = Some(val);
        }
        j += 1;
    }

    write
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::{rngs::SmallRng, RngCore, SeedableRng};

    #[test]
    fn test_union_size_disjoint() {
        let a = [1, 3, 5];
        let b = [2, 4, 6];
        assert_eq!(union_size(&a, &b), 6);
    }

    #[test]
    fn test_union_size_overlapping() {
        let a = [1, 3, 5];
        let b = [2, 3, 4];
        assert_eq!(union_size(&a, &b), 5);
    }

    #[test]
    fn test_union_size_identical() {
        let a = [1, 2, 3];
        let b = [1, 2, 3];
        assert_eq!(union_size(&a, &b), 3);
    }

    #[test]
    fn test_union_size_empty() {
        let a: [u64; 0] = [];
        let b = [1, 2, 3];
        assert_eq!(union_size(&a, &b), 3);
        assert_eq!(union_size(&b, &a), 3);
    }

    #[test]
    fn test_union_size_subset() {
        let a = [1, 2, 3, 4, 5];
        let b = [2, 4];
        assert_eq!(union_size(&a, &b), 5);
    }

    #[test]
    fn test_union_basic() {
        let a = [1, 3, 5];
        let b = [2, 3, 4];
        let mut dest = [0u64; 6];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 5);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_union_disjoint() {
        let a = [1, 3, 5];
        let b = [2, 4, 6];
        let mut dest = [0u64; 6];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 6);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5, 6]);
    }

    #[test]
    fn test_union_identical() {
        let a = [1, 2, 3];
        let b = [1, 2, 3];
        let mut dest = [0u64; 6];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 2, 3]);
    }

    #[test]
    fn test_union_empty_a() {
        let a: [u64; 0] = [];
        let b = [1, 2, 3];
        let mut dest = [0u64; 3];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 2, 3]);
    }

    #[test]
    fn test_union_empty_b() {
        let a = [1, 2, 3];
        let b: [u64; 0] = [];
        let mut dest = [0u64; 3];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 3);
        assert_eq!(&dest[..len], &[1, 2, 3]);
    }

    #[test]
    fn test_union_subset() {
        let a = [1, 2, 3, 4, 5];
        let b = [2, 4];
        let mut dest = [0u64; 7];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 5);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_union_all_from_a() {
        let a = [1, 2, 3, 4, 5];
        let b = [6, 7];
        let mut dest = [0u64; 7];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 7);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5, 6, 7]);
    }

    #[test]
    fn test_union_all_from_b() {
        let a = [4, 5];
        let b = [1, 2, 3];
        let mut dest = [0u64; 5];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 5);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5]);
    }

    #[test]
    fn test_union_large_overlap() {
        let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        let b = [3, 6, 9, 11, 12];
        let mut dest = [0u64; 15];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 12);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    }

    #[test]
    fn test_union_single_elements() {
        let a = [5];
        let b = [3];
        let mut dest = [0u64; 2];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 2);
        assert_eq!(&dest[..len], &[3, 5]);
    }

    #[test]
    fn test_union_with_internal_duplicates() {
        // Test case where both arrays have duplicates within themselves
        let a = [1, 1, 3];
        let b = [2, 2, 4];
        let mut dest = [0u64; 6];

        // Expected union: [1, 2, 3, 4]
        let expected_len = union_size(&a, &b);
        assert_eq!(expected_len, 4);

        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 4);
        assert_eq!(&dest[..len], &[1, 2, 3, 4]);
    }

    #[test]
    fn test_union_specific_seed() {
        // This is a failing seed from the fuzz test to debug
        let seed: [u8; 32] = [
            76, 173, 78, 211, 5, 152, 25, 132, 141, 72, 157, 15, 249, 40, 246, 161, 64, 212, 34,
            107, 93, 231, 101, 3, 5, 7, 171, 104, 95, 186, 58, 98,
        ];
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

        let expected_size = union_size(&a_data, &b_data);
        let mut dest = vec![0u64; a_size + b_size];
        let actual_size = union(&mut dest, &a_data, &b_data);

        println!("a_size: {}, b_size: {}", a_size, b_size);
        println!(
            "expected_size: {}, actual_size: {}",
            expected_size, actual_size
        );
        println!("a_data (first 10): {:?}", &a_data[..a_size.min(10)]);
        println!("b_data (first 10): {:?}", &b_data[..b_size.min(10)]);
        println!("result (first 10): {:?}", &dest[..actual_size.min(10)]);

        assert_eq!(actual_size, expected_size);
    }

    #[test]
    fn test_union_simd_aligned() {
        // Test with exactly 4 elements (one SIMD chunk) in each array, disjoint
        let a = [1, 2, 3, 4];
        let b = [5, 6, 7, 8];
        let mut dest = [0u64; 8];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 8);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5, 6, 7, 8]);
    }

    #[test]
    fn test_union_simd_long_run_from_a() {
        // Long run where all of 'a' comes before first element of 'b'
        let a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let b = [20, 21, 22, 23];
        let mut dest = [0u64; 16];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 16);
        assert_eq!(
            &dest[..len],
            &[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20, 21, 22, 23]
        );
    }

    #[test]
    fn test_union_simd_long_run_from_b() {
        // Long run where all of 'b' comes before first element of 'a'
        let a = [20, 21, 22, 23];
        let b = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        let mut dest = [0u64; 16];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 16);
        assert_eq!(
            &dest[..len],
            &[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 20, 21, 22, 23]
        );
    }

    #[test]
    fn test_union_simd_interleaved() {
        // Heavily interleaved data - worst case for SIMD (frequent fallback to scalar)
        let a = [1, 3, 5, 7, 9, 11, 13, 15];
        let b = [2, 4, 6, 8, 10, 12, 14, 16];
        let mut dest = [0u64; 16];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 16);
        assert_eq!(
            &dest[..len],
            &[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        );
    }

    #[test]
    fn test_union_simd_boundary_duplicates() {
        // Duplicates right at SIMD chunk boundaries (4-element boundaries)
        let a = [1, 2, 3, 4, 5, 6, 7, 8];
        let b = [4, 5, 6, 7, 8, 9, 10, 11]; // Overlaps at positions 4-8
        let mut dest = [0u64; 16];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 11);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    }

    #[test]
    fn test_union_simd_unaligned_sizes() {
        // Sizes that don't align with SIMD width (not multiples of 4)
        let a = [1, 2, 3, 4, 5];
        let b = [6, 7, 8];
        let mut dest = [0u64; 8];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 8);
        assert_eq!(&dest[..len], &[1, 2, 3, 4, 5, 6, 7, 8]);
    }

    #[test]
    fn test_union_simd_many_duplicates_in_runs() {
        // Long runs with many internal duplicates
        let a = [1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3];
        let b = [2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4];
        let mut dest = [0u64; 24];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 4);
        assert_eq!(&dest[..len], &[1, 2, 3, 4]);
    }

    #[test]
    fn test_union_simd_alternating_blocks() {
        // Blocks of 4 that alternate between a and b
        let a = [1, 2, 3, 4, 9, 10, 11, 12, 17, 18, 19, 20];
        let b = [5, 6, 7, 8, 13, 14, 15, 16, 21, 22, 23, 24];
        let mut dest = [0u64; 24];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 24);
        assert_eq!(
            &dest[..len],
            &[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23,
                24
            ]
        );
    }

    #[test]
    fn test_union_simd_large_arrays() {
        // Large arrays to really test SIMD performance
        let a_data: Vec<u64> = (0..1000).map(|x| x * 2).collect();
        let b_data: Vec<u64> = (0..800).map(|x| x * 2 + 1).collect();

        let mut dest = vec![0u64; a_data.len() + b_data.len()];

        let len = union(&mut dest, &a_data, &b_data);

        // Should have all even numbers 0-1998 and odd numbers 1-1599
        assert_eq!(len, 1000 + 800);

        // Verify sorted and no duplicates
        for i in 1..len {
            assert!(dest[i - 1] < dest[i], "Not sorted at {}", i);
        }
    }

    #[test]
    fn test_union_simd_subset_alignment() {
        // b is a subset of a, with SIMD-aligned positions
        let a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        let b = [2, 3, 6, 7]; // Aligned at positions that might be SIMD chunk boundaries
        let mut dest = [0u64; 16];
        let len = union(&mut dest, &a, &b);
        assert_eq!(len, 12);
        assert_eq!(&dest[..len], &[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    }

    #[test]
    fn test_union_failing_fuzz_seed() {
        // Specific failing seed to debug
        let seed: [u8; 32] = [
            83, 111, 111, 107, 116, 207, 25, 241, 84, 88, 255, 153, 139, 26, 215, 26, 168, 4, 227,
            187, 33, 202, 140, 31, 102, 146, 46, 61, 223, 210, 181, 108,
        ];
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

        let expected_size = union_size(&a_data, &b_data);
        let mut dest = vec![0u64; a_size + b_size];
        let actual_size = union(&mut dest, &a_data, &b_data);

        // Debug output
        if actual_size != expected_size {
            println!("a_size: {}, b_size: {}", a_size, b_size);
            println!(
                "expected_size: {}, actual_size: {}",
                expected_size, actual_size
            );

            // Check for duplicates in result
            for i in 1..actual_size {
                if dest[i - 1] == dest[i] {
                    println!("DUPLICATE at {}: {}", i, dest[i]);
                }
                if dest[i - 1] > dest[i] {
                    println!("NOT SORTED at {}: {} > {}", i, dest[i - 1], dest[i]);
                }
            }
        }

        assert_eq!(actual_size, expected_size);
    }

    #[test]
    fn test_union_fuzz() {
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

            // Calculate expected union size using union_size
            let expected_size = union_size(&a_data, &b_data);

            // Create destination buffer with enough capacity
            let mut dest = vec![0u64; a_size + b_size];

            // Perform union
            let actual_size = union(&mut dest, &a_data, &b_data);

            // Verify size matches
            assert_eq!(actual_size, expected_size);

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

            // Verify no duplicates in result
            for i in 1..actual_size {
                assert!(
                    dest[i - 1] < dest[i],
                    "Duplicate found at index {}: {}",
                    i,
                    dest[i]
                );
            }

            // Verify all elements from a are in result
            for &elem in &a_data {
                assert!(
                    dest[..actual_size].binary_search(&elem).is_ok(),
                    "Element {} from a not found in union",
                    elem
                );
            }

            // Verify all elements from b are in result
            for &elem in &b_data {
                assert!(
                    dest[..actual_size].binary_search(&elem).is_ok(),
                    "Element {} from b not found in union",
                    elem
                );
            }
        }
    }

    // Tests for different numeric types
    macro_rules! test_union_type {
        ($name:ident, $t:ty) => {
            #[test]
            fn $name() {
                // Basic union
                let a: Vec<$t> = vec![1, 3, 5];
                let b: Vec<$t> = vec![2, 3, 4];
                let mut dest = vec![0 as $t; 6];
                let len = union(&mut dest, &a, &b);
                assert_eq!(len, 5);
                assert_eq!(&dest[..len], &[1, 2, 3, 4, 5]);

                // Disjoint
                let a: Vec<$t> = vec![1, 2, 3];
                let b: Vec<$t> = vec![4, 5, 6];
                let mut dest = vec![0 as $t; 6];
                let len = union(&mut dest, &a, &b);
                assert_eq!(len, 6);
                assert_eq!(&dest[..len], &[1, 2, 3, 4, 5, 6]);

                // Identical
                let a: Vec<$t> = vec![1, 2, 3];
                let b: Vec<$t> = vec![1, 2, 3];
                let mut dest = vec![0 as $t; 6];
                let len = union(&mut dest, &a, &b);
                assert_eq!(len, 3);

                // union_size test
                let a: Vec<$t> = vec![1, 3, 5, 7];
                let b: Vec<$t> = vec![2, 3, 6, 7];
                assert_eq!(union_size(&a, &b), 6);

                // Large arrays to test SIMD path
                let a: Vec<$t> = (0..50).map(|x| (x * 2) as $t).collect();
                let b: Vec<$t> = (0..50).map(|x| (x * 2 + 1) as $t).collect();
                let mut dest = vec![0 as $t; 100];
                let len = union(&mut dest, &a, &b);
                assert_eq!(len, 100);
            }
        };
    }

    test_union_type!(test_union_u8, u8);
    test_union_type!(test_union_u16, u16);
    test_union_type!(test_union_u32, u32);
    test_union_type!(test_union_i8, i8);
    test_union_type!(test_union_i16, i16);
    test_union_type!(test_union_i32, i32);
    test_union_type!(test_union_i64, i64);
}
