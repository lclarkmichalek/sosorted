# GitHub Pages Setup Guide

This guide walks you through enabling the new GitHub Pages integration for benchmark reports.

## What Was Implemented

The benchmark reporting system has been transformed into a scalable GitHub Pages solution:

### 1. Enhanced JSON Output Format
- Added metadata section with baseline/test refs, timestamp, and test parameters
- Added summary statistics (total, regressions, improvements, unchanged counts)
- Reports are now self-contained with all necessary context

### 2. React-Based Report Viewer
- Single-file React app using CDN dependencies (no build step!)
- Hash-based routing for individual PR reports: `#/pr-123`
- Index page listing all available reports: `#/`
- Same dark theme as the standalone HTML reports
- Mobile-responsive design

### 3. Automated CI Integration
- Generates JSON reports on every PR
- Uploads reports to `gh-pages` branch
- Maintains an index of all reports
- Updates PR comments with direct links to interactive reports

### 4. Index Management
- `index.json` tracks all available reports
- Helper script (`update-gh-pages-index.sh`) for adding new reports
- Automatically sorts reports by timestamp (newest first)

## Quick Start

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under "Source", select:
   - **Branch**: `gh-pages`
   - **Directory**: `/` (root)
4. Click **Save**

GitHub will deploy your site to `https://[username].github.io/sosorted/`

### Step 2: Initialize gh-pages Branch

The CI workflow will automatically create and populate the `gh-pages` branch on the next PR. However, you can also initialize it manually:

```bash
# Create and checkout gh-pages branch
git checkout --orphan gh-pages
git rm -rf .

# Copy the GitHub Pages files
git checkout main -- crates/bench-compare/gh-pages/
mv crates/bench-compare/gh-pages/* .
rm -rf crates

# Commit and push
git add .
git commit -m "Initialize GitHub Pages with benchmark reports viewer"
git push origin gh-pages

# Return to main branch
git checkout main
```

### Step 3: Create a Test PR

1. Create a new branch and make a code change
2. Open a PR against main
3. Wait for the benchmark workflow to complete
4. Check the PR comment for the GitHub Pages link

## What You'll See

### In PR Comments

```markdown
## Statistical Benchmark Comparison

✅ **No regressions detected.**

📊 **[View Interactive Report](https://lclarkmichalek.github.io/sosorted/reports/#/pr-123)**

📥 **[Download HTML Report](...)**
```

### On GitHub Pages

- **Index Page** (`/reports/`): List of all PR reports with status indicators
- **PR Report** (`/reports/#/pr-123`): Detailed interactive report for PR #123
- **Root** (`/`): Redirects to `/reports/`

## File Structure

Once deployed, your `gh-pages` branch will have this structure:

```
gh-pages/
├── index.html                 # Redirect to /reports/
└── reports/
    ├── index.html             # React app
    ├── index.json             # Index of all reports
    ├── pr-123.json            # Report for PR #123
    ├── pr-456.json            # Report for PR #456
    └── ...
```

## CI Workflow Changes

The `.github/workflows/benchmark.yml` now:

1. Generates both HTML and JSON reports
2. Checks out the `gh-pages` branch
3. Deploys the React app (if not already present)
4. Copies the JSON report as `pr-{number}.json`
5. Updates `index.json` with the new report
6. Commits and pushes to `gh-pages`
7. Posts PR comment with GitHub Pages link

### Concurrent PR Handling

The workflow includes **concurrency controls** to handle multiple PRs running simultaneously:

**Workflow-level serialization**:
```yaml
concurrency:
  group: gh-pages-deploy
  cancel-in-progress: false
```

This ensures only one job updates `gh-pages` at a time. Other jobs wait in a queue.

**Retry mechanism**:
- If a push fails (rare edge case), the workflow retries up to 3 times
- Fetches latest `gh-pages` state on each retry
- 5-second delay between retries

**Why this matters**:
- Individual report files (`pr-123.json`) never conflict (unique per PR)
- But `index.json` is shared and updated by every PR
- Without serialization, concurrent updates would cause push failures

## Manual Report Upload

To manually add a report (e.g., for testing):

```bash
# Generate JSON report
cargo run -p bench-compare --release -- \
  --baseline main \
  --test feature-branch \
  --output json > report.json

# Checkout gh-pages branch
git checkout gh-pages

# Add the report
cp report.json reports/pr-999.json

# Update index
INDEX_FILE=reports/index.json \
  crates/bench-compare/scripts/update-gh-pages-index.sh \
  reports/pr-999.json \
  pr-999 \
  999 \
  "Test PR title"

# Commit and push
git add reports/
git commit -m "Add benchmark report for PR #999"
git push origin gh-pages
```

## Customization

### Changing Report URL Format

By default, reports use `pr-{number}` as the ID. To change this, edit the workflow:

```yaml
# In .github/workflows/benchmark.yml
REPORT_ID="pr-${{ github.event.pull_request.number }}"  # Change this
```

### Styling the React App

Colors and styling can be customized by editing the CSS variables in `reports/index.html`:

```css
:root {
    --bg-primary: #0d1117;
    --accent-blue: #58a6ff;
    /* ... */
}
```

### Repository-Specific Configuration

Update the workflow URLs if your repository name differs:

```yaml
# In .github/workflows/benchmark.yml
https://${{ github.repository_owner }}.github.io/${{ github.event.repository.name }}/reports/
```

## Testing Locally

To test the React app locally before deploying:

```bash
cd crates/bench-compare/gh-pages/reports/

# Start a local web server
python3 -m http.server 8000

# Open http://localhost:8000/ in your browser
```

Create test JSON files in the same directory and update `index.json` to reference them.

## Troubleshooting

### Reports Not Showing Up

1. Check that GitHub Pages is enabled in repository settings
2. Verify `gh-pages` branch exists and has content
3. Wait a few minutes for GitHub Pages to deploy changes
4. Check the Actions tab for deployment status

### CI Workflow Failing

1. Check that the workflow has `contents: write` permission
2. Verify `gh-pages` branch is not protected
3. Check workflow logs for specific errors
4. Ensure `jq` is available (installed by the workflow)

### Index Not Updating

1. Verify `index.json` is valid JSON: `jq . reports/index.json`
2. Check that the update script has execute permissions
3. Review CI logs for script errors

### 404 Errors on Report Pages

1. Verify JSON files exist in `reports/` directory
2. Check that report IDs in `index.json` match filenames (without `.json`)
3. Clear browser cache and reload

## Benefits of This Approach

1. **Scalable**: No size limits, unlimited report history
2. **Fast**: Static files served by GitHub's CDN
3. **Simple**: No build step, no server required
4. **Shareable**: Direct URLs for any report
5. **Accessible**: Available to anyone with repo access
6. **Persistent**: Reports never expire (unlike artifacts)
7. **Free**: Uses GitHub Pages free tier

## Next Steps

After enabling GitHub Pages:

1. Create a test PR to verify the system works
2. Share the GitHub Pages URL with your team
3. Consider adding the URL to your repository description
4. Update any documentation to reference the new reports

## Security Notes

- All reports published to GitHub Pages are **publicly accessible**
- Never include sensitive data in benchmark reports
- The React app runs entirely client-side (no server processing)
- JSON reports are served as static files

## Support

For issues or questions about the GitHub Pages integration:

1. Check this guide and the main README
2. Review the `gh-pages/README.md` for detailed documentation
3. Check the example reports at your GitHub Pages URL
4. Open an issue if you encounter bugs

## Example URLs

Replace `[owner]` with your GitHub username/org and `[repo]` with your repository name:

- **Index**: `https://[owner].github.io/[repo]/reports/`
- **PR Report**: `https://[owner].github.io/[repo]/reports/#/pr-123`
- **Root**: `https://[owner].github.io/[repo]/` (redirects to reports)

For this repository (sosorted):
- **Index**: `https://lclarkmichalek.github.io/sosorted/reports/`
- **PR Report**: `https://lclarkmichalek.github.io/sosorted/reports/#/pr-123`
