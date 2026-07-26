/**
 * Environment configuration
 * Values come from Vite environment variables at build time.
 * Set these in .env (local) and Vercel → Settings → Environment Variables (prod).
 */
export const ENV = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL as string | undefined,
  supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
  formspreeId: import.meta.env.VITE_FORMSPREE_ID as string | undefined,
};

/**
 * Returns true if any form-submission backend is configured
 * (either Supabase or Formspree).
 */
export const hasFormBackend = (): boolean =>
  Boolean(ENV.supabaseUrl && ENV.supabaseAnonKey) || Boolean(ENV.formspreeId);
