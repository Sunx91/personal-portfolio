import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import { SiteEntrance } from "@/components/SiteEntrance";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <SiteEntrance>
      <div className="relative min-h-dvh overflow-x-hidden bg-black text-white">
        <div className="relative z-10">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
        </div>
      </div>
    </SiteEntrance>
  );
}
