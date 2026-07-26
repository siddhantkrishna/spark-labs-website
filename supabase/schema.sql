-- ============================================================================
-- Spark Labs — Supabase schema
-- Apply once in Supabase Studio → SQL Editor. Idempotent.
-- ============================================================================

-- Extensions
create extension if not exists "pgcrypto";

-- ============================================================================
-- Tables
-- ============================================================================

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  student_name           text        not null,
  parent_name            text        not null,
  email                  text        not null,
  phone                  text        not null,
  age                    integer     not null,
  school                 text,
  student_class          text,
  city                   text        not null,
  state                  text        not null,
  experience             text        not null,
  motivation             text        not null,
  preferred_batch        text        not null,
  preferred_contact_time text        not null,
  status                 text        not null default 'new'
                                       check (status in ('new','contacted','enrolled','rejected')),
  notes                  text,
  source                 text        not null default 'admissions',
  created_at             timestamptz not null default now()
);
create index if not exists applications_created_idx on public.applications (created_at desc);
create index if not exists applications_status_idx  on public.applications (status);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  excerpt          text not null default '',
  body             text not null default '',
  category         text not null default 'Learning',
  tags             text[]      default '{}',
  author           text not null default 'Spark Labs Team',
  cover_image      text,
  featured         boolean     not null default false,
  published        boolean     not null default false,
  reading_minutes  integer     not null default 5,
  published_at     timestamptz,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index if not exists blog_published_idx on public.blog_posts (published, published_at desc);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title         text not null,
  problem       text not null default '',
  tools         text not null default '',
  outcome       text not null default '',
  image         text,
  github_url    text,
  live_url      text,
  student_name  text,
  batch         text,
  difficulty    text,
  featured      boolean not null default false,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);
create index if not exists projects_order_idx on public.projects (sort_order asc);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote       text not null,
  name        text not null,
  role        text not null default '',
  initials    text not null default '',
  image       text,
  sort_order  integer not null default 0,
  published   boolean not null default true,
  created_at  timestamptz not null default now()
);
create index if not exists testimonials_order_idx on public.testimonials (sort_order asc);

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  path        text not null,
  url         text not null,
  alt         text,
  caption     text,
  size        bigint,
  created_at  timestamptz not null default now()
);
create index if not exists media_created_idx on public.media (created_at desc);

create table if not exists public.site_content (
  key         text primary key,
  value       jsonb not null,
  updated_at  timestamptz not null default now()
);

-- updated_at triggers -------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists blog_touch on public.blog_posts;
create trigger blog_touch before update on public.blog_posts
  for each row execute function public.touch_updated_at();

drop trigger if exists site_content_touch on public.site_content;
create trigger site_content_touch before update on public.site_content
  for each row execute function public.touch_updated_at();

-- ============================================================================
-- Row-Level Security
-- Public site: anon can READ published content, and INSERT applications only.
-- Admin dashboard: authenticated users can do everything.
-- ============================================================================

alter table public.applications enable row level security;
alter table public.blog_posts   enable row level security;
alter table public.projects     enable row level security;
alter table public.testimonials enable row level security;
alter table public.media        enable row level security;
alter table public.site_content enable row level security;

-- Applications: anon can INSERT (public admissions form). Only auth can read/update/delete.
drop policy if exists applications_insert_anon on public.applications;
create policy applications_insert_anon on public.applications
  for insert to anon with check (true);
drop policy if exists applications_all_auth on public.applications;
create policy applications_all_auth on public.applications
  for all to authenticated using (true) with check (true);

-- Blog: anon reads published, auth manages
drop policy if exists blog_read_published on public.blog_posts;
create policy blog_read_published on public.blog_posts
  for select to anon using (published = true);
drop policy if exists blog_all_auth on public.blog_posts;
create policy blog_all_auth on public.blog_posts
  for all to authenticated using (true) with check (true);

-- Projects: anon reads all, auth manages
drop policy if exists projects_read on public.projects;
create policy projects_read on public.projects
  for select to anon using (true);
drop policy if exists projects_all_auth on public.projects;
create policy projects_all_auth on public.projects
  for all to authenticated using (true) with check (true);

-- Testimonials: anon reads published, auth manages
drop policy if exists testimonials_read on public.testimonials;
create policy testimonials_read on public.testimonials
  for select to anon using (published = true);
drop policy if exists testimonials_all_auth on public.testimonials;
create policy testimonials_all_auth on public.testimonials
  for all to authenticated using (true) with check (true);

-- Media: anon reads (they need URLs), auth manages
drop policy if exists media_read on public.media;
create policy media_read on public.media for select to anon using (true);
drop policy if exists media_all_auth on public.media;
create policy media_all_auth on public.media
  for all to authenticated using (true) with check (true);

-- Site content: anon reads, auth writes
drop policy if exists site_content_read on public.site_content;
create policy site_content_read on public.site_content for select to anon using (true);
drop policy if exists site_content_all_auth on public.site_content;
create policy site_content_all_auth on public.site_content
  for all to authenticated using (true) with check (true);

-- ============================================================================
-- Storage
-- Create a public bucket named "media" via Studio → Storage → New bucket
-- (name: media, public: true), then apply these policies:
-- ============================================================================

-- SELECT (public read)
drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select to public using (bucket_id = 'media');

-- INSERT / UPDATE / DELETE (authenticated only)
drop policy if exists "media auth write" on storage.objects;
create policy "media auth write" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "media auth update" on storage.objects;
create policy "media auth update" on storage.objects
  for update to authenticated using (bucket_id = 'media') with check (bucket_id = 'media');

drop policy if exists "media auth delete" on storage.objects;
create policy "media auth delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');

-- ============================================================================
-- Done.
-- Next: create your admin user in Studio → Authentication → Users.
-- ============================================================================
