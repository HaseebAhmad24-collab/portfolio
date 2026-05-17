"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Work", href: "#work" },
    { name: "Education", href: "#education" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <header className="fixed w-full top-0 z-45 backdrop-blur-md bg-[#0A0A0B]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Minimalist Logo */}
          <Link href="/" className="font-syne font-bold text-2xl tracking-tighter">
            HASEEB<span className="text-[#00F5D4]">.</span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-8 relative">
            {links.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="relative text-sm font-medium tracking-widest uppercase text-[#94A3B8] hover:text-white transition-colors py-2"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {link.name}
                {hoveredIndex === index && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#00F5D4]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-[#00F5D4] transition-colors focus:outline-none p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Floating Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-24 right-6 w-64 bg-[#0A0A0B]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-40 md:hidden flex flex-col gap-4 origin-top-right"
          >
            <nav className="flex flex-col">
              {links.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-syne font-bold text-base uppercase tracking-wider text-[#94A3B8] hover:text-[#00F5D4] transition-colors py-3 border-b border-white/5 last:border-0 flex items-center justify-between group"
                >
                  <span>{link.name}</span>
                  <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity text-[#00F5D4] ml-2">
                    // 0{index + 1}
                  </span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
