use std::collections::btree_map;

use super::bitmap::{combine, Bitmap};
use super::container::{Container, ContainerIter};

/// Iterator over the elements in a bitmap.
///
/// Elements are yielded in ascending order.
pub struct BitmapIter<'a> {
    container_iter: btree_map::Iter<'a, u16, Container>,
    current_high: Option<u16>,
    current_container_iter: Option<ContainerIter<'a>>,
}

impl<'a> BitmapIter<'a> {
    pub(crate) fn new(bitmap: &'a Bitmap) -> Self {
        let mut container_iter = bitmap.containers.iter();
        let (current_high, current_container_iter) =
            if let Some((&high, container)) = container_iter.next() {
                (Some(high), Some(container.iter()))
            } else {
                (None, None)
            };

        BitmapIter {
            container_iter,
            current_high,
            current_container_iter,
        }
    }
}

impl<'a> Iterator for BitmapIter<'a> {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        loop {
            if let Some(ref mut iter) = self.current_container_iter {
                if let Some(low) = iter.next() {
                    let high = self.current_high.unwrap();
                    return Some(combine(high, low));
                }
            }

            // Current container exhausted, move to next
            if let Some((&high, container)) = self.container_iter.next() {
                self.current_high = Some(high);
                self.current_container_iter = Some(container.iter());
            } else {
                // No more containers
                return None;
            }
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_iterator_empty() {
        let bitmap = Bitmap::new();
        let values: Vec<u32> = bitmap.iter().collect();
        assert_eq!(values, Vec::<u32>::new());
    }

    #[test]
    fn test_iterator_single_container() {
        let bitmap = Bitmap::from_sorted_slice(&[1, 5, 10, 100]);
        let values: Vec<u32> = bitmap.iter().collect();
        assert_eq!(values, vec![1, 5, 10, 100]);
    }

    #[test]
    fn test_iterator_multiple_containers() {
        // Values spanning multiple 16-bit ranges
        let bitmap = Bitmap::from_sorted_slice(&[1, 100, 65536, 65537, 131072]);
        let values: Vec<u32> = bitmap.iter().collect();
        assert_eq!(values, vec![1, 100, 65536, 65537, 131072]);
    }

    #[test]
    fn test_iterator_into_iter() {
        let bitmap = Bitmap::from_sorted_slice(&[1, 2, 3]);
        let values: Vec<u32> = (&bitmap).into_iter().collect();
        assert_eq!(values, vec![1, 2, 3]);
    }
}
