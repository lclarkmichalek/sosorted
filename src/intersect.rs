use std::cmp::Ordering;

pub fn intersect(a: &mut [u64], b: &[u64]) -> usize {
    // so this is basically the same as deduplication, except we're getting our cmp from b
    let mut i = 0;
    let mut j = 0;
    let mut intersect_count = 0;

    while i < a.len() && j < b.len() {
        match a[i].cmp(&b[j]) {
            Ordering::Less => i += 1,
            Ordering::Greater => j += 1,
            _ => {
                a[intersect_count] = b[j];
                j += 1;
                i += 1;
                intersect_count += 1;
            }
        }
    }

    intersect_count
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::{rngs::SmallRng, RngCore, SeedableRng};

    #[test]
    fn test_intersect_example() {
        let mut a = [1, 2, 3, 4, 5];
        let new_len = intersect(&mut a, &[1, 3, 5]);
        assert_eq!(new_len, 3);
        assert_eq!(a[..new_len], [1, 3, 5]);
    }

    #[test]
    fn test_intersect_all() {
        let mut a = [1, 2, 3, 4, 5];
        let b = a.clone();
        let new_len = intersect(&mut a, &b);
        assert_eq!(new_len, a.len());
        assert_eq!(a, b);
    }

    #[test]
    fn test_intersect_fuzz() {
        let mut seed: [u8; 32] = [0; 32];
        rand::thread_rng().fill_bytes(&mut seed[..]);
        println!("seed: {:?}", seed);

        let mut rng = SmallRng::from_seed(seed);

        const TEST_DATA_SIZE: usize = 1024;
        const TEST_ITERATION_COUNT: usize = 10240;
        for _i in 0..TEST_ITERATION_COUNT {
            let mut data = Vec::with_capacity(TEST_DATA_SIZE);
            for _j in 0..TEST_DATA_SIZE {
                data.push(rng.next_u64());
            }
            data.sort();

            let intersection_len = TEST_DATA_SIZE / 2;
            let mut data2 = data.clone();
            data2.rotate_left(intersection_len);

            assert_eq!(
                intersect(&mut data[..], &data2[..intersection_len]),
                intersection_len,
            );
            assert_eq!(data[..intersection_len], data2[..intersection_len]);
        }
    }
}
