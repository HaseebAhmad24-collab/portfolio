# 🌌 Haseeb Ahmad — Full-Stack AI Developer & DevOps Portfolio

A high-performance, visually stunning, and highly interactive developer portfolio architected to showcase next-generation full-stack systems, DevOps automation, and agentic AI integrations. Built using the latest web technologies, featuring a dynamic **Bento Grid**, custom follow-along cyberpunk cursors, client-side architectural diagram compilation, and dark-glassmorphic status messaging.

---

<div align="center">

[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white&labelColor=111111)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white&labelColor=23272F)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white&labelColor=23272F)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-Latest-0055FF?style=flat-square&logo=framer&logoColor=white&labelColor=23272F)](https://www.framer.com/motion/)
[![Formspree AJAX](https://img.shields.io/badge/Formspree_AJAX-E10098?style=flat-square&logo=formspree&logoColor=white&labelColor=23272F)](https://formspree.io/)

[![GitHub REST API](https://img.shields.io/badge/GitHub_API_v3-181717?style=flat-square&logo=github&logoColor=white&labelColor=23272F)](https://docs.github.com/en/rest)
[![Mermaid.js](https://img.shields.io/badge/Mermaid.js-Dynamic-FF6F61?style=flat-square&logo=diagramsdotnet&logoColor=white&labelColor=23272F)](https://mermaid.js.org/)
[![Cloudinary CDN](https://img.shields.io/badge/Cloudinary_CDN-34495E?style=flat-square&logo=cloudinary&logoColor=white&labelColor=23272F)](https://cloudinary.com/)
[![Vercel Ready](https://img.shields.io/badge/Vercel-Staging-000000?style=flat-square&logo=vercel&logoColor=white&labelColor=111111)](https://vercel.com/)

</div>

---

## ⚡ Core Concept & High-Tech Features

This portfolio acts as an interactive command center for all my production-ready software, built with meticulous attention to detail and performance:

*   **🍱 Dynamic Bento Grid Repository Integration:**
    *   Queries live repository metadata and raw Markdown `README.md` files in real-time from the **GitHub REST API**.
    *   Implements server-side pre-rendering cache parameters (`revalidate: 3600`) to guarantee high-performance loads while remaining completely immune to GitHub API rate-limits.
*   **🖼️ High-Fidelity Widescreen Screenshot Showcase:**
    *   Completely replaces bulky, cropping-prone looping GIFs with clean, responsive **Screenshot Showcase Galleries** framed in realistic laptop displays.
    *   Configured with rich **Cloudinary CDN** optimization for blazing-fast loading speeds.
    *   Smart layout logic automatically hides slider arrows and progress indicator dots when a project contains only 1 screenshot.
*   **🕹️ Dynamic Cyberpunk Follow-Along Cursor:**
    *   A custom client cursor dot and lagging outer circle that scales up and pulses on hover.
    *   Animate-on-hover custom floating neon badges (**`LAUNCH SYSTEM GALLERY ✦`**) that track mouse movements using spring physics.
    *   Smart element-detection automatically suppresses tooltips when hovering over interactive action buttons (like *README* or *GitHub*), keeping the interface accessible and clean.
*   **📬 Silent AJAX Formspree Contact Form:**
    *   Integrates a fully custom silent submission handler pointing to a dedicated Formspree API endpoint (`https://formspree.io/f/mlgzqzvn`).
    *   Blocks default redirect pages on submission and processes data payloads as strict stringified JSON (`JSON.stringify(data)`) with an explicit `Content-Type: application/json` header, cleanly bypassing CORS challenges.
    *   Displays elegant, real-time neon success/error notifications inline without interrupting the immersive user experience.
*   **🔔 AWS Production Staging Toast Notifications:**
    *   Intercepts action clicks on complex live system links (e.g. *Telecom Billing System*) and deploys a glassmorphic bottom-right status notification overlay.
    *   Features a pulsating live neon indicator (`animate-ping`) mimicking a real-time AWS Cloud deployment activation sequence.
*   **📊 Client-Side Architectural Compiling Engine:**
    *   Renders full-featured, vector-responsive workflow diagrams dynamically in-browser from Markdown markdown strings using **Mermaid.js**.
    *   Implements isolated dynamic lazy loading components to completely bypass SSR hydration mismatches.
*   **🌀 Custom Vector Cyber Favicon:**
    *   A premium, custom-designed `favicon.svg` asset featuring high-tech bezel lines, an engineering subgrid layout, a dynamic teal-to-purple gradient monogram **"H"**, and a glowing neural quantum core.
*   **🔧 Resilient Hydration Suppression:**
    *   Configured with standard `suppressHydrationWarning` flags, resolving client console layout warnings caused by third-party browser add-ons (like ColorZilla or adblockers) injecting custom DOM attributes.

---

## 🛠️ Technical Specifications & Stack

*   **Core Core:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Typing System:** [TypeScript 5](https://www.typescriptlang.org/) (Strict Mode)
*   **Layout & Styling:** [Tailwind CSS 4](https://tailwindcss.com/) + Custom CSS variables (Teal Neon `#00F5D4` & Deep Cyber `#07090C`)
*   **Form Endpoint:** [Formspree API](https://formspree.io/) (CORS-free AJAX Pipeline)
*   **Motion Engineering:** [Framer Motion](https://www.framer.com/motion/) (Spring physics, scale transformations)
*   **Dynamic Data Layer:** [React Fast Marquee](https://www.react-fast-marquee.com/), [Mermaid.js](https://mermaid.js.org/)
*   **Icons & Assets:** [Lucide React](https://lucide.dev/)

---

## 📂 System File Architecture

```text
src/
├── app/              # Next.js App Router core page, metadata config & styles
│   ├── globals.css   # Main design system custom animations & scrollbars
│   ├── layout.tsx    # suppressHydrationWarning, custom favicon & viewport meta
│   └── page.tsx      # Main structural compilation of bento sections
├── components/       
│   ├── layout/       # Glassmorphic Navbar & Footer (with silent AJAX Formspree)
│   ├── sections/     # Hero, About (Custom biography), Projects (Bento), Education
│   └── ui/           # CustomCursor (follow-along physics), MermaidDiagram (lazy compiler)
├── data/             # Decoupled JSON configs (projects.ts, portfolio.ts)
├── lib/              # github.ts REST API wrapper with revalidate headers
└── public/           # Static high-fidelity SVGs & custom brand assets
```

---

## 🚀 Dev Setup & Deployment

### Prerequisites

*   **Node.js 18.x** or higher installed.
*   A package manager (e.g. `npm`, `pnpm`, or `bun`).

### Local Server Launch

1.  **Clone the workspace:**
    ```bash
    git clone https://github.com/HaseebAhmad24-collab/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup local environment secrets:**
    Create a `.env.local` file at the root folder and define a Personal Access Token to scale GitHub's API rate limits:
    ```env
    NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
    ```

4.  **Spin up the Turbopack compiler:**
    ```bash
    npm run dev
    ```
    Navigate to `http://localhost:3000` to review the local high-fidelity experience!

### Production Build

Compile and bundle the static pages for zero-latency hosting:
```bash
npm run build
```

The compiled workspace is fully optimized for **Vercel**, **Netlify**, or **AWS Amplify** production pipelines out of the box!

---

## 🤝 Collaboration & Support

Created with absolute precision, high-tech passion, and modern engineering standards by [Haseeb Ahmad](https://github.com/HaseebAhmad24-collab). Feel free to fork, collaborate, and ship! 🌌⚡