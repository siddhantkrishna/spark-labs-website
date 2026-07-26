import { Seo } from "@/components/Seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Projects } from "@/sections/WhyProjects";
import { LearningEnvironment, SocialProof } from "@/sections/Extras";
import { FinalCTA } from "@/sections/FinalFooter";

export default function ProjectsPage() {
  return (
    <>
      <Seo
        title="What Students Build"
        description="See the real AI projects Spark Labs students build: chatbots, image generators, automations, websites, research assistants and a self-chosen capstone presented at Demo Day."
        path="/projects"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "What Students Build", path: "/projects" },
        ]}
      />
      <PageHeader
        eyebrow="What Students Build"
        title={
          <>
            Ten real projects. <span className="text-accent">Zero toy examples.</span>
          </>
        }
        intro="Every project starts with a real problem someone actually has. By Demo Day, this becomes a student's portfolio — verifiable proof of what they can build."
        crumbs={[
          { name: "Home", path: "/" },
          { name: "What Students Build", path: "/projects" },
        ]}
      />
      <Projects />
      <LearningEnvironment />
      <SocialProof />
      <FinalCTA />
    </>
  );
}
