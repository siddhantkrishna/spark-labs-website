/**
 * Centralised, typed access to build-time environment variables.
 * Vite only exposes vars prefixed with `VITE_`. Everything here is optional so
 * the site builds and runs locally without any secrets configured.
 *
 * See `.env.example` for the full list.
 */

const env = import.meta.env;

export const ENV = {
  /** Formspree form ID, e.g. "xldeabcd" — used for admissions/contact submissions. */
  formspreeId: (env.VITE_FORMSPREE_ID as string | undefined) ?? "",
  /** Optional Supabase alternative. */
  supabaseUrl: (env.VITE_SUPABASE_URL as string | undefined) ?? "",
  supabaseAnonKey: (env.VITE_SUPABASE_ANON_KEY as string | undefined) ?? "",

  /** Analytics — all optional, only load when provided. */
  ga4Id: (env.VITE_GA4_ID as string | undefined) ?? "",
  gtmId: (env.VITE_GTM_ID as string | undefined) ?? "",
  clarityId: (env.VITE_CLARITY_ID as string | undefined) ?? "",
  metaPixelId: (env.VITE_META_PIXEL_ID as string | undefined) ?? "",

  /** reCAPTCHA v3 site key (optional spam protection). */
  recaptchaSiteKey: (env.VITE_RECAPTCHA_SITE_KEY as string | undefined) ?? "",

  isProd: env.PROD,
} as const;

export const hasFormBackend = () => Boolean(ENV.formspreeId || ENV.supabaseUrl);
