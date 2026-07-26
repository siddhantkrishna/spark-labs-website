import { Link } from "react-router-dom";
import { Home, Search } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SparkMark } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you're looking for doesn't exist."
        path="/404"
        noindex
      />
      <section className="relative grid min-h-[80vh] place-items-center overflow-hidden pt-[72px]">
        <div className="dotgrid dotgrid-fade pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-lg px-6 py-16 text-center">
          <SparkMark className="mx-auto h-12 w-12 text-accent" />
          <p className="mt-6 font-display text-[clamp(4rem,14vw,8rem)] leading-none font-bold tracking-tight text-ink">
            404
          </p>
          <h1 className="mt-2 font-display text-2xl font-bold text-ink">This page hasn&rsquo;t been built yet.</h1>
          <p className="mt-3 text-[15px] text-mute">
            The link may be broken or the page may have moved. Let&rsquo;s get you back on track.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-deep"
            >
              <Home className="h-4 w-4" /> Back to Home
            </Link>
            <Link
              to="/program"
              className="inline-flex items-center gap-2 rounded-full border border-line-2 px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
            >
              <Search className="h-4 w-4 text-accent" /> Explore the Program
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
