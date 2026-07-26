import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui";
import { LEGAL_DOCS } from "@/constants/legal";
import NotFound from "./NotFound";

/** Data-driven renderer shared by every legal page. */
export default function LegalPage({ slug }: { slug: string }) {
  const doc = LEGAL_DOCS[slug];
  if (!doc) return <NotFound />;

  return (
    <>
      <Seo
        title={doc.title}
        description={doc.description}
        path={`/${doc.slug}`}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: doc.title, path: `/${doc.slug}` },
        ]}
      />
      <PageHeader
        eyebrow="Legal"
        title={doc.title}
        intro={doc.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: doc.title, path: `/${doc.slug}` },
        ]}
      >
        <p className="font-mono text-[11px] tracking-[0.16em] text-faint uppercase">
          Last updated · {doc.updated}
        </p>
      </PageHeader>

      <section className="py-14 lg:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <div className="space-y-10">
            {doc.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 40}>
                <div>
                  <h2 className="font-display text-xl font-bold tracking-tight text-ink">{s.heading}</h2>
                  <div className="mt-3 space-y-3">
                    {s.paragraphs.map((p, j) => (
                      <p key={j} className="text-[15.5px] leading-relaxed text-mute">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
