use std::collections::{BTreeMap, BTreeSet};
use std::fmt;
use std::hash::{Hash, Hasher};
use std::ops::{BitAnd, BitOr};

use super::container::{ArrayContainer, Container, ARRAY_CONTAINER_THRESHOLD};
use super::iter::BitmapIter;

/// An immutable roaring bitmap for efficiently storing sets of `u32` values.
///
/// Roaring bitmaps use a hybrid approach: 32-bit integers are split into high 16 bits
/// (container key) and low 16 bits (stored in container). Containers can be either
/// arrays (for sparse data) or bitmaps (for dense data), automatically chosen based
/// on cardinality.
///
/// # Examples
///
/// ```
/// use sosorted::Bitmap;
///
/// let bitmap1 = Bitmap::from_sorted_slice(&[1, 5, 100]);
/// let bitmap2 = Bitmap::from_sorted_slice(&[5, 100, 200]);
///
/// let union = bitmap1.union(&bitmap2);
/// assert_eq!(union.len(), 4); // [1, 5, 100, 200]
///
/// let intersection = bitmap1.intersection(&bitmap2);
/// assert_eq!(intersection.len(), 2); // [5, 100]
/// ```
#[derive(Clone)]
pub struct Bitmap {
    pub(crate) containers: BTreeMap<u16, Container>,
    pub(crate) cardinality: usize,
}

impl Bitmap {
    /// Creates a new empty bitmap.
    ///
    /// # Examples
    ///
    /// ```
    /// use sosorted::Bitmap;
    ///
    /// let bitmap = Bitmap::new();
    /// assert_eq!(bitmap.len(), 0);
    /// assert!(bitmap.is_empty());
    /// ```
    pub fn new() -> Self {
        Bitmap {
            containers: BTreeMap::new(),
            cardinality: 0,
        }
    }

    /// Creates a bitmap from a sorted slice of `u32` values.
    ///
    /// This is the most efficient way to construct a bitmap if your data is already sorted.
    /// The input must be sorted in ascending order; behavior is undefined if not sorted.
    ///
    /// # Examples
    ///
    /// ```
    /// use sosorted::Bitmap;
    ///
    /// let bitmap = Bitmap::from_sorted_slice(&[1, 5, 10, 100, 1000]);
    /// assert_eq!(bitmap.len(), 5);
    /// assert!(bitmap.contains(100));
    /// ```
    pub fn from_sorted_slice(values: &[u32]) -> Self {
        let mut containers = BTreeMap::new();
        let mut cardinality = 0;

        if values.is_empty() {
            return Bitmap::new();
        }

        let mut current_high = high_bits(values[0]);
        let mut current_values = Vec::new();

        for &value in values {
            let high = high_bits(value);
            let low = low_bits(value);

            if high != current_high {
                // Finalize the current container
                let container = create_container(current_values);
                cardinality += container.cardinality();
                containers.insert(current_high, container);

                current_high = high;
                current_values = Vec::new();
            }

            current_values.push(low);
        }

        // Finalize the last container
        if !current_values.is_empty() {
            let container = create_container(current_values);
            cardinality += container.cardinality();
            containers.insert(current_high, container);
        }

        Bitmap {
            containers,
            cardinality,
        }
    }

    /// Returns `true` if the bitmap contains the given value.
    ///
    /// # Examples
    ///
    /// ```
    /// use sosorted::Bitmap;
    ///
    /// let bitmap = Bitmap::from_sorted_slice(&[1, 5, 10]);
    /// assert!(bitmap.contains(5));
    /// assert!(!bitmap.contains(6));
    /// ```
    pub fn contains(&self, value: u32) -> bool {
        let high = high_bits(value);
        let low = low_bits(value);

        self.containers
            .get(&high)
            .is_some_and(|container| container.contains(low))
    }

    /// Returns the number of elements in the bitmap.
    ///
    /// # Examples
    ///
    /// ```
    /// use sosorted::Bitmap;
    ///
    /// let bitmap = Bitmap::from_sorted_slice(&[1, 5, 10]);
    /// assert_eq!(bitmap.len(), 3);
    /// ```
    pub fn len(&self) -> usize {
        self.cardinality
    }

    /// Returns `true` if the bitmap contains no elements.
    ///
    /// # Examples
    ///
    /// ```
    /// use sosorted::Bitmap;
    ///
    /// let bitmap = Bitmap::new();
    /// assert!(bitmap.is_empty());
    ///
    /// let bitmap = Bitmap::from_sorted_slice(&[1]);
    /// assert!(!bitmap.is_empty());
    /// ```
    pub fn is_empty(&self) -> bool {
        self.cardinality == 0
    }

    /// Computes the union of two bitmaps, returning a new bitmap.
    ///
    /// The union contains all elements that are in either bitmap.
    ///
    /// # Examples
    ///
    /// ```
    /// use sosorted::Bitmap;
    ///
    /// let bitmap1 = Bitmap::from_sorted_slice(&[1, 2, 3]);
    /// let bitmap2 = Bitmap::from_sorted_slice(&[2, 3, 4]);
    /// let union = bitmap1.union(&bitmap2);
    ///
    /// assert_eq!(union.len(), 4);
    /// assert_eq!(union.to_vec(), vec![1, 2, 3, 4]);
    /// ```
    pub fn union(&self, other: &Bitmap) -> Bitmap {
        let mut containers = BTreeMap::new();
        let mut cardinality = 0;

        // Collect all unique keys from both bitmaps
        let all_keys: BTreeSet<_> = self
            .containers
            .keys()
            .chain(other.containers.keys())
            .copied()
            .collect();

        for high in all_keys {
            let container = match (self.containers.get(&high), other.containers.get(&high)) {
                (Some(a), Some(b)) => a.union(b),
                (Some(a), None) => a.clone(),
                (None, Some(b)) => b.clone(),
                (None, None) => unreachable!(),
            };
            cardinality += container.cardinality();
            containers.insert(high, container);
        }

        Bitmap {
            containers,
            cardinality,
        }
    }

    /// Computes the intersection of two bitmaps, returning a new bitmap.
    ///
    /// The intersection contains all elements that are in both bitmaps.
    ///
    /// # Examples
    ///
    /// ```
    /// use sosorted::Bitmap;
    ///
    /// let bitmap1 = Bitmap::from_sorted_slice(&[1, 2, 3]);
    /// let bitmap2 = Bitmap::from_sorted_slice(&[2, 3, 4]);
    /// let intersection = bitmap1.intersection(&bitmap2);
    ///
    /// assert_eq!(intersection.len(), 2);
    /// assert_eq!(intersection.to_vec(), vec![2, 3]);
    /// ```
    pub fn intersection(&self, other: &Bitmap) -> Bitmap {
        let mut containers = BTreeMap::new();
        let mut cardinality = 0;

        // Only iterate over keys present in both bitmaps
        for (&high, self_container) in &self.containers {
            if let Some(other_container) = other.containers.get(&high) {
                let result = self_container.intersect(other_container);
                let card = result.cardinality();
                if card > 0 {
                    cardinality += card;
                    containers.insert(high, result);
                }
            }
        }

        Bitmap {
            containers,
            cardinality,
        }
    }

    /// Converts the bitmap to a sorted `Vec<u32>`.
    ///
    /// # Examples
    ///
    /// ```
    /// use sosorted::Bitmap;
    ///
    /// let bitmap = Bitmap::from_sorted_slice(&[1, 5, 10]);
    /// assert_eq!(bitmap.to_vec(), vec![1, 5, 10]);
    /// ```
    pub fn to_vec(&self) -> Vec<u32> {
        let mut result = Vec::with_capacity(self.cardinality);
        for (&high, container) in &self.containers {
            for low in container.iter() {
                result.push(combine(high, low));
            }
        }
        result
    }

    /// Returns an iterator over the elements in the bitmap.
    ///
    /// Elements are yielded in ascending order.
    ///
    /// # Examples
    ///
    /// ```
    /// use sosorted::Bitmap;
    ///
    /// let bitmap = Bitmap::from_sorted_slice(&[1, 5, 10]);
    /// let values: Vec<u32> = bitmap.iter().collect();
    /// assert_eq!(values, vec![1, 5, 10]);
    /// ```
    pub fn iter(&self) -> BitmapIter<'_> {
        BitmapIter::new(self)
    }
}

// Helper functions for splitting and combining u32 values

/// Extracts the high 16 bits from a u32 value.
#[inline]
fn high_bits(value: u32) -> u16 {
    (value >> 16) as u16
}

/// Extracts the low 16 bits from a u32 value.
#[inline]
fn low_bits(value: u32) -> u16 {
    value as u16
}

/// Combines high and low 16-bit values into a u32.
#[inline]
pub(crate) fn combine(high: u16, low: u16) -> u32 {
    ((high as u32) << 16) | (low as u32)
}

/// Creates an appropriate container from a vec of u16 values.
fn create_container(mut values: Vec<u16>) -> Container {
    if values.len() >= ARRAY_CONTAINER_THRESHOLD {
        // Create bitmap container for dense data
        use super::container::BitmapContainer;
        Container::Bitmap(BitmapContainer::from_array_slice(&values))
    } else {
        // Use array container for sparse data
        values.sort_unstable();
        values.dedup();
        Container::Array(ArrayContainer { values })
    }
}

// Trait implementations

impl Default for Bitmap {
    fn default() -> Self {
        Bitmap::new()
    }
}

impl fmt::Debug for Bitmap {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.debug_struct("Bitmap")
            .field("len", &self.len())
            .field("containers", &self.containers.len())
            .finish()
    }
}

impl PartialEq for Bitmap {
    fn eq(&self, other: &Self) -> bool {
        self.cardinality == other.cardinality && self.containers == other.containers
    }
}

impl Eq for Bitmap {}

impl Hash for Bitmap {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.cardinality.hash(state);
        // BTreeMap iteration is deterministic (sorted by key)
        for (key, container) in &self.containers {
            key.hash(state);
            container.hash(state);
        }
    }
}

impl FromIterator<u32> for Bitmap {
    fn from_iter<I: IntoIterator<Item = u32>>(iter: I) -> Self {
        let mut values: Vec<u32> = iter.into_iter().collect();
        values.sort_unstable();
        values.dedup();
        Bitmap::from_sorted_slice(&values)
    }
}

impl<'a> IntoIterator for &'a Bitmap {
    type Item = u32;
    type IntoIter = BitmapIter<'a>;

    fn into_iter(self) -> Self::IntoIter {
        self.iter()
    }
}

impl From<Vec<u32>> for Bitmap {
    fn from(mut values: Vec<u32>) -> Self {
        values.sort_unstable();
        values.dedup();
        Bitmap::from_sorted_slice(&values)
    }
}

impl From<&[u32]> for Bitmap {
    fn from(values: &[u32]) -> Self {
        let mut sorted = values.to_vec();
        sorted.sort_unstable();
        sorted.dedup();
        Bitmap::from_sorted_slice(&sorted)
    }
}

impl BitOr for &Bitmap {
    type Output = Bitmap;

    fn bitor(self, rhs: &Bitmap) -> Bitmap {
        self.union(rhs)
    }
}

impl BitAnd for &Bitmap {
    type Output = Bitmap;

    fn bitand(self, rhs: &Bitmap) -> Bitmap {
        self.intersection(rhs)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_empty_bitmap() {
        let bitmap = Bitmap::new();
        assert_eq!(bitmap.len(), 0);
        assert!(bitmap.is_empty());
        assert!(!bitmap.contains(42));
    }

    #[test]
    fn test_from_sorted_slice() {
        let bitmap = Bitmap::from_sorted_slice(&[1, 5, 10, 100, 1000]);
        assert_eq!(bitmap.len(), 5);
        assert!(bitmap.contains(1));
        assert!(bitmap.contains(100));
        assert!(!bitmap.contains(2));
    }

    #[test]
    fn test_contains() {
        let bitmap = Bitmap::from_sorted_slice(&[1, 100, 10000, 1000000]);
        assert!(bitmap.contains(1));
        assert!(bitmap.contains(100));
        assert!(bitmap.contains(10000));
        assert!(bitmap.contains(1000000));
        assert!(!bitmap.contains(2));
        assert!(!bitmap.contains(99));
    }

    #[test]
    fn test_union() {
        let bitmap1 = Bitmap::from_sorted_slice(&[1, 2, 3]);
        let bitmap2 = Bitmap::from_sorted_slice(&[2, 3, 4]);
        let union = bitmap1.union(&bitmap2);

        assert_eq!(union.len(), 4);
        assert_eq!(union.to_vec(), vec![1, 2, 3, 4]);
    }

    #[test]
    fn test_intersection() {
        let bitmap1 = Bitmap::from_sorted_slice(&[1, 2, 3, 4]);
        let bitmap2 = Bitmap::from_sorted_slice(&[2, 3, 4, 5]);
        let intersection = bitmap1.intersection(&bitmap2);

        assert_eq!(intersection.len(), 3);
        assert_eq!(intersection.to_vec(), vec![2, 3, 4]);
    }

    #[test]
    fn test_operators() {
        let bitmap1 = Bitmap::from_sorted_slice(&[1, 2, 3]);
        let bitmap2 = Bitmap::from_sorted_slice(&[2, 3, 4]);

        let union = &bitmap1 | &bitmap2;
        assert_eq!(union.len(), 4);

        let intersection = &bitmap1 & &bitmap2;
        assert_eq!(intersection.len(), 2);
    }

    #[test]
    fn test_equality() {
        let bitmap1 = Bitmap::from_sorted_slice(&[1, 2, 3]);
        let bitmap2 = Bitmap::from_sorted_slice(&[1, 2, 3]);
        let bitmap3 = Bitmap::from_sorted_slice(&[1, 2, 4]);

        assert_eq!(bitmap1, bitmap2);
        assert_ne!(bitmap1, bitmap3);
    }

    #[test]
    fn test_from_iterator() {
        let bitmap: Bitmap = vec![3, 1, 2, 1].into_iter().collect();
        assert_eq!(bitmap.len(), 3);
        assert_eq!(bitmap.to_vec(), vec![1, 2, 3]);
    }

    #[test]
    fn test_multiple_containers() {
        // Values that span multiple 16-bit ranges
        let values: Vec<u32> = vec![1, 100, 65536, 65537, 131072];
        let bitmap = Bitmap::from_sorted_slice(&values);

        assert_eq!(bitmap.len(), 5);
        assert_eq!(bitmap.containers.len(), 3); // 3 different high bits
        assert!(bitmap.contains(1));
        assert!(bitmap.contains(65536));
        assert!(bitmap.contains(131072));
    }

    #[test]
    fn test_clone() {
        let bitmap1 = Bitmap::from_sorted_slice(&[1, 2, 3]);
        let bitmap2 = bitmap1.clone();

        assert_eq!(bitmap1, bitmap2);
        assert_eq!(bitmap1.to_vec(), bitmap2.to_vec());
    }

    #[test]
    fn test_set_properties() {
        let a = Bitmap::from_sorted_slice(&[1, 2, 3]);
        let b = Bitmap::from_sorted_slice(&[2, 3, 4]);

        // Union is commutative
        assert_eq!(a.union(&b), b.union(&a));

        // Intersection is commutative
        assert_eq!(a.intersection(&b), b.intersection(&a));

        // Union with self equals self
        assert_eq!(a.union(&a), a);

        // Intersection with self equals self
        assert_eq!(a.intersection(&a), a);
    }
}
