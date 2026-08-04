import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarCheck, Users, FlaskConical, Clock, Rocket } from "lucide-react";
import { ApplyButton, Reveal, SparkMark } from "@/components/ui";

/* --------------------------- Local useInView --------------------------- */

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

/* --------------------------- AI TOOL ICONS --------------------------- */

const OpenAIIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="white" aria-hidden="true">
    <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6 6 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.06 6.06 0 0 0 .74 7.1 5.98 5.98 0 0 0 .52 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.05 6.05 0 0 0 5.77-4.19 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.09zm-9.02 12.63a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.78.78 0 0 0 .39-.68v-6.74l2.02 1.17c.02 0 .03.03.04.05v5.58a4.5 4.5 0 0 1-4.49 4.5zM3.6 18.35a4.48 4.48 0 0 1-.54-3.02l.14.08 4.78 2.76c.24.14.54.14.78 0l5.84-3.37v2.33c0 .03-.01.05-.03.06L9.74 19.99a4.5 4.5 0 0 1-6.14-1.64zM2.34 7.9a4.48 4.48 0 0 1 2.34-1.97V11.6a.78.78 0 0 0 .39.68l5.82 3.36-2.02 1.17a.08.08 0 0 1-.07 0l-4.83-2.79A4.5 4.5 0 0 1 2.34 7.9zm16.6 3.86L13.1 8.38l2.02-1.17a.08.08 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.1v-5.67a.79.79 0 0 0-.4-.67zm2.01-3.02l-.14-.08-4.77-2.78a.78.78 0 0 0-.79 0L9.4 9.25V6.92c0-.02.01-.05.03-.06l4.83-2.79a4.5 4.5 0 0 1 6.68 4.66zM8.3 12.87l-2.02-1.17a.08.08 0 0 1-.04-.05V6.07a4.5 4.5 0 0 1 7.38-3.45l-.14.08L8.7 5.46a.78.78 0 0 0-.4.68v6.73zm1.1-2.35L12 9.01l2.6 1.5v3l-2.6 1.5-2.6-1.5v-3z" />
  </svg>
);

const ClaudeIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#D97757" d="M4.7 15.5l4.6-2.6.08-.23-.08-.13H9.07L6.5 12.4l-3.5-.19-3.03-.16 2.94-.13L5.87 12l3.24.22.06.06.02-.05-.02-.03-.06-.13.06-.05.13-.06.35-.03.9-.03 1.75-.03 2.6-.08 1.5-.07 2.44.28 2.35.66L21 13.5l1.28.72.42.4-.07.16-.16-.02-2.3-.35-2.8-.19-3.65-.4-3.9-.31L6.5 13.7l-1.8.9zm14.4-2.55l-1.36.4-.06.13.03.17.66 1.13.85 1.05L20 17l.68.66.7.5.94.15.68-.02.35-.68-.15-1.06-.66-.9-1.4-1.03-1.02-.5zm-9.7-8.14l-.14.6-.35 2.68-.28 3.4-.15 1.13.72-.19 1.13-.6.7.06.32.85-.4 1.75-.6 1.4.13.28.13-.03.16-.06 1.85-2.34.85-1.2.75-.98.5-.44v-.09l-.35-1.15-.28-1.9-.06-1.62-.13-1.44-.32-1.13-.6-.53-.44-.32-.75-.28z"/>
  </svg>
);

const GeminiIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="gem-g" x1="0" x2="1" y1="1" y2="0">
        <stop offset="0" stopColor="#4285F4" />
        <stop offset="0.5" stopColor="#9B72F2" />
        <stop offset="1" stopColor="#D96570" />
      </linearGradient>
    </defs>
    <path fill="url(#gem-g)" d="M12 2c.6 5.5 4.5 9.4 10 10-5.5.6-9.4 4.5-10 10-.6-5.5-4.5-9.4-10-10 5.5-.6 9.4-4.5 10-10z" />
  </svg>
);

const PerplexityIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#20B8CD" aria-hidden="true">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3L19.5 8 12 11.7 4.5 8 12 4.3zM4 9.5l7 3.5v7l-7-3.5v-7zm9 10.5v-7l7-3.5v7l-7 3.5z"/>
  </svg>
);

const MidjourneyIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="white" aria-hidden="true">
    <path d="M2 20c3-9 7-14 20-18-3 9-7 14-20 18zm3-3c9-3 13-8 15-13-9 3-13 8-15 13z"/>
  </svg>
);

const HuggingFaceIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#FFD21E" />
    <ellipse cx="8.5" cy="10.5" rx="1.4" ry="1.6" fill="#0b0b0d" />
    <ellipse cx="15.5" cy="10.5" rx="1.4" ry="1.6" fill="#0b0b0d" />
    <path d="M7.5 14c1.5 2.5 7.5 2.5 9 0" stroke="#0b0b0d" strokeWidth="1.6" fill="#F94D6A" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatGPTIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#10A37F" aria-hidden="true">
    <path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6 6 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.06 6.06 0 0 0 .74 7.1 5.98 5.98 0 0 0 .52 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.05 6.05 0 0 0 5.77-4.19 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.09zm-9.02 12.63a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.78.78 0 0 0 .39-.68v-6.74l2.02 1.17c.02 0 .03.03.04.05v5.58a4.5 4.5 0 0 1-4.49 4.5z" />
  </svg>
);

const RunwayIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#00E5A0" strokeWidth="2"/>
    <path d="M8 7v10M8 7h6a3 3 0 0 1 0 6H8m6 0l3 4" stroke="#00E5A0" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CopilotIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="cop-g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#0078D4" />
        <stop offset="0.5" stopColor="#7B2FBE" />
        <stop offset="1" stopColor="#F25022" />
      </linearGradient>
    </defs>
    <path fill="url(#cop-g)" d="M12 3a9 9 0 0 0-9 9c0 3.5 2 6.5 5 8v-3a5 5 0 1 1 8 0v3c3-1.5 5-4.5 5-8a9 9 0 0 0-9-9z"/>
    <ellipse cx="9" cy="12" rx="1.4" ry="2" fill="white"/>
    <ellipse cx="15" cy="12" rx="1.4" ry="2" fill="white"/>
  </svg>
);

const NotionIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="3" fill="white" />
    <path d="M7 7v10l2 .5V10l6 8 2-.5V7l-2-.5v7l-6-8z" fill="#0b0b0d" />
  </svg>
);

const FigmaIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#F24E1E" d="M8 2h4v6H8a3 3 0 0 1 0-6z" />
    <path fill="#A259FF" d="M12 2h4a3 3 0 0 1 0 6h-4V2z" />
    <path fill="#FF7262" d="M8 8h4v6H8a3 3 0 0 1 0-6z" />
    <path fill="#1ABCFE" d="M18 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
    <path fill="#0ACF83" d="M8 14h4v3a3 3 0 1 1-4-3z" />
  </svg>
);

const CursorIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="white" aria-hidden="true">
    <path d="M4 3l16 8-7 2-2 7L4 3z" />
  </svg>
);

const LovableIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="lov-g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stopColor="#FF6B9D" />
        <stop offset="1" stopColor="#FFA94D" />
      </linearGradient>
    </defs>
    <path fill="url(#lov-g)" d="M12 21s-8-5.5-8-11.5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11.5-8 11.5h-2z" />
  </svg>
);

/* --------------------------- TOOL DATA --------------------------- */

type Tool = {
  name: string;
  Icon: (p: { className?: string }) => JSX.Element;
  href: string;
  angle: number;
  ring: 0 | 1 | 2 | 3;
};

const TOOLS: Tool[] = [
  { name: "OpenAI",       Icon: OpenAIIcon,       href: "https://openai.com",          angle: -80, ring: 3 },
  { name: "Claude",       Icon: ClaudeIcon,       href: "https://claude.ai",           angle: -55, ring: 3 },
  { name: "Gemini",       Icon: GeminiIcon,       href: "https://gemini.google.com",   angle: -25, ring: 3 },
  { name: "Perplexity",   Icon: PerplexityIcon,   href: "https://perplexity.ai",       angle: 10,  ring: 2 },
  { name: "Midjourney",   Icon: MidjourneyIcon,   href: "https://midjourney.com",      angle: 30,  ring: 3 },
  { name: "lovable",      Icon: LovableIcon,      href: "https://lovable.dev",         angle: -155, ring: 2 },
  { name: "ChatGPT",      Icon: ChatGPTIcon,      href: "https://chatgpt.com",         angle: 165, ring: 2 },
  { name: "Hugging Face", Icon: HuggingFaceIcon,  href: "https://huggingface.co",      angle: 55,  ring: 2 },
  { name: "Runway",       Icon: RunwayIcon,       href: "https://runwayml.com",        angle: 130, ring: 1 },
  { name: "Copilot",      Icon: CopilotIcon,      href: "https://copilot.microsoft.com", angle: 65, ring: 1 },
  { name: "Notion",       Icon: NotionIcon,       href: "https://notion.so",           angle: -125, ring: 1 },
  { name: "Figma",        Icon: FigmaIcon,        href: "https://figma.com",           angle: 100, ring: 0 },
  { name: "Cursor",       Icon: CursorIcon,       href: "https://cursor.com",          angle: 45,  ring: 0 },
];

const RING_RADII = ["28%", "45%", "62%", "78%"];

function ToolBadge({ tool, index }: { tool: Tool; index: number }) {
  const radius = RING_RADII[tool.ring];
  const duration = tool.ring % 2 === 0 ? "80s" : "100s"; // Alternate speeds
  const delay = `-${index * 6}s`;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        transform: `translate(-50%, -50%) rotate(${tool.angle}deg)`,
      }}
    >
      <div
        className="origin-center"
        style={{
          animation: `spinOrbit ${duration} linear infinite`,
          animationDelay: delay,
        }}
      >
        <div style={{ transform: `translateY(-${radius})` }}>
          <div
            style={{
              animation: `counterSpinOrbit ${duration} linear infinite`,
              animationDelay: delay,
            }}
          >
            <div style={{ transform: `rotate(-${tool.angle}deg)` }}>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${tool.name}`}
                className="tool-badge-inner group relative flex items-center gap-2 rounded-full border border-white/10 bg-[#0a0714]/80 px-3.5 py-2 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-accent-bright/70"
              >
                <tool.Icon className="h-5 w-5 shrink-0" />
                <span className="font-sans text-[13px] font-medium tracking-tight text-white whitespace-nowrap">
                  {tool.name}
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- HERO --------------------------- */

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="top" className="relative overflow-hidden pt-[72px] hero-space min-h-screen bg-[#05030b]">
      {/* star layers */}
      <div className="pointer-events-none absolute inset-0 hero-stars-1" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-stars-2" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 hero-stars-3" aria-hidden="true" />
      
      {/* planet horizon */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[35vh] overflow-hidden" aria-hidden="true">
        {/* Planet Arc */}
        <div className="absolute top-[20%] left-1/2 h-[150vw] w-[150vw] -translate-x-1/2 rounded-[100%] border-t border-white/10 bg-[#05030b] shadow-[inset_0_20px_80px_rgba(139,92,246,0.15),0_-10px_40px_rgba(139,92,246,0.2)]" />
        {/* Sun Flare */}
        <div className="absolute top-[18%] left-1/2 h-[120px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_0%,rgba(167,139,250,0.6)_25%,rgba(139,92,246,0.2)_50%,transparent_75%)] blur-[12px]" />
      </div>

      <div className="relative mx-auto grid max-w-[1400px] gap-14 px-5 pt-16 pb-24 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:pt-24 lg:pb-32 z-10">
        {/* LEFT: Content */}
        <div ref={ref} className="max-w-2xl">
          <Reveal>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-[0.24em] text-white uppercase backdrop-blur-sm">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent-bright" />
                Admissions Open · Batch 01
              </span>
            </div>
          </Reveal>

          <h1 className="mt-8 font-display text-[clamp(2.8rem,7.5vw,5.5rem)] leading-[0.95] font-black tracking-[-0.03em] text-white uppercase">
            <span className={`linemask ${inView ? "is-in" : ""}`}>
              <span>Build the Future.</span>
            </span>
            <span className={`linemask ${inView ? "is-in" : ""}`} style={{ ["--rd" as string]: "140ms" }}>
              <span className="text-accent-bright">Start Now.</span>
            </span>
          </h1>

          <Reveal delay={280} className="mt-6 flex items-center gap-3">
            <span className="h-2 w-2 rotate-45 bg-accent-bright" />
            <span className="h-px w-32 bg-gradient-to-r from-accent-bright to-transparent" />
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/60 sm:text-lg">
              Spark Labs is a 6-week AI innovation program for students aged 12&ndash;25. No lectures.
              No theory dumps. Just you, the right tools, and real-world projects that make an impact.
            </p>
          </Reveal>

          <Reveal delay={440} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/admissions"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent-bright px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_0_20px_rgba(167,139,250,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_0_30px_rgba(167,139,250,0.5)]"
            >
              Apply for Admission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <ApplyButton mode="counsel" variant="ghost" className="border border-white/10 bg-white/5 text-white hover:bg-white/10">
              <CalendarCheck className="h-4 w-4 text-accent-bright" />
              Book a Free Counseling Session
            </ApplyButton>
          </Reveal>
        </div>

        {/* RIGHT: cosmic orbit scene */}
        <Reveal delay={200} className="relative hidden lg:block">
          <div className="relative mx-auto aspect-square w-full max-w-[800px]">
            {/* Orbit rings */}
            <div className="absolute inset-[11%] rounded-full border border-white/5 orbit-ring ring-cw"  />
            <div className="absolute inset-[27%] rounded-full border border-white/5 orbit-ring ring-ccw" />
            <div className="absolute inset-[44%] rounded-full border border-white/5 orbit-ring ring-cw"  />
            <div className="absolute inset-[60%] rounded-full border border-white/5 orbit-ring ring-ccw" />

            {/* Central spark logo with glow */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative grid h-28 w-28 place-items-center rounded-full spark-core">
                <div className="spark-core-glow" />
                <SparkMark className="relative h-14 w-14 text-white" />
              </div>
            </div>

            {/* tool badges */}
            {TOOLS.map((t, i) => (
              <ToolBadge key={t.name} tool={t} index={i} />
            ))}
          </div>
        </Reveal>
      </div>

      {/* STATS PILL - positioned over the planet */}
      <div className="relative z-30 mx-auto -mt-12 max-w-5xl px-5 pb-16 sm:px-8">
        <Reveal delay={520}>
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-white/10 bg-[#0a0714]/60 p-5 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:grid-cols-4 sm:gap-2 sm:p-6">
            <StatPill Icon={Users}        value="32+"        label="Students per batch" />
            <StatPill Icon={FlaskConical} value="16+"        label="Hands-on projects" />
            <StatPill Icon={Clock}        value="21 Days"    label="Intensive journey" />
            <StatPill Icon={Rocket}       value="Real World" label="Impact driven" />
          </div>
        </Reveal>

        <Reveal delay={640}>
          <div className="mt-10 text-center">
            <p className="font-mono text-[13px] font-semibold tracking-[0.32em] text-accent-bright uppercase">
              Learn. Build. Ship. Impact.
            </p>
            <p className="mt-2 text-[14px] text-white/50">
              Supported by the world's most powerful AI tools.
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        /* Three parallax star layers, each twinkling on different rhythms */
        .hero-stars-1, .hero-stars-2, .hero-stars-3 { opacity: 1; }

        .hero-stars-1 {
          background-image:
            radial-gradient(1px 1px at 5% 10%, #fff, transparent),
            radial-gradient(1px 1px at 12% 22%, #fff, transparent),
            radial-gradient(1.2px 1.2px at 20% 42%, #fff, transparent),
            radial-gradient(1px 1px at 28% 8%, #fff, transparent),
            radial-gradient(1px 1px at 35% 60%, #fff, transparent),
            radial-gradient(1.4px 1.4px at 45% 18%, #fff, transparent),
            radial-gradient(1px 1px at 55% 72%, #fff, transparent),
            radial-gradient(1px 1px at 63% 30%, #fff, transparent),
            radial-gradient(1.2px 1.2px at 72% 55%, #fff, transparent),
            radial-gradient(1px 1px at 80% 12%, #fff, transparent),
            radial-gradient(1.3px 1.3px at 88% 40%, #fff, transparent),
            radial-gradient(1px 1px at 95% 68%, #fff, transparent);
          background-repeat: no-repeat;
          animation: twinkleA 3.2s ease-in-out infinite;
        }
        .hero-stars-2 {
          background-image:
            radial-gradient(1px 1px at 8% 78%, #fff, transparent),
            radial-gradient(1px 1px at 18% 88%, #fff, transparent),
            radial-gradient(1.2px 1.2px at 30% 25%, #fff, transparent),
            radial-gradient(1px 1px at 42% 85%, #fff, transparent),
            radial-gradient(1px 1px at 50% 5%, #fff, transparent),
            radial-gradient(1.4px 1.4px at 58% 45%, #fff, transparent),
            radial-gradient(1px 1px at 68% 90%, #fff, transparent),
            radial-gradient(1px 1px at 78% 25%, #fff, transparent),
            radial-gradient(1.2px 1.2px at 85% 78%, #fff, transparent),
            radial-gradient(1px 1px at 92% 88%, #fff, transparent),
            radial-gradient(1.3px 1.3px at 3% 55%, #fff, transparent),
            radial-gradient(1px 1px at 15% 62%, #fff, transparent);
          background-repeat: no-repeat;
          animation: twinkleB 4.5s ease-in-out infinite;
        }
        .hero-stars-3 {
          background-image:
            radial-gradient(0.8px 0.8px at 22% 15%, rgba(255,255,255,0.7), transparent),
            radial-gradient(0.8px 0.8px at 38% 48%, rgba(255,255,255,0.7), transparent),
            radial-gradient(0.8px 0.8px at 52% 88%, rgba(255,255,255,0.7), transparent),
            radial-gradient(0.8px 0.8px at 66% 12%, rgba(255,255,255,0.7), transparent),
            radial-gradient(0.8px 0.8px at 82% 58%, rgba(255,255,255,0.7), transparent),
            radial-gradient(0.8px 0.8px at 10% 38%, rgba(255,255,255,0.7), transparent),
            radial-gradient(0.8px 0.8px at 48% 32%, rgba(255,255,255,0.7), transparent),
            radial-gradient(0.8px 0.8px at 74% 82%, rgba(255,255,255,0.7), transparent);
          background-repeat: no-repeat;
          animation: twinkleC 6s ease-in-out infinite;
        }

        @keyframes twinkleA { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes twinkleB { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes twinkleC { 0%,100% { opacity: 0.7; } 25% { opacity: 0.2; } 75% { opacity: 1; } }

        /* Orbit logic */
        @keyframes spinOrbit {
          100% { transform: rotate(360deg); }
        }
        @keyframes counterSpinOrbit {
          100% { transform: rotate(-360deg); }
        }

        .orbit-ring { opacity: 1; }
        .ring-cw  { animation: ringSpinCW  120s linear infinite; }
        .ring-ccw { animation: ringSpinCCW 150s linear infinite; }
        @keyframes ringSpinCW  { to { transform: rotate(360deg); } }
        @keyframes ringSpinCCW { to { transform: rotate(-360deg); } }

        /* Central spark core */
        .spark-core {
          background: #000;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow:
            0 0 0 1px rgba(167,139,250,0.2),
            0 0 60px rgba(255,255,255,0.1),
            0 0 120px rgba(167,139,250,0.15),
            inset 0 0 30px rgba(255,255,255,0.1);
          animation: coreBreathe 3.5s ease-in-out infinite;
        }
        .spark-core-glow {
          position: absolute;
          inset: -20%;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%);
          filter: blur(15px);
          pointer-events: none;
        }
        @keyframes coreBreathe {
          0%, 100% { box-shadow: 0 0 0 1px rgba(167,139,250,0.2), 0 0 60px rgba(255,255,255,0.1), 0 0 120px rgba(167,139,250,0.15), inset 0 0 30px rgba(255,255,255,0.1); }
          50%      { box-shadow: 0 0 0 1px rgba(167,139,250,0.4), 0 0 90px rgba(255,255,255,0.15), 0 0 160px rgba(167,139,250,0.25), inset 0 0 40px rgba(255,255,255,0.15); }
        }

        /* Tool badge inner: glowing border pulse */
        .tool-badge-inner {
          animation: borderGlow 3.2s ease-in-out infinite;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.06), 0 0 12px rgba(139,92,246,0.15);
        }
        @keyframes borderGlow {
          0%, 100% {
            box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 0 12px rgba(139,92,246,0.2);
          }
          50% {
            box-shadow: 0 0 0 1px rgba(167,139,250,0.5), 0 0 24px rgba(139,92,246,0.4);
          }
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
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/5 border border-white/10 text-accent-bright">
        <Icon className="h-5 w-5" />
      </span>
      <div className="leading-tight">
        <div className="font-display text-[18px] font-bold text-white">{value}</div>
        <div className="font-mono text-[10px] tracking-[0.14em] text-white/50 uppercase">{label}</div>
      </div>
    </div>
  );
}
