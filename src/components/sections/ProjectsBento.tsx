"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";

export default function ProjectsBento() {
  const projects = portfolioData.projects;

  return (
    <section id="work" className="py-32 px-6 bg-[#0A0A0B] relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white border-l-4 border-[#00F5D4] pl-4 uppercase tracking-tight">
            Featured Projects
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative rounded-2xl bg-[#12181D] p-8 overflow-hidden hover:-translate-y-2 transition-all duration-300 border border-white/5 hover:border-[#00F5D4]/30 ${
                index === 0 ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00F5D4]/0 to-[#00F5D4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                <span className="text-6xl font-syne font-black text-white/5 group-hover:text-[#00F5D4]/10 transition-colors select-none">
                  {project.id}
                </span>
                <div className="p-3 rounded-full bg-white/5 group-hover:bg-[#00F5D4]/20 transition-colors cursor-pointer">
                  <ArrowUpRight className="w-6 h-6 text-white group-hover:text-[#00F5D4]" />
                </div>
              </div>

              <div className="relative z-10 flex flex-col h-[calc(100%-80px)]">
                <p className="text-[#00F5D4] text-xs uppercase tracking-widest font-semibold mb-2">
                  {project.role}
                </p>
                <h3 className="text-3xl font-syne font-bold text-white mb-4 group-hover:text-[#00F5D4] transition-colors">
                  {project.title}
                </h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed mb-8 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.techStack.map((tech) => (
                    <span key={tech} className="text-[10px] uppercase tracking-wider text-[#94A3B8] px-3 py-1.5 rounded-full border border-white/10 bg-[#0B0F12]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
