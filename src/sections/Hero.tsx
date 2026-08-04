import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Users, FlaskConical, Clock, Rocket } from "lucide-react";
import { ApplyButton, Reveal, SparkMark } from "@/components/ui";

function useInView<T extends HTMLElement>(threshold = 0.18) {
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

const MARQUEE = [
  "Prompt Engineering",
  "ChatGPT",
  "Claude Code",
  "AI Images",
  "AI Video",
  "Automation",
  "Website Creation",
  "Gemini",
  "Workflows",
  "Portfolio",
  "Productivity",
  "Entrepreneurship",
];

/** Typewriter that types line 1, then line 2, with a blinking caret. */
function Typewriter({
  lines,
  start,
  speed = 75,
  linePause = 350,
  onDone,
}: {
  lines: { text: string; className?: string }[];
  start: boolean;
  speed?: number;
  linePause?: number;
  onDone?: () => void;
}) {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!start || done) return;
    const currentLine = lines[lineIndex];
    if (!currentLine) return;

    if (charIndex < currentLine.text.length) {
      const t = setTimeout(() => setCharIndex((c) => c + 1), speed);
      return () => clearTimeout(t);
    }

    if (lineIndex < lines.length - 1) {
      const t = setTimeout(() => {
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, linePause);
      return () => clearTimeout(t);
    }

    setDone(true);
    onDone?.();
  }, [start, charIndex, lineIndex, lines, speed, linePause, done, onDone]);

  return (
    <>
      {lines.map((line, i) => {
        const isCurrent = i === lineIndex && !done;
        const isPast = i < lineIndex || done;
        const shown = isPast ? line.text : isCurrent ? line.text.slice(0, charIndex) : "";
        const showCaret = isCurrent || (done && i === lines.length - 1);
        return (
          <span key={i} className="block">
            <span className={line.className}>{shown}</span>
            {showCaret && (
              <span
                className="caret ml-1 inline-block h-[0.85em] w-[3px] translate-y-1 bg-accent align-baseline"
                aria-hidden="true"
              />
            )}
          </span>
        );
      })}
    </>
  );
}

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setStartTyping(true), 250);
      return () => clearTimeout(t);
    }
  }, [inView]);

  return (
    <section id="top" className="relative overflow-hidden pt-[72px]">
      <div className="dotgrid dotgrid-fade pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pt-16 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24 lg:pb-28">
        <div ref={ref}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent-tint px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.18em] text-accent uppercase">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent-bright" />
                Admissions Open · Batch 01
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-faint uppercase">
                <MapPin className="h-3 w-3" /> Raigarh, Chhattisgarh
              </span>
            </div>
          </Reveal>

          <h1
            className="mt-7 font-display text-[clamp(2.6rem,6.2vw,4.6rem)] leading-[1.02] font-bold tracking-[-0.03em] text-ink min-h-[2.2em]"
            aria-label="Learn by Building."
          >
            <Typewriter
              start={startTyping}
              speed={70}
              linePause={300}
              lines={[
                { text: "Learn by" },
                { text: "Building.", className: "text-accent" },
              ]}
            />
          </h1>

          <Reveal delay={320}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-mute sm:text-lg">
              Spark Labs is a six-week, project-based AI laboratory for students aged 12&ndash;25.
              No lecture halls. No theory dumps. You walk in a complete beginner and walk out with a
              portfolio of real AI projects you built yourself.
            </p>
          </Reveal>

          <Reveal delay={420} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/admissions"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-lift transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-deep"
            >
              Apply for Admission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <ApplyButton mode="counsel" variant="ghost">
              <CalendarCheck className="h-4 w-4 text-accent" />
              Book a Free Counseling Session
            </ApplyButton>
          </Reveal>

          <Reveal delay={520}>
            <dl className="mt-14 grid grid-cols-2 divide-line overflow-hidden rounded-2xl border border-line bg-white/70 shadow-card backdrop-blur-sm sm:grid-cols-5 sm:divide-x">
              <Stat value={<CountUp to={6} />} label="Weeks" />
              <Stat value={<CountUp to={36} />} label="Live Sessions" />
              <Stat value={<CountUp to={16} />} label="Students / Batch" />
              <Stat value="Offline" label="In-Person Lab" small />
              <Stat value="Project" label="Based Learning" small />
            </dl>
          </Reveal>
        </div>

        <Reveal delay={200} className="relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="relative z-10 overflow-hidden rounded-2xl border border-ink/10 bg-ink shadow-lift">
              <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-accent-bright" />
                <span className="ml-3 flex items-center gap-2 font-mono text-[11px] tracking-wide text-white/45">
                  <Terminal className="h-3.5 w-3.5" /> spark-labs ~/builder-journey
                </span>
              </div>
              <div className="space-y-2.5 px-6 py-7 font-mono text-[13px] leading-relaxed">
                <p className="text-white/40">$ initializing new builder&hellip;</p>
                <p className="text-white/80">
                  <span className="text-accent-bright">&#10003;</span> mindset.installed
                </p>
                <p className="text-white/80">
                  <span className="text-accent-bright">&#10003;</span> first_principles.unlocked
                </p>
                <p className="text-white/80">
                  <span className="text-accent-bright">&#10003;</span> prompt_engineering.mastered
                </p>
                <p className="text-white/80">
                  <span className="text-accent-bright">&#10003;</span> 10_projects.shipped
                </p>
                <p className="pt-2 text-white/40">$ status</p>
                <p className="font-semibold text-white">
                  <span className="mr-2 rounded bg-accent-bright/20 px-2 py-0.5 text-accent-bright">READY</span>
                  to launch<span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent-bright" />
                </p>
              </div>
            </div>

            <div className="floaty absolute -top-6 -right-3 z-20 flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3 shadow-card sm:-right-6">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-tint text-accent">
                <CalendarCheck className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-ink">Demo Day</span>
                <span className="block font-mono text-[10px] tracking-wide text-faint">WEEK 06</span>
              </span>
            </div>
            <div className="floaty-slow absolute -bottom-6 -left-3 z-20 flex items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3 shadow-card sm:-left-6">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-tint text-accent">
                <Users className="h-4 w-4" />
              </span>
              <span className="leading-tight">
                <span className="block text-[13px] font-semibold text-ink">16 builders</span>
                <span className="block font-mono text-[10px] tracking-wide text-faint">PER LAB · 3/DAY</span>
              </span>
            </div>

            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-accent-tint/60" aria-hidden="true" />
          </div>
        </Reveal>
      </div>

      <div className="marquee relative border-y border-line bg-white/60 py-4">
        <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span
              key={i}
              className="flex items-center gap-8 font-mono text-[12px] font-medium tracking-[0.2em] text-faint uppercase"
            >
              {item}
              <SparkMark className="h-2.5 w-2.5 text-accent/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
  small = false,
}: {
  value: React.ReactNode;
  label: string;
  small?: boolean;
}) {
  return (
    <div className="px-5 py-5 text-center sm:py-6">
      <div
        className={`font-display font-bold tracking-tight text-ink ${
          small ? "text-[19px] leading-8" : "text-[28px]"
        }`}
      >
        {value}
      </div>
      <div className="mt-1 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">{label}</div>
    </div>
  );
}
