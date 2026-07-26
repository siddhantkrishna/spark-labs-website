# Admin Guide

The Spark Labs admin dashboard is a single, secure control room for the whole
site. This guide walks you through every screen.

**URL:** `https://sparklabs.in/admin/login`

---

## Signing in

1. Go to `/admin/login`.
2. Enter your Supabase email + password.
3. Forgot it? Click **Forgot password** — Supabase emails you a reset link.

Sessions persist in `localStorage` under `spark-admin-auth`; sign out from the
top bar clears them.

---

## Overview

The landing screen after sign-in. Shows counts for every content type and the
five latest admissions. Cards are links — click one to jump to that section.

---

## Applications 📥 (highest priority)

`/admin/applications`

Every admissions enquiry from `/admissions` lands here in real time.

- **Search** by name, email, phone or city.
- **Filter** by status (new / contacted / enrolled / rejected).
- **View & take notes** — click the note icon to open the full application.
  Update status with the dropdown, then hit *Save notes*.
- **Export CSV** — export all currently-filtered rows.
- **Delete** — permanently removes the row. Use for spam.

**Recommended workflow**: check daily → change *new → contacted* the moment
you make first contact → *enrolled* on fee payment → *rejected* if not moving
forward.

---

## Blog

`/admin/blog`

Create, edit, publish, unpublish and delete articles.

- **Slug** must be URL-friendly (`why-ai-matters`, not `Why AI Matters`).
- **Body** is plain text; separate paragraphs with a blank line.
- Toggle **Published** on to make it visible on `/blog`.
- **Featured** highlights the article (useful when you later showcase a
  featured post on the home page).
- **Tags** are comma-separated.

Copy image URLs from the Media Library and paste them into **Cover image URL**.

---

## Projects

`/admin/projects`

Showcase real student projects.

- **Problem / Tools / Outcome** — the three fields used by the public
  Projects section.
- **Sort order** controls the display order (lower first).
- **Featured** marks a project as portfolio-worthy.

---

## Testimonials

`/admin/testimonials`

Every quote shown on the site.

- **Initials** are the two-letter avatar fallback (`PR`, `AG`, `AB`).
- **Published** must be on to appear publicly.
- Reorder by editing **Sort order**.

---

## Website content

`/admin/content`

The editor for the copy shown on the public site — organised in tabs:

- **Hero** — headline lines, paragraph, eyebrow badge, CTA labels.
- **FAQ** — add/remove/edit the questions shown on `/faq`. Leave empty to
  use the defaults baked into the code.
- **SEO** — default title, description, keywords, and OG image URL.

Changes are live for new visitors immediately.

---

## Media library

`/admin/media`

Drag-and-drop images into the drop zone (or click *Choose files*). Uploaded
files go to the public `media` bucket in Supabase Storage.

- Add **alt text** to each image (accessibility & SEO).
- Click **Copy URL** to get the public URL for pasting into blog/projects/testimonials.
- **Delete** removes both the storage object and the row.

---

## Settings

`/admin/settings`

Global site info:

- **Brand** — brand name, tagline, accent colour.
- **Contact** — email, phone (both formats), WhatsApp prefilled message.
- **Address** — the physical location shown in the footer and schema.org data.
- **Social links** — Instagram, YouTube, LinkedIn, X.
- **Admissions countdown** — an optional deadline you can enable/disable at any
  time.

Click **Save settings** — the public site reads these fields for new visitors.

---

## Best practices

- **Never share your Supabase anon key beyond `.env` and Vercel.** RLS
  protects the tables even if it leaks, but treat it as sensitive.
- **Test on staging first** if you have a preview deployment.
- **Uploaded images should be pre-optimised** where possible — under 400 KB
  each is a good target.
- **Applications marked `enrolled`** are your source of truth for batch
  planning — the batch availability numbers shown on the site are still
  edited manually via **Website content**.
