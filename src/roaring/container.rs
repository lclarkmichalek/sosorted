use std::hash::{Hash, Hasher};

/// Threshold for converting between array and bitmap containers.
/// Arrays are more efficient for sparse data (< 4096 elements),
/// while bitmaps are more efficient for dense data (>= 4096 elements).
pub(crate) const ARRAY_CONTAINER_THRESHOLD: usize = 4096;

/// A container holds a subset of values within a 16-bit range.
#[derive(Clone, PartialEq, Eq)]
pub(crate) enum Container {
    Array(ArrayContainer),
    Bitmap(BitmapContainer),
}

impl Container {
    /// Returns true if the container contains the given value.
    pub(crate) fn contains(&self, value: u16) -> bool {
        match self {
            Container::Array(a) => a.contains(value),
            Container::Bitmap(b) => b.contains(value),
        }
    }

    /// Returns the number of elements in the container.
    pub(crate) fn cardinality(&self) -> usize {
        match self {
            Container::Array(a) => a.cardinality(),
            Container::Bitmap(b) => b.cardinality(),
        }
    }

    /// Computes the union of two containers.
    pub(crate) fn union(&self, other: &Container) -> Container {
        match (self, other) {
            (Container::Array(a), Container::Array(b)) => a.union_array(b),
            (Container::Array(a), Container::Bitmap(b)) => b.union_array(a),
            (Container::Bitmap(a), Container::Array(b)) => a.union_array(b),
            (Container::Bitmap(a), Container::Bitmap(b)) => Container::Bitmap(a.union_bitmap(b)),
        }
    }

    /// Computes the intersection of two containers.
    pub(crate) fn intersect(&self, other: &Container) -> Container {
        match (self, other) {
            (Container::Array(a), Container::Array(b)) => a.intersect_array(b),
            (Container::Array(a), Container::Bitmap(b)) => a.intersect_bitmap(b),
            (Container::Bitmap(a), Container::Array(b)) => b.intersect_bitmap(a),
            (Container::Bitmap(a), Container::Bitmap(b)) => {
                Container::Bitmap(a.intersect_bitmap(b))
            }
        }
    }

    /// Creates an iterator over the elements in the container.
    pub(crate) fn iter(&self) -> ContainerIter<'_> {
        match self {
            Container::Array(a) => ContainerIter::Array(a.values.iter()),
            Container::Bitmap(b) => ContainerIter::Bitmap(BitmapContainerIter::new(b)),
        }
    }
}

impl Hash for Container {
    fn hash<H: Hasher>(&self, state: &mut H) {
        match self {
            Container::Array(a) => {
                0u8.hash(state); // Discriminant
                a.hash(state);
            }
            Container::Bitmap(b) => {
                1u8.hash(state); // Discriminant
                b.hash(state);
            }
        }
    }
}

/// Array container for sparse data (< 4096 elements).
/// Stores sorted u16 values in a Vec.
#[derive(Clone, PartialEq, Eq, Hash)]
pub(crate) struct ArrayContainer {
    pub(crate) values: Vec<u16>,
}

impl ArrayContainer {
    /// Returns true if the container contains the given value.
    pub(crate) fn contains(&self, value: u16) -> bool {
        self.values.binary_search(&value).is_ok()
    }

    /// Returns the number of elements in the container.
    pub(crate) fn cardinality(&self) -> usize {
        self.values.len()
    }

    /// Computes the union with another array container.
    fn union_array(&self, other: &ArrayContainer) -> Container {
        // Use sosorted::union for efficient merging
        let mut dest = vec![0u16; self.values.len() + other.values.len()];
        let len = crate::union(&mut dest, &self.values, &other.values);
        dest.truncate(len);

        // Convert to bitmap if result is dense
        if len >= ARRAY_CONTAINER_THRESHOLD {
            Container::Bitmap(BitmapContainer::from_array_slice(&dest))
        } else {
            Container::Array(ArrayContainer { values: dest })
        }
    }

    /// Computes the intersection with another array container.
    fn intersect_array(&self, other: &ArrayContainer) -> Container {
        // Use sosorted::intersect for efficient intersection
        let min_len = self.values.len().min(other.values.len());
        let mut dest = vec![0u16; min_len];
        let len = crate::intersect(&mut dest, &self.values, &other.values);
        dest.truncate(len);

        Container::Array(ArrayContainer { values: dest })
    }

    /// Computes the intersection with a bitmap container.
    fn intersect_bitmap(&self, bitmap: &BitmapContainer) -> Container {
        let mut result = Vec::with_capacity(self.values.len());
        for &value in &self.values {
            if bitmap.contains(value) {
                result.push(value);
            }
        }
        Container::Array(ArrayContainer { values: result })
    }
}

/// Bitmap container for dense data (>= 4096 elements).
/// Stores a bitmap of 65536 bits (8KB) using an array of u64.
#[derive(Clone)]
pub(crate) struct BitmapContainer {
    pub(crate) bits: Box<[u64; 1024]>, // 1024 * 64 = 65536 bits
}

impl BitmapContainer {
    /// Creates a new empty bitmap container.
    pub(crate) fn new() -> Self {
        BitmapContainer {
            bits: Box::new([0u64; 1024]),
        }
    }

    /// Creates a bitmap container from a sorted array of u16 values.
    pub(crate) fn from_array_slice(values: &[u16]) -> Self {
        let mut container = Self::new();
        for &value in values {
            container.set(value);
        }
        container
    }

    /// Sets a bit in the bitmap.
    fn set(&mut self, value: u16) {
        let word_idx = (value / 64) as usize;
        let bit_idx = value % 64;
        self.bits[word_idx] |= 1u64 << bit_idx;
    }

    /// Returns true if the bitmap contains the given value.
    pub(crate) fn contains(&self, value: u16) -> bool {
        let word_idx = (value / 64) as usize;
        let bit_idx = value % 64;
        (self.bits[word_idx] >> bit_idx) & 1 == 1
    }

    /// Returns the number of set bits in the bitmap (cardinality).
    pub(crate) fn cardinality(&self) -> usize {
        self.bits.iter().map(|w| w.count_ones() as usize).sum()
    }

    /// Computes the union with another bitmap container.
    fn union_bitmap(&self, other: &BitmapContainer) -> BitmapContainer {
        let mut result = Box::new([0u64; 1024]);
        for i in 0..1024 {
            result[i] = self.bits[i] | other.bits[i];
        }
        BitmapContainer { bits: result }
    }

    /// Computes the union with an array container.
    fn union_array(&self, array: &ArrayContainer) -> Container {
        let mut result = self.clone();
        for &value in &array.values {
            result.set(value);
        }
        Container::Bitmap(result)
    }

    /// Computes the intersection with another bitmap container.
    fn intersect_bitmap(&self, other: &BitmapContainer) -> BitmapContainer {
        let mut result = Box::new([0u64; 1024]);
        for i in 0..1024 {
            result[i] = self.bits[i] & other.bits[i];
        }
        BitmapContainer { bits: result }
    }
}

impl PartialEq for BitmapContainer {
    fn eq(&self, other: &Self) -> bool {
        self.bits[..] == other.bits[..]
    }
}

impl Eq for BitmapContainer {}

impl Hash for BitmapContainer {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.bits[..].hash(state);
    }
}

/// Iterator over elements in a container.
pub(crate) enum ContainerIter<'a> {
    Array(std::slice::Iter<'a, u16>),
    Bitmap(BitmapContainerIter<'a>),
}

impl<'a> Iterator for ContainerIter<'a> {
    type Item = u16;

    fn next(&mut self) -> Option<Self::Item> {
        match self {
            ContainerIter::Array(iter) => iter.next().copied(),
            ContainerIter::Bitmap(iter) => iter.next(),
        }
    }
}

/// Iterator over set bits in a bitmap container.
pub(crate) struct BitmapContainerIter<'a> {
    bits: &'a [u64; 1024],
    word_idx: usize,
    current_word: u64,
}

impl<'a> BitmapContainerIter<'a> {
    fn new(container: &'a BitmapContainer) -> Self {
        let current_word = container.bits[0];
        BitmapContainerIter {
            bits: &container.bits,
            word_idx: 0,
            current_word,
        }
    }
}

impl<'a> Iterator for BitmapContainerIter<'a> {
    type Item = u16;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            if self.current_word != 0 {
                // Find the next set bit in the current word
                let bit_idx = self.current_word.trailing_zeros();
                let value = (self.word_idx * 64 + bit_idx as usize) as u16;
                // Clear the bit
                self.current_word &= self.current_word - 1;
                return Some(value);
            }

            // Move to next word
            self.word_idx += 1;
            if self.word_idx >= 1024 {
                return None;
            }
            self.current_word = self.bits[self.word_idx];
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_array_container_basic() {
        let mut container = ArrayContainer { values: Vec::new() };
        assert_eq!(container.cardinality(), 0);
        assert!(!container.contains(42));

        container.values.push(10);
        container.values.push(42);
        container.values.push(100);
        assert_eq!(container.cardinality(), 3);
        assert!(container.contains(42));
        assert!(!container.contains(43));
    }

    #[test]
    fn test_bitmap_container_basic() {
        let mut container = BitmapContainer::new();
        assert_eq!(container.cardinality(), 0);
        assert!(!container.contains(42));

        container.set(42);
        container.set(100);
        container.set(1000);
        assert_eq!(container.cardinality(), 3);
        assert!(container.contains(42));
        assert!(!container.contains(43));
    }

    #[test]
    fn test_array_union() {
        let a = ArrayContainer {
            values: vec![1, 3, 5],
        };
        let b = ArrayContainer {
            values: vec![2, 3, 6],
        };
        let result = a.union_array(&b);

        if let Container::Array(arr) = result {
            assert_eq!(arr.values, vec![1, 2, 3, 5, 6]);
        } else {
            panic!("Expected array container");
        }
    }

    #[test]
    fn test_array_intersect() {
        let a = ArrayContainer {
            values: vec![1, 3, 5, 7],
        };
        let b = ArrayContainer {
            values: vec![2, 3, 6, 7],
        };
        let result = a.intersect_array(&b);

        if let Container::Array(arr) = result {
            assert_eq!(arr.values, vec![3, 7]);
        } else {
            panic!("Expected array container");
        }
    }

    #[test]
    fn test_bitmap_union() {
        let mut a = BitmapContainer::new();
        a.set(1);
        a.set(3);
        a.set(5);

        let mut b = BitmapContainer::new();
        b.set(2);
        b.set(3);
        b.set(6);

        let result = a.union_bitmap(&b);
        assert_eq!(result.cardinality(), 5);
        assert!(result.contains(1));
        assert!(result.contains(2));
        assert!(result.contains(3));
        assert!(result.contains(5));
        assert!(result.contains(6));
    }

    #[test]
    fn test_bitmap_intersect() {
        let mut a = BitmapContainer::new();
        a.set(1);
        a.set(3);
        a.set(5);
        a.set(7);

        let mut b = BitmapContainer::new();
        b.set(2);
        b.set(3);
        b.set(6);
        b.set(7);

        let result = a.intersect_bitmap(&b);
        assert_eq!(result.cardinality(), 2);
        assert!(result.contains(3));
        assert!(result.contains(7));
    }

    #[test]
    fn test_bitmap_iterator() {
        let mut bitmap = BitmapContainer::new();
        bitmap.set(1);
        bitmap.set(100);
        bitmap.set(1000);
        bitmap.set(10000);

        let container = Container::Bitmap(bitmap);
        let values: Vec<u16> = container.iter().collect();
        assert_eq!(values, vec![1, 100, 1000, 10000]);
    }

    #[test]
    fn test_array_to_bitmap_threshold() {
        let values: Vec<u16> = (0..4096).collect();
        let a = ArrayContainer { values };
        let b = ArrayContainer { values: vec![4096] };

        let result = a.union_array(&b);
        // Should convert to bitmap when reaching threshold
        assert!(matches!(result, Container::Bitmap(_)));
    }
}
