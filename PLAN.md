# Plan: Generic Scalar Datatype Support for sosorted

## Overview

Make sosorted generic over native scalar types that support SIMD operations, while maintaining the current u64 performance as baseline.

## Target Types

Primary targets (all support efficient SIMD):
- `u64`, `i64` - 64-bit integers (current SIMD width: 4 lanes)
- `u32`, `i32` - 32-bit integers (SIMD width: 8 lanes on 256-bit vectors)
- `u16`, `i16` - 16-bit integers (SIMD width: 16 lanes on 256-bit vectors)
- `u8`, `i8` - 8-bit integers (SIMD width: 32 lanes on 256-bit vectors)

Secondary targets (optional, require additional trait bounds):
- `f32`, `f64` - Floating point (need careful handling of NaN)

## Implementation Strategy

### Phase 1: Define the SimdElement Trait

Create a sealed trait that encapsulates SIMD capabilities for scalar types.

**File: `src/simd_element.rs` (new)**

```rust
use std::simd::{Simd, SimdElement as StdSimdElement, cmp::{SimdPartialEq, SimdPartialOrd}};

/// The SIMD lane width we'll use (4 lanes for now, matching current u64x4)
pub const SIMD_LANES: usize = 4;

/// Sealed trait pattern to prevent external implementations
mod sealed {
    pub trait Sealed {}
}

/// Trait for scalar types that can be used with SIMD-accelerated sorted operations.
///
/// This trait is sealed and cannot be implemented outside this crate.
pub trait SortedSimdElement:
    sealed::Sealed
    + StdSimdElement
    + Copy
    + PartialOrd
    + PartialEq
    + Default
where
    Simd<Self, SIMD_LANES>: SimdPartialEq<Mask = std::simd::Mask<Self::Mask, SIMD_LANES>>
        + SimdPartialOrd<Mask = std::simd::Mask<Self::Mask, SIMD_LANES>>,
{
    /// The mask element type for SIMD comparisons
    type Mask: std::simd::MaskElement;
}
```

**Implement for all target types:**
```rust
impl sealed::Sealed for u64 {}
impl sealed::Sealed for i64 {}
impl sealed::Sealed for u32 {}
impl sealed::Sealed for i32 {}
// ... etc

impl SortedSimdElement for u64 { type Mask = i64; }
impl SortedSimdElement for i64 { type Mask = i64; }
impl SortedSimdElement for u32 { type Mask = i32; }
impl SortedSimdElement for i32 { type Mask = i32; }
// ... etc
```

### Phase 2: Update intersect.rs

**Changes:**
1. Make `intersect` generic over `T: SortedSimdElement`
2. Replace `u64x4` with `Simd<T, SIMD_LANES>`
3. Replace `u64x4::splat()` with `Simd::<T, SIMD_LANES>::splat()`
4. Use `Simd::from_slice()` (already generic)

**Before:**
```rust
pub fn intersect(a: &mut [u64], b: &[u64]) -> usize {
    let b_vals: u64x4 = Simd::from_slice(&b[j..j + 4]);
    let a_val = u64x4::splat(a[i]);
```

**After:**
```rust
pub fn intersect<T: SortedSimdElement>(a: &mut [T], b: &[T]) -> usize
where
    Simd<T, SIMD_LANES>: SimdPartialOrd,
{
    let b_vals: Simd<T, SIMD_LANES> = Simd::from_slice(&b[j..j + 4]);
    let a_val = Simd::<T, SIMD_LANES>::splat(a[i]);
```

### Phase 3: Update union.rs

**Changes:**
1. Make `union` and `union_size` generic over `T: SortedSimdElement`
2. Replace `u64x4` with `Simd<T, SIMD_LANES>`
3. Replace `Option<u64>` with `Option<T>`
4. Use generic SIMD operations

### Phase 4: Update deduplicate.rs

**Changes:**
1. Make `deduplicate` generic over `T: SortedSimdElement`
2. Replace `u64x4` with `Simd<T, SIMD_LANES>`
3. The `find_first_duplicate` call will work once that's generic

### Phase 5: Update find_first_duplicate.rs (Most Complex)

**Challenge:** The `simd_swizzle!` macro is used with hardcoded indices that work for 4-lane vectors.

**Changes:**
1. Make `find_first_duplicate` generic over `T: SortedSimdElement`
2. The swizzle pattern `[1, 2, 3, 4]` shifts elements to compare adjacent pairs - this works generically
3. Replace `vec.as_simd()` with explicit slice handling (as_simd returns type-appropriate alignment)
4. The scalar fallback `find_first_duplicate_scalar<T>` already exists and is generic!

**Key insight:** `simd_swizzle!` should work with `Simd<T, 4>` for any T, as long as indices are valid.

### Phase 6: Update lib.rs

**Changes:**
1. Export the `SortedSimdElement` trait
2. Add module declaration for `simd_element`
3. Keep backward-compatible re-exports

```rust
#![feature(portable_simd)]

mod simd_element;
pub use simd_element::SortedSimdElement;

mod deduplicate;
pub use deduplicate::deduplicate;

mod find_first_duplicate;
pub use find_first_duplicate::find_first_duplicate;

mod intersect;
pub use intersect::intersect;

mod union;
pub use union::{union, union_size};
```

### Phase 7: Update Tests

**Approach: Macro-based test generation**

Create a macro that generates tests for each supported type:

```rust
macro_rules! generate_tests {
    ($($t:ty),*) => {
        $(
            mod $t {
                use super::*;

                #[test]
                fn test_intersect_basic() {
                    let mut a: Vec<$t> = vec![1, 2, 3, 4, 5];
                    let b: Vec<$t> = vec![1, 3, 5];
                    let new_len = intersect(&mut a, &b);
                    assert_eq!(new_len, 3);
                }
                // ... more tests
            }
        )*
    };
}

generate_tests!(u64, i64, u32, i32, u16, i16, u8, i8);
```

**For fuzz tests:** Need type-appropriate random generation:
- `rng.next_u64()` for u64
- `rng.next_u32()` for u32
- etc.

### Phase 8: Update Benchmarks

**Changes:**
1. Add type parameter to benchmark functions
2. Create benchmark groups for each type
3. Update throughput calculations: `element_count * std::mem::size_of::<T>()`

```rust
fn intersect_benchmark<T: SortedSimdElement>(c: &mut Criterion, name: &str)
where
    Standard: Distribution<T>,
{
    // ... benchmark code using T
}

fn main() {
    intersect_benchmark::<u64>(&mut c, "u64");
    intersect_benchmark::<u32>(&mut c, "u32");
    // ...
}
```

## File Change Summary

| File | Type | Changes |
|------|------|---------|
| `src/simd_element.rs` | **New** | SortedSimdElement trait + implementations |
| `src/lib.rs` | Modify | Add module, export trait |
| `src/intersect.rs` | Modify | Generic `T: SortedSimdElement` |
| `src/union.rs` | Modify | Generic `T: SortedSimdElement` |
| `src/deduplicate.rs` | Modify | Generic `T: SortedSimdElement` |
| `src/find_first_duplicate.rs` | Modify | Generic `T: SortedSimdElement` |
| `benches/*.rs` | Modify | Type-parameterized benchmarks |
| `AGENTS.md` | Modify | Document generic API |

## Implementation Order

1. **src/simd_element.rs** - Foundation trait (new file)
2. **src/lib.rs** - Wire up the module
3. **src/find_first_duplicate.rs** - Has the scalar fallback already, good starting point
4. **src/deduplicate.rs** - Depends on find_first_duplicate
5. **src/intersect.rs** - Self-contained
6. **src/union.rs** - Self-contained, largest file
7. **Tests** - Update all test modules
8. **Benchmarks** - Type-parameterized benchmarks
9. **AGENTS.md** - Documentation update

## Technical Considerations

### SIMD Lane Width

Currently hardcoded to 4 lanes (u64x4). Options:
1. **Keep 4 lanes for all types** - Simpler, consistent behavior
2. **Optimize lane width per type** - Better performance for smaller types (u32x8, etc.)

**Recommendation:** Start with 4 lanes for simplicity. Lane width optimization can be a follow-up.

### Trait Bounds Complexity

The SIMD trait bounds can get complex. Key requirements:
- `T: SimdElement` - Can be put in a SIMD vector
- `Simd<T, N>: SimdPartialEq + SimdPartialOrd` - Can do comparisons
- `T: Copy + PartialOrd + Default` - Standard scalar operations

### Backward Compatibility

The API changes from:
```rust
fn intersect(a: &mut [u64], b: &[u64]) -> usize
```
To:
```rust
fn intersect<T: SortedSimdElement>(a: &mut [T], b: &[T]) -> usize
```

**This is source-compatible** - existing code calling `intersect(&mut data, &other)` with u64 slices will continue to work via type inference.

### Floating Point Considerations

`f32`/`f64` can be supported but have edge cases:
- NaN comparisons are tricky
- May want to add `T: Ord` bound to exclude floats from some operations

**Recommendation:** Start without float support, add later with proper NaN handling.

## Testing Strategy

1. **Unit tests** - Cover all supported types with basic cases
2. **Fuzz tests** - Random data for each type, compare against scalar reference
3. **Cross-type verification** - Ensure same logical data gives same results across types
4. **SIMD boundary tests** - Test behavior at SIMD chunk boundaries for each type
5. **Benchmarks** - Performance regression tests

## Success Criteria

1. All existing u64 tests pass
2. New tests pass for all supported types (u64, i64, u32, i32, u16, i16, u8, i8)
3. No performance regression for u64 operations
4. Clean, documented public API with the `SortedSimdElement` trait
5. Updated documentation in AGENTS.md
