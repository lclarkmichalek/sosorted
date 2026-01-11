//! Naive/baseline implementations for benchmark comparisons.

use std::cmp::Ordering;
use std::collections::HashSet;

// =============================================================================
// Unary operation baselines
// =============================================================================

/// Naive find_first_duplicate: simple loop comparing adjacent elements.
pub fn naive_find_first_duplicate(vec: &[u64]) -> usize {
    for i in 1..vec.len() {
        if vec[i] == vec[i - 1] {
            return i;
        }
    }
    vec.len()
}

/// Windows-based find_first_duplicate using idiomatic Rust iterators.
pub fn windows_find_first_duplicate(vec: &[u64]) -> usize {
    vec.windows(2)
        .position(|w| w[0] == w[1])
        .map(|i| i + 1)
        .unwrap_or(vec.len())
}

/// Naive deduplicate: simple loop writing unique elements.
pub fn naive_deduplicate(out: &mut [u64], input: &[u64]) -> usize {
    if input.is_empty() {
        return 0;
    }

    out[0] = input[0];
    let mut write_pos = 1;
    for i in 1..input.len() {
        if input[i] != input[i - 1] {
            out[write_pos] = input[i];
            write_pos += 1;
        }
    }
    write_pos
}

/// HashSet-based deduplicate (not order-preserving, re-sorts).
pub fn hashset_deduplicate(data: &[u64]) -> Vec<u64> {
    let set: HashSet<_> = data.iter().copied().collect();
    let mut result: Vec<_> = set.into_iter().collect();
    result.sort_unstable();
    result
}

// =============================================================================
// Binary operation baselines
// =============================================================================

/// Naive intersect: two-pointer merge algorithm.
pub fn naive_intersect(dest: &mut [u64], a: &[u64], b: &[u64]) -> usize {
    let mut i = 0;
    let mut j = 0;
    let mut count = 0;

    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => i += 1,
            Ordering::Greater => j += 1,
            Ordering::Equal => {
                dest[count] = a[i];
                i += 1;
                j += 1;
                count += 1;
            }
        }
    }
    count
}

/// HashSet-based intersect.
pub fn hashset_intersect(set_a: &HashSet<u64>, set_b: &HashSet<u64>) -> Vec<u64> {
    let mut result: Vec<_> = set_a.intersection(set_b).copied().collect();
    result.sort_unstable();
    result
}

/// Naive union: two-pointer merge algorithm.
pub fn naive_union(a: &[u64], b: &[u64]) -> Vec<u64> {
    let mut result = Vec::with_capacity(a.len() + b.len());
    let mut i = 0;
    let mut j = 0;

    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => {
                result.push(a[i]);
                i += 1;
            }
            Ordering::Greater => {
                result.push(b[j]);
                j += 1;
            }
            Ordering::Equal => {
                result.push(a[i]);
                i += 1;
                j += 1;
            }
        }
    }

    result.extend_from_slice(&a[i..]);
    result.extend_from_slice(&b[j..]);
    result
}

/// HashSet-based union.
pub fn hashset_union(set_a: &HashSet<u64>, set_b: &HashSet<u64>) -> Vec<u64> {
    let mut result: Vec<_> = set_a.union(set_b).copied().collect();
    result.sort_unstable();
    result
}

/// Naive difference: two-pointer algorithm.
pub fn naive_difference(a: &[u64], b: &[u64]) -> Vec<u64> {
    let mut result = Vec::with_capacity(a.len());
    let mut i = 0;
    let mut j = 0;

    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => {
                result.push(a[i]);
                i += 1;
            }
            Ordering::Greater => {
                j += 1;
            }
            Ordering::Equal => {
                i += 1;
                j += 1;
            }
        }
    }

    result.extend_from_slice(&a[i..]);
    result
}

/// HashSet-based difference.
pub fn hashset_difference(a: &[u64], set_b: &HashSet<u64>) -> Vec<u64> {
    let mut result: Vec<_> = a.iter().copied().filter(|x| !set_b.contains(x)).collect();
    result.sort_unstable();
    result
}
