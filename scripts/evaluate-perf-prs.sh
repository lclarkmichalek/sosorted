#!/bin/bash
#
# Automated Performance PR Evaluation System
#
# Automatically evaluates open PRs claiming performance improvements by:
# 1. Identifying PRs with performance keywords in title/description
# 2. Rebasing each PR onto origin/main
# 3. Running statistical benchmark comparisons
# 4. Merging PRs with significant improvements OR closing PRs without improvements/regressions
# 5. Running linters/formatters before all commits
#

set -euo pipefail

# Configuration
DRY_RUN="${DRY_RUN:-false}"
SIGNIFICANCE_LEVEL="0.05"
EFFECT_THRESHOLD="2.0"
SAMPLE_SIZE="50"
BENCHMARK_TIMEOUT="1800"  # 30 minutes

# Performance keywords for PR detection
PERF_KEYWORDS="optimize|optimise|optimization|optimisation|perf|performance|faster|speed|speedup|improve|improvement|efficiency|efficient"

# Counters
TOTAL_PRS=0
MERGED_COUNT=0
REGRESSION_CLOSES=0
NO_CHANGE_CLOSES=0
CONFLICT_SKIPS=0
ERROR_SKIPS=0

# Save original state
ORIGINAL_BRANCH=$(git rev-parse --abbrev-ref HEAD)
ORIGINAL_REF=$(git rev-parse HEAD)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
  echo -e "${BLUE}[INFO]${NC} $*"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $*"
}

log_warn() {
  echo -e "${YELLOW}[WARN]${NC} $*"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $*"
}

# Cleanup function
cleanup() {
  log_info "Cleaning up..."

  # Abort rebase if in progress
  if git status 2>/dev/null | grep -q "rebase in progress"; then
    log_warn "Aborting rebase in progress"
    git rebase --abort 2>/dev/null || true
  fi

  # Return to original branch
  if [ "$(git rev-parse --abbrev-ref HEAD 2>/dev/null)" != "${ORIGINAL_BRANCH}" ]; then
    log_info "Returning to original branch: ${ORIGINAL_BRANCH}"
    git checkout "${ORIGINAL_BRANCH}" 2>/dev/null || git checkout main 2>/dev/null || true
  fi
}

# Set up cleanup trap
trap cleanup EXIT INT TERM

# Pre-flight checks
preflight_checks() {
  log_info "Running pre-flight checks..."

  # Verify git repository
  if [ ! -d .git ]; then
    log_error "Not a git repository"
    exit 1
  fi

  # Check for uncommitted changes
  if [ -n "$(git status --porcelain)" ]; then
    log_error "Working directory has uncommitted changes"
    echo "Please commit or stash changes before running evaluation"
    exit 1
  fi

  # Verify gh CLI is installed
  if ! command -v gh &> /dev/null; then
    log_error "GitHub CLI (gh) is not installed"
    echo "Install it from: https://cli.github.com/"
    exit 1
  fi

  # Verify jq is installed
  if ! command -v jq &> /dev/null; then
    log_error "jq is not installed"
    echo "Install it with: sudo apt-get install jq"
    exit 1
  fi

  # Fetch latest from origin
  log_info "Fetching latest from origin/main..."
  git fetch origin main

  log_success "Pre-flight checks passed"
}

# Build bench-compare tool
build_bench_compare() {
  log_info "Building bench-compare tool..."

  if cargo build --release -p bench-compare; then
    # Verify it works
    if ! ./target/release/bench-compare --help >/dev/null 2>&1; then
      log_error "bench-compare tool failed to run"
      exit 1
    fi
    log_success "bench-compare tool built successfully"
  else
    log_error "Failed to build bench-compare tool"
    exit 1
  fi
}

# Discover performance PRs
discover_prs() {
  log_info "Discovering performance PRs..."

  # Fetch all open PRs
  local pr_json
  pr_json=$(gh pr list \
    --json number,title,body,isDraft,state,baseRefName \
    --limit 100 \
    --state open \
    --base main 2>&1)

  if [ $? -ne 0 ]; then
    log_error "Failed to fetch PRs: ${pr_json}"
    exit 1
  fi

  # Filter PRs by criteria
  local pr_numbers
  pr_numbers=$(echo "${pr_json}" | jq -r ".[] |
    select(.isDraft == false and .state == \"OPEN\" and .baseRefName == \"main\") |
    select(
      (.title // \"\" | ascii_downcase | test(\"${PERF_KEYWORDS}\")) or
      (.body // \"\" | ascii_downcase | test(\"${PERF_KEYWORDS}\"))
    ) |
    .number")

  echo "${pr_numbers}"
}

# Evaluate a single PR
evaluate_pr() {
  local pr_number=$1

  echo ""
  echo "========================================="
  log_info "Evaluating PR #${pr_number}"
  echo "========================================="

  # Check PR is still open
  local pr_state
  pr_state=$(gh pr view "${pr_number}" --json state -q .state 2>/dev/null || echo "UNKNOWN")

  if [ "${pr_state}" != "OPEN" ]; then
    log_warn "PR #${pr_number} is no longer open, skipping"
    return 1
  fi

  # Checkout PR branch
  log_info "Checking out PR #${pr_number}..."
  if ! gh pr checkout "${pr_number}"; then
    log_error "Failed to checkout PR #${pr_number}"
    return 1
  fi

  # Save PR head SHA before rebase
  local pr_head_sha
  pr_head_sha=$(git rev-parse HEAD)
  local pr_branch
  pr_branch=$(git rev-parse --abbrev-ref HEAD)

  log_info "PR branch: ${pr_branch} (${pr_head_sha:0:7})"

  # Attempt rebase onto origin/main
  log_info "Rebasing onto origin/main..."
  if ! git rebase origin/main; then
    log_warn "Rebase failed due to conflicts"
    git rebase --abort

    # Post conflict comment
    local conflict_comment="## ⚠️ Merge Conflicts

This PR could not be evaluated due to conflicts with main. Please rebase and resolve conflicts:

\`\`\`bash
git fetch origin main
git rebase origin/main
# Resolve conflicts...
git push --force-with-lease
\`\`\`

The evaluation will retry automatically after you push."

    if [ "${DRY_RUN}" == "true" ]; then
      log_info "[DRY RUN] Would post conflict comment to PR #${pr_number}"
    else
      gh pr comment "${pr_number}" --body "${conflict_comment}"
    fi

    git checkout "${ORIGINAL_BRANCH}"
    return 1
  fi

  # Rebase successful
  local rebased_sha
  rebased_sha=$(git rev-parse HEAD)
  local baseline_sha
  baseline_sha=$(git rev-parse origin/main)

  log_success "Rebase successful: ${rebased_sha:0:7}"

  # Determine selective benchmarks
  log_info "Determining which benchmarks to run..."
  local changed_files
  changed_files=$(gh pr view "${pr_number}" --json files -q '.files[].path' | tr '\n' ' ')

  log_info "Changed files: ${changed_files}"

  local bench_arg=""

  # Check if core files changed (run all benchmarks)
  if echo "${changed_files}" | grep -qE "src/(lib|simd_element)\.rs|benches/common/|crates/bench-compare/"; then
    log_info "Core files changed, running all benchmarks"
    bench_arg=""
  else
    # Check specific operations
    for op in deduplicate find_first_duplicate intersect union difference; do
      if echo "${changed_files}" | grep -qE "(src|benches)/${op}\.rs"; then
        bench_arg="--bench ${op}"
        log_info "Single operation affected: ${op}"
        break
      fi
    done

    if [ -z "${bench_arg}" ]; then
      log_info "Multiple or unclear changes, running all benchmarks"
    fi
  fi

  # Run benchmarks
  local results_file="/tmp/bench-results-${pr_number}.json"
  log_info "Running benchmarks (this may take a while)..."
  log_info "  Baseline: ${baseline_sha:0:7}"
  log_info "  Test: ${rebased_sha:0:7}"
  log_info "  Arguments: ${bench_arg:-all benchmarks}"

  set +e  # Don't exit on non-zero
  timeout ${BENCHMARK_TIMEOUT} ./target/release/bench-compare \
    --baseline origin/main \
    --test HEAD \
    --output json \
    --significance "${SIGNIFICANCE_LEVEL}" \
    --threshold "${EFFECT_THRESHOLD}" \
    --sample-size "${SAMPLE_SIZE}" \
    ${bench_arg} \
    > "${results_file}" 2>&1

  local bench_exit_code=$?
  set -e

  # Handle timeout
  if [ ${bench_exit_code} -eq 124 ]; then
    log_error "Benchmark timed out (>${BENCHMARK_TIMEOUT}s)"

    local timeout_comment="## ⚠️ Benchmark Timeout

Benchmark execution exceeded ${BENCHMARK_TIMEOUT} seconds (30 minutes). This may indicate:
- Performance issues or infinite loops in the code
- Infrastructure problems

Please verify benchmarks complete locally:
\`\`\`bash
cargo bench
\`\`\`"

    if [ "${DRY_RUN}" == "true" ]; then
      log_info "[DRY RUN] Would post timeout comment to PR #${pr_number}"
    else
      gh pr comment "${pr_number}" --body "${timeout_comment}"
    fi

    git checkout "${ORIGINAL_BRANCH}"
    rm -f "${results_file}"
    return 1
  fi

  # Handle other errors
  if [ ${bench_exit_code} -gt 1 ]; then
    log_error "Benchmark execution failed with exit code ${bench_exit_code}"

    local error_comment="## ⚠️ Performance Evaluation Failed: Benchmark Error

The benchmark comparison failed to execute properly. This may indicate:
- Build failures in the benchmark code
- Missing benchmark targets
- Infrastructure issues

Please verify that benchmarks build and run locally:
\`\`\`bash
cargo bench --no-run
cargo bench
\`\`\`"

    if [ "${DRY_RUN}" == "true" ]; then
      log_info "[DRY RUN] Would post error comment to PR #${pr_number}"
    else
      gh pr comment "${pr_number}" --body "${error_comment}"
    fi

    git checkout "${ORIGINAL_BRANCH}"
    rm -f "${results_file}"
    return 1
  fi

  log_success "Benchmarks completed with exit code ${bench_exit_code}"

  # Verify JSON file exists and is valid
  if [ ! -f "${results_file}" ] || [ ! -s "${results_file}" ]; then
    log_error "Results file not found or empty"
    git checkout "${ORIGINAL_BRANCH}"
    rm -f "${results_file}"
    return 1
  fi

  if ! jq empty "${results_file}" 2>/dev/null; then
    log_error "Invalid JSON in results file"
    git checkout "${ORIGINAL_BRANCH}"
    rm -f "${results_file}"
    return 1
  fi

  # Extract verdict counts
  local regressions
  regressions=$(jq '[.[] | select(.verdict == "regression")] | length' "${results_file}")
  local improvements
  improvements=$(jq '[.[] | select(.verdict == "improvement")] | length' "${results_file}")
  local no_change
  no_change=$(jq '[.[] | select(.verdict == "nochange")] | length' "${results_file}")

  log_info "Results summary:"
  log_info "  Regressions: ${regressions}"
  log_info "  Improvements: ${improvements}"
  log_info "  No change: ${no_change}"

  # Determine action
  local action
  local reason

  if [ ${regressions} -gt 0 ]; then
    action="close"
    reason="regressions"
    log_warn "Decision: CLOSE (has regressions)"
  elif [ ${improvements} -gt 0 ]; then
    action="merge"
    reason="improvements"
    log_success "Decision: MERGE (has improvements)"
  else
    action="close"
    reason="no_significant_change"
    log_warn "Decision: CLOSE (no significant changes)"
  fi

  # Execute action
  if [ "${action}" == "merge" ]; then
    # Run quality gates
    if ! run_quality_gates "${pr_number}"; then
      log_error "Quality gates failed, not merging"
      git checkout "${ORIGINAL_BRANCH}"
      rm -f "${results_file}"
      return 1
    fi

    # Merge PR
    merge_pr "${pr_number}" "${baseline_sha}" "${rebased_sha}" "${results_file}" "${improvements}" "${no_change}"
  else
    # Close PR
    close_pr "${pr_number}" "${reason}" "${baseline_sha}" "${rebased_sha}" "${results_file}" "${regressions}" "${improvements}" "${no_change}"
  fi

  # Cleanup
  git checkout "${ORIGINAL_BRANCH}"
  rm -f "${results_file}"

  return 0
}

# Run quality gates
run_quality_gates() {
  local pr_number=$1

  log_info "Running quality gates..."

  # 1. Cargo fmt check
  log_info "Checking formatting..."
  if ! cargo fmt --all --check >/dev/null 2>&1; then
    log_warn "Formatting issues detected, auto-fixing..."
    cargo fmt --all

    # Commit formatting changes
    if [ -n "$(git status --porcelain)" ]; then
      if [ "${DRY_RUN}" == "true" ]; then
        log_info "[DRY RUN] Would commit formatting changes"
      else
        git add .
        git commit -m "style: Apply cargo fmt before merge

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
        log_success "Formatting fixed and committed"
      fi
    fi
  else
    log_success "Formatting OK"
  fi

  # 2. Cargo clippy check (BLOCKING)
  log_info "Running clippy..."
  if ! cargo clippy --all-targets --all-features -- -D warnings 2>&1; then
    log_error "BLOCKING: Clippy warnings detected"

    local clippy_comment="## ⚠️ Merge Blocked: Clippy Warnings

While this PR shows performance improvements, it cannot be merged due to clippy warnings.

Please fix the warnings and push:
\`\`\`bash
cargo clippy --all-targets --all-features -- -D warnings
\`\`\`

Once fixed, the performance evaluation will automatically retry."

    if [ "${DRY_RUN}" == "true" ]; then
      log_info "[DRY RUN] Would post clippy failure comment to PR #${pr_number}"
    else
      gh pr comment "${pr_number}" --body "${clippy_comment}"
    fi

    return 1
  fi
  log_success "Clippy OK"

  # 3. Cargo test check (BLOCKING)
  log_info "Running tests..."
  if ! cargo test 2>&1 | tee /tmp/test-output.log; then
    log_error "BLOCKING: Test failures detected"

    local test_comment="## ⚠️ Merge Blocked: Test Failures

While this PR shows performance improvements, it cannot be merged due to test failures.

Please fix the failing tests and push:
\`\`\`bash
cargo test
\`\`\`

Once fixed, the performance evaluation will automatically retry."

    if [ "${DRY_RUN}" == "true" ]; then
      log_info "[DRY RUN] Would post test failure comment to PR #${pr_number}"
    else
      gh pr comment "${pr_number}" --body "${test_comment}"
    fi

    return 1
  fi
  log_success "Tests OK"

  log_success "All quality gates passed"
  return 0
}

# Merge a PR
merge_pr() {
  local pr_number=$1
  local baseline_sha=$2
  local rebased_sha=$3
  local results_file=$4
  local improvements=$5
  local no_change=$6

  log_info "Preparing to merge PR #${pr_number}..."

  # Extract top 5 improvements for comment
  local top_improvements
  top_improvements=$(jq -r '
    [.[] | select(.verdict == "improvement")] |
    sort_by(.change_percent) |
    .[:5] |
    .[] |
    "- **\(.name)**: \(.change_percent | floor)% faster (p=\(.p_value | tonumber | . * 10000 | floor / 10000))"
  ' "${results_file}")

  # Post success comment
  local success_comment="## ✅ Performance Evaluation: APPROVED

**Statistically significant improvements detected!**

### Summary
- 🚀 Improvements: ${improvements}
- ➖ Unchanged: ${no_change}
- ⚠️ Regressions: 0

### Top Improvements
${top_improvements}

---

**Action:** Merging via squash merge.

<sub>Statistical params: p<${SIGNIFICANCE_LEVEL}, ≥${EFFECT_THRESHOLD}% effect | Baseline: \`${baseline_sha:0:7}\` | Test: \`${rebased_sha:0:7}\`</sub>"

  if [ "${DRY_RUN}" == "true" ]; then
    log_info "[DRY RUN] Would post success comment to PR #${pr_number}"
    log_info "[DRY RUN] Would merge PR #${pr_number} with squash merge"
    MERGED_COUNT=$((MERGED_COUNT + 1))
  else
    gh pr comment "${pr_number}" --body "${success_comment}"
    sleep 2

    # Squash merge
    if gh pr merge "${pr_number}" --squash; then
      log_success "PR #${pr_number} merged successfully"
      MERGED_COUNT=$((MERGED_COUNT + 1))
    else
      log_error "Failed to merge PR #${pr_number}"
      log_warn "PR may require manual approval or have branch protection issues"
      ERROR_SKIPS=$((ERROR_SKIPS + 1))
    fi
  fi
}

# Close a PR
close_pr() {
  local pr_number=$1
  local reason=$2
  local baseline_sha=$3
  local rebased_sha=$4
  local results_file=$5
  local regressions=$6
  local improvements=$7
  local no_change=$8

  log_info "Preparing to close PR #${pr_number} (reason: ${reason})..."

  local comment

  if [ "${reason}" == "regressions" ]; then
    # Extract all regressions
    local all_regressions
    all_regressions=$(jq -r '
      [.[] | select(.verdict == "regression")] |
      .[] |
      "- **\(.name)**: +\(.change_percent | floor)% slower (p=\(.p_value | tonumber | . * 10000 | floor / 10000))"
    ' "${results_file}")

    comment="## ⚠️ Performance Evaluation: REJECTED

**Statistically significant regressions detected.**

### Summary
- 🚀 Improvements: ${improvements}
- ➖ Unchanged: ${no_change}
- ⚠️ Regressions: ${regressions}

### Regressions
${all_regressions}

---

**Action:** Closing due to performance regressions.

<sub>Statistical params: p<${SIGNIFICANCE_LEVEL}, ≥${EFFECT_THRESHOLD}% effect | Baseline: \`${baseline_sha:0:7}\` | Test: \`${rebased_sha:0:7}\`</sub>"

  else  # no_significant_change
    comment="## 📊 Performance Evaluation: NO SIGNIFICANT CHANGES

No statistically significant performance changes detected.

### Summary
- 🚀 Improvements: 0
- ➖ Unchanged: ${no_change}
- ⚠️ Regressions: 0

While this PR may contain optimizations, they don't meet the statistical thresholds:
- P-value must be < ${SIGNIFICANCE_LEVEL}
- Effect size must be ≥ ${EFFECT_THRESHOLD}%

---

**Action:** Closing as no significant improvements demonstrated.

<sub>Statistical params: p<${SIGNIFICANCE_LEVEL}, ≥${EFFECT_THRESHOLD}% effect | Baseline: \`${baseline_sha:0:7}\` | Test: \`${rebased_sha:0:7}\`</sub>"
  fi

  if [ "${DRY_RUN}" == "true" ]; then
    log_info "[DRY RUN] Would post close comment to PR #${pr_number}"
    log_info "[DRY RUN] Would close PR #${pr_number}"
  else
    gh pr comment "${pr_number}" --body "${comment}"
    sleep 2

    if gh pr close "${pr_number}"; then
      log_success "PR #${pr_number} closed"
    else
      log_error "Failed to close PR #${pr_number}"
      ERROR_SKIPS=$((ERROR_SKIPS + 1))
      return
    fi
  fi

  if [ "${reason}" == "regressions" ]; then
    REGRESSION_CLOSES=$((REGRESSION_CLOSES + 1))
  else
    NO_CHANGE_CLOSES=$((NO_CHANGE_CLOSES + 1))
  fi
}

# Print final summary
print_summary() {
  echo ""
  echo "========================================"
  log_info "Performance Evaluation Summary"
  echo "========================================"
  echo "Total PRs Evaluated: ${TOTAL_PRS}"
  echo "  ✓ Merged: ${MERGED_COUNT}"
  echo "  ✗ Closed (Regressions): ${REGRESSION_CLOSES}"
  echo "  ✗ Closed (No Change): ${NO_CHANGE_CLOSES}"
  echo "  ⊘ Skipped (Conflicts): ${CONFLICT_SKIPS}"
  echo "  ⊘ Skipped (Errors): ${ERROR_SKIPS}"
  echo "========================================"
}

# Main execution
main() {
  echo "========================================"
  echo "Automated Performance PR Evaluation"
  echo "========================================"

  if [ "${DRY_RUN}" == "true" ]; then
    log_warn "Running in DRY RUN mode - no destructive actions will be taken"
  fi

  # Run pre-flight checks
  preflight_checks

  # Build bench-compare
  build_bench_compare

  # Discover performance PRs
  local pr_queue
  pr_queue=$(discover_prs)

  if [ -z "${pr_queue}" ]; then
    log_info "No performance-related PRs to evaluate"
    exit 0
  fi

  local pr_count
  pr_count=$(echo "${pr_queue}" | wc -l)
  log_success "Found ${pr_count} performance PRs to evaluate"

  # Process each PR
  while read -r pr_number; do
    TOTAL_PRS=$((TOTAL_PRS + 1))

    if evaluate_pr "${pr_number}"; then
      log_success "Completed evaluation of PR #${pr_number}"
    else
      if git status 2>/dev/null | grep -q "rebase in progress"; then
        CONFLICT_SKIPS=$((CONFLICT_SKIPS + 1))
      else
        ERROR_SKIPS=$((ERROR_SKIPS + 1))
      fi
      log_warn "Skipped PR #${pr_number}"
    fi
  done <<< "${pr_queue}"

  # Print final summary
  print_summary
}

# Run main function
main "$@"
