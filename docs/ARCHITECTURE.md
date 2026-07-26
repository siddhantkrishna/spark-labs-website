# Architecture Guide

A tour of how the Spark Labs website is put together and why.

## High-level diagram

```
                         ┌──────────────────────────────┐
                         │           main.tsx            │
                         │  HelmetProvider → Router       │
                         └──────────────┬────────────────┘
                                        │
                         ┌──────────────▼────────────────┐
                         │            App.tsx             │
                         │  ErrorBoundary → ApplyProvider │
                         │        → <Routes>              │
                         └──────────────┬────────────────┘
                                        │
                    ┌───────────────────▼───────────────────┐
                    │         layouts/RootLayout             │
                    │  Navbar · <Outlet/> · Footer           │
                    │  FloatingActions · ConsentBanner       │
                    │  scroll restoration + pageview track   │
                    └───────────────────┬────────────────────┘
                                        │  (per route)
      ┌───────────────┬────────────────┼────────────────┬───────────────┐
   pages/Home    pages/Program    pages/Admissions   pages/Blog     pages/LegalPage
      │               │                │                │               │
   sections/*     sections/*      AdmissionForm      constants/     constants/legal
   (composed)     (composed)      → services/        BLOG_POSTS
                                    admissions
                                        │
                            Formspree  or  Supabase
```

## Layers & responsibilities

| Layer | Location | Rule |
| --- | --- | --- |
| **Pages** | `src/pages` | One per route. Compose sections, set `<Seo>`, define breadcrumbs. No business logic. |
| **Sections** | `src/sections` | Large, reusable visual blocks. Pure presentation + light local state. |
| **Components** | `src/components` | Reusable UI (`ui.tsx`, `ui/`), site chrome (`layout/`), features (`AdmissionForm`, `Seo`). |
| **Services** | `src/services` | All side effects / IO: `env`, `analytics`, `admissions`. Never import React. |
| **Hooks** | `src/hooks` | Reusable stateful logic (`useConsent`). |
| **Constants** | `src/constants` | The single source of truth for content. **This is the CMS seam.** |
| **Types** | `src/types` | Shared contracts used across all layers. |

## Key decisions

### Why a client-rendered SPA?
The project ships with `vite-plugin-singlefile` (inlines everything into one
`index.html`) and `vite.config.ts` must not change. So the site is a client-rendered
SPA. SEO is handled with static fallbacks in `index.html` plus dynamic
`react-helmet-async` tags and JSON-LD — which Googlebot executes. `vercel.json`
rewrites every route to `index.html` for deep-linking.

### CMS readiness
No component fetches or hardcodes marketing copy inline — it all lives in typed
objects in `src/constants`. To migrate to Supabase/Sanity/Contentful/Strapi:
1. Keep the shapes in `src/types`.
2. Replace the constant exports with async loaders that return the same shapes.
3. Wrap pages in a data hook / loader. UI stays untouched.

### Consent-first analytics
`services/analytics.ts` loads **nothing** until `initAnalytics()` runs, which only
happens after `useConsent()` records a `granted` choice. Every provider is guarded by
its env var, so an unconfigured provider adds zero network cost.

### Form integrity
`services/admissions.ts` is the only path to a backend. It:
1. Silently drops honeypot hits.
2. Returns a clear error if no backend is configured (never a fake success).
3. Prefers Formspree, falls back to Supabase REST.
4. Fires a `generate_lead` analytics event on success.

## Adding a new page

1. Create `src/pages/MyPage.tsx` with a `<Seo>` and `<PageHeader>`.
2. Add a `<Route>` in `src/App.tsx`.
3. Add the link to `PRIMARY_NAV` / `MEGA_MENU` / `FOOTER_NAV` in `src/constants/site.ts`.
4. Add the URL to `public/sitemap.xml`.

## Adding a blog post

Append an entry to `BLOG_POSTS` in `src/constants/site.ts` (typed as `BlogPost`)
and add its URL to the sitemap. Listing, search, categories, reading time, related
posts and the detail page all update automatically.
