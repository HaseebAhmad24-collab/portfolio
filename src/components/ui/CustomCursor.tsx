"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [hoveringProject, setHoveringProject] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isCard = target?.closest('[data-hover-gallery="true"]');
      const isInteractive = target?.closest('button, a');
      if (isCard && !isInteractive) {
        setHoveringProject(true);
      } else {
        setHoveringProject(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Small dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-[#00F5D4] rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          scale: hoveringProject ? 1.5 : 1,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
      />
      {/* Outer lagging ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-[#00F5D4] rounded-full pointer-events-none z-[100] mix-blend-difference"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          scale: hoveringProject ? 1.4 : 1,
          opacity: hoveringProject ? 0.8 : 0.5,
        }}
        transition={{ type: "tween", ease: "circOut", duration: 0.4 }}
      />

      {/* Floating Cyberpunk Tooltip */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: hoveringProject ? 1 : 0, 
          opacity: hoveringProject ? 1 : 0,
          x: mousePosition.x + 20,
          y: mousePosition.y - 12
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed top-0 left-0 pointer-events-none z-[101] bg-[#00F5D4] text-[#07090C] font-mono text-[9px] uppercase tracking-widest font-black px-2.5 py-1 rounded border border-[#00F5D4] shadow-[0_0_15px_rgba(0,245,212,0.4)] whitespace-nowrap flex items-center gap-1.5"
      >
        <span>LAUNCH SYSTEM GALLERY ✦</span>
      </motion.div>
    </>
  );
}
