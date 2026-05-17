"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, FileText, X, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { projectsConfig, ProjectConfig } from "@/data/projects";
import { fetchRepoData, GitHubRepoData } from "@/lib/github";
import MermaidDiagram from "@/components/ui/MermaidDiagram";

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
            description: repoData?.description || config.fallbackDescription,
            readme: repoData?.readme || "README not found or empty."
          };
        });

        const results = await Promise.all(promises);
        setProjects(results);
      } catch (error) {
        console.error("Failed to load dynamic projects data:", error);
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

  // Inline markdown parser — handles HTML tags, badges, images, links, bold, italic, code
  function parseInline(text: string, keyPrefix: string): React.ReactNode {
    let elementCounter = 0;

    // Base RAW URL calculation for relative paths (e.g. images)
    const repoUrl = activeReadme?.repoUrl || "";
    let rawBaseUrl = "";
    if (repoUrl) {
      const cleanRepoUrl = repoUrl.trim().replace(/\/$/, "").replace(/\.git$/, "");
      rawBaseUrl = cleanRepoUrl.replace("github.com", "raw.githubusercontent.com") + "/main/";
    }

    function parseSegment(str: string): React.ReactNode[] {
      if (!str) return [];

      // Find which pattern occurs first in the string to parse it recursively
      const patterns = [
        { regex: /<img\s+[^>]*?src=["']([^"']+)["'][^>]*?\/?>/, type: "html-img" },
        { regex: /<br\s*\/?>/, type: "html-br" },
        { regex: /<h1[^>]*>(.*?)<\/h1>/, type: "html-h1" },
        { regex: /<h2[^>]*>(.*?)<\/h2>/, type: "html-h2" },
        { regex: /<h3[^>]*>(.*?)<\/h3>/, type: "html-h3" },
        { regex: /<p[^>]*>(.*?)<\/p>/, type: "html-p" },
        { regex: /<strong[^>]*>(.*?)<\/strong>/, type: "html-strong" },
        { regex: /(\[!\[[^\]]*\]\([^)]+\)\]\([^)]+\))/, type: "linked-img" },
        { regex: /(!\[[^\]]*\]\([^)]+\))/, type: "md-img" },
        { regex: /(\[[^\]]+\]\([^)]+\))/, type: "md-link" },
        { regex: /(\*\*[^*]+\*\*)/, type: "bold" },
        { regex: /(\*[^*]+\*)/, type: "italic" },
        { regex: /(`[^`]+`)/, type: "code" }
      ];

      let earliestMatch: { index: number; length: number; matchObj: RegExpExecArray; type: string } | null = null;

      for (const pattern of patterns) {
        const m = pattern.regex.exec(str);
        if (m) {
          if (earliestMatch === null || m.index < earliestMatch.index) {
            earliestMatch = {
              index: m.index,
              length: m[0].length,
              matchObj: m,
              type: pattern.type
            };
          }
        }
      }

      if (!earliestMatch) {
        return [<span key={`${keyPrefix}-txt-${elementCounter++}`}>{str}</span>];
      }

      const prefix = str.slice(0, earliestMatch.index);
      const matchedText = earliestMatch.matchObj[0];
      const suffix = str.slice(earliestMatch.index + earliestMatch.length);

      const parsedPrefix = parseSegment(prefix);
      let parsedMatch: React.ReactNode = null;

      const currentKey = `${keyPrefix}-el-${elementCounter++}`;

      if (earliestMatch.type === "html-img") {
        const altMatch = /alt=["']([^"']*)["']/.exec(matchedText);
        const altText = altMatch ? altMatch[1] : "image";
        let srcUrl = earliestMatch.matchObj[1];
        
        // Convert relative URL to raw GitHub URL
        if (srcUrl && !/^https?:\/\//i.test(srcUrl) && !/^data:/i.test(srcUrl) && rawBaseUrl) {
          const cleanSrc = srcUrl.replace(/^\.\//, "").replace(/^\//, "");
          srcUrl = rawBaseUrl + cleanSrc;
        }

        parsedMatch = (
          <img 
            key={currentKey} 
            src={srcUrl} 
            alt={altText} 
            className="inline max-h-16 h-auto rounded align-middle mr-1.5 mb-1.5" 
          />
        );
      } 
      else if (earliestMatch.type === "html-br") {
        parsedMatch = <br key={currentKey} />;
      } 
      else if (earliestMatch.type === "html-h1") {
        const content = earliestMatch.matchObj[1];
        parsedMatch = (
          <h1 key={currentKey} className="text-xl md:text-2xl font-syne font-bold text-white mt-6 mb-3 border-b border-white/10 pb-2 w-full block">
            {parseSegment(content)}
          </h1>
        );
      }
      else if (earliestMatch.type === "html-h2") {
        const content = earliestMatch.matchObj[1];
        parsedMatch = (
          <h2 key={currentKey} className="text-lg md:text-xl font-syne font-bold text-white mt-5 mb-2 w-full block">
            {parseSegment(content)}
          </h2>
        );
      }
      else if (earliestMatch.type === "html-h3") {
        const content = earliestMatch.matchObj[1];
        parsedMatch = (
          <h3 key={currentKey} className="text-md md:text-lg font-syne font-bold text-white mt-4 mb-2 w-full block">
            {parseSegment(content)}
          </h3>
        );
      }
      else if (earliestMatch.type === "html-p") {
        const content = earliestMatch.matchObj[1];
        parsedMatch = (
          <span key={currentKey} className="text-[#94A3B8] text-sm leading-relaxed mb-3 block w-full">
            {parseSegment(content)}
          </span>
        );
      }
      else if (earliestMatch.type === "html-strong") {
        const content = earliestMatch.matchObj[1];
        parsedMatch = (
          <strong key={currentKey} className="text-white font-bold">
            {parseSegment(content)}
          </strong>
        );
      }
      else if (earliestMatch.type === "linked-img") {
        const m = matchedText.match(/^\[!\[([^\]]*)\]\(([^)]+)\)\]\(([^)]+)\)$/);
        if (m) {
          parsedMatch = (
            <a key={currentKey} href={m[3]} target="_blank" rel="noreferrer" className="inline-block mr-1.5 mb-1.5 align-middle">
              <img src={m[2]} alt={m[1]} className="inline h-5 rounded" />
            </a>
          );
        }
      } 
      else if (earliestMatch.type === "md-img") {
        const m = matchedText.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (m) {
          let srcUrl = m[2];
          
          // Convert relative URL to raw GitHub URL
          if (srcUrl && !/^https?:\/\//i.test(srcUrl) && !/^data:/i.test(srcUrl) && rawBaseUrl) {
            const cleanSrc = srcUrl.replace(/^\.\//, "").replace(/^\//, "");
            srcUrl = rawBaseUrl + cleanSrc;
          }

          parsedMatch = (
            <img key={currentKey} src={srcUrl} alt={m[1]} className="inline h-5 rounded align-middle mr-1.5 mb-1.5" />
          );
        }
      } 
      else if (earliestMatch.type === "md-link") {
        const m = matchedText.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (m) {
          parsedMatch = (
            <a key={currentKey} href={m[2]} target="_blank" rel="noreferrer" className="text-[#00F5D4] hover:underline underline-offset-2">
              {parseSegment(m[1])}
            </a>
          );
        }
      } 
      else if (earliestMatch.type === "bold") {
        const content = matchedText.slice(2, -2);
        parsedMatch = (
          <strong key={currentKey} className="text-white font-bold">
            {parseSegment(content)}
          </strong>
        );
      } 
      else if (earliestMatch.type === "italic") {
        const content = matchedText.slice(1, -1);
        parsedMatch = (
          <em key={currentKey} className="italic text-[#94A3B8]">
            {parseSegment(content)}
          </em>
        );
      } 
      else if (earliestMatch.type === "code") {
        const content = matchedText.slice(1, -1);
        parsedMatch = (
          <code key={currentKey} className="bg-black/50 px-1.5 py-0.5 rounded text-[#00F5D4] text-xs font-mono">
            {content}
          </code>
        );
      }

      return [...parsedPrefix, parsedMatch, ...parseSegment(suffix)];
    }

    return <>{parseSegment(text)}</>;
  }

  // Full GitHub-style Markdown renderer
  function renderReadmeMarkdown(text: string) {
    if (!text) return null;
    const lines = text.split("\n");
    let inCodeBlock = false;
    let codeLang = "";
    let codeLines: string[] = [];
    let isCentered = false;
    let currentParagraphLines: string[] = [];
    const output: React.ReactNode[] = [];

    const flushParagraph = (keyPrefix: string) => {
      if (currentParagraphLines.length === 0) return;
      
      const content = currentParagraphLines.map((l, i) => (
        <span key={`${keyPrefix}-pl-${i}`} className="inline-block mr-1.5 mb-1.5 align-middle">
          {parseInline(l, `${keyPrefix}-pl-${i}`)}
        </span>
      ));

      if (isCentered) {
        output.push(
          <div key={`${keyPrefix}-para`} className="text-center flex flex-wrap justify-center items-center gap-1.5 w-full my-2">
            {content}
          </div>
        );
      } else {
        output.push(
          <p key={`${keyPrefix}-para`} className="text-[#94A3B8] text-sm leading-relaxed mb-3 flex flex-wrap items-center">
            {content}
          </p>
        );
      }
      currentParagraphLines = [];
    };

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      // HTML center tag detection (Structural block)
      if (trimmed.startsWith('<div align="center">') || trimmed.startsWith('<div align=\'center\'>')) {
        flushParagraph(`align-start-${idx}`);
        isCentered = true;
        return;
      }
      if (trimmed.startsWith('</div>')) {
        flushParagraph(`align-end-${idx}`);
        isCentered = false;
        return;
      }

      // Code block toggle (Structural block)
      if (trimmed.startsWith("```")) {
        if (!inCodeBlock) {
          flushParagraph(`cb-start-${idx}`);
          inCodeBlock = true;
          codeLang = trimmed.slice(3).trim().toLowerCase();
          codeLines = [];
        } else {
          inCodeBlock = false;
          if (codeLang === "mermaid") {
            output.push(<MermaidDiagram key={`mermaid-${idx}`} code={codeLines.join("\n")} />);
          } else {
            output.push(
              <pre key={`cb-${idx}`} className="bg-black/80 p-4 rounded-xl font-mono text-xs text-[#00F5D4] my-3 overflow-x-auto border border-white/5 shadow-inner leading-relaxed">
                <code>{codeLines.join("\n")}</code>
              </pre>
            );
          }
          codeLang = "";
        }
        return;
      }

      if (inCodeBlock) {
        codeLines.push(line);
        return;
      }

      // Horizontal rule (Structural block)
      if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
        flushParagraph(`hr-${idx}`);
        output.push(<hr key={`hr-${idx}`} className="border-white/10 my-4" />);
        return;
      }

      // Headings (Structural block)
      if (trimmed.startsWith("# ")) {
        flushParagraph(`h1-${idx}`);
        const headingClass = `text-xl md:text-2xl font-syne font-bold text-white mt-8 mb-3 border-b border-white/10 pb-2 ${isCentered ? "text-center w-full" : ""}`;
        output.push(<h1 key={`h1-${idx}`} className={headingClass}>{parseInline(trimmed.slice(2), `h1-${idx}`)}</h1>);
        return;
      }
      if (trimmed.startsWith("## ")) {
        flushParagraph(`h2-${idx}`);
        const headingClass = `text-lg font-syne font-bold text-white mt-6 mb-2 border-b border-white/5 pb-1 ${isCentered ? "text-center w-full" : ""}`;
        output.push(<h2 key={`h2-${idx}`} className={headingClass}>{parseInline(trimmed.slice(3), `h2-${idx}`)}</h2>);
        return;
      }
      if (trimmed.startsWith("### ")) {
        flushParagraph(`h3-${idx}`);
        const headingClass = `text-base font-syne font-semibold text-[#00F5D4] mt-5 mb-2 ${isCentered ? "text-center w-full" : ""}`;
        output.push(<h3 key={`h3-${idx}`} className={headingClass}>{parseInline(trimmed.slice(4), `h3-${idx}`)}</h3>);
        return;
      }
      if (trimmed.startsWith("#### ")) {
        flushParagraph(`h4-${idx}`);
        const headingClass = `text-sm font-syne font-semibold text-white/80 mt-4 mb-1 ${isCentered ? "text-center w-full" : ""}`;
        output.push(<h4 key={`h4-${idx}`} className={headingClass}>{parseInline(trimmed.slice(5), `h4-${idx}`)}</h4>);
        return;
      }

      // List items (Structural block)
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        flushParagraph(`li-${idx}`);
        output.push(<li key={`li-${idx}`} className="text-[#94A3B8] text-sm ml-5 list-disc mb-1.5">{parseInline(trimmed.slice(2), `li-${idx}`)}</li>);
        return;
      }
      if (/^\d+\. /.test(trimmed)) {
        flushParagraph(`oli-${idx}`);
        const content = trimmed.replace(/^\d+\. /, "");
        output.push(<li key={`oli-${idx}`} className="text-[#94A3B8] text-sm ml-5 list-decimal mb-1.5">{parseInline(content, `oli-${idx}`)}</li>);
        return;
      }

      // Blockquote (Structural block)
      if (trimmed.startsWith("> ")) {
        flushParagraph(`bq-${idx}`);
        output.push(<blockquote key={`bq-${idx}`} className="border-l-4 border-[#00F5D4] bg-white/5 px-4 py-2 my-3 text-sm text-[#94A3B8] italic rounded-r-lg">{parseInline(trimmed.slice(2), `bq-${idx}`)}</blockquote>);
        return;
      }

      // Empty line (Structural block)
      if (trimmed === "") {
        flushParagraph(`sp-${idx}`);
        output.push(<div key={`sp-${idx}`} className="h-2" />);
        return;
      }

      // Accumulate standard paragraph lines
      currentParagraphLines.push(line);
    });

    // Final flush of remaining paragraph text
    flushParagraph("final");

    return output;
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
    <section id="work" className="py-32 px-4 md:px-6 bg-[#07090C] relative overflow-hidden">
      {/* Background Matrix/Grid Art Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#12181F_1px,transparent_1px),linear-gradient(to_bottom,#12181F_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" />

      {/* Cyberpunk high-tech ambient glows */}
      <div className="absolute top-1/4 left-1/10 w-80 md:w-96 h-80 md:h-96 bg-[#00F5D4]/3 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-80 md:w-96 h-80 md:h-96 bg-purple-500/3 rounded-full filter blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-syne font-bold text-white border-l-4 border-[#00F5D4] pl-4 uppercase tracking-tight">
            FEATURED PROJECTS
          </h2>
        </motion.div>

        {loading ? (
          /* Premium Custom-Shaped Shimmer Skeletons */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 md:row-span-1 rounded-2xl bg-[#0F1318]/50 p-6 md:p-8 border border-white/5 animate-pulse min-h-[350px] flex flex-col justify-between">
              <div className="w-12 h-6 bg-white/5 rounded" />
              <div className="space-y-4">
                <div className="w-1/2 h-8 bg-white/5 rounded" />
                <div className="w-3/4 h-4 bg-white/5 rounded" />
              </div>
              <div className="flex gap-2">
                <div className="w-24 h-10 bg-white/5 rounded-lg" />
                <div className="w-24 h-10 bg-white/5 rounded-lg" />
              </div>
            </div>
            <div className="md:col-span-1 md:row-span-2 rounded-2xl bg-[#0F1318]/50 p-6 md:p-8 border border-white/5 animate-pulse min-h-[500px] flex flex-col justify-between">
              <div className="w-12 h-6 bg-white/5 rounded" />
              <div className="space-y-4">
                <div className="w-full h-8 bg-white/5 rounded" />
                <div className="w-full h-4 bg-white/5 rounded" />
              </div>
              <div className="flex gap-2">
                <div className="w-full h-10 bg-white/5 rounded-lg" />
              </div>
            </div>
            <div className="md:col-span-2 md:row-span-1 rounded-2xl bg-[#0F1318]/50 p-6 md:p-8 border border-white/5 animate-pulse min-h-[350px] flex flex-col justify-between">
              <div className="w-12 h-6 bg-white/5 rounded" />
              <div className="space-y-4">
                <div className="w-1/2 h-8 bg-white/5 rounded" />
                <div className="w-3/4 h-4 bg-white/5 rounded" />
              </div>
              <div className="flex gap-2">
                <div className="w-24 h-10 bg-white/5 rounded-lg" />
                <div className="w-24 h-10 bg-white/5 rounded-lg" />
              </div>
            </div>
          </div>
        ) : (
          /* Custom Premium Bento Grid Console */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((project, index) => {
              const moduloIndex = index % 4;
              const bentoClasses = moduloIndex === 0 || moduloIndex === 3
                ? "md:col-span-2 md:row-span-1 min-h-[360px]"
                : "md:col-span-1 md:row-span-1 min-h-[360px]";

              return (
                <motion.div
                  key={project.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.015, y: -4 }}
                  onClick={() => {
                    setActiveLightbox(project);
                    setActiveTab("gif");
                    setCurrentImageIndex(0);
                  }}
                  className={`group relative rounded-2xl bg-[#0F1318]/90 backdrop-blur-md p-6 md:p-8 overflow-hidden transition-all duration-300 border border-white/5 hover:border-[#00F5D4]/40 shadow-2xl flex flex-col justify-between cursor-pointer ${bentoClasses}`}
                >
                  {/* Neon Grid Backing Pattern Reveal on Hover */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#00F5D4_1px,transparent_1px),linear-gradient(to_bottom,#00F5D4_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none" />

                  {/* Corner High-tech bracket details */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 group-hover:border-[#00F5D4]/40 transition-colors" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/10 group-hover:border-[#00F5D4]/40 transition-colors" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/10 group-hover:border-[#00F5D4]/40 transition-colors" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover:border-[#00F5D4]/40 transition-colors" />
                  
                  {/* Console Header */}
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <span className="font-mono text-xs text-white/20 group-hover:text-[#00F5D4]/40 transition-colors select-none tracking-widest font-semibold">
                      [SYS_LOC: {index + 1 < 10 ? `0${index + 1}` : index + 1}_PRJ]
                    </span>
                    <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 group-hover:bg-[#00F5D4]/10 group-hover:border-[#00F5D4]/30 transition-all">
                      <ArrowUpRight className="w-4 h-4 text-white/60 group-hover:text-[#00F5D4] transition-colors" />
                    </div>
                  </div>

                  {/* Dynamic Project Details */}
                  <div className="relative z-10 flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F5D4]" />
                      <p className="text-[#00F5D4] text-[10px] md:text-xs uppercase tracking-widest font-mono font-bold">
                        {project.category}
                      </p>
                    </div>
                    <h3 className="text-3xl font-syne font-bold text-white group-hover:text-[#00F5D4] transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Tech Badges as Minimal Monospace Brackets */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-[10px] text-white/50 px-2.5 py-1 rounded border border-white/5 bg-black/20 font-mono tracking-wider"
                        >
                          &lt; {tech} &gt;
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Responsive Console Action Buttons (Completely Solves Mobile Overflows) */}
                  <div className="relative z-20 flex flex-col sm:grid sm:grid-cols-3 gap-2 w-full mt-auto">
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
            className="fixed inset-0 bg-[#07090C]/96 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#0F1318]/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row h-auto md:h-[65vh] lg:h-[70vh] max-h-[90vh]"
            >
              {/* Media Section (Left/Top) */}
              <div className="w-full md:w-[65%] h-[240px] sm:h-[300px] md:h-full bg-black/60 relative flex flex-col justify-between p-4 border-b md:border-b-0 md:border-r border-white/5">
                {/* Media Selector Tabs */}
                <div className="flex gap-2 relative z-10">
                  <button
                    onClick={() => setActiveTab("gif")}
                    className={`px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest font-mono font-bold border transition-all duration-300 ${
                      activeTab === "gif"
                        ? "bg-[#00F5D4] text-[#0B0F12] border-[#00F5D4] shadow-[0_0_10px_rgba(0,245,212,0.2)]"
                        : "bg-white/5 text-white/50 border-white/5 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    Demo GIF
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("screenshots");
                      setCurrentImageIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-md text-[10px] uppercase tracking-widest font-mono font-bold border transition-all duration-300 ${
                      activeTab === "screenshots"
                        ? "bg-[#00F5D4] text-[#0B0F12] border-[#00F5D4] shadow-[0_0_10px_rgba(0,245,212,0.2)]"
                        : "bg-white/5 text-white/50 border-white/5 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    Screenshots
                  </button>
                </div>

                {/* Media Render Screen */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-6">
                  {activeTab === "gif" ? (
                    <div className="relative w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-lg">
                      <img 
                        src={activeLightbox.gifUrl} 
                        alt="Project Demo GIF" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img 
                        src={activeLightbox.images[currentImageIndex]} 
                        alt={`Screenshot ${currentImageIndex + 1}`} 
                        className="w-full h-full object-contain rounded-xl border border-white/10 shadow-lg"
                      />

                      {/* Navigation Controls */}
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : activeLightbox.images.length - 1))}
                        className="absolute left-3 p-1.5 rounded-lg bg-black/75 border border-white/10 hover:border-[#00F5D4] text-white hover:text-[#00F5D4] transition-colors"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev < activeLightbox.images.length - 1 ? prev + 1 : 0))}
                        className="absolute right-3 p-1.5 rounded-lg bg-black/75 border border-white/10 hover:border-[#00F5D4] text-white hover:text-[#00F5D4] transition-colors"
                      >
                        <ChevronRight size={16} />
                      </button>

                      {/* Progress Dot Indicators */}
                      <div className="absolute bottom-3 flex gap-1 z-10">
                        {activeLightbox.images.map((_, idx) => (
                          <div 
                            key={idx}
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                              idx === currentImageIndex ? "bg-[#00F5D4] w-3.5" : "bg-white/25"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Dynamic Info Panel (Right/Bottom) */}
              <div className="w-full md:w-[35%] h-auto md:h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto bg-[#0A0D10]/95">
                <div className="flex flex-col gap-4">
                  {/* Category & Title */}
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[#00F5D4] text-[10px] md:text-xs uppercase tracking-widest font-mono font-bold">
                        // {activeLightbox.category}
                      </p>
                      <h3 className="text-3xl font-syne font-bold text-white uppercase tracking-tight">
                        {activeLightbox.title}
                      </h3>
                    </div>
                    {/* Close Button */}
                    <button
                      onClick={() => setActiveLightbox(null)}
                      className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 hover:bg-white/10 text-white transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Description */}
                  <p className="text-[#94A3B8] text-sm leading-relaxed my-2">
                    {activeLightbox.description}
                  </p>

                  {/* Stack Badges */}
                  <div>
                    <h4 className="text-white/40 text-[10px] font-mono uppercase tracking-widest mb-2.5">// TECHNOLOGIES</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeLightbox.techStack.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-[9px] text-white/60 px-2 py-0.5 rounded border border-white/5 bg-black/25 font-mono"
                        >
                          &lt; {tech} &gt;
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Lightbox Footer Action Buttons (Fully Stackable/Grid Responsive) */}
                <div className="flex flex-col gap-2 mt-8 md:mt-0 pt-4 border-t border-white/5">
                  <div className="grid grid-cols-3 gap-2 w-full">
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
                      className="flex items-center justify-center gap-1.5 py-3.5 px-2 rounded-xl bg-[#00F5D4] text-[#0B0F12] hover:bg-white transition-all duration-300 font-syne font-bold text-xs uppercase tracking-wider"
                    >
                      <ExternalLink size={14} />
                      <span>Live</span>
                    </a>
                  </div>
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
            className="fixed inset-0 bg-[#07090C]/96 backdrop-blur-md z-50 flex items-center justify-center p-3 md:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full h-[80vh] bg-[#0F1318]/98 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 md:px-8 py-4 bg-[#0A0D10]/90 border-b border-white/5 relative z-10">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#00F5D4]" />
                  <span className="font-mono text-xs uppercase tracking-widest text-white/60">
                    {activeReadme.title} // README.md
                  </span>
                </div>
                {/* Close Button */}
                <button
                  onClick={() => setActiveReadme(null)}
                  className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 hover:bg-white/10 text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrolling Markdown Reader View */}
              <div className="flex-1 overflow-y-auto px-6 md:px-8 py-6 max-w-full">
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
