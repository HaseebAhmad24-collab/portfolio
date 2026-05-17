# 🚀 Modern Portfolio

A high-performance, visually stunning personal portfolio built with the latest web technologies. This project showcases a modern approach to web development, featuring a bento-grid project layout, interactive diagrams, and fluid animations.

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

## ✨ Features

-   **🎯 Interactive UI/UX**: Features a custom cursor and smooth Framer Motion transitions for an immersive experience.
-   **🍱 Bento Grid Projects**: A modern, visually appealing grid layout to showcase development projects and case studies.
-   **📊 Mermaid.js Integration**: Built-in support for rendering technical diagrams and system architectures directly in the browser.
-   **🎡 Skills Marquee**: An infinite scrolling marquee to highlight technical competencies and tools.
-   **📱 Fully Responsive**: Optimized for all devices, from mobile phones to ultra-wide monitors.
-   **📂 Data-Driven Design**: Content is decoupled from logic using dedicated data files (`src/data/`), making updates seamless.
-   **⚡ Performance First**: Leverages Next.js App Router and Tailwind CSS 4 for industry-leading speed and SEO optimization.

## 🛠️ Tech Stack

-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Icons**: [Lucide React](https://lucide.dev/)
-   **Components**: [React Fast Marquee](https://www.react-fast-marquee.com/), [Mermaid.js](https://mermaid.js.org/)

## 🚀 Getting Started

### Prerequisites

-   Node.js 18.x or later
-   npm, yarn, pnpm, or bun

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/HaseebAhmad24-collab/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 📂 Project Structure

```text
src/
├── app/              # Next.js App Router pages and global styles
├── components/       
│   ├── layout/       # Navbar, Footer, and core structure
│   ├── sections/     # Hero, About, Projects (Bento), Education
│   └── ui/           # Reusable components (Cursor, Mermaid)
├── data/             # Centralized content (projects.ts, portfolio.ts)
├── lib/              # Utility functions and API clients
└── public/           # Static assets
```

## ⚙️ Customization

To personalize the portfolio with your own information, update the following files:

-   `src/data/portfolio.ts`: General info, education, and social links.
-   `src/data/projects.ts`: Project details, images, and tech stacks for the Bento grid.

## 📝 Deployment

The easiest way to deploy this project is via the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

```bash
# Build the project
npm run build
```

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new features or improvements, please open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by [Haseeb Ahmad](https://github.com/HaseebAhmad24-collab)