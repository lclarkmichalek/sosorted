#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_criterion_output_with_outliers() {
        let output = r#"
Benchmarking intersect/overlap/sosorted/0pct
Benchmarking intersect/overlap/sosorted/0pct: Warming up for 3.0000 s
Benchmarking intersect/overlap/sosorted/0pct: Collecting 100 samples in estimated 5.2696 s (800 iterations)
Benchmarking intersect/overlap/sosorted/0pct: Analyzing
intersect/overlap/sosorted/0pct
                        time:   [6.5604 ms 6.5902 ms 6.6199 ms]
                        thrpt:  [2.3603 GiB/s 2.3709 GiB/s 2.3817 GiB/s]
                 change:
                        time:   [-9.1507% -8.4880% -7.7645%] (p = 0.00 < 0.05)
                        thrpt:  [+8.4182% +9.2753% +10.072%]
                        Performance has improved.
Found 4 outliers among 100 measurements (4.00%)
  3 (3.00%) low mild
  1 (1.00%) high mild
intersect/overlap/naive/0pct
                        time:   [9.1068 ms 9.1333 ms 9.1620 ms]
                        thrpt:  [1.7054 GiB/s 1.7108 GiB/s 1.7158 GiB/s]
"#;
        let results = parse_criterion_output(output);

        // Should find 2 benchmarks: sosorted/0pct and naive/0pct
        // Should NOT find "3 (3.00%) low mild" etc.
        println!("Found results: {:?}", results);
        assert_eq!(results.len(), 2, "Should match exactly 2 benchmarks");
        assert_eq!(results[0].name, "intersect/overlap/sosorted/0pct");
        assert_eq!(results[1].name, "intersect/overlap/naive/0pct");
    }
}
