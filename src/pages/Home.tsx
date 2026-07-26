import { Seo } from "@/components/Seo";
import { Hero } from "@/sections/Hero";
import { Why, Projects } from "@/sections/WhyProjects";
import { Journey, Method, Mindset } from "@/sections/JourneyMethod";
import { Curriculum, SmallBatches, Receive } from "@/sections/CurriculumBatches";
import { Who, Details, FAQ } from "@/sections/ApplyDetails";
import { FinalCTA } from "@/sections/FinalFooter";
import {
  TrustBar,
  SocialProof,
  FounderMessage,
  WhyParentsTrust,
  AdmissionsProcess,
} from "@/sections/Extras";

export default function Home() {
  return (
    <>
      <Seo
        title="AI Learning Laboratory"
        description="Spark Labs is a premium AI Learning Laboratory in Raigarh. Students aged 13–18 learn by building 10+ real AI projects in a 6-week, in-person AI Builder Program. Learn. Build. Launch."
        path="/"
        includeCourseSchema
        includeFaqSchema
      />
      <Hero />
      <TrustBar />
      <Why />
      <Projects />
      <Journey />
      <Method />
      <Mindset />
      <Curriculum />
      <SmallBatches />
      <WhyParentsTrust />
      <SocialProof />
      <FounderMessage />
      <Receive />
      <Who />
      <Details />
      <AdmissionsProcess />
      <FAQ />
      <FinalCTA />
    </>
  );
}
