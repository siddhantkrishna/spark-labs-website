import { Mail, Sparkles } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui";
import { SITE } from "@/constants/site";

const ROLES = [
  {
    title: "AI Build Mentor",
    type: "Full-time · Raigarh",
    desc: "Guide small batches of teenagers through building real AI projects. You build things with AI yourself and love helping beginners do the same.",
  },
  {
    title: "Design & Communication Mentor",
    type: "Part-time · Raigarh",
    desc: "Help students make sharp-looking work and present with confidence. Background in design, communication or education.",
  },
  {
    title: "Admissions & Community Lead",
    type: "Full-time · Raigarh",
    desc: "Be the first friendly voice families meet. Own counseling conversations and nurture our builder community.",
  },
];

export default function Careers() {
  return (
    <>
      <Seo
        title="Careers"
        description="Join Spark Labs in Raigarh and help transform beginners into confident AI builders. Explore open mentor and community roles at Charvikon Training & Research Centre."
        path="/careers"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />
      <PageHeader
        eyebrow="Careers"
        title={
          <>
            Help build India&rsquo;s most respected <span className="text-accent">AI lab.</span>
          </>
        }
        intro="We're a small team with a big mission. If you love building, teaching and seeing beginners light up, we'd love to meet you."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="space-y-5">
            {ROLES.map((r, i) => (
              <Reveal key={r.title} delay={i * 90}>
                <article className="group flex flex-col justify-between gap-4 rounded-2xl border border-line bg-white p-7 shadow-card transition-all duration-300 hover:border-accent/40 hover:shadow-lift sm:flex-row sm:items-center">
                  <div>
                    <h2 className="font-display text-lg font-bold text-ink">{r.title}</h2>
                    <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-accent uppercase">
                      {r.type}
                    </p>
                    <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-mute">{r.desc}</p>
                  </div>
                  <a
                    href={`mailto:${SITE.email}?subject=${encodeURIComponent("Application: " + r.title)}`}
                    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent"
                  >
                    <Mail className="h-4 w-4" /> Apply
                  </a>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-8 flex items-start gap-4 rounded-2xl border border-dashed border-line-2 p-7">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-[14px] leading-relaxed text-mute">
                Don&rsquo;t see your role? We&rsquo;re always keen to meet exceptional builders and
                educators. Write to us at{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-accent underline">
                  {SITE.email}
                </a>{" "}
                and tell us how you&rsquo;d contribute.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
