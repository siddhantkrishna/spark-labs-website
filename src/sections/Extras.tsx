import { Link } from "react-router-dom";
import {
  Quote,
  ShieldCheck,
  Users,
  Award,
  Eye,
  HeartHandshake,
  MapPin,
  FileCheck2,
  CalendarClock,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ApplyButton, Reveal, SectionHead } from "@/components/ui";
import { MENTORS, PROGRAM, SITE } from "@/constants/site";
import { useTestimonials } from "@/hooks/useContent";

/* ------------------------------------------------------------------ */
/* Trust bar                                                           */
/* ------------------------------------------------------------------ */

const TRUST = [
  { icon: Users, label: "Max 16 per batch" },
  { icon: ShieldCheck, label: "Beginner-safe" },
  { icon: Award, label: "Certificate + Portfolio" },
  { icon: MapPin, label: "In-person, Raigarh" },
];

export function TrustBar() {
  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-line px-5 sm:grid-cols-4 sm:divide-x sm:px-8">
        {TRUST.map((t) => (
          <div key={t.label} className="flex items-center justify-center gap-3 px-4 py-6 text-center">
            <t.icon className="h-5 w-5 shrink-0 text-accent" />
            <span className="text-[13.5px] font-semibold text-ink">{t.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Social proof / testimonials                                         */
/* ------------------------------------------------------------------ */

export function SocialProof() {
  const { data: testimonials } = useTestimonials();
  return (
    <section id="testimonials" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          center
          index="★"
          label="What Families Say"
          title="Parents notice the confidence. Students notice what they can build."
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 90}>
              <figure className="flex h-full flex-col rounded-2xl border border-line bg-white p-8 shadow-card">
                <Quote className="h-7 w-7 text-accent/30" />
                <blockquote className="mt-4 flex-1 text-[15.5px] leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-accent-tint font-mono text-[12px] font-semibold text-accent">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-[14px] font-semibold text-ink">{t.name}</span>
                    <span className="block font-mono text-[11px] tracking-wide text-faint">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Founder message                                                     */
/* ------------------------------------------------------------------ */

export function FounderMessage() {
  return (
    <section id="founder" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="dotgrid-light dotgrid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <Reveal>
          <div className="mx-auto flex max-w-xs flex-col items-center rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
            <span className="grid h-24 w-24 place-items-center rounded-full bg-accent-bright/15 font-display text-3xl font-bold text-accent-bright">
              SK
            </span>
            <h3 className="mt-5 font-display text-lg font-bold text-white">Siddhant Krishna</h3>
            <p className="mt-1 text-[13px] font-semibold text-white/80">Founder &amp; CEO, Spark Labs</p>
            <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-white/50 uppercase">
              {SITE.legalName}
            </p>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-accent-bright uppercase">
            <span className="h-px w-8 bg-accent-bright/40" /> A note from the founder
          </p>
          <blockquote className="mt-6 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.3] font-medium text-white">
            &ldquo;I started Spark Labs because the students of Raigarh deserve the same head start as
            students anywhere in the world. AI won&rsquo;t wait for the syllabus to catch up &mdash; so
            we teach children to build with it today, from first principles, one real project at a
            time.&rdquo;
          </blockquote>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/60">
            Our promise to every parent is simple: your child will leave not just knowing about AI,
            but genuinely able to build with it &mdash; with the confidence, portfolio and mindset to
            keep going long after the six weeks end.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Why parents trust                                                   */
/* ------------------------------------------------------------------ */

const TRUST_REASONS = [
  { icon: Users, t: "Genuinely small batches", d: "A hard cap of sixteen students means your child is never a face in the crowd." },
  { icon: Eye, t: "Full transparency", d: "You see exactly what's taught, what's built, and what your child ships each week." },
  { icon: ShieldCheck, t: "A safe, focused space", d: "An in-person lab with a code of conduct — structured, supervised and screen-purposeful." },
  { icon: HeartHandshake, t: "Real mentorship", d: "Mentors who build, giving direct feedback on both the work and the thinking." },
  { icon: Award, t: "Tangible outcomes", d: "A certificate, a live portfolio and documented projects — proof, not just promises." },
  { icon: FileCheck2, t: "Fair, clear policy", d: "Honest fees, a real refund policy, and no lock-in tactics. Committed builders only." },
];

export function WhyParentsTrust() {
  return (
    <section id="trust" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="◆"
          label="Why Parents Trust Spark Labs"
          title="Built to earn a parent's confidence."
          copy="Choosing where your child learns is a serious decision. Here's how we've designed Spark Labs to be worthy of that trust."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TRUST_REASONS.map((r, i) => (
            <Reveal key={r.t} delay={(i % 3) * 80}>
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <r.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-[15.5px] font-bold tracking-tight text-ink">{r.t}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-mute">{r.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mentors                                                             */
/* ------------------------------------------------------------------ */

export function Mentors() {
  return (
    <section id="mentors" className="relative border-t border-line bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="✦"
          label="Meet the Mentors"
          title="Builders who teach — not lecturers who theorise."
          copy="Every mentor at Spark Labs builds real things with AI. That's the only way to teach building credibly."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {MENTORS.map((m, i) => (
            <Reveal key={m.name} delay={i * 100}>
              <article className="flex h-full flex-col rounded-2xl border border-line bg-paper p-8 shadow-card">
                <span className="grid h-16 w-16 place-items-center rounded-2xl bg-ink font-display text-xl font-bold text-white">
                  {m.initials}
                </span>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{m.name}</h3>
                <p className="mt-0.5 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                  {m.role}
                </p>
                <p className="mt-4 flex-1 text-[14px] leading-relaxed text-mute">{m.bio}</p>
                <p className="mt-5 inline-flex items-center gap-2 border-t border-line pt-4 text-[12.5px] font-semibold text-ink">
                  <Sparkles className="h-3.5 w-3.5 text-accent" /> {m.focus}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Learning environment / gallery                                      */
/* ------------------------------------------------------------------ */

const GALLERY = [
  { src: "PASTE_YOUR_URL_HERE_1", alt: "Students collaborating on laptops with a mentor", span: "lg:col-span-2 lg:row-span-2" },
  { src: "PASTE_YOUR_URL_HERE_2", alt: "Students studying together with laptops and notebooks", span: "" },
  { src: "PASTE_YOUR_URL_HERE_3", alt: "A mentor teaching at a whiteboard", span: "" },
  { src: "PASTE_YOUR_URL_HERE_4", alt: "Focused students working at desks in class", span: "" },
  { src: "PASTE_YOUR_URL_HERE_5", alt: "Mentor working through a problem one-on-one", span: "" },
];

export function LearningEnvironment() {
  return (
    <section id="gallery" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="❖"
          label="The Learning Environment"
          title="A real lab. Real screens. Real building."
          copy="No stock-photo fantasy — just a focused, in-person space in Raigarh where beginners become builders."
        />
        <div className="mt-14 grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={(i % 4) * 70} className={`${g.span} overflow-hidden rounded-2xl`}>
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                className="h-full w-full rounded-2xl border border-line object-cover transition-transform duration-700 hover:scale-105"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Admissions process                                                  */
/* ------------------------------------------------------------------ */

const STEPS = [
  { t: "Apply online", d: "Fill the admissions form — it takes two minutes. No test, no coding required.", icon: FileCheck2 },
  { t: "Free counseling", d: "We call to understand your child's interests and answer every question.", icon: CalendarClock },
  { t: "Lab visit & seat", d: "Visit the lab, meet a mentor, and confirm one of the sixteen seats in your batch.", icon: MapPin },
  { t: "Start building", d: "Begin the six-week journey and ship your first project in week one.", icon: Sparkles },
];

export function AdmissionsProcess() {
  return (
    <section id="process" className="relative border-t border-line bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="→"
          label="Admissions Process"
          title="Four simple steps to a seat."
          copy={`Seats are limited to ${PROGRAM.batchSize} per batch, so batches fill in order of application. Here's exactly how it works.`}
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.t} delay={i * 90}>
              <div className="group relative h-full rounded-2xl border border-line bg-paper p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-bold text-line-2">{i + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-[16px] font-bold tracking-tight text-ink">{s.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-mute">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/admissions"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep"
          >
            Start your application
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <ApplyButton mode="counsel" variant="ghost">
            <CalendarClock className="h-4 w-4 text-accent" /> Book a free counseling session
          </ApplyButton>
        </Reveal>
      </div>
    </section>
  );
}
