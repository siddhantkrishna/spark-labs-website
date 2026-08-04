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

/* --------------------------- ORBIT DATA --------------------------- */

const TOOLS = [
  // Ring 1 (Inner)
  { name: "Figma", Icon: FigmaIcon, href: "https://figma.com", ring: 1, angle: 45 },
  { name: "Runway", Icon: RunwayIcon, href: "https://runwayml.com", ring: 1, angle: 135 },
  { name: "Notion", Icon: NotionIcon, href: "https://notion.so", ring: 1, angle: 225 },
  { name: "Cursor", Icon: CursorIcon, href: "https://cursor.com", ring: 1, angle: 315 },

  // Ring 2 (Middle)
  { name: "Copilot", Icon: CopilotIcon, href: "https://copilot.microsoft.com", ring: 2, angle: 15 },
  { name: "Hugging Face", Icon: HuggingFaceIcon, href: "https://huggingface.co", ring: 2, angle: 90 },
  { name: "ChatGPT", Icon: ChatGPTIcon, href: "https://chatgpt.com", ring: 2, angle: 190 },
  { name: "lovable", Icon: LovableIcon, href: "https://lovable.dev", ring: 2, angle: 260 },

  // Ring 3 (Outer)
  { name: "Perplexity", Icon: PerplexityIcon, href: "https://perplexity.ai", ring: 3, angle: 30 },
  { name: "Midjourney", Icon: MidjourneyIcon, href: "https://midjourney.com", ring: 3, angle: 110 },
  { name: "Gemini", Icon: GeminiIcon, href: "https://gemini.google.com", ring: 3, angle: 160 },
  { name: "OpenAI", Icon: OpenAIIcon, href: "https://openai.com", ring: 3, angle: 250 },
  { name: "Claude", Icon: ClaudeIcon, href: "https://claude.ai", ring: 3, angle: 330 },
];

const RING_RADII = { 1: 160, 2: 280, 3: 400 };
const RING_DURATIONS = { 1: 40, 2: 60, 3: 80 };

export function Hero() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="top" className="relative w-full h-screen min-h-[950px] bg-[#05010d] overflow-hidden flex flex-col justify-start text-white">
      
      {/* 1. TWINKLING STARFIELD BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="stars-layer stars-small" />
        <div className="stars-layer stars-medium" />
        <div className="stars-layer stars-large" />
      </div>

      {/* 2. MAIN CONTENT CONTAINER (Text on Left) */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pt-[140px] md:pt-[180px]">
        <div ref={ref} className="max-w-[600px]">
          
          {/* Badge */}
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-[#0d061f]/60 px-4 py-1.5 text-[11px] font-mono tracking-[0.2em] text-white/70 uppercase backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_8px_#a855f7]" />
              Admissions Open · Batch 01
            </div>
          </Reveal>

          {/* Heading */}
          <h1 className="mt-8 font-display text-[clamp(3rem,6vw,5.5rem)] font-bold leading-[1.05] tracking-tight uppercase">
            <span className={`block text-white transition-all duration-1000 transform ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              Build the Future.
            </span>
            <span 
              className={`block text-[#a074ff] transition-all duration-1000 delay-150 transform ${inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
              style={{ textShadow: "0 0 50px rgba(160, 116, 255, 0.5)" }}
            >
              Start Now.
            </span>
          </h1>

          {/* Divider */}
          <Reveal delay={280} className="mt-8 flex items-center gap-3">
            <div className="h-2 w-2 rotate-45 bg-[#a074ff] shadow-[0_0_12px_#a074ff]" />
            <div className="h-px w-64 bg-gradient-to-r from-[#a074ff] to-transparent opacity-50" />
          </Reveal>

          {/* Description */}
          <Reveal delay={340}>
            <p className="mt-8 text-[16px] text-white/60 leading-relaxed font-light">
              Spark Labs is a 6-week AI innovation program for students aged 12–25. No lectures. No theory dumps. Just you, the right tools, and real-world projects that make an impact.
            </p>
          </Reveal>

          {/* Buttons */}
          <Reveal delay={440} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to="/admissions"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-7 py-3.5 text-[15px] font-medium text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(124,58,237,0.7)] hover:-translate-y-0.5 border border-purple-400/20"
            >
              Apply for Admission
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <ApplyButton mode="counsel" variant="ghost" className="rounded-full border border-white/20 bg-[#0a0514]/50 px-7 py-3.5 text-[15px] text-white/90 transition-all hover:bg-white/10 hover:border-white/30 backdrop-blur-md">
              <CalendarCheck className="h-4 w-4 text-white/70 mr-1" />
              Book a Free Counseling Session
            </ApplyButton>
          </Reveal>
        </div>
      </div>

      {/* 3. ABSOLUTE POSITIONED ORBIT SYSTEM (Immune to Flex/Grid distortion) */}
      <div className="absolute top-[35%] lg:top-[45%] right-[10%] lg:right-[25%] w-0 h-0 z-10 hidden md:block">
        
        {/* Faint Background Rings */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] pointer-events-none" style={{ width: RING_RADII[1]*2, height: RING_RADII[1]*2 }} />
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] pointer-events-none" style={{ width: RING_RADII[2]*2, height: RING_RADII[2]*2 }} />
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.05] pointer-events-none" style={{ width: RING_RADII[3]*2, height: RING_RADII[3]*2 }} />

        {/* Core Spark Logo */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="flex items-center justify-center h-28 w-28 rounded-full bg-[#05010d] border border-white/10 shadow-[0_0_80px_rgba(160,116,255,0.15)] backdrop-blur-xl">
            <SparkMark className="h-12 w-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]" />
          </div>
        </div>

        {/* Orbiting Tools */}
        {TOOLS.map((tool) => {
          const radius = RING_RADII[tool.ring as keyof typeof RING_RADII];
          const duration = RING_DURATIONS[tool.ring as keyof typeof RING_DURATIONS];

          return (
            <div key={tool.name} className="absolute top-0 left-0 z-30" style={{ transform: `rotate(${tool.angle}deg)` }}>
              <div className="orbit-spin" style={{ animationDuration: `${duration}s` }}>
                <div style={{ transform: `translate(0, -${radius}px)` }}>
                  <div className="orbit-counter-spin" style={{ animationDuration: `${duration}s` }}>
                    <div style={{ transform: `rotate(-${tool.angle}deg)` }}>
                      
                      {/* Actual Tool Badge */}
                      <a
                        href={tool.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2.5 rounded-[14px] border border-white/10 bg-[#0d071f]/80 px-4 py-2.5 text-[13px] font-medium text-white/90 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:border-purple-500/60 hover:bg-[#160a33] hover:shadow-[0_0_25px_rgba(160,116,255,0.4)] whitespace-nowrap"
                      >
                        <tool.Icon />
                        <span>{tool.name}</span>
                      </a>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. BOTTOM PLANET & STATS CONTAINER */}
      <div className="absolute bottom-0 left-0 w-full h-[400px] pointer-events-none z-20 overflow-hidden">
        
        {/* Massive Planet Horizon */}
        <div className="absolute bottom-[-200px] left-1/2 -translate-x-1/2 w-[250vw] md:w-[150vw] h-[500px]">
          <div className="w-full h-full rounded-[100%] bg-[#030108] border-t-[1px] border-[#a074ff]/40 shadow-[inset_0_80px_150px_rgba(160,116,255,0.1)] relative overflow-hidden">
            
            {/* Soft Ambient Inner Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(160,116,255,0.15),transparent_70%)]" />
          </div>
        </div>
        
        {/* Intense Central Lens Flare at Planet Horizon */}
        <div className="absolute bottom-[280px] left-1/2 -translate-x-1/2 w-[80vw] max-w-[1000px] h-[150px] bg-[radial-gradient(ellipse_at_center,rgba(160,116,255,0.4)_0%,transparent_60%)] blur-[30px]" />
        <div className="absolute bottom-[290px] left-1/2 -translate-x-1/2 w-[400px] h-[30px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9)_0%,rgba(160,116,255,0.6)_40%,transparent_70%)] blur-[8px]" />

      </div>

      {/* 5. FLOATING STATS PILL (Above Planet) */}
      <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-30">
        <Reveal delay={500}>
          <div className="flex flex-col sm:flex-row items-center justify-between rounded-3xl border border-white/10 bg-[#080315]/60 px-8 py-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl gap-6 sm:gap-4">
            <StatPill Icon={Users} value="32+" label="Students per batch" />
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <StatPill Icon={FlaskConical} value="16+" label="Hands-on projects" />
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <StatPill Icon={Clock} value="21 Days" label="Intensive journey" />
            <div className="hidden sm:block w-px h-12 bg-white/10" />
            <StatPill Icon={Rocket} value="Real World" label="Impact driven" />
          </div>
        </Reveal>
      </div>

      {/* 6. BOTTOM TAGLINE */}
      <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 w-full z-30 text-center">
        <Reveal delay={600}>
          <p className="font-mono text-[11px] font-bold tracking-[0.3em] text-[#8b5cf6] uppercase">
            Learn. Build. Ship. Impact.
          </p>
          <p className="mt-1.5 text-[11px] text-white/30 font-light tracking-wide">
            Supported by the world's most powerful AI tools.
          </p>
        </Reveal>
      </div>

      {/* ----------------- STYLES ----------------- */}
      <style>{`
        /* True Orbital Math Animations */
        .orbit-spin {
          position: absolute;
          top: 0; left: 0;
          animation: orbit-spin-keyframes linear infinite;
        }
        .orbit-counter-spin {
          position: absolute;
          animation: orbit-counter-spin-keyframes linear infinite;
        }
        @keyframes orbit-spin-keyframes {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-counter-spin-keyframes {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        /* Twinkling Starfield Generator */
        .stars-layer {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%; height: 100%;
        }
        
        .stars-small {
          background: transparent;
          box-shadow: 
            10vw 20vh 1px 0px rgba(255,255,255,0.8),
            80vw 10vh 1px 0px rgba(255,255,255,0.6),
            50vw 50vh 1px 0px rgba(255,255,255,0.9),
            20vw 80vh 1px 0px rgba(255,255,255,0.7),
            90vw 70vh 1px 0px rgba(255,255,255,0.5),
            40vw 15vh 1px 0px rgba(255,255,255,0.8),
            60vw 85vh 1px 0px rgba(255,255,255,0.9),
            15vw 40vh 1px 0px rgba(255,255,255,0.6),
            75vw 35vh 1px 0px rgba(255,255,255,0.7),
            30vw 60vh 1px 0px rgba(255,255,255,0.8),
            5vw 90vh 1px 0px rgba(255,255,255,0.9),
            95vw 30vh 1px 0px rgba(255,255,255,0.6),
            45vw 30vh 1px 0px rgba(255,255,255,0.9),
            85vw 90vh 1px 0px rgba(255,255,255,0.7);
          animation: twinkle-1 3s ease-in-out infinite alternate;
        }

        .stars-medium {
          background: transparent;
          box-shadow: 
            25vw 30vh 1.5px 0px rgba(255,255,255,0.7),
            65vw 20vh 1.5px 0px rgba(216,180,254,0.8),
            85vw 50vh 1.5px 0px rgba(255,255,255,0.6),
            15vw 70vh 1.5px 0px rgba(255,255,255,0.9),
            45vw 85vh 1.5px 0px rgba(216,180,254,0.7),
            8vw 15vh 1.5px 0px rgba(255,255,255,0.8),
            95vw 80vh 1.5px 0px rgba(255,255,255,0.7),
            55vw 45vh 1.5px 0px rgba(216,180,254,0.9),
            35vw 90vh 1.5px 0px rgba(255,255,255,0.8),
            75vw 65vh 1.5px 0px rgba(216,180,254,0.7);
          animation: twinkle-2 5s ease-in-out infinite alternate-reverse;
        }

        .stars-large {
          background: transparent;
          box-shadow: 
            35vw 40vh 2px 0px rgba(255,255,255,1),
            70vw 15vh 2px 0px rgba(216,180,254,0.9),
            20vw 90vh 2px 0px rgba(255,255,255,0.8),
            80vw 80vh 2px 0px rgba(255,255,255,1),
            88vw 30vh 2px 0px rgba(216,180,254,0.8),
            10vw 60vh 2px 0px rgba(255,255,255,0.9);
          animation: twinkle-3 4s ease-in-out infinite alternate;
        }

        @keyframes twinkle-1 { 0% { opacity: 0.2; } 100% { opacity: 1; } }
        @keyframes twinkle-2 { 0% { opacity: 0.1; } 100% { opacity: 0.9; } }
        @keyframes twinkle-3 { 0% { opacity: 0.4; transform: scale(0.8); } 100% { opacity: 1; transform: scale(1.1); } }
      `}</style>
    </section>
  );
}

function StatPill({ Icon, value, label }: { Icon: any; value: string; label: string }) {
  return (
    <div className="flex items-center gap-4 text-left w-full sm:w-auto justify-center sm:justify-start">
      <span className="flex-shrink-0 text-[#9b66ff]">
        <Icon className="h-6 w-6 stroke-[1.5]" />
      </span>
      <div className="leading-tight">
        <div className="font-display text-[1.15rem] font-semibold text-white/90">{value}</div>
        <div className="mt-0.5 font-mono text-[9px] tracking-wider text-white/40 uppercase">{label}</div>
      </div>
    </div>
  );
}
