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
| `--output <FORMAT>` | text | Output format: `text`, `json`, or `html` |
| `--html-output <PATH>` | stdout | File path for HTML report (when `--output html`) |
| `--artifact-url <URL>` | none | Base URL for linking to Criterion artifacts |
| `--keep-binaries` | false | Keep built binaries after comparison |

### Examples

```bash
# Compare PR branch against main
bench-compare --baseline main --test feature-branch

# Compare specific commits with custom thresholds
bench-compare --baseline abc123 --test def456 --significance 0.01 --threshold 5.0

# Run only intersection benchmarks with JSON output for CI
bench-compare --baseline main --test HEAD --bench intersect --output json

# Generate HTML report to a file
bench-compare --baseline main --test HEAD --output html --html-output report.html

# Generate HTML report with links to Criterion artifact
bench-compare --baseline main --test HEAD --output html \
  --html-output report.html \
  --artifact-url https://github.com/owner/repo/actions/artifacts/123456
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

### HTML Output

HTML reports provide a styled, interactive view of benchmark results:

- Dark theme matching GitHub's aesthetic
- Summary cards showing regression/improvement/unchanged counts
- Detailed tables with timing data, percent changes, and confidence levels
- Visual confidence bars showing statistical confidence
- Color-coded verdicts (red for regressions, green for improvements)
- Optional links to Criterion reports when `--artifact-url` is provided
- Responsive design for mobile viewing

The HTML report is ideal for uploading as a CI artifact and viewing in a browser.

## CI Integration

### GitHub Actions Example (JSON)

```yaml
- name: Benchmark Comparison
  run: |
    cargo run --package bench-compare --release -- \
      --baseline ${{ github.base_ref }} \
      --test ${{ github.sha }} \
      --output json > benchmark-results.json
```

### GitHub Actions Example (HTML with Artifacts)

```yaml
- name: Run benchmark comparison
  id: bench-compare
  run: |
    set +e
    cargo run --package bench-compare --release -- \
      --baseline ${{ github.event.pull_request.base.sha }} \
      --test ${{ github.event.pull_request.head.sha }} \
      --output html \
      --html-output benchmark-report.html \
      --keep-binaries
    echo "exit_code=$?" >> $GITHUB_OUTPUT
    exit 0

- name: Upload HTML Report
  uses: actions/upload-artifact@v4
  with:
    name: benchmark-report
    path: benchmark-report.html

- name: Upload Criterion Reports
  uses: actions/upload-artifact@v4
  with:
    name: criterion-reports
    path: target/bench-compare-test/criterion/
    if-no-files-found: ignore

- name: Fail on regressions
  if: steps.bench-compare.outputs.exit_code == '1'
  run: exit 1
```

### Exit Codes

- `0` - No regressions detected
- `1` - One or more statistically significant regressions detected

## Requirements

- Git repository with Criterion benchmarks
- Clean working directory (no uncommitted changes)
- Rust nightly toolchain (for portable SIMD in sosorted)
