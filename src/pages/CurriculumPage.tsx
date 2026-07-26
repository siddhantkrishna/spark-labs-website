import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Curriculum } from "@/sections/CurriculumBatches";
import { Mindset } from "@/sections/JourneyMethod";
import { FinalCTA } from "@/sections/FinalFooter";

export default function CurriculumPage() {
  return (
    <>
      <Seo
        title="Curriculum"
        description="The Spark Labs curriculum: 16 integrated modules spanning AI, prompt engineering, automation, design, entrepreneurship and career skills — all applied to real projects."
        path="/curriculum"
        includeCourseSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Curriculum", path: "/curriculum" },
        ]}
      />
      <PageHeader
        eyebrow="Curriculum"
        title={
          <>
            Sixteen disciplines. <span className="text-accent">One integrated build.</span>
          </>
        }
        intro="The curriculum isn't a list of subjects — it's a stack of capabilities, each feeding directly into the projects students ship that same week."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Curriculum", path: "/curriculum" },
        ]}
      />
      <Curriculum />
      <Mindset />
      <FinalCTA />
    </>
  );
}
