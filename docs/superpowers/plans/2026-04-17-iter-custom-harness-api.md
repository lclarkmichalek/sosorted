# Iter-Custom Harness API Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Change criterion-hypothesis harness from "one sample = one function call" to "one sample = N function calls, divided to per-iter mean," eliminating sub-µs clock-noise false positives seen in the current A/A tests.

**Architecture:** `BenchmarkFn` becomes `Fn(u64) -> Duration`. The closure loops `n` times internally and returns total elapsed. Orchestrator adds a per-benchmark calibration pass (geometric doubling of `n` until one sample ≥ target duration, default 10ms), then collects `sample_size` samples at that fixed `n`, storing `elapsed / n` as the per-iter mean. Welch's t-test runs on the per-iter means. The `warmup_iterations` config goes away — calibration serves as warmup.

**Tech Stack:** Rust 2021 edition, tokio, axum, serde, statrs. Two repos: `/Users/lcm/Code/criterion-hypothesis` (workspace with 3 crates) and `/Users/lcm/Code/sosorted` (consumer).

**Scope:** This plan covers the protocol/harness/orchestrator change, the char-counter example migration, version bump of criterion-hypothesis to 0.3.0, and the sosorted bench migration. Out of scope: other statistical fixes from the audit (effect-size gating, multiple-comparisons correction, p-value formatting, order randomization) — those are tracked separately and unblocked once this lands.

---

## File Structure

### criterion-hypothesis repo

**Modify:**
- `criterion-hypothesis-core/src/protocol.rs` — add `iterations` field to req/resp
- `criterion-hypothesis-harness/src/lib.rs` — `BenchmarkFn` signature, `register`, `run`
- `criterion-hypothesis-harness/src/server.rs` — thread `iterations` through `/run` handler
- `criterion-hypothesis/src/orchestrator.rs` — `HarnessHandle::run_iteration` signature, calibration function, sample loop rewrite, `run_with_urls` rewrite
- `criterion-hypothesis/src/config.rs` — add `target_sample_ms`, `max_calibration_iters`, remove `warmup_iterations`
- `criterion-hypothesis/src/cli.rs` — drop `--warmup-iterations` flag if present, add `--target-sample-ms` override
- `criterion-hypothesis/src/main.rs` — update `Orchestrator::new` and `run_with_urls` call sites
- `criterion-hypothesis/src/lib.rs` — re-exports (if any changed)
- `examples/char-counter/benches/char_bench.rs` — closure signature update
- `criterion-hypothesis/tests/integration.rs` — protocol test updates
- `Cargo.toml` (workspace) — bump version 0.2.0 → 0.3.0
- Each crate's `Cargo.toml` — path-dep version bumps

### sosorted repo

**Modify:**
- `benches/find_first_duplicate.rs`, `benches/deduplicate.rs`, `benches/intersect.rs`, `benches/union.rs`, `benches/difference.rs`, `benches/roaring.rs` — migrate closures to `|n| { ... for _ in 0..n { ... } ... }`
- `.criterion-hypothesis.toml` — add `target_sample_ms`, remove `warmup_iterations`
- `.github/workflows/benchmark.yml` — pin to criterion-hypothesis 0.3.0 (new git rev)

---

## Branch Strategy

- criterion-hypothesis: branch from `master`, name `iter-custom-harness-api`
- sosorted: branch from `main`, name `bench-calibrated-samples`

Work in criterion-hypothesis repo first, commit, push, get a merge commit SHA on master. Then migrate sosorted pinning that SHA.

---

## Task 1: Set up working branches

**Files:** None — git-only.

- [ ] **Step 1: Create criterion-hypothesis branch**

```bash
cd /Users/lcm/Code/criterion-hypothesis
git fetch origin
git checkout master
git pull --ff-only
git checkout -b iter-custom-harness-api
```

- [ ] **Step 2: Create sosorted branch**

```bash
cd /Users/lcm/Code/sosorted
git fetch origin
git checkout main
git pull --ff-only
git checkout -b bench-calibrated-samples
```

- [ ] **Step 3: Verify workspaces build clean before we start**

```bash
cd /Users/lcm/Code/criterion-hypothesis && cargo build --workspace --all-targets
cd /Users/lcm/Code/sosorted && cargo build --benches
```

Expected: both build without errors. This is our green baseline.

---

## Task 2: Extend the wire protocol with `iterations`

**Files:**
- Modify: `/Users/lcm/Code/criterion-hypothesis/criterion-hypothesis-core/src/protocol.rs`

- [ ] **Step 1: Write the failing test**

Append to the existing `#[cfg(test)] mod tests` block in `protocol.rs`:

```rust
    #[test]
    fn test_run_iteration_request_with_iterations() {
        let request = RunIterationRequest::new("bench_a", 128);
        assert_eq!(request.benchmark_id, "bench_a");
        assert_eq!(request.iterations, 128);
    }

    #[test]
    fn test_run_iteration_response_echoes_iterations() {
        let response = RunIterationResponse::success(64, Duration::from_nanos(12800));
        assert!(response.success);
        assert_eq!(response.iterations, 64);
        assert_eq!(response.duration_ns, 12800);
    }

    #[test]
    fn test_run_iteration_request_roundtrip_includes_iterations() {
        let original = RunIterationRequest::new("my_bench", 42);
        let json = serde_json::to_string(&original).unwrap();
        let parsed: RunIterationRequest = serde_json::from_str(&json).unwrap();
        assert_eq!(parsed.benchmark_id, "my_bench");
        assert_eq!(parsed.iterations, 42);
    }
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo test -p criterion-hypothesis-core protocol::tests -- --nocapture
```

Expected: FAIL — `RunIterationRequest::new` has wrong arity, `.iterations` field doesn't exist.

- [ ] **Step 3: Update protocol types**

In `criterion-hypothesis-core/src/protocol.rs`:

```rust
/// Request to run a benchmark for a specified number of iterations.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RunIterationRequest {
    pub benchmark_id: String,
    /// Number of inner iterations the harness should loop the benchmark before reporting elapsed.
    /// Must be ≥ 1.
    pub iterations: u64,
}

impl RunIterationRequest {
    pub fn new(benchmark_id: impl Into<String>, iterations: u64) -> Self {
        Self {
            benchmark_id: benchmark_id.into(),
            iterations,
        }
    }
}

/// Response from running a benchmark for some number of iterations.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RunIterationResponse {
    pub success: bool,
    /// Echo of the iterations value the harness actually ran.
    pub iterations: u64,
    /// Total elapsed nanoseconds across all `iterations` calls.
    pub duration_ns: u64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,
}

impl RunIterationResponse {
    pub fn success(iterations: u64, duration: Duration) -> Self {
        Self {
            success: true,
            iterations,
            duration_ns: duration.as_nanos() as u64,
            error: None,
        }
    }

    pub fn failure(error: impl Into<String>) -> Self {
        Self {
            success: false,
            iterations: 0,
            duration_ns: 0,
            error: Some(error.into()),
        }
    }

    pub fn duration(&self) -> Duration {
        Duration::from_nanos(self.duration_ns)
    }

    /// Per-iteration mean duration (`duration / iterations`). Returns zero if iterations == 0.
    pub fn per_iter(&self) -> Duration {
        if self.iterations == 0 {
            Duration::ZERO
        } else {
            Duration::from_nanos(self.duration_ns / self.iterations)
        }
    }
}
```

Existing tests in the file call `RunIterationRequest::new("my_benchmark")` and `RunIterationResponse::success(duration)` — update them:

```rust
    #[test]
    fn test_run_iteration_request() {
        let request = RunIterationRequest::new("my_benchmark", 1);
        assert_eq!(request.benchmark_id, "my_benchmark");
        assert_eq!(request.iterations, 1);
    }

    #[test]
    fn test_run_iteration_response_success() {
        let duration = Duration::from_micros(1500);
        let response = RunIterationResponse::success(10, duration);

        assert!(response.success);
        assert_eq!(response.iterations, 10);
        assert_eq!(response.duration_ns, 1_500_000);
        assert!(response.error.is_none());
        assert_eq!(response.duration(), duration);
    }

    #[test]
    fn test_run_iteration_response_failure() {
        let response = RunIterationResponse::failure("benchmark panicked");

        assert!(!response.success);
        assert_eq!(response.iterations, 0);
        assert_eq!(response.duration_ns, 0);
        assert_eq!(response.error, Some("benchmark panicked".to_string()));
    }

    #[test]
    fn test_serialization_roundtrip() {
        let response = RunIterationResponse::success(5, Duration::from_nanos(12345));
        let json = serde_json::to_string(&response).unwrap();
        let deserialized: RunIterationResponse = serde_json::from_str(&json).unwrap();

        assert_eq!(response.duration_ns, deserialized.duration_ns);
        assert_eq!(response.iterations, deserialized.iterations);
        assert_eq!(response.success, deserialized.success);
        assert_eq!(response.error, deserialized.error);
    }

    #[test]
    fn test_error_field_skipped_when_none() {
        let response = RunIterationResponse::success(1, Duration::from_nanos(100));
        let json = serde_json::to_string(&response).unwrap();
        assert!(!json.contains("error"));
    }
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo test -p criterion-hypothesis-core protocol::tests
```

Expected: all tests pass. (Workspace build will fail — we haven't updated callers yet. That's fine.)

- [ ] **Step 5: Commit**

```bash
cd /Users/lcm/Code/criterion-hypothesis
git add criterion-hypothesis-core/src/protocol.rs
git commit -m "Add iterations field to run-iteration protocol"
```

---

## Task 3: Update harness registry API to `Fn(u64) -> Duration`

**Files:**
- Modify: `/Users/lcm/Code/criterion-hypothesis/criterion-hypothesis-harness/src/lib.rs`

- [ ] **Step 1: Write the failing test**

Replace the `tests` module in `criterion-hypothesis-harness/src/lib.rs` with tests that exercise the new signature. Keep the existing `test_registry_new` and `test_registry_default` as-is, but replace the others:

```rust
    #[test]
    fn test_registry_register_and_list() {
        let mut registry = BenchmarkRegistry::new();
        registry.register("bench1", |_n| Duration::from_millis(10));
        registry.register("bench2", |_n| Duration::from_millis(20));

        assert_eq!(registry.len(), 2);
        assert!(registry.contains("bench1"));
        assert!(registry.contains("bench2"));
        assert!(!registry.contains("bench3"));

        let names = registry.list();
        assert_eq!(names.len(), 2);
        assert!(names.contains(&"bench1".to_string()));
        assert!(names.contains(&"bench2".to_string()));
    }

    #[test]
    fn test_registry_run_passes_iterations() {
        use std::sync::atomic::{AtomicU64, Ordering};
        use std::sync::Arc;

        let observed = Arc::new(AtomicU64::new(0));
        let observed_clone = Arc::clone(&observed);

        let mut registry = BenchmarkRegistry::new();
        registry.register("iter_echo", move |n| {
            observed_clone.store(n, Ordering::SeqCst);
            Duration::from_nanos(n * 100)
        });

        let result = registry.run("iter_echo", 42);
        assert_eq!(result, Some(Duration::from_nanos(4200)));
        assert_eq!(observed.load(Ordering::SeqCst), 42);
    }

    #[test]
    fn test_registry_run_missing() {
        let mut registry = BenchmarkRegistry::new();
        registry.register("exists", |_n| Duration::from_millis(5));

        assert!(registry.run("missing", 1).is_none());
    }
```

- [ ] **Step 2: Run test to verify it fails**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo test -p criterion-hypothesis-harness --lib 2>&1 | tail -20
```

Expected: FAIL to compile — `Fn() -> Duration` does not accept `|_n|`, `run()` doesn't take a second arg.

- [ ] **Step 3: Update `BenchmarkFn` and registry methods**

In `criterion-hypothesis-harness/src/lib.rs`, replace lines 14-70 accordingly:

```rust
/// A benchmark function that runs `n` inner iterations and returns total elapsed.
///
/// The closure is expected to perform its work `n` times inside a tight loop
/// and return the total elapsed duration. The orchestrator divides by `n` to
/// obtain the per-iteration mean, which is the statistical unit the t-test
/// operates on.
///
/// Using a per-iteration loop amortises clock-read overhead (`Instant::now` is
/// ~20–50 ns) and gives meaningful variance estimates for fast functions.
pub type BenchmarkFn = Box<dyn Fn(u64) -> Duration + Send + Sync>;

/// Registry of discovered benchmarks.
pub struct BenchmarkRegistry {
    benchmarks: HashMap<String, BenchmarkFn>,
}

impl BenchmarkRegistry {
    pub fn new() -> Self {
        Self {
            benchmarks: HashMap::new(),
        }
    }

    /// Register a benchmark function.
    ///
    /// The closure receives an iteration count `n` and should execute the work
    /// `n` times before returning total elapsed.
    ///
    /// # Example
    ///
    /// ```ignore
    /// registry.register("my_benchmark", |n| {
    ///     let start = std::time::Instant::now();
    ///     for _ in 0..n {
    ///         std::hint::black_box(do_work());
    ///     }
    ///     start.elapsed()
    /// });
    /// ```
    pub fn register<F>(&mut self, name: impl Into<String>, f: F)
    where
        F: Fn(u64) -> Duration + Send + Sync + 'static,
    {
        self.benchmarks.insert(name.into(), Box::new(f));
    }

    pub fn list(&self) -> Vec<String> {
        self.benchmarks.keys().cloned().collect()
    }

    /// Run a benchmark by name for `iterations` inner iterations.
    ///
    /// Returns `None` if no benchmark with the given name exists.
    pub fn run(&self, name: &str, iterations: u64) -> Option<Duration> {
        self.benchmarks.get(name).map(|f| f(iterations))
    }

    pub fn contains(&self, name: &str) -> bool {
        self.benchmarks.contains_key(name)
    }

    pub fn len(&self) -> usize {
        self.benchmarks.len()
    }

    pub fn is_empty(&self) -> bool {
        self.benchmarks.is_empty()
    }
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo test -p criterion-hypothesis-harness --lib
```

Expected: all registry tests pass. `cargo build -p criterion-hypothesis-harness` will still fail because `server.rs` hasn't been updated — that's fixed in the next task.

- [ ] **Step 5: Commit**

```bash
cd /Users/lcm/Code/criterion-hypothesis
git add criterion-hypothesis-harness/src/lib.rs
git commit -m "Change BenchmarkFn to take iteration count"
```

---

## Task 4: Thread `iterations` through harness HTTP server

**Files:**
- Modify: `/Users/lcm/Code/criterion-hypothesis/criterion-hypothesis-harness/src/server.rs`

- [ ] **Step 1: Update the `/run` handler**

In `criterion-hypothesis-harness/src/server.rs`, the `run_iteration` handler currently passes only `benchmark_id` to `registry.run`. Change it to pass `request.iterations`, and to include the iteration count in the success response:

Replace the `run_iteration` function body around line 75 with:

```rust
async fn run_iteration(
    State(state): State<Arc<AppState>>,
    headers: HeaderMap,
    Json(request): Json<RunIterationRequest>,
) -> impl IntoResponse {
    if let Err(response) = check_claim(&state, &headers).await {
        return response;
    }

    if request.iterations == 0 {
        return (
            StatusCode::BAD_REQUEST,
            Json(RunIterationResponse::failure("iterations must be >= 1")),
        )
            .into_response();
    }

    match state.registry.run(&request.benchmark_id, request.iterations) {
        Some(duration) => {
            let count = state.iteration_count.fetch_add(1, Ordering::Relaxed) + 1;
            if count % LOG_INTERVAL == 0 {
                eprintln!("[harness] {} run calls completed", count);
            }
            (
                StatusCode::OK,
                Json(RunIterationResponse::success(request.iterations, duration)),
            )
                .into_response()
        }
        None => {
            eprintln!("[harness] Benchmark '{}' not found", request.benchmark_id);
            (
                StatusCode::NOT_FOUND,
                Json(RunIterationResponse::failure(format!(
                    "Benchmark '{}' not found",
                    request.benchmark_id
                ))),
            )
                .into_response()
        }
    }
}
```

- [ ] **Step 2: Update in-file tests that construct requests/responses**

Search for existing server tests in the file (around line 320+) that use `registry.register("test_bench", || Duration::from_millis(42))` and `RunIterationRequest::new(...)`:

```bash
cd /Users/lcm/Code/criterion-hypothesis
grep -n "register\|RunIterationRequest::new\|registry.run" criterion-hypothesis-harness/src/server.rs
```

Update each call:
- `registry.register("test_bench", || ...)` → `registry.register("test_bench", |_n| ...)`
- Any `RunIterationRequest::new("foo")` → `RunIterationRequest::new("foo", 1)`
- Any test that constructs a response manually → include `iterations` field

- [ ] **Step 3: Build and run harness tests**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo test -p criterion-hypothesis-harness
```

Expected: pass.

- [ ] **Step 4: Commit**

```bash
cd /Users/lcm/Code/criterion-hypothesis
git add criterion-hypothesis-harness/src/server.rs
git commit -m "Thread iterations through harness /run handler"
```

---

## Task 5: Migrate char-counter example to new API

**Files:**
- Modify: `/Users/lcm/Code/criterion-hypothesis/examples/char-counter/benches/char_bench.rs`

- [ ] **Step 1: Update the closure signature**

Replace the body of `char-counter/benches/char_bench.rs` with:

```rust
use char_counter::count_char;
use criterion_hypothesis_harness::{run_harness, BenchmarkRegistry};
use std::hint::black_box;
use std::time::Instant;

fn main() {
    let port: u16 = std::env::var("CH_PORT")
        .expect("CH_PORT environment variable must be set")
        .parse()
        .expect("CH_PORT must be a valid port number");

    let mut registry = BenchmarkRegistry::new();

    for size in [100, 1000, 10000] {
        let input: String = "a".repeat(size);
        let name = format!("char_counting/count_char/{}", size);

        registry.register(name, move |n| {
            let start = Instant::now();
            for _ in 0..n {
                black_box(count_char(black_box(&input), black_box('a')));
            }
            start.elapsed()
        });
    }

    run_harness(registry, port).expect("Failed to run harness");
}
```

- [ ] **Step 2: Build the example**

```bash
cd /Users/lcm/Code/criterion-hypothesis/examples/char-counter
cargo build --benches
```

Expected: builds cleanly.

- [ ] **Step 3: Commit**

```bash
cd /Users/lcm/Code/criterion-hypothesis
git add examples/char-counter/benches/char_bench.rs
git commit -m "Migrate char-counter example to iter-custom closure"
```

---

## Task 6: Update `HarnessHandle::run_iteration` client signature

**Files:**
- Modify: `/Users/lcm/Code/criterion-hypothesis/criterion-hypothesis/src/orchestrator.rs`

- [ ] **Step 1: Update `run_iteration` to take iteration count**

In `orchestrator.rs` around line 330:

```rust
    /// Run a benchmark on this handle with `iterations` inner iterations.
    ///
    /// Returns total elapsed across all iterations. The caller is responsible
    /// for dividing by `iterations` to get a per-iter mean.
    pub async fn run_iteration(
        &self,
        benchmark_id: &str,
        iterations: u64,
    ) -> Result<Duration, OrchestratorError> {
        let url = format!("{}/run", self.base_url());
        let request = RunIterationRequest::new(benchmark_id, iterations);

        let mut req = self.client.post(&url).json(&request);
        if let Some(nonce) = &self.claim_nonce {
            req = req.header(CLAIM_HEADER, nonce);
        }

        let response: RunIterationResponse = req.send().await?.json().await?;

        if response.success {
            Ok(response.duration())
        } else {
            Err(OrchestratorError::HarnessError(
                response
                    .error
                    .unwrap_or_else(|| "Unknown error".to_string()),
            ))
        }
    }
```

- [ ] **Step 2: Fix all call sites in orchestrator.rs**

```bash
cd /Users/lcm/Code/criterion-hypothesis
grep -n "run_iteration(" criterion-hypothesis/src/orchestrator.rs
```

The current call sites (lines ~688, 690, 818, 820, 822, 824, 836, 838, 842, 844) all need updating — but several of them are in `run_interleaved_pair` and `run_with_urls`, which we're about to rewrite entirely in Task 7. For now, to keep `cargo build` green at this step, pass a placeholder `1` iteration — these call sites will be rewritten next. Example:

```rust
let first_duration = first_handle.run_iteration(benchmark_name, 1).await?;
```

Apply `, 1` to all `run_iteration(benchmark_name)` calls in this file.

- [ ] **Step 3: Build**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo build --workspace
```

Expected: success. The `1`-placeholder makes behavior wrong but syntactically valid — the next task corrects it.

- [ ] **Step 4: Commit**

```bash
cd /Users/lcm/Code/criterion-hypothesis
git add criterion-hypothesis/src/orchestrator.rs
git commit -m "Update HarnessHandle::run_iteration to take iterations"
```

---

## Task 7: Add calibration and rewrite sample loop

**Files:**
- Modify: `/Users/lcm/Code/criterion-hypothesis/criterion-hypothesis/src/orchestrator.rs`
- Modify: `/Users/lcm/Code/criterion-hypothesis/criterion-hypothesis/src/config.rs`

This task changes measurement semantics — we calibrate `n` once per benchmark, then collect sample-means. The `warmup_iterations` field is removed because calibration provides its own warmup. Samples stored in `BenchmarkSamples` are now **per-iteration means** (total elapsed / n), in the same `Duration` units as before.

- [ ] **Step 1: Update config struct**

In `criterion-hypothesis/src/config.rs`, replace `OrchestrationConfig` and its `Default` impl:

```rust
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(default)]
pub struct OrchestrationConfig {
    /// Interval in milliseconds between interleaved benchmark runs.
    pub interleave_interval_ms: u64,
    /// Number of samples to collect per benchmark after calibration.
    pub sample_size: u32,
    /// Target minimum elapsed time per sample, in milliseconds.
    ///
    /// Calibration picks an iteration count `n` such that one sample (n inner
    /// iterations) takes at least this long. Larger values amortise clock-read
    /// overhead at the cost of total wall time.
    pub target_sample_ms: u64,
    /// Safety cap on the iteration count chosen during calibration.
    /// Prevents pathological benchmarks from exploding.
    pub max_calibration_iters: u64,
}

impl Default for OrchestrationConfig {
    fn default() -> Self {
        Self {
            interleave_interval_ms: 100,
            sample_size: 100,
            target_sample_ms: 10,
            max_calibration_iters: 1_000_000_000,
        }
    }
}
```

Update the config test `test_default_config` in the same file to drop `warmup_iterations` assertions and add the new fields:

```rust
    #[test]
    fn test_default_config() {
        let config = Config::default();

        assert_eq!(config.hypothesis.confidence_level, 0.95);
        assert_eq!(config.hypothesis.minimum_effect_size, 1.0);
        assert_eq!(config.orchestration.interleave_interval_ms, 100);
        assert_eq!(config.orchestration.sample_size, 100);
        assert_eq!(config.orchestration.target_sample_ms, 10);
        assert_eq!(config.orchestration.max_calibration_iters, 1_000_000_000);
        assert_eq!(config.build.profile, "release");
        assert!(config.build.cargo_flags.is_empty());
        assert!(config.build.bench_targets.is_empty());
        assert_eq!(config.network.base_port, 9100);
        assert_eq!(config.network.harness_timeout_ms, 30_000);
    }
```

Update `test_load_partial_config` and `test_load_full_config` the same way: remove any assertion about `warmup_iterations`; update TOML strings to drop `warmup_iterations = ...` lines (or leave them — unknown fields are silently ignored by `#[serde(default)]`, so leaving them only exercises that backwards-compat).

- [ ] **Step 2: Add calibration function**

In `orchestrator.rs`, add this private helper above `run_interleaved_pair`:

```rust
/// Calibrate iteration count so one sample meets the target elapsed duration.
///
/// Starts at `n = 1` and grows geometrically (up to 10× per step) until one
/// call to the benchmark returns elapsed ≥ `target`, or until `max_iters`.
/// Returns the chosen `n`.
///
/// The calibration runs only on the baseline handle; the same `n` is reused
/// for candidate samples so that per-iteration means are directly comparable.
async fn calibrate_iterations(
    handle: &HarnessHandle,
    benchmark_name: &str,
    target: Duration,
    max_iters: u64,
) -> Result<u64, OrchestratorError> {
    let mut n: u64 = 1;
    loop {
        let elapsed = handle.run_iteration(benchmark_name, n).await?;
        if elapsed >= target || n >= max_iters {
            return Ok(n);
        }
        // Pick next n so that elapsed * (next_n / n) is roughly target.
        // Cap growth at 10× per step to avoid overshooting on very fast bench.
        let elapsed_ns = elapsed.as_nanos().max(1) as f64;
        let target_ns = target.as_nanos() as f64;
        let scale = (target_ns / elapsed_ns).min(10.0);
        let next = ((n as f64) * scale).ceil() as u64;
        n = next.max(n + 1).min(max_iters);
    }
}
```

- [ ] **Step 3: Rewrite `Orchestrator` sampling loop**

Still in `orchestrator.rs`. The `Orchestrator` struct currently stores `warmup_iterations: u32`. Replace with `target_sample: Duration` and `max_calibration_iters: u64`. Update the fields:

```rust
pub struct Orchestrator {
    baseline_binary: PathBuf,
    candidate_binary: PathBuf,
    base_port: u16,
    timeout: Duration,
    sample_size: u32,
    interleave_interval: Duration,
    target_sample: Duration,
    max_calibration_iters: u64,
    harness_output: HarnessOutputMode,
}
```

Update the constructor `Orchestrator::new` signature accordingly:

```rust
impl Orchestrator {
    pub fn new(
        baseline_binary: PathBuf,
        candidate_binary: PathBuf,
        base_port: u16,
        timeout: Duration,
        sample_size: u32,
        interleave_interval: Duration,
        target_sample: Duration,
        max_calibration_iters: u64,
        harness_output: HarnessOutputMode,
    ) -> Self {
        Self {
            baseline_binary,
            candidate_binary,
            base_port,
            timeout,
            sample_size,
            interleave_interval,
            target_sample,
            max_calibration_iters,
            harness_output,
        }
    }
    // ...existing methods...
}
```

Replace the benchmark inner loop (currently around lines 628-668 — the section that runs warmup then collects samples for one benchmark) with:

```rust
        let mut samples = BenchmarkSamples::new(benchmark_name);

        // Calibrate iteration count on baseline; reuse for candidate.
        eprint!("      calibrating... ");
        let iters = calibrate_iterations(
            baseline,
            benchmark_name,
            self.target_sample,
            self.max_calibration_iters,
        )
        .await?;
        eprintln!("n={}", iters);

        // Collect interleaved samples at fixed `iters`.
        eprint!("      collecting {} samples (n={})... ", self.sample_size, iters);
        for i in 0..self.sample_size {
            self.run_interleaved_pair(benchmark_name, baseline, candidate, i % 2 == 0, iters, &mut samples)
                .await?;

            if (i + 1) % 10 == 0 {
                eprint!("{}", i + 1);
                if i + 1 < self.sample_size {
                    eprint!("...");
                }
            }
        }
        eprintln!(" done");
```

Update `run_interleaved_pair` to accept `iters` and record per-iter means:

```rust
    async fn run_interleaved_pair(
        &self,
        benchmark_name: &str,
        baseline: &HarnessHandle,
        candidate: &HarnessHandle,
        baseline_first: bool,
        iters: u64,
        samples: &mut BenchmarkSamples,
    ) -> Result<(), OrchestratorError> {
        let (first_handle, second_handle, first_is_baseline) = if baseline_first {
            (baseline, candidate, true)
        } else {
            (candidate, baseline, false)
        };

        let first_elapsed = first_handle.run_iteration(benchmark_name, iters).await?;
        sleep(self.interleave_interval).await;
        let second_elapsed = second_handle.run_iteration(benchmark_name, iters).await?;
        sleep(self.interleave_interval).await;

        let first_per_iter = first_elapsed / iters as u32;
        let second_per_iter = second_elapsed / iters as u32;

        if first_is_baseline {
            samples.add_baseline(first_per_iter);
            samples.add_candidate(second_per_iter);
        } else {
            samples.add_candidate(first_per_iter);
            samples.add_baseline(second_per_iter);
        }

        Ok(())
    }
```

Note on `iters as u32`: `Duration / u32` is the provided operator; if `iters` ever exceeds `u32::MAX` (~4.3 billion) we'd panic. `max_calibration_iters` defaults to 1e9, comfortably under, so this is safe. If future config changes raise the cap, switch to nanosecond arithmetic (`Duration::from_nanos(elapsed.as_nanos() as u64 / iters)`).

- [ ] **Step 4: Rewrite `run_with_urls` signature and body**

The top-level `run_with_urls` function (line ~750) also has its own sample loop. Replace the signature and body:

```rust
pub async fn run_with_urls(
    baseline_url: &str,
    candidate_url: &str,
    timeout: Duration,
    sample_size: u32,
    interleave_interval: Duration,
    target_sample: Duration,
    max_calibration_iters: u64,
) -> Result<Vec<BenchmarkSamples>, OrchestratorError> {
    let mut baseline = HarnessHandle::connect(baseline_url)?;
    let mut candidate = HarnessHandle::connect(candidate_url)?;

    eprint!("  Waiting for baseline harness... ");
    wait_for_health(&baseline, timeout).await?;
    eprintln!("ready");
    eprint!("  Waiting for candidate harness... ");
    wait_for_health(&candidate, timeout).await?;
    eprintln!("ready");

    eprint!("  Claiming baseline harness... ");
    baseline.claim().await?;
    eprintln!("claimed");
    eprint!("  Claiming candidate harness... ");
    candidate.claim().await?;
    eprintln!("claimed");

    let baseline_benchmarks = baseline.list_benchmarks().await?;
    let candidate_benchmarks = candidate.list_benchmarks().await?;

    let mut baseline_sorted = baseline_benchmarks.clone();
    let mut candidate_sorted = candidate_benchmarks.clone();
    baseline_sorted.sort();
    candidate_sorted.sort();

    if baseline_sorted != candidate_sorted {
        return Err(OrchestratorError::BenchmarkMismatch {
            baseline: baseline_benchmarks,
            candidate: candidate_benchmarks,
        });
    }

    eprintln!(
        "  Found {} benchmark(s): {}",
        baseline_sorted.len(),
        baseline_sorted.join(", ")
    );

    let mut results = Vec::new();
    let total_benchmarks = baseline_benchmarks.len();

    for (idx, benchmark_name) in baseline_benchmarks.iter().enumerate() {
        eprintln!("  [{}/{}] {}", idx + 1, total_benchmarks, benchmark_name);

        let mut samples = BenchmarkSamples::new(benchmark_name);

        eprint!("      calibrating... ");
        let iters = calibrate_iterations(&baseline, benchmark_name, target_sample, max_calibration_iters).await?;
        eprintln!("n={}", iters);

        eprint!("      collecting {} samples (n={})... ", sample_size, iters);
        for i in 0..sample_size {
            let baseline_first = i % 2 == 0;
            let (first_handle, second_handle, first_is_baseline) = if baseline_first {
                (&baseline, &candidate, true)
            } else {
                (&candidate, &baseline, false)
            };

            let first_elapsed = first_handle.run_iteration(benchmark_name, iters).await?;
            sleep(interleave_interval).await;
            let second_elapsed = second_handle.run_iteration(benchmark_name, iters).await?;
            sleep(interleave_interval).await;

            let first_per_iter = first_elapsed / iters as u32;
            let second_per_iter = second_elapsed / iters as u32;

            if first_is_baseline {
                samples.add_baseline(first_per_iter);
                samples.add_candidate(second_per_iter);
            } else {
                samples.add_candidate(first_per_iter);
                samples.add_baseline(second_per_iter);
            }

            if (i + 1) % 10 == 0 {
                eprint!("{}", i + 1);
                if (i + 1) < sample_size {
                    eprint!("...");
                }
            }
        }
        eprintln!(" done");

        results.push(samples);
    }

    baseline.release().await?;
    candidate.release().await?;

    Ok(results)
}
```

- [ ] **Step 5: Update `main.rs` call sites**

In `criterion-hypothesis/src/main.rs`:

Replace both `Orchestrator::new` call sites (currently passing `warmup_iterations, sample_size, interleave_interval, harness_output`) with:

```rust
            let orchestrator = Orchestrator::new(
                baseline_build.binary_path,
                candidate_build.binary_path,
                config.network.base_port,
                Duration::from_millis(config.network.harness_timeout_ms),
                config.orchestration.sample_size,
                Duration::from_millis(config.orchestration.interleave_interval_ms),
                Duration::from_millis(config.orchestration.target_sample_ms),
                config.orchestration.max_calibration_iters,
                cli.harness_output,
            );
```

(Two places — inside the `if bench_targets.is_empty()` branch and inside the `for bench_name in &bench_targets` loop.)

Replace the `run_with_urls(...)` call in `run_manual_mode`:

```rust
    let samples = run_with_urls(
        baseline_url,
        candidate_url,
        Duration::from_millis(config.network.harness_timeout_ms),
        config.orchestration.sample_size,
        Duration::from_millis(config.orchestration.interleave_interval_ms),
        Duration::from_millis(config.orchestration.target_sample_ms),
        config.orchestration.max_calibration_iters,
    )
    .await
    .context("Failed to run benchmarks with URLs")?;
```

- [ ] **Step 6: Update CLI if needed**

```bash
cd /Users/lcm/Code/criterion-hypothesis
grep -n "warmup" criterion-hypothesis/src/cli.rs
```

If there's a `--warmup-iterations` CLI flag or `apply_to_config` code that sets it, remove those lines. Add an optional `--target-sample-ms` override if following existing patterns — otherwise leave config-only (the sosorted workflow doesn't use CLI overrides for this).

- [ ] **Step 7: Build**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo build --workspace --all-targets
```

Expected: success.

- [ ] **Step 8: Run all workspace tests**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo test --workspace
```

Expected: all pass. Fix any test broken by the struct signature changes (e.g., the existing `BenchmarkSamples` test at the bottom of `orchestrator.rs` should still work unchanged since it uses `add_baseline`/`add_candidate` directly).

- [ ] **Step 9: Commit**

```bash
cd /Users/lcm/Code/criterion-hypothesis
git add criterion-hypothesis/src/config.rs criterion-hypothesis/src/orchestrator.rs criterion-hypothesis/src/main.rs criterion-hypothesis/src/cli.rs
git commit -m "Calibrate iteration count and record per-iter sample means"
```

---

## Task 8: End-to-end smoke test via char-counter example

**Files:** None — exercise only.

- [ ] **Step 1: Run the example end-to-end**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo build --release -p char-counter --benches
cargo run --release --bin criterion-hypothesis -- \
  --baseline HEAD --candidate HEAD \
  --project-path examples/char-counter \
  --bench char_bench
```

Expected:
- Calibration runs, picks some `n > 1` per benchmark (for 10000-byte input, should be modest; for 100-byte input, could be thousands).
- Samples collected; final report shows mean times in ns per iteration that look sensible (tens of ns for 100-byte input).
- Because this is an A/A run (baseline == candidate == HEAD), most benchmarks should come back **inconclusive**, not "significant at p=0.0000". If the majority are still flagged significant, something is wrong — investigate before moving on.

- [ ] **Step 2: If the smoke test behaves well, commit any follow-up tweaks**

No expected changes, but if the smoke test surfaces issues, fix and commit.

---

## Task 9: Bump version to 0.3.0 and push criterion-hypothesis branch

**Files:**
- Modify: `/Users/lcm/Code/criterion-hypothesis/Cargo.toml`

- [ ] **Step 1: Bump workspace version**

Edit `Cargo.toml` (workspace root):

```toml
[workspace.package]
version = "0.3.0"
```

And each crate's `path`-dep references (`criterion-hypothesis/Cargo.toml`, `criterion-hypothesis-harness/Cargo.toml`):

```bash
cd /Users/lcm/Code/criterion-hypothesis
grep -rn "version = \"0.2.0\"" criterion-hypothesis/Cargo.toml criterion-hypothesis-harness/Cargo.toml criterion-hypothesis-core/Cargo.toml
```

Update any remaining `0.2.0` to `0.3.0` in the inner `Cargo.toml` path-dep lines.

- [ ] **Step 2: Rebuild to update Cargo.lock**

```bash
cd /Users/lcm/Code/criterion-hypothesis
cargo build --workspace
```

- [ ] **Step 3: Commit and push**

```bash
cd /Users/lcm/Code/criterion-hypothesis
git add Cargo.toml Cargo.lock criterion-hypothesis/Cargo.toml criterion-hypothesis-harness/Cargo.toml criterion-hypothesis-core/Cargo.toml
git commit -m "Bump version to 0.3.0"
git push -u origin iter-custom-harness-api
```

- [ ] **Step 4: Open PR**

```bash
cd /Users/lcm/Code/criterion-hypothesis
gh pr create --title "Iter-custom harness API: calibrate n, measure per-iter means" --body "$(cat <<'EOF'
## Summary
- Change `BenchmarkFn` from `Fn() -> Duration` to `Fn(u64) -> Duration`. Closures now receive an iteration count `n` and loop the benchmark body `n` times, returning total elapsed.
- Orchestrator calibrates `n` per benchmark by geometric doubling until one sample ≥ `target_sample_ms` (default 10 ms), then collects `sample_size` samples at that fixed `n`.
- Samples stored as per-iteration means (`elapsed / n`), which is the statistical unit Welch's t-test actually expects. Removes `warmup_iterations` — calibration serves as warmup.
- This fixes the primary source of A/A false positives: the previous model recorded one raw timing per sample, so for sub-µs benchmarks the per-sample CV was dominated by clock-read noise (~20–50 ns `Instant::now` overhead), producing inflated t-statistics and spurious p ≈ 0.

Version bumped to 0.3.0 — this is a breaking API change for benchmark authors. Closures must be updated to the `|n| { for _ in 0..n { ... } }` shape.

## Test plan
- [ ] `cargo test --workspace` passes
- [ ] char-counter example runs end-to-end via `criterion-hypothesis --baseline HEAD --candidate HEAD`
- [ ] A/A run on char-counter no longer flags spurious significance at default 95% confidence

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Record the PR URL; you'll reference the merge SHA in Task 11.

---

## Task 10: Migrate sosorted bench files to `|n|` closure signature

**Files:**
- Modify: `/Users/lcm/Code/sosorted/benches/find_first_duplicate.rs`
- Modify: `/Users/lcm/Code/sosorted/benches/deduplicate.rs`
- Modify: `/Users/lcm/Code/sosorted/benches/intersect.rs`
- Modify: `/Users/lcm/Code/sosorted/benches/union.rs`
- Modify: `/Users/lcm/Code/sosorted/benches/difference.rs`
- Modify: `/Users/lcm/Code/sosorted/benches/roaring.rs`

- [ ] **Step 1: Scan for all benchmark closures**

```bash
cd /Users/lcm/Code/sosorted
grep -n "registry.register" benches/*.rs | wc -l
```

This reports how many closures need migration.

- [ ] **Step 2: Migrate each file, one closure at a time**

For each file, every closure of the form:

```rust
registry.register("some_name", move || {
    let start = Instant::now();
    black_box(some_fn(black_box(&mut dest), black_box(&a), black_box(&b)));
    start.elapsed()
});
```

becomes:

```rust
registry.register("some_name", move |n| {
    let start = Instant::now();
    for _ in 0..n {
        black_box(some_fn(black_box(&mut dest), black_box(&a), black_box(&b)));
    }
    start.elapsed()
});
```

The `black_box` positions don't change. The `move` on the outer closure is still required.

**Note on state accumulation**: Many benches write to a reusable `dest` buffer. With `n > 1`, iterations 2..n operate on an already-dirty `dest`. That's the steady-state regime these benchmarks will now measure — accept it. If any benchmark needs per-iteration state reset, that's explicit opt-in by the author (not part of this migration).

- [ ] **Step 3: Build benches**

```bash
cd /Users/lcm/Code/sosorted
cargo build --benches
```

Expected: success. A compile error typically means a closure was missed — fix and retry.

- [ ] **Step 4: Run the existing cargo tests**

```bash
cd /Users/lcm/Code/sosorted
cargo test
```

Expected: pass. (The bench closures aren't exercised by unit tests — this is just verifying nothing else broke.)

- [ ] **Step 5: Commit**

```bash
cd /Users/lcm/Code/sosorted
git add benches/
git commit -m "Migrate benches to iter-custom closure signature"
```

---

## Task 11: Update sosorted config and workflow pin

**Files:**
- Modify: `/Users/lcm/Code/sosorted/.criterion-hypothesis.toml`
- Modify: `/Users/lcm/Code/sosorted/.github/workflows/benchmark.yml`

- [ ] **Step 1: Update `.criterion-hypothesis.toml`**

Replace the `[orchestration]` section with:

```toml
[orchestration]
interleave_interval_ms = 10   # Short delay between runs
sample_size = 50              # Number of samples per benchmark
target_sample_ms = 10         # Calibration target: each sample ≥ 10ms
```

Remove the `warmup_iterations = 5` line entirely. Leave other sections unchanged.

- [ ] **Step 2: Update the workflow install step**

In `.github/workflows/benchmark.yml`, the current install step is either a git-pinned rev or a crates.io version. Find it:

```bash
cd /Users/lcm/Code/sosorted
grep -n "criterion-hypothesis" .github/workflows/benchmark.yml
```

If it's pinned to a git rev (as in the current PR #247 workflow), update the rev to the merge commit from Task 9's PR. If it's `criterion-hypothesis@0.2.0` on crates.io, switch to the git source pointing at the new PR's merge SHA (or the release tag if published). Assuming the existing pattern is:

```yaml
      - name: Install criterion-hypothesis
        if: steps.changes.outputs.skip_benchmarks != 'true'
        run: cargo install criterion-hypothesis@0.2.0
```

Change to `0.3.0`. If the previous install was git-based, update to the new merge SHA.

- [ ] **Step 3: Local sanity check — run the criterion-hypothesis CLI against a sosorted A/A**

This is optional but useful before committing:

```bash
cd /Users/lcm/Code/sosorted
# Point at the local built copy to avoid needing the PR merged yet:
/Users/lcm/Code/criterion-hypothesis/target/release/criterion-hypothesis \
  --baseline HEAD --candidate HEAD \
  --config .criterion-hypothesis.toml \
  2>&1 | tail -80
```

Expected: far fewer significance hits than the current 10F/5S/51I split. Most benches should be inconclusive.

- [ ] **Step 4: Commit**

```bash
cd /Users/lcm/Code/sosorted
git add .criterion-hypothesis.toml .github/workflows/benchmark.yml
git commit -m "Update config and workflow for criterion-hypothesis 0.3.0"
```

- [ ] **Step 5: Push and open PR**

```bash
cd /Users/lcm/Code/sosorted
git push -u origin bench-calibrated-samples
gh pr create --title "Migrate benches to calibrated iter-custom API" --body "$(cat <<'EOF'
## Summary
- Migrate every `registry.register` closure in `benches/*.rs` from `|| { ... }` to `|n| { for _ in 0..n { ... } }`.
- Update `.criterion-hypothesis.toml`: drop `warmup_iterations`, add `target_sample_ms = 10` (calibration target).
- Pin workflow install to criterion-hypothesis 0.3.0.

This resolves the A/A false-positive behaviour seen in recent runs (10 faster / 5 slower / 51 inconclusive on identical code). The new harness calibrates iteration count per benchmark and feeds Welch's t-test per-iteration means rather than per-call raw timings.

## Test plan
- [ ] `cargo build --benches` succeeds locally
- [ ] Benchmark CI passes on a trivial PR (open a test PR after merge to verify)
- [ ] A/A comparison shows mostly inconclusive results instead of spurious significance

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

---

## Verification checklist

Before declaring the plan complete:

- [ ] criterion-hypothesis PR merged to master
- [ ] sosorted workflow pins the merged SHA/version
- [ ] A/A run on sosorted produces mostly inconclusive results (≤ 5% significant, consistent with α=0.05 false-positive rate)
- [ ] A real PR with a Rust change in sosorted runs through the benchmark workflow end-to-end

---

## Follow-ups (not part of this plan)

After this lands, the remaining audit findings are still open and should be addressed in separate plans:

1. Enforce `minimum_effect_size` post-hoc in the significance gate.
2. Apply multiple-comparisons correction (Bonferroni or FDR).
3. Randomize baseline/candidate ordering per sample (replace `i % 2`).
4. Print p-values with scientific notation to distinguish `1e-4` from `1e-15`.
5. Add a lag-1 autocorrelation diagnostic warning.
