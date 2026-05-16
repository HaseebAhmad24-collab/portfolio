"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const links = [
    { name: "Work", href: "#work" },
    { name: "Services", href: "#services" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed w-full top-0 z-40 backdrop-blur-md bg-[#0A0A0B]/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Minimalist Logo */}
        <Link href="/" className="font-syne font-bold text-2xl tracking-tighter">
          HASEEB<span className="text-[#00F5D4]">.</span>
        </Link>
        
        {/* Navigation Links */}
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
      </div>
    </header>
  );
}
