//! Clone-free SIMD intersection algorithms for sorted arrays.
//!
//! Based on the paper "SIMD Compression and the Intersection of Sorted Integers"
//! by Daniel Lemire, Leonid Boytsov, and Nathan Kurz (arXiv:1401.6399).
//!
//! The main `intersect` function uses an adaptive algorithm that selects the
//! best strategy based on the size ratio between arrays:
//! - Scalar: For very small ratios (up to 2:1)
//! - V1: Best for ratios from ~3:1 to ~50:1
//! - V3: Best for ratios from ~50:1 to ~1000:1
//! - Galloping: Best for ratios > 1000:1
//!
//! All algorithms write to a destination buffer without allocation.

use std::simd::cmp::SimdPartialEq;

use crate::simd_element::{SimdMaskOps, SortedSimdElement};

/// Computes the **multiset intersection** of two sorted arrays.
///
/// Uses an adaptive algorithm that selects the best strategy based on the
/// size ratio between arrays (Scalar, V1, V3, or Galloping). The result is written to `dest`.
///
/// This operation follows multiset semantics: if an element appears `n` times in `a`
/// and `m` times in `b`, it will appear `min(n, m)` times in the result.
///
/// # Arguments
/// * `dest` - Destination buffer for the intersection result
/// * `a` - First sorted array (immutable)
/// * `b` - Second sorted array (immutable)
///
/// # Returns
/// The number of elements in the intersection
///
/// # Panics
/// Panics if `dest.len() < min(a.len(), b.len())` (insufficient capacity for worst case).
///
/// # Examples
///
/// ```
/// use sosorted::intersect;
///
/// let a = [1u64, 2, 3, 4, 5];
/// let b = [1, 3, 5];
/// let mut dest = [0u64; 5];
/// let new_len = intersect(&mut dest, &a, &b);
/// assert_eq!(new_len, 3);
/// assert_eq!(&dest[..new_len], &[1, 3, 5]);
/// ```
///
/// # Example with duplicates
///
/// ```
/// use sosorted::intersect;
///
/// let a = [1u64, 1, 2, 2];
/// let b = [1u64, 2, 2, 2];
/// let mut dest = [0u64; 4];
/// let new_len = intersect(&mut dest, &a, &b);
///
/// // Result matches min(count_a, count_b) for each element
/// // 1 appears 2 times in a, 1 time in b -> 1 time in result
/// // 2 appears 2 times in a, 3 times in b -> 2 times in result
/// assert_eq!(&dest[..new_len], &[1, 2, 2]);
/// ```
pub fn intersect<T>(dest: &mut [T], a: &[T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    if a.is_empty() || b.is_empty() {
        return 0;
    }

    // Check capacity
    let min_len = a.len().min(b.len());
    assert!(
        dest.len() >= min_len,
        "Insufficient capacity: dest.len()={}, need at least {}",
        dest.len(),
        min_len
    );

    let (smaller, larger) = if a.len() <= b.len() {
        (a.len(), b.len())
    } else {
        (b.len(), a.len())
    };

    let ratio = larger / smaller.max(1);

    match ratio {
        0..=2 => intersect_scalar(dest, a, b),
        3..=50 => intersect_v1(dest, a, b),
        51..=1000 => intersect_v3(dest, a, b),
        _ => intersect_galloping(dest, a, b),
    }
}

fn intersect_scalar<T>(dest: &mut [T], a: &[T], b: &[T]) -> usize
where
    T: Ord + Copy,
{
    let mut i = 0;
    let mut j = 0;
    let mut k = 0;

    while i < a.len() && j < b.len() {
        if a[i] < b[j] {
            i += 1;
        } else if b[j] < a[i] {
            j += 1;
        } else {
            dest[k] = a[i];
            k += 1;
            i += 1;
            j += 1;
        }
    }
    k
}

/// V1 intersection algorithm - SIMD search through the larger array.
fn intersect_v1<T>(dest: &mut [T], a: &[T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    if a.len() <= b.len() {
        intersect_v1_impl(dest, a, b)
    } else {
        intersect_v1_impl(dest, b, a)
    }
}

/// V1 implementation: `rare` is the smaller array, `freq` is the larger.
fn intersect_v1_impl<T>(dest: &mut [T], rare: &[T], freq: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    let lanes = T::LANES;
    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for &rare_val in rare.iter() {
        // SIMD search in freq
        let mut found = false;
        while freq_idx + lanes <= freq.len() {
            let freq_block = T::simd_from_slice(&freq[freq_idx..freq_idx + lanes]);
            let rare_splat = T::simd_splat(rare_val);

            let eq_mask = rare_splat.simd_eq(freq_block);
            if eq_mask.any() {
                dest[intersect_count] = rare_val;
                intersect_count += 1;
                let match_idx = eq_mask.to_bitmask().trailing_zeros() as usize;
                freq_idx += match_idx + 1;
                found = true;
                break;
            }

            if freq[freq_idx + lanes - 1] >= rare_val {
                break;
            }

            freq_idx += lanes;
        }

        if found {
            continue;
        }

        // Scalar fallback
        while freq_idx < freq.len() && freq[freq_idx] < rare_val {
            freq_idx += 1;
        }

        if freq_idx < freq.len() && freq[freq_idx] == rare_val {
            dest[intersect_count] = rare_val;
            intersect_count += 1;
            freq_idx += 1;
        }
    }

    intersect_count
}

/// V3 intersection algorithm - hierarchical block search with SIMD.
fn intersect_v3<T>(dest: &mut [T], a: &[T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    if a.len() <= b.len() {
        intersect_v3_impl(dest, a, b)
    } else {
        intersect_v3_impl(dest, b, a)
    }
}

/// V3 implementation: `rare` is the smaller array, `freq` is the larger.
fn intersect_v3_impl<T>(dest: &mut [T], rare: &[T], freq: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    let lanes = T::LANES;
    let block_size = lanes * 4;
    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for &rare_val in rare.iter() {
        // First level: skip blocks
        while freq_idx + block_size <= freq.len() {
            if freq[freq_idx + block_size - 1] >= rare_val {
                break;
            }
            freq_idx += block_size;
        }

        let block_end = (freq_idx + block_size).min(freq.len());
        let mut found = false;
        let mut search_idx = freq_idx;

        // SIMD search within block
        while search_idx + lanes <= block_end {
            let freq_block = T::simd_from_slice(&freq[search_idx..search_idx + lanes]);
            let rare_splat = T::simd_splat(rare_val);

            let eq_mask = rare_splat.simd_eq(freq_block);
            if eq_mask.any() {
                dest[intersect_count] = rare_val;
                intersect_count += 1;
                found = true;
                let match_idx = eq_mask.to_bitmask().trailing_zeros() as usize;
                freq_idx = search_idx + match_idx + 1;
                break;
            }

            if freq[search_idx + lanes - 1] >= rare_val {
                break;
            }

            search_idx += lanes;
        }

        if found {
            continue;
        }

        // Scalar fallback
        while search_idx < block_end && freq[search_idx] < rare_val {
            search_idx += 1;
        }

        if search_idx < block_end && freq[search_idx] == rare_val {
            dest[intersect_count] = rare_val;
            intersect_count += 1;
            freq_idx = search_idx + 1;
        } else {
            freq_idx = search_idx;
        }
    }

    intersect_count
}

/// Galloping intersection - exponential search + binary search.
/// Best for highly asymmetric arrays (ratio > 1000:1).
fn intersect_galloping<T>(dest: &mut [T], a: &[T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
{
    if a.len() <= b.len() {
        intersect_galloping_impl(dest, a, b)
    } else {
        intersect_galloping_impl(dest, b, a)
    }
}

/// Galloping implementation: `rare` is the smaller array, `freq` is the larger.
fn intersect_galloping_impl<T>(dest: &mut [T], rare: &[T], freq: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
{
    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for &rare_val in rare.iter() {
        if freq_idx >= freq.len() {
            break;
        }

        // Galloping: exponentially increase search range
        let mut bound = 1;
        let mut lower = freq_idx;

        while freq_idx + bound < freq.len() && freq[freq_idx + bound] < rare_val {
            lower = freq_idx + bound;
            bound *= 2;
        }

        let upper = (freq_idx + bound + 1).min(freq.len());

        // Binary search within the range
        let mut lo = lower;
        let mut hi = upper;

        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if freq[mid] < rare_val {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }

        if lo < freq.len() && freq[lo] == rare_val {
            dest[intersect_count] = rare_val;
            intersect_count += 1;
            freq_idx = lo + 1;
        } else {
            freq_idx = lo;
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
        let a = [1u64, 2, 3, 4, 5];
        let b = [1u64, 3, 5];
        let mut dest = [0u64; 5];
        let new_len = intersect(&mut dest, &a, &b);
        assert_eq!(new_len, 3);
        assert_eq!(dest[..new_len], [1, 3, 5]);
    }

    #[test]
    fn test_intersect_all() {
        let a = [1u64, 2, 3, 4, 5];
        let b = a;
        let mut dest = [0u64; 5];
        let new_len = intersect(&mut dest, &a, &b);
        assert_eq!(new_len, a.len());
        assert_eq!(&dest[..new_len], &a);
    }

    #[test]
    fn test_intersect_no_match() {
        let a = [1u64, 2, 3, 4, 5];
        let b = [6u64, 7, 8, 9, 10];
        let mut dest = [0u64; 5];
        let result = intersect(&mut dest, &a, &b);
        assert_eq!(result, 0);
    }

    #[test]
    fn test_intersect_empty() {
        let a: [u64; 0] = [];
        let b = [1u64, 2, 3];
        let mut dest = [0u64; 3];
        let result = intersect(&mut dest, &a, &b);
        assert_eq!(result, 0);

        let a = [1u64, 2, 3];
        let b: [u64; 0] = [];
        let result = intersect(&mut dest, &a, &b);
        assert_eq!(result, 0);
    }

    #[test]
    fn test_intersect_asymmetric_small_a() {
        let a = [50u64, 100, 150];
        let b: Vec<u64> = (0..1000).collect();
        let mut dest = [0u64; 3];
        let result = intersect(&mut dest, &a, &b);
        assert_eq!(result, 3);
        assert_eq!(&dest[..result], &[50, 100, 150]);
    }

    #[test]
    fn test_intersect_asymmetric_large_a() {
        let a: Vec<u64> = (0..1000).collect();
        let b = [50u64, 100, 150];
        let mut dest = [0u64; 3];
        let result = intersect(&mut dest, &a, &b);
        assert_eq!(result, 3);
        assert_eq!(&dest[..result], &[50, 100, 150]);
    }

    #[test]
    fn test_intersect_very_asymmetric() {
        // Test the galloping path (ratio > 1000:1)
        let a = [500u64, 1000, 1500];
        let b: Vec<u64> = (0..10000).collect();
        let mut dest = [0u64; 3];
        let result = intersect(&mut dest, &a, &b);
        assert_eq!(result, 3);
        assert_eq!(&dest[..result], &[500, 1000, 1500]);
    }

    #[test]
    fn test_intersect_fuzz() {
        let mut seed: [u8; 32] = [0; 32];
        rand::rng().fill_bytes(&mut seed[..]);
        println!("seed: {:?}", seed);

        let mut rng = SmallRng::from_seed(seed);

        const TEST_DATA_SIZE: usize = 1024;
        const TEST_ITERATION_COUNT: usize = 100;

        for _ in 0..TEST_ITERATION_COUNT {
            let mut a: Vec<u64> = (0..TEST_DATA_SIZE)
                .map(|_| rng.next_u64() % (TEST_DATA_SIZE as u64 * 4))
                .collect();
            a.sort();
            a.dedup();

            let mut b: Vec<u64> = (0..TEST_DATA_SIZE)
                .map(|_| rng.next_u64() % (TEST_DATA_SIZE as u64 * 4))
                .collect();
            b.sort();
            b.dedup();

            let set_a: std::collections::HashSet<_> = a.iter().copied().collect();
            let set_b: std::collections::HashSet<_> = b.iter().copied().collect();
            let mut expected: Vec<_> = set_a.intersection(&set_b).copied().collect();
            expected.sort();

            let mut dest = vec![0u64; a.len().min(b.len())];
            let result = intersect(&mut dest, &a, &b);

            assert_eq!(result, expected.len(), "Length mismatch");
            assert_eq!(&dest[..result], &expected[..], "Content mismatch");
        }
    }

    #[test]
    fn test_intersect_boundary_bug() {
        let a = vec![10u64, 11, 12, 13, 14, 15, 16, 17];
        let b = vec![5u64, 6, 7, 8, 14, 15, 16, 17];
        let mut dest = vec![0u64; 8];

        let result = intersect(&mut dest, &a, &b);
        assert_eq!(result, 4);
        assert_eq!(&dest[..result], &[14, 15, 16, 17]);
    }

    // Tests for different numeric types
    macro_rules! test_intersect_type {
        ($name:ident, $t:ty) => {
            #[test]
            fn $name() {
                // Basic test
                let a: Vec<$t> = vec![1, 2, 3, 4, 5];
                let b: Vec<$t> = vec![1, 3, 5];
                let mut dest = vec![0 as $t; 5];
                let new_len = intersect(&mut dest, &a, &b);
                assert_eq!(new_len, 3);
                assert_eq!(&dest[..new_len], &[1, 3, 5]);

                // Empty intersection
                let a: Vec<$t> = vec![1, 2, 3];
                let b: Vec<$t> = vec![4, 5, 6];
                let mut dest = vec![0 as $t; 3];
                assert_eq!(intersect(&mut dest, &a, &b), 0);

                // Large arrays to test SIMD path
                let a: Vec<$t> = (0..50).map(|x| x as $t).collect();
                let b: Vec<$t> = (25..75).map(|x| x as $t).collect();
                let mut dest = vec![0 as $t; 50];
                let new_len = intersect(&mut dest, &a, &b);
                assert_eq!(new_len, 25);
                for i in 0..25 {
                    assert_eq!(dest[i], (25 + i) as $t);
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

    #[test]
    fn test_intersect_v1_multiset_bug() {
        // This test specifically targets V1 implementation (ratio ~3-50)
        // rare: len 2. freq: len 10. Ratio 5.
        // rare has duplicates: [1, 1]
        // freq has duplicates: [1, 1, ...]
        // Result should be [1, 1]

        let rare = vec![1u64, 1];
        let freq = vec![1u64, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        let mut dest = vec![0u64; 2];

        let len = intersect(&mut dest, &rare, &freq);

        assert_eq!(len, 2, "Should find 2 matches for [1, 1] intersect [1, 1, ...]");
        assert_eq!(len, 2, "Should find 2 matches for [1, 1] intersect [1, 1, ...]");
        assert_eq!(&dest[..len], &[1, 1]);
    }
}
