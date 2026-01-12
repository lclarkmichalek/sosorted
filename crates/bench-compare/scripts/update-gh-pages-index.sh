#!/usr/bin/env bash
#
# Update the gh-pages index.json with a new benchmark report entry
#
# Usage: update-gh-pages-index.sh <report-json-path> <report-id> [pr-number] [title]
#
# Example:
#   update-gh-pages-index.sh benchmark-report.json pr-123 123 "Add new feature"

set -euo pipefail

if [ $# -lt 2 ]; then
    echo "Usage: $0 <report-json-path> <report-id> [pr-number] [title]"
    echo "Example: $0 benchmark-report.json pr-123 123 'Add new feature'"
    exit 1
fi

REPORT_PATH="$1"
REPORT_ID="$2"
PR_NUMBER="${3:-}"
TITLE="${4:-}"

# Check if jq is available
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required but not installed"
    echo "Install with: apt-get install jq (or brew install jq on macOS)"
    exit 1
fi

# Check if report file exists
if [ ! -f "$REPORT_PATH" ]; then
    echo "Error: Report file not found: $REPORT_PATH"
    exit 1
fi

# Extract metadata from the report
BASELINE_REF=$(jq -r '.metadata.baseline_ref' "$REPORT_PATH")
TEST_REF=$(jq -r '.metadata.test_ref' "$REPORT_PATH")
TIMESTAMP=$(jq -r '.metadata.timestamp' "$REPORT_PATH")
REGRESSIONS=$(jq -r '.summary.regressions' "$REPORT_PATH")
IMPROVEMENTS=$(jq -r '.summary.improvements' "$REPORT_PATH")
UNCHANGED=$(jq -r '.summary.unchanged' "$REPORT_PATH")
TOTAL=$(jq -r '.summary.total' "$REPORT_PATH")

# Build the new entry
NEW_ENTRY=$(jq -n \
    --arg id "$REPORT_ID" \
    --arg pr "$PR_NUMBER" \
    --arg title "$TITLE" \
    --arg baseline "$BASELINE_REF" \
    --arg test "$TEST_REF" \
    --arg timestamp "$TIMESTAMP" \
    --argjson regressions "$REGRESSIONS" \
    --argjson improvements "$IMPROVEMENTS" \
    --argjson unchanged "$UNCHANGED" \
    --argjson total "$TOTAL" \
    '{
        id: $id,
        pr_number: (if $pr != "" then ($pr | tonumber) else null end),
        title: (if $title != "" then $title else null end),
        baseline_ref: $baseline,
        test_ref: $test,
        timestamp: $timestamp,
        summary: {
            total: $total,
            regressions: $regressions,
            improvements: $improvements,
            unchanged: $unchanged
        }
    }')

# Default index file location (can be overridden with INDEX_FILE env var)
INDEX_FILE="${INDEX_FILE:-./index.json}"

# Create index file if it doesn't exist
if [ ! -f "$INDEX_FILE" ]; then
    echo '{"reports":[]}' > "$INDEX_FILE"
fi

# Read existing index, remove old entry with same ID if exists, add new entry, and sort by timestamp
jq --argjson new_entry "$NEW_ENTRY" \
    '.reports |= (map(select(.id != $new_entry.id)) + [$new_entry] | sort_by(.timestamp) | reverse)' \
    "$INDEX_FILE" > "$INDEX_FILE.tmp"

mv "$INDEX_FILE.tmp" "$INDEX_FILE"

echo "✓ Updated $INDEX_FILE with report: $REPORT_ID"
echo "  Baseline: $BASELINE_REF"
echo "  Test: $TEST_REF"
echo "  Summary: $REGRESSIONS regressions, $IMPROVEMENTS improvements, $UNCHANGED unchanged"
