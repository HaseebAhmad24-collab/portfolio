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
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // Futuristic abstract mesh
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80"
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
      "https://res.cloudinary.com/duagqeal6/image/upload/q_auto/f_auto/v1779023902/Screenshot_2026-05-17_181753_qvi9kt.png"
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
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80", // Tech code terminal
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
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
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80", // Tech code terminal
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Google Gemini AI", "NextAuth.js", "GitHub OAuth"],
    fallbackTitle: "ReadMeAi",
    fallbackDescription: "An AI-powered SaaS platform that scans your GitHub repositories and generates professional, structured README files — ready to push in one click."
  }
];
