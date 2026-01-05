//! Lemire-style SIMD intersection algorithms.
//!
//! Based on the paper "SIMD Compression and the Intersection of Sorted Integers"
//! by Daniel Lemire, Leonid Boytsov, and Nathan Kurz (arXiv:1401.6399).
//!
//! These algorithms are optimized for different size ratios between arrays:
//! - V1: Best for ratios up to ~50:1
//! - V3: Best for ratios from ~50:1 to ~1000:1
//! - SIMD Galloping: Best for ratios > 1000:1

use std::simd::{cmp::SimdPartialEq, u64x4, Simd};

/// V1 intersection algorithm adapted for 64-bit integers.
///
/// This algorithm iterates through the smaller "rare" array element by element,
/// and uses SIMD to compare each element against 4 elements from the larger "freq" array.
///
/// The algorithm assumes `rare.len() <= freq.len()`. If arrays are passed in the wrong
/// order, they are swapped internally.
///
/// # Arguments
/// * `a` - First sorted array (will contain the intersection result)
/// * `b` - Second sorted array
///
/// # Returns
/// The number of elements in the intersection
pub fn intersect_v1(a: &mut [u64], b: &[u64]) -> usize {
    if a.is_empty() || b.is_empty() {
        return 0;
    }

    // Ensure we iterate over the smaller array (rare) and search in the larger (freq)
    // For the in-place interface, we need to handle this carefully
    let (rare, freq, output) = if a.len() <= b.len() {
        // a is rare, b is freq - we can work in place
        let rare_copy: Vec<u64> = a.to_vec();
        (rare_copy, b, a)
    } else {
        // b is rare, a is freq - we need to copy b and search in a
        let rare_copy: Vec<u64> = b.to_vec();
        let freq_ref = a as *const [u64];
        // SAFETY: We only read from freq_ref while writing to output (a)
        // and the indices we write to are always less than the indices we read from
        (rare_copy, unsafe { &*freq_ref }, a)
    };

    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for &rare_val in rare.iter() {
        // Skip forward in freq until we might find a match
        // Using SIMD to check 4 elements at once
        while freq_idx + 4 <= freq.len() {
            let freq_block: u64x4 = Simd::from_slice(&freq[freq_idx..freq_idx + 4]);
            let rare_splat = u64x4::splat(rare_val);

            // Check if any element in the block equals rare_val
            let eq_mask = rare_splat.simd_eq(freq_block);
            if eq_mask.any() {
                // Found a match
                output[intersect_count] = rare_val;
                intersect_count += 1;
                freq_idx += 1; // Move past this match
                break;
            }

            // Check if we've passed where rare_val could be
            // If the last element in the block is >= rare_val, we need to check more carefully
            if freq[freq_idx + 3] >= rare_val {
                // The match would be in this block if it exists, but eq_mask said no match
                // So rare_val is not in freq, move to next rare element
                break;
            }

            // All elements in block are less than rare_val, skip forward
            freq_idx += 4;
        }

        // Handle remaining elements that don't fill a SIMD register
        while freq_idx < freq.len() && freq[freq_idx] < rare_val {
            freq_idx += 1;
        }

        if freq_idx < freq.len() && freq[freq_idx] == rare_val {
            // Check if we already recorded this match in the SIMD loop
            if intersect_count == 0 || output[intersect_count - 1] != rare_val {
                output[intersect_count] = rare_val;
                intersect_count += 1;
            }
            freq_idx += 1;
        }
    }

    intersect_count
}

/// V3 intersection algorithm adapted for 64-bit integers.
///
/// V3 adds hierarchical block searching on top of V1. It first locates a block
/// of 16 integers where a match could be found, then uses SIMD to search within
/// that block.
///
/// # Arguments
/// * `a` - First sorted array (will contain the intersection result)
/// * `b` - Second sorted array
///
/// # Returns
/// The number of elements in the intersection
pub fn intersect_v3(a: &mut [u64], b: &[u64]) -> usize {
    if a.is_empty() || b.is_empty() {
        return 0;
    }

    // Ensure we iterate over the smaller array (rare) and search in the larger (freq)
    let (rare, freq, output) = if a.len() <= b.len() {
        let rare_copy: Vec<u64> = a.to_vec();
        (rare_copy, b, a)
    } else {
        let rare_copy: Vec<u64> = b.to_vec();
        let freq_ref = a as *const [u64];
        (rare_copy, unsafe { &*freq_ref }, a)
    };

    let mut intersect_count = 0;
    let mut freq_idx = 0;

    // Block size for hierarchical search (4 SIMD vectors of 4 elements each)
    const BLOCK_SIZE: usize = 16;

    for &rare_val in rare.iter() {
        // First level: skip blocks of BLOCK_SIZE elements
        while freq_idx + BLOCK_SIZE <= freq.len() {
            // Check if rare_val could be in this block
            if freq[freq_idx + BLOCK_SIZE - 1] >= rare_val {
                break;
            }
            freq_idx += BLOCK_SIZE;
        }

        // Second level: within the block, use SIMD to find the right sub-block
        let block_end = (freq_idx + BLOCK_SIZE).min(freq.len());

        // Try SIMD comparison within the current range
        let mut found = false;
        let mut search_idx = freq_idx;

        while search_idx + 4 <= block_end {
            let freq_block: u64x4 = Simd::from_slice(&freq[search_idx..search_idx + 4]);
            let rare_splat = u64x4::splat(rare_val);

            let eq_mask = rare_splat.simd_eq(freq_block);
            if eq_mask.any() {
                output[intersect_count] = rare_val;
                intersect_count += 1;
                found = true;
                // Advance freq_idx to just past the match
                for i in 0..4 {
                    if freq[search_idx + i] == rare_val {
                        freq_idx = search_idx + i + 1;
                        break;
                    }
                }
                break;
            }

            if freq[search_idx + 3] >= rare_val {
                // No match in this block
                break;
            }

            search_idx += 4;
        }

        if found {
            continue;
        }

        // Scalar fallback for remaining elements
        while search_idx < block_end && freq[search_idx] < rare_val {
            search_idx += 1;
        }

        if search_idx < block_end && freq[search_idx] == rare_val {
            output[intersect_count] = rare_val;
            intersect_count += 1;
            freq_idx = search_idx + 1;
        } else {
            freq_idx = search_idx;
        }
    }

    intersect_count
}

/// SIMD Galloping intersection algorithm adapted for 64-bit integers.
///
/// This algorithm uses exponential (galloping) search to find the range where
/// a match could exist, then uses binary search and SIMD to find the exact match.
///
/// Best for highly asymmetric arrays (ratio > 1000:1).
///
/// # Arguments
/// * `a` - First sorted array (will contain the intersection result)
/// * `b` - Second sorted array
///
/// # Returns
/// The number of elements in the intersection
pub fn intersect_simd_galloping(a: &mut [u64], b: &[u64]) -> usize {
    if a.is_empty() || b.is_empty() {
        return 0;
    }

    // Ensure we iterate over the smaller array (rare) and search in the larger (freq)
    let (rare, freq, output) = if a.len() <= b.len() {
        let rare_copy: Vec<u64> = a.to_vec();
        (rare_copy, b, a)
    } else {
        let rare_copy: Vec<u64> = b.to_vec();
        let freq_ref = a as *const [u64];
        (rare_copy, unsafe { &*freq_ref }, a)
    };

    let mut intersect_count = 0;
    let mut freq_idx = 0;

    for &rare_val in rare.iter() {
        // Skip if we've exhausted the freq array
        if freq_idx >= freq.len() {
            break;
        }

        // Galloping phase: exponentially increase the search range
        let mut bound = 1;
        let mut lower = freq_idx;

        // Find upper bound using galloping
        while freq_idx + bound < freq.len() && freq[freq_idx + bound] < rare_val {
            lower = freq_idx + bound;
            bound *= 2;
        }

        let upper = (freq_idx + bound + 1).min(freq.len());

        // Binary search phase to find the first element >= rare_val
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

        // Check if we found a match
        if lo < freq.len() && freq[lo] == rare_val {
            output[intersect_count] = rare_val;
            intersect_count += 1;
            freq_idx = lo + 1;
        } else {
            freq_idx = lo;
        }
    }

    intersect_count
}

/// Adaptive intersection that selects the best algorithm based on array size ratio.
///
/// Uses the heuristic from Lemire's paper:
/// - V1 for ratios up to 50:1
/// - V3 for ratios from 50:1 to 1000:1
/// - SIMD Galloping for ratios > 1000:1
///
/// # Arguments
/// * `a` - First sorted array (will contain the intersection result)
/// * `b` - Second sorted array
///
/// # Returns
/// The number of elements in the intersection
pub fn intersect_adaptive(a: &mut [u64], b: &[u64]) -> usize {
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
        _ => intersect_simd_galloping(a, b),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::{rngs::SmallRng, RngCore, SeedableRng};

    fn test_intersect_impl<F>(intersect_fn: F)
    where
        F: Fn(&mut [u64], &[u64]) -> usize,
    {
        // Basic test
        let mut a = [1, 2, 3, 4, 5];
        let result = intersect_fn(&mut a, &[1, 3, 5]);
        assert_eq!(result, 3);
        assert_eq!(&a[..result], &[1, 3, 5]);

        // All match
        let mut a = [1, 2, 3, 4, 5];
        let b = [1, 2, 3, 4, 5];
        let result = intersect_fn(&mut a, &b);
        assert_eq!(result, 5);
        assert_eq!(&a[..result], &[1, 2, 3, 4, 5]);

        // No match
        let mut a = [1, 2, 3, 4, 5];
        let result = intersect_fn(&mut a, &[6, 7, 8, 9, 10]);
        assert_eq!(result, 0);

        // Empty arrays
        let mut a: [u64; 0] = [];
        let result = intersect_fn(&mut a, &[1, 2, 3]);
        assert_eq!(result, 0);

        let mut a = [1, 2, 3];
        let result = intersect_fn(&mut a, &[]);
        assert_eq!(result, 0);

        // Asymmetric: small a, large b
        let mut a = [50, 100, 150];
        let b: Vec<u64> = (0..1000).collect();
        let result = intersect_fn(&mut a, &b);
        assert_eq!(result, 3);
        assert_eq!(&a[..result], &[50, 100, 150]);

        // Asymmetric: large a, small b
        let mut a: Vec<u64> = (0..1000).collect();
        let b = [50, 100, 150];
        let result = intersect_fn(&mut a, &b);
        assert_eq!(result, 3);
        assert_eq!(&a[..result], &[50, 100, 150]);
    }

    #[test]
    fn test_v1() {
        test_intersect_impl(intersect_v1);
    }

    #[test]
    fn test_v3() {
        test_intersect_impl(intersect_v3);
    }

    #[test]
    fn test_simd_galloping() {
        test_intersect_impl(intersect_simd_galloping);
    }

    #[test]
    fn test_adaptive() {
        test_intersect_impl(intersect_adaptive);
    }

    #[test]
    fn test_fuzz_v1() {
        fuzz_test_impl(intersect_v1);
    }

    #[test]
    fn test_fuzz_v3() {
        fuzz_test_impl(intersect_v3);
    }

    #[test]
    fn test_fuzz_simd_galloping() {
        fuzz_test_impl(intersect_simd_galloping);
    }

    fn fuzz_test_impl<F>(intersect_fn: F)
    where
        F: Fn(&mut [u64], &[u64]) -> usize,
    {
        let mut seed: [u8; 32] = [0; 32];
        rand::rng().fill_bytes(&mut seed[..]);
        println!("seed: {:?}", seed);

        let mut rng = SmallRng::from_seed(seed);

        const TEST_DATA_SIZE: usize = 1024;
        const TEST_ITERATION_COUNT: usize = 100;

        for _ in 0..TEST_ITERATION_COUNT {
            // Generate random sorted arrays
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

            // Compute expected result using HashSet
            let set_a: std::collections::HashSet<_> = a.iter().copied().collect();
            let set_b: std::collections::HashSet<_> = b.iter().copied().collect();
            let mut expected: Vec<_> = set_a.intersection(&set_b).copied().collect();
            expected.sort();

            // Test the implementation
            let mut a_copy = a.clone();
            let result = intersect_fn(&mut a_copy, &b);

            assert_eq!(result, expected.len(), "Length mismatch");
            assert_eq!(&a_copy[..result], &expected[..], "Content mismatch");
        }
    }
}
