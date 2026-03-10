# CODEBASE.md

## Scope
- **Apparent purpose:** Dynamic, single-page portfolio website that automatically fetches and displays public GitHub repositories for a specified user.
- **Stack/languages/frameworks:** HTML5, Vanilla JavaScript (ES6+), Tailwind CSS (static build via npm).
- **Entry points:** `index.html` (UI) and `script.js` (logic).
- **Build/run/test systems:** npm script `build` runs Tailwind CLI (`tailwindcss -i ./src/input.css -o ./styles.css --minify`). No test framework configured.
- **Architectural style:** Static Single-Page Application (SPA) with client-side API fetching and aggressive `localStorage` caching.
- **Major operational invariants:**
  - Zero backend dependencies; relies entirely on GitHub REST API v3.
  - Strict Content Security Policy (CSP) forbidding inline scripts/styles.
  - All dynamic data rendered to DOM must be escaped (`escapeHTML`).
  - Graceful degradation to cached data on network failure.

## Repository Map
```text
shfqrkhn.github.io/
├── index.html
├── script.js
├── package.json
├── tailwind.config.js
├── src/
│   └── input.css
├── README.md
├── CLAUDE.md
├── PARETO_ANALYSIS.md
├── .jules/
│   └── steward.md
└── LICENSE
```

## Authoritative Review Summary
- **Core flows:** Page load triggers `fetchGitHubData()`. It checks `localStorage` for valid cache (<24h). If miss/stale, it fetches user profile and paginated repositories in parallel, processes data (filters forks, sorts by stars, formats dates), updates DOM, and updates cache.
- **Important interfaces:** `renderProfile(user)`, `renderRepos(repos)`, `processRepositories(rawRepos)`.
- **Key configs:** CSP in `index.html`, GitHub username in `<meta name="github-username">`, `CACHE_VERSION` in `script.js`.
- **Major invariants:** Cache invalidation tied to `CACHE_VERSION`. API pagination limited to 5 pages (500 repos max). All DOM updates must avoid XSS.
- **Principal risks:** GitHub API rate limiting (mitigated by caching). XSS vulnerabilities if `escapeHTML` is bypassed. Unhandled promise rejections in parallel fetches (addressed via dummy catch handlers). LocalStorage bloat (addressed by active purging of old keys).

## File Inventory
| Path | Role | Priority | Inclusion | Reason |
|---|---|---|---|---|
| `README.md` | Documentation | Context | Summary | Provides project overview, tech stack, and goals. |
| `CLAUDE.md` | AI Guide | Important | Summary | Defines project constraints, architecture patterns, and operational rules. |
| `index.html` | Entry Point / UI Layout | Critical | Full | Main application structure, security policies, and asset wiring. |
| `script.js` | Core Logic | Critical | Full | Handles API fetching, caching, DOM manipulation, and security sanitization. |
| `package.json` | Dependency Manifest | Important | Full | Defines build scripts and core dependencies. |
| `tailwind.config.js` | CSS Configuration | Important | Full | Defines Tailwind content sources. |
| `src/input.css` | CSS Base | Context | Full | Base Tailwind imports and minimal global styles. |
| `.jules/steward.md` | Design Ledger | Important | Summary | Historical record of architectural decisions and constraints. |
| `PARETO_ANALYSIS.md` | Optimization Ledger | Context | Summary | Analysis of past optimizations and performance decisions. |
| `LICENSE` | Legal | Context | Summary | Defines terms of use. |
| `styles.css` | Generated CSS | Context | Excluded | Compiled build artifact. |
| `package-lock.json` | Dependency Lock | Context | Excluded | Verbose lockfile, redundant for core review. |
| `.gitignore` | Git Config | Context | Excluded | Standard boilerplate. |

## Embedded Critical Files

### `index.html`
- **Role:** Entry Point / UI Layout
- **Why it matters:** Main application structure, security policies, and asset wiring.
- **Inclusion mode:** Full
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shafiqur Khan - Software Developer | GitHub Projects & Portfolio</title>
    <meta name="description" content="Explore Shafiqur Khan's GitHub projects and portfolio. Showcasing work in JavaScript, Python, and more.">
    <meta name="theme-color" content="#0f172a">
    <!-- Sentinel: Configuration for script.js -->
    <meta name="github-username" content="shfqrkhn">

    <!-- Content Security Policy -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self' https://avatars.githubusercontent.com data:; connect-src https://api.github.com; font-src 'none'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none';">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://shfqrkhn.github.io/">
    <meta property="og:title" content="Shafiqur Khan | Projects">
    <meta property="og:description" content="Explore Shafiqur Khan's GitHub projects and portfolio. Showcasing work in JavaScript, Python, and more.">

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Shafiqur Khan | Projects">
    <meta name="twitter:description" content="Explore Shafiqur Khan's GitHub projects and portfolio. Showcasing work in JavaScript, Python, and more.">
    <meta name="twitter:image" content="https://github.com/shfqrkhn.png">
    <meta property="og:image" content="https://github.com/shfqrkhn.png">

    <!-- Favicon -->
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💻</text></svg>">

    <!-- Preconnect for performance -->
    <link rel="preconnect" href="https://api.github.com" crossorigin>
    <link rel="preconnect" href="https://avatars.githubusercontent.com">

    <!-- Tailwind CSS (Static Build) -->
    <!-- Optimized: Replaced Play CDN with static build for performance -->
    <link rel="stylesheet" href="styles.css?v=1.2.40">

    <!-- Sentinel: External script with 'defer' to support strict CSP -->
    <script src="script.js?v=1.2.40" defer></script>
</head>
<body class="bg-slate-900 font-sans text-slate-300 print:!bg-white print:!text-black">

    <!-- Main Container -->
    <main class="max-w-4xl mx-auto p-4 sm:p-8">

        <!-- Header Section -->
        <header id="user-profile" tabindex="-1" class="outline-none flex flex-col items-center text-center mb-12 opacity-0 transition-opacity duration-500 motion-reduce:transition-none">
            <!-- Profile content will be injected here by JavaScript -->
        </header>

        <!-- Projects Section -->
        <section>
            <h2 class="text-3xl font-bold text-white text-center mb-8 print:!text-black">My Projects</h2>
            <!-- Loading Spinner -->
            <div id="loader" role="status" tabindex="-1" class="outline-none flex flex-col justify-center items-center h-32 gap-4">
                <div class="animate-spin rounded-full border-4 border-slate-700 border-t-sky-400 h-10 w-10 motion-reduce:animate-none"></div>
                <p class="text-slate-400 text-sm">Loading projects...</p>
            </div>
            <!-- Projects Grid -->
            <div id="repos-grid" class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Repository cards will be injected here by JavaScript -->
            </div>
             <!-- Error Message -->
            <div id="error-message" role="alert" tabindex="-1" class="text-center text-red-400 mt-8 hidden outline-none"></div>
        </section>

    </main>

    <!-- Footer -->
    <footer class="text-center p-4 mt-8 text-xs text-slate-400 print:!text-black">
        <p>This page was generated based on public data from GitHub. <span>v1.2.40</span></p>
    </footer>

    <!-- Back to Top Button -->
    <button id="back-to-top" aria-label="Back to top" tabindex="-1" class="fixed bottom-8 right-8 p-3 bg-slate-700 text-white rounded-full shadow-lg hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-opacity duration-300 opacity-0 pointer-events-none z-50 motion-reduce:transition-none touch-manipulation print:!hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
        </svg>
    </button>

</body>
</html>

```

### `script.js`
- **Role:** Core Logic
- **Why it matters:** Handles API fetching, caching, DOM manipulation, and security sanitization.
- **Inclusion mode:** Full
```javascript
// GitHub username
const USERNAME = document.querySelector('meta[name="github-username"]').content;

// HTML Character Escapes
const HTML_ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
};

const ESCAPE_REGEX = /[&<>'"]/g;
const ESCAPE_CALLBACK = tag => HTML_ESCAPES[tag];

// Helper to prevent XSS
// Performance: Reuses callback function to avoid allocation on every call
const escapeHTML = (str) => {
    if (!str) return '';
    return str.replace(ESCAPE_REGEX, ESCAPE_CALLBACK);
};

const SAFE_URL_PATTERN = /^https?:\/\//i;

// Helper to validate URLs (Sentinel Mode)
// Performance: Uses Regex check instead of new URL() to avoid expensive object creation (~150x faster)
// Optimization: Uses cached Regex pattern to avoid reallocation
const safeURL = (str) => {
    if (str && SAFE_URL_PATTERN.test(str)) {
        return str;
    }
    return '#';
};

// Elements
const profileElement = document.getElementById('user-profile');
const reposGrid = document.getElementById('repos-grid');
const loader = document.getElementById('loader');
const errorMessage = document.getElementById('error-message');

// Language color mapping
// Optimized: Reduced to common languages to save bytes (Via Negativa)
const LANGUAGE_COLORS = {
    'JavaScript': 'bg-yellow-400',
    'Python': 'bg-blue-400',
    'HTML': 'bg-orange-500',
    'CSS': 'bg-blue-500',
    'TypeScript': 'bg-blue-400',
    'Shell': 'bg-green-300',
    'default': 'bg-slate-500',
};

// Function to get a color based on the programming language
const getLanguageColor = (language) => {
    return LANGUAGE_COLORS[language] || LANGUAGE_COLORS.default;
};

// Render user profile to the DOM
const renderProfile = (user) => {
    // Sentinel: Validate avatar URL before processing
    let avatarSrc = '#'; // Secure fallback
    try {
        if (user.avatar_url && SAFE_URL_PATTERN.test(user.avatar_url)) {
            // Optimize avatar image size: Request 256px (2x for Retina) to save bandwidth
            const url = new URL(user.avatar_url);
            url.searchParams.set('s', '256');
            avatarSrc = url.toString();
        }
    } catch (e) {
        console.warn('Invalid avatar URL:', e.message);
    }

    const name = user.name || user.login;
    document.title = `${name} | GitHub Projects`;

    profileElement.innerHTML = `
        <img src="${avatarSrc}" alt="${escapeHTML(name)}'s GitHub profile photo" width="128" height="128" fetchpriority="high" class="w-32 h-32 rounded-full mb-4 border-4 border-slate-700 shadow-lg">
        <h1 class="text-4xl font-bold text-white print:!text-black">${escapeHTML(name)}</h1>
        <p class="mt-2 max-w-md text-slate-400 print:!text-black">${escapeHTML(user.bio || '')}</p>
        <div class="mt-4">
            <a href="${safeURL(user.html_url)}" target="_blank" rel="noopener noreferrer" class="text-sky-400 hover:text-sky-300 transition-colors motion-reduce:transition-none touch-manipulation focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm print:!text-blue-700">
                View GitHub Profile
            </a>
        </div>
    `;
    profileElement.classList.remove('opacity-0');
};

// Render repositories to the DOM
const renderRepos = (repos) => {
    if (repos.length > 0) {
        reposGrid.innerHTML = repos.map(repo => `
            <a href="${safeURL(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="project-card block p-6 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:transform-none touch-manipulation focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 print:!bg-white print:!border-gray-300 print:!shadow-none">
                <h3 class="text-xl font-bold text-white print:!text-black">${escapeHTML(repo.name)}</h3>
                <p class="mt-2 text-sm text-slate-400 h-10 line-clamp-2 overflow-hidden print:!text-gray-700">${escapeHTML(repo.description || 'No description provided.')}</p>
                <div class="mt-4 flex items-center justify-between text-xs text-slate-400 print:!text-gray-500">
                    <div class="flex items-center gap-2">
                        ${repo.language ? `<span class="flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full ${repo.languageColor} print:!ring-1 print:!ring-gray-300" aria-hidden="true"></span>
                            ${escapeHTML(repo.language)}
                        </span>` : ''}
                    </div>
                    <div class="flex items-center gap-4">
                        <span><span aria-label="Stars">⭐</span> ${repo.stargazers_count}</span>
                        <span>${repo.pushed_at}</span>
                    </div>
                </div>
            </a>
        `).join('');
    } else {
            reposGrid.innerHTML = '<p class="text-center col-span-full">No public repositories found.</p>';
    }
};

// Helper to process repositories (Filter, Sort, Map)
// Optimization: Process data ONCE before caching/rendering to save CPU cycles on subsequent loads
const processRepositories = (rawRepos) => {
    // Optimization: Instantiate formatter once to avoid object creation for every repo
    const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

    return rawRepos
        .filter(repo => !repo.fork) // Filter out forks (Via Negativa)
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)) // Sort by stars
        .map(repo => {
            // Sentinel: Guard against invalid dates to prevent Intl.DateTimeFormat crash
            const timestamp = Date.parse(repo.pushed_at);
            const formattedDate = !isNaN(timestamp) ? dateFormatter.format(timestamp) : 'Unknown';

            return { // Minify schema
                name: repo.name,
                html_url: repo.html_url,
                description: repo.description,
                language: repo.language,
                languageColor: getLanguageColor(repo.language), // Pre-calculate color (Bolt Mode)
                stargazers_count: Number(repo.stargazers_count) || 0,
                // Optimization: Format date once to save parsing on every render
                pushed_at: formattedDate
            };
        });
};

// Fetch user profile and repositories from GitHub API
const fetchGitHubData = async (isRetry = false) => {
    const CACHE_KEY = `githubData_${USERNAME}`;
    const CACHE_VERSION = 'v9'; // Increment when data structure changes
    const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

    // Bolt Mode: Entropy elimination - purge any stale githubData caches from other usernames
    try {
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('githubData_') && key !== CACHE_KEY) {
                keysToRemove.push(key);
            }
        }
        keysToRemove.forEach(k => localStorage.removeItem(k));
    } catch (e) {
        // Ignore localStorage access errors
    }

    // Helper to retrieve and parse cache
    const getCachedData = () => {
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            const data = JSON.parse(raw);

            // Bolt Mode: Clean up invalid/stale cache to prevent local storage bloat over time
            if (data.version !== CACHE_VERSION) {
                localStorage.removeItem(CACHE_KEY);
                return null;
            }
            return data;
        } catch (e) {
            localStorage.removeItem(CACHE_KEY);
            return null;
        }
    };

    const cached = getCachedData();

    try {
        // Check for valid cache first
        if (cached) {
            const now = Date.now();
            // If cache is valid (less than 24 hours old), use it
            if (now - cached.timestamp < CACHE_EXPIRATION_MS) {
                renderProfile(cached.user);
                renderRepos(cached.repos);
                loader.classList.add('hidden');
                if (isRetry) {
                    profileElement.focus({ preventScroll: true });
                }
                return;
            }
        }

        // Reset UI State for Retry (fetch mode)
        loader.classList.remove('hidden');
        if (isRetry) {
            loader.focus();
        }
        errorMessage.classList.add('hidden');

        // Initiate both fetches in parallel
        const userPromise = fetch(`https://api.github.com/users/${USERNAME}`)
            .then(res => {
                if (!res.ok) throw new Error(`Could not fetch user profile (Status: ${res.status})`);
                return res.json();
            });

        // Sentinel: Prevent unhandled promise rejection if user fetch fails before awaited
        userPromise.catch(() => {});

        // Function to fetch all repositories (handling pagination)
        const fetchAllRepos = async (userPromise) => {
            const allRepos = [];
            // Start fetching page 1 immediately
            const page1Promise = fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100&page=1`)
                .then(res => {
                    if (!res.ok) throw new Error(`Could not fetch repositories (Status: ${res.status})`);
                    return res.json();
                });

            // Sentinel: Prevent unhandled promise rejection if page1 fails before it's awaited
            page1Promise.catch(() => {});

            // Wait for user profile to know total count
            const userData = await userPromise;
            const publicRepos = userData.public_repos || 0;

            // Safety limit: 5 pages = 500 repos. Prevents infinite loops and massive payloads.
            // For "Intensive Use" (120 months), this covers most users.
            const MAX_PAGES = 5;
            const totalPages = Math.min(Math.ceil(publicRepos / 100), MAX_PAGES);

            // Fetch remaining pages in parallel
            const remainingPromises = [];
            for (let page = 2; page <= totalPages; page++) {
                const p = fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100&page=${page}`)
                    .then(res => {
                        if (!res.ok) throw new Error(`Could not fetch repositories (Status: ${res.status})`);
                        return res.json();
                    });

                // Sentinel: Prevent unhandled promise rejection if a page fails while page1 is still being awaited
                p.catch(() => {});

                remainingPromises.push(p);
            }

            // Await all data
            const page1Data = await page1Promise;
            // Optimization: Use push to avoid creating intermediate arrays
            allRepos.push(...page1Data);

            if (remainingPromises.length > 0) {
                const results = await Promise.allSettled(remainingPromises);
                results.forEach(result => {
                    if (result.status === 'fulfilled') {
                        allRepos.push(...result.value);
                    } else {
                        console.warn('Failed to fetch a page of repositories:', result.reason.message || result.reason);
                    }
                });
            }

            return allRepos;
        };

        const reposPromise = fetchAllRepos(userPromise);

        // Sentinel: Prevent unhandled promise rejection if repos fail before user profile loads
        reposPromise.catch(() => {});

        // Optimization: Render profile immediately, don't wait for repos
        const userData = await userPromise;
        const user = {
            login: userData.login,
            name: userData.name,
            bio: userData.bio,
            avatar_url: userData.avatar_url,
            html_url: userData.html_url
        };
        renderProfile(user);

        const reposData = await reposPromise;
        // Optimization: Filter and sort BEFORE rendering/caching
        const repos = processRepositories(reposData);
        renderRepos(repos);

        // Store in localStorage
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                user,
                repos,
                timestamp: Date.now(),
                version: CACHE_VERSION
            }));
        } catch (e) {
                console.warn('Error writing to localStorage:', e.message);
        }

        if (isRetry) {
            profileElement.focus({ preventScroll: true });
        }

    } catch (error) {
        console.error('GitHub API Error:', error.message);

        // Fallback to stale cache if available
        if (cached) {
            renderProfile(cached.user);
            renderRepos(cached.repos);
            errorMessage.innerHTML = `
                <span class="block font-semibold">Network Error: ${escapeHTML(error.message)}</span>
                <span class="block text-sm mt-1">Displaying cached data.</span>
            `;
            errorMessage.classList.remove('hidden');
            errorMessage.focus();
        } else {
            errorMessage.innerHTML = `
                <span class="block text-lg font-semibold mb-2">Failed to load projects</span>
                <span class="block text-sm mb-4">${escapeHTML(error.message)}</span>
                <button data-action="retry" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors motion-reduce:transition-none touch-manipulation focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                    Retry Connection
                </button>
            `;
            errorMessage.classList.remove('hidden');
            errorMessage.focus();
        }
    } finally {
        // Hide loader
        loader.classList.add('hidden');
    }
};

// Event Delegation for Retry Button
errorMessage.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="retry"]')) {
        fetchGitHubData(true);
    }
});

// Back to Top Button Logic
const backToTopButton = document.getElementById('back-to-top');
let isBackToTopVisible = false;

const toggleBackToTop = () => {
    const shouldBeVisible = window.scrollY > 300;

    // Optimization: Only touch DOM if state changes (Bolt Mode)
    if (shouldBeVisible === isBackToTopVisible) return;
    isBackToTopVisible = shouldBeVisible;

    if (shouldBeVisible) {
        backToTopButton.classList.remove('opacity-0', 'pointer-events-none');
        backToTopButton.setAttribute('tabindex', '0');
    } else {
        backToTopButton.classList.add('opacity-0', 'pointer-events-none');
        backToTopButton.setAttribute('tabindex', '-1');
    }
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    // Move focus to profile for keyboard users
    document.getElementById('user-profile').focus({ preventScroll: true });
};

window.addEventListener('scroll', toggleBackToTop, { passive: true });
backToTopButton.addEventListener('click', scrollToTop);

// Run the fetch function as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', () => fetchGitHubData());

```

### `package.json`
- **Role:** Dependency Manifest
- **Why it matters:** Defines build scripts and core dependencies.
- **Inclusion mode:** Full
```json
{
  "name": "app",
  "version": "1.2.40",
  "description": "Welcome! This repository contains the source code for my personal portfolio page, which is designed to be a live, dynamic showcase of all my public GitHub projects.",
  "main": "index.js",
  "scripts": {
    "build": "tailwindcss -i ./src/input.css -o ./styles.css --minify",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/shfqrkhn/shfqrkhn.github.io.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "commonjs",
  "bugs": {
    "url": "https://github.com/shfqrkhn/shfqrkhn.github.io/issues"
  },
  "homepage": "https://github.com/shfqrkhn/shfqrkhn.github.io#readme",
  "devDependencies": {
    "tailwindcss": "^3.4.1"
  }
}

```

### `tailwind.config.js`
- **Role:** CSS Configuration
- **Why it matters:** Defines Tailwind content sources.
- **Inclusion mode:** Full
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

### `src/input.css`
- **Role:** CSS Base
- **Why it matters:** Base Tailwind imports and minimal global styles.
- **Inclusion mode:** Full
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  a, button {
    touch-action: manipulation;
  }
}

```

## Summarized Files

### `README.md`
User-facing documentation explaining the portfolio's purpose, dynamic GitHub API integration, technology stack (HTML, Tailwind, Vanilla JS), and caching strategy.

### `CLAUDE.md`
Comprehensive guide for AI assistants. Details directory structure, tech stack, and development workflows. Explicitly outlines security (Sentinel Mode), performance (Bolt Mode), and accessibility (Palette Mode) conventions. Describes caching system, API rate limit handling, and rules for version bumping.

### `.jules/steward.md`
Chronological ledger of implemented design protocols across Sentinel (security), Bolt (performance), and Palette (accessibility) modes. Includes rules on log sanitization, CORS, cache schema evolution, CSP compliance, reduced motion, and unhandled promise rejection prevention.

### `PARETO_ANALYSIS.md`
Record of 'Via Negativa' improvements, tracking removed dependencies (Google Fonts), simplified mappings, and other micro-optimizations that adhere to the project's minimalist philosophy.

### `LICENSE`
Standard MIT License detailing usage rights and liability limitations.

## Cross-File Relationships
- **Startup wiring:** `index.html` loads `script.js` via `<script defer>`. `script.js` executes `fetchGitHubData()` on `DOMContentLoaded`.
- **Module relationships:** No formal modules (Vanilla JS). Global namespace shared between functions in `script.js`.
- **API/data flow:** `script.js` reads username from `index.html` meta tag, fetches from GitHub API, caches in `localStorage`, and injects HTML strings into `index.html` containers (`#user-profile`, `#repos-grid`).
- **Config/env flow:** Tailwind configures CSS generation from `index.html` and `script.js` content. Built CSS is linked in `index.html`.
- **Dependency hotspots:** `index.html` relies on exact class names generated by Tailwind based on `script.js` string literals.
- **Test-to-implementation mapping:** None (no automated tests present).
- **Circular dependency risk:** None identified.

## Review Hotspots
- **Correctness risks:** None evident in core logic, robust null checking and fallbacks exist.
- **Security risks:** XSS in DOM injection (`innerHTML` used extensively in `script.js`). Relies heavily on `escapeHTML()` and `safeURL()` correctness.
- **Performance risks:** DOM layout thrashing during large repository list rendering. `Intl.DateTimeFormat` instantiation inside loops (mitigated in current code).
- **State/concurrency risks:** Parallel fetch requests (`Promise.allSettled`) handling pagination might have race conditions or unhandled rejections if network fails early.
- **Error-handling gaps:** Broad `catch` blocks in API fetching might mask specific JSON parsing errors.
- **Maintainability smells:** Inline HTML string construction in `script.js` can be brittle.
- **UX/accessibility risks:** Dynamic focus management during error states or 'Back to Top' navigation requires precise `tabindex` manipulation.

## Packaging Notes
- **Exclusions:** Excluded `styles.css` (generated artifact), `package-lock.json` (noise), and `.gitignore`.
- **Compression decisions:** `package.json` included in full as it's small enough. Documentation and ledger files summarized to preserve context without bloating the artifact.
- **Fidelity limits:** CSS generation relies on Tailwind build step not fully observable without running `npm run build`.
- **Missing/unreadable content:** None. All functional source files successfully packed.
- **Downstream review confidence:** High. All execution paths, security boundaries, and architectural patterns are fully contained within `index.html` and `script.js`, which are embedded in full.