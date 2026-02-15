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
const LANGUAGE_COLORS = new Map([
    ['JavaScript', 'bg-yellow-400'],
    ['Python', 'bg-blue-400'],
    ['HTML', 'bg-orange-500'],
    ['CSS', 'bg-blue-500'],
    ['TypeScript', 'bg-blue-400'],
    ['Shell', 'bg-green-300'],
    ['default', 'bg-slate-500'],
]);

// Function to get a color based on the programming language
const getLanguageColor = (language) => {
    return LANGUAGE_COLORS.get(language) || LANGUAGE_COLORS.get('default');
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

    profileElement.innerHTML = `
        <img src="${avatarSrc}" alt="${escapeHTML(user.name || user.login)}'s GitHub profile photo" width="128" height="128" fetchpriority="high" class="w-32 h-32 rounded-full mb-4 border-4 border-slate-700 shadow-lg">
        <h1 class="text-4xl font-bold text-white">${escapeHTML(user.name || user.login)}</h1>
        <p class="mt-2 max-w-md text-slate-400">${escapeHTML(user.bio || '')}</p>
        <div class="mt-4">
            <a href="${safeURL(user.html_url)}" target="_blank" rel="noopener noreferrer" class="text-sky-400 hover:text-sky-300 transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-sm">
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
            <a href="${safeURL(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="project-card block p-6 bg-slate-800 rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:transform-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                <h3 class="text-xl font-bold text-white">${escapeHTML(repo.name)}</h3>
                <p class="mt-2 text-sm text-slate-400 h-10 line-clamp-2 overflow-hidden">${escapeHTML(repo.description || 'No description provided.')}</p>
                <div class="mt-4 flex items-center justify-between text-xs text-slate-400">
                    <div class="flex items-center gap-2">
                        ${repo.language ? `<span class="flex items-center gap-1.5">
                            <span class="w-2 h-2 rounded-full ${getLanguageColor(repo.language)}"></span>
                            ${escapeHTML(repo.language)}
                        </span>` : ''}
                    </div>
                    <div class="flex items-center gap-4">
                        <span><span aria-label="Stars">⭐</span> ${repo.stargazers_count}</span>
                        <span>${new Date(repo.pushed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
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
    return rawRepos
        .filter(repo => !repo.fork) // Filter out forks (Via Negativa)
        .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0)) // Sort by stars
        .map(repo => ({ // Minify schema
            name: repo.name,
            html_url: repo.html_url,
            description: repo.description,
            language: repo.language,
            stargazers_count: repo.stargazers_count,
            pushed_at: repo.pushed_at
            // fork property removed as we only store non-forks
        }));
};

// Fetch user profile and repositories from GitHub API
const fetchGitHubData = async (isRetry = false) => {
    const CACHE_KEY = `githubData_${USERNAME}`;
    const CACHE_VERSION = 'v5'; // Increment when data structure changes
    const CACHE_EXPIRATION_MS = 24 * 60 * 60 * 1000; // 24 hours

    // Helper to retrieve and parse cache
    const getCachedData = () => {
        try {
            const raw = localStorage.getItem(CACHE_KEY);
            if (!raw) return null;
            const data = JSON.parse(raw);
            return (data.version === CACHE_VERSION) ? data : null;
        } catch (e) {
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
                loader.style.display = 'none';
                return;
            }
        }

        // Reset UI State for Retry (fetch mode)
        loader.style.display = 'flex';
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

        // Function to fetch all repositories (handling pagination)
        const fetchAllRepos = async (userPromise) => {
            const allRepos = [];
            // Start fetching page 1 immediately
            const page1Promise = fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100&page=1`)
                .then(res => {
                    if (!res.ok) throw new Error(`Could not fetch repositories (Status: ${res.status})`);
                    return res.json();
                });

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
                remainingPromises.push(
                    fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100&page=${page}`)
                        .then(res => {
                            if (!res.ok) throw new Error(`Could not fetch repositories (Status: ${res.status})`);
                            return res.json();
                        })
                );
            }

            // Await all data
            const page1Data = await page1Promise;
            // Optimization: Use push to avoid creating intermediate arrays
            allRepos.push(...page1Data);

            if (remainingPromises.length > 0) {
                const remainingData = await Promise.all(remainingPromises);
                remainingData.forEach(data => allRepos.push(...data));
            }

            return allRepos;
        };

        const reposPromise = fetchAllRepos(userPromise);

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
        } else {
            errorMessage.innerHTML = `
                <span class="block text-lg font-semibold mb-2">Failed to load projects</span>
                <span class="block text-sm mb-4">${escapeHTML(error.message)}</span>
                <button data-action="retry" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors motion-reduce:transition-none focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-slate-900">
                    Retry Connection
                </button>
            `;
            errorMessage.classList.remove('hidden');
        }
    } finally {
        // Hide loader
        loader.style.display = 'none';
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

const toggleBackToTop = () => {
    if (window.scrollY > 300) {
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
};

window.addEventListener('scroll', toggleBackToTop);
backToTopButton.addEventListener('click', scrollToTop);

// Run the fetch function as soon as the DOM is ready
document.addEventListener('DOMContentLoaded', () => fetchGitHubData());
