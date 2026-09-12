# Animation Specification

## Animation Philosophy

**"Choreography, not decoration."**

Every animation serves a purpose: guiding attention, creating hierarchy, improving storytelling, or making the interface feel alive. The scroll experience is the portfolio's primary differentiator — it should feel cinematic, intentional, and smooth.

### Guiding Principles

1. **Purpose over spectacle**: Every animation answers "why does this move?"
2. **Scroll as narrative**: The homepage tells a story as you scroll — each section is a chapter
3. **Choreography over isolation**: Animations work together as a sequence, not as independent effects
4. **Performance is non-negotiable**: 60fps on modern hardware, compositor-only properties (transform, opacity)
5. **Graceful degradation**: Reduced-motion replaces movement with opacity; mobile simplifies choreography
6. **Timing is everything**: Easing curves feel natural and premium — never linear, never bouncy

### Default Easing Curves

```
--ease-out:          cubic-bezier(0.16, 1, 0.3, 1)       // Primary exit ease
--ease-in-out:       cubic-bezier(0.76, 0, 0.24, 1)      // Smooth transitions
--ease-out-expo:     cubic-bezier(0.19, 1, 0.22, 1)      // Dramatic reveal
--ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1)      // Cinematic movement
```

### Default Durations

```
--duration-instant:  0ms          // Reduced motion fallback
--duration-fast:     200ms        // Micro-interactions (hover, tap)
--duration-normal:   500ms        // Standard transitions
--duration-slow:     800ms        // Entrance animations
--duration-slower:   1200ms       // Dramatic reveals
--duration-scroll:   Scrubbed     // Controlled by scroll position
```

---

## Global Animation Setup

### Smooth Scrolling (Lenis)

```typescript
// Lenis configuration
const lenis = new Lenis({
  duration: 1.2,              // Momentum duration
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),  // Exponential ease
  touchMultiplier: 2,         // Touch device sensitivity
  infinite: false,            // No infinite scroll
  smoothWheel: true,          // Smooth wheel scrolling
});

// Sync with GSAP ticker
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);
```

### Reduced Motion

```typescript
// When prefers-reduced-motion is active:
// 1. Lenis smooth scrolling is disabled (native scroll)
// 2. All GSAP animations are replaced with instant opacity transitions
// 3. ScrollTrigger still fires (for content visibility) but animations are instant
// 4. No transform-based animations
```

---

## Section-by-Section Animation Storyboard

---

### 1. Page Load Sequence

#### Objective
Create a dramatic first impression. The page should feel like it's "waking up" — elements appear in a choreographed sequence.

#### Behavior (desktop)
```
T+0ms      Page background appears (dark)
T+200ms    Navigation fades in (opacity 0→1, y: -20→0)
T+400ms    Hero headline Line 1 reveals (clip-path mask, left→right)
T+550ms    Hero headline Line 2 reveals (clip-path mask, left→right)
T+700ms    Hero subtitle fades up (opacity 0→1, y: 30→0)
T+900ms    Hero body text fades up (opacity 0→1, y: 20→0)
T+1100ms   Geometric visual element draws in (stroke-dashoffset animation)
T+1400ms   Scroll indicator fades in (opacity 0→1)
```

#### Easing
- Headlines: `ease-out-expo` (dramatic, confident)
- Supporting text: `ease-out` (smooth, natural)
- Geometric element: `ease-in-out` (deliberate, mechanical)

#### Mobile
- Same sequence but simplified
- No geometric element animation (appears static)
- Shorter stagger (150ms between elements)

#### Reduced Motion
- All elements appear instantly at `T+0ms`
- No transform animations
- Opacity transitions only (0→1, 200ms)

#### Performance
- Use `clip-path` for text reveals (compositor-only)
- No DOM reflows during animation
- `will-change: transform, opacity` applied before animation starts, removed after

---

### 2. Hero Section — Scroll Transition

#### Objective
Create a cinematic transition from the hero into the about section. The hero doesn't just scroll away — it transforms.

#### Trigger
ScrollTrigger: Start when hero enters viewport, end when hero exits (scrubbed to scroll progress)

#### Behavior (desktop)
```
Scroll 0%:   Hero at full size, all elements at rest
Scroll 30%:  Headline begins scaling down (scale: 1 → 0.85)
Scroll 30%:  Headline begins translating up (y: 0 → -60px)
Scroll 50%:  Hero background begins fading (opacity: 1 → 0.3)
Scroll 50%:  Geometric element begins parallax movement (y: 0 → -120px, faster than scroll)
Scroll 70%:  Supporting text fades out (opacity: 1 → 0)
Scroll 100%: Hero completely out of view, about section enters
```

#### Pinning
- Hero is NOT pinned — it scrolls naturally but elements within it move at different rates (parallax)
- The scaling and fading create a sense of "pulling away" from the hero

#### Easing
- `none` (scrubbed — easing is controlled by scroll position)

#### Mobile
- Simplified: headline only scales slightly (1 → 0.95)
- No parallax on geometric element
- Supporting text fades out at 60%

#### Reduced Motion
- No scaling or parallax
- Elements fade out linearly as they scroll off-screen (native scroll behavior)

---

### 3. About Section

#### Objective
Introduce the person behind the work. Create a warm, personal contrast after the dramatic hero.

#### Background
Light section (`#F5F3F0`) — the background transition from dark to light IS the transition effect.

#### Behavior (desktop)

**3a. Section Title Animation**
```
Trigger:     Element enters viewport (top: 80% of screen)
Duration:    800ms
Animation:   Category tag ([ABOUT]) slides in from left (x: -40→0, opacity: 0→1)
             Section title reveals word-by-word (clip-path mask, stagger: 80ms per word)
Easing:      ease-out-expo
```

**3b. About Text — Paragraph Reveal**
```
Trigger:     Each paragraph enters viewport (top: 75% of screen)
Duration:    600ms per paragraph
Animation:   Each paragraph fades up (y: 40→0, opacity: 0→1)
Stagger:     200ms between paragraphs
Easing:      ease-out
```

**3c. Skills Display — Staggered Entrance**
```
Trigger:     Skills container enters viewport (top: 70% of screen)
Duration:    500ms per skill category
Animation:   Each skill category fades up (y: 30→0, opacity: 0→1)
Stagger:     100ms between categories
Easing:      ease-out
```

#### Mobile
- Same animations but with smaller translate values (y: 20→0 instead of 40→0)
- Word-by-word reveal becomes line-by-line reveal
- Trigger positions adjusted (top: 85% instead of 80%)

#### Reduced Motion
- No movement (y translations removed)
- Opacity transitions only (0→1, 300ms)
- No stagger — all elements appear together

---

### 4. Work Section — Project Showcase (SIGNATURE ANIMATION)

#### Objective
This is the most important scroll section. Projects must be presented with cinematic gravity — each project gets its own "moment" in the scroll.

#### Background
Dark section returns (`#0A0A0B`)

#### Behavior (desktop) — "Scroll Theater"

The Work section uses a **pinned scroll container** where each project transitions in as the user scrolls. Think of it as a scroll-driven slideshow where each project is a "frame."

```
Structure:
- Section is pinned (stays fixed in viewport)
- Scroll progress within the section cycles through 3 projects
- Each project gets ~33% of the scroll distance

Project Transition Sequence (per project):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Scroll 0-15% (of project's segment):
    ENTER
    - Project image mask-reveals from center outward (clip-path: circle(0%) → circle(70%))
    - Project number fades in (large, decorative, offset position)
    - Project title reveals line by line (clip-path mask)

  Scroll 15-75%:
    HOLD
    - Project is fully visible and resting
    - Subtle parallax on image (y responds to scroll at 0.1x rate)
    - Category tag and description fade in (stagger: 150ms)
    - "View Project →" link appears

  Scroll 75-100%:
    EXIT
    - Current project image mask-closes (clip-path: circle(70%) → circle(0%))
    - Text elements fade out (opacity: 1→0, y: 0→-30)
    - Next project begins its ENTER sequence simultaneously
    - Cross-fade creates a cinematic transition
```

#### Pinning
- The entire Work section is pinned for `3 × viewport heights` (one per project)
- ScrollTrigger `pin: true`, `scrub: 1` (smooth scrubbing with 1s delay for fluidity)

#### Easing
- Scrubbed (no easing — controlled by scroll)
- But the mask-reveal uses a custom `circle()` clip-path that creates a natural easing effect

#### Mobile
- **No pinning** on mobile (performance + usability)
- Projects stack vertically
- Each project enters with a simple fade-up (y: 40→0, opacity: 0→1) as it enters viewport
- Images reveal with a simpler clip-path: `inset(100% 0 0 0)` → `inset(0)` (wipe from bottom)
- Still visually interesting, but no scroll-pinning complexity

#### Reduced Motion
- No clip-path animations
- No pinning
- Projects visible with opacity transitions only
- Images load without mask effects

#### Performance
- Use `clip-path` for masks (GPU-accelerated)
- Images are pre-loaded when 50% scroll away from their trigger
- Only the current project and its neighbors are in the GPU layer
- `will-change: clip-path, transform` only during active animation

---

### 5. Individual Project Card — Hover Interaction (Desktop Only)

#### Objective
Add a layer of micro-interaction that makes the work section feel responsive and alive.

#### Behavior
```
On hover:
  - Image scales subtly (scale: 1 → 1.03), duration: 500ms, ease-out
  - Title shifts slightly upward (y: 0 → -4px), duration: 300ms, ease-out
  - "View Project →" underline animates in (width: 0% → 100%, left to right)
  - Custom cursor changes to "View" label (if cursor tracking implemented)

On hover exit:
  - All effects reverse with same durations
```

#### Performance
- CSS transitions preferred over GSAP for hover states (simpler, no JS overhead)
- `transform` and `opacity` only

---

### 6. Contact Section

#### Objective
Create an inviting, warm closing. The contact section should feel like an open door, not a form.

#### Behavior (desktop)

**6a. Large CTA Headline**
```
Trigger:     Contact section enters viewport (top: 80%)
Duration:    1000ms
Animation:   "Let's build something" reveals with a character-stagger
             Each character: opacity 0→1, y: 40→0
             Stagger: 20ms per character
             Words "something" in accent color appears last with a slight delay
Easing:      ease-out-expo
```

**6b. Contact Details**
```
Trigger:     300ms after headline animation starts
Duration:    600ms
Animation:   Email and social links fade up (y: 30→0, opacity: 0→1)
Stagger:     100ms between items
Easing:      ease-out
```

**6c. Background Gradient**
```
Trigger:     Contact section enters viewport
Duration:    Scrubbed to scroll
Animation:   Subtle radial gradient appears behind CTA text
             Center glow using accent color at very low opacity (0.05)
             Expands as user scrolls deeper into section
```

#### Mobile
- Character stagger replaced with line-level reveal
- Gradient simplified (static, not scroll-driven)
- Contact details appear immediately after headline

#### Reduced Motion
- Headline appears instantly
- Contact details appear with opacity fade only (300ms)
- No gradient animation

---

### 7. Navigation Animations

#### Behavior

**7a. Scroll-Aware Header**
```
Scroll 0:        Header transparent (no background)
Scroll > 100px:  Header gains backdrop-blur and semi-transparent background
                 Transition: 300ms ease-out
Scroll up:       Header is always visible
Scroll down:     Header slides up and hides (y: 0 → -100%, 300ms)
                 Re-appears immediately when scroll direction changes to up
```

**7b. Active Section Indicator**
```
As user scrolls through sections:
  - Active navigation link gets accent-colored dot below it
  - Dot transitions smoothly between link positions (x animation)
  - Using Intersection Observer to detect active section
```

**7c. Mobile Menu**
```
Open:
  - Overlay background fades in (opacity: 0→1, 300ms)
  - Menu links stagger in from bottom (y: 40→0, stagger: 80ms, 500ms duration)
  - Hamburger morphs to X (rotation animation, 300ms)

Close:
  - Links fade out simultaneously (opacity: 1→0, 200ms)
  - Overlay fades out (opacity: 1→0, 300ms)
  - X morphs back to hamburger (300ms)
```

#### Reduced Motion
- Header shows/hides with opacity only (no y translation)
- Mobile menu appears/disappears instantly (no stagger)
- Active indicator snaps between positions (no smooth x transition)

---

### 8. Project Detail Page Animations

#### Behavior (desktop)

**8a. Page Entry**
```
T+0ms:    Background appears
T+200ms:  Project number (decorative) fades in at large scale
T+400ms:  Project title reveals with clip-path mask (same technique as hero)
T+600ms:  Metadata grid fades up (y: 20→0, opacity: 0→1)
T+800ms:  "Scroll to explore" indicator appears
```

**8b. Case Study Content**
```
Each section heading: word-by-word reveal on enter
Each paragraph: fade-up on enter (y: 30→0, opacity: 0→1)
```

**8c. Gallery Images**
```
Each image: reveal with clip-path inset mask
  inset(0 100% 0 0) → inset(0)  (wipe from left)
  Triggered when image enters viewport
  Duration: 800ms, ease-out-expo
```

**8d. Next/Previous Navigation**
```
Large text "Next Project" scales up subtly on scroll (1 → 1.05)
Hover: shifts right with arrow animation
```

#### Mobile
- Entry sequence simplified (opacity only)
- Gallery images: simple fade-up, no clip-path
- Next/Previous navigation: standard link styling

---

### 9. Scroll Progress Indicator

#### Objective
Provide subtle feedback about scroll position on the homepage.

#### Behavior
```
Position:  Fixed, right edge of viewport
Style:     Thin vertical line (2px wide, accent color)
Animation: Height grows from 0% to 100% as user scrolls through the page
           Scrubbed to scroll position
Visibility: Fades in after hero (scroll > 100vh), fades out at footer
```

#### Mobile
- Hidden (not enough screen real estate)

#### Reduced Motion
- Still visible (it's informational, not decorative motion)

---

### 10. Cursor Interactions (Desktop Only)

#### Objective
Add a layer of sophistication through cursor-aware interactions.

#### Behavior

**10a. Magnetic Buttons**
```
CTA buttons and social links have "magnetic" behavior:
  - When cursor enters a 60px radius around the element
  - Element shifts slightly toward cursor (max 8px in any direction)
  - On exit: element returns to center (spring animation, 300ms)
```

**10b. Custom Cursor (Optional Enhancement)**
```
Default: Small circle (8px), accent-colored outline
On interactive elements: Circle expands (8px → 40px), label appears ("View", "Link")
On text: Circle shrinks (8px → 4px)
Blend mode: difference (for visibility on any background)
```

#### Mobile
- Disabled entirely (no cursor on touch devices)

#### Reduced Motion
- Magnetic effect disabled
- Custom cursor still changes size (it's feedback, not animation)

---

## Animation Performance Budget

| Metric | Target |
|--------|--------|
| Frame rate during animations | ≥ 60fps |
| Max simultaneous GPU layers | 6 |
| Animation library total size | < 80KB gzipped (GSAP + ScrollTrigger + Lenis) |
| Time to interactive | < 3s |
| Scroll-linked animation lag | < 16ms (1 frame) |

### Performance Rules

1. Only animate `transform` and `opacity` (compositor-only properties)
2. Use `will-change` only during active animations, remove after
3. Use `clip-path` for mask reveals (GPU-accelerated in modern browsers)
4. Limit simultaneous ScrollTrigger instances to 10
5. Use `ScrollTrigger.batch()` for repetitive elements (skills, paragraphs)
6. Lazy-register ScrollTrigger instances below the fold
7. Use `requestAnimationFrame` for smooth Lenis/GSAP sync
8. Test on mid-range hardware (not just MacBook Pro)
