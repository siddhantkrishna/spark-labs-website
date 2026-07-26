import { useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  FileText,
  Image as ImageIcon,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Menu,
  Rocket,
  Settings,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/services/auth";
import { Logo } from "@/components/ui";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LoadingState } from "@/components/admin/AdminUI";
import { isSupabaseConfigured } from "@/lib/supabase";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: BarChart3, end: true },
  { to: "/admin/applications", label: "Applications", icon: FileText },
  { to: "/admin/blog", label: "Blog", icon: BookOpen },
  { to: "/admin/projects", label: "Projects", icon: Rocket },
  { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { to: "/admin/content", label: "Website Content", icon: LayoutGrid },
  { to: "/admin/media", label: "Media Library", icon: ImageIcon },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminLayout() {
  const { isAuthed, loading, user } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (!isSupabaseConfigured()) return <SupabaseMissingScreen />;
  if (loading) return <div className="grid min-h-screen place-items-center bg-paper text-ink"><LoadingState /></div>;
  if (!isAuthed) return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;

  return (
    <div className="min-h-screen bg-paper font-sans text-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-line bg-paper/95 px-4 backdrop-blur-md sm:px-6">
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line-2 text-ink lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
          <Logo />
          <span className="ml-1 rounded-full bg-accent-tint px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-[0.18em] text-accent uppercase">
            Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-[12.5px] text-mute sm:inline">{user?.email}</span>
          <ThemeToggle />
          <Link to="/" className="hidden text-[12.5px] font-semibold text-mute hover:text-ink sm:inline">
            View site
          </Link>
          <button
            onClick={() => signOut()}
            className="inline-flex items-center gap-1.5 rounded-full border border-line-2 px-3 py-1.5 text-[12.5px] font-semibold text-mute transition hover:border-ink hover:text-ink"
          >
            <LogOut className="h-3.5 w-3.5" /> Log out
          </button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-14 left-0 z-30 w-64 shrink-0 overflow-y-auto border-r border-line bg-paper p-3 transition-transform duration-300 lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <nav className="space-y-0.5" aria-label="Admin">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13.5px] font-semibold transition-colors ${
                    isActive
                      ? "bg-accent-tint text-accent"
                      : "text-mute hover:bg-accent-tint/50 hover:text-ink"
                  }`
                }
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Mobile scrim */}
        {open && (
          <button
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-14 z-20 bg-ink/40 lg:hidden"
          />
        )}

        {/* Content */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 sm:py-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function SupabaseMissingScreen() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper px-6 text-center">
      <div className="max-w-md">
        <p className="font-mono text-[11px] tracking-[0.28em] text-accent uppercase">Admin unavailable</p>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">Supabase isn&rsquo;t configured yet.</h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-mute">
          Set <code className="rounded bg-line px-1.5 py-0.5 font-mono text-[12px] text-ink">VITE_SUPABASE_URL</code> and{" "}
          <code className="rounded bg-line px-1.5 py-0.5 font-mono text-[12px] text-ink">VITE_SUPABASE_ANON_KEY</code>, apply the SQL schema in{" "}
          <code className="rounded bg-line px-1.5 py-0.5 font-mono text-[12px] text-ink">supabase/schema.sql</code>, then redeploy.
        </p>
        <Link to="/" className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent">
          Back to site
        </Link>
      </div>
    </div>
  );
}
