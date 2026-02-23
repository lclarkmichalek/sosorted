#[cfg(test)]
mod tests {
    use sosorted::intersect;

    #[test]
    fn test_v1_duplication_bug() {
        // Force V1 ratio: 3..=50.
        // len(a) = 1. len(b) = 4. Ratio = 4.
        let a = [2u64];
        let b = [2u64, 2, 2, 2];
        // a is smaller (rare). b is larger (freq).

        let mut dest = [0u64; 4];
        let len = intersect(&mut dest, &a, &b);

        // Should be 1
        assert_eq!(len, 1, "Expected len 1, got {}", len);
        assert_eq!(dest[0], 2);
    }
}
