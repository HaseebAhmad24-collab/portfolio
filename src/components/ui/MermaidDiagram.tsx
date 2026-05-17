"use client";

import { useEffect, useRef } from "react";

interface MermaidDiagramProps {
  code: string;
}

export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    async function render() {
      if (!containerRef.current) return;
      
      try {
        const mermaid = (await import("mermaid")).default;
        
        if (!active) return;

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            background: "#0F1318",
            primaryColor: "#00F5D4",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#00F5D4",
            lineColor: "#00F5D4",
            secondaryColor: "#12181D",
            tertiaryColor: "#1A2030",
            edgeLabelBackground: "#0F1318",
            nodeTextColor: "#ffffff",
            clusterBkg: "#12181D",
            titleColor: "#00F5D4",
            fontFamily: "ui-monospace, monospace",
            fontSize: "13px",
          },
        });

        // Safe line ending normalization (removes \r carriage returns)
        const cleanCode = code
          .replace(/\r/g, "")
          .trim();

        // Put the clean code in the element so mermaid.run can read it
        if (containerRef.current) {
          containerRef.current.innerHTML = cleanCode;
          containerRef.current.removeAttribute("data-processed");
        }

        // Run mermaid on this specific node
        await mermaid.run({
          nodes: [containerRef.current],
        });

        // Make SVG responsive
        if (containerRef.current) {
          const svgEl = containerRef.current.querySelector("svg");
          if (svgEl) {
            svgEl.style.width = "100%";
            svgEl.style.height = "auto";
            svgEl.style.maxWidth = "100%";
          }
        }
      } catch (err) {
        console.error("Mermaid Render Error:", err);
        if (containerRef.current && active) {
          containerRef.current.innerHTML = `<pre class="text-red-400 text-xs font-mono p-3 bg-black/40 rounded-lg overflow-x-auto">Diagram render error:\n${err}</pre>`;
        }
      }
    }

    render();

    return () => {
      active = false;
    };
  }, [code]);

  return (
    <div className="my-4 p-4 rounded-xl bg-[#0A0D10] border border-[#00F5D4]/20 overflow-x-auto shadow-inner">
      <div 
        ref={containerRef} 
        className="mermaid flex justify-center items-center min-h-[80px]"
      >
        {/* Fallback/Loading text */}
        <pre className="text-white/60 text-xs font-mono p-2 bg-black/20 rounded">
          {code}
        </pre>
      </div>
    </div>
  );
}
