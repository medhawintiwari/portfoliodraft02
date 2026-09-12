import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Work } from "@/components/sections/Work";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Work />
      <Contact />
    </div>
  );
}
