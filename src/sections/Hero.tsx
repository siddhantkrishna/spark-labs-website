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

/* --------------------------- AI TOOL ICONS --------------------------- */

const OpenAIIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="white"><path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6 6 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.06 6.06 0 0 0 .74 7.1 5.98 5.98 0 0 0 .52 4.91 6.05 6.05 0 0 0 6.51 2.9A5.98 5.98 0 0 0 13.26 24a6.05 6.05 0 0 0 5.77-4.19 5.99 5.99 0 0 0 4-2.9 6.06 6.06 0 0 0-.75-7.09zm-9.02 12.63a4.48 4.48 0 0 1-2.88-1.04l.14-.08 4.78-2.76a.78.78 0 0 0 .39-.68v-6.74l2.02 1.17c.02 0 .03.03.04.05v5.58a4.5 4.5 0 0 1-4.49 4.5z" /></svg>
);
const ClaudeIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}><path fill="#D97757" d="M4.7 15.5l4.6-2.6.08-.23-.08-.13H9.07L6.5 12.4l-3.5-.19-3.03-.16 2.94-.13L5.87 12l3.24.22.06.06.02-.05-.02-.03-.06-.13.06-.05.13-.06.35-.03.9-.03 1.75-.03 2.6-.08 1.5-.07 2.44.28 2.35.66L21 13.5l1.28.72.42.4-.07.16-.16-.02-2.3-.35-2.8-.19-3.65-.4-3.9-.31L6.5 13.7l-1.8.9z"/></svg>
);
const GeminiIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}><defs><linearGradient id="gem-g" x1="0" x2="1" y1="1" y2="0"><stop offset="0" stopColor="#4285F4" /><stop offset="0.5" stopColor="#9B72F2" /><stop offset="1" stopColor="#D96570" /></linearGradient></defs><path fill="url(#gem-g)" d="M12 2c.6 5.5 4.5 9.4 10 10-5.5.6-9.4 4.5-10 10-.6-5.5-4.5-9.4-10-10 5.5-.6 9.4-4.5 10-10z" /></svg>
);
const PerplexityIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#20B8CD"><path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.3L19.5 8 12 11.7 4.5 8 12 4.3z"/></svg>
);
const MidjourneyIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="white"><path d="M2 20c3-9 7-14 20-18-3 9-7 14-20 18zm3-3c9-3 13-8 15-13-9 3-13 8-15 13z"/></svg>
);
const HuggingFaceIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}><circle cx="12" cy="12" r="10" fill="#FFD21E" /><ellipse cx="8.5" cy="10.5" rx="1.4" ry="1.6" fill="#0b0b0d" /><ellipse cx="15.5" cy="10.5" rx="1.4" ry="1.6" fill="#0b0b0d" /><path d="M7.5 14c1.5 2.5 7.5 2.5 9 0" stroke="#0b0b0d" strokeWidth="1.6" fill="#F94D6A" /></svg>
);
const ChatGPTIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="#10A37F"><path d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6 6 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.06 6.06 0 0 0 .74 7.1z" /></svg>
);
const RunwayIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}><rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="#00E5A0" strokeWidth="2"/><path d="M8 7v10M8 7h6a3 3 0 0 1 0 6H8m6 0l3 4" stroke="#00E5A0" strokeWidth="2" fill="none"/></svg>
);
const CopilotIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}><path fill="#7B2FBE" d="M12 3a9 9 0 0 0-9 9c0 3.5 2 6.5 5 8v-3a5 5 0 1 1 8 0v3c3-1.5 5-4.5 5-8a9 9 0 0 0-9-9z"/><ellipse cx="9" cy="12" rx="1.4" ry="2" fill="white"/><ellipse cx="15" cy="12" rx="1.4" ry="2" fill="white"/></svg>
);
const NotionIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}><rect x="2" y="2" width="20" height="20" rx="3" fill="white" /><path d="M7 7v10l2 .5V10l6 8 2-.5V7l-2-.5v7l-6-8z" fill="#0b0b0d" /></svg>
);
const FigmaIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}><path fill="#F24E1E" d="M8 2h4v6H8a3 3 0 0 1 0-6z" /><path fill="#A259FF" d="M12 2h4a3 3 0 0 1 0 6h-4V2z" /><path fill="#FF7262" d="M8 8h4v6H8a3 3 0 0 1 0-6z" /><path fill="#1ABCFE" d="M18 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" /><path fill="#0ACF83" d="M8 14h4v3a3 3 0 1 1-4-3z" /></svg>
);
const CursorIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="white"><path d="M4 3l16 8-7 2-2 7L4 3z" /></svg>
);
const LovableIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}><path fill="#FF6B9D" d="M12 21s-8-5.5-8-11.5a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6-8 11.5-8 11.5h-2z" /></svg>
);

/* --------------------------- POSITIONS (EXACT TO INSPO) --------------------------- */

const TOOL_NODES = [
  { name: "OpenAI", Icon: OpenAIIcon, href: "https://openai.com", top: "12%", left: "54%" },
  { name: "Claude", Icon: ClaudeIcon, href: "https://claude.ai", top: "18%", left: "70%" },
  { name: "Gemini", Icon: GeminiIcon, href: "https://gemini.google.com", top: "22%", left: "86%" },
  { name: "lovable", Icon: LovableIcon, href: "https://lovable.dev", top: "34%", left: "48%" },
  { name: "Perplexity", Icon: PerplexityIcon, href: "https://perplexity.ai", top: "33%", left: "73%" },
  { name: "Midjourney", Icon: MidjourneyIcon, href: "https://midjourney.com", top: "35%", left: "88%" },
  { name: "ChatGPT", Icon: ChatGPTIcon, href: "https://chatgpt.com", top: "48%", left: "44%" },
  { name: "Hugging Face", Icon: HuggingFaceIcon, href: "https://huggingface.co", top: "47%", left: "84%" },
  { name: "Runway", Icon: RunwayIcon, href: "https://runwayml.com", top: "54%", left: "60%" },
  { name: "Copilot", Icon: CopilotIcon, href: "https://copilot.microsoft.com", top: "54%", left: "76%" },
  { name: "Notion", Icon: NotionIcon, href: "https://notion.so", top: "62%", left: "50%" },
  { name: "Figma", Icon: FigmaIcon, href: "https://figma.com", top: "66%", left: "64%" },
  { name: "Cursor", Icon: CursorIcon, href: "https://cursor.com", top: "65%", left: "79%" },
];

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="top" className="relative overflow-hidden pt-[72px] min-h-screen bg-[#05030b] text-white">
      {/* Star layers */}
      <div className="pointer-events-none absolute inset-0 hero-stars-1" />
      <div className="pointer-events-none absolute inset-0 hero-stars-2" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-[1440px] px-6 pt-12 pb-32 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
          
          {/* LEFT: Text Content */}
          <div ref={ref} className="lg:col-span-5 z-10">
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-mono tracking-widest text-white/80 uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400 animate-pulse" />
                Admissions Open · Batch 01
              </div>
            </Reveal>

            <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.8rem)] font-black leading-[0.95] tracking-tight uppercase">
              <span className={`linemask ${inView ? "is-in" : ""}`}>Build the Future.</span>
              <br />
              <span className={`linemask text-purple-400 ${inView ? "is-in" : ""}`} style={{ ["--rd" as string]: "140ms" }}>
                Start Now.
              </span>
            </h1>

            <Reveal delay={280} className="mt-4 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rotate-45 bg-purple-400" />
              <span className="h-px w-24 bg-gradient-to-r from-purple-400 to-transparent" />
            </Reveal>

            <Reveal delay={340}>
              <p className="mt-6 max-w-lg text-base text-white/60 leading-relaxed">
                Spark Labs is a 6-week AI innovation program for students aged 12–25. No lectures.
                No theory dumps. Just you, the right tools, and real-world projects that make an impact.
              </p>
            </Reveal>

            <Reveal delay={440} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 rounded-full bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all hover:bg-purple-500 hover:shadow-[0_0_30px_rgba(147,51,234,0.6)]"
              >
                Apply for Admission
                <ArrowRight className="h-4 w-4" />
              </Link>
              <ApplyButton mode="counsel" variant="ghost" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white hover:bg-white/10">
                <CalendarCheck className="h-4 w-4 text-purple-400" />
                Book a Free Counseling Session
              </ApplyButton>
            </Reveal>
          </div>

          {/* RIGHT: Spark Logo & Floating AI Tools */}
          <div className="lg:col-span-7 relative h-[520px] w-full">
            {/* Center Spark Icon */}
            <div className="absolute top-[48%] left-[68%] -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative grid h-24 w-24 place-items-center rounded-full border border-purple-500/30 bg-[#080415] shadow-[0_0_50px_rgba(168,85,247,0.4)]">
                <SparkMark className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Orbit Rings Background */}
            <div className="absolute top-[48%] left-[68%] -translate-x-1/2 -translate-y-1/2 h-[420px] w-[420px] rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute top-[48%] left-[68%] -translate-x-1/2 -translate-y-1/2 h-[260px] w-[260px] rounded-full border border-white/5 pointer-events-none" />

            {/* Tool Pills */}
            {TOOL_NODES.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ top: tool.top, left: tool.left }}
                className="absolute z-30 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 rounded-xl border border-white/10 bg-[#0c081c]/80 px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-all hover:scale-105 hover:border-purple-400/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] animate-float"
              >
                <tool.Icon />
                <span>{tool.name}</span>
              </a>
            ))}
          </div>

        </div>
      </div>

      {/* BOTTOM PLANET HORIZON */}
      <div className="relative z-20 w-full">
        {/* Planet Arc Glow */}
        <div className="absolute left-1/2 -top-12 -translate-x-1/2 w-[140%] h-[300px] rounded-[100%] bg-gradient-to-t from-purple-900/20 via-purple-600/10 to-transparent blur-2xl pointer-events-none" />
        
        {/* Planet Surface Line */}
        <div className="relative mx-auto max-w-6xl rounded-t-[100px] border-t border-purple-500/30 bg-[#070412]/90 backdrop-blur-xl px-8 pt-8 pb-12 shadow-[0_-20px_50px_rgba(147,51,234,0.15)]">
          
          {/* Stats Bar */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 border border-white/10 rounded-2xl bg-white/5 p-4 backdrop-blur-md">
            <StatPill Icon={Users} value="32+" label="Students per batch" />
            <StatPill Icon={FlaskConical} value="16+" label="Hands-on projects" />
            <StatPill Icon={Clock} value="21 Days" label="Intensive journey" />
            <StatPill Icon={Rocket} value="Real World" label="Impact driven" />
          </div>

          <div className="mt-8 text-center">
            <p className="font-mono text-xs font-semibold tracking-[0.3em] text-purple-400 uppercase">
              Learn. Build. Ship. Impact.
            </p>
            <p className="mt-1 text-xs text-white/40">
              Supported by the world's most powerful AI tools.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .hero-stars-1 {
          background-image: radial-gradient(1px 1px at 10% 15%, #fff, transparent), radial-gradient(1px 1px at 30% 45%, #fff, transparent), radial-gradient(1px 1px at 70% 25%, #fff, transparent), radial-gradient(1px 1px at 85% 75%, #fff, transparent);
          animation: twinkle 4s ease-in-out infinite alternate;
        }
        .hero-stars-2 {
          background-image: radial-gradient(1px 1px at 20% 75%, #fff, transparent), radial-gradient(1px 1px at 50% 15%, #fff, transparent), radial-gradient(1px 1px at 90% 35%, #fff, transparent);
          animation: twinkle 6s ease-in-out infinite alternate;
        }
        @keyframes twinkle { 0% { opacity: 0.3; } 100% { opacity: 1; } }
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
          50% { transform: translate(-50%, -50%) translateY(-6px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

function StatPill({ Icon, value, label }: { Icon: any; value: string; label: string }) {
  return (
    <div className="flex items-center gap-3 px-2">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight">
        <div className="font-display text-base font-bold text-white">{value}</div>
        <div className="font-mono text-[9px] tracking-wider text-white/40 uppercase">{label}</div>
      </div>
    </div>
  );
}
