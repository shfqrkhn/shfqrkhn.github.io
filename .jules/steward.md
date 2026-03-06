## 2026-01-16 - [Sentinel] - [Log Sanitization]
**Protocol:** Production logs must suppress stack traces by outputting `error.message` instead of the full `error` object to prevent internal path leakage.

## 2026-01-16 - [Bolt] - [CORS Preconnect]
**Protocol:** Preconnect tags must match the CORS mode of the intended request. `api.github.com` requires `crossorigin` for `fetch` calls, while image domains do not.

## 2026-01-16 - [Bolt] - [Cache Schema Evolution]
**Protocol:** When changing the structure of cached data (e.g., minification), the `CACHE_VERSION` key must be incremented to force client-side invalidation of legacy data.

## 2026-01-16 - [Palette] - [Dark Mode Contrast]
**Protocol:** Text on dark backgrounds (e.g., `bg-slate-800`) must use `text-slate-400` or lighter, not `text-slate-500`, to ensure WCAG AA compliance.

## 2026-02-02 - [Palette] - [Social Metadata]
**Protocol:** All public-facing pages must include `og:image` and `twitter:image` meta tags to ensure correct social media previews.

## 2026-02-02 - [Palette] - [Focus States]
**Protocol:** Interactive elements on dark backgrounds must use custom high-contrast focus rings (e.g., `ring-sky-400`) instead of browser defaults.

## 2026-02-02 - [Palette] - [Focus Management]
**Protocol:** When replacing UI elements dynamically (e.g., error -> loader), programmatic focus must be managed using `tabindex="-1"` and `.focus()` to prevent loss of context for screen reader users.

## 2026-02-02 - [Sentinel] - [CSP Compliance]
**Protocol:** Avoid inline event handlers (e.g., `onclick="..."`) in favor of `addEventListener` and event delegation to support strict Content Security Policy (CSP).

## 2026-02-02 - [Sentinel] - [Strict CSP]
**Protocol:** Inline scripts are strictly forbidden. Application logic must be externalized to `script.js`, and runtime configuration (e.g., username) must be injected via `<meta>` tags.

## 2026-02-03 - [Palette] - [Reduced Motion]
**Protocol:** All animated or transitioned elements (including fade-ins) must support `motion-reduce:transition-none` or `motion-reduce:animate-none` to respect user accessibility preferences.

## 2026-02-03 - [Sentinel] - [Safe Data Parsing]
**Protocol:** API response data used in constructors (like `Date.parse`, `new URL`) must be validated (`!isNaN`, `try/catch`) before use to prevent runtime crashes from malformed external data.

## 2026-02-14 - [Sentinel] - [Unhandled Promise Rejection]
**Protocol:** Early-starting Promises (like parallel fetch requests) that might reject before being explicitly awaited must have dummy `.catch(() => {})` handlers attached immediately upon creation to prevent Node.js/browser `UnhandledPromiseRejection` crashes.

## 2026-02-14 - [Sentinel] - [Loop Unhandled Promise Rejection]
**Protocol:** Early-starting Promises created in loops (like pagination fetches) must have dummy `.catch(() => {})` handlers attached immediately if there is any preceding `await` operation before they are passed to `Promise.allSettled`, to prevent `UnhandledPromiseRejection` crashes.

## 2026-02-14 - [Bolt] - [Cache Bloat Prevention]
**Protocol:** When using `localStorage` for caching data across sessions, actively purge invalid/stale cache entries and unrelated keys (e.g., from old usernames) to prevent storage exhaustion over time (Chronos-Simulation t+2 years).

## 2026-02-14 - [Bolt] - [Passive Event Listeners]
**Protocol:** High-frequency event listeners (specifically `scroll`, `touchmove`) must use `{ passive: true }` to inform the browser that `preventDefault()` will not be called, optimizing scroll performance.
