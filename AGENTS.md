# AGENTS.md

This document provides guidance for AI agents working with the `sosorted` codebase.

## Project Overview

`sosorted` is a high-performance Rust library providing SIMD-accelerated operations for manipulating sorted arrays of `u64` values. The library focuses on efficiency by leveraging portable SIMD instructions to process data in parallel.

## Key Operations

The library provides three main public APIs (all in `src/lib.rs`):

1. **`find_first_duplicate`** (`src/find_first_duplicate.rs:23`) - Locates the index of the first duplicate element in a sorted slice
2. **`deduplicate`** (`src/deduplicate.rs:19`) - Removes consecutive duplicate elements in-place
3. **`intersect`** (`src/intersect.rs:6`) - Computes the intersection of two sorted slices

## Architecture

### File Structure

```
src/
├── lib.rs                      # Public API exports
├── find_first_duplicate.rs     # First duplicate detection
├── deduplicate.rs              # Deduplication using SIMD
└── intersect.rs                # Set intersection
benches/
├── find_first_duplicate.rs     # Benchmarks for duplicate finding
├── deduplicate.rs              # Benchmarks for deduplication
└── intersect.rs                # Benchmarks for intersection
```

### Implementation Strategy

All operations use a hybrid approach:
- **SIMD fast path**: Process 4 elements at a time using `u64x4` SIMD vectors
- **Scalar fallback**: Handle edge cases, small arrays, and remainder elements

## Technical Details

### SIMD Usage

The codebase requires nightly Rust with the `portable_simd` feature flag. Key SIMD operations:

- **Vector types**: `u64x4` (4-wide vectors of u64)
- **Comparisons**: `simd_eq`, `simd_lt`, `simd_gt`
- **Swizzling**: Used in `find_first_duplicate` to shift elements for comparison
- **Masking**: Check `.any()` and `.all()` to determine if any/all lanes match a condition

### Performance Considerations

1. **Alignment handling**: Code uses `.as_simd()` to split slices into aligned chunks
2. **Threshold checks**: Operations only use SIMD when array size justifies overhead
3. **In-place mutations**: `deduplicate` and `intersect` modify arrays in-place to avoid allocations

### Common Patterns

```rust
// Standard SIMD loop structure
if vec.len() < SIMD_THRESHOLD {
    return scalar_fallback(vec);
}

let (prefix, middle, suffix) = vec.as_simd();
// Process prefix with scalar
// Process middle with SIMD
// Process suffix with scalar
```

## Development Guidelines

### Building and Testing

```bash
# Run tests
cargo test

# Run benchmarks
cargo bench

# Requires nightly Rust (see rust-toolchain file)
rustup install nightly
```

### Code Style

- Use descriptive variable names (`dupe_count`, `intersect_count`)
- Document SIMD fast paths vs scalar paths with comments
- Include inline comments explaining complex SIMD operations
- All public functions must have doc comments with examples

### Testing Requirements

Each operation includes:
- Unit tests for edge cases (empty, single element, all duplicates)
- Fuzz tests comparing SIMD implementation against scalar reference
- Example-based tests in doc comments

### Adding New Operations

When adding new sorted array operations:

1. Create a new file in `src/`
2. Export the public function in `src/lib.rs`
3. Implement both SIMD and scalar versions
4. Add comprehensive tests including fuzz tests
5. Create a benchmark in `benches/`
6. Update README.md with the new operation

### Modifying SIMD Code

When working with SIMD operations:

- Always test against a scalar reference implementation
- Use fuzz tests with randomized input (see `test_find_first_dupe_fuzz`)
- Consider boundary conditions (chunk boundaries, alignment)
- Profile before optimizing - SIMD isn't always faster for small inputs

## Benchmarking

The project uses `bencher` for benchmarking. Benchmarks are located in the `benches/` directory:

```bash
# Run specific benchmark
cargo bench --bench find_first_duplicate

# Run all benchmarks
cargo bench
```

## Type System

Currently, all operations work on `&[u64]` or `&mut [u64]`. Future work may extend to:
- Other primitive scalar types (u32, i64, etc.)
- Generic implementations over `PartialOrd + PartialEq`

## Common Pitfalls

1. **Off-by-one errors**: SIMD comparisons shift elements, watch indices carefully
2. **Undefined behavior**: `deduplicate` leaves garbage past the returned length
3. **Sorting requirement**: All functions assume input is already sorted
4. **Nightly features**: Code requires nightly Rust for `portable_simd`

## Dependencies

- **Production**: None (zero-dependency crate)
- **Development**:
  - `bencher` - Benchmarking framework
  - `rand` - Random data generation for tests
  - `anyhow` - Error handling in benchmarks

## Performance Notes

- SIMD operations process 4 elements per iteration
- Threshold for SIMD usage: typically 20+ elements
- In-place algorithms minimize memory allocation
- Benchmark on target hardware as SIMD performance varies by CPU

## Questions to Consider

When modifying code, ask:
- Does this maintain the sorted array invariant?
- Is the SIMD path correctly aligned with the scalar fallback?
- Are edge cases (empty, length < 4, unaligned) handled?
- Does the benchmark show improvement?
- Is the test coverage sufficient (including fuzz tests)?
