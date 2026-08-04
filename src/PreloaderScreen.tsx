import { useEffect, useState } from "react";

export function PreloaderScreen({ onFinish }: { onFinish: () => void }) {
  const [phase, setPhase] = useState<"visible" | "blur" | "hidden">("visible");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("blur"), 1600);
    const t2 = setTimeout(() => setPhase("hidden"), 2400);
    const t3 = setTimeout(() => onFinish(), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity duration-500 ${
        phase === "hidden" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* subtle radial glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(139,92,246,0.15) 0%, transparent 60%)",
        }}
      />

      <h1
        className={`relative select-none font-black tracking-tight text-white text-[14vw] md:text-[10vw] leading-none transition-all duration-700 ease-out ${
          phase === "visible"
            ? "opacity-100 blur-0 scale-100"
            : "opacity-0 blur-2xl scale-110"
        }`}
        style={{
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif",
          textShadow: "0 0 40px rgba(139,92,246,0.35)",
        }}
      >
        SPARK<span className="text-[#a78bfa]"> LABS</span>
      </h1>

      {/* thin loading bar */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full bg-[#a78bfa] animate-[preloaderBar_1.8s_ease-in-out_forwards]"
          style={{ width: "0%" }}
        />
      </div>

      <style>{`
        @keyframes preloaderBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
}
