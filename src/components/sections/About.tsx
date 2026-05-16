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
              Skills & Tech
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="px-5 py-2.5 border border-[#00F5D4]/30 rounded-full text-sm font-medium tracking-wide text-[#00F5D4] bg-[#00F5D4]/5 hover:bg-[#00F5D4]/20 transition-all cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
