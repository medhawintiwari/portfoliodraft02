import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { personalInfo } from "@/data/personal";
import { CustomCursor } from "@/components/ui/CustomCursor";

// Fonts definition based on DESIGN.md
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// SEO Metadata strategy from SEO.md
export const metadata: Metadata = {
  metadataBase: new URL('https://portfolio.dev'), // Update with actual domain
  title: {
    default: `${personalInfo.name} — ${personalInfo.title}`,
    template: `%s | ${personalInfo.name}`,
  },
  description: personalInfo.tagline,
  keywords: ["creative developer", "frontend developer", "React developer", "portfolio"],
  authors: [{ name: personalInfo.name }],
  creator: personalInfo.name,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} font-body bg-bg-primary text-text-primary antialiased min-h-screen flex flex-col selection:bg-accent selection:text-bg-primary`}
      >
        <CustomCursor />
        <SmoothScroll>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
