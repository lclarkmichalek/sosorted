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

    /// Output format: text, json, html
    #[arg(long, default_value = "text")]
    output: OutputFormat,

    /// Output file path for HTML report (only used when output=html)
    #[arg(long)]
    html_output: Option<PathBuf>,

    /// Output file path for JSON report (generates JSON in addition to primary output)
    #[arg(long)]
    json_output: Option<PathBuf>,

    /// Base URL for linking to Criterion report artifacts (e.g., GitHub Actions artifact URL)
    #[arg(long)]
    artifact_url: Option<String>,

    /// Keep built binaries after comparison (don't clean up)
    #[arg(long)]
    keep_binaries: bool,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
enum OutputFormat {
    #[default]
    Text,
    Json,
    Html,
}

impl std::str::FromStr for OutputFormat {
    type Err = anyhow::Error;
    fn from_str(s: &str) -> Result<Self> {
        match s.to_lowercase().as_str() {
            "text" => Ok(Self::Text),
            "json" => Ok(Self::Json),
            "html" => Ok(Self::Html),
            _ => bail!("Unknown output format: {s}. Use 'text', 'json', or 'html'"),
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

/// Full report with metadata
#[derive(Debug, Clone, serde::Serialize)]
struct BenchmarkReport {
    metadata: ReportMetadata,
    comparisons: Vec<ComparisonResult>,
    summary: ReportSummary,
}

#[derive(Debug, Clone, serde::Serialize)]
struct ReportMetadata {
    baseline_ref: String,
    test_ref: String,
    timestamp: String,
    significance_level: f64,
    effect_threshold: f64,
    sample_size: usize,
}

#[derive(Debug, Clone, serde::Serialize)]
struct ReportSummary {
    total: usize,
    regressions: usize,
    improvements: usize,
    unchanged: usize,
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
        OutputFormat::Json => print_json_report(&comparisons, &args)?,
        OutputFormat::Html => write_html_report(&comparisons, &args)?,
    }

    // Write JSON output if requested (allows generating both HTML and JSON in one run)
    if let Some(json_path) = &args.json_output {
        write_json_report(&comparisons, &args, json_path)?;
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

fn print_json_report(comparisons: &[ComparisonResult], args: &Args) -> Result<()> {
    let report = build_json_report(comparisons, args);
    let output = serde_json::to_string_pretty(&report)?;
    println!("{}", output);
    Ok(())
}

fn write_json_report(comparisons: &[ComparisonResult], args: &Args, path: &Path) -> Result<()> {
    let report = build_json_report(comparisons, args);
    let output = serde_json::to_string_pretty(&report)?;
    std::fs::write(path, &output)
        .with_context(|| format!("Failed to write JSON report to {}", path.display()))?;
    eprintln!("✓ JSON report written to {}", path.display());
    Ok(())
}

fn build_json_report(comparisons: &[ComparisonResult], args: &Args) -> BenchmarkReport {
    let regressions = comparisons
        .iter()
        .filter(|c| c.verdict == Verdict::Regression)
        .count();
    let improvements = comparisons
        .iter()
        .filter(|c| c.verdict == Verdict::Improvement)
        .count();
    let unchanged = comparisons
        .iter()
        .filter(|c| c.verdict == Verdict::NoChange)
        .count();

    BenchmarkReport {
        metadata: ReportMetadata {
            baseline_ref: args.baseline.clone(),
            test_ref: args.test.clone(),
            timestamp: chrono::Utc::now().to_rfc3339(),
            significance_level: args.significance,
            effect_threshold: args.threshold,
            sample_size: args.sample_size,
        },
        comparisons: comparisons.to_vec(),
        summary: ReportSummary {
            total: comparisons.len(),
            regressions,
            improvements,
            unchanged,
        },
    }
}

fn write_html_report(comparisons: &[ComparisonResult], args: &Args) -> Result<()> {
    let html = generate_html_report(comparisons, args);

    if let Some(path) = &args.html_output {
        std::fs::write(path, &html)
            .with_context(|| format!("Failed to write HTML report to {}", path.display()))?;
        eprintln!("✓ HTML report written to {}", path.display());
    } else {
        println!("{}", html);
    }

    Ok(())
}

fn generate_html_report(comparisons: &[ComparisonResult], args: &Args) -> String {
    let regressions: Vec<_> = comparisons
        .iter()
        .filter(|c| c.verdict == Verdict::Regression)
        .collect();
    let improvements: Vec<_> = comparisons
        .iter()
        .filter(|c| c.verdict == Verdict::Improvement)
        .collect();
    let no_change: Vec<_> = comparisons
        .iter()
        .filter(|c| c.verdict == Verdict::NoChange)
        .collect();

    let overall_status = if !regressions.is_empty() {
        ("❌ Regressions Detected", "#dc3545", "regression")
    } else if !improvements.is_empty() {
        ("✅ All Clear (with improvements)", "#28a745", "success")
    } else {
        ("✅ All Clear", "#28a745", "success")
    };

    let artifact_link = args.artifact_url.as_ref().map(|url| {
        format!(
            r#"<a href="{}" class="artifact-link" target="_blank">📊 View Criterion Reports</a>"#,
            html_escape(url)
        )
    }).unwrap_or_default();

    let mut html = format!(
        r##"<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Benchmark Comparison Report</title>
    <style>
        :root {{
            --bg-primary: #0d1117;
            --bg-secondary: #161b22;
            --bg-tertiary: #21262d;
            --text-primary: #c9d1d9;
            --text-secondary: #8b949e;
            --border-color: #30363d;
            --accent-blue: #58a6ff;
            --accent-green: #3fb950;
            --accent-red: #f85149;
            --accent-yellow: #d29922;
        }}

        * {{
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
            background-color: var(--bg-primary);
            color: var(--text-primary);
            line-height: 1.6;
            padding: 20px;
        }}

        .container {{
            max-width: 1200px;
            margin: 0 auto;
        }}

        header {{
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 24px;
            margin-bottom: 24px;
        }}

        h1 {{
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
        }}

        .status-badge {{
            display: inline-block;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 500;
        }}

        .status-regression {{
            background-color: rgba(248, 81, 73, 0.2);
            color: var(--accent-red);
        }}

        .status-success {{
            background-color: rgba(63, 185, 80, 0.2);
            color: var(--accent-green);
        }}

        .meta-info {{
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 16px;
            margin-top: 16px;
        }}

        .meta-item {{
            background: var(--bg-tertiary);
            padding: 12px 16px;
            border-radius: 6px;
        }}

        .meta-label {{
            font-size: 12px;
            color: var(--text-secondary);
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}

        .meta-value {{
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 14px;
            margin-top: 4px;
            word-break: break-all;
        }}

        .summary {{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
            margin-bottom: 24px;
        }}

        .summary-card {{
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 20px;
            text-align: center;
        }}

        .summary-card.regressions {{
            border-left: 4px solid var(--accent-red);
        }}

        .summary-card.improvements {{
            border-left: 4px solid var(--accent-green);
        }}

        .summary-card.unchanged {{
            border-left: 4px solid var(--text-secondary);
        }}

        .summary-number {{
            font-size: 36px;
            font-weight: 700;
        }}

        .summary-card.regressions .summary-number {{
            color: var(--accent-red);
        }}

        .summary-card.improvements .summary-number {{
            color: var(--accent-green);
        }}

        .summary-label {{
            color: var(--text-secondary);
            font-size: 14px;
            margin-top: 4px;
        }}

        .artifact-link {{
            display: inline-block;
            margin-top: 16px;
            padding: 8px 16px;
            background: var(--bg-tertiary);
            color: var(--accent-blue);
            text-decoration: none;
            border-radius: 6px;
            border: 1px solid var(--border-color);
            transition: background-color 0.2s;
        }}

        .artifact-link:hover {{
            background: var(--border-color);
        }}

        section {{
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            margin-bottom: 24px;
            overflow: hidden;
        }}

        section h2 {{
            font-size: 16px;
            font-weight: 600;
            padding: 16px 20px;
            background: var(--bg-tertiary);
            border-bottom: 1px solid var(--border-color);
        }}

        table {{
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
        }}

        th {{
            text-align: left;
            padding: 12px 16px;
            background: var(--bg-tertiary);
            color: var(--text-secondary);
            font-weight: 500;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            border-bottom: 1px solid var(--border-color);
        }}

        td {{
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
        }}

        tr:last-child td {{
            border-bottom: none;
        }}

        tr:hover {{
            background: var(--bg-tertiary);
        }}

        .benchmark-name {{
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 13px;
        }}

        .time-value {{
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            text-align: right;
        }}

        .change-positive {{
            color: var(--accent-red);
            font-weight: 600;
        }}

        .change-negative {{
            color: var(--accent-green);
            font-weight: 600;
        }}

        .change-neutral {{
            color: var(--text-secondary);
        }}

        .p-value {{
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            color: var(--text-secondary);
            text-align: right;
        }}

        .p-value.significant {{
            color: var(--accent-yellow);
        }}

        .verdict {{
            font-weight: 600;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
        }}

        .verdict-regression {{
            color: var(--accent-red);
        }}

        .verdict-improvement {{
            color: var(--accent-green);
        }}

        .verdict-nochange {{
            color: var(--text-secondary);
        }}

        .confidence-bar {{
            width: 100px;
            height: 8px;
            background: var(--bg-tertiary);
            border-radius: 4px;
            overflow: hidden;
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
        }}

        .confidence-fill {{
            height: 100%;
            border-radius: 4px;
            transition: width 0.3s;
        }}

        .confidence-high {{
            background: var(--accent-green);
        }}

        .confidence-medium {{
            background: var(--accent-yellow);
        }}

        .confidence-low {{
            background: var(--text-secondary);
        }}

        .empty-state {{
            padding: 40px;
            text-align: center;
            color: var(--text-secondary);
        }}

        footer {{
            text-align: center;
            color: var(--text-secondary);
            font-size: 12px;
            margin-top: 24px;
            padding: 16px;
        }}

        footer a {{
            color: var(--accent-blue);
            text-decoration: none;
        }}

        @media (max-width: 768px) {{
            .summary {{
                grid-template-columns: 1fr;
            }}

            .meta-info {{
                grid-template-columns: 1fr;
            }}

            table {{
                font-size: 12px;
            }}

            th, td {{
                padding: 8px 12px;
            }}

            .confidence-bar {{
                display: none;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>
                Benchmark Comparison Report
                <span class="status-badge status-{status_class}">{status_text}</span>
            </h1>
            <div class="meta-info">
                <div class="meta-item">
                    <div class="meta-label">Baseline</div>
                    <div class="meta-value">{baseline}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Test</div>
                    <div class="meta-value">{test}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Significance Level</div>
                    <div class="meta-value">α = {significance}</div>
                </div>
                <div class="meta-item">
                    <div class="meta-label">Effect Threshold</div>
                    <div class="meta-value">≥ {threshold}%</div>
                </div>
            </div>
            {artifact_link}
        </header>

        <div class="summary">
            <div class="summary-card regressions">
                <div class="summary-number">{regression_count}</div>
                <div class="summary-label">Regressions</div>
            </div>
            <div class="summary-card improvements">
                <div class="summary-number">{improvement_count}</div>
                <div class="summary-label">Improvements</div>
            </div>
            <div class="summary-card unchanged">
                <div class="summary-number">{unchanged_count}</div>
                <div class="summary-label">Unchanged</div>
            </div>
        </div>
"##,
        status_text = overall_status.0,
        status_class = overall_status.2,
        baseline = html_escape(&args.baseline),
        test = html_escape(&args.test),
        significance = args.significance,
        threshold = args.threshold,
        artifact_link = artifact_link,
        regression_count = regressions.len(),
        improvement_count = improvements.len(),
        unchanged_count = no_change.len(),
    );

    // Regressions section
    if !regressions.is_empty() {
        html.push_str(&generate_benchmark_table(
            "⚠️ Regressions",
            &regressions,
            args.artifact_url.as_deref(),
        ));
    }

    // Improvements section
    if !improvements.is_empty() {
        html.push_str(&generate_benchmark_table(
            "🚀 Improvements",
            &improvements,
            args.artifact_url.as_deref(),
        ));
    }

    // Unchanged section
    if !no_change.is_empty() {
        html.push_str(&generate_benchmark_table(
            "➖ Unchanged",
            &no_change,
            args.artifact_url.as_deref(),
        ));
    }

    // Footer
    html.push_str(
        r##"
        <footer>
            Generated by <a href="https://github.com/sosorted/bench-compare">bench-compare</a> using Welch's t-test for statistical hypothesis testing.
        </footer>
    </div>
</body>
</html>
"##,
    );

    html
}

fn generate_benchmark_table(
    title: &str,
    comparisons: &[&ComparisonResult],
    artifact_url: Option<&str>,
) -> String {
    let mut html = format!(
        r#"
        <section>
            <h2>{}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Benchmark</th>
                        <th style="text-align: right">Baseline</th>
                        <th style="text-align: right">Test</th>
                        <th style="text-align: right">Change</th>
                        <th style="text-align: right">Confidence</th>
                        <th>Verdict</th>
                    </tr>
                </thead>
                <tbody>
"#,
        html_escape(title)
    );

    for c in comparisons {
        let change_class = if c.change_percent > 0.0 {
            "change-positive"
        } else if c.change_percent < 0.0 {
            "change-negative"
        } else {
            "change-neutral"
        };

        let verdict_class = match c.verdict {
            Verdict::Regression => "verdict-regression",
            Verdict::Improvement => "verdict-improvement",
            Verdict::NoChange => "verdict-nochange",
        };

        // Calculate confidence level (inverse of p-value, capped at 99.99%)
        let confidence = ((1.0 - c.p_value) * 100.0).min(99.99);
        let confidence_class = if confidence >= 95.0 {
            "confidence-high"
        } else if confidence >= 80.0 {
            "confidence-medium"
        } else {
            "confidence-low"
        };

        let p_class = if c.p_value < 0.05 {
            "p-value significant"
        } else {
            "p-value"
        };

        // Generate link to criterion report if artifact URL is provided
        let benchmark_link = if let Some(url) = artifact_url {
            let encoded_name = c.name.replace('/', "_");
            format!(
                r#"<a href="{}/criterion/{}/report/index.html" target="_blank">{}</a>"#,
                html_escape(url),
                html_escape(&encoded_name),
                html_escape(&c.name)
            )
        } else {
            html_escape(&c.name)
        };

        html.push_str(&format!(
            r#"                    <tr>
                        <td class="benchmark-name">{}</td>
                        <td class="time-value">{}</td>
                        <td class="time-value">{}</td>
                        <td class="time-value {}"><strong>{:+.2}%</strong></td>
                        <td class="{}">
                            <div class="confidence-bar"><div class="confidence-fill {}" style="width: {}%"></div></div>
                            {:.2}%
                        </td>
                        <td class="verdict {}">{}</td>
                    </tr>
"#,
            benchmark_link,
            format_time(c.baseline_mean_ns),
            format_time(c.test_mean_ns),
            change_class,
            c.change_percent,
            p_class,
            confidence_class,
            confidence.min(100.0),
            confidence,
            verdict_class,
            c.verdict
        ));
    }

    html.push_str(
        r#"                </tbody>
            </table>
        </section>
"#,
    );

    html
}

fn html_escape(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&#39;")
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
