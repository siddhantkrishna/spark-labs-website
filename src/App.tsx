import { ApplyProvider } from "./components/ui";
import { Nav, Hero } from "./sections/Hero";
import { Why, Projects } from "./sections/WhyProjects";
import { Journey, Method, Mindset } from "./sections/JourneyMethod";
import { Curriculum, SmallBatches, Receive } from "./sections/CurriculumBatches";
import { Who, Details, FAQ } from "./sections/ApplyDetails";
import { FinalCTA, Footer } from "./sections/FinalFooter";

export default function App() {
  return (
    <ApplyProvider>
      <div className="min-h-screen bg-paper font-sans text-ink">
        <Nav />
        <main>
          <Hero />
          <Why />
          <Projects />
          <Journey />
          <Method />
          <Mindset />
          <Curriculum />
          <SmallBatches />
          <Receive />
          <Who />
          <Details />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </ApplyProvider>
  );
}
