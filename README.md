# Spark Labs — Production Website

The official admissions website for **Spark Labs**, the AI Learning Laboratory of
**Charvikon Training & Research Centre** (Raigarh, Chhattisgarh).

Built with **React 19 + Vite 7 + TypeScript + Tailwind CSS v4**, deployed on **Vercel**.

---

## ✨ Features

### Public site
- **Multi-page** (React Router): Home, About, AI Builder Program, Curriculum,
  Projects, Student Journey, Admissions, FAQ, Contact, Careers, Blog, full legal suite.
- **Real admissions form** → Supabase (with Formspree fallback), client-side
  validation, honeypot spam protection, loading / success / error states.
- **Elegant dark mode** — no-flash inline script, `localStorage` preference,
  respects OS preference on first visit, small toggle in the navbar.
- **SEO** — dynamic per-route meta (react-helmet-async), canonical URLs, Open
  Graph + Twitter, `robots.txt`, `sitemap.xml`, JSON-LD (Organization,
  LocalBusiness, Course, Breadcrumb, FAQ).
- **Analytics** (consent-gated) — GA4, GTM, Microsoft Clarity, optional Meta Pixel.
- **Security** — strict headers + CSP in `vercel.json`, honeypot, reCAPTCHA-ready.
- **Accessibility** — semantic HTML, skip link, focus states, ARIA, contrast.
- **Conversion** — sticky mobile CTA, floating WhatsApp + call, back-to-top,
  quick-apply modal, ethical batch-availability urgency, testimonials & trust bars.

### Admin dashboard (`/admin`)
Single secure admin surface, powered by **Supabase** Auth + Postgres + Storage:

- **Auth** — email/password sign-in, forgot password, secure reset link.
- **Dashboard** — live counts + latest applications at a glance.
- **Applications** — search, filter, notes, status workflow, CSV export.
- **Blog CMS** — create/edit/delete, categories, tags, featured, published, cover.
- **Projects CMS** — showcase student builds with problem/tools/outcome and links.
- **Testimonials** — quotes with initials/photo, ordering, publish toggle.
- **Website Content** — hero, FAQ and default SEO editable without touching code.
- **Media Library** — drag-and-drop upload to Supabase Storage, alt text, copy URL.
- **Settings** — brand, contact, address, socials, countdown, accent colour.

### Content architecture
Content hooks (`src/hooks/useContent.ts`) read from Supabase when configured,
gracefully fall back to typed constants (`src/constants`) otherwise — so the
public site works **with or without** a database.

---

## 🚀 Quick start

```bash
# 1. Install dependencies
npm install

# 2. (Optional) configure env vars
cp .env.example .env        # then fill in the values you need

# 3. Run locally
npm run dev                 # http://localhost:5173

# 4. Production build
npm run build               # outputs a single-file bundle to dist/

# 5. Preview the production build
npm run preview
```

> The build uses `vite-plugin-singlefile`, which inlines all JS/CSS into one
> `dist/index.html`. Static assets in `public/` (og-image, robots.txt, sitemap.xml)
> are copied alongside it.

---

## 🔑 Environment variables

Everything is **optional** — the site builds and runs with none configured.
See [`.env.example`](./.env.example) for the full list.

| Variable | Purpose |
| --- | --- |
| `VITE_FORMSPREE_ID` | Formspree form ID for admissions/contact submissions |
| `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` | Alternative Supabase backend (table `admissions`) |
| `VITE_GA4_ID` | Google Analytics 4 measurement ID |
| `VITE_GTM_ID` | Google Tag Manager container ID |
| `VITE_CLARITY_ID` | Microsoft Clarity project ID |
| `VITE_META_PIXEL_ID` | Meta/Facebook Pixel (optional) |
| `VITE_RECAPTCHA_SITE_KEY` | Google reCAPTCHA v3 site key (optional) |

Set these in **Vercel → Project → Settings → Environment Variables** for production.

---

## 🗄 Enabling Supabase (unlocks admin + full CMS)

The public site works without Supabase, but the admin dashboard and CMS-editable
content require it. Full step-by-step guide:
**[`docs/SUPABASE_SETUP.md`](./docs/SUPABASE_SETUP.md)** (≈ 10 minutes).

Quick version:

1. Create a Supabase project.
2. Run the SQL in **[`supabase/schema.sql`](./supabase/schema.sql)** in the SQL editor.
3. Create a **public** storage bucket named `media`.
4. Create an admin user in **Authentication → Users**.
5. Copy your project URL + anon key into `.env` and Vercel env vars.
6. Redeploy and visit `/admin/login`.

Once configured:

- Admissions submissions land in the `applications` table (see the admin
  dashboard → Applications).
- Blog, projects, testimonials, media and site content are all editable from
  `/admin`. See **[`docs/ADMIN_GUIDE.md`](./docs/ADMIN_GUIDE.md)**.
- Formspree is only used as a fallback when Supabase isn't configured.

Submissions are validated client-side and checked against a honeypot; nothing
is ever faked. If no backend is configured the user sees a clear message
directing them to email/call instead.

---

## ☁️ Deploying to Vercel

1. Push to GitHub and import the repo in Vercel.
2. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.
3. Add your environment variables.
4. `vercel.json` is already included — it configures:
   - SPA rewrites (all routes → `index.html`)
   - Security headers + Content-Security-Policy
   - `cleanUrls`
5. After the first deploy, update the domain in `src/constants/site.ts` (`SITE.url`),
   `public/robots.txt`, `public/sitemap.xml` and `index.html`, then submit the
   sitemap in Google Search Console.

---

## 🗂 Folder structure

```
public/                 Static assets (og-image, robots.txt, sitemap.xml)
supabase/schema.sql     One-shot Postgres migration (tables + RLS + storage)
docs/                   ARCHITECTURE, SUPABASE_SETUP, ADMIN_GUIDE
src/
├─ components/
│  ├─ layout/           Navbar (+ theme toggle), Footer, FloatingActions
│  ├─ ui/               Breadcrumbs, PageHeader (+ ui.tsx primitives/modal)
│  ├─ admin/            AdminUI primitives + reusable AdminCrud
│  ├─ AdmissionForm.tsx Real, validated admissions form → Supabase
│  ├─ ErrorBoundary.tsx App-level render error catcher
│  ├─ ThemeToggle.tsx   Sun / moon switch
│  └─ Seo.tsx           Per-route meta + JSON-LD
├─ constants/           Site + legal content (fallback when no CMS)
├─ contexts/            ThemeContext (light/dark)
├─ hooks/               useAuth, useConsent, useContent (Supabase + fallback)
├─ layouts/             RootLayout (public) + AdminLayout (protected)
├─ lib/                 supabase.ts — client singleton
├─ pages/               Public pages
│  └─ admin/            Auth, Dashboard, Applications, Blog, Projects,
│                       Testimonials, Content, Media, Settings
├─ sections/            Composable page sections (Hero, Extras, …)
├─ services/            env, analytics, admissions, auth, content
├─ types/               Shared TypeScript contracts
├─ utils/               Small helpers (cn)
├─ App.tsx              Route table (public + admin)
├─ main.tsx             ThemeProvider · Helmet · Router · mount
└─ index.css            Tailwind theme + design tokens + dark mode
```

See [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) for a deeper tour,
and [`docs/ADMIN_GUIDE.md`](./docs/ADMIN_GUIDE.md) for the admin walkthrough.

---

## 🧭 Design language

White paper background · ink-black type · deep-purple accent · Swiss typography
(Space Grotesk / Instrument Sans / JetBrains Mono) · generous whitespace ·
engineering dot-grid · rounded cards · soft shadows. Tokens live in `src/index.css`
under the `@theme` block — change them there and the whole site follows.

---

## ✅ Quality checklist

- [x] No TypeScript errors (`npm run build` type-checks)
- [x] Responsive: mobile / tablet / desktop
- [x] SEO: meta, canonical, OG, sitemap, robots, structured data
- [x] Accessibility: semantic HTML, skip link, focus, ARIA, contrast
- [x] Consent-gated analytics
- [x] Security headers + CSP
- [x] Real form with validation + spam protection
- [x] Vercel-ready

---

© Charvikon Training & Research Centre · Spark Labs. All rights reserved.
