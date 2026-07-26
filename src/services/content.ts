import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

/* ------------------------------------------------------------------ */
/* Database row types (mirror the SQL schema in supabase/schema.sql)    */
/* ------------------------------------------------------------------ */

export interface BlogRow {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[] | null;
  author: string;
  cover_image: string | null;
  featured: boolean;
  published: boolean;
  reading_minutes: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProjectRow {
  id: string;
  title: string;
  problem: string;
  tools: string;
  outcome: string;
  image: string | null;
  github_url: string | null;
  live_url: string | null;
  student_name: string | null;
  batch: string | null;
  difficulty: string | null;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface TestimonialRow {
  id: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
  image: string | null;
  sort_order: number;
  published: boolean;
  created_at: string;
}

export interface ApplicationRow {
  id: string;
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  age: number;
  school: string | null;
  student_class: string | null;
  city: string;
  state: string;
  experience: string;
  motivation: string;
  preferred_batch: string;
  preferred_contact_time: string;
  status: "new" | "contacted" | "enrolled" | "rejected";
  notes: string | null;
  source: string;
  created_at: string;
}

export interface MediaRow {
  id: string;
  path: string;
  url: string;
  alt: string | null;
  caption: string | null;
  size: number | null;
  created_at: string;
}

export interface SiteContentRow {
  key: string;
  value: unknown;
  updated_at: string;
}

/* ------------------------------------------------------------------ */
/* Generic CRUD helpers                                                */
/* ------------------------------------------------------------------ */

export type TableName = "blog_posts" | "projects" | "testimonials" | "applications" | "media" | "site_content";

export async function listAll<T>(table: TableName, opts?: { orderBy?: string; ascending?: boolean }): Promise<T[]> {
  const supabase = getSupabase();
  if (!supabase) return [];
  const q = supabase.from(table).select("*");
  if (opts?.orderBy) q.order(opts.orderBy, { ascending: opts.ascending ?? true });
  const { data, error } = await q;
  if (error) {
    console.warn(`[content] listAll(${table}) failed:`, error.message);
    return [];
  }
  return (data as T[]) ?? [];
}

export async function insertRow(table: TableName, row: Record<string, unknown>) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  // Supabase's generated types are strict; we accept a plain object here.
  const { data, error } = await supabase.from(table).insert(row as never).select().single();
  if (error) throw error;
  return data as unknown;
}

export async function updateRow(table: TableName, id: string, patch: Record<string, unknown>) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { data, error } = await supabase.from(table).update(patch as never).eq("id", id).select().single();
  if (error) throw error;
  return data as unknown;
}

export async function deleteRow(table: TableName, id: string) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Site content (key/value)                                            */
/* ------------------------------------------------------------------ */

export async function getSiteContent<T = Record<string, unknown>>(key: string): Promise<T | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data, error } = await supabase.from("site_content").select("value").eq("key", key).maybeSingle();
  if (error || !data) return null;
  return data.value as T;
}

export async function upsertSiteContent(key: string, value: unknown) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const { error } = await supabase
    .from("site_content")
    .upsert({ key, value, updated_at: new Date().toISOString() } as never, { onConflict: "key" });
  if (error) throw error;
}

/* ------------------------------------------------------------------ */
/* Media (Supabase Storage)                                            */
/* ------------------------------------------------------------------ */

const BUCKET = "media";

export async function uploadMedia(file: File): Promise<MediaRow> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
  const { error: upErr } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type,
  });
  if (upErr) throw upErr;
  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const row = { path, url: pub.publicUrl, size: file.size, alt: null, caption: null } as Record<string, unknown>;
  const inserted = await insertRow("media", row);
  return inserted as MediaRow;
}

export async function deleteMedia(row: MediaRow) {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase is not configured.");
  await supabase.storage.from(BUCKET).remove([row.path]);
  await deleteRow("media", row.id);
}

export { isSupabaseConfigured };
