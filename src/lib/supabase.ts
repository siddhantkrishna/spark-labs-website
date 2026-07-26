import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { ENV } from "@/services/env";

/**
 * Singleton Supabase client.
 * Returns `null` if env vars aren't configured, so the app can gracefully
 * fall back to constants-based content.
 */
let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (client) return client;
  if (!ENV.supabaseUrl || !ENV.supabaseAnonKey) return null;
  client = createClient(ENV.supabaseUrl, ENV.supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: "spark-admin-auth",
    },
  });
  return client;
}

export const isSupabaseConfigured = () => Boolean(ENV.supabaseUrl && ENV.supabaseAnonKey);
