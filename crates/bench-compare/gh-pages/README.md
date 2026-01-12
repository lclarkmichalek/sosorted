# Benchmark Reports - GitHub Pages Integration

This directory contains the React-based frontend for viewing benchmark comparison reports on GitHub Pages.

## Overview

The GitHub Pages integration provides a scalable, interactive way to view benchmark results:

- **Individual PR Reports**: View detailed reports at `https://[owner].github.io/[repo]/reports/#/pr-123`
- **Index Page**: Browse all reports at `https://[owner].github.io/[repo]/reports/`
- **Persistent History**: Reports are stored in the `gh-pages` branch and remain accessible over time
- **No Build Step**: Uses CDN-based React for zero-configuration deployment

## Architecture

### Frontend (React App)

The `reports/index.html` file contains a single-page React application that:

- Fetches JSON reports from the same directory
- Provides hash-based routing for individual PR views
- Displays an index of all available reports
- Uses the same dark theme styling as the standalone HTML reports

### Data Storage

Reports are stored in the `gh-pages` branch under the `reports/` directory:

```
reports/
├── index.html          # React app
├── index.json          # Index of all reports
├── pr-123.json         # Report for PR #123
├── pr-456.json         # Report for PR #456
└── ...
```

### Index Format

The `index.json` file maintains a list of all available reports:

```json
{
  "reports": [
    {
      "id": "pr-123",
      "pr_number": 123,
      "title": "Add new feature",
      "baseline_ref": "main",
      "test_ref": "feature-branch",
      "timestamp": "2026-01-12T10:30:00Z",
      "summary": {
        "total": 15,
        "regressions": 0,
        "improvements": 2,
        "unchanged": 13
      }
    }
  ]
}
```

## Concurrent PR Handling

The system is designed to handle multiple PRs running benchmarks simultaneously:

### How Conflicts Are Prevented

1. **Workflow Concurrency Control**: The CI workflow uses GitHub Actions' concurrency feature to serialize `gh-pages` updates:
   ```yaml
   concurrency:
     group: gh-pages-deploy
     cancel-in-progress: false
   ```
   This ensures only one job updates `gh-pages` at a time, with others queuing.

2. **Unique Report Files**: Each PR writes to a unique file (`pr-123.json`), so there are no file-level conflicts.

3. **Shared Index**: The `index.json` file is shared and causes the need for serialization. Without it, concurrent updates would fail.

4. **Retry Logic**: As a safety net, the deployment script includes retry logic (up to 3 attempts with 5-second delays).

### What Users See

- **No delays in benchmark execution**: PRs run benchmarks in parallel
- **Sequential deployment**: gh-pages updates happen one at a time (usually takes <10 seconds)
- **Transparent queuing**: GitHub Actions automatically queues jobs
- **High reliability**: Retries handle transient failures

## CI Integration

The benchmark workflow automatically:

1. Runs benchmark comparison on every PR
2. Generates JSON report with metadata
3. Deploys report to `gh-pages` branch
4. Updates `index.json` with new entry
5. Posts PR comment with link to interactive report

### Workflow Steps

See `.github/workflows/benchmark.yml` for the complete CI integration. Key steps:

1. **Generate JSON Report**:
   ```bash
   ./target/release/bench-compare \
     --baseline $BASE_SHA \
     --test $HEAD_SHA \
     --output json > benchmark-report.json
   ```

2. **Deploy to gh-pages**:
   - Checkout `gh-pages` branch (create if doesn't exist)
   - Copy React app to `reports/` directory
   - Copy JSON report as `reports/pr-{number}.json`
   - Update `reports/index.json` using helper script
   - Commit and push changes

3. **Update PR Comment**:
   - Post interactive report link
   - Include summary of regressions/improvements

## Manual Deployment

To manually add a report to GitHub Pages:

1. Generate a JSON report:
   ```bash
   bench-compare \
     --baseline main \
     --test feature \
     --output json > report.json
   ```

2. Checkout the `gh-pages` branch:
   ```bash
   git checkout gh-pages
   ```

3. Add the report:
   ```bash
   cp report.json reports/pr-999.json
   ```

4. Update the index:
   ```bash
   INDEX_FILE=reports/index.json \
     crates/bench-compare/scripts/update-gh-pages-index.sh \
     reports/pr-999.json \
     pr-999 \
     999 \
     "Optional PR title"
   ```

5. Commit and push:
   ```bash
   git add reports/
   git commit -m "Add benchmark report for PR #999"
   git push origin gh-pages
   ```

## Enabling GitHub Pages

To enable GitHub Pages for your repository:

1. Go to repository Settings → Pages
2. Set source to "Deploy from a branch"
3. Select `gh-pages` branch and `/` (root) directory
4. Save

GitHub will automatically deploy the site at `https://[owner].github.io/[repo]/`

## Features

### Interactive Report View

- Dark theme matching GitHub's aesthetic
- Summary cards showing regression/improvement counts
- Detailed tables with timing data and statistical analysis
- Sortable and filterable results (via browser search)
- Mobile-responsive design

### Index Page

- List of all PR reports with status indicators
- Quick summary (regressions/improvements count)
- Sortable by timestamp (newest first)
- Direct links to detailed reports

### Hash-based Routing

- `#/` - Index page showing all reports
- `#/pr-123` - Individual report for PR #123
- Direct URLs are shareable and bookmarkable

## Customization

### Styling

The React app uses CSS variables for theming. To customize colors, edit the `:root` section in `reports/index.html`:

```css
:root {
    --bg-primary: #0d1117;
    --accent-blue: #58a6ff;
    /* ... */
}
```

### Report ID Format

By default, reports use the format `pr-{number}`. To use a different format, modify the `REPORT_ID` variable in the CI workflow:

```yaml
REPORT_ID="custom-${GITHUB_SHA::7}"
```

## Troubleshooting

### Reports not appearing

- Check that GitHub Pages is enabled
- Verify `gh-pages` branch exists and contains `reports/` directory
- Check browser console for CORS or loading errors

### Index not updating

- Verify `index.json` is properly formatted JSON
- Check that `update-gh-pages-index.sh` script has execute permissions
- Review CI logs for errors during index update

### Report shows "Failed to load"

- Verify JSON report file exists at the expected path
- Check that JSON is valid (test with `jq . report.json`)
- Ensure report follows the expected schema (metadata, comparisons, summary)

## Development

To test the React app locally:

1. Start a local web server in the `reports/` directory:
   ```bash
   python3 -m http.server 8000
   ```

2. Open `http://localhost:8000/` in your browser

3. Add sample reports as JSON files in the same directory

4. Update `index.json` to reference your test reports

## Security

- All reports are public once deployed to GitHub Pages
- Sensitive data should never be included in benchmark reports
- The React app runs entirely in the browser (no server-side processing)
- JSON reports are served as static files (no API endpoints)
