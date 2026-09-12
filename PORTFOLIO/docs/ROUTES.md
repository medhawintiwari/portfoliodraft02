# Route Structure

## Overview

The portfolio uses a minimal route structure: a single-page scrolling homepage and individual project detail pages.

## Route Map

```
/                       Homepage (single-page scroll)
├── #hero               ↳ Hero section (anchor)
├── #about              ↳ About section (anchor)
├── #work               ↳ Work/Projects section (anchor)
└── #contact            ↳ Contact section (anchor)

/work/[slug]            Project detail pages (dynamic)
├── /work/project-1     ↳ Project 1 case study
├── /work/project-2     ↳ Project 2 case study
└── /work/project-3     ↳ Project 3 case study

/not-found              404 page (automatic)
```

## Route Details

### `/` — Homepage

| Property | Value |
|----------|-------|
| Type | Static (SSG) |
| Component | `src/app/page.tsx` |
| Layout | `src/app/layout.tsx` (root) |
| Content | Hero → About → Work → Contact → Footer |
| Navigation | Anchor-based smooth scrolling within page |
| SEO | Primary metadata, Person + WebSite structured data |

### `/work/[slug]` — Project Detail

| Property | Value |
|----------|-------|
| Type | Static (SSG via `generateStaticParams`) |
| Component | `src/app/work/[slug]/page.tsx` |
| Layout | Root layout (shared Header/Footer) |
| Content | ProjectHero → ProjectContent → ProjectGallery → ProjectNav |
| Navigation | Back to homepage, next/previous project |
| SEO | Per-project metadata, CreativeWork structured data |
| Params | `slug` from `projects.ts` data |

```typescript
// src/app/work/[slug]/page.tsx
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
```

### 404 — Not Found

| Property | Value |
|----------|-------|
| Type | Static |
| Component | `src/app/not-found.tsx` |
| Content | Minimal "Page not found" with link back to homepage |
| Style | Matches site design (dark bg, accent typography) |

## Navigation Behavior

### Homepage Navigation
- Clicking a nav link (About, Work, Contact) smooth-scrolls to the corresponding section anchor
- URL updates to include hash (e.g., `/#about`) for shareability
- Active section is detected via Intersection Observer and highlighted in nav

### Project Page Navigation
- Header nav links navigate back to homepage with hash (e.g., `/#work`)
- "Back" link returns to homepage work section
- "Next Project" / "Previous Project" navigates between project detail pages
- Project list wraps (last project → first project)

### Mobile Navigation
- Same behavior as desktop
- Tapping a mobile menu link: closes menu → navigates/scrolls
