// Hero.tsx
// Spark Labs — Hero Section
// ADAPT: Reveal / useInView / ApplyButton prop shapes if they differ in your codebase.

import { useState, type FC, type ReactNode, type SVGProps } from 'react';
import { ApplyButton, Reveal, SparkMark } from '@/components/ui';
import { useInView } from '@/hooks/useInView';

/* =========================================================================
   1. BRAND ICONS (inline SVG, ~18–20px, authentic-ish brand colors)
   ========================================================================= */

type IconProps = SVGProps<SVGSVGElement>;

const OpenAIIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <path
      fill="#ffffff"
      d="M22.28 9.82a5.98 5.98 0 0 0-.52-4.91 6.05 6.05 0 0 0-6.51-2.9A6.07 6.07 0 0 0 4.98 4.18a5.98 5.98 0 0 0-4 2.9 6.05 6.05 0 0 0 .75 7.09 5.98 5.98 0 0 0 .52 4.91 6.05 6.05 0 0 0 6.51 2.9 5.98 5.98 0 0 0 4.51 2.02c2.42 0 4.55-1.55 5.32-3.84a5.98 5.98 0 0 0 4-2.9 6.05 6.05 0 0 0-.31-7.44Zm-9.02 12.61a4.48 4.48 0 0 1-2.87-1.04l.14-.08 4.78-2.76a.79.79 0 0 0 .39-.68V11a4.5 4.5 0 0 1 2.02 3.74v3.75a4.5 4.5 0 0 1-4.46 4.94ZM4.6 18.3a4.47 4.47 0 0 1-.53-3.01l.14.08 4.78 2.76a.77.77 0 0 0 .78 0l5.84-3.37v2.33a.08.08 0 0 1-.03.06L9.74 19.95a4.5 4.5 0 0 1-5.14-1.65ZM3.34 8.9A4.49 4.49 0 0 1 5.7 6.92v3.87a.77.77 0 0 0 .39.68l5.81 3.35-2.02 1.17a.08.08 0 0 1-.07 0L4.97 13.2A4.5 4.5 0 0 1 3.34 8.9Zm14.99-1.05-4.78-2.78a.79.79 0 0 0-.78 0L7.93 8.44V6.1a.07.07 0 0 1 .03-.06l4.83-2.79a4.5 4.5 0 0 1 6.69 4.66Z"
    />
  </svg>
);

const ClaudeIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <g stroke="#D97757" strokeWidth="2" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="8" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="2" y1="12" x2="8" y2="12" />
      <line x1="16" y1="12" x2="22" y2="12" />
      <line x1="4.9" y1="4.9" x2="9" y2="9" />
      <line x1="15" y1="15" x2="19.1" y2="19.1" />
      <line x1="19.1" y1="4.9" x2="15" y2="9" />
      <line x1="9" y1="15" x2="4.9" y2="19.1" />
    </g>
  </svg>
);

const GeminiIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <defs>
      <linearGradient id="sl-gemini-grad" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0%" stopColor="#4285F4" />
        <stop offset="100%" stopColor="#9B72CB" />
      </linearGradient>
    </defs>
    <path
      fill="url(#sl-gemini-grad)"
      d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10 5.523 0 10-4.477 10-10z"
    />
  </svg>
);

const LovableIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <defs>
      <linearGradient id="sl-lovable-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="100%" stopColor="#FF9F5B" />
      </linearGradient>
    </defs>
    <path
      fill="url(#sl-lovable-grad)"
      d="M12 21s-6.72-4.35-9.43-8.49C.94 9.94 1.5 6.5 4.2 5.1c2-1.05 4.3-.4 7.8 2.9 3.5-3.3 5.8-3.95 7.8-2.9 2.7 1.4 3.26 4.84 1.63 7.42C18.72 16.65 12 21 12 21z"
    />
  </svg>
);

const PerplexityIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="none" {...p}>
    <path stroke="#20B8CD" strokeWidth="1.5" d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
    <path stroke="#20B8CD" strokeWidth="1.5" d="M12 2v18M4 6.5 12 11l8-4.5M4 15.5 12 11l8 4.5" />
  </svg>
);

const MidjourneyIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <path
      fill="#ffffff"
      d="M2 15c2-4 4-6 6-6s3 2 4 4 2 4 4 4 4-2 6-6v3c-2 4-4 6-6 6s-3-2-4-4-2-4-4-4-4 2-6 6v-3z"
    />
  </svg>
);

const ChatGPTIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <g fill="#10A37F">
      <circle cx="12" cy="5" r="3" />
      <circle cx="12" cy="19" r="3" />
      <circle cx="5" cy="12" r="3" />
      <circle cx="19" cy="12" r="3" />
      <circle cx="12" cy="12" r="3.5" />
    </g>
  </svg>
);

const HuggingFaceIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <circle cx="12" cy="12" r="10" fill="#FFD21E" />
    <circle cx="8.5" cy="10" r="1.3" fill="#000" />
    <circle cx="15.5" cy="10" r="1.3" fill="#000" />
    <path d="M7 14c1.5 2 3 3 5 3s3.5-1 5-3" stroke="#000" strokeWidth="1.3" fill="none" strokeLinecap="round" />
  </svg>
);

const RunwayIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <circle cx="12" cy="12" r="9.5" fill="none" stroke="#00C853" strokeWidth="1.5" />
    <text x="12" y="16" textAnchor="middle" fontSize="11" fill="#00C853" fontFamily="monospace" fontWeight="700">
      R
    </text>
  </svg>
);

const CopilotIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <defs>
      <linearGradient id="sl-copilot-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4C6EF5" />
        <stop offset="50%" stopColor="#9775FA" />
        <stop offset="100%" stopColor="#FF922B" />
      </linearGradient>
    </defs>
    <circle cx="12" cy="12" r="9" fill="none" stroke="url(#sl-copilot-grad)" strokeWidth="2.2" />
    <circle cx="9" cy="12" r="1.4" fill="#fff" />
    <circle cx="15" cy="12" r="1.4" fill="#fff" />
  </svg>
);

const NotionIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="3" fill="#ffffff" />
    <text x="12" y="16.5" textAnchor="middle" fontSize="12" fontWeight="700" fill="#000" fontFamily="Georgia, serif">
      N
    </text>
  </svg>
);

const FigmaIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <circle cx="9" cy="6" r="3" fill="#F24E1E" />
    <circle cx="9" cy="12" r="3" fill="#A259FF" />
    <circle cx="9" cy="18" r="3" fill="#0ACF83" />
    <circle cx="15" cy="6" r="3" fill="#FF7262" />
    <circle cx="15" cy="12" r="3" fill="#1ABCFE" />
  </svg>
);

const CursorIcon: FC<IconProps> = (p) => (
  <svg viewBox="0 0 24 24" width={18} height={18} {...p}>
    <path fill="#ffffff" d="M4 2l14 8.5-6 1.5-2.5 6L4 2z" />
  </svg>
);

/* =========================================================================
   2. ORBIT TOOL DATA
   ========================================================================= */

interface OrbitTool {
  name: string;
  href: string;
  Icon: FC<IconProps>;
  ring: 1 | 2 | 3 | 4;
  angle: number; // degrees, 0 = right (3 o'clock), clockwise positive
}

const TOOLS: OrbitTool[] = [
  { name: 'Claude', href: 'https://claude.ai', Icon: ClaudeIcon, ring: 1, angle: 270 },
  { name: 'lovable', href: 'https://lovable.dev', Icon: LovableIcon, ring: 1, angle: 180 },
  { name: 'Perplexity', href: 'https://perplexity.ai', Icon: PerplexityIcon, ring: 1, angle: 0 },
  { name: 'Runway', href: 'https://runwayml.com', Icon: RunwayIcon, ring: 1, angle: 100 },

  { name: 'OpenAI', href: 'https://openai.com', Icon: OpenAIIcon, ring: 2, angle: 250 },
  { name: 'ChatGPT', href: 'https://chatgpt.com', Icon: ChatGPTIcon, ring: 2, angle: 190 },
  { name: 'Copilot', href: 'https://copilot.microsoft.com', Icon: CopilotIcon, ring: 2, angle: 60 },
  { name: 'Notion', href: 'https://notion.so', Icon: NotionIcon, ring: 2, angle: 150 },

  { name: 'Gemini', href: 'https://gemini.google.com', Icon: GeminiIcon, ring: 3, angle: 300 },
  { name: 'Midjourney', href: 'https://midjourney.com', Icon: MidjourneyIcon, ring: 3, angle: 20 },
  { name: 'Figma', href: 'https://figma.com', Icon: FigmaIcon, ring: 3, angle: 90 },

  { name: 'Hugging Face', href: 'https://huggingface.co', Icon: HuggingFaceIcon, ring: 4, angle: 340 },
  { name: 'Cursor', href: 'https://cursor.com', Icon: CursorIcon, ring: 4, angle: 70 },
];

const RING_CONFIG: Record<
  1 | 2 | 3 | 4,
  { sizePct: number; radiusCqw: number; duration: number; dir: 1 | -1 }
> = {
  1: { sizePct: 48, radiusCqw: 24, duration: 120, dir: 1 },
  2: { sizePct: 66, radiusCqw: 33, duration: 150, dir: -1 },
  3: { sizePct: 82, radiusCqw: 41, duration: 120, dir: 1 },
  4: { sizePct: 98, radiusCqw: 49, duration: 150, dir: -1 },
};

/* =========================================================================
   3. STAR FIELD DATA
   ========================================================================= */

function starLayer(seed: number, size: string) {
  const dots: string[] = [];
  const count = 13;
  for (let i = 0; i < count; i++) {
    const x = (seed * (i + 1) * 37) % 100;
    const y = (seed * (i + 2) * 53) % 100;
    dots.push(`radial-gradient(${size} ${size} at ${x}% ${y}%, #fff, transparent)`);
  }
  return dots.join(', ');
}

/* =========================================================================
   4. COUNSELING MODAL (self-contained placeholder)
   ========================================================================= */

const CounselingModal: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <div className="sl-modal-backdrop" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="sl-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="sl-modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <h3 className="text-xl font-bold mb-2">Book a Free Counseling Session</h3>
        <p className="text-sm text-[var(--color-muted,#9ca3af)] mb-4">
          Tell us a bit about you and we&apos;ll reach out to schedule a free session with our team.
        </p>
        {/* ADAPT: replace with your real booking form / calendar embed / Supabase form handler */}
        <a
          href="mailto:hello@sparklabs.in?subject=Free Counseling Session"
          className="sl-cta-primary inline-flex"
        >
          Email us →
        </a>
      </div>
    </div>
  );
};

/* =========================================================================
   5. HERO COMPONENT
   ========================================================================= */

const Divider = () => (
  <div className="flex items-center gap-3 my-6">
    <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa] shrink-0" />
    <span className="sl-divider-line h-px flex-1 max-w-[140px]" />
  </div>
);

const OrbitRing: FC<{ ring: 1 | 2 | 3 | 4; children: ReactNode }> = ({ ring, children }) => {
  const cfg = RING_CONFIG[ring];
  const spinName = cfg.dir === 1 ? 'sl-spin-cw' : 'sl-spin-ccw';
  return (
    <div className="sl-ring" style={{ width: `${cfg.sizePct}%`, height: `${cfg.sizePct}%` }}>
      <div
        className="sl-ring-spin"
        style={{ animation: `${spinName} ${cfg.duration}s linear infinite` }}
      >
        {children}
      </div>
    </div>
  );
};

const OrbitBadge: FC<{ tool: OrbitTool; index: number }> = ({ tool, index }) => {
  const cfg = RING_CONFIG[tool.ring];
  const counterName = cfg.dir === 1 ? 'sl-spin-ccw' : 'sl-spin-cw';
  const Icon = tool.Icon;

  return (
    <div
      className="sl-orbit-item"
      style={{
        transform: `translate(-50%, -50%) rotate(${tool.angle}deg) translateX(${cfg.radiusCqw}cqw)`,
      }}
    >
      <div className="sl-orbit-fix" style={{ transform: `rotate(${-tool.angle}deg)` }}>
        <div
          className="sl-orbit-counter"
          style={{ animation: `${counterName} ${cfg.duration}s linear infinite` }}
        >
          <a
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            className="sl-badge"
            style={{ animationDelay: `${(index % 5) * 0.4}s` }}
            aria-label={`Open ${tool.name} website`}
          >
            <Icon />
            <span>{tool.name}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const OrbitScene: FC = () => (
  <div className="sl-orbit-scene">
    <div className="sl-orbit-inner">
      {([1, 2, 3, 4] as const).map((ring) => (
        <OrbitRing key={ring} ring={ring}>
          {TOOLS.filter((t) => t.ring === ring).map((tool, i) => (
            <OrbitBadge key={tool.name} tool={tool} index={i} />
          ))}
        </OrbitRing>
      ))}

      <div className="sl-core">
        <SparkMark className="sl-core-mark" />
      </div>
    </div>
  </div>
);

const STATS = [
  { icon: '👥', value: '32+', label: 'Students per batch' },
  { icon: '🧪', value: '16+', label: 'Hands-on projects' },
  { icon: '🕐', value: '21 Days', label: 'Intensive journey' },
  { icon: '🚀', value: 'Real World', label: 'Impact driven' },
];

const Hero: FC = () => {
  const [counselingOpen, setCounselingOpen] = useState(false);

  // ADAPT: swap for your real useInView(...) return signature if different.
  const { ref: headlineRef, inView: headlineInView } = useInView<HTMLDivElement>({
    threshold: 0.4,
  });

  return (
    <section className="sl-hero relative overflow-hidden">
      {/* ---------------- BACKGROUND (dark mode only) ---------------- */}
      <div className="sl-space-bg" aria-hidden="true">
        <div className="sl-top-glow" />
        <div className="sl-horizon-glow" />
        <div className="sl-horizon-line" />
        <div className="sl-stars sl-stars-1" />
        <div className="sl-stars sl-stars-2" />
        <div className="sl-stars sl-stars-3" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 lg:py-32">
        {/* ---------------- TWO COLUMN GRID ---------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-16 items-center">
          {/* -------- LEFT COLUMN -------- */}
          <div>
            <Reveal>
              <span className="sl-badge-pill">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
                Admissions Open · Batch 01
              </span>
            </Reveal>

            <div ref={headlineRef} className={`sl-headline ${headlineInView ? 'sl-inview' : ''}`}>
              <span className="sl-headline-line">
                <span className="sl-headline-text sl-line-1">Build The Future.</span>
              </span>
              <span className="sl-headline-line">
                <span className="sl-headline-text sl-line-2">Start Now.</span>
              </span>
            </div>

            <Divider />

            <Reveal>
              <p className="sl-body-text max-w-md">
                Spark Labs is a 6-week AI innovation program for students aged 12–25. No
                lectures. No theory dumps. Just you, the right tools, and real-world projects
                that make an impact.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <ApplyButton href="/admissions" className="sl-cta-primary">
                  Apply for Admission <span aria-hidden="true">→</span>
                </ApplyButton>
                <button className="sl-cta-ghost" onClick={() => setCounselingOpen(true)}>
                  <span aria-hidden="true">📅</span> Book a Free Counseling Session
                </button>
              </div>
            </Reveal>
          </div>

          {/* -------- RIGHT COLUMN — ORBIT SCENE -------- */}
          <Reveal>
            <OrbitScene />
          </Reveal>
        </div>

        {/* ---------------- STATS BAR ---------------- */}
        <Reveal>
          <div className="sl-stats-card mx-auto max-w-5xl mt-20">
            {STATS.map((s) => (
              <div key={s.label} className="sl-stat">
                <div className="sl-stat-icon">{s.icon}</div>
                <div>
                  <div className="sl-stat-value">{s.value}</div>
                  <div className="sl-stat-label">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---------------- BOTTOM TAGLINE ---------------- */}
        <div className="text-center mt-12">
          <p className="sl-tagline">Learn. Build. Ship. Impact.</p>
          <p className="sl-tagline-sub">Supported by the world&apos;s most powerful AI tools.</p>
        </div>
      </div>

      <CounselingModal open={counselingOpen} onClose={() => setCounselingOpen(false)} />

      {/* =========================================================================
          6. SCOPED STYLES
         ========================================================================= */}
      <style>{`
        .sl-hero {
          background: #ffffff;
          color: #0a0a0a;
        }
        [data-theme='dark'] .sl-hero {
          background: #05030b;
          color: #ffffff;
        }

        /* ---------- Background: space scene ---------- */
        .sl-space-bg { display: none; }
        [data-theme='dark'] .sl-space-bg {
          display: block;
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .sl-top-glow {
          position: absolute;
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          height: 40%;
          background: radial-gradient(ellipse at center, rgba(167,139,250,0.16) 0%, transparent 70%);
        }
        .sl-horizon-glow {
          position: absolute;
          left: 50%;
          bottom: -55%;
          transform: translateX(-50%);
          width: 160%;
          aspect-ratio: 2 / 1;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(167,139,250,0.45) 0%, rgba(167,139,250,0.15) 35%, transparent 70%);
          filter: blur(2px);
        }
        .sl-horizon-line {
          position: absolute;
          left: 50%;
          bottom: -53.5%;
          transform: translateX(-50%);
          width: 160%;
          height: 2px;
          border-radius: 50%;
          box-shadow: 0 0 60px 14px rgba(167,139,250,0.55);
        }

        .sl-stars {
          position: absolute;
          inset: 0;
          background-repeat: no-repeat;
        }
        .sl-stars-1 { background-image: ${starLayer(3, '0.8px')}; animation: sl-twinkle-1 3.2s ease-in-out infinite; }
        .sl-stars-2 { background-image: ${starLayer(7, '1.1px')}; animation: sl-twinkle-2 4.5s ease-in-out infinite; }
        .sl-stars-3 { background-image: ${starLayer(11, '1.4px')}; animation: sl-twinkle-3 6s ease-in-out infinite; }

        @keyframes sl-twinkle-1 { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.9; } }
        @keyframes sl-twinkle-2 { 0%, 100% { opacity: 0.9; } 50% { opacity: 0.25; } }
        @keyframes sl-twinkle-3 { 0%, 100% { opacity: 0.4; } 45% { opacity: 1; } 55% { opacity: 1; } }

        /* ---------- Badge pill ---------- */
        .sl-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 9999px;
          border: 1px solid rgba(167,139,250,0.35);
          background: rgba(167,139,250,0.08);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 11px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #a78bfa;
        }

        /* ---------- Headline ---------- */
        .sl-headline {
          margin-top: 20px;
          font-weight: 900;
          text-transform: uppercase;
          line-height: 0.95;
          letter-spacing: -0.03em;
          font-size: clamp(2.8rem, 7.5vw, 5.5rem);
        }
        .sl-headline-line { display: block; overflow: hidden; }
        .sl-headline-text {
          display: inline-block;
          transform: translateY(115%);
          transition: transform 0.85s cubic-bezier(.22,1,.36,1);
        }
        .sl-headline.sl-inview .sl-line-1 { transform: translateY(0); transition-delay: 0.05s; }
        .sl-headline.sl-inview .sl-line-2 { transform: translateY(0); transition-delay: 0.22s; }
        .sl-line-1 { color: #0a0a0a; }
        [data-theme='dark'] .sl-line-1 { color: #ffffff; }
        .sl-line-2 { color: #a78bfa; }

        /* ---------- Divider ---------- */
        .sl-divider-line {
          background: linear-gradient(to right, rgba(167,139,250,0.6), transparent);
        }

        /* ---------- Body text ---------- */
        .sl-body-text {
          color: rgba(10,10,10,0.65);
          line-height: 1.7;
          font-size: 1rem;
        }
        [data-theme='dark'] .sl-body-text { color: rgba(255,255,255,0.62); }

        /* ---------- CTAs ---------- */
        .sl-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 9999px;
          background: #a78bfa;
          color: #0a0a0a;
          font-weight: 600;
          font-size: 0.95rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .sl-cta-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(167,139,250,0.35); }

        .sl-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border-radius: 9999px;
          border: 1px solid rgba(10,10,10,0.2);
          background: transparent;
          color: inherit;
          font-weight: 600;
          font-size: 0.95rem;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        [data-theme='dark'] .sl-cta-ghost { border-color: rgba(255,255,255,0.2); }
        .sl-cta-ghost:hover { border-color: #a78bfa; background: rgba(167,139,250,0.08); }

        /* ---------- Orbit scene ---------- */
        .sl-orbit-scene {
          position: relative;
          width: 100%;
          max-width: 380px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
          container-type: inline-size;
        }
        @media (min-width: 1024px) {
          .sl-orbit-scene { max-width: 560px; }
        }
        .sl-orbit-inner { position: absolute; inset: 0; }

        .sl-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.10);
        }
        [data-theme='light'] .sl-ring { border-color: transparent; }

        .sl-ring-spin { position: absolute; inset: 0; }

        .sl-orbit-item { position: absolute; top: 50%; left: 50%; }
        .sl-orbit-fix { display: inline-block; }
        .sl-orbit-counter { display: inline-block; }

        .sl-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 9999px;
          background: rgba(10,7,20,0.7);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.15);
          color: #ffffff;
          font-size: 13px;
          white-space: nowrap;
          text-decoration: none;
          animation: sl-badge-glow 3.2s ease-in-out infinite;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .sl-badge:hover { transform: scale(1.05); border-color: rgba(167,139,250,0.85); }

        [data-theme='light'] .sl-badge {
          background: #ffffff;
          color: #0a0a0a;
          border-color: rgba(10,10,10,0.12);
          box-shadow: 0 2px 10px rgba(0,0,0,0.06);
        }

        @keyframes sl-badge-glow {
          0%, 100% { box-shadow: 0 0 0 rgba(255,255,255,0.05); }
          50% { box-shadow: 0 0 12px rgba(167,139,250,0.55); }
        }

        @keyframes sl-spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes sl-spin-ccw { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }

        /* ---------- Central core ---------- */
        .sl-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 112px;
          height: 112px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at center, rgba(167,139,250,0.35), rgba(167,139,250,0.05) 60%, transparent 75%);
          animation: sl-core-breathe 3.5s ease-in-out infinite;
        }
        .sl-core-mark {
          width: 48px;
          height: 48px;
          color: #ffffff;
        }
        [data-theme='light'] .sl-core-mark { color: #0a0a0a; }

        @keyframes sl-core-breathe {
          0%, 100% {
            box-shadow: 0 0 30px 10px rgba(167,139,250,0.25), 0 0 60px 20px rgba(167,139,250,0.10);
          }
          50% {
            box-shadow: 0 0 50px 18px rgba(167,139,250,0.45), 0 0 90px 30px rgba(167,139,250,0.18);
          }
        }

        /* ---------- Stats bar ---------- */
        .sl-stats-card {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-radius: 1rem;
          border: 1px solid rgba(10,10,10,0.1);
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(10px);
          overflow: hidden;
        }
        [data-theme='dark'] .sl-stats-card {
          border-color: rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.03);
        }
        @media (min-width: 768px) {
          .sl-stats-card { grid-template-columns: repeat(4, 1fr); }
        }
        .sl-stat {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 24px;
          border-right: 1px solid rgba(10,10,10,0.08);
          border-bottom: 1px solid rgba(10,10,10,0.08);
        }
        [data-theme='dark'] .sl-stat {
          border-color: rgba(255,255,255,0.08);
        }
        .sl-stat:nth-child(2n) { border-right: none; }
        @media (min-width: 768px) {
          .sl-stat { border-bottom: none; }
          .sl-stat:nth-child(2n) { border-right: 1px solid rgba(10,10,10,0.08); }
          [data-theme='dark'] .sl-stat:nth-child(2n) { border-right-color: rgba(255,255,255,0.08); }
          .sl-stat:last-child { border-right: none; }
        }
        .sl-stat-icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(167,139,250,0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .sl-stat-value { font-size: 1.4rem; font-weight: 800; line-height: 1; }
        .sl-stat-label {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(10,10,10,0.5);
          margin-top: 4px;
        }
        [data-theme='dark'] .sl-stat-label { color: rgba(255,255,255,0.5); }

        /* ---------- Tagline ---------- */
        .sl-tagline {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-weight: 700;
          color: #a78bfa;
          font-size: 0.9rem;
        }
        .sl-tagline-sub {
          margin-top: 6px;
          font-size: 0.85rem;
          color: rgba(10,10,10,0.5);
        }
        [data-theme='dark'] .sl-tagline-sub { color: rgba(255,255,255,0.45); }

        /* ---------- Counseling modal ---------- */
        .sl-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 20px;
        }
        .sl-modal-card {
          position: relative;
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          color: #0a0a0a;
          border-radius: 16px;
          padding: 28px;
        }
        [data-theme='dark'] .sl-modal-card {
          background: #0d0a17;
          color: #ffffff;
          border: 1px solid rgba(255,255,255,0.1);
        }
        .sl-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          background: none;
          border: none;
          font-size: 16px;
          cursor: pointer;
          color: inherit;
          opacity: 0.6;
        }
        .sl-modal-close:hover { opacity: 1; }
      `}</style>
    </section>
  );
};

export default Hero;
