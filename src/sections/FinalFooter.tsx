import { useState } from "react";
import { ArrowRight, CalendarCheck, MapPin, Mail, Clock } from "lucide-react";
import { ApplyButton, Reveal, SparkMark, useApply } from "../components/ui";

/* ================================================================== */
/* SECTION 13 — FINAL CTA                                              */
/* ================================================================== */

export function FinalCTA() {
  return (
    <section id="apply" className="relative overflow-hidden bg-night py-28 text-white lg:py-36">
      <div className="dotgrid-light dotgrid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <SparkMark className="pointer-events-none absolute -right-24 -bottom-24 h-[26rem] w-[26rem] text-accent-bright/10" />
      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 font-mono text-[11px] tracking-[0.24em] text-white/60 uppercase">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent-bright" />
            Batch 01 · 24 Seats Total
          </span>
        </Reveal>
        <Reveal delay={100}>
          <h2 className="mt-8 font-display text-[clamp(2.2rem,5.4vw,4rem)] leading-[1.08] font-bold tracking-tight">
            The best time to start building was yesterday.
            <br />
            The second best time is <span className="text-accent-bright">today.</span>
          </h2>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-white/60">
            Six weeks from now, your child could have a portfolio of real AI projects, the confidence
            of a builder, and a head start on the future. It begins with one application.
          </p>
        </Reveal>
        <Reveal delay={300} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ApplyButton mode="apply" variant="light">
            Apply for Admission
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ApplyButton>
          <CounselGhostButton />
        </Reveal>
        <Reveal delay={380}>
          <p className="mt-8 font-mono text-[11px] tracking-[0.2em] text-white/40 uppercase">
            6 Weeks · 36 Sessions · 8 Students Per Batch · Raigarh
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 14 — FOOTER                                                 */
/* ================================================================== */

function CounselGhostButton() {
  const open = useApply();
  return (
    <button
      onClick={() => open("counsel")}
      className="group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-white ring-1 ring-white/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:ring-white/50"
    >
      <CalendarCheck className="h-4 w-4 text-accent-bright" />
      Book a Free Counseling Session
    </button>
  );
}

function TriangleA({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 22 26" className={className} aria-hidden="true">
      <path d="M11 0 L22 26 L16.6 26 L11 11.4 L5.4 26 L0 26 Z" fill="currentColor" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.2c3.2 0 3.6 0 4.8.07 1.2.06 1.9.25 2.3.42.6.22 1 .48 1.4.9.43.42.7.82.92 1.4.17.44.36 1.1.42 2.3.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.06 1.2-.25 1.86-.42 2.3a3.9 3.9 0 0 1-.91 1.4 3.9 3.9 0 0 1-1.4.91c-.45.17-1.1.36-2.31.42-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.2-.06-1.86-.25-2.3-.42a3.9 3.9 0 0 1-1.4-.91 3.9 3.9 0 0 1-.92-1.4c-.17-.44-.36-1.1-.42-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.58.07-4.85c.06-1.2.25-1.86.42-2.3.22-.6.48-1 .91-1.4.42-.43.82-.7 1.4-.92.44-.17 1.1-.36 2.3-.42C8.42 2.2 8.8 2.2 12 2.2Zm0 1.8c-3.15 0-3.5.01-4.74.07-1.02.05-1.57.22-1.94.36-.49.2-.84.42-1.2.79-.37.36-.6.71-.8 1.2-.14.37-.3.92-.36 1.94C2.9 8.5 2.9 8.85 2.9 12s.01 3.5.07 4.74c.05 1.02.22 1.57.36 1.94.2.49.42.84.79 1.2.36.37.71.6 1.2.8.37.14.92.3 1.94.36 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.02-.05 1.57-.22 1.94-.36.49-.2.84-.42 1.2-.79.37-.36.6-.71.8-1.2.14-.37.3-.92.36-1.94.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.02-.22-1.57-.36-1.94a3.2 3.2 0 0 0-.79-1.2 3.2 3.2 0 0 0-1.2-.8c-.37-.14-.92-.3-1.94-.36C15.5 4 15.15 4 12 4Zm0 3.06A4.94 4.94 0 1 1 7.06 12 4.94 4.94 0 0 1 12 7.06Zm0 1.8A3.14 3.14 0 1 0 15.14 12 3.14 3.14 0 0 0 12 8.86Zm5.14-2.94a1.15 1.15 0 1 1-1.15 1.15 1.15 1.15 0 0 1 1.15-1.15Z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M23.5 7.2a3 3 0 0 0-2.12-2.14C19.5 4.55 12 4.55 12 4.55s-7.5 0-9.38.51A3 3 0 0 0 .5 7.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 4.8 3 3 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3 3 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-4.8ZM9.6 15.6V8.4L15.8 12Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46ZM5.34 7.43a2.06 2.06 0 1 1 2.06-2.06 2.06 2.06 0 0 1-2.06 2.06Zm1.78 13.02H3.56V9h3.56ZM22.22 0H1.77A1.75 1.75 0 0 0 0 1.73v20.54A1.75 1.75 0 0 0 1.77 24h20.45A1.76 1.76 0 0 0 24 22.27V1.73A1.76 1.76 0 0 0 22.22 0Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.6l5.24 6.93Zm-1.3 19.5h2.04L6.5 3.24H4.3Z",
  },
];

export function Footer() {
  const [policy, setPolicy] = useState<"privacy" | "terms" | null>(null);
  const open = useApply();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-night text-white">
      <div className="mx-auto max-w-7xl px-5 pt-20 pb-10 sm:px-8">
        {/* wordmark lockup */}
        <Reveal>
          <div className="flex flex-col items-center border-b border-white/10 pb-14 text-center">
            <div className="flex items-end font-display text-[clamp(2.6rem,7vw,4.5rem)] leading-none font-bold tracking-[0.08em] text-white">
              SP
              <TriangleA className="mx-[0.04em] h-[0.92em] w-[0.82em]" />
              RK
            </div>
            <div className="mt-5 flex w-full max-w-md items-center gap-5">
              <span className="h-px flex-1 bg-white/20" />
              <span className="font-mono text-[13px] font-medium tracking-[0.6em] text-white/70">LABS</span>
              <span className="h-px flex-1 bg-white/20" />
            </div>
            <p className="mt-5 font-mono text-[11px] tracking-[0.3em] text-accent-bright uppercase">
              Learn · Build · Launch
            </p>
          </div>
        </Reveal>

        {/* columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-mono text-[11px] tracking-[0.24em] text-white/40 uppercase">About</h4>
            <p className="mt-4 text-[13.5px] leading-relaxed text-white/60">
              Spark Labs is the AI Learning Laboratory of Charvikon Training &amp; Research Centre —
              transforming complete beginners into confident AI builders through practical,
              project-based education.
            </p>
            <p className="mt-4 text-[12.5px] leading-relaxed text-white/40">
              Mission: beginners in, builders out.
              <br />
              Vision: India&rsquo;s most respected AI lab.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.24em] text-white/40 uppercase">Programs</h4>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              {[
                ["AI Builder Program", "#details"],
                ["The Builder Journey", "#journey"],
                ["Curriculum", "#curriculum"],
                ["What Students Build", "#projects"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="u-link text-white/65 transition-colors hover:text-white">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.24em] text-white/40 uppercase">Admissions</h4>
            <ul className="mt-4 space-y-2.5 text-[13.5px]">
              <li>
                <ApplyButton mode="apply" className="!px-5 !py-2 !text-[12.5px]">
                  Apply for Admission
                </ApplyButton>
              </li>
              <li className="pt-1">
                <a href="#who" className="u-link text-white/65 transition-colors hover:text-white">
                  Who should apply
                </a>
              </li>
              <li>
                <a href="#faq" className="u-link text-white/65 transition-colors hover:text-white">
                  Frequently asked questions
                </a>
              </li>
              <li>
                <button
                  onClick={() => open("counsel")}
                  className="u-link text-white/65 transition-colors hover:text-white"
                >
                  Book a free counseling session
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[11px] tracking-[0.24em] text-white/40 uppercase">
              Location &amp; Contact
            </h4>
            <ul className="mt-4 space-y-3 text-[13.5px] text-white/65">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent-bright" />
                <span>
                  Charvikon Training &amp; Research Centre,
                  <br />
                  Raigarh, Chhattisgarh, India
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent-bright" />
                <a href="mailto:admissions@sparklabs.in" className="u-link hover:text-white">
                  admissions@sparklabs.in
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-accent-bright" />
                Mon – Sat · 3 batches daily
              </li>
            </ul>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-bright hover:text-accent-bright"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* legal */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-[12.5px] text-white/40">
              © {new Date().getFullYear()} Charvikon Training &amp; Research Centre · Spark Labs. All
              rights reserved.
            </p>
            <div className="flex gap-6 text-[12.5px]">
              <button
                onClick={() => setPolicy(policy === "privacy" ? null : "privacy")}
                className="u-link text-white/50 transition-colors hover:text-white"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setPolicy(policy === "terms" ? null : "terms")}
                className="u-link text-white/50 transition-colors hover:text-white"
              >
                Terms
              </button>
            </div>
          </div>
          <div
            className={`grid transition-[grid-template-rows] duration-300 ${
              policy ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="max-w-3xl pt-4 text-[12.5px] leading-relaxed text-white/40">
                {policy === "privacy"
                  ? "Privacy Policy — We collect only the student name, age and parent contact details submitted through this site, and use them solely to respond to admissions and counseling requests. We never sell or share your information with third parties."
                  : "Terms — Spark Labs is an in-person educational program run by Charvikon Training & Research Centre. Fees cover all 36 sessions, materials and certification. Batch seats are confirmed on a first-come, first-served basis, limited to eight students per batch."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
