"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";

export default function Hero() {
  const { name, signature, contact } = portfolioData.personalInfo;

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 pt-20">
      {/* Giant Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <h1 className="text-[120px] md:text-[200px] font-syne font-black text-white uppercase opacity-[0.03] whitespace-nowrap">
          {signature}
        </h1>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
        {/* Muted/Teal Caps Line 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="h-[1px] w-12 bg-[#00F5D4]" />
          <p className="text-[#00F5D4] tracking-[0.2em] uppercase text-sm font-semibold">
            About Personal
          </p>
          <div className="h-[1px] w-12 bg-[#00F5D4]" />
        </motion.div>

        {/* Giant Bold Name Line 2 */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-syne font-bold text-white mb-4 leading-tight relative"
        >
          Hello, I'm <br />
          <span className="relative inline-block text-[#FFFFFF]">
            {name}
            {/* Script Font Overlay Line 3 */}
            <span 
              className="absolute -bottom-6 -right-16 text-3xl md:text-5xl text-[#00F5D4] opacity-80 transform rotate-[-8deg] pointer-events-none" 
              style={{ fontFamily: "'La Parisienne', 'Brush Script MT', cursive" }}
            >
              {signature}
            </span>
          </span>
        </motion.h2>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <div className="flex gap-8">
            <a href={contact.github} target="_blank" rel="noreferrer" className="text-[#94A3B8] hover:text-[#00F5D4] text-sm uppercase tracking-widest transition-colors">
              Github
            </a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-[#94A3B8] hover:text-[#00F5D4] text-sm uppercase tracking-widest transition-colors">
              LinkedIn
            </a>
            <a href={contact.twitter} target="_blank" rel="noreferrer" className="text-[#94A3B8] hover:text-[#00F5D4] text-sm uppercase tracking-widest transition-colors">
              Twitter
            </a>
          </div>
          
          <div className="h-24 w-[1px] bg-gradient-to-b from-[#00F5D4] to-transparent mt-4 opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
