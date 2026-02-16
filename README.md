# sosorted: Methods for efficiently manipulating sorted arrays

This crate provides various methods for efficiently manipulating arrays of sorted data using SIMD optimizations. It supports all primitive integer types (`u8`, `u16`, `u32`, `u64`, `i8`, `i16`, `i32`, `i64`).

## API Design

All mutable operations follow a consistent pattern: **the destination buffer is always the first argument**, followed by immutable input slices. This design:
- Clearly separates output from input
- Ensures all input data remains immutable
- Allows callers to control memory allocation

```rust
// All mutable APIs follow: (dest, inputs...) -> result_length
let len = intersect(&mut dest, &a, &b);
let len = union(&mut dest, &a, &b);
let len = difference(&mut dest, &a, &b);
let len = deduplicate(&mut dest, &input);
```

## Currently Supported Operations

### Set Operations
- **`intersect`** - Computes the intersection of two sorted arrays. Writes the result to a destination buffer.
- **`union`** - Merges two sorted arrays and removes duplicates. Writes the result to a destination buffer.
- **`union_size`** - Calculates the size of the union without allocating or modifying arrays.
- **`difference`** - Computes the set difference (a \ b). Removes all occurrences of elements found in `b` from `a`. Writes the result to a destination buffer.
- **`difference_size`** - Calculates the size of the set difference (a \ b) without modifying the input.

### Deduplication
- **`deduplicate`** - Removes repeated elements from a sorted slice. Writes the result to a destination buffer.
- **`find_first_duplicate`** - Finds the index of the first duplicate entry in a sorted slice. Returns the length if no duplicates exist.

## Planned Future Operations

### Set Operations
- **`symmetric_difference`** - Elements in either array but not in both
- **`is_subset`** - Check if the first array is a subset of the second
- **`is_superset`** - Check if the first array is a superset of the second

### Merge Operations
- **`merge`** - Merge two sorted arrays (preserving duplicates)
- **`merge_unique`** - Merge two sorted arrays without duplicates

### Search Operations
- **`find_range`** - Find all elements within a specified range
- **`contains`** - Check if a specific element exists
- **`lower_bound`** - Find the first element not less than the given value
- **`upper_bound`** - Find the first element greater than the given value

### Statistics
- **`count_unique`** - Count the number of unique elements
- **`nth_unique`** - Find the nth unique element

## Types

All operations are generic over integer types via the `SortedSimdElement` trait. This trait is implemented for all primitive integer types: `u8`, `u16`, `u32`, `u64`, `i8`, `i16`, `i32`, and `i64`.

```rust
use sosorted::intersect;

// Works with u64
let a = [1u64, 2, 3, 4, 5];
let b = [2, 4];
let mut dest = [0u64; 5];
assert_eq!(intersect(&mut dest, &a, &b), 2);

// Works with i32
let c = [1i32, 3, 5, 7];
let d = [1, 5, 9];
let mut dest = [0i32; 4];
assert_eq!(intersect(&mut dest, &c, &d), 2);
```

## SIMD Hardware Compatibility

This crate uses Rust's portable SIMD (`std::simd`) and automatically selects optimal SIMD lane counts at compile time based on the target CPU features.

### Supported Architectures

| Target Feature | Register Width | Detection |
|----------------|----------------|-----------|
| AVX-512        | 512-bit        | `target_feature = "avx512f"` |
| AVX2           | 256-bit        | `target_feature = "avx2"` |
| SSE2 (fallback)| 128-bit        | Default for x86_64 |

### Type-Specific Lane Counts

Each element type uses the optimal number of SIMD lanes to fully utilize the available register width:

| Element Type | AVX-512 (512-bit) | AVX2 (256-bit) | SSE2 (128-bit) |
|--------------|-------------------|----------------|----------------|
| `u8` / `i8`  | 64 lanes          | 32 lanes       | 16 lanes       |
| `u16` / `i16`| 32 lanes          | 16 lanes       | 8 lanes        |
| `u32` / `i32`| 16 lanes          | 8 lanes        | 4 lanes        |
| `u64` / `i64`| 8 lanes           | 4 lanes        | 2 lanes        |

### Configuring Target CPU

To enable AVX2 or AVX-512 optimizations, set the target CPU at compile time:

```bash
# For AVX2 (most modern x86_64 CPUs)
RUSTFLAGS="-C target-cpu=native" cargo build --release

# Or specify a specific CPU
RUSTFLAGS="-C target-cpu=skylake" cargo build --release

# For AVX-512 (Intel Skylake-X, Ice Lake, or newer)
RUSTFLAGS="-C target-cpu=skylake-avx512" cargo build --release
```

Alternatively, create a `.cargo/config.toml` in your project:

```toml
[build]
rustflags = ["-C", "target-cpu=native"]
```

### Runtime Detection

The SIMD width is determined at compile time, not runtime. If you need to support multiple CPU generations with a single binary, compile with the lowest common denominator (SSE2) or use separate binaries for different targets.

The `SIMD_WIDTH_BITS` constant is exported and indicates the detected register width (128, 256, or 512 bits).

## References

The intersection algorithm is based on the following paper:

- Daniel Lemire, Leonid Boytsov, and Nathan Kurz. "SIMD Compression and the Intersection of Sorted Integers." *Software: Practice and Experience* 46.6 (2016): 723-749. [arXiv:1401.6399](https://arxiv.org/abs/1401.6399)