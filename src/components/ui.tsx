import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { X, Check, ArrowRight, CalendarCheck } from "lucide-react";
import { Link } from "react-router-dom";

/* ------------------------------------------------------------------ */
/* Scroll reveal                                                       */
/* ------------------------------------------------------------------ */

export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "span" | "article";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${inView ? "is-in" : ""} ${className}`}
      style={{ ["--rd" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Count-up number                                                     */
/* ------------------------------------------------------------------ */

export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.5);
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Brand marks                                                         */
/* ------------------------------------------------------------------ */

export function SparkMark({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 2l3.1 10.2L29.5 16l-10.4 3.8L16 30l-3.1-10.2L2.5 16l10.4-3.8z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="group flex items-center" aria-label="Spark Labs — home">
      <img
        src="/spark-icon.png"
        alt="Spark Labs"
        className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Section header                                                      */
/* ------------------------------------------------------------------ */

export function SectionHead({
  index,
  label,
  title,
  copy,
  dark = false,
  center = false,
}: {
  index: string;
  label: string;
  title: ReactNode;
  copy?: ReactNode;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <div
        className={`flex items-center gap-4 font-mono text-[11px] font-medium tracking-[0.28em] uppercase ${
          center ? "justify-center" : ""
        } ${dark ? "text-white/50" : "text-faint"}`}
      >
        <span className={dark ? "text-accent-bright" : "text-accent"}>{index}</span>
        <span className={`h-px w-10 ${dark ? "bg-white/20" : "bg-line-2"}`} />
        <span>{label}</span>
      </div>
      <h2
        className={`mt-6 font-display text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.06] font-bold tracking-tight ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {copy && (
        <p
          className={`mt-5 text-[17px] leading-relaxed ${
            dark ? "text-white/60" : "text-mute"
          }`}
        >
          {copy}
        </p>
      )}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Apply / counseling modal context                                    */
/* ------------------------------------------------------------------ */

type ModalMode = "apply" | "counsel" | null;
const ModalCtx = createContext<(m: Exclude<ModalMode, null>) => void>(() => {});
export const useApply = () => useContext(ModalCtx);

export function ApplyProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ModalMode>(null);
  const open = useCallback((m: Exclude<ModalMode, null>) => setMode(m), []);

  useEffect(() => {
    document.body.style.overflow = mode ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMode(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [mode]);

  return (
    <ModalCtx.Provider value={open}>
      {children}
      {mode && <ApplyModal mode={mode} onClose={() => setMode(null)} />}
    </ModalCtx.Provider>
  );
}

function ApplyModal({ mode, onClose }: { mode: "apply" | "counsel"; onClose: () => void }) {
  const [form, setForm] = useState({ name: "", age: "", phone: "", note: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (form.name.trim().length < 2) errs.name = "Please enter the student's name.";
    const age = Number(form.age);
    if (!form.age || Number.isNaN(age) || age < 10 || age > 22)
      errs.age = "Age must be between 13 and 18 for this batch.";
    if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      errs.phone = "Enter a valid 10-digit mobile number.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setDone(true);
  };

  const isApply = mode === "apply";

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 bg-ink/50 backdrop-blur-[3px]"
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-t-2xl bg-paper shadow-2xl sm:rounded-2xl">
        <div className="flex items-start justify-between border-b border-line px-7 py-5">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] uppercase text-accent">
              {isApply ? <ArrowRight className="h-3 w-3" /> : <CalendarCheck className="h-3 w-3" />}
              {isApply ? "Admissions · Batch 01" : "Free Counseling"}
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
              {isApply ? "Apply for Admission" : "Book a Counseling Session"}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full border border-line text-mute transition hover:border-ink hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {done ? (
          <div className="px-7 py-12 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent-tint text-accent">
              <Check className="h-6 w-6" />
            </span>
            <h4 className="mt-5 font-display text-xl font-bold text-ink">
              {isApply ? "Application received." : "Session requested."}
            </h4>
            <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-mute">
              Thank you, {form.name.split(" ")[0]}. Our admissions team will call{" "}
              <span className="font-mono text-ink">+91 {form.phone}</span> within 24 hours to
              {isApply ? " schedule your lab visit and complete enrollment." : " confirm a convenient time for your free counseling session."}
            </p>
            <button
              onClick={onClose}
              className="mt-7 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-4 px-7 py-6" noValidate>
            <Field label="Student name" error={errors.name}>
              <input
                value={form.name}
                onChange={set("name")}
                placeholder="e.g. Aarav Sharma"
                className={inputCls(!!errors.name)}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Student age" error={errors.age}>
                <input
                  value={form.age}
                  onChange={set("age")}
                  inputMode="numeric"
                  placeholder="13 – 18"
                  className={inputCls(!!errors.age)}
                />
              </Field>
              <Field label="Parent's mobile" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={set("phone")}
                  inputMode="tel"
                  placeholder="10-digit number"
                  className={inputCls(!!errors.phone)}
                />
              </Field>
            </div>
            <Field label={isApply ? "Anything we should know? (optional)" : "Preferred day / time (optional)"}>
              <textarea
                value={form.note}
                onChange={set("note")}
                rows={2}
                placeholder={isApply ? "Interests, questions, goals…" : "e.g. Saturday morning"}
                className={`${inputCls(false)} resize-none`}
              />
            </Field>
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[15px] font-semibold text-white shadow-lift transition hover:bg-accent-deep"
            >
              {isApply ? "Submit Application" : "Request Session"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-center font-mono text-[11px] text-faint">
              Max 8 seats per batch · 3 batches per day · Raigarh, Chhattisgarh
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls = (err: boolean) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-[15px] text-ink placeholder:text-faint outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/15 ${
    err ? "border-red-400" : "border-line-2"
  }`;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[11px] font-medium tracking-[0.14em] uppercase text-mute">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function ApplyButton({
  mode = "apply",
  variant = "primary",
  className = "",
  children,
}: {
  mode?: "apply" | "counsel";
  variant?: "primary" | "ghost" | "light";
  className?: string;
  children: ReactNode;
}) {
  const open = useApply();
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300";
  const styles = {
    primary:
      "bg-accent px-7 py-3.5 text-[15px] text-white shadow-lift hover:bg-accent-deep hover:-translate-y-0.5",
    ghost:
      "border border-line-2 bg-white px-7 py-3.5 text-[15px] text-ink hover:border-ink hover:-translate-y-0.5",
    light:
      "bg-white px-7 py-3.5 text-[15px] text-ink hover:bg-accent-tint hover:-translate-y-0.5",
  }[variant];
  return (
    <button onClick={() => open(mode)} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
}
