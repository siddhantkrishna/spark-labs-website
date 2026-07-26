import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

export type Theme = "light" | "dark";
const STORAGE_KEY = "spark-theme";

interface ThemeCtx {
  theme: Theme;
  toggle: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeCtx | null>(null);

/**
 * Theme provider — reads the theme that the inline no-flash script set on
 * <html data-theme>, then keeps it in sync with user toggles + system changes
 * (only until the user makes an explicit choice).
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof document === "undefined") return "light";
    return (document.documentElement.getAttribute("data-theme") as Theme) || "light";
  });

  const apply = useCallback((t: Theme, persist: boolean) => {
    document.documentElement.setAttribute("data-theme", t);
    if (persist) localStorage.setItem(STORAGE_KEY, t);
    setThemeState(t);
  }, []);

  const setTheme = useCallback((t: Theme) => apply(t, true), [apply]);
  const toggle = useCallback(() => apply(theme === "dark" ? "light" : "dark", true), [theme, apply]);

  // Sync with OS preference only until the user has made an explicit choice.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) apply(e.matches ? "dark" : "light", false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [apply]);

  return <ThemeContext.Provider value={{ theme, toggle, setTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeCtx {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
