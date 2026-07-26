import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

/* ---------- Cards / panels ---------- */

export function AdminCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-paper shadow-card ${className}`}>{children}</div>
  );
}

export function AdminSection({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-[14.5px] leading-relaxed text-mute">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </header>
      {children}
    </section>
  );
}

/* ---------- Buttons ---------- */

type BtnVariant = "primary" | "ghost" | "danger" | "muted";

export function AdminButton({
  variant = "primary",
  loading,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant; loading?: boolean }) {
  const styles: Record<BtnVariant, string> = {
    primary: "bg-accent text-white hover:bg-accent-deep",
    ghost: "border border-line-2 text-ink hover:border-ink",
    danger: "border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 dark:border-red-400/40 dark:bg-red-500/10",
    muted: "border border-line-2 text-mute hover:text-ink",
  };
  return (
    <button
      {...rest}
      disabled={loading || rest.disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13.5px] font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${rest.className ?? ""}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}

/* ---------- Form fields ---------- */

const inputCls =
  "w-full rounded-xl border border-line-2 bg-paper px-4 py-2.5 text-[14.5px] text-ink placeholder:text-faint outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15";

export function AdminField({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="block font-mono text-[11px] tracking-[0.12em] text-mute uppercase">{label}</span>
      {children}
      {hint && <span className="block text-[12px] text-faint">{hint}</span>}
    </label>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputCls} min-h-[100px] ${props.className ?? ""}`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputCls} ${props.className ?? ""}`} />;
}

export function Checkbox({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2.5 text-[14px] text-ink">
      <input {...rest} type="checkbox" className="h-4 w-4 rounded border-line-2 text-accent focus:ring-accent" />
      {label}
    </label>
  );
}

/* ---------- Status/state helpers ---------- */

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line-2 bg-paper/60 p-10 text-center">
      <h3 className="font-display text-lg font-bold text-ink">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-[14px] text-mute">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingState({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 rounded-2xl border border-line bg-paper py-16 text-mute">
      <Loader2 className="h-4 w-4 animate-spin" /> <span className="text-[13.5px]">{label}</span>
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    new: "bg-accent-tint text-accent",
    contacted: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
    enrolled: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
    rejected: "bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-300",
  };
  const cls = map[status] ?? "bg-line text-mute";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-wide ${cls}`}>
      {status}
    </span>
  );
}

/* ---------- Modal ---------- */

export function AdminModal({
  open,
  onClose,
  title,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6">
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 bg-ink/50 backdrop-blur-[3px]" />
      <div className={`relative w-full ${wide ? "max-w-3xl" : "max-w-lg"} overflow-hidden rounded-2xl border border-line bg-paper shadow-lift`}>
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-lg font-bold text-ink">{title}</h2>
          <button onClick={onClose} className="rounded-full px-2 py-1 text-mute hover:text-ink" aria-label="Close">
            ✕
          </button>
        </div>
        <div className="max-h-[75vh] overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}
