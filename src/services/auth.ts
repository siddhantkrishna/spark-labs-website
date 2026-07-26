import { getSupabase } from "@/lib/supabase";

export interface AuthResult {
  ok: boolean;
  message?: string;
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: "Supabase is not configured." };
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = getSupabase();
  if (supabase) await supabase.auth.signOut();
}

export async function sendPasswordReset(email: string): Promise<AuthResult> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: "Supabase is not configured." };
  const redirectTo = `${window.location.origin}/admin/reset-password`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
  if (error) return { ok: false, message: error.message };
  return { ok: true };
}

export async function updatePassword(newPassword: string): Promise<AuthResult> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, message: "Supabase is not configured." };
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { ok: false, message: error.message };
  return { ok: true };
}
