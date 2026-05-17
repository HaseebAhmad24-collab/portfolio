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
    category: "AI INFRASTRUCTURE",
    repoUrl: "https://github.com/HaseebAhmad24-collab/AI-BusinessOperatingSystem",
    liveUrl: "https://3yxe9nysd2.us-east-1.awsapprunner.com/",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3Z2dG1hOTRpM2s4OHkyOTB2NXoxZ3Iwa3pvODN4Z285MXd2MWZoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a0h7sAqON67nO/giphy.gif",
    images: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80", // Futuristic abstract mesh
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80"
    ],
    techStack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion"],
    fallbackTitle: "AI-BOS",
    fallbackDescription: "A high-performance operating system interface for artificial intelligence services, featuring glassmorphism micro-apps."
  },
  {
    id: "02",
    category: "AI & RAG SYSTEM",
    repoUrl: "https://github.com/HaseebAhmad24-collab/JusticeBridge",
    liveUrl: "https://justicebridge.vercel.app",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V2dG1hOTRpM2s4OHkyOTB2NXoxZ3Iwa3pvODN4Z285MXd2MWZoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a0h7sAqON67nO/giphy.gif", // Fallback looping gif if local is missing
    images: [
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80", // Legal gavel premium image
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    ],
    techStack: ["Python", "Gemini API", "FastAPI", "Vector DB", "TypeScript"],
    fallbackTitle: "JusticeBridge",
    fallbackDescription: "AI-powered legal workspace combining RAG-based chat, smart document library, and text-to-speech legal assistance."
  },
  {
    id: "03",
    category: "DEVOPS & INTEGRATION",
    repoUrl: "https://github.com/HaseebAhmad24-collab/devops-fullstack",
    liveUrl: "https://devops-fullstack.vercel.app",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V2dG1hOTRpM2s4OHkyOTB2NXoxZ3Iwa3pvODN4Z285MXd2MWZoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a0h7sAqON67nO/giphy.gif",
    images: [
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80", // Tech code terminal
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    ],
    techStack: ["Docker", "Kubernetes", "Jenkins", "AWS EC2", "TypeScript"],
    fallbackTitle: "DevOps & Full-Stack",
    fallbackDescription: "Enterprise-grade CI/CD automation pipeline configured with Docker, Jenkins, SonarQube, and AWS cloud deployment."
  },
  {
    id: "04",
    category: "DEVOPS & INTEGRATION",
    repoUrl: "https://github.com/HaseebAhmad24-collab/ReadMeAi",
    liveUrl: "https://read-me-ai-coral.vercel.app/",
    gifUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3V2dG1hOTRpM2s4OHkyOTB2NXoxZ3Iwa3pvODN4Z285MXd2MWZoaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/a0h7sAqON67nO/giphy.gif",
    images: [
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80", // Tech code terminal
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
    ],
    techStack: ["Docker", "Kubernetes", "Jenkins", "AWS EC2", "TypeScript"],
    fallbackTitle: "DevOps & Full-Stack",
    fallbackDescription: "Enterprise-grade CI/CD automation pipeline configured with Docker, Jenkins, SonarQube, and AWS cloud deployment."
  }
];
