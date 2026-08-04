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

/* --------------------------- ORBIT CONFIGURATION --------------------------- */

// 1 = inner, 2 = middle, 3 = outer
const TOOLS = [
  { name: "Figma", Icon: FigmaIcon, href: "https://figma.com", ring: 1, angle: 0 },
  { name: "Cursor", Icon: CursorIcon, href: "https://cursor.com", ring: 1, angle: 72 },
  { name: "Notion", Icon: NotionIcon, href: "https://notion.so", ring: 1, angle: 144 },
  { name: "Runway", Icon: RunwayIcon, href: "https://runwayml.com", ring: 1, angle: 216 },
  { name: "Copilot", Icon: CopilotIcon, href: "https://copilot.microsoft.com", ring: 1, angle: 288 },

  { name: "ChatGPT", Icon: ChatGPTIcon, href: "https://chatgpt.com", ring: 2, angle: 30 },
  { name: "Hugging Face", Icon: HuggingFaceIcon, href: "https://huggingface.co", ring: 2, angle: 120 },
  { name: "lovable", Icon: LovableIcon, href: "https://lovable.dev", ring: 2, angle: 210 },
  { name: "Perplexity", Icon: PerplexityIcon, href: "https://perplexity.ai", ring: 2, angle: 300 },

  { name: "OpenAI", Icon: OpenAIIcon, href: "https://openai.com", ring: 3, angle: 60 },
  { name: "Gemini", Icon: GeminiIcon, href: "https://gemini.google.com", ring: 3, angle: 150 },
  { name: "Midjourney", Icon: MidjourneyIcon, href: "https://midjourney.com", ring: 3, angle: 240 },
  { name: "Claude", Icon: ClaudeIcon, href: "https://claude.ai", ring: 3, angle: 330 },
];

const RING_RADII = { 1: 140, 2: 240, 3: 350 };
const RING_DURATIONS = { 1: 35, 2: 50, 3: 70 }; // Seconds for one full orbit

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="top" className="relative w-full overflow-hidden bg-[#05030b] text-white pt-24 min-h-screen flex flex-col justify-between">
      
      {/* ----------------- DENSE STARFIELD ----------------- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="stars-layer stars-small" />
        <div className="stars-layer stars-medium" />
        <div className="stars-layer stars-large" />
      </div>

      {/* ----------------- MAIN CONTENT GRID ----------------- */}
      <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 flex-1">
        
        {/* LEFT: Text Content */}
        <div ref={ref} className="flex flex-col justify-center max-w-xl xl:max-w-2xl pt-10 lg:pt-0">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-mono tracking-[0.2em] text-white/80 uppercase backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]" />
              Admissions Open · Batch 01
            </div>
          </Reveal>

          <h1 className="mt-8 font-display text-[clamp(3rem,7vw,5.5rem)] font-black leading-[0.9] tracking-tight uppercase">
            <span className={`block transition-all duration-1000 transform ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              Build the Future.
            </span>
            <span 
              className={`block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-200 transition-all duration-1000 delay-150 transform ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ textShadow: "0 0 60px rgba(168, 85, 247, 0.4)" }}
            >
              Start Now.
            </span>
          </h1>

          <Reveal delay={280} className="mt-8 flex items-center gap-3">
            <div className="h-2 w-2 rotate-45 bg-purple-500 shadow-[0_0_10px_#a855f7]" />
            <div className="h-px w-32 bg-gradient-to-r from-purple-500 to-transparent opacity-60" />
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-8 max-w-lg text-[17px] text-white/60 leading-relaxed font-light">
              Spark Labs is a 6-week AI innovation program for students aged 12–25. No lectures.
              No theory dumps. Just you, the right tools, and real-world projects that make an impact.
            </p>
          </Reveal>

          <Reveal delay={440} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to="/admissions"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-purple-600 px-8 py-4 text-[15px] font-semibold text-white shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all duration-300 hover:bg-purple-500 hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] hover:-translate-y-0.5"
            >
              Apply for Admission
              <ArrowRight className="h-4 w-4" />
            </Link>
            <ApplyButton mode="counsel" variant="ghost" className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-[15px] text-white transition-all hover:bg-white/10 hover:border-white/20">
              <CalendarCheck className="h-4 w-4 text-purple-400" />
              Book a Free Counseling Session
            </ApplyButton>
          </Reveal>
        </div>

        {/* RIGHT: Dynamic Orbit System */}
        <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-full scale-[0.65] sm:scale-75 md:scale-90 lg:scale-100 origin-center lg:origin-right xl:origin-center mt-10 lg:mt-0 z-10">
          
          <div className="relative w-[10px] h-[10px]">
            {/* Background Orbit Guide Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" style={{ width: RING_RADII[1]*2, height: RING_RADII[1]*2 }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" style={{ width: RING_RADII[2]*2, height: RING_RADII[2]*2 }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" style={{ width: RING_RADII[3]*2, height: RING_RADII[3]*2 }} />

            {/* Core Spark Logo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative grid h-28 w-28 place-items-center rounded-full border border-purple-500/20 bg-[#080415] shadow-[0_0_80px_rgba(168,85,247,0.3)] backdrop-blur-md">
                <SparkMark className="h-12 w-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                {/* Core pulse glow */}
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-purple-500 duration-[3000ms]" />
              </div>
            </div>

            {/* Orbiting Tools */}
            {TOOLS.map((tool) => {
              const radius = RING_RADII[tool.ring as keyof typeof RING_RADII];
              const duration = RING_DURATIONS[tool.ring as keyof typeof RING_DURATIONS];
              const delay = -1 * (tool.angle / 360) * duration; // Calculate exact delay to space them out

              return (
                <div key={tool.name} className="absolute top-1/2 left-1/2 z-30" style={{ width: 0, height: 0 }}>
                  <div 
                    className="absolute top-0 left-0 flex items-center justify-center animate-spin-orbit"
                    style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
                  >
                    <div style={{ transform: `translateY(-${radius}px)` }}>
                      <div 
                        className="flex items-center justify-center animate-counter-spin"
                        style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
                      >
                        <a
                          href={tool.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0c081c]/90 px-3.5 py-2 text-xs font-medium text-white/90 backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-purple-500/60 hover:bg-[#130d26] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] whitespace-nowrap"
                        >
                          <tool.Icon />
                          <span>{tool.name}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ----------------- BOTTOM PLANET & STATS ----------------- */}
      <div className="relative mt-20 pt-32 lg:pt-40 w-full overflow-hidden flex flex-col items-center justify-end z-20">
        
        {/* Moving Planet Background Element */}
        <div className="absolute bottom-[-150px] sm:bottom-[-200px] left-1/2 -translate-x-1/2 w-[150vw] min-w-[1200px] h-[400px] sm:h-[600px]">
          {/* Planet Body with gentle rotating movement */}
          <div className="w-full h-full rounded-[50%_50%_0_0] border-t border-purple-500/40 bg-gradient-to-b from-[#13072e] via-[#05030b] to-[#05030b] shadow-[inset_0_50px_100px_rgba(147,51,234,0.15)] animate-planet-breathe" />
          
          {/* Intense Lens Flare on Horizon */}
          <div className="absolute top-[-50px] left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.6)_0%,rgba(168,85,247,0.15)_40%,transparent_70%)] blur-[40px] pointer-events-none" />
          <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-[300px] h-[50px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.8)_0%,rgba(216,180,254,0.4)_40%,transparent_70%)] blur-[10px] pointer-events-none" />
        </div>

        {/* Stats Pill - Sitting exactly on the planet curve */}
        <Reveal delay={500} className="relative z-30 w-full max-w-5xl px-6 mb-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 rounded-3xl border border-white/10 bg-[#0c081c]/70 p-4 sm:p-6 shadow-[0_30px_60px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
            <StatPill Icon={Users} value="32+" label="Students per batch" />
            <StatPill Icon={FlaskConical} value="16+" label="Hands-on projects" />
            <StatPill Icon={Clock} value="21 Days" label="Intensive journey" />
            <StatPill Icon={Rocket} value="Real World" label="Impact driven" />
          </div>
        </Reveal>

        {/* Bottom Tagline */}
        <Reveal delay={600} className="relative z-30 pb-12 text-center">
          <p className="font-mono text-[11px] sm:text-xs font-bold tracking-[0.3em] text-purple-400 uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
            Learn. Build. Ship. Impact.
          </p>
          <p className="mt-2 text-xs text-white/40 font-light">
            Supported by the world's most powerful AI tools.
          </p>
        </Reveal>
      </div>

      {/* ----------------- STYLES ----------------- */}
      <style>{`
        /* Mathematical Orbit Animations */
        @keyframes spin-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes counter-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-spin-orbit {
          animation-name: spin-orbit;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .animate-counter-spin {
          animation-name: counter-spin;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        /* Planet Movement */
        @keyframes planet-breathe {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        .animate-planet-breathe {
          animation: planet-breathe 10s ease-in-out infinite;
        }

        /* Twinkling Starfield Generator */
        .stars-layer {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%;
        }
        
        /* Using multiple box-shadows to generate random-looking stars */
        .stars-small {
          background: transparent;
          box-shadow: 
            15vw 20vh 1px 0px rgba(255,255,255,0.8),
            80vw 10vh 1px 0px rgba(255,255,255,0.6),
            50vw 50vh 1px 0px rgba(255,255,255,0.9),
            20vw 80vh 1px 0px rgba(255,255,255,0.7),
            90vw 70vh 1px 0px rgba(255,255,255,0.5),
            40vw 15vh 1px 0px rgba(255,255,255,0.8),
            60vw 85vh 1px 0px rgba(255,255,255,0.9),
            10vw 40vh 1px 0px rgba(255,255,255,0.6),
            75vw 35vh 1px 0px rgba(255,255,255,0.7),
            30vw 60vh 1px 0px rgba(255,255,255,0.8);
          animation: twinkle-1 4s ease-in-out infinite alternate;
        }

        .stars-medium {
          background: transparent;
          box-shadow: 
            25vw 30vh 2px 0px rgba(255,255,255,0.7),
            65vw 20vh 1.5px 0px rgba(216,180,254,0.8),
            85vw 60vh 2px 0px rgba(255,255,255,0.6),
            15vw 70vh 1.5px 0px rgba(255,255,255,0.9),
            45vw 85vh 2px 0px rgba(216,180,254,0.7),
            5vw 10vh 1.5px 0px rgba(255,255,255,0.8),
            95vw 90vh 2px 0px rgba(255,255,255,0.7),
            55vw 45vh 1.5px 0px rgba(216,180,254,0.9);
          animation: twinkle-2 6s ease-in-out infinite alternate-reverse;
        }

        .stars-large {
          background: transparent;
          box-shadow: 
            35vw 40vh 2.5px 0px rgba(255,255,255,0.9),
            70vw 5vh 3px 0px rgba(216,180,254,0.8),
            20vw 90vh 2.5px 0px rgba(255,255,255,0.7),
            80vw 80vh 3px 0px rgba(255,255,255,0.9);
          animation: twinkle-3 8s ease-in-out infinite alternate;
        }

        @keyframes twinkle-1 { 0% { opacity: 0.2; } 100% { opacity: 1; } }
        @keyframes twinkle-2 { 0% { opacity: 0.1; } 100% { opacity: 0.8; } }
        @keyframes twinkle-3 { 0% { opacity: 0.3; transform: scale(0.9); } 100% { opacity: 1; transform: scale(1.2); } }
      `}</style>
    </section>
  );
}

function StatPill({ Icon, value, label }: { Icon: any; value: string; label: string }) {
  return (
    <div className="flex flex-col xl:flex-row items-center xl:items-start gap-3 p-2 text-center xl:text-left">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)]">
        <Icon className="h-4 w-4" />
      </span>
      <div className="leading-tight">
        <div className="font-display text-lg sm:text-xl font-bold text-white">{value}</div>
        <div className="mt-1 font-mono text-[9px] sm:text-[10px] tracking-widest text-white/50 uppercase">{label}</div>
      </div>
    </div>
  );
}
