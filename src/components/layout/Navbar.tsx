import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { ApplyButton, Logo } from "@/components/ui";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MEGA_MENU, PRIMARY_NAV } from "@/constants/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change.
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location.pathname]);

  // Close mega menu when clicking outside.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `u-link text-[13.5px] font-medium tracking-wide transition-colors ${
      isActive ? "text-ink" : "text-mute hover:text-ink"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen ? "border-b border-line bg-paper/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <NavLink to="/" className={linkCls} end>
            Home
          </NavLink>

          {/* Mega menu */}
          <div ref={megaRef} className="relative">
            <button
              onClick={() => setMegaOpen((o) => !o)}
              aria-expanded={megaOpen}
              aria-haspopup="true"
              className="u-link flex items-center gap-1 text-[13.5px] font-medium tracking-wide text-mute transition-colors hover:text-ink"
            >
              Program
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
            </button>
            {megaOpen && (
              <div className="absolute left-1/2 top-full mt-4 w-[520px] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-paper p-2 shadow-lift">
                <div className="grid grid-cols-2 gap-1">
                  {MEGA_MENU.map((group) => (
                    <div key={group.label} className="p-2">
                      <p className="px-3 py-2 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
                        {group.label}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-accent-tint"
                        >
                          <span className="block text-[14px] font-semibold text-ink">{item.label}</span>
                          {item.description && (
                            <span className="mt-0.5 block text-[12px] text-mute">{item.description}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {PRIMARY_NAV.filter((l) => l.href !== "/").map((l) => (
            <NavLink key={l.href} to={l.href} className={linkCls}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle className="hidden sm:grid" />
          <ApplyButton mode="apply" className="hidden !px-5 !py-2.5 !text-[13.5px] sm:inline-flex">
            Apply Now
          </ApplyButton>
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line-2 text-ink lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto border-t border-line bg-paper px-5 py-4 lg:hidden">
          <div className="grid gap-1">
            {PRIMARY_NAV.map((l) => (
              <NavLink
                key={l.href}
                to={l.href}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink transition hover:bg-accent-tint"
                end={l.href === "/"}
              >
                {l.label}
              </NavLink>
            ))}
            <p className="mt-3 px-3 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              Program
            </p>
            {MEGA_MENU.flatMap((g) => g.items).map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-ink transition hover:bg-accent-tint"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-line-2 px-3 py-2">
            <span className="text-[13px] font-medium text-mute">Appearance</span>
            <ThemeToggle />
          </div>
          <ApplyButton mode="apply" className="mt-3 w-full">
            Apply for Admission
          </ApplyButton>
        </div>
      )}
    </header>
  );
}
