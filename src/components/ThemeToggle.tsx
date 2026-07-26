import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface Props {
  className?: string;
  variant?: "nav" | "ghost";
}

/** Small, elegant theme toggle that fits the editorial aesthetic in both modes. */
export function ThemeToggle({ className = "", variant = "nav" }: Props) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const base =
    "group relative grid h-9 w-9 place-items-center overflow-hidden rounded-full border transition-all duration-300";
  const styles =
    variant === "nav"
      ? "border-line-2 text-ink hover:border-ink"
      : "border-white/15 text-white/75 hover:border-white/40";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`${base} ${styles} ${className}`}
    >
      <Sun
        className={`absolute h-[15px] w-[15px] transition-all duration-300 ${
          isDark ? "-translate-y-6 opacity-0" : "translate-y-0 opacity-100"
        }`}
      />
      <Moon
        className={`absolute h-[15px] w-[15px] transition-all duration-300 ${
          isDark ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      />
    </button>
  );
}
