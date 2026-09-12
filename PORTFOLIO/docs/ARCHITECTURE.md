# Technical Architecture

## Overview

A statically-generated Next.js portfolio with cinematic scroll choreography powered by GSAP/ScrollTrigger, smooth scrolling via Lenis, and a design system implemented through Tailwind CSS v4.

---

## Tech Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| **Next.js** | React framework, routing, SSG, image optimization | 15.x (App Router) |
| **React** | Component library | 19.x |
| **TypeScript** | Type safety | 5.x (strict mode) |
| **Tailwind CSS** | Utility-first styling, design system | v4 |
| **GSAP** | Scroll-driven animations, timelines, pinning | 3.12+ |
| **ScrollTrigger** | Scroll-linked animation triggers | 3.12+ (GSAP plugin) |
| **Framer Motion** | Page transitions, micro-interactions, layout animations | 11.x |
| **Lenis** | Smooth, momentum-based scrolling | 1.x |

### Why Each Technology

- **Next.js 15 (App Router)**: Best-in-class React framework for static sites. Server components for SEO, client components for interactivity. Built-in image optimization, metadata API, and Vercel deployment. App Router enables layouts, loading states, and streaming.

- **TypeScript (Strict)**: Type-safe content data, component props, animation configurations. Catches errors at build time, improves DX with autocomplete.

- **Tailwind CSS v4**: Design tokens (colors, spacing, typography) defined as CSS custom properties via `@theme`. Utility classes for rapid responsive development. No runtime CSS overhead. v4's new CSS-first configuration eliminates the need for a JS config file.

- **GSAP + ScrollTrigger**: The only animation library with the precision needed for cinematic scroll choreography — pinning, scrubbing, batch animations, snap points, and horizontal scroll. ScrollTrigger is the industry standard for scroll-linked animation.

- **Framer Motion**: Complements GSAP for page-level transitions (AnimatePresence), layout animations (layoutId), and simple hover/tap states. Not used for scroll-linked animations.

- **Lenis**: Lightweight smooth-scroll library with native GSAP integration. Provides momentum-based scrolling that makes the entire experience feel fluid without hijacking keyboard navigation.

---

## Project Structure

```
PORTFOLIO/
├── docs/                          # Project documentation (12 files)
│   ├── PRD.md
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── ANIMATION.md
│   ├── CONTENT.md
│   ├── COMPONENTS.md
│   ├── ROUTES.md
│   ├── SEO.md
│   ├── RESPONSIVE.md
│   ├── TESTING.md
│   ├── DECISIONS.md
│   └── WORKFLOW.md
│
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout (fonts, metadata, Lenis provider)
│   │   ├── page.tsx               # Homepage (single-page scroll)
│   │   ├── work/
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Project detail pages
│   │   ├── not-found.tsx          # 404 page
│   │   └── globals.css            # Global styles + Tailwind imports
│   │
│   ├── components/                # React components
│   │   ├── layout/                # Structural components
│   │   │   ├── Header.tsx         # Fixed navigation bar
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   ├── MobileMenu.tsx     # Mobile navigation overlay
│   │   │   └── Section.tsx        # Reusable section wrapper
│   │   │
│   │   ├── sections/              # Homepage sections
│   │   │   ├── Hero.tsx           # Hero with animated headline
│   │   │   ├── About.tsx          # About/philosophy section
│   │   │   ├── Work.tsx           # Projects showcase
│   │   │   └── Contact.tsx        # Contact CTA section
│   │   │
│   │   ├── project/               # Project detail components
│   │   │   ├── ProjectHero.tsx    # Project header with metadata
│   │   │   ├── ProjectContent.tsx # Case study body
│   │   │   ├── ProjectGallery.tsx # Image gallery with scroll animations
│   │   │   └── ProjectNav.tsx     # Next/previous project navigation
│   │   │
│   │   ├── ui/                    # Reusable UI primitives
│   │   │   ├── Button.tsx         # Button variants
│   │   │   ├── TextReveal.tsx     # Animated text reveal component
│   │   │   ├── MaskReveal.tsx     # Image mask reveal component
│   │   │   ├── MagneticElement.tsx # Cursor-interactive element
│   │   │   ├── ScrollProgress.tsx # Scroll progress indicator
│   │   │   └── SplitText.tsx      # Text splitting utility for animation
│   │   │
│   │   └── animation/             # Animation wrapper components
│   │       ├── ScrollReveal.tsx   # Scroll-triggered reveal wrapper
│   │       ├── ParallaxLayer.tsx  # Parallax movement wrapper
│   │       ├── PinnedSection.tsx  # ScrollTrigger pin wrapper
│   │       └── HorizontalScroll.tsx # Horizontal scroll container
│   │
│   ├── data/                      # Content data (TypeScript)
│   │   ├── projects.ts           # Project case study data
│   │   ├── personal.ts           # Personal information
│   │   ├── navigation.ts         # Navigation links
│   │   └── metadata.ts           # SEO metadata per page
│   │
│   ├── hooks/                     # Custom React hooks
│   │   ├── useGSAP.ts            # GSAP context and cleanup hook
│   │   ├── useLenis.ts           # Lenis instance access
│   │   ├── useMediaQuery.ts      # Responsive breakpoint detection
│   │   ├── useReducedMotion.ts   # Prefers-reduced-motion detection
│   │   └── useScrollProgress.ts  # Current scroll progress
│   │
│   ├── lib/                       # Utility functions
│   │   ├── animations.ts         # Reusable animation configurations
│   │   ├── gsap-config.ts        # GSAP plugin registration
│   │   ├── utils.ts              # General utilities
│   │   └── constants.ts          # Global constants
│   │
│   └── types/                     # TypeScript type definitions
│       ├── project.ts             # Project data types
│       └── animation.ts           # Animation configuration types
│
├── public/                        # Static assets
│   ├── images/                    # Project images, hero visuals
│   ├── fonts/                     # Self-hosted fonts (if needed)
│   ├── favicon.ico
│   ├── og-image.jpg               # Default Open Graph image
│   ├── robots.txt
│   └── sitemap.xml
│
├── tailwind.config.ts             # Tailwind v4 configuration (if needed)
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json
└── README.md
```

---

## Component Architecture

### Hierarchy

```
RootLayout (server component)
├── LenisProvider (client - smooth scroll)
├── Header (client - scroll-aware navigation)
│   ├── Logo
│   ├── NavLinks
│   └── MobileMenu
├── Page Content (server/client hybrid)
│   ├── Homepage
│   │   ├── Hero (client - GSAP animations)
│   │   ├── About (client - scroll reveal)
│   │   ├── Work (client - scroll-driven project display)
│   │   └── Contact (client - scroll reveal)
│   └── Project Detail
│       ├── ProjectHero (client - entry animation)
│       ├── ProjectContent (server - static content)
│       ├── ProjectGallery (client - scroll-driven gallery)
│       └── ProjectNav (server - next/prev links)
└── Footer (server component)
```

### Server vs. Client Components

| Component | Type | Reason |
|-----------|------|--------|
| RootLayout | Server | Static layout, metadata |
| Header | Client | Scroll-aware, interactive |
| Hero | Client | GSAP animations |
| About | Client | Scroll-triggered animations |
| Work | Client | Scroll-driven project display |
| Contact | Client | Scroll-triggered reveal |
| ProjectContent | Server | Static content, SEO |
| ProjectGallery | Client | Scroll-driven gallery |
| Footer | Server | Static content |

---

## Page Architecture

### Homepage (`/`)

A single-page scroll experience composed of 4 major sections, each flowing into the next through intentional scroll transitions:

```
[Hero]           — Viewport-height, animated headline, scroll prompt
    ↓ scroll transition
[About]          — Personal introduction, philosophy, skills
    ↓ scroll transition
[Work]           — 3 featured projects with scroll-driven presentation
    ↓ scroll transition
[Contact]        — Call-to-action with email and social links
    ↓
[Footer]         — Minimal footer
```

### Project Detail (`/work/[slug]`)

```
[ProjectHero]    — Large title, metadata (year, role, tech stack)
    ↓
[ProjectContent] — Case study: problem, approach, solution, outcome
    ↓
[ProjectGallery] — Visual assets with scroll-driven reveal
    ↓
[ProjectNav]     — Navigate to next/previous project
    ↓
[Footer]
```

---

## Data Architecture

### Content Data Files

```typescript
// src/data/projects.ts
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

// src/data/personal.ts
export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  about: string[];  // paragraphs
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
```

---

## Animation Architecture

### GSAP Initialization Flow

```
1. App loads → Register GSAP plugins (ScrollTrigger)
2. Lenis initializes → Syncs with GSAP ticker
3. Page mounts → Components create GSAP contexts
4. Scroll begins → ScrollTrigger instances fire
5. Unmount → GSAP contexts revert, ScrollTrigger instances killed
```

### Animation Lifecycle (per component)

```typescript
// Pattern for every animated component
'use client';

import { useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function AnimatedSection() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(() => {
    if (prefersReducedMotion) return; // Skip animations

    // Create GSAP timeline with ScrollTrigger
    // All instances are automatically cleaned up via context
  }, { scope: containerRef });

  return <section ref={containerRef}>...</section>;
}
```

### ScrollTrigger Memory Management

- Every ScrollTrigger instance is created within a `gsap.context()`
- On component unmount, `context.revert()` kills all instances
- Prevents memory leaks during navigation
- The `useGSAP` hook encapsulates this pattern

---

## Routing

| Route | Page | Type |
|-------|------|------|
| `/` | Homepage | Static (SSG) |
| `/work/[slug]` | Project Detail | Static (SSG via generateStaticParams) |
| `404` | Not Found | Static |

All routes are statically generated at build time. No server-side rendering needed.

---

## SEO Architecture

### Metadata Strategy

```typescript
// Root layout - base metadata
export const metadata: Metadata = {
  metadataBase: new URL('https://[PLACEHOLDER].dev'),
  title: {
    default: '[PLACEHOLDER: Name] — Creative Developer',
    template: '%s | [PLACEHOLDER: Name]'
  },
  description: '...',
  openGraph: { ... },
  twitter: { ... },
  robots: { ... }
};

// Per-page metadata via generateMetadata()
export async function generateMetadata({ params }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  return {
    title: project.title,
    description: project.description,
    openGraph: { ... }
  };
}
```

### Structured Data

- `Person` schema on homepage
- `WebSite` schema on homepage
- `CreativeWork` schema on each project page

---

## Image Optimization

- Use `next/image` for all images
- Serve WebP/AVIF via Next.js automatic format detection
- Define responsive `sizes` attributes based on breakpoints
- Lazy loading for below-fold images
- Priority loading for hero and above-fold images
- Placeholder images use `placeholder="blur"` with blurDataURL

---

## Performance Strategy

1. **Static Generation**: All pages pre-rendered at build time
2. **Code Splitting**: Next.js automatic code splitting per route
3. **Dynamic Imports**: GSAP and Lenis loaded only on the client
4. **Font Loading**: `next/font` with `display: swap` for zero FOIT
5. **Image Optimization**: next/image with responsive sizes
6. **CSS**: Tailwind purges unused styles; no runtime CSS
7. **Animation Performance**: GSAP uses `transform` and `opacity` (compositor-only properties), `will-change` applied strategically
8. **Lazy Loading**: Below-fold content and images lazy-loaded
9. **Bundle Analysis**: Regular checks with `@next/bundle-analyzer`

---

## Accessibility Strategy

1. **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
2. **ARIA Labels**: All interactive elements labeled
3. **Focus Management**: Visible focus indicators, logical tab order
4. **Reduced Motion**: `prefers-reduced-motion` disables scroll animations, replaces with opacity transitions
5. **Color Contrast**: WCAG AA minimum (4.5:1 text, 3:1 large text)
6. **Keyboard Navigation**: All links, buttons, and interactive elements reachable via Tab
7. **Skip Navigation**: "Skip to content" link for keyboard users
8. **Alt Text**: All images have descriptive alt text
9. **Content Without JS**: Essential content rendered server-side, visible without JavaScript

---

## Deployment Architecture

### Primary: Vercel

```
GitHub Push → Vercel Build → Static Generation → Edge CDN → Live
```

- Automatic preview deployments on PR
- Production deployment on main branch push
- Built-in analytics and Web Vitals

### Fallback: Static Export

```bash
next build   # with output: 'export' in next.config.ts
```

Generates a static `out/` directory deployable to any static host (Netlify, GitHub Pages, S3, Cloudflare Pages).

---

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL | Yes (for OG images, sitemap) |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No (future) |

---

## Scalability Considerations

The architecture supports future additions without restructuring:

- **New projects**: Add entry to `src/data/projects.ts`, page auto-generated
- **Blog**: Add `src/app/blog/` with MDX support
- **New sections**: Add component to `src/components/sections/`, insert in homepage
- **CMS migration**: Replace `src/data/*.ts` imports with CMS fetch functions — component interfaces unchanged
- **i18n**: Next.js built-in internationalization with App Router
- **Analytics**: Add provider in root layout

---

## Technical Tradeoffs

| Decision | Tradeoff | Mitigation |
|----------|----------|------------|
| GSAP + Framer Motion (two libraries) | Larger bundle | Each serves distinct purpose; GSAP for scroll, Framer for transitions |
| Single-page homepage | Longer page, more JS | Lazy-loaded sections, code splitting |
| Dark by default | Some users prefer light | Strategic light sections for visual rhythm |
| Local data files (no CMS) | Requires rebuild for content changes | Easy to migrate to CMS later; portfolio changes are infrequent |
| Tailwind CSS | Can produce verbose class lists | Extract utility classes into component compositions; use `@apply` sparingly |
| Static generation only | No dynamic content | Perfect for a portfolio; content doesn't change frequently |
