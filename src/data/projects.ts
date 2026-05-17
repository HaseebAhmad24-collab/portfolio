export interface ProjectConfig {
  id: string;
  category: string;
  repoUrl: string;
  liveUrl: string;
  gifUrl: string;
  images: string[];
  techStack: string[];
  fallbackTitle: string;
  fallbackDescription: string;
}

export const projectsConfig: ProjectConfig[] = [
  {
    id: "01",
    category: "AI AGENTIC SYSTEM",
    repoUrl: "https://github.com/HaseebAhmad24-collab/AI-BusinessOperatingSystem",
    liveUrl: "https://3yxe9nysd2.us-east-1.awsapprunner.com/",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V2dG1hOTRpM2s4OHkyOTB2NXoxZ3Iwa3pvODN4Z285MXd2MWZoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a0h7sAqON67nO/giphy.gif",
    images: [
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779024187/Screenshot_2026-05-17_182244_akblgo.png", // Futuristic abstract mesh
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779024292/Screenshot_2026-05-17_182431_qrsb28.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779024401/Screenshot_2026-05-17_182615_qgxviu.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779024467/Screenshot_2026-05-17_182733_i9uhse.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779024530/Screenshot_2026-05-17_182831_m00mpb.png"
    ],
    techStack: ["FastAPI", "React", "Docker", "SQLite", "Scikit-Learn", "RAG", "AI Assistant"],
    fallbackTitle: "AI-BusinessOperatingSystem",
    fallbackDescription: "Developed a full-stack system featuring Future Inventory Prediction models. Integrated an AI Assistant to automate customer support and business workflows."
  },
  {
    id: "02",
    category: "AI LEGAL WORKSPACE",
    repoUrl: "https://github.com/HaseebAhmad24-collab/JusticeBridge",
    liveUrl: "https://justice-bridge.vercel.app/",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V2dG1hOTRpM2s4OHkyOTB2NXoxZ3Iwa3pvODN4Z285MXd2MWZoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a0h7sAqON67nO/giphy.gif", // Fallback looping gif if local is missing
    images: [
      "https://res.cloudinary.com/duagqeal6/image/upload/f_auto,q_auto/Screenshot_2026-05-17_180645_dvkzn6", // Legal gavel premium image
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779023902/Screenshot_2026-05-17_181753_qvi9kt.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779024043/Screenshot_2026-05-17_182024_gsanh2.png"
    ],
    techStack: ["FastAPI", "React", "RAG", "Vector DB", "Gemini Api", "SQLite", "MIT License"],
    fallbackTitle: "JusticeBridge",
    fallbackDescription: "Currently building an agentic RAG system for Pakistani & Religious Law using Python & Gemini API. Implementing semantic search to retrieve accurate context from complex legal datasets."
  },
  {
    id: "03",
    category: "FULL-STACK FINTECH",
    repoUrl: "https://github.com/HaseebAhmad24-collab/TelecomBillingSystem",
    liveUrl: "https://devops-fullstack.vercel.app",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V2dG1hOTRpM2s4OHkyOTB2NXoxZ3Iwa3pvODN4Z285MXd2MWZoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a0h7sAqON67nO/giphy.gif",
    images: [
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779025721/Screenshot_2026-05-17_184821_nt4dyl.png", // Tech code terminal
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779025981/Screenshot_2026-05-17_185242_e6qiww.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779026038/Screenshot_2026-05-17_185340_tm2rqo.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779026137/Screenshot_2026-05-17_185521_slvurx.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779026202/Screenshot_2026-05-17_185623_ncu27x.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779026290/Screenshot_2026-05-17_185732_hlac8u.png"
    ],
    techStack: ["React", "Node.js", "MySQL", "Docker", "MIT", "TailwindCSS"],
    fallbackTitle: "TelecomBillingSystem",
    fallbackDescription: "An Enterprise-Grade Telecom Billing & Customer Management Suite featuring robust backend billing calculations, user management, and automated invoicing."
  },
  {
    id: "04",
    category: "AI DEVELOPER TOOLING",
    repoUrl: "https://github.com/HaseebAhmad24-collab/ReadMeAi",
    liveUrl: "https://read-me-ai-coral.vercel.app/",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V2dG1hOTRpM2s4OHkyOTB2NXoxZ3Iwa3pvODN4Z285MXd2MWZoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a0h7sAqON67nO/giphy.gif",
    images: [
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779024732/Screenshot_2026-05-17_183152_horrpi.png", // Tech code terminal
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779024843/Screenshot_2026-05-17_183327_wdvmnv.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779025036/Screenshot_2026-05-17_183523_vhbrc4.png",
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779025099/Screenshot_2026-05-17_183800_chc1w0.png"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Google Gemini AI", "NextAuth.js", "GitHub OAuth"],
    fallbackTitle: "ReadMeAi",
    fallbackDescription: "An AI-powered SaaS platform that scans your GitHub repositories and generates professional, structured README files — ready to push in one click."
  }
];
