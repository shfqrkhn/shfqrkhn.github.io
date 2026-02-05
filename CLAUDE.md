# CLAUDE.md - AI Assistant Guide

This document provides comprehensive guidance for AI assistants working with this codebase.

## Project Overview

**Name:** Personal Portfolio Website
**Version:** v1.2.13
**Type:** Static single-page application
**Hosting:** GitHub Pages at https://shfqrkhn.github.io/

This is a dynamic portfolio website that automatically displays GitHub repositories using the GitHub API. It requires no backend or database - just static files served via GitHub Pages.

## Directory Structure

```
shfqrkhn.github.io/
├── index.html          # Main application (HTML + JavaScript)
├── styles.css          # Compiled Tailwind CSS (production build)
├── src/
│   └── input.css       # Tailwind source CSS
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
├── README.md           # User-facing documentation
├── PARETO_ANALYSIS.md  # Optimization history and decisions
├── .jules/
│   └── steward.md      # Design protocols and conventions
├── .gitignore          # Git ignore rules
└── LICENSE             # MIT License
```

## Technology Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| HTML5 | Page structure | - |
| Vanilla JavaScript | GitHub API integration, dynamic rendering | ES6+ |
| Tailwind CSS | Styling framework | 3.4.1 |
| GitHub API | Data source for repositories | v3 (REST) |
| GitHub Pages | Static hosting | - |

## Development Workflows

### Prerequisites
```bash
npm install
```

### Build CSS
The project uses a static Tailwind CSS build for production performance:
```bash
npm run build
```
This compiles `src/input.css` to `styles.css` with minification.

### Local Development
Open `index.html` directly in a browser. No development server required.

### Deployment
Push to `main` branch - GitHub Pages automatically deploys.

## Key Conventions

### Security Practices (Sentinel Mode)
- **XSS Prevention:** All dynamic content uses `escapeHTML()` function (index.html:110-113)
- **URL Validation:** External URLs validated with `safeURL()` (index.html:120-125)
- **Log Sanitization:** Error logs output `error.message` only, not full stack traces
- **CORS:** Preconnect to `api.github.com` includes `crossorigin` attribute

### Performance Optimizations (Bolt Mode)
- **Cache-First Strategy:** API responses cached in localStorage for 24 hours
- **Cache Versioning:** Increment `CACHE_VERSION` when data structure changes (currently `v4`)
- **Parallel Fetching:** Profile and repositories fetched simultaneously
- **Minified Caching:** Only essential fields stored to reduce localStorage footprint
- **Avatar Optimization:** Request 256px images for Retina displays

### Accessibility (Palette Mode)
- **WCAG AA Compliance:** Text on dark backgrounds uses `text-slate-400` or lighter
- **ARIA Labels:** Loading indicators have `role="status"`
- **System Fonts:** Uses system font stack for reliability and performance

### Code Style
- **Constants:** SCREAMING_SNAKE_CASE for configuration values
- **Functions:** camelCase with descriptive names
- **HTML Escaping:** Always escape user-generated content
- **URL Handling:** Always validate external URLs before use

## Architecture Patterns

### Caching System (index.html:198-228)
```javascript
const CACHE_KEY = `githubData_${USERNAME}`;
const CACHE_VERSION = 'v4';  // Increment on schema changes
const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000;  // 24 hours
```
- Checks cache validity before API calls
- Falls back to stale cache on network errors
- Stores minified data with version tag

### Language Color Mapping (index.html:135-148)
Uses a `Map` for O(1) lookup of language colors:
```javascript
const LANGUAGE_COLORS = new Map([
    ['JavaScript', 'bg-yellow-400'],
    ['Python', 'bg-blue-400'],
    // ... reduced to common languages only
]);
```

### Repository Filtering (index.html:172)
- Excludes forked repositories
- Sorts by star count (descending)

## Important Guidelines for AI Assistants

### DO
- Run `npm run build` after modifying `src/input.css`
- Update `CACHE_VERSION` when changing cached data structure
- Use `escapeHTML()` for any dynamic text content
- Use `safeURL()` for any external URLs
- Follow existing code patterns and naming conventions
- Keep the codebase minimal (Via Negativa principle)
- Update version in `package.json`, `README.md`, and `index.html` footer when releasing

### DON'T
- Add external dependencies without justification
- Add Google Fonts or other external font services (performance decision)
- Display fork counts (removed by design)
- Log full error objects (use `error.message` only)
- Use `text-slate-500` on dark backgrounds (accessibility violation)
- Add build steps beyond the existing Tailwind compilation

### Version Bumping Locations
When releasing a new version, update:
1. `package.json` line 3: `"version": "x.x.x"`
2. `README.md` line 3: `**Version:** vx.x.x`
3. `index.html` line 89: `<span class="opacity-50">vx.x.x</span>`

## Referenced Documentation

- **Steward Protocols:** `.jules/steward.md` - Design decisions and conventions
- **Optimization History:** `PARETO_ANALYSIS.md` - Pareto analysis and implemented improvements

## API Rate Limits

GitHub API (unauthenticated):
- 60 requests per hour per IP
- Mitigated by 24-hour caching strategy
- Pagination limited to 5 pages (500 repos max)

## Quick Reference

| Task | Command/Location |
|------|------------------|
| Build CSS | `npm run build` |
| Main app code | `index.html` |
| Tailwind source | `src/input.css` |
| Cache version | `index.html:200` |
| GitHub username | `index.html:94` |
