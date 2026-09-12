export interface Project {
  slug: string;
  title: string;
  category: string;
  year: number;
  description: string;
  thumbnail: string;
  role: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    problem: string;
    approach: string;
    solution: string;
    outcome: string;
  };
  gallery: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  heroHeadline: string[];
  heroSubtitle: string;
  about: string[];
  philosophy: string;
  email: string;
  location: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
  skills: {
    category: string;
    items: string[];
  }[];
}

export interface NavLink {
  label: string;
  href: string;
}
