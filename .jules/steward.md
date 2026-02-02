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
