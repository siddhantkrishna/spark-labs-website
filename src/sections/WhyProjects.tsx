import {
  X as XIcon,
  Check,
  Bot,
  FileText,
  Image,
  Globe,
  Search,
  Workflow,
  PenLine,
  Rocket,
  Presentation,
  ListTodo,
  Lightbulb,
  Hammer,
  Sparkles,
} from "lucide-react";
import { Reveal, SectionHead } from "../components/ui";

/* ================================================================== */
/* SECTION 2 — WHY SPARK LABS                                          */
/* ================================================================== */

const TRADITIONAL = [
  "Memorizing definitions for an exam",
  "One grade at the end of the term",
  "Theory first — practice, maybe later",
  "Following instructions step by step",
  "40 students, one fixed pace",
  "Knowledge that expires quickly",
];

const BUILDER = [
  "Building products that actually work",
  "A portfolio that grows every single week",
  "Practice first — theory exactly when needed",
  "Solving open-ended, real-world problems",
  "8 builders, personal mentorship",
  "Skills that compound for a lifetime",
];

const OUTCOMES = ["Projects", "Problem Solving", "Creativity", "Critical Thinking", "Portfolio", "Real Skills"];

export function Why() {
  return (
    <section id="why" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <SectionHead
            index="01"
            label="Why Spark Labs"
            title={
              <>
                School teaches about the world that was.
                <span className="text-accent"> We build for the one arriving.</span>
              </>
            }
            copy="AI is changing every industry faster than any syllabus can be rewritten. Traditional education was designed for a stable world — Spark Labs was designed for this one. We don't prepare students to answer questions. We prepare them to build answers."
          />
          <Reveal delay={150}>
            <figure className="relative">
              <div className="overflow-hidden rounded-2xl border border-line shadow-card">
                <img
                  src="https://wghldtfppulcwhqjacnl.supabase.co/storage/v1/object/public/media/1785167608385-a4b8ce49-6584-47e8-9726-a21ec77798ca.png"
                  alt="Students collaborating on laptops with a mentor guiding them"
                  className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
                <span className="h-px w-6 bg-line-2" />
                Inside the lab · learning by doing
              </figcaption>
            </figure>
          </Reveal>
        </div>

        {/* comparison */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-white p-8 sm:p-10">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-bold text-faint">Traditional Learning</h3>
                <span className="font-mono text-[11px] tracking-[0.2em] text-faint uppercase">The old way</span>
              </div>
              <ul className="mt-7 space-y-4">
                {TRADITIONAL.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] text-faint">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-line/70 text-mute">
                      <XIcon className="h-3 w-3" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="relative h-full overflow-hidden rounded-2xl bg-ink p-8 shadow-lift sm:p-10">
              <div className="dotgrid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <h3 className="flex items-center gap-2 font-display text-xl font-bold text-white">
                    <Sparkles className="h-4 w-4 text-accent-bright" />
                    Builder Learning
                  </h3>
                  <span className="rounded-full bg-accent-bright/20 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-accent-bright uppercase">
                    The Spark way
                  </span>
                </div>
                <ul className="mt-7 space-y-4">
                  {BUILDER.map((t) => (
                    <li key={t} className="flex items-start gap-3 text-[15px] text-white/85">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-bright text-white">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* outcome chips */}
        <Reveal delay={100} className="mt-10 flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">What this develops —</span>
          {OUTCOMES.map((o, i) => (
            <span
              key={o}
              className="rounded-full border border-line-2 bg-white px-4 py-1.5 text-[13px] font-semibold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              style={{ transitionDelay: `${i * 20}ms` }}
            >
              {o}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 3 — WHAT STUDENTS BUILD                                     */
/* ================================================================== */

type Project = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  problem: string;
  tools: string;
  outcome: string;
};

const PROJECTS: Project[] = [
  {
    title: "AI Chatbot",
    icon: Bot,
    problem: "Local businesses lose customers after closing hours.",
    tools: "LLM APIs · Prompt design",
    outcome: "A bot that answers, books and sells — 24/7.",
  },
  {
    title: "AI Resume Builder",
    icon: FileText,
    problem: "Talented students with invisible resumes.",
    tools: "AI writing · Smart templates",
    outcome: "Resumes that pass humans and ATS filters.",
  },
  {
    title: "AI Image Generator",
    icon: Image,
    problem: "Great ideas stuck inside your head.",
    tools: "Text-to-image models",
    outcome: "A tool that turns plain prompts into visuals.",
  },
  {
    title: "Personal Portfolio Website",
    icon: Globe,
    problem: "Nowhere to prove what you can actually do.",
    tools: "HTML/CSS · AI-assisted design",
    outcome: "A live site that becomes your evidence.",
  },
  {
    title: "AI Research Assistant",
    icon: Search,
    problem: "Hours lost digging through scattered sources.",
    tools: "AI research · Summarization",
    outcome: "Structured briefs in minutes, not evenings.",
  },
  {
    title: "Business Automation",
    icon: Workflow,
    problem: "Repetitive work eating up real work.",
    tools: "Workflow automation · APIs",
    outcome: "Boring tasks handled while you sleep.",
  },
  {
    title: "AI Content Generator",
    icon: PenLine,
    problem: "Blank pages and deadlines that don't wait.",
    tools: "AI writing · Human editing",
    outcome: "First drafts in seconds — polished by you.",
  },
  {
    title: "Launch Landing Page",
    icon: Rocket,
    problem: "Ideas that deserve more than a notebook.",
    tools: "AI design · Web tooling",
    outcome: "A page that puts an idea in front of the world.",
  },
  {
    title: "Presentation Generator",
    icon: Presentation,
    problem: "Good work delivered forgettably.",
    tools: "AI slides · Visual design",
    outcome: "Decks that make a room lean in.",
  },
  {
    title: "Smart Productivity Assistant",
    icon: ListTodo,
    problem: "School, hobbies, chaos — no system.",
    tools: "AI agents · Automation",
    outcome: "A personal system that runs your week.",
  },
  {
    title: "AI Video Storyteller",
    icon: Lightbulb,
    problem: "Stories that never leave the script.",
    tools: "AI video · Editing flow",
    outcome: "Short films generated from your ideas.",
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-line bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            index="02"
            label="What Students Build"
            title={
              <>
                Ten real projects.
                <br />
                Zero toy examples.
              </>
            }
            copy="Every project starts with a real problem someone actually has. Students choose the tools, make the calls, break things, fix them, and ship. By Demo Day, this grid is their portfolio."
          />
          <Reveal delay={150} className="hidden lg:block">
            <p className="max-w-[200px] border-l-2 border-accent pl-4 font-mono text-[12px] leading-relaxed tracking-wide text-mute">
              EACH CARD BELOW IS A WEEK OF REAL BUILDING — NOT A HOMEWORK ASSIGNMENT.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 90}>
              <article className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-tint text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-faint">
                    P{String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-ink">{p.title}</h3>
                <dl className="mt-4 space-y-3 text-[13.5px] leading-relaxed">
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">Problem</dt>
                    <dd className="mt-0.5 text-mute">{p.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">Tools</dt>
                    <dd className="mt-0.5 font-medium text-ink">{p.tools}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">Outcome</dt>
                    <dd className="mt-0.5 font-medium text-ink">{p.outcome}</dd>
                  </div>
                </dl>
              </article>
            </Reveal>
          ))}

          {/* capstone card */}
          <Reveal delay={180}>
            <article className="flex h-full flex-col justify-between rounded-2xl border-2 border-dashed border-line-2 bg-transparent p-7 transition-colors duration-300 hover:border-accent">
              <div>
                <span className="font-mono text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
                  P12 · Capstone
                </span>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink">
                  Your own idea.
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-mute">
                  The final project is yours to define. You pick the problem, scope the build, and
                  present it at Demo Day in front of parents and mentors.
                </p>
              </div>
              <span className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold text-accent">
                <Hammer className="h-4 w-4" /> Built in Weeks 5–6
              </span>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
