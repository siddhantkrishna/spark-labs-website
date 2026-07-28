import {
  Atom,
  Puzzle,
  Network,
  GraduationCap,
  MessageSquareCode,
  NotebookPen,
  Bug,
  Scale,
  ArrowDown,
  Flag,
} from "lucide-react";
import { Reveal, SectionHead, useInView } from "../components/ui";

/* ================================================================== */
/* SECTION 4 — BUILDER JOURNEY                                         */
/* ================================================================== */

const WEEKS = [
  {
    w: "01",
    title: "Foundations & First Principles",
    body: "What AI actually is — and isn't. How to reason from zero instead of memorizing. Students set up their toolkit and take their personal portfolio site live.",
    ship: "Portfolio v1 · live on the web",
  },
  {
    w: "02",
    title: "Prompt Engineering & AI Writing",
    body: "The craft of talking to machines with precision. Tone, structure, iteration. Students ship a research assistant and an AI content tool.",
    ship: "AI Research Assistant",
  },
  {
    w: "03",
    title: "AI Images & Design Thinking",
    body: "Turning language into visuals and learning why design decisions matter. Composition, hierarchy, and taste — with AI as the brush.",
    ship: "AI Image Generator",
  },
  {
    w: "04",
    title: "Automation & Systems",
    body: "Connecting separate tools into systems that run on their own. Students automate a real business workflow end to end.",
    ship: "Working business automation",
  },
  {
    w: "05",
    title: "The Capstone Build",
    body: "Every builder picks a real problem of their own and scopes a solution. Daily 1-on-1 mentor feedback, rapid iteration, honest debugging.",
    ship: "Capstone MVP",
  },
  {
    w: "06",
    title: "Launch & Demo Day",
    body: "Polish, documentation, rehearsal. Each student presents their capstone to parents and mentors, then walks out with a shipped portfolio.",
    ship: "Demo Day · Certificate",
  },
];

export function Journey() {
  const { ref, inView } = useInView<HTMLDivElement>(0.08);
  return (
    <section id="journey" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            index="03"
            label="The Builder Journey"
            title={
              <>
                Six weeks.
                <br />
                A complete transformation.
              </>
            }
            copy="The journey is deliberately sequenced. Each week stacks on the last — from understanding AI, to commanding it, to building with it, to launching something of your own."
          />
          <Reveal delay={200} className="mt-10">
            <div className="overflow-hidden rounded-2xl border border-line shadow-card">
              <img
                src="https://wghldtfppulcwhqjacnl.supabase.co/storage/v1/object/public/media/1785167616383-a6e728b5-5874-44d2-9e37-71342c6c3277.png"
                alt="Mentor working through a problem with a student at a whiteboard"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <p className="mt-3 flex items-center gap-2 font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
              <span className="h-px w-6 bg-line-2" /> Mentorship, not lecturing
            </p>
          </Reveal>
        </div>

        {/* timeline */}
        <div ref={ref} className="relative pl-10 sm:pl-14">
          <span
            className={`absolute top-2 bottom-2 left-[13px] w-px bg-line-2 sm:left-[17px] ${inView ? "growline" : "opacity-0"}`}
            aria-hidden="true"
          />
          <ol className="space-y-10">
            {WEEKS.map((wk, i) => (
              <Reveal as="li" key={wk.w} delay={i * 90} className="relative">
                <span className="absolute top-1 -left-10 grid h-7 w-7 place-items-center rounded-full border border-line-2 bg-white font-mono text-[10px] font-semibold text-accent sm:-left-14 sm:h-9 sm:w-9 sm:text-[11px]">
                  {wk.w}
                </span>
                <div className="group rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-bold tracking-tight text-ink">
                      <span className="mr-2 font-mono text-[11px] font-medium tracking-[0.2em] text-accent uppercase">
                        Week {wk.w}
                      </span>
                      {wk.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-mute">{wk.body}</p>
                  <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent-tint px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-wide text-accent">
                    <Flag className="h-3 w-3" /> Ships: {wk.ship}
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 5 — HOW WE TEACH                                            */
/* ================================================================== */

const LOOP = [
  ["Mindset", "Every class opens with how to think — not what to click."],
  ["Concept", "One idea, explained from first principles. No jargon walls."],
  ["Demonstration", "The mentor builds it live, thinking out loud, mistakes included."],
  ["Guided Practice", "Students rebuild it with support, one step at a time."],
  ["Independent Build", "Then they build their own version — alone. This is where learning locks in."],
  ["Documentation", "Every build is written up properly, the way real engineers work."],
  ["Feedback", "Mentors review both the work and the thinking behind it."],
  ["Reflection", "What worked, what broke, what changes next session."],
];

export function Method() {
  return (
    <section id="method" className="relative border-t border-line bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            index="04"
            label="How We Teach"
            title="One disciplined loop, repeated until it becomes instinct."
            copy="Every session at Spark Labs follows the same eight-step loop. It looks simple on paper. Repeated 36 times, it rewires how a student approaches any unfamiliar tool — for the rest of their life."
          />
          <Reveal delay={180}>
            <blockquote className="mt-10 rounded-2xl border-l-4 border-accent bg-accent-tint/60 p-7">
              <p className="font-display text-[17px] leading-relaxed font-medium text-ink">
                &ldquo;Watching isn&rsquo;t learning. Doing — then documenting, then defending your
                work — is learning.&rdquo;
              </p>
              <cite className="mt-3 block font-mono text-[11px] tracking-[0.2em] text-accent uppercase not-italic">
                The Spark Labs teaching principle
              </cite>
            </blockquote>
          </Reveal>
        </div>

        <ol className="space-y-0">
          {LOOP.map(([name, desc], i) => (
            <Reveal as="li" key={name} delay={i * 60}>
              <div className="group relative flex gap-6 pb-8">
                {i < LOOP.length - 1 && (
                  <span className="absolute top-12 left-[21px] h-[calc(100%-3rem)] w-px bg-line-2" aria-hidden="true" />
                )}
                <span className="z-10 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line-2 bg-white font-mono text-[13px] font-semibold text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-[17px] font-bold tracking-tight text-ink">{name}</h3>
                  <p className="mt-1.5 max-w-md text-[14.5px] leading-relaxed text-mute">{desc}</p>
                </div>
              </div>
              {i < LOOP.length - 1 && (
                <span className="mb-2 ml-[13px] block text-line-2">
                  <ArrowDown className="h-4 w-4" />
                </span>
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================== */
/* SECTION 6 — THE BUILDER MINDSET                                     */
/* ================================================================== */

const MINDSET = [
  { icon: Atom, t: "First Principles Thinking", d: "Break every problem down to what is fundamentally true, then build up." },
  { icon: Puzzle, t: "Problem Decomposition", d: "Split big, scary problems into small, solvable pieces." },
  { icon: Network, t: "Systems Thinking", d: "See how tools, data and people connect into something larger." },
  { icon: GraduationCap, t: "Learning How to Learn", d: "The meta-skill that makes every future skill easier to acquire." },
  { icon: MessageSquareCode, t: "Prompt Engineering", d: "The art of asking machines precisely — and iterating when they miss." },
  { icon: NotebookPen, t: "Documentation", d: "If it isn't written down clearly, it isn't finished." },
  { icon: Bug, t: "Debugging", d: "Errors are information. Read them like clues, not verdicts." },
  { icon: Scale, t: "Critical Thinking", d: "Question every output. Verify everything. Trust your judgement." },
];

export function Mindset() {
  return (
    <section id="mindset" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="dotgrid-light dotgrid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          dark
          index="05"
          label="The Builder Mindset"
          title={
            <>
              We teach how to think
              <br />
              <span className="text-accent-bright">before</span> we teach software.
            </>
          }
          copy="AI tools will change every few months for the rest of these students' lives. So we don't optimize for today's tools — we install the mental operating system underneath them. Software is the easy part."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MINDSET.map((m, i) => (
            <Reveal key={m.t} delay={(i % 4) * 80}>
              <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-bright/50 hover:bg-white/[0.07]">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent-bright/15 text-accent-bright transition-colors duration-300 group-hover:bg-accent-bright group-hover:text-white">
                  <m.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-[15.5px] font-bold tracking-tight text-white">{m.t}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{m.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
