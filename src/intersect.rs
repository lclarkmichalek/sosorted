//! Clone-free SIMD intersection algorithms for sorted arrays.
//!
//! Based on the paper "SIMD Compression and the Intersection of Sorted Integers"
//! by Daniel Lemire, Leonid Boytsov, and Nathan Kurz (arXiv:1401.6399).
//!
//! The main `intersect` function uses an adaptive algorithm that selects the
//! best strategy based on the size ratio between arrays:
//! - V1: Best for ratios up to ~50:1
//! - V3: Best for ratios from ~50:1 to ~1000:1
//! - Galloping: Best for ratios > 1000:1
//!
//! All algorithms work fully in-place without allocation.

use std::simd::cmp::SimdPartialEq;

use crate::simd_element::{SimdMaskOps, SortedSimdElement};

/// Computes the intersection of two sorted arrays.
///
/// Uses an adaptive algorithm that selects the best strategy based on the
/// size ratio between arrays. The result is written to `a` in-place.
///
/// # Arguments
/// * `a` - First sorted array (will contain the intersection result)
/// * `b` - Second sorted array
///
/// # Returns
/// The number of elements in the intersection
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
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    if a.is_empty() || b.is_empty() {
        return 0;
    }

    let (smaller, larger) = if a.len() <= b.len() {
        (a.len(), b.len())
    } else {
        (b.len(), a.len())
    };

    let ratio = larger / smaller.max(1);

    match ratio {
        0..=50 => intersect_v1(a, b),
        51..=1000 => intersect_v3(a, b),
        _ => intersect_galloping(a, b),
    }
}

/// V1 intersection algorithm - SIMD search through the larger array.
/// Clone-free: works fully in-place.
fn intersect_v1<T>(a: &mut [T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    if a.len() <= b.len() {
        intersect_v1_a_rare(a, b)
    } else {
        intersect_v1_b_rare(a, b)
    }
}

/// V1 when `a` is the rare (smaller) array.
/// Safe because: intersect_count <= i, so we read a[i] before writing a[intersect_count].
fn intersect_v1_a_rare<T>(a: &mut [T], freq: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    let lanes = T::LANES;
    let rare_len = a.len();
    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for i in 0..rare_len {
        let rare_val = a[i];

        // SIMD search in freq
        while freq_idx + lanes <= freq.len() {
            let freq_block = T::simd_from_slice(&freq[freq_idx..freq_idx + lanes]);
            let rare_splat = T::simd_splat(rare_val);

            let eq_mask = rare_splat.simd_eq(freq_block);
            if eq_mask.any() {
                a[intersect_count] = rare_val;
                intersect_count += 1;
                freq_idx += 1;
                break;
            }

            if freq[freq_idx + lanes - 1] >= rare_val {
                break;
            }

            freq_idx += lanes;
        }

        // Scalar fallback
        while freq_idx < freq.len() && freq[freq_idx] < rare_val {
            freq_idx += 1;
        }

        if freq_idx < freq.len() && freq[freq_idx] == rare_val {
            if intersect_count == 0 || a[intersect_count - 1] != rare_val {
                a[intersect_count] = rare_val;
                intersect_count += 1;
            }
            freq_idx += 1;
        }
    }

    intersect_count
}

/// V1 when `b` is the rare (smaller) array.
/// Safe because: freq_idx >= intersect_count always (each match advances both,
/// non-matches advance only freq_idx).
fn intersect_v1_b_rare<T>(a: &mut [T], rare: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    let lanes = T::LANES;
    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for &rare_val in rare.iter() {
        // SIMD search in a (freq)
        while freq_idx + lanes <= a.len() {
            let freq_block = T::simd_from_slice(&a[freq_idx..freq_idx + lanes]);
            let rare_splat = T::simd_splat(rare_val);

            let eq_mask = rare_splat.simd_eq(freq_block);
            if eq_mask.any() {
                a[intersect_count] = rare_val;
                intersect_count += 1;
                freq_idx += 1;
                break;
            }

            if a[freq_idx + lanes - 1] >= rare_val {
                break;
            }

            freq_idx += lanes;
        }

        // Scalar fallback
        while freq_idx < a.len() && a[freq_idx] < rare_val {
            freq_idx += 1;
        }

        if freq_idx < a.len() && a[freq_idx] == rare_val {
            if intersect_count == 0 || a[intersect_count - 1] != rare_val {
                a[intersect_count] = rare_val;
                intersect_count += 1;
            }
            freq_idx += 1;
        }
    }

    intersect_count
}

/// V3 intersection algorithm - hierarchical block search with SIMD.
/// Clone-free: works fully in-place.
fn intersect_v3<T>(a: &mut [T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    if a.len() <= b.len() {
        intersect_v3_a_rare(a, b)
    } else {
        intersect_v3_b_rare(a, b)
    }
}

/// V3 when `a` is the rare (smaller) array.
fn intersect_v3_a_rare<T>(a: &mut [T], freq: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
    T::SimdVec: SimdPartialEq<Mask = T::SimdMask>,
{
    let lanes = T::LANES;
    let block_size = lanes * 4;
    let rare_len = a.len();
    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for i in 0..rare_len {
        let rare_val = a[i];

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
                a[intersect_count] = rare_val;
                intersect_count += 1;
                found = true;
                for j in 0..lanes {
                    if freq[search_idx + j] == rare_val {
                        freq_idx = search_idx + j + 1;
                        break;
                    }
                }
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
            a[intersect_count] = rare_val;
            intersect_count += 1;
            freq_idx = search_idx + 1;
        } else {
            freq_idx = search_idx;
        }
    }

    intersect_count
}

/// V3 when `b` is the rare (smaller) array.
fn intersect_v3_b_rare<T>(a: &mut [T], rare: &[T]) -> usize
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
        while freq_idx + block_size <= a.len() {
            if a[freq_idx + block_size - 1] >= rare_val {
                break;
            }
            freq_idx += block_size;
        }

        let block_end = (freq_idx + block_size).min(a.len());
        let mut found = false;
        let mut search_idx = freq_idx;

        // SIMD search within block
        while search_idx + lanes <= block_end {
            let freq_block = T::simd_from_slice(&a[search_idx..search_idx + lanes]);
            let rare_splat = T::simd_splat(rare_val);

            let eq_mask = rare_splat.simd_eq(freq_block);
            if eq_mask.any() {
                a[intersect_count] = rare_val;
                intersect_count += 1;
                found = true;
                for j in 0..lanes {
                    if a[search_idx + j] == rare_val {
                        freq_idx = search_idx + j + 1;
                        break;
                    }
                }
                break;
            }

            if a[search_idx + lanes - 1] >= rare_val {
                break;
            }

            search_idx += lanes;
        }

        if found {
            continue;
        }

        // Scalar fallback
        while search_idx < block_end && a[search_idx] < rare_val {
            search_idx += 1;
        }

        if search_idx < block_end && a[search_idx] == rare_val {
            a[intersect_count] = rare_val;
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
/// Clone-free: works fully in-place.
fn intersect_galloping<T>(a: &mut [T], b: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
{
    if a.len() <= b.len() {
        intersect_galloping_a_rare(a, b)
    } else {
        intersect_galloping_b_rare(a, b)
    }
}

/// Galloping when `a` is the rare (smaller) array.
fn intersect_galloping_a_rare<T>(a: &mut [T], freq: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
{
    let rare_len = a.len();
    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for i in 0..rare_len {
        let rare_val = a[i];

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
            a[intersect_count] = rare_val;
            intersect_count += 1;
            freq_idx = lo + 1;
        } else {
            freq_idx = lo;
        }
    }

    intersect_count
}

/// Galloping when `b` is the rare (smaller) array.
fn intersect_galloping_b_rare<T>(a: &mut [T], rare: &[T]) -> usize
where
    T: SortedSimdElement + Ord,
{
    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for &rare_val in rare.iter() {
        if freq_idx >= a.len() {
            break;
        }

        // Galloping
        let mut bound = 1;
        let mut lower = freq_idx;

        while freq_idx + bound < a.len() && a[freq_idx + bound] < rare_val {
            lower = freq_idx + bound;
            bound *= 2;
        }

        let upper = (freq_idx + bound + 1).min(a.len());

        // Binary search
        let mut lo = lower;
        let mut hi = upper;

        while lo < hi {
            let mid = lo + (hi - lo) / 2;
            if a[mid] < rare_val {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }

        if lo < a.len() && a[lo] == rare_val {
            a[intersect_count] = rare_val;
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
        let mut a = [1u64, 2, 3, 4, 5];
        let new_len = intersect(&mut a, &[1, 3, 5]);
        assert_eq!(new_len, 3);
        assert_eq!(a[..new_len], [1, 3, 5]);
    }

    #[test]
    fn test_intersect_all() {
        let mut a = [1u64, 2, 3, 4, 5];
        let b = a;
        let new_len = intersect(&mut a, &b);
        assert_eq!(new_len, a.len());
        assert_eq!(a, b);
    }

    #[test]
    fn test_intersect_no_match() {
        let mut a = [1u64, 2, 3, 4, 5];
        let result = intersect(&mut a, &[6, 7, 8, 9, 10]);
        assert_eq!(result, 0);
    }

    #[test]
    fn test_intersect_empty() {
        let mut a: [u64; 0] = [];
        let result = intersect(&mut a, &[1u64, 2, 3]);
        assert_eq!(result, 0);

        let mut a = [1u64, 2, 3];
        let b: [u64; 0] = [];
        let result = intersect(&mut a, &b);
        assert_eq!(result, 0);
    }

    #[test]
    fn test_intersect_asymmetric_small_a() {
        let mut a = [50u64, 100, 150];
        let b: Vec<u64> = (0..1000).collect();
        let result = intersect(&mut a, &b);
        assert_eq!(result, 3);
        assert_eq!(&a[..result], &[50, 100, 150]);
    }

    #[test]
    fn test_intersect_asymmetric_large_a() {
        let mut a: Vec<u64> = (0..1000).collect();
        let b = [50u64, 100, 150];
        let result = intersect(&mut a, &b);
        assert_eq!(result, 3);
        assert_eq!(&a[..result], &[50, 100, 150]);
    }

    #[test]
    fn test_intersect_very_asymmetric() {
        // Test the galloping path (ratio > 1000:1)
        let mut a = [500u64, 1000, 1500];
        let b: Vec<u64> = (0..10000).collect();
        let result = intersect(&mut a, &b);
        assert_eq!(result, 3);
        assert_eq!(&a[..result], &[500, 1000, 1500]);
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

            let mut a_copy = a.clone();
            let result = intersect(&mut a_copy, &b);

            assert_eq!(result, expected.len(), "Length mismatch");
            assert_eq!(&a_copy[..result], &expected[..], "Content mismatch");
        }
    }

    #[test]
    fn test_intersect_boundary_bug() {
        let mut a = vec![10u64, 11, 12, 13, 14, 15, 16, 17];
        let b = vec![5u64, 6, 7, 8, 14, 15, 16, 17];

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
                let mut a: Vec<$t> = (0..50).map(|x| x as $t).collect();
                let b: Vec<$t> = (25..75).map(|x| x as $t).collect();
                let new_len = intersect(&mut a, &b);
                assert_eq!(new_len, 25);
                for i in 0..25 {
                    assert_eq!(a[i], (25 + i) as $t);
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
