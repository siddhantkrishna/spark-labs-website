# Supabase Setup — Spark Labs

This is the one-time setup that turns Spark Labs from a static site into a
CMS-backed admissions website with a working admin dashboard.

Estimated time: **10 minutes**.

---

## 1. Create the Supabase project

1. Go to [supabase.com](https://supabase.com) and click **New project**.
2. Name it `spark-labs`, pick a strong DB password, choose the closest region
   (e.g. `ap-south-1` Mumbai).
3. Wait for the project to provision.

## 2. Apply the schema

1. Open **SQL Editor** → **New query**.
2. Paste the entire contents of [`supabase/schema.sql`](../supabase/schema.sql).
3. Click **Run**. You should see "Success. No rows returned."

This creates all tables (`applications`, `blog_posts`, `projects`,
`testimonials`, `media`, `site_content`), indexes, triggers, and RLS policies.

## 3. Create the storage bucket

1. **Storage** → **New bucket**.
2. Name: `media`, **Public**: ✅ **on**.
3. Click **Create bucket**. (Bucket policies were already applied in step 2.)

## 4. Create your admin user

1. **Authentication** → **Users** → **Add user** → **Create new user**.
2. Enter your admin email + a strong password → **Create user**.
3. Confirm the email if your project requires it (or disable email
   confirmations in **Auth → Providers → Email**).

> Anyone who can sign in to Supabase Auth becomes an admin. If you want
> multiple admins, create additional users the same way. Because the site
> only has ONE admin role, no extra permissions setup is needed.

## 5. Get your API keys

**Project Settings → API** →

- Copy **Project URL** → `VITE_SUPABASE_URL`
- Copy **anon public key** → `VITE_SUPABASE_ANON_KEY`

Put both into your local `.env` (see `.env.example`) and add them to Vercel
**Project → Settings → Environment Variables** for production.

## 6. (Optional) Turn on email notifications

Supabase can send you a Slack/email notification when a row is inserted:

- **Database → Webhooks → Create a new hook**
- Table `applications`, event `INSERT`
- Point at your Slack incoming webhook / Zapier / n8n endpoint.

## 7. Deploy

Push to GitHub → Vercel picks up the env vars and redeploys.

Visit `/admin/login` on your live site, sign in, and start managing content.

---

## Verifying it worked

- **Public site** — Submit a test enquiry on `/admissions`. It should
  appear in Supabase Table Editor → `applications`.
- **Admin dashboard** — Log in at `/admin/login`. The Overview page should
  show your test enquiry. Create a blog post; it should immediately appear
  on `/blog`.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Admin login says "Invalid credentials" | User doesn't exist or email isn't confirmed. Create/confirm in Supabase Studio → Auth → Users. |
| "Row-level security policy violation" | You didn't run the full `schema.sql`. Re-run it — it's idempotent. |
| Blog changes not showing publicly | Ensure the post has **Published** = true. Anon RLS only returns published rows. |
| Media upload fails | The `media` bucket wasn't created **public**. Recreate it as public. |
| Admin panel loads but is empty | Env vars weren't picked up. Redeploy after adding them to Vercel. |
