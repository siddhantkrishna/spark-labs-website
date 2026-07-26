import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { FAQ } from "@/sections/ApplyDetails";
import { FinalCTA } from "@/sections/FinalFooter";

export default function FaqPage() {
  return (
    <>
      <Seo
        title="Frequently Asked Questions"
        description="Answers to the questions parents and students ask most about the Spark Labs AI Builder Program — eligibility, coding experience, fees, batches, certificates and more."
        path="/faq"
        includeFaqSchema
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <PageHeader
        eyebrow="FAQ"
        title={
          <>
            Questions parents ask <span className="text-accent">us most.</span>
          </>
        }
        intro="Can't find your answer here? A free counseling session is the fastest way to get a straight, honest answer."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "FAQ", path: "/faq" },
        ]}
      />
      <FAQ />
      <FinalCTA />
    </>
  );
}
