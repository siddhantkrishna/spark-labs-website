import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Method, Mindset } from "@/sections/JourneyMethod";
import { Receive, SmallBatches } from "@/sections/CurriculumBatches";
import { Details, Who } from "@/sections/ApplyDetails";
import { AdmissionsProcess } from "@/sections/Extras";
import { FinalCTA } from "@/sections/FinalFooter";

export default function Program() {
  return (
    <>
      <Seo
        title="AI Builder Program"
        description="The AI Builder Program: 6 weeks, 36 live in-person sessions, max 8 students per batch. A project-based AI course for beginners aged 13–18 in Raigarh. ₹20,000, all-inclusive."
        path="/program"
        includeCourseSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "AI Builder Program", path: "/program" },
        ]}
      />
      <PageHeader
        eyebrow="AI Builder Program"
        title={
          <>
            Six weeks that turn beginners into <span className="text-accent">builders.</span>
          </>
        }
        intro="36 live, hands-on sessions. Max 8 students per batch. Every class you build something real — and by Demo Day you have a portfolio to prove it."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "AI Builder Program", path: "/program" },
        ]}
      />
      <Details />
      <Who />
      <Method />
      <Mindset />
      <SmallBatches />
      <Receive />
      <AdmissionsProcess />
      <FinalCTA />
    </>
  );
}
