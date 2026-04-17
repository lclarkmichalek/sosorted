# AGENTS.md

This document provides guidance for AI agents working with the `sosorted` codebase.

## Project Overview

`sosorted` is a high-performance Rust library providing SIMD-accelerated operations for manipulating sorted arrays of integer types (`u8` through `u64`, and signed equivalents). The library focuses on efficiency by leveraging portable SIMD instructions to process data in parallel.

## Key Operations

The library provides seven main public APIs (all in `src/lib.rs`):

1. **`find_first_duplicate`** (`src/find_first_duplicate.rs`) - Locates the index of the first duplicate element in a sorted slice
2. **`deduplicate`** (`src/deduplicate.rs`) - Removes consecutive duplicate elements, writing to a destination buffer
3. **`intersect`** (`src/intersect.rs`) - Computes the intersection of two sorted slices
4. **`union`** (`src/union.rs`) - Merges two sorted arrays into a destination buffer with deduplication
5. **`union_size`** (`src/union.rs`) - Calculates the size of the union without allocation
6. **`difference`** (`src/difference.rs`) - Computes the set difference (a \ b), writing to a destination buffer
7. **`difference_size`** (`src/difference.rs`) - Calculates the size of the set difference without allocation
 8. **`Bitmap`** (`src/roaring/mod.rs`) - Immutable Roaring Bitmap implementation for `u32` sets

## Architecture

### File Structure

```
src/
├── lib.rs                      # Public API exports
├── simd_element.rs             # Generic SIMD trait definitions and impls
├── find_first_duplicate.rs     # First duplicate detection
├── deduplicate.rs              # Deduplication using SIMD
├── intersect.rs                # Set intersection
├── union.rs                    # Set union with SIMD
└── difference.rs               # Set difference with SIMD
└── roaring/                    # Roaring Bitmap implementation
benches/
├── find_first_duplicate.rs     # Benchmarks for duplicate finding
├── deduplicate.rs              # Benchmarks for deduplication
├── intersect.rs                # Benchmarks for intersection
└── union.rs                    # Benchmarks for union
```

### Implementation Strategy

All operations use a hybrid approach:
- **SIMD fast path**: Process multiple elements at a time using SIMD vectors. The number of lanes depends on the element size (e.g., 64 lanes for `u8` on AVX-512, 4 lanes for `u64` on AVX2).
- **Scalar fallback**: Handle edge cases, small arrays, and remainder elements.

## Technical Details

### SIMD Usage

The codebase requires nightly Rust with the `portable_simd` feature flag. Key SIMD operations:

- **Vector types**: `Simd<T, N>` where `T` is the element type and `N` is the lane count.
- **Lane counts**: Determined at compile time based on the element type and target CPU features (AVX-512, AVX2, or SSE2 fallback).
- **Traits**: `SortedSimdElement` provides generic SIMD capabilities for all primitive integer types.
- **Masking**: Check `.any()` and `.all()` to determine if any/all lanes match a condition.

### Performance Considerations

1. **Alignment handling**: Code uses `.as_simd()` (via `simd_from_slice`) to handle slices.
2. **Threshold checks**: Operations only use SIMD when array size justifies overhead.
3. **Memory efficiency**: Operations write to a provided destination buffer to avoid implicit allocations.

### Common Patterns

```rust
// Standard SIMD loop structure
let lanes = T::LANES;
if vec.len() < lanes + 1 {
    return scalar_fallback(vec);
}

// SIMD processing loop
while i + lanes <= vec.len() {
    let block = T::simd_from_slice(&vec[i..i + lanes]);
    // Process block
    i += lanes;
}
// Scalar cleanup
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
- Fuzz tests comparing SIMD implementation against scalar reference or stdlib
- Example-based tests in doc comments
- Tests for different integer types (via macros)

### Adding New Operations

When adding new sorted array operations:

1. Create a new file in `src/`
2. Export the public function in `src/lib.rs`
3. Implement both SIMD and scalar versions (generic over `SortedSimdElement`)
4. Add comprehensive tests including fuzz tests
5. Create a benchmark in `benches/<operation>.rs`
6. **Register the benchmark in `Cargo.toml`** (see Benchmarking section below)
7. Update README.md with the new operation

### Modifying SIMD Code

When working with SIMD operations:

- Always test against a scalar reference implementation
- Use fuzz tests with randomized input
- Consider boundary conditions (chunk boundaries)
- Profile before optimizing - SIMD isn't always faster for small inputs

### Pre-commit Requirements

Before committing any code, agents must ensure the following:

1. **Formatting**: Code must be formatted using `cargo fmt`.
   ```bash
   cargo fmt --all
   ```
2. **Linting**: Code must pass all clippy lints with no warnings.
   ```bash
   cargo clippy --all-targets --all-features -- -D warnings
   ```
3. **Tests**: All tests must pass, including doc tests.
   ```bash
   cargo test
   ```

### Pull Request Policy

When merging pull requests, **always use squash merge, never regular merge**. This keeps the commit history clean and ensures each PR results in a single, atomic commit on main.

```bash
# Correct: squash merge
gh pr merge <PR> --squash

# Incorrect: regular merge (do not use)
gh pr merge <PR> --merge
```

## Benchmarking

The project uses **Criterion** for statistical benchmarking with HTML report generation. Every supported operation must have comprehensive benchmarks. Note that current benchmarks primarily focus on `u64`, but the library supports all primitive integer types.

### Running Benchmarks

```bash
# Run specific benchmark
cargo bench --bench find_first_duplicate

# Run all benchmarks
cargo bench

# View HTML reports (generated in target/criterion/)
open target/criterion/report/index.html
```

### Benchmark Requirements

Each operation benchmark must include:

1. **Comparison against standard library** - Compare with idiomatic Rust stdlib approaches
   - `deduplicate` → compare with `Vec::dedup()`
   - `intersect` → compare with `HashSet::intersection()`
   - `find_first_duplicate` → compare with `.windows(2)` iterator

2. **Comparison against naive implementation** - Simple scalar loop without SIMD optimizations

3. **Multiple data scenarios** - Test different input patterns:
   - Best case (early exit conditions)
   - Worst case (full traversal required)
   - Average case (mid-range scenarios)
   - Edge cases (empty, all duplicates, all unique)

4. **Scaling benchmarks** - Test performance across different input sizes:
   - Small: 1024 elements
   - Medium: 8192 elements
   - Large: 65536 elements
   - Very large: 524288 elements

5. **Throughput metrics** - Set throughput in bytes for performance comparison

### Benchmark Structure

```rust
use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};

fn bench_operation(c: &mut Criterion) {
    let mut group = c.benchmark_group("operation_name");
    group.throughput(Throughput::Bytes((N * 8) as u64));

    // Benchmark sosorted implementation
    group.bench_function("sosorted/scenario", |b| {
        b.iter(|| black_box(operation(black_box(&data))));
    });

    // Benchmark stdlib alternative
    group.bench_function("stdlib/scenario", |b| {
        b.iter(|| black_box(stdlib_operation(black_box(&data))));
    });

    group.finish();
}

criterion_group!(benches, bench_operation);
criterion_main!(benches);
```

### Maintaining Benchmarks

When adding a new operation:

1. Create `benches/<operation_name>.rs` with Criterion benchmark functions
2. **CRITICAL: Register benchmark in `Cargo.toml`**
   ```toml
   [[bench]]
   name = "operation_name"
   harness = false
   ```
   Without this, benchmarks will run as regular tests (showing "0 tests") instead of executing as Criterion benchmarks, and **won't appear in CI benchmark results**.
3. Implement comparison functions (naive, stdlib, HashSet where applicable)
4. Create multiple test scenarios (best/worst/average cases)
5. Add scaling benchmarks across different sizes
6. Run `cargo bench --bench operation_name` to verify benchmarks execute correctly
7. Review HTML reports to ensure meaningful comparisons

### Current Benchmarks

- **`intersect`** - Compares against naive merge and `HashSet::intersection()`
- **`deduplicate`** - Compares against naive loop, `Vec::dedup()`, and `HashSet`
- **`find_first_duplicate`** - Compares against naive loop and `.windows(2)` iterator
- **`union`** - Compares against naive merge and `HashSet::union()` with sort
- **`difference`** - Compares against naive loop and `HashSet` difference

### Benchmark Data Generation

All benchmarks use deterministic seeded RNG for reproducibility:

```rust
let seed: [u8; 32] = [165, 35, 33, ...]; // Fixed seed
let mut rng = SmallRng::from_seed(seed);
```

This ensures:
- Reproducible results across runs
- Fair comparisons between implementations
- Consistent performance regression detection

## Type System

All operations are generic via the `SortedSimdElement` trait.
- **Supported types**: `u8`, `u16`, `u32`, `u64`, `i8`, `i16`, `i32`, `i64`.
- **Method signatures**: Generally `fn op<T>(dest: &mut [T], a: &[T], ...) -> usize`

## Common Pitfalls

1. **Off-by-one errors**: SIMD comparisons shift elements, watch indices carefully
2. **Undefined behavior**: `deduplicate` (and other mutable ops) leaves garbage past the returned length
3. **Sorting requirement**: All functions assume input is already sorted
4. **Nightly features**: Code requires nightly Rust for `portable_simd`

## Dependencies

- **Production**: None (zero-dependency crate)
- **Development**:
  - `criterion` - Statistical benchmarking framework with HTML reports
  - `rand` - Random data generation for tests and benchmarks
  - `anyhow` - Error handling in tests

## Performance Notes

- SIMD operations process `LANES` elements per iteration (varies by type/CPU)
- Threshold for SIMD usage: typically `LANES + 1` elements
- In-place algorithms minimize memory allocation
- Benchmark on target hardware as SIMD performance varies by CPU
