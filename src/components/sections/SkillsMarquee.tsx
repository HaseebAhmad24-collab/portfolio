"use client";

import Marquee from "react-fast-marquee";

const row1 = [
  { name: "Django", icon: "🐍" },
  { name: "REST Framework", icon: "🔌" },
  { name: "Docker", icon: "🐳" },
  { name: "Jenkins", icon: "🛠️" },
  { name: "AWS", icon: "☁️" },
  { name: "Git/GitHub", icon: "🐙" },
  { name: "Linux", icon: "🐧" },
  { name: "Supabase", icon: "⚡" },
  { name: "Vercel", icon: "▲" },
  { name: "MySQL", icon: "🐬" },
  { name: "Wazuh", icon: "🛡️" },
  { name: "RAG", icon: "🧠" },
  { name: "AI/ML", icon: "🤖" },
  { name: "FastAPI", icon: "🚀" },
  { name: "LangChain", icon: "🔗" }
];

const row2 = [
  { name: "Python", icon: "🐍" },
  { name: "Next.js", icon: "⚛️" },
  { name: "TypeScript", icon: "📘" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Redis", icon: "🟥" },
  { name: "CI/CD", icon: "🔄" },
  { name: "SonarQube", icon: "🔍" },
  { name: "EC2", icon: "💻" },
  { name: "Vector DB", icon: "📊" },
  { name: "Gemini API", icon: "✨" },
  { name: "Prompt Engineering", icon: "💬" },
  { name: "Framer Motion", icon: "🎭" },
  { name: "Figma", icon: "🖋️" },
  { name: "Agentic AI", icon: "🕵️" }
];

const SkillBadge = ({ skill }: { skill: { name: string; icon: string } }) => (
  <div className="flex items-center gap-3 px-6 py-4 mx-3 rounded-2xl bg-[#12181D]/80 backdrop-blur-md border border-white/5 shadow-xl hover:border-[#00F5D4]/30 transition-colors duration-300">
    <span className="text-2xl">{skill.icon}</span>
    <span className="font-syne font-bold text-white tracking-wide">{skill.name}</span>
  </div>
);

export default function SkillsMarquee() {
  return (
    <section className="py-12 bg-[#0B0F12] relative overflow-hidden flex flex-col gap-6">
      {/* Background gradients for smooth edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#0B0F12] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#0B0F12] to-transparent z-10 pointer-events-none" />

      <Marquee speed={40} direction="left" pauseOnHover={false} className="overflow-hidden">
        {row1.map((skill, index) => (
          <SkillBadge key={`r1-${index}`} skill={skill} />
        ))}
      </Marquee>

      <Marquee speed={40} direction="right" pauseOnHover={false} className="overflow-hidden">
        {row2.map((skill, index) => (
          <SkillBadge key={`r2-${index}`} skill={skill} />
        ))}
      </Marquee>
    </section>
  );
}
