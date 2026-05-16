"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const { bio } = portfolioData.personalInfo;
  const skills = portfolioData.skills;

  return (
    <section id="about" className="py-32 px-6 bg-[#0B0F12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Left text */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-syne font-bold mb-6 text-white border-l-4 border-[#00F5D4] pl-4">
              ABOUT ME
            </h2>
            <p className="text-[#94A3B8] text-lg leading-relaxed mb-8">
              {bio}
            </p>
          </motion.div>
        </div>

        {/* Right Skills Tags */}
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-syne font-bold mb-6 text-white uppercase tracking-widest">
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {skills.map((skill, index) => {
                // Structured 4-row Bento Grid for 9 items on desktop (3 columns)
                // Row 1: [0 wide] [1]
                // Row 2: [2] [3 wide]
                // Row 3: [4] [5] [6]
                // Row 4: [7 wide] [8]
                const isWide = index === 0 || index === 3 || index === 7;
                return (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`relative overflow-hidden rounded-2xl bg-[#12181D] p-5 border border-white/5 hover:border-[#00F5D4]/30 group transition-all duration-300 flex items-center justify-center text-center shadow-lg hover:-translate-y-1 ${
                      isWide ? "md:col-span-2" : "md:col-span-1"
                    }`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#00F5D4]/0 to-[#00F5D4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="font-syne font-bold text-sm md:text-base text-white relative z-10 group-hover:text-[#00F5D4] transition-colors">
                      {skill}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
