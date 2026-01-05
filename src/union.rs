use std::{
    cmp::Ordering,
    simd::{cmp::SimdPartialOrd, u64x4, Simd},
};

/// Calculates the size of the union of two sorted arrays without allocating.
///
/// # Examples
///
/// ```
/// use sosorted::union_size;
///
/// let a = [1, 3, 5];
/// let b = [2, 3, 4];
/// assert_eq!(union_size(&a, &b), 5); // [1, 2, 3, 4, 5]
/// ```
pub fn union_size(a: &[u64], b: &[u64]) -> usize {
    let mut i = 0;
    let mut j = 0;
    let mut count = 0;
    let mut last_value: Option<u64> = None;

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
/// let a = [1, 3, 5];
/// let b = [2, 3, 4];
/// let mut dest = [0u64; 6];  // Max possible size
/// let union_len = union(&mut dest, &a, &b);
/// assert_eq!(&dest[..union_len], &[1, 2, 3, 4, 5]);
/// ```
///
/// # Panics
///
/// Panics if `dest.len() < a.len() + b.len()` (insufficient capacity).
pub fn union(dest: &mut [u64], a: &[u64], b: &[u64]) -> usize {
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
    let mut last_written: Option<u64> = None;

    // SIMD-accelerated merge loop
    while i < a.len() && j + 4 <= b.len() {
        let b_chunk: u64x4 = Simd::from_slice(&b[j..j + 4]);
        let a_splat = u64x4::splat(a[i]);

        // If all elements in b_chunk are less than a[i], we can bulk copy from b
        if b_chunk.simd_lt(a_splat).all() {
            // Copy up to 4 elements from b (with deduplication)
            for k in 0..4 {
                let val = b[j + k];
                if last_written != Some(val) {
                    dest[write] = val;
                    write += 1;
                    last_written = Some(val);
                }
            }
            j += 4;
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
        // Process up to 4 elements carefully
        for _ in 0..4 {
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
