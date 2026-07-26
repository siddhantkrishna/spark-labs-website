import type { AdmissionPayload } from "@/types";
import { ENV, hasFormBackend } from "./env";
import { trackEvent } from "./analytics";
import { insertRow } from "./content";
import { isSupabaseConfigured } from "@/lib/supabase";

export interface SubmitResult {
  ok: boolean;
  message: string;
}

/**
 * Submits an admission / enquiry to the configured backend.
 *
 * Order of preference:
 *   1. Formspree   (VITE_FORMSPREE_ID)
 *   2. Supabase    (VITE_SUPABASE_URL + VITE_SUPABASE_ANON_KEY, table `admissions`)
 *
 * Nothing is faked — if no backend is configured the caller receives a clear
 * `ok: false` result so it can surface a real error instead of a false success.
 *
 * @param source  Where the submission came from ("admissions" | "contact" | "quick-apply")
 */
export async function submitAdmission(
  payload: AdmissionPayload,
  source = "admissions"
): Promise<SubmitResult> {
  // Honeypot: real users never fill the hidden "company" field.
  if (payload.company && payload.company.trim().length > 0) {
    // Pretend success to the bot; do not hit the backend.
    return { ok: true, message: "Thank you." };
  }

  if (!hasFormBackend()) {
    return {
      ok: false,
      message:
        "Submissions aren't configured yet. Please email admissions@sparklabs.in or call us — we'll respond right away.",
    };
  }

  const { company: _honeypot, ...clean } = payload;
  const record = { ...clean, source, submittedAt: new Date().toISOString() };

  try {
    // Prefer Supabase as the system of record when configured — that's where
    // the admin dashboard reads applications from.
    if (isSupabaseConfigured()) {
      await insertRow("applications", {
        student_name: clean.studentName,
        parent_name: clean.parentName,
        email: clean.email,
        phone: clean.phone,
        age: Number(clean.age),
        school: clean.school || null,
        student_class: clean.studentClass || null,
        city: clean.city,
        state: clean.state,
        experience: clean.experience,
        motivation: clean.motivation,
        preferred_batch: clean.preferredBatch,
        preferred_contact_time: clean.preferredContactTime,
        status: "new",
        source,
      });
    } else if (ENV.formspreeId) {
      const res = await fetch(`https://formspree.io/f/${ENV.formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(record),
      });
      if (!res.ok) throw new Error(`Formspree responded ${res.status}`);
    }

    trackEvent("generate_lead", { source, batch: payload.preferredBatch });
    return { ok: true, message: "Application received." };
  } catch (err) {
    console.error("Admission submission failed:", err);
    return {
      ok: false,
      message:
        "Something went wrong while submitting. Please try again, or reach us directly at admissions@sparklabs.in.",
    };
  }
}
