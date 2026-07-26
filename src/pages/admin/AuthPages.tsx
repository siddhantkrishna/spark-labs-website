import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Loader2, LogIn, Mail, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { Logo } from "@/components/ui";
import { ThemeToggle } from "@/components/ThemeToggle";
import { sendPasswordReset, signIn, updatePassword } from "@/services/auth";
import { isSupabaseConfigured } from "@/lib/supabase";

/* ---------- Shared auth shell ---------- */

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen bg-paper text-ink lg:grid-cols-[1fr_1.1fr]">
      <div className="hidden overflow-hidden bg-ink text-white lg:block">
        <div className="dotgrid-light dotgrid-fade pointer-events-none absolute inset-y-0 left-0 w-1/2" aria-hidden="true" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo dark />
          <div>
            <p className="font-mono text-[11px] tracking-[0.28em] text-accent-bright uppercase">
              Spark Labs · Admin
            </p>
            <h1 className="mt-4 max-w-md font-display text-3xl font-bold leading-tight">
              A calm control room for every part of the site.
            </h1>
            <p className="mt-4 max-w-md text-[14.5px] text-white/60">
              Applications, blog, projects, testimonials, media and settings — one secure dashboard for the whole team.
            </p>
          </div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-white/40">
            Charvikon Training & Research Centre
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center px-6 py-12 sm:px-10">
        <div className="absolute right-6 top-6"><ThemeToggle /></div>
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <p className="font-mono text-[11px] tracking-[0.24em] text-accent uppercase">Admin</p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-[14.5px] text-mute">{subtitle}</p>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-line-2 bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-faint outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15";

/* ---------- Login ---------- */

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();
  const loc = useLocation();

  const configured = isSupabaseConfigured();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const r = await signIn(email.trim(), password);
    setLoading(false);
    if (r.ok) {
      const dest = (loc.state as { from?: string } | null)?.from ?? "/admin";
      nav(dest, { replace: true });
    } else {
      setError(r.message ?? "Sign-in failed.");
    }
  };

  return (
    <>
      <Seo title="Admin Login" description="Spark Labs admin dashboard." path="/admin/login" noindex />
      <AuthShell title="Sign in" subtitle="Enter your admin credentials to continue.">
        {!configured && (
          <p className="mb-5 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-[13px] text-amber-800 dark:border-amber-400/40 dark:bg-amber-500/10 dark:text-amber-300">
            Supabase isn&rsquo;t configured. Set the env vars and restart to enable admin access.
          </p>
        )}
        <form onSubmit={submit} className="space-y-4" noValidate>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] tracking-[0.12em] text-mute uppercase">Email</span>
            <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] tracking-[0.12em] text-mute uppercase">Password</span>
            <input type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputCls} />
          </label>
          {error && <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-[13px] text-red-700 dark:border-red-400/40 dark:bg-red-500/10">{error}</p>}
          <button type="submit" disabled={loading || !configured} className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-lift transition hover:bg-accent-deep disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
            Sign in
          </button>
        </form>
        <p className="mt-6 flex items-center justify-between text-[13px] text-mute">
          <Link to="/admin/forgot-password" className="u-link hover:text-ink">Forgot password?</Link>
          <Link to="/" className="u-link hover:text-ink">← Back to site</Link>
        </p>
      </AuthShell>
    </>
  );
}

/* ---------- Forgot password ---------- */

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError("");
    const r = await sendPasswordReset(email.trim());
    if (r.ok) setState("sent");
    else { setState("idle"); setError(r.message ?? "Something went wrong."); }
  };

  return (
    <>
      <Seo title="Forgot password" description="Reset your admin password." path="/admin/forgot-password" noindex />
      <AuthShell title="Forgot password" subtitle="We'll email you a secure link to reset your password.">
        {state === "sent" ? (
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-5 text-[14px] text-emerald-800 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-300">
            <ShieldCheck className="mb-2 h-5 w-5" />
            If an account exists for <strong>{email}</strong>, a reset link is on its way. Check your inbox.
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4" noValidate>
            <label className="block">
              <span className="mb-1.5 block font-mono text-[11px] tracking-[0.12em] text-mute uppercase">Email</span>
              <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputCls} />
            </label>
            {error && <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-[13px] text-red-700 dark:border-red-400/40 dark:bg-red-500/10">{error}</p>}
            <button type="submit" disabled={state === "sending"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-lift transition hover:bg-accent-deep disabled:opacity-60">
              {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Mail className="h-4 w-4" />}
              Send reset link
            </button>
          </form>
        )}
        <p className="mt-6 text-[13px] text-mute"><Link to="/admin/login" className="u-link hover:text-ink">← Back to sign in</Link></p>
      </AuthShell>
    </>
  );
}

/* ---------- Reset password (from email link) ---------- */

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [state, setState] = useState<"idle" | "saving" | "done">("idle");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8) return setError("Use at least 8 characters.");
    if (password !== confirm) return setError("Passwords don't match.");
    setState("saving");
    const r = await updatePassword(password);
    if (r.ok) { setState("done"); setTimeout(() => nav("/admin", { replace: true }), 1200); }
    else { setState("idle"); setError(r.message ?? "Couldn't update password."); }
  };

  return (
    <>
      <Seo title="Reset password" description="Set a new admin password." path="/admin/reset-password" noindex />
      <AuthShell title="Set a new password" subtitle="Choose a strong password you haven't used before.">
        <form onSubmit={submit} className="space-y-4" noValidate>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] tracking-[0.12em] text-mute uppercase">New password</span>
            <input type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required className={inputCls} />
          </label>
          <label className="block">
            <span className="mb-1.5 block font-mono text-[11px] tracking-[0.12em] text-mute uppercase">Confirm password</span>
            <input type="password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className={inputCls} />
          </label>
          {error && <p className="rounded-lg border border-red-300 bg-red-50 px-4 py-2.5 text-[13px] text-red-700 dark:border-red-400/40 dark:bg-red-500/10">{error}</p>}
          {state === "done" && <p className="rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2.5 text-[13px] text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/10 dark:text-emerald-300">Updated. Redirecting…</p>}
          <button type="submit" disabled={state === "saving"} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-lift transition hover:bg-accent-deep disabled:opacity-60">
            {state === "saving" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update password"}
          </button>
        </form>
      </AuthShell>
    </>
  );
}
