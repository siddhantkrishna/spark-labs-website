import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Phone, X } from "lucide-react";
import { SITE } from "@/constants/site";
import { trackEvent } from "@/services/analytics";
import { useConsent } from "@/hooks/useConsent";

const waHref = `https://wa.me/${SITE.phone}?text=${encodeURIComponent(SITE.whatsappMessage)}`;

function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.09 3.2 5.07 4.49.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.44 9.44 0 0 1 14.66-11.7 9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43Zm8.03-17.46A11.32 11.32 0 0 0 12.05.7C5.8.7.71 5.79.71 12.05c0 2 .52 3.95 1.52 5.67L.6 23.3l5.7-1.5a11.3 11.3 0 0 0 5.74 1.47h.01c6.25 0 11.34-5.09 11.34-11.35 0-3.03-1.18-5.88-3.32-8.02Z" />
    </svg>
  );
}

export function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop / tablet floating stack */}
      <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
        {showTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-2 bg-white text-ink shadow-card transition hover:-translate-y-0.5 hover:border-ink"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
        <a
          href={`tel:+${SITE.phone}`}
          aria-label="Call Spark Labs"
          onClick={() => trackEvent("click_call", { location: "float" })}
          className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-lift transition hover:-translate-y-0.5 sm:hidden"
        >
          <Phone className="h-5 w-5" />
        </a>
        <a
          href={waHref}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Spark Labs on WhatsApp"
          onClick={() => trackEvent("click_whatsapp", { location: "float" })}
          className="group flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-3.5 text-white shadow-lift transition hover:-translate-y-0.5"
        >
          <WhatsAppIcon className="h-6 w-6" />
          <span className="hidden pr-1 text-sm font-semibold sm:inline">WhatsApp</span>
        </a>
      </div>

      {/* Mobile sticky CTA bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-md sm:hidden">
        <div className="flex items-center gap-2.5">
          <a
            href={`tel:+${SITE.phone}`}
            className="grid h-11 w-12 place-items-center rounded-full border border-line-2 text-ink"
            aria-label="Call"
          >
            <Phone className="h-5 w-5" />
          </a>
          <Link
            to="/admissions"
            onClick={() => trackEvent("click_apply", { location: "mobile-sticky" })}
            className="flex-1 rounded-full bg-accent px-6 py-3 text-center text-[15px] font-semibold text-white shadow-lift"
          >
            Apply for Admission
          </Link>
        </div>
      </div>
    </>
  );
}

export function ConsentBanner() {
  const { consent, ready, accept, decline } = useConsent();
  const [dismissed, setDismissed] = useState(false);

  if (!ready || consent !== null || dismissed) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-paper p-5 shadow-lift sm:bottom-24 sm:left-6 sm:right-auto sm:mx-0"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="text-[13.5px] leading-relaxed text-mute">
          We use privacy-friendly analytics to improve the site. Nothing loads until you agree. See our{" "}
          <Link to="/cookies" className="font-semibold text-accent underline">
            Cookie Policy
          </Link>
          .
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-faint hover:text-ink"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 flex gap-3">
        <button
          onClick={accept}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent"
        >
          Accept
        </button>
        <button
          onClick={decline}
          className="rounded-full border border-line-2 px-5 py-2.5 text-sm font-semibold text-mute transition hover:text-ink"
        >
          Decline
        </button>
      </div>
    </div>
  );
}
