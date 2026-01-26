//! Core data generation functions for benchmarks.

use rand::{rngs::SmallRng, RngCore, SeedableRng};
use std::ops::Range;

/// Generate a sorted array of unique random u64 values.
pub fn generate_sorted_unique(seed: [u8; 32], size: usize) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);
    let mut data: Vec<u64> = (0..size).map(|_| rng.next_u64()).collect();
    data.sort();
    data
}

/// Generate a sorted array of unique random values within a bounded range.
pub fn generate_sorted_unique_bounded(seed: [u8; 32], size: usize, max_val: u64) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);
    let mut data: Vec<u64> = (0..size * 2).map(|_| rng.next_u64() % max_val).collect();
    data.sort();
    data.dedup();
    data.truncate(size);
    data
}

/// Add duplicates to a sorted array in a contiguous range.
/// Range is specified as fractions of array length (0.0 to 1.0).
pub fn add_contiguous_duplicates(data: &mut [u64], range: Range<f32>) {
    let mut start = (range.start * data.len() as f32) as usize;
    let mut end = (range.end * data.len() as f32) as usize;
    if start == 0 {
        start = 1;
    }
    if end > data.len() {
        end = data.len()
    }
    for i in start..end {
        data[i - 1] = data[i];
    }
}

/// Generate a disjoint dataset from base data.
/// Values before pivot_prop are modified to be between original values,
/// values after pivot_prop are modified to be above original values.
pub fn generate_disjoint(data: &[u64], pivot_prop: f32) -> Vec<u64> {
    let mut disjoint = data.to_vec();
    let pivot_ix = (data.len() as f32 * pivot_prop + 1.0) as usize;
    let pivot_val = data[pivot_ix];

    for (d, &val_a) in disjoint.iter_mut().take(pivot_ix).zip(data.iter()) {
        let val = (val_a + pivot_val) / 2;
        if data.binary_search(&val).is_ok() {
            panic!("could not make disjoint dataset");
        }
        *d = val;
    }
    for (d, &val_a) in disjoint
        .iter_mut()
        .skip(pivot_ix)
        .zip(data.iter().skip(pivot_ix))
    {
        let val = val_a + (val_a + pivot_val) / 2;
        if data.binary_search(&val).is_ok() {
            panic!("could not make disjoint dataset");
        }
        *d = val;
    }
    disjoint
}

/// Add evenly spread intersections to a dataset.
pub fn add_spread_intersections(data: &mut [u64], source: &[u64], count: usize) {
    let stride = data.len() / count;
    for i in 0..count {
        data[i * stride] = source[i * stride];
    }
}

/// Generate a second array with a specific number of intersections with base.
pub fn generate_with_intersections(
    seed: [u8; 32],
    base: &[u64],
    size: usize,
    intersect_count: usize,
    max_val: u64,
) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);

    // Start with some elements from base
    let stride = base.len() / intersect_count.max(1);
    let mut result: Vec<u64> = (0..intersect_count)
        .map(|i| base[(i * stride).min(base.len() - 1)])
        .collect();

    // Add random non-intersecting elements
    while result.len() < size {
        let val = rng.next_u64() % max_val;
        if base.binary_search(&val).is_err() {
            result.push(val);
        }
    }

    result.sort();
    result.dedup();
    result.truncate(size);
    result
}

/// Generate data with controlled duplicate density by limiting the value range.
/// unique_ratio: fraction of values that should be unique (0.0 to 1.0)
pub fn generate_with_duplicate_density(seed: [u8; 32], size: usize, unique_ratio: f64) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);
    let max_value = (size as f64 * unique_ratio) as u64;
    let mut data: Vec<u64> = (0..size)
        .map(|_| rng.next_u64() % max_value.max(1))
        .collect();
    data.sort();
    data
}

/// Generate data with a specified number of unique values, spread evenly.
pub fn generate_with_unique_count(seed: [u8; 32], size: usize, unique_count: usize) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);

    // Generate unique values
    let mut unique_vals: Vec<u64> = (0..unique_count * 2).map(|_| rng.next_u64()).collect();
    unique_vals.sort();
    unique_vals.dedup();
    unique_vals.truncate(unique_count.max(1));

    // Spread duplicates evenly
    let mut result = Vec::with_capacity(size);
    let repeat_count = size / unique_vals.len().max(1);
    for val in unique_vals.iter() {
        for _ in 0..repeat_count {
            result.push(*val);
        }
    }
    // Fill remainder
    while result.len() < size {
        result.push(*unique_vals.last().unwrap_or(&0));
    }
    result.truncate(size);
    result.sort();
    result
}

/// Generate data with controlled average run length of duplicates.
pub fn generate_with_run_length(seed: [u8; 32], size: usize, avg_run_length: usize) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);

    let unique_count = size / avg_run_length.max(1);
    let mut unique_vals: Vec<u64> = (0..unique_count * 2).map(|_| rng.next_u64()).collect();
    unique_vals.sort();
    unique_vals.dedup();
    unique_vals.truncate(unique_count.max(1));

    let mut result = Vec::with_capacity(size);
    let mut idx = 0;
    while result.len() < size {
        let val = unique_vals[idx % unique_vals.len()];
        // Vary run length around the average
        let run_len = (avg_run_length as i64 + (rng.next_u64() % 3) as i64 - 1).max(1) as usize;
        for _ in 0..run_len {
            if result.len() < size {
                result.push(val);
            }
        }
        idx += 1;
    }
    result.sort();
    result
}

/// Generate data with Zipf-like distribution (power law).
/// A small number of values appear very frequently.
pub fn generate_zipf(seed: [u8; 32], size: usize) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);

    let mut data: Vec<u64> = (0..size)
        .map(|_| {
            let r = rng.next_u64() as f64 / u64::MAX as f64;
            let value = (1.0 / (1.0 - r * 0.99)).powf(1.5) as u64;
            value.min(1_000_000)
        })
        .collect();
    data.sort();
    data
}

/// Generate data with multiple small runs of duplicates (1-8 elements each).
/// Simulates timestamps with sub-second precision.
pub fn generate_small_runs(seed: [u8; 32], size: usize) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);
    let mut data = Vec::with_capacity(size);
    let mut current_value = 0u64;

    while data.len() < size {
        let run_length = (rng.next_u32() % 8 + 1) as usize;
        let copies = run_length.min(size - data.len());

        for _ in 0..copies {
            data.push(current_value);
        }

        current_value += (rng.next_u32() % 100 + 1) as u64;
    }

    data
}

/// Generate data with clustered duplicates - dense regions separated by unique data.
/// Simulates log data with bursts of repeated events.
pub fn generate_clustered(seed: [u8; 32], size: usize) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);

    let mut data: Vec<u64> = (0..size).map(|_| rng.next_u64()).collect();
    data.sort();

    // Add clusters of duplicates at random positions
    let num_clusters = 10;
    for _ in 0..num_clusters {
        if size <= 10000 {
            continue;
        }
        let cluster_start = (rng.next_u32() as usize) % (size - 10000);
        let cluster_size = 5000 + (rng.next_u32() as usize % 5000);

        let value = data[cluster_start];
        for d in data
            .iter_mut()
            .skip(cluster_start)
            .take(cluster_size.min(size - cluster_start))
        {
            *d = value;
        }
    }

    data
}

/// Generate data simulating sorted database IDs with ~10% duplicates.
pub fn generate_database_ids(seed: [u8; 32], size: usize) -> Vec<u64> {
    let mut rng = SmallRng::from_seed(seed);
    let mut data = Vec::with_capacity(size);
    let mut current_id = 1000u64;

    while data.len() < size {
        // 90% chance of unique ID, 10% chance of 2-5 duplicates
        if rng.next_u32().is_multiple_of(10) {
            let dupes = (rng.next_u32() % 4 + 2) as usize;
            for _ in 0..dupes.min(size - data.len()) {
                data.push(current_id);
            }
        } else {
            data.push(current_id);
        }
        current_id += 1;
    }

    data.truncate(size);
    data
}
