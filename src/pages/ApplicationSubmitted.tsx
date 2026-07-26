import { Link, useLocation } from "react-router-dom";
import { CheckCircle2, Phone } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SITE } from "@/constants/site";

export default function ApplicationSubmitted() {
  const location = useLocation();
  const name = (location.state as { name?: string } | null)?.name?.split(" ")[0];

  return (
    <>
      <Seo
        title="Application Submitted"
        description="Your Spark Labs application has been received."
        path="/application-submitted"
        noindex
      />
      <section className="relative grid min-h-[70vh] place-items-center overflow-hidden pt-[72px]">
        <div className="dotgrid dotgrid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-lg px-6 py-16 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-tint text-accent">
            <CheckCircle2 className="h-8 w-8" />
          </span>
          <p className="mt-6 font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
            Application received
          </p>
          <h1 className="mt-4 font-display text-[clamp(2rem,5vw,3rem)] leading-tight font-bold text-ink">
            {name ? `Thank you, ${name}!` : "Thank you!"}
          </h1>
          <p className="mt-4 text-[16px] leading-relaxed text-mute">
            Our admissions team will reach out within 24 hours to schedule your free counseling
            session and lab visit. Keep an eye on your phone and email.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent"
            >
              Back to Home
            </Link>
            <a
              href={`tel:+${SITE.phone}`}
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
            >
              <Phone className="h-4 w-4 text-accent" /> Call us now
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
