import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Xpensify",
    category: "Web Application",
    year: 2026,
    description:
      "A collaborative expense-splitting application that simplifies shared finances between friends and groups with real-time tracking.",
    thumbnail: "/images/project-1.jpg",
    role: "Lead Developer",
    technologies: ["React", "TypeScript", "Python", "FastAPI", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    caseStudy: {
      problem:
        "Splitting expenses among friends and groups is tedious and error-prone. Existing solutions feel cluttered and don't provide a seamless real-time experience.",
      approach:
        "Designed a clean, intuitive interface prioritizing speed and clarity. Built a robust backend with FastAPI for real-time settlement calculations and a React frontend with fluid interactions.",
      solution:
        "A full-stack expense tracker with group management, smart settlement algorithms, and a responsive interface that makes shared finances feel effortless.",
      outcome:
        "A production-ready application demonstrating full-stack architecture, clean API design, and attention to user experience in every interaction.",
    },
    gallery: [
      { src: "/images/project-1-1.jpg", alt: "Xpensify dashboard overview" },
      { src: "/images/project-1-2.jpg", alt: "Expense splitting interface" },
      { src: "/images/project-1-3.jpg", alt: "Group management view" },
    ],
  },
  {
    slug: "project-two",
    title: "Project Two",
    category: "Interactive Experience",
    year: 2025,
    description:
      "A placeholder project showcasing interactive design and creative development. Replace with your actual project details.",
    thumbnail: "/images/project-2.jpg",
    role: "Creative Developer",
    technologies: ["React", "GSAP", "Three.js", "CSS"],
    caseStudy: {
      problem:
        "Replace this with the actual problem your project solved.",
      approach:
        "Replace this with your actual approach and methodology.",
      solution:
        "Replace this with what you actually built.",
      outcome:
        "Replace this with the actual results and impact.",
    },
    gallery: [
      { src: "/images/project-2-1.jpg", alt: "Project two screenshot 1" },
      { src: "/images/project-2-2.jpg", alt: "Project two screenshot 2" },
    ],
  },
  {
    slug: "project-three",
    title: "Project Three",
    category: "Dashboard",
    year: 2025,
    description:
      "A placeholder project showcasing dashboard design and data visualization. Replace with your actual project details.",
    thumbnail: "/images/project-3.jpg",
    role: "Frontend Developer",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
    caseStudy: {
      problem:
        "Replace this with the actual problem your project solved.",
      approach:
        "Replace this with your actual approach and methodology.",
      solution:
        "Replace this with what you actually built.",
      outcome:
        "Replace this with the actual results and impact.",
    },
    gallery: [
      { src: "/images/project-3-1.jpg", alt: "Project three screenshot 1" },
      { src: "/images/project-3-2.jpg", alt: "Project three screenshot 2" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = index > 0 ? projects[index - 1] : projects[projects.length - 1];
  const next = index < projects.length - 1 ? projects[index + 1] : projects[0];
  return { prev, next };
}
