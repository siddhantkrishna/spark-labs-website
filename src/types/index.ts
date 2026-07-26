/**
 * Shared TypeScript contracts for Spark Labs.
 * Keeping domain types here means a future CMS (Supabase / Sanity / Contentful)
 * can implement the same shapes without touching UI components.
 */

export interface NavItem {
  label: string;
  href: string;
  /** Optional short description shown inside the mega menu. */
  description?: string;
  /** External links open in a new tab. */
  external?: boolean;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export interface Mentor {
  name: string;
  role: string;
  bio: string;
  initials: string;
  focus: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  initials: string;
}

export interface BlogCategory {
  slug: string;
  name: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string; // ISO
  readingMinutes: number;
  tags: string[];
  /** Simple paragraph array keeps content portable to any CMS. */
  body: string[];
}

export interface FaqItem {
  q: string;
  a: string;
}

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export interface AdmissionPayload {
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  age: string;
  school: string;
  studentClass: string;
  city: string;
  state: string;
  experience: string;
  motivation: string;
  preferredBatch: string;
  preferredContactTime: string;
  consent: boolean;
  /** Honeypot — must stay empty for genuine humans. */
  company?: string;
}
