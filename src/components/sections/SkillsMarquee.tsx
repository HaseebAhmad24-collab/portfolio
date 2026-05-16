"use client";

import Marquee from "react-fast-marquee";

const row1 = [
  "Django", "REST Framework", "Docker", "Jenkins", "AWS", 
  "Git/GitHub", "Linux", "Supabase", "Vercel", "MySQL", 
  "Wazuh", "RAG", "AI/ML", "FastAPI", "LangChain"
];

const row2 = [
  "Python", "Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", 
  "Redis", "CI/CD", "SonarQube", "EC2", "Vector DB", 
  "Gemini API", "Prompt Engineering", "Framer Motion", "Figma", "Agentic AI"
];

const SkillBadge = ({ skill }: { skill: string }) => (
  <div className="group flex items-center gap-4 px-8 py-2 mx-4 cursor-default">
    <span className="text-[#00F5D4] font-mono text-sm opacity-30 group-hover:opacity-100 transition-opacity duration-300">
      //
    </span>
    <span className="font-syne font-bold text-3xl md:text-4xl text-[#2A3441] group-hover:text-white transition-colors duration-300 tracking-wider uppercase">
      {skill}
    </span>
  </div>
);

export default function SkillsMarquee() {
  return (
    <section className="py-20 bg-[#0B0F12] relative overflow-hidden flex flex-col gap-8 border-y border-white/5 my-12">
      {/* Heavy gradient masks for cinematic fade */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-[#0B0F12] via-[#0B0F12]/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-[#0B0F12] via-[#0B0F12]/80 to-transparent z-10 pointer-events-none" />

      {/* Row 1 */}
      <Marquee speed={45} direction="left" pauseOnHover={false} className="overflow-hidden">
        {row1.map((skill, index) => (
          <SkillBadge key={`r1-${index}`} skill={skill} />
        ))}
      </Marquee>

      {/* Row 2 (Slightly different speed for organic feel) */}
      <Marquee speed={35} direction="right" pauseOnHover={false} className="overflow-hidden">
        {row2.map((skill, index) => (
          <SkillBadge key={`r2-${index}`} skill={skill} />
        ))}
      </Marquee>
    </section>
  );
}
