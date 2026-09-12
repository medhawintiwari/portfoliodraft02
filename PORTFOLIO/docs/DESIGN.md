# Visual Design Specification

## Design Philosophy

**"Quiet confidence."**

The design communicates technical mastery through restraint, not excess. Every element earns its place. Whitespace is used as a design element, not empty space. Typography does the heavy lifting. Color is used surgically. The result feels like a curated creative studio — intentional, premium, and memorable.

### Guiding Principles

1. **Less is more**: Remove until it breaks, then add one thing back
2. **Typography is the hero**: Large, confident type creates hierarchy and personality
3. **Whitespace is a feature**: Generous spacing signals confidence and premium quality
4. **Animation serves content**: Every motion guides attention or improves understanding
5. **Dark canvas, bright accents**: A dark foundation creates drama and focus
6. **Editorial, not decorative**: Think magazine spread, not poster collage
7. **Consistent rhythm**: Vertical rhythm and spacing create a cohesive reading experience

---

## Visual Direction

### What we're capturing from the reference (davidecattaneo.it)
- ✅ Dark, premium editorial aesthetic
- ✅ Strong, large typography as the primary design element
- ✅ Generous whitespace and negative space
- ✅ Clean visual hierarchy
- ✅ Restrained, purposeful color usage
- ✅ Sophisticated scroll experience
- ✅ Structured project presentation with metadata
- ✅ Alternating dark/light sections for visual rhythm
- ✅ Sticky/fixed navigation elements

### What we're doing differently
- ❌ Not using their green accent — we'll establish our own accent color
- ❌ Not using their 3D wireframe visual — we'll use abstract geometric elements
- ❌ Not copying their exact layout or section flow
- ❌ Not using their monospace-heavy typographic treatment
- ❌ Creating a warmer, more personal tone — their site is corporate
- ❌ Different project presentation format — visual-forward cards vs. tabular list

---

## Color System

### Core Palette

```
--color-bg-primary:      #0A0A0B       // Near-black, primary background
--color-bg-secondary:    #111113       // Slightly lighter, card/section backgrounds
--color-bg-elevated:     #1A1A1E       // Elevated surfaces (hover states, modals)
--color-bg-light:        #F5F3F0       // Light sections (warm off-white)
--color-bg-light-alt:    #EBE8E4       // Light section alternate

--color-text-primary:    #F0EDE8       // Warm off-white, primary text on dark
--color-text-secondary:  #8A8580       // Muted text, metadata, captions
--color-text-tertiary:   #5A5650       // Very subtle text, decorative numbers
--color-text-dark:       #1A1A1E       // Text on light backgrounds
--color-text-dark-muted: #6B6560       // Muted text on light backgrounds

--color-accent:          #C8A97E       // Warm gold/amber accent
--color-accent-hover:    #D4B88E       // Accent hover state
--color-accent-muted:    rgba(200, 169, 126, 0.15)  // Accent at low opacity

--color-border:          rgba(240, 237, 232, 0.08)   // Subtle borders on dark
--color-border-light:    rgba(26, 26, 30, 0.08)     // Subtle borders on light
```

### Rationale
- **Near-black backgrounds**: Not pure black (#000) — `#0A0A0B` has depth and warmth
- **Warm off-white text**: `#F0EDE8` is softer than pure white, easier on the eyes
- **Warm gold accent**: `#C8A97E` feels premium and creative — distinct from the reference's green
- **Light sections**: `#F5F3F0` warm off-white for contrast sections — not cold white
- **Muted tones**: Used for metadata, captions, and decorative elements

### Contrast Ratios (WCAG AA)
| Combination | Ratio | Pass |
|------------|-------|------|
| Primary text on dark bg | 14.8:1 | ✅ AAA |
| Secondary text on dark bg | 4.6:1 | ✅ AA |
| Dark text on light bg | 13.2:1 | ✅ AAA |
| Accent on dark bg | 6.2:1 | ✅ AA |
| Accent on light bg | 3.1:1 | ✅ AA Large |

---

## Typography System

### Font Stack

**Primary / Display**: `"Outfit"` (Google Fonts)
- Used for: Headlines, hero text, section titles, project titles
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)
- Why: Geometric sans-serif with personality — clean but not sterile, modern but warm

**Body / Secondary**: `"Inter"` (Google Fonts)
- Used for: Body text, descriptions, metadata, navigation
- Weights: 400 (Regular), 500 (Medium)
- Why: Excellent readability at small sizes, pairs well with Outfit

**Mono / Code**: `"JetBrains Mono"` (Google Fonts)
- Used for: Tags, metadata labels, technical details, decorative numbering
- Weights: 400 (Regular)
- Why: Clean monospace with character, used sparingly for editorial texture

### Type Scale

```
--text-xs:    0.75rem   / 1rem       (12px)   — Smallest labels
--text-sm:    0.875rem  / 1.25rem    (14px)   — Metadata, captions
--text-base:  1rem      / 1.625rem   (16px)   — Body text (base)
--text-lg:    1.125rem  / 1.75rem    (18px)   — Large body text
--text-xl:    1.25rem   / 1.75rem    (20px)   — Section subtitles
--text-2xl:   1.5rem    / 2rem       (24px)   — Card titles
--text-3xl:   2rem      / 2.375rem   (32px)   — Section headings
--text-4xl:   2.5rem    / 2.75rem    (40px)   — Large section headings
--text-5xl:   3.5rem    / 3.75rem    (56px)   — Display headings
--text-6xl:   4.5rem    / 4.75rem    (72px)   — Hero subtitle
--text-7xl:   6rem      / 1          (96px)   — Hero headline
--text-8xl:   8rem      / 1          (128px)  — Display oversized (desktop)
```

### Typography Rules

1. **Hero headline**: `text-7xl` on desktop, `text-5xl` on tablet, `text-4xl` on mobile. Font: Outfit SemiBold. Letter-spacing: `-0.03em`
2. **Section headings**: `text-5xl` on desktop, `text-4xl` on tablet, `text-3xl` on mobile. Font: Outfit Medium. Letter-spacing: `-0.02em`
3. **Body text**: `text-base` to `text-lg`. Font: Inter Regular. Max width: `42ch` for readability
4. **Metadata tags**: `text-xs` to `text-sm`. Font: JetBrains Mono. Letter-spacing: `0.05em`. Uppercase
5. **Navigation**: `text-sm`. Font: Inter Medium. Letter-spacing: `0.02em`. Uppercase
6. **No text larger than `text-8xl`** — even on large screens
7. **Line heights for display text are tight** (1.0-1.1) to create dense, impactful blocks
8. **Line heights for body text are generous** (1.625) for readability

---

## Spacing System

### Base Unit: 4px

```
--space-0:    0
--space-1:    0.25rem   (4px)
--space-2:    0.5rem    (8px)
--space-3:    0.75rem   (12px)
--space-4:    1rem      (16px)
--space-5:    1.25rem   (20px)
--space-6:    1.5rem    (24px)
--space-8:    2rem      (32px)
--space-10:   2.5rem    (40px)
--space-12:   3rem      (48px)
--space-16:   4rem      (64px)
--space-20:   5rem      (80px)
--space-24:   6rem      (96px)
--space-32:   8rem      (128px)
--space-40:   10rem     (160px)
--space-48:   12rem     (192px)
--space-64:   16rem     (256px)
```

### Spacing Rules

1. **Section vertical padding**: `space-32` (128px) on desktop, `space-20` (80px) on mobile
2. **Between major elements within section**: `space-16` (64px)
3. **Between related elements**: `space-6` to `space-8` (24-32px)
4. **Inline spacing**: `space-2` to `space-4` (8-16px)
5. **Container horizontal padding**: `space-6` (24px) on mobile, `space-12` (48px) on desktop

---

## Grid System

### Container Widths

```
--container-sm:   640px    // Narrow text content
--container-md:   768px    // Default content width
--container-lg:   1024px   // Wide content
--container-xl:   1280px   // Full-width content
--container-2xl:  1440px   // Maximum container width
```

### Grid Rules

1. **Homepage content**: Centered, max-width `container-xl` (1280px)
2. **Text content**: Max-width `container-sm` (640px) for readability
3. **Project cards**: 12-column grid, cards span 6 columns on desktop
4. **Full-bleed sections**: Extend to viewport edges with internal padding
5. **Asymmetric layouts**: Use CSS Grid with named areas, not fixed columns

---

## Border Radius

```
--radius-none:    0
--radius-sm:      0.25rem   (4px)   — Tags, small elements
--radius-md:      0.5rem    (8px)   — Buttons, input fields
--radius-lg:      0.75rem   (12px)  — Cards
--radius-xl:      1rem      (16px)  — Large cards, image containers
--radius-full:    9999px             — Circles, pills
```

### Rule: Use radius sparingly. The design should feel structured and editorial, not bubbly.

---

## Shadows

```
--shadow-sm:      0 1px 2px rgba(0, 0, 0, 0.2)
--shadow-md:      0 4px 12px rgba(0, 0, 0, 0.15)
--shadow-lg:      0 8px 32px rgba(0, 0, 0, 0.2)
--shadow-glow:    0 0 40px rgba(200, 169, 126, 0.08)    // Subtle accent glow
```

### Rule: Shadows are used sparingly on dark backgrounds. Elevation is communicated through color shifts (`bg-secondary` → `bg-elevated`) more than shadows.

---

## Button Styles

### Primary Button
- Background: `accent` (`#C8A97E`)
- Text: `bg-primary` (`#0A0A0B`)
- Font: Inter Medium, `text-sm`, uppercase, `letter-spacing: 0.05em`
- Padding: `space-4` horizontal, `space-3` vertical
- Border radius: `radius-md`
- Hover: `accent-hover` with subtle scale(1.02)
- Transition: 300ms ease-out
- Focus: 2px outline offset, accent color

### Secondary Button / Ghost
- Background: transparent
- Border: 1px solid `border`
- Text: `text-primary`
- Hover: background `bg-elevated`, border `text-secondary`
- Same sizing and typography as primary

### Link Button
- No background, no border
- Text: `accent`
- Underline on hover (animated slide-in from left)
- Arrow icon for external links

---

## Link Styles

### Inline Links (in body text)
- Color: `accent`
- No underline by default
- Hover: animated underline slides in from left
- Transition: 300ms ease-out

### Navigation Links
- Color: `text-secondary`
- Hover: `text-primary`
- Active: `text-primary` with accent underline
- Font: Inter Medium, `text-sm`, uppercase

---

## Navigation Design

### Desktop Navigation
- **Position**: Fixed top, full-width
- **Background**: `bg-primary` with blur backdrop (glassmorphism on scroll)
- **Height**: 72px
- **Layout**: Logo/name (left) — Section links (center/right) — CTA button (far right)
- **Logo**: `[PLACEHOLDER: Name]` in Outfit Medium, `text-base`
- **Links**: About, Work, Contact — in Inter Medium, `text-sm`, uppercase
- **Active state**: Accent-colored dot or underline indicator
- **Scroll behavior**: Appears transparent initially, adds background blur after scrolling past hero
- **Z-index**: 50

### Mobile Navigation
- **Trigger**: Hamburger icon (animated bars → X transition)
- **Overlay**: Full-screen, `bg-primary`, opacity animation
- **Links**: Centered, large (`text-3xl`), Outfit Light, staggered entrance
- **Close**: X button or click outside

---

## Hero Design

### Layout
- Full viewport height (100vh)
- Large headline dominates the upper-left to center area
- Supporting tagline positioned below or to the right
- Abstract geometric visual element (animated) on the right or background
- Scroll indicator at bottom-right: "SCROLL TO EXPLORE ↓" in monospace

### Content
- **Headline**: `[PLACEHOLDER: Name]` or professional tagline
- **Subheadline**: "Creative Developer" or positioning statement
- **Body**: One sentence describing value proposition
- **Visual**: Abstract geometric composition that responds to scroll (not 3D wireframe — original)

### Design Notes
- The hero should feel expansive and confident
- The headline animation (line reveal) is the first impression — it must be flawless
- Background is `bg-primary` (dark)
- The scroll indicator is the only call-to-action — the hero sells through quality, not CTAs

---

## Section Design

### Dark Sections (default)
- Background: `bg-primary`
- Text: `text-primary` and `text-secondary`
- Used for: Hero, Work, Contact

### Light Sections (contrast)
- Background: `bg-light` (`#F5F3F0`)
- Text: `text-dark` and `text-dark-muted`
- Used for: About section (to create visual rhythm)
- Transition: Clean horizontal wipe or opacity transition between dark/light

### Section Header Pattern
- Monospace category tag: `[ABOUT]`, `[WORK]`, `[CONTACT]` — `text-xs`, uppercase, `accent` color
- Section title: `text-5xl`, Outfit Medium
- Optional subtitle/description: `text-lg`, Inter Regular, `text-secondary`

---

## Project Card Design

### Layout (in Work section)
- **Display**: Stacked vertically, not side-by-side (one project per scroll "frame")
- **Each card**: Full-width, with image area (left/top) and text area (right/bottom)
- **Image**: 16:9 aspect ratio, full-bleed within card, mask-reveal animation
- **Content**: Project number (decorative, large, monospace), title, category tag, brief description
- **CTA**: "View Project →" link

### Scroll Behavior
- Each project card enters through scroll-driven choreography
- Previous card transitions out as next enters
- Cards are revealed with a combination of translate, opacity, and mask animations
- See ANIMATION.md for detailed spec

### Hover State
- Subtle image scale (1.03)
- Title shifts slightly
- CTA underline animates in

---

## Project Detail Design

### Hero Area
- Large project title: `text-7xl`, centered
- Project number: decorative, overlapping, `text-8xl`, `text-tertiary`
- Metadata grid: Year | Role | Technologies | Links
- Metadata uses monospace font, uppercase labels

### Content Area
- Two-column layout on desktop (narrow text column + wide image column)
- Single-column on mobile
- Section headings: "The Problem", "The Approach", "The Solution", "The Outcome"
- Body text: `text-lg`, `container-sm` max-width

### Gallery
- Full-bleed images with scroll-driven mask reveals
- Image captions in monospace

### Navigation
- "Next Project" and "Previous Project" at the bottom
- Large, confidence-inspiring navigation — not small text links

---

## Footer Design

### Layout
- Full-width, dark background (`bg-secondary`)
- Vertical padding: `space-24`
- Three-column layout: Name/tagline (left), Quick links (center), Social links (right)
- Bottom bar: Copyright, year, credit link

### Content
- **Name**: Outfit Medium, `text-lg`
- **Tagline**: Inter Regular, `text-secondary`
- **Links**: About, Work, Contact
- **Social**: GitHub, LinkedIn, Twitter/X — icon + text
- **Copyright**: "© 2026 [PLACEHOLDER: Name]. All rights reserved."

---

## Responsive Design

See RESPONSIVE.md for detailed breakpoint behavior. Key principles:
- Mobile-first CSS
- Typography scales down proportionally
- Layout shifts from multi-column to single-column
- Animations simplify on mobile (reduced choreography, no pinning)
- Touch-friendly tap targets (minimum 44x44px)

---

## Accessibility Design Considerations

1. **Color is never the only indicator** — use text, icons, and shape alongside color
2. **Focus indicators**: 2px solid accent outline, 2px offset — visible on all backgrounds
3. **Reduced motion**: All animations replaced with opacity/instant transitions
4. **Text size**: Body text never smaller than 16px on any device
5. **Touch targets**: Minimum 44x44px for all interactive elements
6. **Content order**: Visual order matches DOM order for screen readers
