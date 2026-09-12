# SEO Strategy

## Metadata Strategy

### Root Metadata (layout.tsx)

```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://[PLACEHOLDER].dev'),
  title: {
    default: '[PLACEHOLDER: Name] — Creative Developer',
    template: '%s | [PLACEHOLDER: Name]'
  },
  description: 'Creative developer specializing in interactive web experiences with React, JavaScript, and CSS. Building digital products that are performant, accessible, and memorable.',
  keywords: ['creative developer', 'frontend developer', 'React developer', 'web developer', 'portfolio', 'interactive design', '[PLACEHOLDER: Name]'],
  authors: [{ name: '[PLACEHOLDER: Name]' }],
  creator: '[PLACEHOLDER: Name]',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
```

### Page-Specific Titles & Descriptions

| Page | Title | Description |
|------|-------|-------------|
| Homepage | `[Name] — Creative Developer` | Creative developer specializing in interactive web experiences with React, JavaScript, and CSS. |
| Project 1 | `[Project Name] | [Name]` | `[PLACEHOLDER: Project-specific description]` |
| Project 2 | `[Project Name] | [Name]` | `[PLACEHOLDER: Project-specific description]` |
| Project 3 | `[Project Name] | [Name]` | `[PLACEHOLDER: Project-specific description]` |
| 404 | `Page Not Found | [Name]` | The page you're looking for doesn't exist. |

---

## Open Graph

```typescript
openGraph: {
  type: 'website',
  locale: 'en_US',
  url: 'https://[PLACEHOLDER].dev',
  siteName: '[PLACEHOLDER: Name]',
  title: '[PLACEHOLDER: Name] — Creative Developer',
  description: 'Creative developer specializing in interactive web experiences.',
  images: [{
    url: '/og-image.jpg',
    width: 1200,
    height: 630,
    alt: '[PLACEHOLDER: Name] — Creative Developer Portfolio',
  }],
}
```

### Per-Project OG

Each project page should have its own OG image (project screenshot) and description.

---

## Twitter Cards

```typescript
twitter: {
  card: 'summary_large_image',
  title: '[PLACEHOLDER: Name] — Creative Developer',
  description: 'Creative developer specializing in interactive web experiences.',
  creator: '@[PLACEHOLDER: twitter_handle]',
  images: ['/og-image.jpg'],
}
```

---

## Structured Data

### Person Schema (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "[PLACEHOLDER: Name]",
  "url": "https://[PLACEHOLDER].dev",
  "jobTitle": "Creative Developer",
  "sameAs": [
    "https://github.com/[PLACEHOLDER]",
    "https://linkedin.com/in/[PLACEHOLDER]",
    "https://twitter.com/[PLACEHOLDER]"
  ],
  "knowsAbout": ["React", "JavaScript", "CSS", "Web Development", "Interactive Design"]
}
```

### WebSite Schema (Homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "[PLACEHOLDER: Name] — Portfolio",
  "url": "https://[PLACEHOLDER].dev"
}
```

### CreativeWork Schema (Per Project)

```json
{
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "[Project Title]",
  "creator": {
    "@type": "Person",
    "name": "[PLACEHOLDER: Name]"
  },
  "dateCreated": "[Year]",
  "description": "[Project description]",
  "url": "[Live URL if available]"
}
```

---

## Sitemap

Auto-generated via Next.js `sitemap.ts`:

```typescript
// src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://[PLACEHOLDER].dev';

  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projectUrls,
  ];
}
```

---

## Robots

```typescript
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://[PLACEHOLDER].dev/sitemap.xml',
  };
}
```

---

## Semantic HTML

| Element | Usage |
|---------|-------|
| `<header>` | Site navigation (one per page) |
| `<nav>` | Navigation links (with `aria-label`) |
| `<main>` | Primary page content (one per page) |
| `<section>` | Each major content section (hero, about, work, contact) |
| `<article>` | Each project case study |
| `<footer>` | Site footer |
| `<h1>` | One per page (hero headline on homepage, project title on detail) |
| `<h2>` | Section headings |
| `<h3>` | Subsection headings (case study sections) |
| `<figure>` | Images with captions |
| `<figcaption>` | Image captions |
| `<address>` | Contact information |
| `<time>` | Dates (project year) |

### Heading Hierarchy

```
Homepage:
  <h1> Hero headline
    <h2> About (section title)
    <h2> Selected Projects (section title)
    <h2> Contact (CTA headline)

Project Detail:
  <h1> Project Title
    <h2> The Problem
    <h2> The Approach
    <h2> The Solution
    <h2> The Outcome
```

---

## Image Alt Text

All images must have descriptive alt text:
- Project screenshots: Describe what's shown (e.g., "Dashboard showing real-time expense tracking with charts and team member list")
- Decorative images: Use `alt=""` with `aria-hidden="true"`
- Hero visuals: Describe the visual element (e.g., "Abstract geometric composition of interconnected lines")

---

## Performance Considerations

- All metadata is rendered server-side (zero JS overhead)
- OG images are pre-generated static files (not dynamic)
- Structured data is embedded as `<script type="application/ld+json">`
- `next/font` eliminates FOUT (Flash of Unstyled Text)
- `<link rel="preconnect">` for Google Fonts if not self-hosted
