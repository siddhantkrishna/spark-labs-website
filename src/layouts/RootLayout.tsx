import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ConsentBanner, FloatingActions } from "@/components/layout/FloatingActions";
import { trackPageView } from "@/services/analytics";

/**
 * App shell shared by every route: fixed navbar, page content, footer,
 * conversion widgets, plus scroll restoration and SPA pageview tracking.
 */
export function RootLayout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-paper font-sans text-ink">
      <Navbar />
      <main id="main" className="flex-1 pb-16 sm:pb-0">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <ConsentBanner />
    </div>
  );
}
