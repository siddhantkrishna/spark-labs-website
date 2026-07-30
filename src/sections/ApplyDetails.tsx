import { useState } from "react";
import {
  Sprout,
  Compass,
  Palette,
  Hammer,
  Lightbulb,
  Cog,
  Plus,
  Check,
  MapPin,
  ArrowRight,
  CalendarCheck,
} from "lucide-react";
import { ApplyButton, Reveal, SectionHead, useApply } from "../components/ui";

/* ================================================================== */
/* SECTION 10 — WHO SHOULD APPLY                                       */
/* ================================================================== */

const TRAITS = [
  { icon: Sprout, t: "Complete Beginner", d: "Never written a line of code. Perfect — no habits to unlearn." },
  { icon: Compass, t: "The Curious", d: "Asks 'what if' and 'why' more often than 'can I go now'." },
  { icon: Palette, t: "The Creative", d: "Loves making things — now with superpowers attached." },
  { icon: Hammer, t: "The Builder", d: "Would rather make it than just read about it." },
  { icon: Lightbulb, t: "The Entrepreneur", d: "Already has ideas. This is where they become real." },
  { icon: Cog, t: "The Future Engineer", d: "Wants to understand how things actually work." },
];

export function Who() {
  return (
    <section id="who" className="relative border-t border-line bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionHead
            index="09"
            label="Who Should Apply"
            title={
              <>
                Built for beginners.
                <br />
                Seriously.
              </>
            }
            copy="Spark Labs was designed for students with zero coding or AI experience. If your child is between 13 and 18 and even slightly curious about how the future is being built, they belong in this lab."
          />
          <Reveal delay={180}>
            <p className="mt-8 inline-flex items-center gap-3 rounded-2xl border border-accent/25 bg-accent-tint px-6 py-4 font-display text-[15px] font-semibold text-accent">
              <Check className="h-5 w-5" strokeWidth={3} />
              No coding experience required. None.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {TRAITS.map((tr, i) => (
            <Reveal key={tr.t} delay={(i % 2) * 90}>
              <div className="group h-full rounded-2xl border border-line bg-paper p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <tr.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[15.5px] font-bold tracking-tight text-ink">{tr.t}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-mute">{tr.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 11 — PROGRAM DETAILS                                        */
/* ================================================================== */

const SPECS: [string, string][] = [
  ["Program", "AI Builder Program"],
  ["Duration", "6 Weeks"],
  ["Sessions", "36 Live Practical Sessions"],
  ["Mode", "Offline · In-Person"],
  ["Batch Size", "Max 16 Students"],
  ["Batches", "3 Per Day"],
  ["Age Group", "13 – 18 Years"],
  ["Experience", "None Required"],
  ["Location", "Raigarh, Chhattisgarh"],
];

const INCLUDED = [
  "All 36 live lab sessions",
  "1-on-1 mentor feedback",
  "Builder Handbook & tools",
  "Certificate + Demo Day",
];

export function Details() {
  return (
    <section id="details" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="10"
          label="Program Details"
          title="Everything you need to know, on one sheet."
        />
        <div className="mt-14 grid overflow-hidden rounded-3xl border border-line shadow-card lg:grid-cols-[1.2fr_0.8fr]">
          {/* spec sheet */}
          <Reveal className="bg-white p-8 sm:p-12">
            <h3 className="flex items-center gap-2 font-mono text-[11px] tracking-[0.24em] text-faint uppercase">
              <MapPin className="h-3.5 w-3.5 text-accent" /> Program Specification
            </h3>
            <dl className="mt-7 divide-y divide-line">
              {SPECS.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="font-mono text-[12px] tracking-[0.14em] text-faint uppercase">{k}</dt>
                  <dd className="text-right font-display text-[15px] font-semibold text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* fee panel */}
          <Reveal delay={140} className="relative flex flex-col justify-between overflow-hidden bg-ink p-8 text-white sm:p-12">
            <div className="dotgrid-light pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative">
              <span className="font-mono text-[11px] tracking-[0.24em] text-white/50 uppercase">
                Program Fee
              </span>
              <div className="mt-4 flex items-end gap-2">
                <span className="font-display text-[clamp(3rem,6vw,4.25rem)] leading-none font-bold tracking-tight">
                  ₹20,000
                </span>
              </div>
              <p className="mt-2 text-[14px] text-white/60">
                Complete six-week program · everything included
              </p>
              <ul className="mt-8 space-y-3">
                {INCLUDED.map((inc) => (
                  <li key={inc} className="flex items-center gap-3 text-[14px] text-white/85">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-accent-bright">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {inc}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mt-10 space-y-3">
              <ApplyButton mode="apply" variant="light" className="w-full">
                Apply for Admission <ArrowRight className="h-4 w-4" />
              </ApplyButton>
              <CounselLink />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CounselLink() {
  const open = useApply();
  return (
    <button
      onClick={() => open("counsel")}
      className="u-link flex w-full items-center justify-center gap-2 py-2 text-[13.5px] font-semibold text-white/70 transition-colors hover:text-white"
    >
      <CalendarCheck className="h-4 w-4" /> Book a free counseling session first
    </button>
  );
}

/* ================================================================== */
/* SECTION 12 — FAQ                                                    */
/* ================================================================== */

const FAQS = [
  {
    q: "Who is this program for?",
    a: "Students aged 13 to 18 who want to understand and build with AI — regardless of their current skill level. The program is deliberately designed so complete beginners and tech-curious students can thrive side by side.",
  },
  {
    q: "Does my child need to know how to code?",
    a: "No. The program assumes zero coding experience and starts from first principles. Many of the most powerful AI tools require no code at all — and we teach the thinking that matters far more than syntax.",
  },
  {
    q: "Will students actually build real projects?",
    a: "Yes — that's the entire point. Every student ships 10+ working projects: chatbots, automation systems, generators, websites and a self-chosen capstone presented live at Demo Day.",
  },
  {
    q: "What if my child is a complete beginner?",
    a: "Then this program was built for them. Week 1 assumes nothing. The sixteen-step teaching loop is specifically engineered to take a student from zero to confident builder in six weeks.",
  },
  {
    q: "What should my child bring to class?",
    a: "Curiosity and a notebook. The lab is set up for hands-on work. If your child owns a laptop they're welcome to bring it — it makes taking projects home easier, but it isn't mandatory.",
  },
  {
    q: "How are classes conducted?",
    a: "Entirely offline and in-person at our Raigarh lab. 36 practical sessions across six weeks, in batches of at most sixteen students, following the same disciplined build loop every single class.",
  },
  {
    q: "Will my child receive a certificate?",
    a: "Yes — a completion certificate from Charvikon Training & Research Centre. More importantly, they leave with a live portfolio and documented projects, which carry far more weight than any certificate.",
  },
  {
    q: "How many students are in each batch?",
    a: "A maximum of sixteen. Never more. We run up to three batches per day so every student gets genuine mentorship, feedback and stage time.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section id="faq" className="relative border-t border-line bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            index="11"
            label="FAQ"
            title="Questions parents ask us most."
            copy="Anything else on your mind? A free counseling session is the fastest way to get a straight answer."
          />
          <Reveal delay={160}>
            <ApplyButton mode="counsel" variant="ghost" className="mt-8">
              <CalendarCheck className="h-4 w-4 text-accent" /> Book a Free Session
            </ApplyButton>
          </Reveal>
        </div>
        <div className="divide-y divide-line border-y border-line">
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={f.q} delay={i * 40}>
                <button
                  onClick={() => setOpenIdx(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`font-display text-[16.5px] font-bold tracking-tight transition-colors ${open ? "text-accent" : "text-ink"}`}>
                    {f.q}
                  </span>
                  <span
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                      open ? "rotate-45 border-accent bg-accent text-white" : "border-line-2 text-mute"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-7 text-[15px] leading-relaxed text-mute">{f.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
