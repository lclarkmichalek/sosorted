# sosorted: Methods for efficiently manipulating sorted arrays

This crate provides various methods for efficiently manipulating arrays of sorted data using SIMD optimizations.

## Currently Supported Operations

### Set Operations
- **`intersect`** - Computes the intersection of two sorted arrays. Modifies the first array in-place to contain only elements present in both arrays.
- **`union`** - Merges two sorted arrays and removes duplicates. Writes the result to a destination buffer, leveraging SIMD for performance.
- **`union_size`** - Calculates the size of the union without allocating or modifying arrays.

### Deduplication
- **`deduplicate`** - Removes repeated elements from a sorted slice. Returns the length of the deduplicated prefix.
- **`find_first_duplicate`** - Finds the index of the first duplicate entry in a sorted slice. Returns the length if no duplicates exist.

## Planned Future Operations

### Set Operations
- **`difference`** - Elements in the first array but not in the second
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

All operations are currently defined against `&[u64]`. Support for all primitive scalar types is planned for future releases.