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

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  const navLinksVariants = {
    closed: {},
    opened: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      y: 30,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    opened: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <header className="fixed w-full top-0 z-40 backdrop-blur-md bg-[#0A0A0B]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Minimalist Logo */}
          <Link href="/" className="font-syne font-bold text-2xl tracking-tighter z-50">
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
            className="md:hidden text-white hover:text-[#00F5D4] transition-colors focus:outline-none z-50 p-2"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="opened"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 w-full h-screen bg-[#0A0A0B]/98 backdrop-blur-lg z-30 flex flex-col justify-center items-center md:hidden"
          >
            <motion.nav 
              variants={navLinksVariants}
              className="flex flex-col items-center gap-8"
            >
              {links.map((link) => (
                <motion.div key={link.name} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="font-syne font-bold text-4xl uppercase tracking-widest text-[#94A3B8] hover:text-[#00F5D4] transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
