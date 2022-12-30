use std::simd::Which::{First, Second};
use std::simd::{simd_swizzle, u64x4, usizex4, Simd, SimdPartialEq};

pub fn deduplicate(data: &mut [u64]) -> usize {
    let dupe_ix = find_first_duplicate(&data);
    if dupe_ix == data.len() {
        return data.len();
    }

    let idxs = usizex4::from_array([0, 1, 2, 3]);
    let mut dupe_count = 0;
    let mut i = dupe_ix + 3;
    while i < data.len() {
        // println!("dupe_ix: {dupe_ix}, i: {i}, count: {dupe_count}");
        // a, b, c, d
        let src: u64x4 = Simd::from_slice(&data[i - 4..i]);
        // println!("src: {:?}", src);
        // b, c, d, e
        let cmp: u64x4 = Simd::from_slice(&data[i - 3..i + 1]);
        // println!("cmp: {:?}", cmp);
        let mask = src.simd_eq(cmp);
        // println!("mask: {:?}", mask);
        if mask.any() {
            // Ffs, slow path
            // a == b
            if mask.test(0) {
                dupe_count += 1;
            } else {
                data[i - 4 - dupe_count] = data[i - 4];
            }
            if mask.test(1) {
                dupe_count += 1;
            } else {
                data[i - 3 - dupe_count] = data[i - 3];
            }
            if mask.test(2) {
                dupe_count += 1;
            } else {
                data[i - 2 - dupe_count] = data[i - 2];
            }
            if mask.test(3) {
                dupe_count += 1;
            } else {
                data[i - 1 - dupe_count] = data[i - 1];
            }
        } else {
            // println!(
            //     "copying {}..{} to {}..{}",
            //     i - 4,
            //     i,
            //     i - 4 - dupe_count,
            //     i - dupe_count
            // );
            // Else, copy the whole block
            src.scatter(&mut data[i - 4 - dupe_count..i - dupe_count], idxs);
        }
        i += 4;
    }

    i -= 4;
    // println!("data: {data:?}");
    // println!("i: {i}/{}", data[i]);
    for ix in i..data.len() {
        if data[ix] == data[ix - 1] {
            dupe_count += 1;
        } else {
            data[ix - dupe_count] = data[ix];
        }
    }
    data.len() - dupe_count
}

#[inline(always)]
fn find_first_duplicate_scalar<T: PartialEq>(vec: &[T]) -> usize {
    for i in 1..vec.len() {
        if vec[i] == vec[i - 1] {
            return i;
        }
    }
    vec.len()
}

/// OK, so is it possible to do a fast deduplication? Well, fundementally, we have to move a
/// lot of data - if the first element is duplicated, we're going to have to shift every other
/// element over.
///
/// The one obvious thing I can see is identifying the initial sorted, deduplicated run. The
/// longer that run, the better. And in the happy path where we have no duplicates, the
/// performance of that run is the performance of the overall function call.
///
/// This function returns the index of the first duplicate entry. It returns the length of the
/// array if there are no duplicates.
///
/// # Examples
///
/// ```
/// use sosorted::find_first_duplicate;
///
/// let data = vec![0, 1, 2, 2];
/// assert_eq!(3, find_first_duplicate(&data[..]));
/// ```
pub fn find_first_duplicate(vec: &[u64]) -> usize {
    let (pref, middle, _suffix) = vec.as_simd();
    // println!(
    //     "p: {}, m: {}, s: {}",
    //     pref.len(),
    //     middle.len(),
    //     suffix.len()
    // );
    match find_first_duplicate_scalar(&vec[0..pref.len()]) {
        x if x != pref.len() => return x,
        _ => {}
    };

    // Check that the last element of prefix isn't a duplicate with the next
    if !pref.is_empty() && vec.len() > pref.len() {
        if vec[pref.len() - 1] == vec[pref.len()] {
            return pref.len();
        }
    }

    let mut i = 4;
    while i < middle.len() {
        let chunk1 = middle[i - 4];
        let chunk2 = middle[i - 3];
        let chunk3 = middle[i - 2];
        let chunk4 = middle[i - 1];
        let cmp1 = simd_swizzle!(
            middle[i - 4],
            middle[i - 3],
            [First(1), First(2), First(3), Second(0)]
        );
        let cmp2 = simd_swizzle!(
            middle[i - 3],
            middle[i - 2],
            [First(1), First(2), First(3), Second(0)]
        );
        let cmp3 = simd_swizzle!(
            middle[i - 2],
            middle[i - 1],
            [First(1), First(2), First(3), Second(0)]
        );
        let cmp4 = simd_swizzle!(
            middle[i - 1],
            middle[i],
            [First(1), First(2), First(3), Second(0)]
        );

        let mask1 = cmp1.simd_eq(chunk1);
        let mask2 = cmp2.simd_eq(chunk2);
        let mask3 = cmp3.simd_eq(chunk3);
        let mask4 = cmp4.simd_eq(chunk4);

        if mask1.any() || mask2.any() || mask3.any() || mask4.any() {
            let (chunk_offset, mask) = if mask1.any() {
                (0, mask1)
            } else if mask2.any() {
                (1, mask2)
            } else if mask3.any() {
                (2, mask3)
            } else {
                (3, mask4)
            };
            let lane_offset = if mask.test(0) {
                1
            } else if mask.test(1) {
                2
            } else if mask.test(2) {
                3
            } else {
                4
            };
            return pref.len() + (i - 4 + chunk_offset) * 4 + lane_offset;
        }
        i = i + 4;
    }

    // test the rest by hand. we have not checked the last chunk
    let ix = pref.len() + (i - 4) * 4;
    let x = find_first_duplicate_scalar(&vec[ix..]);
    match x {
        x if x != vec.len() - ix => return x,
        _ => {}
    };

    vec.len()
}

#[cfg(test)]
mod tests {
    use super::*;
    use rand::rngs::SmallRng;
    use rand::{RngCore, SeedableRng};

    #[test]
    fn test_deduplicate() {
        let mut data = vec![1, 2, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18];
        let new_len = deduplicate(&mut data[..]);
        assert_eq!(new_len, 3);
        assert_eq!(data[0..3], [1, 2, 18]);
    }

    #[test]
    fn test_deduplicate_one() {
        let mut data = vec![1, 1, 2, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
        let new_len = deduplicate(&mut data[..]);
        assert_eq!(
            data[0..14],
            [1, 2, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
        );
        assert_eq!(new_len, 14);
    }

    #[test]
    fn test_simd_first_dupe() {
        let data = vec![
            1, 2, 3, 4, 5, 6, 7, 8, 9, 9, 9, 11, 12, 13, 14, 15, 16, 17, 18, 18, 18, 18, 18, 18,
            18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18,
            18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18, 18,
        ];
        let first_dupe = find_first_duplicate(&data[..]);
        assert_eq!(first_dupe, 9);
        assert_eq!(first_dupe, find_first_duplicate_scalar(&data[..]));
    }

    #[test]
    fn test_find_first_dupe_fuzz() {
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

            assert_eq!(
                find_first_duplicate(&data[..]),
                find_first_duplicate_scalar(&data[..]),
            );
        }
    }
}
