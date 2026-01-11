use anyhow::{bail, Context, Result};
use clap::Parser;
use statrs::distribution::{ContinuousCDF, StudentsT};
use std::collections::HashMap;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

/// A/B benchmark comparison with statistical hypothesis testing.
///
/// Compares benchmark performance between two git refs (e.g., base branch vs PR).
/// Builds benchmark binaries for each ref, runs them, and performs statistical
/// analysis to detect significant performance changes.
#[derive(Parser, Debug)]
#[command(name = "bench-compare", version, about)]
struct Args {
    /// Baseline git ref (e.g., main, HEAD~1, commit SHA)
    #[arg(long)]
    baseline: String,

    /// Test git ref to compare against baseline
    #[arg(long)]
    test: String,

    /// Specific benchmark to run (default: all benchmarks)
    #[arg(long)]
    bench: Option<String>,

    /// Number of sampling iterations per benchmark (more = higher precision)
    #[arg(long, default_value = "100")]
    sample_size: usize,

    /// Significance level for hypothesis testing (default: 0.05)
    #[arg(long, default_value = "0.05")]
    significance: f64,

    /// Minimum effect size (%) to consider significant (default: 2.0)
    #[arg(long, default_value = "2.0")]
    threshold: f64,

    /// Working directory (must be a git repo with Cargo benchmarks)
    #[arg(long, default_value = ".")]
    workdir: PathBuf,

    /// Output format: text, json
    #[arg(long, default_value = "text")]
    output: OutputFormat,

    /// Keep built binaries after comparison (don't clean up)
    #[arg(long)]
    keep_binaries: bool,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
enum OutputFormat {
    #[default]
    Text,
    Json,
}

impl std::str::FromStr for OutputFormat {
    type Err = anyhow::Error;
    fn from_str(s: &str) -> Result<Self> {
        match s.to_lowercase().as_str() {
            "text" => Ok(Self::Text),
            "json" => Ok(Self::Json),
            _ => bail!("Unknown output format: {s}. Use 'text' or 'json'"),
        }
    }
}

/// Results from a single benchmark run
#[derive(Debug, Clone)]
struct BenchmarkResult {
    name: String,
    mean_ns: f64,
    std_dev_ns: f64,
}

/// Comparison result for a single benchmark
#[derive(Debug, Clone, serde::Serialize)]
struct ComparisonResult {
    name: String,
    baseline_mean_ns: f64,
    baseline_std_dev_ns: f64,
    test_mean_ns: f64,
    test_std_dev_ns: f64,
    change_percent: f64,
    p_value: f64,
    significant: bool,
    verdict: Verdict,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, serde::Serialize)]
#[serde(rename_all = "lowercase")]
enum Verdict {
    Regression,
    Improvement,
    NoChange,
}

impl std::fmt::Display for Verdict {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Verdict::Regression => write!(f, "REGRESSION"),
            Verdict::Improvement => write!(f, "IMPROVEMENT"),
            Verdict::NoChange => write!(f, "no change"),
        }
    }
}

fn main() -> Result<()> {
    let args = Args::parse();

    // Validate working directory
    let workdir = args
        .workdir
        .canonicalize()
        .context("Invalid working directory")?;
    if !workdir.join(".git").exists() {
        bail!(
            "Working directory is not a git repository: {}",
            workdir.display()
        );
    }

    // Save current git state to restore later
    let original_ref = get_current_ref(&workdir)?;
    let has_changes = has_uncommitted_changes(&workdir)?;
    if has_changes {
        bail!("Working directory has uncommitted changes. Please commit or stash them first.");
    }

    eprintln!(
        "🔬 Benchmark Comparison: {} vs {}",
        args.baseline, args.test
    );
    eprintln!(
        "   Sample size: {}, Significance: {}, Threshold: {}%\n",
        args.sample_size, args.significance, args.threshold
    );

    // Build binaries for both refs
    let baseline_dir =
        build_benchmarks(&workdir, &args.baseline, "baseline", args.bench.as_deref())?;
    let test_dir = build_benchmarks(&workdir, &args.test, "test", args.bench.as_deref())?;

    // Restore original ref
    checkout_ref(&workdir, &original_ref)?;

    // Run benchmarks and collect results
    let baseline_results = run_benchmarks(&baseline_dir, args.bench.as_deref(), args.sample_size)?;
    let test_results = run_benchmarks(&test_dir, args.bench.as_deref(), args.sample_size)?;

    // Compare results
    let comparisons = compare_results(
        &baseline_results,
        &test_results,
        args.significance,
        args.threshold,
    )?;

    // Output results
    match args.output {
        OutputFormat::Text => print_text_report(&comparisons, &args),
        OutputFormat::Json => print_json_report(&comparisons)?,
    }

    // Cleanup unless --keep-binaries
    if !args.keep_binaries {
        let _ = std::fs::remove_dir_all(&baseline_dir);
        let _ = std::fs::remove_dir_all(&test_dir);
    }

    // Exit with error if any regressions detected
    let has_regressions = comparisons.iter().any(|c| c.verdict == Verdict::Regression);
    if has_regressions {
        std::process::exit(1);
    }

    Ok(())
}

fn get_current_ref(workdir: &Path) -> Result<String> {
    let output = Command::new("git")
        .args(["rev-parse", "HEAD"])
        .current_dir(workdir)
        .output()
        .context("Failed to get current git ref")?;

    Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
}

fn has_uncommitted_changes(workdir: &Path) -> Result<bool> {
    let output = Command::new("git")
        .args(["status", "--porcelain"])
        .current_dir(workdir)
        .output()
        .context("Failed to check git status")?;

    Ok(!output.stdout.is_empty())
}

fn checkout_ref(workdir: &Path, git_ref: &str) -> Result<()> {
    let status = Command::new("git")
        .args(["checkout", git_ref])
        .current_dir(workdir)
        .stderr(Stdio::inherit())
        .status()
        .context("Failed to checkout git ref")?;

    if !status.success() {
        bail!("git checkout failed for ref: {}", git_ref);
    }
    Ok(())
}

fn build_benchmarks(
    workdir: &Path,
    git_ref: &str,
    label: &str,
    bench_filter: Option<&str>,
) -> Result<PathBuf> {
    eprintln!("📦 Building {} benchmarks ({})...", label, git_ref);

    // Checkout the ref
    checkout_ref(workdir, git_ref)?;

    // Build benchmarks
    let mut cmd = Command::new("cargo");
    cmd.arg("bench").arg("--no-run").current_dir(workdir);

    if let Some(bench) = bench_filter {
        cmd.args(["--bench", bench]);
    }

    let status = cmd
        .stderr(Stdio::inherit())
        .status()
        .context("Failed to build benchmarks")?;

    if !status.success() {
        bail!("cargo bench --no-run failed for ref: {}", git_ref);
    }

    // Find and copy benchmark binaries to a labeled directory
    let target_dir = workdir.join("target").join("release").join("deps");
    let output_dir = workdir
        .join("target")
        .join(format!("bench-compare-{}", label));
    std::fs::create_dir_all(&output_dir)?;

    // Copy benchmark binaries
    let mut copied_count = 0;
    for entry in std::fs::read_dir(&target_dir)? {
        let entry = entry?;
        let path = entry.path();

        // Benchmark binaries have specific naming pattern and are executable
        if let Some(name) = path.file_name().and_then(|n| n.to_str()) {
            // Match benchmark binary pattern (name without extension, contains benchmark name)
            if is_benchmark_binary(&path, bench_filter)? {
                let dest = output_dir.join(name);
                std::fs::copy(&path, &dest)?;
                copied_count += 1;

                // Make executable on Unix
                #[cfg(unix)]
                {
                    use std::os::unix::fs::PermissionsExt;
                    let mut perms = std::fs::metadata(&dest)?.permissions();
                    perms.set_mode(0o755);
                    std::fs::set_permissions(&dest, perms)?;
                }
            }
        }
    }

    if copied_count == 0 {
        eprintln!(
            "   ⚠ Warning: No benchmark binaries found in {}",
            target_dir.display()
        );
    }
    eprintln!(
        "   ✓ Built {} binaries ({} copied) to {}\n",
        label,
        copied_count,
        output_dir.display()
    );
    Ok(output_dir)
}

fn is_benchmark_binary(path: &Path, bench_filter: Option<&str>) -> Result<bool> {
    // Skip if not a file
    if !path.is_file() {
        return Ok(false);
    }

    let name = path.file_name().and_then(|n| n.to_str()).unwrap_or("");

    // Skip files with extensions (we want the binary, not .d or .rlib files)
    if name.contains('.') {
        return Ok(false);
    }

    // Skip if it doesn't look like a benchmark (heuristic: benchmark binaries have a hash suffix)
    if !name.contains('-') {
        return Ok(false);
    }

    // If a filter is specified, check if the binary name contains it
    if let Some(filter) = bench_filter {
        if !name.contains(filter) {
            return Ok(false);
        }
    }

    // Check if it's an executable
    #[cfg(unix)]
    {
        use std::os::unix::fs::PermissionsExt;
        let metadata = std::fs::metadata(path)?;
        let mode = metadata.permissions().mode();
        if mode & 0o111 == 0 {
            return Ok(false);
        }
    }

    // Final heuristic: try to determine if it's a Criterion benchmark
    // by checking if running with --help mentions criterion
    // (This is expensive, so we rely on naming heuristics above)

    Ok(true)
}

fn run_benchmarks(
    bench_dir: &Path,
    _bench_filter: Option<&str>,
    sample_size: usize,
) -> Result<Vec<BenchmarkResult>> {
    eprintln!("🏃 Running benchmarks from {}...", bench_dir.display());

    let mut results = Vec::new();
    let mut file_count = 0;

    for entry in std::fs::read_dir(bench_dir)? {
        let entry = entry?;
        let path = entry.path();

        if !path.is_file() {
            continue;
        }
        file_count += 1;

        eprintln!("   Running: {}", path.display());

        // Run the benchmark with Criterion options
        let output = Command::new(&path)
            .args([
                "--bench",
                "--noplot",
                &format!("--sample-size={}", sample_size),
            ])
            .current_dir(bench_dir.parent().unwrap_or(bench_dir))
            .env("CRITERION_HOME", bench_dir.join("criterion"))
            .output()
            .with_context(|| format!("Failed to run benchmark: {}", path.display()))?;

        if !output.status.success() {
            let stderr = String::from_utf8_lossy(&output.stderr);
            eprintln!("   ⚠ Benchmark exited with non-zero status");
            eprintln!(
                "   stderr: {}",
                stderr.lines().take(5).collect::<Vec<_>>().join("\n")
            );
            continue;
        }

        // Parse Criterion output
        let stdout = String::from_utf8_lossy(&output.stdout);
        let parsed = parse_criterion_output(&stdout);
        eprintln!("   ✓ Parsed {} results", parsed.len());
        results.extend(parsed);
    }

    if file_count == 0 {
        eprintln!("   ⚠ No benchmark files found in directory");
    }

    eprintln!("   ✓ Collected {} benchmark results\n", results.len());
    Ok(results)
}

fn parse_criterion_output(output: &str) -> Vec<BenchmarkResult> {
    let mut results = Vec::new();
    let mut current_name: Option<String> = None;

    for line in output.lines() {
        let line = line.trim();

        // Skip empty lines and info lines
        if line.is_empty()
            || line.starts_with("Benchmarking")
            || line.starts_with("Gnuplot")
            || line.starts_with("Found")
            || line.contains("outliers")
            || line.contains("thrpt:")
        {
            continue;
        }

        // Criterion outputs benchmark names on their own line, followed by timing on next line
        // Format:
        //   benchmark_name
        //                         time:   [low mean high]
        if line.contains("time:") && line.contains('[') && line.contains(']') {
            // This is a timing line - parse it and combine with stored name
            if let Some(name) = current_name.take() {
                if let Some((mean_ns, std_dev_ns)) = parse_criterion_timing(line) {
                    results.push(BenchmarkResult {
                        name,
                        mean_ns,
                        std_dev_ns,
                    });
                }
            }
        } else if !line.contains(':') && !line.starts_with('[') {
            // This looks like a benchmark name (no colons, not a bracket line)
            // Benchmark names typically look like "group/variant/case"
            current_name = Some(line.to_string());
        }
    }

    results
}

fn parse_criterion_timing(timing_str: &str) -> Option<(f64, f64)> {
    // Parse "time:   [1.2345 µs 1.3456 µs 1.4567 µs]" format
    // Returns (mean in ns, estimated std_dev in ns)

    let start = timing_str.find('[')?;
    let end = timing_str.find(']')?;
    let inner = &timing_str[start + 1..end];

    // Split by whitespace, extract numbers and units
    let parts: Vec<&str> = inner.split_whitespace().collect();

    // Expected format: "low unit mean unit high unit"
    if parts.len() < 6 {
        return None;
    }

    let low: f64 = parts[0].parse().ok()?;
    let low_unit = parts[1];
    let mean: f64 = parts[2].parse().ok()?;
    let mean_unit = parts[3];
    let high: f64 = parts[4].parse().ok()?;
    let _high_unit = parts[5];

    let multiplier = unit_to_ns_multiplier(mean_unit)?;
    let mean_ns = mean * multiplier;

    // Estimate std_dev from confidence interval (high - low) / 4
    // This is approximate; CI is typically ±2 std_dev
    let low_multiplier = unit_to_ns_multiplier(low_unit)?;
    let std_dev_ns = ((high * multiplier) - (low * low_multiplier)) / 4.0;

    Some((mean_ns, std_dev_ns.abs()))
}

fn unit_to_ns_multiplier(unit: &str) -> Option<f64> {
    match unit {
        "ns" => Some(1.0),
        "µs" | "us" => Some(1_000.0),
        "ms" => Some(1_000_000.0),
        "s" => Some(1_000_000_000.0),
        _ => None,
    }
}

fn compare_results(
    baseline: &[BenchmarkResult],
    test: &[BenchmarkResult],
    significance: f64,
    threshold: f64,
) -> Result<Vec<ComparisonResult>> {
    // Build lookup maps
    let baseline_map: HashMap<&str, &BenchmarkResult> =
        baseline.iter().map(|r| (r.name.as_str(), r)).collect();
    let test_map: HashMap<&str, &BenchmarkResult> =
        test.iter().map(|r| (r.name.as_str(), r)).collect();

    let mut comparisons = Vec::new();

    // Compare all benchmarks present in both
    for (name, baseline_result) in &baseline_map {
        if let Some(test_result) = test_map.get(name) {
            let comparison = compare_single(baseline_result, test_result, significance, threshold);
            comparisons.push(comparison);
        } else {
            eprintln!("Warning: Benchmark '{}' missing in test results", name);
        }
    }

    // Check for benchmarks only in test
    for name in test_map.keys() {
        if !baseline_map.contains_key(name) {
            eprintln!("Warning: Benchmark '{}' missing in baseline results", name);
        }
    }

    // Sort by name for consistent output
    comparisons.sort_by(|a, b| a.name.cmp(&b.name));

    Ok(comparisons)
}

fn compare_single(
    baseline: &BenchmarkResult,
    test: &BenchmarkResult,
    significance: f64,
    threshold: f64,
) -> ComparisonResult {
    let change_percent = ((test.mean_ns - baseline.mean_ns) / baseline.mean_ns) * 100.0;

    // Welch's t-test for comparing two means with potentially different variances
    // t = (mean1 - mean2) / sqrt(var1/n1 + var2/n2)
    //
    // Since we have summary statistics from Criterion, we estimate using
    // the reported std_dev. This is an approximation since we don't have
    // the raw samples.

    let p_value = welch_t_test(
        baseline.mean_ns,
        baseline.std_dev_ns,
        100, // Criterion typically uses ~100 samples
        test.mean_ns,
        test.std_dev_ns,
        100,
    );

    let significant = p_value < significance && change_percent.abs() >= threshold;

    let verdict = if significant {
        if change_percent > 0.0 {
            Verdict::Regression
        } else {
            Verdict::Improvement
        }
    } else {
        Verdict::NoChange
    };

    ComparisonResult {
        name: baseline.name.clone(),
        baseline_mean_ns: baseline.mean_ns,
        baseline_std_dev_ns: baseline.std_dev_ns,
        test_mean_ns: test.mean_ns,
        test_std_dev_ns: test.std_dev_ns,
        change_percent,
        p_value,
        significant,
        verdict,
    }
}

fn welch_t_test(mean1: f64, std1: f64, n1: usize, mean2: f64, std2: f64, n2: usize) -> f64 {
    let n1 = n1 as f64;
    let n2 = n2 as f64;
    let var1 = std1 * std1;
    let var2 = std2 * std2;

    // Standard error
    let se = ((var1 / n1) + (var2 / n2)).sqrt();

    if se == 0.0 {
        return 1.0; // No variance, can't distinguish
    }

    // t-statistic
    let t = (mean1 - mean2) / se;

    // Welch-Satterthwaite degrees of freedom
    let num = ((var1 / n1) + (var2 / n2)).powi(2);
    let denom = ((var1 / n1).powi(2) / (n1 - 1.0)) + ((var2 / n2).powi(2) / (n2 - 1.0));
    let df = num / denom;

    // Two-tailed p-value
    if let Ok(t_dist) = StudentsT::new(0.0, 1.0, df) {
        2.0 * (1.0 - t_dist.cdf(t.abs()))
    } else {
        1.0 // Fallback if distribution creation fails
    }
}

fn print_text_report(comparisons: &[ComparisonResult], args: &Args) {
    println!("\n╔══════════════════════════════════════════════════════════════════════════════╗");
    println!("║                         BENCHMARK COMPARISON REPORT                          ║");
    println!("╠══════════════════════════════════════════════════════════════════════════════╣");
    println!("║ Baseline: {:<66} ║", truncate(&args.baseline, 66));
    println!("║ Test:     {:<66} ║", truncate(&args.test, 66));
    println!(
        "║ Significance level: {:<10} Threshold: {:>5.1}%                            ║",
        args.significance, args.threshold
    );
    println!("╚══════════════════════════════════════════════════════════════════════════════╝\n");

    // Summary counts
    let regressions = comparisons
        .iter()
        .filter(|c| c.verdict == Verdict::Regression)
        .count();
    let improvements = comparisons
        .iter()
        .filter(|c| c.verdict == Verdict::Improvement)
        .count();
    let no_change = comparisons
        .iter()
        .filter(|c| c.verdict == Verdict::NoChange)
        .count();

    println!(
        "Summary: {} regressions, {} improvements, {} no change\n",
        regressions, improvements, no_change
    );

    // Detailed results
    println!(
        "{:<50} {:>12} {:>12} {:>10} {:>10} Verdict",
        "Benchmark", "Baseline", "Test", "Change", "p-value"
    );
    println!("{}", "-".repeat(110));

    for c in comparisons {
        let baseline_str = format_time(c.baseline_mean_ns);
        let test_str = format_time(c.test_mean_ns);
        let change_str = format!("{:+.2}%", c.change_percent);
        let p_str = format!("{:.4}", c.p_value);

        let verdict_str = match c.verdict {
            Verdict::Regression => "\x1b[31mREGRESSION\x1b[0m",
            Verdict::Improvement => "\x1b[32mIMPROVEMENT\x1b[0m",
            Verdict::NoChange => "no change",
        };

        println!(
            "{:<50} {:>12} {:>12} {:>10} {:>10} {}",
            truncate(&c.name, 50),
            baseline_str,
            test_str,
            change_str,
            p_str,
            verdict_str
        );
    }

    println!();

    if regressions > 0 {
        println!(
            "\x1b[31m⚠ {} benchmark(s) show statistically significant regressions!\x1b[0m",
            regressions
        );
    }
    if improvements > 0 {
        println!(
            "\x1b[32m✓ {} benchmark(s) show statistically significant improvements.\x1b[0m",
            improvements
        );
    }
}

fn print_json_report(comparisons: &[ComparisonResult]) -> Result<()> {
    let output = serde_json::to_string_pretty(comparisons)?;
    println!("{}", output);
    Ok(())
}

fn format_time(ns: f64) -> String {
    if ns >= 1_000_000_000.0 {
        format!("{:.3} s", ns / 1_000_000_000.0)
    } else if ns >= 1_000_000.0 {
        format!("{:.3} ms", ns / 1_000_000.0)
    } else if ns >= 1_000.0 {
        format!("{:.3} µs", ns / 1_000.0)
    } else {
        format!("{:.3} ns", ns)
    }
}

fn truncate(s: &str, max_len: usize) -> String {
    if s.len() <= max_len {
        s.to_string()
    } else {
        format!("{}...", &s[..max_len - 3])
    }
}
