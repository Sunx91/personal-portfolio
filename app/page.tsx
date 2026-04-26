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
      <div className="relative flex h-dvh flex-col bg-black text-white overflow-hidden">
        <Navbar />
        <main className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden scroll-smooth">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
      </div>
    </SiteEntrance>
  );
}
