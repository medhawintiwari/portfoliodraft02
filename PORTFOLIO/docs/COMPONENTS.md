# Component System

## Component Inventory

| Component | Location | Type | Purpose |
|-----------|----------|------|---------|
| Header | `layout/Header.tsx` | Client | Fixed navigation bar |
| Footer | `layout/Footer.tsx` | Server | Site footer |
| MobileMenu | `layout/MobileMenu.tsx` | Client | Mobile navigation overlay |
| Section | `layout/Section.tsx` | Server | Reusable section wrapper |
| Hero | `sections/Hero.tsx` | Client | Homepage hero |
| About | `sections/About.tsx` | Client | About/philosophy section |
| Work | `sections/Work.tsx` | Client | Projects showcase |
| Contact | `sections/Contact.tsx` | Client | Contact CTA |
| ProjectHero | `project/ProjectHero.tsx` | Client | Project detail header |
| ProjectContent | `project/ProjectContent.tsx` | Server | Case study body |
| ProjectGallery | `project/ProjectGallery.tsx` | Client | Scroll-driven gallery |
| ProjectNav | `project/ProjectNav.tsx` | Server | Next/prev navigation |
| Button | `ui/Button.tsx` | Client | Button variants |
| TextReveal | `ui/TextReveal.tsx` | Client | Animated text reveal |
| MaskReveal | `ui/MaskReveal.tsx` | Client | Image mask reveal |
| MagneticElement | `ui/MagneticElement.tsx` | Client | Cursor-reactive wrapper |
| ScrollProgress | `ui/ScrollProgress.tsx` | Client | Scroll progress indicator |
| SplitText | `ui/SplitText.tsx` | Client | Text splitting for animation |
| ScrollReveal | `animation/ScrollReveal.tsx` | Client | Scroll-triggered reveal wrapper |
| ParallaxLayer | `animation/ParallaxLayer.tsx` | Client | Parallax movement wrapper |
| PinnedSection | `animation/PinnedSection.tsx` | Client | ScrollTrigger pin wrapper |
| HorizontalScroll | `animation/HorizontalScroll.tsx` | Client | Horizontal scroll container |

---

## Layout Components

### Header

**Responsibility**: Fixed navigation bar that adapts to scroll position and current page.

**Props**:
```typescript
interface HeaderProps {
  // No props — reads scroll position and route internally
}
```

**States**:
| State | Behavior |
|-------|----------|
| `transparent` | Initial state on homepage, no background |
| `blurred` | After scrolling past hero, backdrop-blur + semi-transparent bg |
| `hidden` | While scrolling down (auto-hide), slides up |
| `visible` | Always visible when scrolling up |

**Responsive**:
- Desktop: Full navigation links visible
- Mobile (< 768px): Logo + hamburger icon only

**Accessibility**:
- `<header>` with `role="banner"`
- `<nav>` with `aria-label="Main navigation"`
- Skip navigation link as first focusable element
- Mobile menu toggle: `aria-expanded`, `aria-controls`

**Animation**:
- Background transition: 300ms ease-out
- Auto-hide: translate-y 300ms ease-out
- Active section dot: x-position transitions 400ms ease-out

---

### Footer

**Responsibility**: Site footer with links, social, and copyright.

**Props**:
```typescript
interface FooterProps {
  // No props — reads data from personal.ts
}
```

**Responsive**:
- Desktop: 3-column layout
- Tablet: 2-column layout
- Mobile: Single column, stacked

**Accessibility**:
- `<footer>` with `role="contentinfo"`
- All links with descriptive text
- Social links open in new tab with `rel="noopener noreferrer"` and `aria-label`

---

### MobileMenu

**Responsibility**: Full-screen navigation overlay for mobile devices.

**Props**:
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
```

**States**:
| State | Behavior |
|-------|----------|
| `closed` | Not rendered, no pointer events |
| `opening` | Overlay fading in, links staggering in |
| `open` | Fully visible, body scroll locked |
| `closing` | Overlay fading out, links fading out |

**Accessibility**:
- `role="dialog"`, `aria-modal="true"`
- Focus trapped within menu when open
- Close on Escape key
- Body scroll locked when open
- Focus returns to trigger button on close

---

### Section

**Responsibility**: Reusable wrapper for homepage sections. Provides consistent padding, container width, and section IDs.

**Props**:
```typescript
interface SectionProps {
  id: string;                          // Section anchor ID
  variant?: 'dark' | 'light';         // Background theme (default: 'dark')
  className?: string;                  // Additional classes
  fullBleed?: boolean;                 // If true, removes max-width container
  children: React.ReactNode;
}
```

**Output HTML**:
```html
<section id="{id}" class="{variant} {className}">
  <div class="container">
    {children}
  </div>
</section>
```

---

## Section Components

### Hero

**Responsibility**: Homepage hero with animated headline and supporting content.

**Props**:
```typescript
interface HeroProps {
  // No props — reads data from personal.ts
  // Self-contained with internal GSAP animations
}
```

**Internal Structure**:
```
<section id="hero" class="h-screen">
  <div class="hero-content">
    <h1 class="hero-headline">
      <SplitText>{headline}</SplitText>
    </h1>
    <p class="hero-subtitle">{subtitle}</p>
    <p class="hero-description">{description}</p>
  </div>
  <div class="hero-visual">
    {geometric element}
  </div>
  <div class="scroll-indicator">
    SCROLL TO EXPLORE ↓
  </div>
</section>
```

**Animation**: See ANIMATION.md §1 (Page Load) and §2 (Hero Scroll Transition)

---

### About

**Responsibility**: Personal introduction, philosophy, and skills.

**Props**:
```typescript
interface AboutProps {
  // No props — reads data from personal.ts
}
```

**Internal Structure**:
```
<Section id="about" variant="light">
  <span class="category-tag">[ABOUT]</span>
  <h2>{section title}</h2>
  <div class="about-content">
    <div class="about-text">
      {paragraphs}
    </div>
    <div class="skills-grid">
      {skill categories}
    </div>
  </div>
</Section>
```

---

### Work

**Responsibility**: Showcase 3 featured projects with scroll-driven presentation.

**Props**:
```typescript
interface WorkProps {
  // No props — reads data from projects.ts
}
```

**Internal Structure (Desktop)**:
```
<Section id="work" variant="dark">
  <span class="category-tag">[WORK]</span>
  <h2>Selected projects.</h2>
  <PinnedSection height={3}>  {/* 3 projects = 3 viewport heights */}
    {projects.map(project => (
      <ProjectSlide key={project.slug} project={project} />
    ))}
  </PinnedSection>
</Section>
```

**Animation**: See ANIMATION.md §4 (Work Section — Scroll Theater)

---

### Contact

**Responsibility**: Contact CTA with email and social links.

**Props**:
```typescript
interface ContactProps {
  // No props — reads data from personal.ts
}
```

---

## UI Primitives

### Button

**Props**:
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;                    // Renders as <a> if provided
  external?: boolean;               // Opens in new tab
  icon?: React.ReactNode;           // Trailing icon
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

**Variants**: See DESIGN.md — Button Styles

---

### TextReveal

**Responsibility**: Wraps text content and animates it into view using clip-path mask reveal.

**Props**:
```typescript
interface TextRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';   // Reveal direction
  delay?: number;                                     // Delay in seconds
  duration?: number;                                  // Duration in seconds
  trigger?: 'viewport' | 'load';                     // When to trigger
  threshold?: number;                                 // Viewport trigger position (0-1)
  as?: keyof JSX.IntrinsicElements;                  // HTML element (default: 'div')
  className?: string;
}
```

**Reduced Motion**: Renders without animation; content is immediately visible.

---

### MaskReveal

**Responsibility**: Reveals images through animated clip-path masks.

**Props**:
```typescript
interface MaskRevealProps {
  children: React.ReactNode;
  shape?: 'circle' | 'inset' | 'rectangle';   // Mask shape
  direction?: 'center' | 'left' | 'right' | 'top' | 'bottom';
  delay?: number;
  duration?: number;
  trigger?: 'viewport' | 'scroll';  // Viewport trigger or scrubbed to scroll
  className?: string;
}
```

---

### SplitText

**Responsibility**: Splits text content into individual words or characters for animation.

**Props**:
```typescript
interface SplitTextProps {
  children: string;
  splitBy?: 'word' | 'character' | 'line';
  className?: string;
  wordClassName?: string;
  charClassName?: string;
}
```

**Output**:
```html
<!-- splitBy="word" -->
<span class="word"><span class="word-inner">Hello</span></span>
<span class="word"><span class="word-inner">World</span></span>

<!-- The inner span allows clip-path masking per word -->
```

---

### MagneticElement

**Responsibility**: Makes an element respond to cursor proximity with subtle magnetic movement.

**Props**:
```typescript
interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;          // Movement strength in pixels (default: 8)
  radius?: number;            // Activation radius in pixels (default: 60)
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}
```

**Mobile**: Disabled (no cursor on touch devices).
**Reduced Motion**: Disabled.

---

### ScrollProgress

**Responsibility**: Fixed vertical scroll progress indicator.

**Props**:
```typescript
interface ScrollProgressProps {
  color?: string;         // Line color (default: accent)
  width?: number;         // Line width in px (default: 2)
  position?: 'left' | 'right';  // Screen edge (default: 'right')
}
```

**Mobile**: Hidden.

---

## Animation Wrapper Components

### ScrollReveal

**Responsibility**: Generic wrapper that triggers child animation when entering viewport.

**Props**:
```typescript
interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  threshold?: number;      // 0-1, viewport trigger position
  stagger?: number;        // Stagger delay for child elements
  once?: boolean;          // Animate only once (default: true)
  className?: string;
}
```

---

### ParallaxLayer

**Responsibility**: Applies parallax movement to children based on scroll position.

**Props**:
```typescript
interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number;           // Parallax speed multiplier (default: 0.5)
  direction?: 'vertical' | 'horizontal';
  className?: string;
}
```

**Mobile**: Disabled (no parallax on mobile).
**Reduced Motion**: Disabled.

---

### PinnedSection

**Responsibility**: Pins content in the viewport while scrolling through a defined distance.

**Props**:
```typescript
interface PinnedSectionProps {
  children: React.ReactNode;
  height?: number;           // Number of viewport heights to pin for
  onProgress?: (progress: number) => void;  // Scroll progress callback (0-1)
  className?: string;
}
```

**Mobile**: Not pinned — renders as normal scroll content.

---

## Reusability Rules

1. **Animation components are generic**: `TextReveal`, `MaskReveal`, `ScrollReveal` can wrap any content
2. **Section data comes from data files**: Components never hardcode content
3. **Styling uses design tokens**: Components use Tailwind classes mapped to design tokens, not arbitrary values
4. **Animation config is extractable**: Durations, easings, and delays are defined in `lib/animations.ts`, not hardcoded
5. **Server components by default**: Only use `'use client'` when the component needs interactivity, state, or browser APIs
6. **Props use interfaces, not types**: For consistency and extensibility
7. **Children pattern over render props**: Simpler composition, easier to understand
