# Architecture Decision Records

## ADR-001: Framework Selection — Next.js with App Router

**Date**: 2026-09-09
**Status**: Accepted
**Context**: Need a React-based framework that provides excellent SEO, performance, file-based routing, image optimization, and deployment simplicity for a portfolio site.

**Options Considered**:
1. **Next.js (App Router)** — Full-featured React framework with SSG, SSR, ISR, built-in image optimization, metadata API, and Vercel deployment
2. **Vite + React** — Lightweight, fast builds, but requires manual SSR/SEO setup, no built-in image optimization
3. **Astro** — Great for static content, but limited React integration for complex scroll animations
4. **Remix** — Good SSR, but less mature ecosystem for static portfolio deployment

**Decision**: Next.js with App Router

**Rationale**:
- **SEO**: Built-in metadata API, generateStaticParams, and server components mean excellent SEO with zero configuration
- **Performance**: Static generation for portfolio pages, automatic code splitting, built-in image optimization with next/image
- **Animation compatibility**: Full client-side React support for GSAP/ScrollTrigger and Framer Motion via 'use client' directives
- **Deployment**: One-click Vercel deployment, or static export for any host
- **Routing**: File-based routing with dynamic routes for project detail pages (`/work/[slug]`)
- **Image optimization**: Built-in next/image handles responsive images, lazy loading, and format conversion
- **Developer experience**: TypeScript first, hot reload, excellent tooling

**Consequences**:
- Slightly larger bundle than Vite-only approach
- Need to carefully manage client/server component boundaries for animation code
- Vercel-optimized but can be deployed anywhere with `output: 'export'`

---

## ADR-002: Animation Library — GSAP + ScrollTrigger (Primary) + Framer Motion (Secondary)

**Date**: 2026-09-09
**Status**: Accepted
**Context**: The portfolio's primary differentiator is cinematic scroll choreography. Need a library that provides precise scroll-linked animations, pinning, scrubbing, and timeline control.

**Options Considered**:
1. **GSAP + ScrollTrigger** — Industry-standard for scroll-driven animations, precise control, excellent performance
2. **Framer Motion only** — Good for page transitions and micro-interactions, but limited scroll-linked animation control
3. **CSS Scroll-Driven Animations** — Native, performant, but limited browser support and less precise control
4. **Motion One** — Lightweight but less mature for complex scroll choreography
5. **Locomotive Scroll** — Good scroll library but GSAP ScrollTrigger is more powerful and flexible

**Decision**: GSAP + ScrollTrigger as primary animation engine; Framer Motion for page transitions and micro-interactions

**Rationale**:
- **ScrollTrigger**: Best-in-class scroll-linked animation — pinning, scrubbing, batch triggers, snap points, horizontal scroll, and precise progress-based control
- **GSAP timelines**: Can choreograph complex multi-element sequences with stagger, easing, and precise timing
- **Performance**: GSAP is optimized for 60fps, uses requestAnimationFrame, and handles will-change/transform efficiently
- **Framer Motion complement**: AnimatePresence for route transitions, layoutId for shared element animations, simple hover/tap states
- **Ecosystem**: Huge community, excellent documentation, battle-tested on premium portfolio sites

**Consequences**:
- GSAP requires `'use client'` directives in Next.js
- Need to properly clean up ScrollTrigger instances on unmount
- GSAP is free for non-commercial use; commercial use requires a license (portfolio is fine)
- Two animation libraries increase bundle size slightly, but each serves a distinct purpose

---

## ADR-003: Smooth Scrolling — Lenis

**Date**: 2026-09-09
**Status**: Accepted
**Context**: Need smooth, momentum-based scrolling to make the scroll experience feel premium and fluid, while maintaining compatibility with GSAP ScrollTrigger.

**Options Considered**:
1. **Lenis** — Modern, lightweight, excellent GSAP/ScrollTrigger integration
2. **Locomotive Scroll v5** — Feature-rich but heavier, can conflict with ScrollTrigger
3. **Native smooth scroll (CSS)** — Too basic, no momentum, no customization
4. **Custom implementation** — Unnecessary complexity

**Decision**: Lenis

**Rationale**:
- Official GSAP integration via `ScrollTrigger.scrollerProxy()`
- Lightweight (~3KB gzipped)
- Natural momentum-based scrolling without hijacking keyboard navigation
- Respects `prefers-reduced-motion` out of the box
- Touch-device compatible
- Active development and maintenance

**Consequences**:
- Need to initialize Lenis early and sync with GSAP's ticker
- Must disable on reduced-motion preference

---

## ADR-004: Styling — Tailwind CSS v4

**Date**: 2026-09-09
**Status**: Accepted
**Context**: Need a styling approach that enables rapid development while maintaining a custom design system with precise spacing, typography, and color tokens.

**Options Considered**:
1. **Tailwind CSS v4** — Utility-first, excellent for custom design systems, great DX
2. **Vanilla CSS / CSS Modules** — Maximum control but slower development
3. **Styled Components / Emotion** — CSS-in-JS, runtime overhead concerns
4. **Sass/SCSS** — Good but adds build complexity without major benefits over Tailwind

**Decision**: Tailwind CSS v4 (user explicitly approved Tailwind in requirements)

**Rationale**:
- Design token system maps perfectly to Tailwind's config (colors, spacing, typography)
- Utility-first approach enables rapid responsive design
- Zero runtime CSS — compiled at build time
- Excellent Next.js integration
- Custom `@theme` configuration for our exact design system
- Responsive variants and dark mode support built-in

**Consequences**:
- Must define comprehensive `tailwind.config.ts` with our design tokens
- Avoid arbitrary values — use design system tokens
- Animation-related styles (transforms, opacity) handled by GSAP, not Tailwind

---

## ADR-005: Content Architecture — Local TypeScript Data Files

**Date**: 2026-09-09
**Status**: Accepted
**Context**: Need a content management approach that keeps content separate from components, is easy to update, and doesn't require a CMS for a 3-project portfolio.

**Options Considered**:
1. **Local TypeScript data files** — Type-safe, zero infrastructure, easy to maintain
2. **MDX files** — Good for blog-like content but overkill for structured project data
3. **Headless CMS (Sanity, Contentful)** — Powerful but unnecessary complexity for a small portfolio
4. **JSON files** — Simple but no type safety

**Decision**: Local TypeScript data files with typed interfaces

**Rationale**:
- Type-safe content: TypeScript interfaces ensure content structure is validated at build time
- Zero infrastructure: No CMS, no API, no database
- Easy to update: Just edit `.ts` files with full IDE support
- Collocated: Content lives in `/src/data/` alongside the codebase
- Scalable: Can migrate to a CMS later without changing component interfaces

**Consequences**:
- Content changes require a rebuild and redeploy
- No admin UI for content editing (fine for a personal portfolio)
- Content must be structured consistently

---

## ADR-006: Layout Strategy — Single-Page Scrolling Homepage + Project Detail Pages

**Date**: 2026-09-09
**Status**: Accepted
**Context**: Need to decide between a multi-page portfolio (separate pages for each section) or a single-page scroll experience with project detail pages.

**Options Considered**:
1. **Single-page scroll + project detail pages** — Cinematic scroll experience on home, detailed case studies as separate pages
2. **Fully multi-page** — Traditional navigation between About, Work, Contact pages
3. **Fully single-page** — Everything on one page, no separate project pages

**Decision**: Single-page scrolling homepage with separate project detail pages

**Rationale**:
- The homepage serves as the primary showcase — a curated, cinematic scroll journey through identity → about → work → contact
- Scroll choreography is the portfolio's differentiator — a single-page structure maximizes the scroll experience
- Project detail pages (`/work/[slug]`) provide dedicated space for in-depth case studies without cluttering the scroll flow
- Anchor-based navigation within the homepage allows section jumping while preserving the scroll narrative
- Best of both worlds: immersive scroll experience + SEO-friendly individual pages

**Consequences**:
- Homepage will be longer and require careful section transitions
- Navigation must support both anchor scrolling and page navigation
- Each project detail page needs its own SEO metadata

---

## ADR-007: Dark Mode Strategy — Dark by Default, No Toggle

**Date**: 2026-09-09
**Status**: Accepted
**Context**: Need to decide whether to implement a dark/light mode toggle or commit to a single theme.

**Decision**: Dark mode by default with strategic light contrast sections. No user toggle.

**Rationale**:
- Dark backgrounds create the premium, editorial, art-directed feel the user wants
- Strategic light sections (similar to the reference's alternating dark/light) create visual rhythm and contrast
- A toggle adds complexity without clear value for a portfolio focused on visual storytelling
- The design system can use light surfaces within cards, modals, or sections for contrast
- Eliminates the flash-of-unstyled-content problem with theme switching

**Consequences**:
- Must ensure sufficient contrast ratios for WCAG AA on dark backgrounds
- Must test readability carefully across all sections
- Light sections serve as intentional design moments, not user preference

---

## ADR-008: Deployment — Vercel (Primary), Static Export (Fallback)

**Date**: 2026-09-09
**Status**: Accepted
**Context**: Need a deployment approach that is simple, fast, and reliable.

**Decision**: Vercel as primary deployment target, with `output: 'export'` compatibility for static hosting fallback.

**Rationale**:
- Vercel is purpose-built for Next.js — zero-config deployment
- Automatic preview deployments for development
- Edge CDN for fast global delivery
- Built-in analytics and Web Vitals monitoring
- `output: 'export'` option allows deployment to any static host (Netlify, GitHub Pages, S3) if needed

**Consequences**:
- No server-side features in export mode (all pages must be statically generated)
- Dynamic routes must use `generateStaticParams`
