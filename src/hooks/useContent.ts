import { useEffect, useState } from "react";
import {
  isSupabaseConfigured,
  listAll,
  getSiteContent,
  type BlogRow,
  type ProjectRow,
  type TestimonialRow,
} from "@/services/content";
import { BLOG_POSTS, TESTIMONIALS, SITE } from "@/constants/site";
import type { BlogPost, Testimonial } from "@/types";

interface Async<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

/* ---------------- Blog posts ---------------- */

function rowToPost(r: BlogRow): BlogPost {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    category: r.category,
    author: r.author,
    date: r.published_at ?? r.created_at,
    readingMinutes: r.reading_minutes || Math.max(1, Math.round(r.body.split(/\s+/).length / 200)),
    tags: r.tags ?? [],
    body: r.body.split(/\n{2,}/g).map((s) => s.trim()).filter(Boolean),
  };
}

export function useBlogPosts(): Async<BlogPost[]> {
  const [state, setState] = useState<Async<BlogPost[]>>({ data: BLOG_POSTS, loading: isSupabaseConfigured(), error: null });

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let live = true;
    listAll<BlogRow>("blog_posts", { orderBy: "published_at", ascending: false })
      .then((rows) => {
        if (!live) return;
        const published = rows.filter((r) => r.published).map(rowToPost);
        setState({ data: published.length > 0 ? published : BLOG_POSTS, loading: false, error: null });
      })
      .catch((e) => live && setState({ data: BLOG_POSTS, loading: false, error: String(e) }));
    return () => { live = false; };
  }, []);

  return state;
}

/* ---------------- Testimonials ---------------- */

function rowToTestimonial(r: TestimonialRow): Testimonial {
  return { quote: r.quote, name: r.name, role: r.role, initials: r.initials };
}

export function useTestimonials(): Async<Testimonial[]> {
  const [state, setState] = useState<Async<Testimonial[]>>({ data: TESTIMONIALS, loading: isSupabaseConfigured(), error: null });

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let live = true;
    listAll<TestimonialRow>("testimonials", { orderBy: "sort_order", ascending: true })
      .then((rows) => {
        if (!live) return;
        const published = rows.filter((r) => r.published).map(rowToTestimonial);
        setState({ data: published.length > 0 ? published : TESTIMONIALS, loading: false, error: null });
      })
      .catch((e) => live && setState({ data: TESTIMONIALS, loading: false, error: String(e) }));
    return () => { live = false; };
  }, []);

  return state;
}

/* ---------------- Student projects ---------------- */

export function useStudentProjects(): Async<ProjectRow[]> {
  const [state, setState] = useState<Async<ProjectRow[]>>({ data: [], loading: isSupabaseConfigured(), error: null });

  useEffect(() => {
    if (!isSupabaseConfigured()) { setState({ data: [], loading: false, error: null }); return; }
    let live = true;
    listAll<ProjectRow>("projects", { orderBy: "sort_order", ascending: true })
      .then((rows) => live && setState({ data: rows, loading: false, error: null }))
      .catch((e) => live && setState({ data: [], loading: false, error: String(e) }));
    return () => { live = false; };
  }, []);

  return state;
}

/* ---------------- Site settings (contact info etc.) ---------------- */

export interface SiteSettings {
  brand: string;
  tagline: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  whatsappMessage: string;
  address: typeof SITE.address;
  socials: typeof SITE.socials;
}

const DEFAULT_SETTINGS: SiteSettings = {
  brand: SITE.brand,
  tagline: SITE.tagline,
  email: SITE.email,
  phone: SITE.phone,
  phoneDisplay: SITE.phoneDisplay,
  whatsappMessage: SITE.whatsappMessage,
  address: SITE.address,
  socials: SITE.socials,
};

export function useSiteSettings(): Async<SiteSettings> {
  const [state, setState] = useState<Async<SiteSettings>>({ data: DEFAULT_SETTINGS, loading: false, error: null });

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    let live = true;
    getSiteContent<Partial<SiteSettings>>("settings")
      .then((val) => {
        if (!live) return;
        setState({ data: { ...DEFAULT_SETTINGS, ...(val ?? {}) }, loading: false, error: null });
      })
      .catch((e) => live && setState({ data: DEFAULT_SETTINGS, loading: false, error: String(e) }));
    return () => { live = false; };
  }, []);

  return state;
}
