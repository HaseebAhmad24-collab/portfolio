import Navbar from "@/components/layout/Navbar";
import CustomCursor from "@/components/ui/CustomCursor";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      
      <div className="flex flex-col min-h-screen">
        <Hero />
        
        {/* Next Sections will go here */}
      </div>
    </>
  );
}
