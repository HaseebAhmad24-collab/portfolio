import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

// Inter font for highly legible body text and system labels
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Syne font for large scale, experimental and premium headings
const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: "Haseeb Ahmad | Full-Stack AI Developer",
  description: "I'm Haseeb Ahmad — a Full-Stack AI Developer who transforms ideas into production-ready, AI-powered products that ship.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="antialiased selection:bg-[#00F5D4] selection:text-black min-h-screen flex flex-col">
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
