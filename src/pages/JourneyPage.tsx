import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Journey, Method } from "@/sections/JourneyMethod";
import { AdmissionsProcess } from "@/sections/Extras";
import { FinalCTA } from "@/sections/FinalFooter";

export default function JourneyPage() {
  return (
    <>
      <Seo
        title="Student Journey"
        description="The Spark Labs student journey — a week-by-week look at how a complete beginner becomes a confident AI builder over six weeks and 36 sessions, ending in Demo Day."
        path="/journey"
        includeCourseSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Student Journey", path: "/journey" },
        ]}
      />
      <PageHeader
        eyebrow="Student Journey"
        title={
          <>
            Six weeks. <span className="text-accent">A complete transformation.</span>
          </>
        }
        intro="The journey is deliberately sequenced — from understanding AI, to commanding it, to building with it, to launching something of your own."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Student Journey", path: "/journey" },
        ]}
      />
      <Journey />
      <Method />
      <AdmissionsProcess />
      <FinalCTA />
    </>
  );
}
