import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Users, FlaskConical, Clock, Rocket } from "lucide-react";
import { ApplyButton, Reveal, SparkMark, useInView } from "@/components/ui";
import { useEffect as _uix_useEffect, useRef as _uix_useRef, useState as _uix_useState } from "react";

export function useInView<T extends HTMLElement>(threshold = 0.18) {
  const ref = _uix_useRef<T | null>(null);
  const [inView, setInView] = _uix_useState(false);
  _uix_useEffect(() => {
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

/* --------------------------- AI TOOL ICONS (inline SVG) --------------------------- */

const OpenAIIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6 6 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.06 6.06 0 0 0 .74 7.1 5.98 5.98 0 0 0 .52 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.05 6.05 0 0 0 5.77-4.19 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.09zm-9.02 12.63a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.78.78 0 0 0 .39-.68v-6.74l2.02 1.17c.02 0 .03.03.04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zM3.6 18.35a4.48 4.48 0 0 1-.54-3.02l.14.08 4.78 2.76c.24.14.54.14.78 0l5.84-3.37v2.33c0 .03-.01.05-.03.06L9.74 19.99a4.5 4.5 0 0 1-6.14-1.64zM2.34 7.9a4.48 4.48 0 0 1 2.34-1.97V11.6a.78.78 0 0 0 .39.68l5.82 3.36-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9zm16.6 3.86L13.1 8.38l2.02-1.17a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.1v-5.67a.79.79 0 0 0-.4-.67zm2.01-3.02l-.14-.08-4.77-2.78a.78.78 0 0 0-.79 0L9.4 9.25V6.92c0-.02.01-.05.03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.3 12.87l-2.02-1.17a.08.08 0 0 1-.04-.05V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08L8.7 5.46a.78.78 0 0 0-.4.68v6.73zm1.1-2.35L12 9.01l2.6 1.5v3l-2.6 1.5-2.6-1.5v-3z" />
  </svg>
);

const ClaudeIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#D97757" d="M12 2c1.5 4 3 6 6 7-3 1-4.5 3-6 7-1.5-4-3-6-6-7 3-1 4.5-3 6-7z" />
    <circle cx="12" cy="12" r="2" fill="#D97757" opacity="0.5" />
  </svg>
);

const GeminiIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="gem-g" x1="0" x2="1" y1="1" y2="0">
        <stop offset="0" stopColor="#4285F4" />
        <stop offset="1" stopColor="#9B72F2" />
      </linearGradient>
    </defs>
    <path fill="url(#gem-g)" d="M12 2c.6 4.4 3.6 7.4 8 8-4.4.6-7.4 3.6-8 8-.6-4.4-3.6-7.4-8-8 4.4-.6 7.4-3.6 8-8z" />
  </svg>
);

const PerplexityIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#20B8CD" strokeWidth="1.8" aria-hidden="true">
    <path d="M4 8v8l8 4 8-4V8l-8-4-8 4z" />
    <path d="M12 4v16M4 8l16 8M20 8L4 16" />
  </svg>
);

const MidjourneyIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M3 20c4-8 8-12 18-16-4 8-8 12-18 16z" />
    <path d="M7 18c3-6 6-9 12-11" opacity="0.5" />
  </svg>
);

const HuggingFaceIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#FFD21E" />
    <circle cx="8.5" cy="10.5" r="1.3" fill="#0b0b0d" />
    <circle cx="15.5" cy="10.5" r="1.3" fill="#0b0b0d" />
    <path d="M8 14c1.5 2 6.5 2 8 0" stroke="#0b0b0d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const ChatGPTIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#10A37F" aria-hidden="true">
    <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6 6 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.06 6.06 0 0 0 .74 7.1 5.98 5.98 0 0 0 .52 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.05 6.05 0 0 0 5.77-4.19 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.09z" />
  </svg>
);

const RunwayIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#00FFAA" strokeWidth="2" aria-hidden="true">
    <path d="M4 20V4h10a5 5 0 0 1 0 10H8l8 6" />
  </svg>
);

const CopilotIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="cop-g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#0078D4" />
        <stop offset="0.5" stopColor="#7B2FBE" />
        <stop offset="1" stopColor="#F25022" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" fill="none" stroke="url(#cop-g)" strokeWidth="2.5" />
    <circle cx="9" cy="11" r="1.4" fill="url(#cop-g)" />
    <circle cx="15" cy="11" r="1.4" fill="url(#cop-g)" />
  </svg>
);

const NotionIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#fff" stroke="#0b0b0d" strokeWidth="1.5" />
    <path d="M8 8v8l7-8v8" stroke="#0b0b0d" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const FigmaIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#F24E1E" d="M8 2h4v6H8a3 3 0 0 1 0-6z" />
    <path fill="#A259FF" d="M12 2h4a3 3 0 0 1 0 6h-4V2z" />
    <path fill="#F24E1E" d="M8 8h4v6H8a3 3 0 0 1 0-6z" opacity="0.9" />
    <path fill="#1ABCFE" d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path fill="#0ACF83" d="M8 14h4v5a3 3 0 0 1-5-2.1c0-1.6 1-2.9 1-2.9z" />
  </svg>
);

const CursorIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M4 3l16 9-7 2-2 7L4 3z" />
  </svg>
);

const LovableIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="lov-g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#FF6B9D" />
        <stop offset="1" stopColor="#FFA94D" />
      </linearGradient>
    </defs>
    <path fill="url(#lov-g)" d="M12 21s-8-5-8-11a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11-8 11h-2z" />
  </svg>
);

/* --------------------------- TOOL BADGE (glowing border) --------------------------- */

type Tool = {
  name: string;
  Icon: (p: { className?: string }) => JSX.Element;
  /** position on the right-side scene, in % */
  top: string;
  left: string;
  delay?: number;
};

const TOOLS: Tool[] = [
  { name: "OpenAI",       Icon: OpenAIIcon,       top: "6%",  left: "38%", delay: 0    },
  { name: "Claude",       Icon: ClaudeIcon,       top: "8%",  left: "62%", delay: 300  },
  { name: "Gemini",       Icon: GeminiIcon,       top: "12%", left: "86%", delay: 600  },
  { name: "lovable",      Icon: LovableIcon,      top: "34%", left: "12%", delay: 200  },
  { name: "Perplexity",   Icon: PerplexityIcon,   top: "34%", left: "70%", delay: 500  },
  { name: "Midjourney",   Icon: MidjourneyIcon,   top: "38%", left: "88%", delay: 800  },
  { name: "ChatGPT",      Icon: ChatGPTIcon,      top: "50%", left: "18%", delay: 400  },
  { name: "Hugging Face", Icon: HuggingFaceIcon,  top: "52%", left: "84%", delay: 700  },
  { name: "Runway",       Icon: RunwayIcon,       top: "64%", left: "40%", delay: 250  },
  { name: "Copilot",      Icon: CopilotIcon,      top: "66%", left: "72%", delay: 550  },
  { name: "Notion",       Icon: NotionIcon,       top: "78%", left: "28%", delay: 350  },
  { name: "Figma",        Icon: FigmaIcon,        top: "84%", left: "52%", delay: 650  },
  { name: "Cursor",       Icon: CursorIcon,       top: "82%", left: "80%", delay: 900  },
];

function ToolBadge({ tool }: { tool: Tool }) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2 tool-badge"
      style={{
        top: tool.top,
        left: tool.left,
        animationDelay: `${tool.delay ?? 0}ms`,
      }}
    >
      <div className="tool-badge-inner group relative flex items-center gap-2 rounded-full border border-white/15 bg-black/55 px-3.5 py-2 backdrop-blur-sm">
        <tool.Icon className="h-4 w-4 shrink-0 text-white" />
        <span className="font-sans text-[12px] font-medium tracking-tight text-white/90">
          {tool.name}
        </span>
      </div>
    </div>
  );
}

/* --------------------------- HERO --------------------------- */

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section
      id="top"
      className="relative overflow-hidden pt-[72px] hero-space"
    >
      {/* Star field + planet horizon (dark mode). Fades away in light mode. */}
      <div className="pointer-events-none absolute inset-0 hero-stars" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 hero-horizon" aria-hidden="true" />
      <div className="dotgrid dotgrid-fade pointer-events-none absolute inset-0 hero-dotgrid" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pt-16 pb-24 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pt-24 lg:pb-32">
        {/* LEFT */}
        <div ref={ref}>
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-tint/60 px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.24em] text-accent uppercase backdrop-blur-sm">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent-bright" />
                Admissions Open · Batch 01
              </span>
            </div>
          </Reveal>

          <h1
            className={`mt-8 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.95] font-black tracking-[-0.03em] text-ink uppercase`}
          >
            <span className={`linemask ${inView ? "is-in" : ""}`}>
              <span>Build the Future.</span>
            </span>
            <span className={`linemask ${inView ? "is-in" : ""}`} style={{ ["--rd" as string]: "140ms" }}>
              <span className="text-accent">Start Now.</span>
            </span>
          </h1>

          <Reveal delay={280} className="mt-6 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="h-px w-24 bg-gradient-to-r from-accent to-transparent" />
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-mute sm:text-lg">
              Spark Labs is a 6-week AI innovation program for students aged 12&ndash;25. No lectures.
              No theory dumps. Just you, the right tools, and real-world projects that make an impact.
            </p>
          </Reveal>

          <Reveal delay={440} className="mt-9 flex flex-wrap items-center gap-4">
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
        </div>

        {/* RIGHT: Cosmic tool grid */}
        <Reveal delay={200} className="relative">
          <div className="relative mx-auto aspect-square w-full max-w-[560px]">
            {/* orbit rings */}
            <div className="absolute inset-0 rounded-full border border-white/5 orbit-ring" />
            <div className="absolute inset-[10%] rounded-full border border-white/5 orbit-ring" />
            <div className="absolute inset-[22%] rounded-full border border-white/5 orbit-ring" />
            <div className="absolute inset-[34%] rounded-full border border-white/5 orbit-ring" />

            {/* central spark logo with glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative grid h-24 w-24 place-items-center rounded-full bg-black/60 border border-accent/40 backdrop-blur-md spark-core">
                <SparkMark className="h-10 w-10 text-accent-bright" />
              </div>
            </div>

            {/* tool badges */}
            {TOOLS.map((t) => (
              <ToolBadge key={t.name} tool={t} />
            ))}
          </div>
        </Reveal>
      </div>

      {/* STATS PILL */}
      <div className="relative z-10 mx-auto -mt-6 max-w-5xl px-5 pb-16 sm:px-8">
        <Reveal delay={520}>
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-white/70 p-5 shadow-card backdrop-blur-md sm:grid-cols-4 sm:gap-2 sm:p-6">
            <StatPill Icon={Users}        value="32+"        label="Students per batch" />
            <StatPill Icon={FlaskConical} value="16+"        label="Hands-on projects" />
            <StatPill Icon={Clock}        value="21 Days"    label="Intensive journey" />
            <StatPill Icon={Rocket}       value="Real World" label="Impact driven" />
          </div>
        </Reveal>

        <Reveal delay={640}>
          <div className="mt-10 text-center">
            <p className="font-mono text-[13px] font-semibold tracking-[0.32em] text-accent uppercase">
              Learn. Build. Ship. Impact.
            </p>
            <p className="mt-2 text-[14px] text-mute">
              Supported by the world's most powerful AI tools.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Component-scoped styles */}
      <style>{`
        /* Dark-only cosmic background */
        .hero-space { background: transparent; }
        .hero-stars { opacity: 0; }
        .hero-horizon { opacity: 0; }

        :root[data-theme="dark"] .hero-space {
          background:
            radial-gradient(ellipse 90% 60% at 50% 0%, rgba(139,92,246,0.10) 0%, transparent 55%),
            radial-gradient(ellipse 70% 50% at 50% 100%, rgba(139,92,246,0.18) 0%, transparent 60%),
            #05030b;
        }
        :root[data-theme="dark"] .hero-dotgrid { display: none; }

        :root[data-theme="dark"] .hero-stars {
          opacity: 1;
          background-image:
            radial-gradient(1px 1px at 12% 18%, #fff, transparent),
            radial-gradient(1px 1px at 27% 42%, #fff, transparent),
            radial-gradient(1.5px 1.5px at 41% 12%, #fff, transparent),
            radial-gradient(1px 1px at 58% 34%, #fff, transparent),
            radial-gradient(1px 1px at 71% 62%, #fff, transparent),
            radial-gradient(1.5px 1.5px at 82% 22%, #fff, transparent),
            radial-gradient(1px 1px at 90% 74%, #fff, transparent),
            radial-gradient(1px 1px at 15% 78%, #fff, transparent),
            radial-gradient(1.5px 1.5px at 34% 88%, #fff, transparent),
            radial-gradient(1px 1px at 62% 84%, #fff, transparent),
            radial-gradient(1px 1px at 5% 55%, #fff, transparent),
            radial-gradient(1px 1px at 48% 68%, #fff, transparent);
          background-repeat: no-repeat;
          animation: starTwinkle 4s ease-in-out infinite;
        }
        :root[data-theme="dark"] .hero-horizon {
          opacity: 1;
          height: 40%;
          background:
            radial-gradient(ellipse 60% 100% at 50% 100%, rgba(167,139,250,0.35) 0%, rgba(139,92,246,0.15) 30%, transparent 65%);
          filter: blur(2px);
        }

        @keyframes starTwinkle {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.55; }
        }

        /* Orbit rings - very subtle in light mode */
        .orbit-ring { opacity: 0; }
        :root[data-theme="dark"] .orbit-ring { opacity: 1; }

        /* Central spark core glow */
        .spark-core {
          box-shadow:
            0 0 0 1px rgba(167,139,250,0.35),
            0 0 40px rgba(139,92,246,0.55),
            0 0 90px rgba(139,92,246,0.35);
          animation: coreBreathe 3.5s ease-in-out infinite;
        }
        @keyframes coreBreathe {
          0%, 100% { box-shadow: 0 0 0 1px rgba(167,139,250,0.35), 0 0 40px rgba(139,92,246,0.55), 0 0 90px rgba(139,92,246,0.35); }
          50%      { box-shadow: 0 0 0 1px rgba(167,139,250,0.5),  0 0 60px rgba(139,92,246,0.75), 0 0 130px rgba(139,92,246,0.5); }
        }

        /* Tool badge entry + glowing border pulse */
        .tool-badge {
          opacity: 0;
          transform: translate(-50%, -50%) scale(0.85);
          animation: badgeIn 0.7s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        @keyframes badgeIn {
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        .tool-badge-inner {
          position: relative;
          transition: transform 0.3s ease, border-color 0.3s ease;
          animation: borderGlow 3.2s ease-in-out infinite;
        }
        .tool-badge-inner:hover {
          transform: translateY(-2px);
          border-color: rgba(167,139,250,0.6);
        }

        @keyframes borderGlow {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(255,255,255,0.06),
              0 0 12px rgba(139,92,246,0.15);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(167,139,250,0.35),
              0 0 22px rgba(139,92,246,0.45);
          }
        }

        /* Light mode adjustments for badges */
        :root:not([data-theme="dark"]) .tool-badge-inner {
          background: rgba(255,255,255,0.85);
          border-color: var(--color-line);
        }
        :root:not([data-theme="dark"]) .tool-badge-inner span {
          color: var(--color-ink);
        }
        :root:not([data-theme="dark"]) .tool-badge-inner svg[fill="currentColor"] { color: var(--color-ink); }
        :root:not([data-theme="dark"]) .spark-core {
          background: #fff;
          border-color: var(--color-accent);
        }
      `}</style>
    </section>
  );
}

/* --------------------------- Stat Pill --------------------------- */

function StatPill({
  Icon,
  value,
  label,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl px-4 py-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent-tint text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <div className="font-display text-[18px] font-bold text-ink">{value}</div>
        <div className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">{label}</div>
      </div>
    </div>
  );
}
