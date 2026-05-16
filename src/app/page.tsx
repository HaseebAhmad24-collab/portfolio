import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import ProjectsBento from "@/components/sections/ProjectsBento";
import Education from "@/components/sections/Education";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      
      <div className="flex flex-col min-h-screen">
        <Hero />
        <About />
        <ProjectsBento />
        <Education />
        <Footer />
      </div>
    </>
  );
}
