import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui";
import {
  FounderMessage,
  WhyParentsTrust,
  Mentors,
  LearningEnvironment,
  SocialProof,
} from "@/sections/Extras";
import { FinalCTA } from "@/sections/FinalFooter";
import { SITE } from "@/constants/site";

export default function About() {
  return (
    <>
      <Seo
        title="About Spark Labs"
        description="Spark Labs is the AI Learning Laboratory of Charvikon Training & Research Centre in Raigarh, Chhattisgarh. Meet the mission, method and mentors turning beginners into confident AI builders."
        path="/about"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <PageHeader
        eyebrow="About Spark Labs"
        title={
          <>
            Not a coaching class. <span className="text-accent">A laboratory.</span>
          </>
        }
        intro="Spark Labs is the AI Learning Laboratory of Charvikon Training & Research Centre — built in Raigarh to give students here the same head start as students anywhere in the world."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />

      <section className="py-16 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-line bg-white p-8 shadow-card sm:p-10">
              <span className="font-mono text-[11px] tracking-[0.24em] text-accent uppercase">Our Mission</span>
              <p className="mt-4 font-display text-[22px] leading-snug font-semibold text-ink">
                {SITE.mission}
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-2xl bg-ink p-8 text-white shadow-lift sm:p-10">
              <div className="dotgrid-light pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
              <div className="relative">
                <span className="font-mono text-[11px] tracking-[0.24em] text-accent-bright uppercase">Our Vision</span>
                <p className="mt-4 font-display text-[22px] leading-snug font-semibold">{SITE.vision}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <FounderMessage />
      <WhyParentsTrust />
      <Mentors />
      <LearningEnvironment />
      <SocialProof />
      <FinalCTA />
    </>
  );
}
