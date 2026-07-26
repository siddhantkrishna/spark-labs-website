import {
  Brain,
  Command,
  Telescope,
  Type,
  Camera,
  Clapperboard,
  Zap,
  Globe,
  Palette,
  Presentation,
  Gauge,
  Briefcase,
  Rocket,
  TrendingUp,
  MessagesSquare,
  BookOpen,
  UserCheck,
  HeartHandshake,
  Hammer,
  MessageSquare,
  ShieldCheck,
  Layers,
  Mic,
  Award,
  FileText,
  Users,
  Map as MapIcon,
} from "lucide-react";
import { Reveal, SectionHead } from "../components/ui";

/* ================================================================== */
/* SECTION 7 — CURRICULUM                                              */
/* ================================================================== */

const TOPICS = [
  { icon: Brain, t: "Artificial Intelligence" },
  { icon: Command, t: "Prompt Engineering" },
  { icon: Telescope, t: "AI Research" },
  { icon: Type, t: "AI Writing" },
  { icon: Camera, t: "AI Images" },
  { icon: Clapperboard, t: "AI Video" },
  { icon: Zap, t: "Automation" },
  { icon: Globe, t: "Website Creation" },
  { icon: Palette, t: "Design" },
  { icon: Presentation, t: "Presentations" },
  { icon: Gauge, t: "Productivity" },
  { icon: Briefcase, t: "Portfolio" },
  { icon: Rocket, t: "Entrepreneurship" },
  { icon: TrendingUp, t: "Career Skills" },
  { icon: MessagesSquare, t: "Communication" },
  { icon: BookOpen, t: "Documentation" },
];

export function Curriculum() {
  return (
    <section id="curriculum" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          center
          index="06"
          label="Curriculum"
          title="Sixteen disciplines. One integrated build."
          copy="The curriculum isn't a list of subjects — it's a stack of capabilities. Each topic feeds directly into the projects students are shipping that same week."
        />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {TOPICS.map((t, i) => (
            <Reveal key={t.t} delay={(i % 4) * 70}>
              <div className="group flex items-center gap-4 rounded-xl border border-line bg-white px-5 py-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <t.icon className="h-[18px] w-[18px]" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-[14.5px] font-bold tracking-tight text-ink">
                    {t.t}
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-faint uppercase">
                    Module {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 8 — WHY SMALL BATCHES                                       */
/* ================================================================== */

const BATCH_BENEFITS = [
  { icon: UserCheck, t: "Individual attention", d: "No student hides in the back row. Every builder is seen, every session." },
  { icon: HeartHandshake, t: "True mentorship", d: "Mentors know each student's strengths, gaps and pace by name." },
  { icon: Hammer, t: "Better projects", d: "Deep feedback on every build means work that's genuinely portfolio-grade." },
  { icon: MessageSquare, t: "More feedback", d: "Eight students means every voice gets heard and every question answered." },
  { icon: ShieldCheck, t: "Higher confidence", d: "A small room is a safe room — where beginners dare to try and fail." },
];

export function SmallBatches() {
  return (
    <section id="batches" className="relative border-t border-line bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid overflow-hidden rounded-3xl border border-line shadow-card lg:grid-cols-[0.85fr_1.15fr]">
          {/* big number panel */}
          <Reveal className="relative flex flex-col justify-between overflow-hidden bg-accent p-10 text-white sm:p-14">
            <div className="dotgrid-light pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
            <div className="relative">
              <span className="font-mono text-[11px] tracking-[0.28em] text-white/60 uppercase">
                07 · Why small batches
              </span>
              <div className="mt-8 font-display text-[clamp(6rem,14vw,11rem)] leading-none font-bold tracking-tighter">
                8
              </div>
              <p className="mt-4 max-w-xs font-display text-xl leading-snug font-medium">
                students per lab.
                <br />
                Never one more.
              </p>
            </div>
            <p className="relative mt-10 max-w-sm text-[14px] leading-relaxed text-white/70">
              Most institutes scale by packing rooms. We scale by running three small labs a day —
              because attention doesn&rsquo;t scale, and attention is the product.
            </p>
          </Reveal>

          {/* benefits */}
          <div className="bg-paper p-10 sm:p-14">
            <h3 className="font-display text-2xl font-bold tracking-tight text-ink">
              What eight makes possible
            </h3>
            <ul className="mt-8 space-y-6">
              {BATCH_BENEFITS.map((b, i) => (
                <Reveal as="li" key={b.t} delay={i * 70} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent">
                    <b.icon className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <h4 className="font-display text-[15.5px] font-bold tracking-tight text-ink">{b.t}</h4>
                    <p className="mt-1 text-[14px] leading-relaxed text-mute">{b.d}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 9 — WHAT STUDENTS RECEIVE                                   */
/* ================================================================== */

const RECEIVE = [
  { icon: Globe, t: "Professional Portfolio", d: "A live personal site showcasing every project built." },
  { icon: Layers, t: "Multiple AI Projects", d: "10+ working builds across text, image, video and automation." },
  { icon: Mic, t: "Presentation Experience", d: "Real stage time presenting at Demo Day." },
  { icon: BookOpen, t: "Builder Handbook", d: "A field manual for thinking, prompting and building." },
  { icon: Award, t: "Certificate", d: "Completion certificate from Charvikon Training & Research Centre." },
  { icon: FileText, t: "Project Documentation", d: "Written specs and retros for every single build." },
  { icon: HeartHandshake, t: "Mentorship", d: "Direct, in-person access to mentors who build." },
  { icon: Users, t: "Community", d: "A batch of eight builders who push each other forward." },
  { icon: MapIcon, t: "Future Learning Roadmap", d: "A clear plan for exactly what to learn after Demo Day." },
];

export function Receive() {
  return (
    <section id="receive" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          index="08"
          label="What Students Receive"
          title="Students leave with proof, not promises."
          copy="A certificate alone is paper. Every graduate leaves with a body of evidence — projects, documentation, presentations and a plan — that demonstrates capability to anyone who looks."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {RECEIVE.map((r, i) => (
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
