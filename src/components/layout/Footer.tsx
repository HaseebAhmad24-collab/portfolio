"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { useState } from "react";

export default function Footer() {
  const { contact } = portfolioData.personalInfo;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch("https://formspree.io/f/mlgzqzvn", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#0A0A0B] pt-32 pb-8 border-t border-white/5 overflow-hidden">
      {/* Huge Text Marquee */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-24 group">
        <motion.div
          animate={{ x: [0, -1400] }}
          transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          className="flex gap-4"
        >
          {/* Repeat multiple times for seamless scrolling */}
          {[1, 2, 3, 4].map((i) => (
            <span 
              key={i} 
              className="text-6xl md:text-9xl font-syne font-black uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] group-hover:[-webkit-text-stroke:1px_#00F5D4] transition-all duration-500"
            >
              AVAILABLE FOR FREELANCE PROJECTS • LET'S TALK •&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
        {/* Left Side: Contact Form */}
        <div>
          <h2 className="text-3xl font-syne font-bold text-white mb-8">Send a message</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div className="relative">
              <input 
                type="text" 
                name="name"
                required
                placeholder="Name" 
                className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00F5D4] transition-colors peer"
              />
            </div>
            <div className="relative">
              <input 
                type="email" 
                name="email"
                required
                placeholder="Email" 
                className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00F5D4] transition-colors peer"
              />
            </div>
            <div className="relative">
              <textarea 
                name="message"
                required
                placeholder="Message" 
                rows={3}
                className="w-full bg-transparent border-b-2 border-white/10 py-3 text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00F5D4] transition-colors peer resize-none"
              />
            </div>
            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="w-fit text-sm font-bold uppercase tracking-widest text-[#0B0F12] bg-[#00F5D4] px-8 py-4 rounded hover:bg-white hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Sending..." : status === "success" ? "Message Sent!" : status === "error" ? "Failed! Try Again" : "Submit"}
            </button>
          </form>
        </div>

        {/* Right Side: Social & Details */}
        <div className="flex flex-col justify-end items-start md:items-end gap-6 text-left md:text-right">
          <div>
            <p className="text-[#94A3B8] uppercase text-[10px] font-bold tracking-widest mb-2">Location</p>
            <p className="text-white text-lg">{contact.location}</p>
          </div>
          <div>
            <p className="text-[#94A3B8] uppercase text-[10px] font-bold tracking-widest mb-2">Email</p>
            <a href={`mailto:${contact.email}`} className="text-white text-lg hover:text-[#00F5D4] transition-colors">
              {contact.email}
            </a>
          </div>
          <div>
            <p className="text-[#94A3B8] uppercase text-[10px] font-bold tracking-widest mb-2">Phone</p>
            <a href={`tel:${contact.phone}`} className="text-white text-lg hover:text-[#00F5D4] transition-colors">
              {contact.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-[#94A3B8]">
        <p>© {new Date().getFullYear()} Haseeb Ahmad. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href={contact.github} className="hover:text-[#00F5D4] transition-colors uppercase tracking-widest text-xs">Github</a>
          <a href={contact.linkedin} className="hover:text-[#00F5D4] transition-colors uppercase tracking-widest text-xs">LinkedIn</a>
          <a href={contact.upwork} className="hover:text-[#00F5D4] transition-colors uppercase tracking-widest text-xs">Upwork</a>
        </div>
      </div>
    </footer>
  );
}
