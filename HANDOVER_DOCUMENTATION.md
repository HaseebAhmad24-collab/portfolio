# 🚀 Portfolio System & Architecture Handover Documentation

This comprehensive document details the entire technical architecture, components, logic, and configurations implemented across the portfolio workspace. It is designed to act as a single source of truth for any future developer or Agentic AI to easily understand, maintain, and scale the application.

---

## 🛠️ 1. Technology Stack & Core Architecture

The portfolio is built using a modern, fast, and highly visual web development stack:

*   **Framework:** **Next.js 16 (App Router)** utilizing **Turbopack** for blazing-fast development builds.
*   **Language:** **TypeScript (Strict Mode)** to guarantee type safety across API integrations and components.
*   **Styling & Theme:** **Tailwind CSS** + Custom CSS variables. The design language is **Cyberpunk / Tech-Noir** with elegant **Glassmorphism**, neon accents (`#00F5D4`), and custom layout grids.
*   **Animations:** **Framer Motion** for smooth, low-latency scroll-linked and hover micro-animations.
*   **API Integrations:** **GitHub REST API v3** for real-time repository metadata and markdown fetching.
*   **Visualizations:** **Mermaid.js (Client-side Engine)** for rendering high-fidelity architectural flowcharts.

---

## 📦 2. Core Modules & Functionality

### 📐 A. Featured Projects Bento Grid (`ProjectsBento.tsx`)
*   **Design & Layout:**
    *   An asymmetric **Bento Grid** (1 large container on the left, 1 medium card on the top right, 1 small card on the bottom right).
    *   Thin cyber-borders with glowing **high-tech corner brackets** (`border-t border-l`, etc.) that light up on hover.
    *   **Interactive Diagnostics Hologrid:** A custom CSS-driven matrix pattern (`linear-gradient`) that dynamically reveals itself inside the cards on hover.
*   **Data Fetching (`src/lib/github.ts`):**
    *   Pulls real-time data from the **GitHub API** (Repo Name, Description, and raw Markdown `README.md`).
    *   Utilizes Next.js fetch caching (`next: { revalidate: 3600 }`) to cache responses for 1 hour to prevent GitHub rate-limiting.
    *   Safe fallback mechanism: If a repository returns a `404` or the API limit is hit, the UI gracefully falls back to pre-defined local data in `projects.ts`.

### 📄 B. GitHub README Viewer & Advanced Custom Markdown Parser
The portfolio implements a custom-built, lightweight **Markdown Compiler** that renders GitHub READMEs inside a modern full-screen glassmorphic lightbox modal. 
*   **Plain Text Formatting:** Properly processes Headings (`#` through `####`), Blockquotes (`> `), horizontal rules (`---`), ordered lists (`1. item`), and unordered lists (`- item`).
*   **Inline Tokenizer:** A regular expression-based inline compiler renders:
    *   **Linked Badges:** Automatically parses `[![Alt](imgUrl)](link)` (e.g. Shields.io badges) into fully styled, clickable inline badge elements.
    *   **Inline Code & Blocks:** Renders code segments in high-contrast cyan font pills (`#00F5D4`) and formats multi-line code blocks inside syntax-highlighted containers.
    *   **Links, Bold & Italic:** Converts Markdown brackets into Next-optimized links, `<strong>` tags, and styled italics.

### 📊 C. Interactive Mermaid.js Diagram Engine (`MermaidDiagram.tsx`)
*   To render architectural diagrams included in project READMEs, a custom **Client-Side Mermaid Component** is used:
    *   **Dynamic Lazy Loading:** Imports `mermaid` dynamically (`await import("mermaid")`) only on the client side inside a React `useEffect` to prevent server-side rendering (SSR) hydration mismatches.
    *   **Theme Integration:** Automatically configures Mermaid initialization with a custom-styled dark theme, applying the portfolio's neon-cyan border and text colors to the generated SVG nodes.
    *   **Responsive Scaling:** Post-processes the rendered SVGs to be 100% responsive, adapting to mobile and desktop viewports smoothly.

### 📱 D. Mobile Navigation & Dropdown Navigation (`Navbar.tsx`)
*   Replaced bulky, full-screen mobile menu overlays with an elegant, space-conscious **floating glassmorphic dropdown card** in the top-right corner.
*   Uses Framer Motion for a smooth dropdown scale transition and integrates outside-click listener hooks for smooth user interaction.

### ✉️ E. Silent AJAX Formspree Contact Form (`Footer.tsx`)
*   Integrates a fully custom AJAX form submission handler pointing to Formspree endpoint `https://formspree.io/f/mlgzqzvn`.
*   Blocks standard Page Redirects on submit; payloads are formatted explicitly as stringified JSON (`JSON.stringify(data)`) with an explicit `Content-Type: application/json` header, bypassing the FormData CORS restriction of Formspree's free tier.

---

## 🎨 3. Design & Typography Tokens

To maintain a uniform premium developer aesthetic across the page:
1.  **Main Headings (About, Featured Projects, Education):**
    *   Uses **`font-syne font-bold`** in uppercase.
    *   Aligned with a neon-cyan vertical accent line: `border-l-4 border-[#00F5D4] pl-4`.
2.  **Buttons & Interactive Elements:**
    *   Stylized with **`font-syne font-bold text-xs uppercase tracking-wider`** for an elegant, premium look.
3.  **Project Descriptions & Details:**
    *   Styled with `text-sm leading-relaxed text-[#94A3B8]` for comfortable reading.

---

## 📂 4. File Structure & Key Paths

*   [`src/components/sections/ProjectsBento.tsx`](file:///D:/Portfolio/portfolio/src/components/sections/ProjectsBento.tsx) — Bento Grid structure, lightboxes, and custom Markdown compiling engine.
*   [`src/components/ui/MermaidDiagram.tsx`](file:///D:/Portfolio/portfolio/src/components/ui/MermaidDiagram.tsx) — High-fidelity rendering engine for Mermaid.js diagrams.
*   [`src/data/projects.ts`](file:///D:/Portfolio/portfolio/src/data/projects.ts) — Projects repository source config containing verified GitHub repository URL references.
*   [`src/lib/github.ts`](file:///D:/Portfolio/portfolio/src/lib/github.ts) — Standard API fetch calls, header token authorization, and parser utilities.
*   [`src/components/sections/About.tsx`](file:///D:/Portfolio/portfolio/src/components/sections/About.tsx) & [`src/components/sections/Education.tsx`](file:///D:/Portfolio/portfolio/src/components/sections/Education.tsx) — Main structural landing page sections.

---

## 💡 5. Troubleshooting & Future Updates Guide

### Adding a New Project
1.  Open [`src/data/projects.ts`](file:///D:/Portfolio/portfolio/src/data/projects.ts).
2.  Add a new configuration item to `projectsConfig`:
    ```typescript
    {
      id: "04",
      category: "CATEGORY NAME",
      repoUrl: "https://github.com/HaseebAhmad24-collab/YOUR-REPO",
      liveUrl: "https://your-live-link.app",
      gifUrl: "looping-preview-gif-link",
      images: ["image-link-1", "image-link-2"],
      techStack: ["Tech1", "Tech2"],
      fallbackTitle: "Fallback Title",
      fallbackDescription: "Fallback Description"
    }
    ```
3.  The API will dynamically read, fetch, cache, and compile its README markdown next time the app loads!

### Rate-Limiting Resolution
If GitHub API calls start returning `403 (Rate Limit Exceeded)` in development:
*   Make sure a valid GitHub Personal Access Token (PAT) is defined in `.env.local` as `NEXT_PUBLIC_GITHUB_TOKEN`. The fetching engine in `src/lib/github.ts` will automatically inject it into the authorization headers to scale the API call limit.
