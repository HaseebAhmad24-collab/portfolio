"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Education() {
  const education = portfolioData.education;

  return (
    <section id="education" className="py-32 px-6 bg-[#0B0F12] relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-syne font-bold text-white border-l-4 border-[#00F5D4] pl-4 uppercase tracking-tight mb-6">
              Education
            </h2>
            <p className="text-[#94A3B8] text-sm leading-relaxed pr-8">
              My academic journey and core foundational studies.
            </p>
          </motion.div>
        </div>

        <div className="md:w-2/3 border-l border-white/10 pl-8 md:pl-12 relative py-4">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-12 relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1 w-4 h-4 rounded-full bg-[#12181D] border-2 border-[#00F5D4] group-hover:bg-[#00F5D4] group-hover:shadow-[0_0_15px_#00F5D4] transition-all duration-300" />
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                <h3 className="text-2xl font-syne font-bold text-white group-hover:text-[#00F5D4] transition-colors">
                  {edu.degree}
                </h3>
                <span className="text-xs uppercase tracking-widest text-[#00F5D4] font-semibold bg-[#00F5D4]/10 px-3 py-1 rounded-full w-fit">
                  {edu.duration || edu.status}
                </span>
              </div>
              
              <p className="text-[#94A3B8] text-lg">
                {edu.institution}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
