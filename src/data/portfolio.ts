export const portfolioData = {
  personalInfo: {
    name: "Haseeb Ahmad",
    title: "Aspiring AI Engineer",
    signature: "Digital Alchemist",
    bio: "AI Developer (Intern) | I am a dedicated student and an aspiring AI Engineer, currently in my learning phase and passionate about exploring how AI can solve real-world problems. My journey so far has been about building and learning — from experimenting with Inventory Prediction and AI Assistants in my AI-BOS project to exploring RAG systems with JusticeBridge. While I have experience building full-stack systems like a Telecom Billing platform, I am eager to learn professional workflows and best practices in an AI-focused internship.",
    contact: {
      email: "haseebahmad7473@gmail.com",
      phone: "+92 328-4461291",
      linkedin: "https://linkedin.com/in/haseeb-ahmad",
      github: "https://github.com", // Add your github link here
      twitter: "https://twitter.com", // Add your twitter link here
      location: "Post Office Area, Raiwind, Lahore"
    }
  },
  skills: [
    "Software Development",
    "Problem Solving",
    "Database Management",
    "Rapid Prototyping",
    "Prompt Engineering",
    "Python Programming",
    "Circuit Simulation",
    "Cloud & Virtualization",
    "Graphic Designing"
  ],
  projects: [
    {
      id: "01",
      title: "JusticeBridge",
      role: "AI & RAG System",
      description: "Currently building an agentic RAG system for Pakistani & Religious Law using Python & Gemini API. Implementing semantic search to retrieve accurate context from complex legal datasets.",
      techStack: ["Python", "Gemini API", "FastAPI", "Vector Databases"],
      image: "/projects/justicebridge.jpg" // Placeholder path
    },
    {
      id: "02",
      title: "AI-BOS",
      role: "Business Operating System",
      description: "Developed a full-stack system featuring Future Inventory Prediction models. Integrated an AI Assistant to automate customer support and business workflows.",
      techStack: ["Full-Stack", "Inventory Prediction Models", "AI Assistant"],
      image: "/projects/aibos.jpg" // Placeholder path
    },
    {
      id: "03",
      title: "DevOps & Full-Stack",
      role: "Telecom Billing System & Infrastructure",
      description: "Built an end-to-end Jenkins CI/CD Pipeline on AWS EC2 with Docker and SonarQube. Architected a Full-Stack Telecom Billing System to handle complex backend logic and data.",
      techStack: ["Jenkins", "AWS EC2", "Docker", "SonarQube", "Full-Stack"],
      image: "/projects/devops.jpg" // Placeholder path
    }
  ],
  education: [
    {
      id: 1,
      degree: "BS – Information Engineering Technology",
      institution: "Dept. of Technology | University of Lahore",
      duration: "2023 – 2027",
      status: "Continue"
    },
    {
      id: 2,
      degree: "F.Sc (Pre-Medical)",
      institution: "Sharif Education Complex | BISE-Lahore",
      duration: "",
      status: "Completed"
    }
  ]
};
