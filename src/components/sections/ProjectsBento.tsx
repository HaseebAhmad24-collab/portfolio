"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, FileText, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { projectsConfig, ProjectConfig } from "@/data/projects";
import { fetchRepoData, GitHubRepoData } from "@/lib/github";

interface ProjectState extends ProjectConfig {
  title: string;
  description: string;
  readme: string;
}

const GithubIcon = ({ className, size = 16 }: { className?: string; size?: number }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function ProjectsBento() {
  const [projects, setProjects] = useState<ProjectState[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeLightbox, setActiveLightbox] = useState<ProjectState | null>(null);
  const [activeReadme, setActiveReadme] = useState<ProjectState | null>(null);
  const [activeTab, setActiveTab] = useState<"gif" | "screenshots">("gif");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function loadProjectsData() {
      try {
        const promises = projectsConfig.map(async (config) => {
          const repoData = await fetchRepoData(config.repoUrl);
          
          return {
            ...config,
            title: repoData?.name || config.fallbackTitle,
            description: repoData?.description 
              ? (repoData.description.length > 120 ? repoData.description.substring(0, 117) + "..." : repoData.description)
              : config.fallbackDescription,
            readme: repoData?.readme || "README not found or empty."
          };
        });

        const results = await Promise.all(promises);
        setProjects(results);
      } catch (error) {
        console.error("Failed to load dynamic projects data:", error);
        // Fallback to static config data
        const fallbacks = projectsConfig.map(config => ({
          ...config,
          title: config.fallbackTitle,
          description: config.fallbackDescription,
          readme: "Unable to load README from GitHub due to connection error."
        }));
        setProjects(fallbacks);
      } finally {
        setLoading(false);
      }
    }

    loadProjectsData();
  }, []);

  // Keyboard accessibility for ESC key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveLightbox(null);
        setActiveReadme(null);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Simple Markdown parser for modal
  function renderReadmeMarkdown(text: string) {
    if (!text) return null;
    const lines = text.split("\n");
    let inCodeBlock = false;

    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Handle Code Block boundary
      if (trimmed.startsWith("```")) {
        inCodeBlock = !inCodeBlock;
        return null;
      }

      if (inCodeBlock) {
        return (
          <pre key={idx} className="bg-black/50 p-4 rounded-xl font-mono text-xs text-[#00F5D4] my-2 overflow-x-auto border border-white/5">
            <code>{line}</code>
          </pre>
        );
      }

      // Headings
      if (trimmed.startsWith("# ")) {
        return <h1 key={idx} className="text-2xl font-syne font-black text-white mt-8 mb-4 border-b border-white/10 pb-2 uppercase tracking-wide">{trimmed.replace("# ", "")}</h1>;
      }
      if (trimmed.startsWith("## ")) {
        return <h2 key={idx} className="text-xl font-syne font-bold text-white mt-6 mb-3 border-b border-white/5 pb-1 uppercase tracking-wider">{trimmed.replace("## ", "")}</h2>;
      }
      if (trimmed.startsWith("### ")) {
        return <h3 key={idx} className="text-lg font-syne font-bold text-[#00F5D4] mt-5 mb-2">{trimmed.replace("### ", "")}</h3>;
      }

      // Bullet points
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        return <li key={idx} className="text-[#94A3B8] text-sm ml-6 list-disc mb-1.5">{trimmed.substring(2)}</li>;
      }

      // Blockquotes
      if (trimmed.startsWith("> ")) {
        return <blockquote key={idx} className="border-l-4 border-[#00F5D4] bg-white/5 px-4 py-3 my-3 text-sm text-[#94A3B8] italic rounded-r-lg">{trimmed.substring(2)}</blockquote>;
      }

      // Empty Lines
      if (trimmed === "") return <div key={idx} className="h-3" />;

      // Paragraphs
      return <p key={idx} className="text-[#94A3B8] text-sm leading-relaxed mb-3">{line}</p>;
    });
  }

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section id="work" className="py-32 px-6 bg-[#0A0A0B] relative">
      {/* Background soft ambient glows */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00F5D4]/5 rounded-full filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/5 rounded-full filter blur-[120px] pointer-events-none" />

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
          <p className="text-[#94A3B8] mt-2 ml-5 text-sm uppercase tracking-widest font-mono">
            // Real-time synchronization with GitHub
          </p>
        </motion.div>

        {loading ? (
          /* Premium Shimmer Loading Skeleton */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 md:row-span-1 rounded-3xl bg-[#12181D]/40 p-8 border border-white/5 animate-pulse min-h-[350px] flex flex-col justify-between">
              <div className="w-16 h-16 bg-white/5 rounded-2xl" />
              <div className="space-y-4">
                <div className="w-1/4 h-4 bg-white/5 rounded" />
                <div className="w-1/2 h-8 bg-white/5 rounded" />
                <div className="w-3/4 h-4 bg-white/5 rounded" />
              </div>
              <div className="w-1/3 h-10 bg-white/5 rounded-lg" />
            </div>
            <div className="md:col-span-1 md:row-span-2 rounded-3xl bg-[#12181D]/40 p-8 border border-white/5 animate-pulse min-h-[500px] flex flex-col justify-between">
              <div className="w-16 h-16 bg-white/5 rounded-2xl" />
              <div className="space-y-4">
                <div className="w-1/3 h-4 bg-white/5 rounded" />
                <div className="w-full h-8 bg-white/5 rounded" />
                <div className="w-full h-4 bg-white/5 rounded" />
              </div>
              <div className="w-1/2 h-10 bg-white/5 rounded-lg" />
            </div>
            <div className="md:col-span-2 md:row-span-1 rounded-3xl bg-[#12181D]/40 p-8 border border-white/5 animate-pulse min-h-[350px] flex flex-col justify-between">
              <div className="w-16 h-16 bg-white/5 rounded-2xl" />
              <div className="space-y-4">
                <div className="w-1/4 h-4 bg-white/5 rounded" />
                <div className="w-1/2 h-8 bg-white/5 rounded" />
                <div className="w-3/4 h-4 bg-white/5 rounded" />
              </div>
              <div className="w-1/3 h-10 bg-white/5 rounded-lg" />
            </div>
          </div>
        ) : (
          /* Interactive Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              // Asymmetric bento grid layouts
              // Index 0: Large Wide (Col Span 2, Row Span 1)
              // Index 1: Medium Tall (Col Span 1, Row Span 2)
              // Index 2: Small Wide (Col Span 2, Row Span 1)
              const bentoClasses = index === 0 
                ? "md:col-span-2 md:row-span-1 min-h-[380px]"
                : index === 1 
                  ? "md:col-span-1 md:row-span-2 min-h-[600px] md:min-h-0"
                  : "md:col-span-2 md:row-span-1 min-h-[380px]";

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  onClick={() => {
                    setActiveLightbox(project);
                    setActiveTab("gif");
                    setCurrentImageIndex(0);
                  }}
                  className={`group relative rounded-3xl bg-[#12181D]/80 backdrop-blur-md p-8 overflow-hidden transition-all duration-300 border border-white/5 hover:border-[#00F5D4]/30 shadow-xl flex flex-col justify-between cursor-pointer ${bentoClasses}`}
                >
                  {/* Subtle hovering neon glow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00F5D4]/0 to-[#00F5D4]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Card Header */}
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <span className="text-7xl font-syne font-black text-white/3 group-hover:text-[#00F5D4]/5 transition-colors select-none">
                      {project.id}
                    </span>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-[#00F5D4]/20 group-hover:border-[#00F5D4]/30 transition-all shadow-inner">
                      <ArrowUpRight className="w-5 h-5 text-white group-hover:text-[#00F5D4] transition-colors" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="relative z-10 flex flex-col gap-3">
                    <p className="text-[#00F5D4] text-xs uppercase tracking-widest font-mono font-semibold">
                      // {project.category}
                    </p>
                    <h3 className="text-3xl font-syne font-bold text-white group-hover:text-[#00F5D4] transition-colors uppercase tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-[10px] uppercase tracking-widest text-[#94A3B8] px-3.5 py-1.5 rounded-full border border-white/5 bg-black/30 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Buttons */}
                  <div className="relative z-20 grid grid-cols-3 gap-2 mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveReadme(project);
                      }}
                      className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00F5D4] hover:bg-[#00F5D4]/10 text-white hover:text-[#00F5D4] transition-all duration-300 font-syne font-bold text-xs uppercase tracking-wider group/btn hover:shadow-[0_0_15px_rgba(0,245,212,0.15)]"
                    >
                      <FileText size={14} className="group-hover/btn:scale-110 transition-transform" />
                      <span>README</span>
                    </button>
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00F5D4] hover:bg-[#00F5D4]/10 text-white hover:text-[#00F5D4] transition-all duration-300 font-syne font-bold text-xs uppercase tracking-wider group/btn hover:shadow-[0_0_15px_rgba(0,245,212,0.15)]"
                    >
                      <GithubIcon size={14} className="group-hover/btn:scale-110 transition-transform" />
                      <span>GitHub</span>
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center gap-1.5 py-3 px-2 rounded-xl bg-[#00F5D4] text-[#0B0F12] hover:bg-white hover:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-300 font-syne font-bold text-xs uppercase tracking-wider group/btn"
                    >
                      <ExternalLink size={14} className="group-hover/btn:scale-110 transition-transform" />
                      <span>Live</span>
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* FULLSCREEN LIGHTBOX / GALLERY OVERLAY */}
      <AnimatePresence>
        {activeLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLightbox(null)}
            className="fixed inset-0 bg-[#0A0A0B]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#12181D]/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[70vh] max-h-[90vh]"
            >
              {/* Media Section (Left/Top) */}
              <div className="w-full md:w-3/5 h-[300px] md:h-full bg-black/40 relative flex flex-col justify-between p-4 border-b md:border-b-0 md:border-r border-white/5">
                {/* Media Selector Tabs */}
                <div className="flex gap-2 relative z-10">
                  <button
                    onClick={() => setActiveTab("gif")}
                    className={`px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-syne font-bold border transition-all duration-300 ${
                      activeTab === "gif"
                        ? "bg-[#00F5D4] text-[#0B0F12] border-[#00F5D4]"
                        : "bg-white/5 text-[#94A3B8] border-white/5 hover:border-white/10"
                    }`}
                  >
                    Demo GIF
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("screenshots");
                      setCurrentImageIndex(0);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs uppercase tracking-widest font-syne font-bold border transition-all duration-300 ${
                      activeTab === "screenshots"
                        ? "bg-[#00F5D4] text-[#0B0F12] border-[#00F5D4]"
                        : "bg-white/5 text-[#94A3B8] border-white/5 hover:border-white/10"
                    }`}
                  >
                    Screenshots
                  </button>
                </div>

                {/* Media Render Screen */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-8">
                  {activeTab === "gif" ? (
                    /* Autoplay GIF with smooth gradient border */
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                      <img 
                        src={activeLightbox.gifUrl} 
                        alt="Project Demo GIF" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    /* Swipeable/Clickable Screenshots Gallery */
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={activeLightbox.images[currentImageIndex]} 
                        alt={`Screenshot ${currentImageIndex + 1}`} 
                        className="w-full h-full object-cover rounded-2xl border border-white/10 shadow-lg transition-all duration-300"
                      />

                      {/* Navigation Controls */}
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : activeLightbox.images.length - 1))}
                        className="absolute left-4 p-2 rounded-xl bg-black/60 border border-white/10 hover:border-[#00F5D4] text-white hover:text-[#00F5D4] transition-colors"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev < activeLightbox.images.length - 1 ? prev + 1 : 0))}
                        className="absolute right-4 p-2 rounded-xl bg-black/60 border border-white/10 hover:border-[#00F5D4] text-white hover:text-[#00F5D4] transition-colors"
                      >
                        <ChevronRight size={20} />
                      </button>

                      {/* Progress Dot Indicators */}
                      <div className="absolute bottom-4 flex gap-1.5 z-10">
                        {activeLightbox.images.map((_, idx) => (
                          <div 
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              idx === currentImageIndex ? "bg-[#00F5D4] w-4" : "bg-white/20"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Info Panel (Right/Bottom) */}
              <div className="w-full md:w-2/5 h-auto md:h-full p-8 flex flex-col justify-between overflow-y-auto bg-[#0E1317]/95">
                <div className="flex flex-col gap-4">
                  {/* Category & Title */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#00F5D4] text-xs uppercase tracking-widest font-mono font-semibold">
                        // {activeLightbox.category}
                      </p>
                      <h3 className="text-3xl font-syne font-bold text-white uppercase tracking-tight mt-1">
                        {activeLightbox.title}
                      </h3>
                    </div>
                    {/* Corner Close Button */}
                    <button
                      onClick={() => setActiveLightbox(null)}
                      className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 hover:bg-white/10 text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Dynamic Long Description */}
                  <p className="text-[#94A3B8] text-sm leading-relaxed my-2">
                    {activeLightbox.description}
                  </p>

                  {/* Stack Badges */}
                  <div>
                    <h4 className="text-white text-xs font-syne font-bold uppercase tracking-widest mb-3">// Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeLightbox.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-[10px] uppercase tracking-widest text-[#94A3B8] px-3.5 py-1.5 rounded-full border border-white/5 bg-black/30 font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lightbox Footer Action Buttons */}
                <div className="grid grid-cols-3 gap-2 mt-8 md:mt-0 pt-6 border-t border-white/5">
                  <button
                    onClick={() => {
                      setActiveReadme(activeLightbox);
                      setActiveLightbox(null);
                    }}
                    className="flex items-center justify-center gap-1.5 py-3.5 px-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00F5D4] hover:bg-[#00F5D4]/10 text-white hover:text-[#00F5D4] transition-all duration-300 font-syne font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,245,212,0.15)]"
                  >
                    <FileText size={14} />
                    <span>README</span>
                  </button>
                  <a
                    href={activeLightbox.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-3.5 px-2 rounded-xl bg-white/5 border border-white/10 hover:border-[#00F5D4] hover:bg-[#00F5D4]/10 text-white hover:text-[#00F5D4] transition-all duration-300 font-syne font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_15px_rgba(0,245,212,0.15)]"
                  >
                    <GithubIcon size={14} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={activeLightbox.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-3.5 px-2 rounded-xl bg-[#00F5D4] text-[#0B0F12] hover:bg-white hover:shadow-[0_0_20px_rgba(0,245,212,0.3)] transition-all duration-300 font-syne font-bold text-xs uppercase tracking-wider"
                  >
                    <ExternalLink size={14} />
                    <span>Live</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RAW MARKDOWN README OVERLAY / MODAL */}
      <AnimatePresence>
        {activeReadme && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveReadme(null)}
            className="fixed inset-0 bg-[#0A0A0B]/95 backdrop-blur-md z-50 flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full h-[80vh] bg-[#12181D]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-8 py-5 bg-[#0E1317]/80 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#00F5D4]" />
                  <span className="font-syne font-bold text-sm uppercase tracking-widest text-[#94A3B8]">
                    {activeReadme.title} // README.md
                  </span>
                </div>
                {/* Modal Close Button */}
                <button
                  onClick={() => setActiveReadme(null)}
                  className="p-2 rounded-xl bg-white/5 border border-white/5 hover:border-white/15 hover:bg-white/10 text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrolling Markdown Reader View */}
              <div className="flex-1 overflow-y-auto px-8 py-6 max-w-full">
                <article className="prose prose-invert max-w-none">
                  {renderReadmeMarkdown(activeReadme.readme)}
                </article>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
