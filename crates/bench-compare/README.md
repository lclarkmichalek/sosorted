# bench-compare

A CLI tool for A/B benchmark comparison with statistical hypothesis testing.

## Overview

`bench-compare` builds and runs Criterion benchmarks from two different git refs, then performs statistical analysis to detect significant performance changes. Designed for CI integration to catch performance regressions in pull requests.

## Installation

```bash
cargo install --path crates/bench-compare
```

Or run directly from the workspace:

```bash
cargo run --package bench-compare --release -- [OPTIONS]
```

## Usage

```bash
bench-compare --baseline <GIT_REF> --test <GIT_REF> [OPTIONS]
```

### Required Arguments

- `--baseline <REF>` - Baseline git ref (e.g., `main`, `HEAD~1`, commit SHA)
- `--test <REF>` - Test git ref to compare against baseline

### Options

| Option | Default | Description |
|--------|---------|-------------|
| `--bench <NAME>` | all | Run only a specific benchmark |
| `--sample-size <N>` | 100 | Number of Criterion sampling iterations |
| `--significance <P>` | 0.05 | P-value threshold for hypothesis testing |
| `--threshold <PCT>` | 2.0 | Minimum effect size (%) to flag as significant |
| `--workdir <PATH>` | `.` | Git repository with Cargo benchmarks |
| `--output <FORMAT>` | text | Output format: `text` or `json` |
| `--keep-binaries` | false | Keep built binaries after comparison |

### Examples

```bash
# Compare PR branch against main
bench-compare --baseline main --test feature-branch

# Compare specific commits with custom thresholds
bench-compare --baseline abc123 --test def456 --significance 0.01 --threshold 5.0

# Run only intersection benchmarks with JSON output for CI
bench-compare --baseline main --test HEAD --bench intersect --output json
```

## How It Works

1. **Build Phase**: Checks out each git ref and builds benchmark binaries with `cargo bench --no-run`
2. **Execution Phase**: Runs both binaries and collects Criterion timing output
3. **Analysis Phase**: Performs Welch's t-test to compare distributions
4. **Reporting**: Outputs results with p-values, percent change, and verdicts

## Statistical Method

- **Test**: Welch's t-test (unequal variance t-test)
- **Significance**: Configurable p-value threshold (default: 0.05)
- **Effect Size**: Minimum percent change required (default: 2%)
- **Verdict**: A benchmark is flagged only if both statistical significance AND effect size thresholds are met

## Output

### Text Output

```
╔══════════════════════════════════════════════════════════════════════════════╗
║                         BENCHMARK COMPARISON REPORT                          ║
╠══════════════════════════════════════════════════════════════════════════════╣
║ Baseline: main                                                               ║
║ Test:     feature-branch                                                     ║
║ Significance level: 0.05       Threshold:   2.0%                            ║
╚══════════════════════════════════════════════════════════════════════════════╝

Summary: 0 regressions, 2 improvements, 5 no change

Benchmark                                        Baseline         Test     Change    p-value Verdict
--------------------------------------------------------------------------------------------------------------
intersect/sosorted/sparse                        10.234 µs    9.876 µs     -3.50%     0.0012 IMPROVEMENT
```

### JSON Output

JSON output includes all comparison data for programmatic processing in CI pipelines.

## CI Integration

### GitHub Actions Example

```yaml
- name: Benchmark Comparison
  run: |
    cargo run --package bench-compare --release -- \
      --baseline ${{ github.base_ref }} \
      --test ${{ github.sha }} \
      --output json > benchmark-results.json
```

### Exit Codes

- `0` - No regressions detected
- `1` - One or more statistically significant regressions detected

## Requirements

- Git repository with Criterion benchmarks
- Clean working directory (no uncommitted changes)
- Rust nightly toolchain (for portable SIMD in sosorted)
