use sosorted::intersect;

#[test]
fn test_intersect_v1_duplicates_bug() {
    // Ratio > 2 (e.g. 3) to trigger v1
    // rare = [10, 10]
    // freq should be constructed such that 10 falls in scalar part.
    // lanes = 4 (assuming AVX2 u64). freq len should be e.g. 7.
    // freq = [0, 0, 0, 0, 10, 10, 10]

    let a = [10u64, 10];
    let b = [0, 0, 0, 0, 10, 10, 10]; // len 7. Ratio 3.5.

    // We need to ensure we are using v1.
    // 7 / 2 = 3.5. Range 3..=50. Yes.

    let mut dest = [0u64; 2];
    let len = intersect(&mut dest, &a, &b);

    assert_eq!(len, 2, "Should find 2 intersections");
    assert_eq!(dest, [10, 10]);
}
