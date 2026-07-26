import { CheckCircle2, Clock, Users } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui";
import { AdmissionForm } from "@/components/AdmissionForm";
import { AdmissionsProcess } from "@/sections/Extras";
import { BATCHES, PROGRAM } from "@/constants/site";

export default function Admissions() {
  return (
    <>
      <Seo
        title="Admissions — Apply for the AI Builder Program"
        description="Apply for admission to the Spark Labs AI Builder Program in Raigarh. Limited to 8 students per batch. Fill the form and our team responds within 24 hours."
        path="/admissions"
        includeCourseSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Admissions", path: "/admissions" },
        ]}
      />
      <PageHeader
        eyebrow="Admissions"
        title={
          <>
            Apply for the <span className="text-accent">AI Builder Program.</span>
          </>
        }
        intro="No test. No coding required. Just tell us about the student and we'll take it from there — usually within 24 hours."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Admissions", path: "/admissions" },
        ]}
      />

      <section className="py-14 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
          <Reveal>
            <div className="relative rounded-3xl border border-line bg-white p-6 shadow-card sm:p-10">
              <AdmissionForm />
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:sticky lg:top-28">
            <aside className="space-y-5">
              <div className="rounded-2xl border border-line bg-paper p-6 shadow-card">
                <h2 className="flex items-center gap-2 font-display text-lg font-bold text-ink">
                  <Users className="h-4 w-4 text-accent" /> Batch availability
                </h2>
                <ul className="mt-4 space-y-3">
                  {BATCHES.map((b) => (
                    <li key={b.name} className="flex items-center justify-between gap-3 border-b border-line pb-3 last:border-0 last:pb-0">
                      <span>
                        <span className="block text-[14px] font-semibold text-ink">{b.name}</span>
                        <span className="flex items-center gap-1 font-mono text-[11px] text-faint">
                          <Clock className="h-3 w-3" /> {b.time}
                        </span>
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[11px] font-semibold ${
                          b.seatsLeft <= 2 ? "bg-red-50 text-red-600" : "bg-accent-tint text-accent"
                        }`}
                      >
                        {b.seatsLeft} left
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[11px] leading-relaxed text-faint">
                  Seats fill in order of application. {PROGRAM.batchSize} per batch, no exceptions.
                </p>
              </div>

              <div className="rounded-2xl border border-line bg-paper p-6 shadow-card">
                <h2 className="font-display text-lg font-bold text-ink">What&rsquo;s included</h2>
                <ul className="mt-4 space-y-2.5 text-[14px] text-mute">
                  {[
                    "All 36 live lab sessions",
                    "1-on-1 mentor feedback",
                    "Builder Handbook & tooling",
                    "Certificate + Demo Day",
                    "Live portfolio & documentation",
                  ].map((i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {i}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 border-t border-line pt-4 font-display text-2xl font-bold text-ink">
                  {PROGRAM.feeDisplay}
                  <span className="ml-2 font-sans text-[13px] font-normal text-faint">all-inclusive</span>
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      <AdmissionsProcess />
    </>
  );
}
