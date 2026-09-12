# Testing Strategy

## Overview

The testing strategy ensures the portfolio meets the highest standards for performance, accessibility, responsiveness, and animation fluidity. Since this is a static portfolio, testing focuses on rendering, interaction, and delivery rather than complex state logic.

---

## 1. Functional Testing

### Navigation
- [ ] Clicking header links smooth-scrolls to correct section on homepage
- [ ] Header active state updates correctly based on scroll position
- [ ] Mobile menu opens/closes without breaking layout
- [ ] Project page "Back to Home" navigates to homepage and scrolls to Work section
- [ ] Next/Previous project links navigate correctly and wrap at ends

### Content
- [ ] All `[PLACEHOLDER]` text has been replaced with real content
- [ ] Email link opens default mail client with correct `mailto:` address
- [ ] External social links open in new tabs (`target="_blank"`)
- [ ] 404 page renders correctly for invalid routes

---

## 2. Responsive Testing

Test across the following viewports:
- Mobile Portrait (320px, 375px, 414px)
- Mobile Landscape / Tablet Portrait (768px)
- Laptop (1024px, 1280px)
- Desktop (1440px, 1920px)

### Checklist
- [ ] No horizontal scrolling on any viewport (except intentional horizontal scroll sections)
- [ ] Typography scales readably (no text clipping)
- [ ] Spacing remains proportional
- [ ] Images scale correctly without distortion
- [ ] Touch targets on mobile are easily tappable (min 44x44px)

---

## 3. Animation Testing

### Performance (60fps Target)
- [ ] Open Chrome DevTools > Rendering > Frame Rendering Stats
- [ ] Scroll continuously from top to bottom
- [ ] Verify FPS remains near 60 (no significant drops during scroll triggers)
- [ ] Verify GPU memory usage doesn't spike excessively

### Choreography
- [ ] Hero animations complete before scroll is required
- [ ] Pinned Work section transitions smoothly between projects
- [ ] Mask reveals trigger exactly when entering viewport
- [ ] Hover effects execute smoothly without layout shifts

### Fallbacks
- [ ] Enable OS-level "Reduce Motion" setting
- [ ] Verify Lenis smooth scroll is disabled
- [ ] Verify complex GSAP animations are replaced with instant/opacity transitions
- [ ] Verify Work section pinning is disabled or simplified

---

## 4. Accessibility (a11y) Testing

### Automated (Lighthouse / axe DevTools)
- [ ] Target score: 100
- [ ] Run axe DevTools browser extension on homepage and project pages
- [ ] Fix all critical and serious violations

### Manual
- [ ] **Keyboard Navigation**: Traverse entire site using only `Tab` and `Enter`. Ensure focus indicator is visible at all times.
- [ ] **Screen Reader**: Test with VoiceOver (macOS) or NVDA (Windows). Ensure semantic order makes sense.
- [ ] **Contrast**: Verify all text meets WCAG AA (4.5:1 for regular text).
- [ ] **Zoom**: Verify layout doesn't break at 200% browser zoom.

---

## 5. Performance Testing

### Web Vitals (Lighthouse)
- Target score: > 90 on Mobile, 100 on Desktop
- Run testing in Incognito mode with disabled extensions
- **LCP (Largest Contentful Paint)**: < 2.5s (Ensure hero text/image is not lazy-loaded)
- **FID/INP (Interaction to Next Paint)**: < 200ms
- **CLS (Cumulative Layout Shift)**: < 0.1 (Ensure images have explicit width/height)

### Network
- [ ] Total page weight < 1.5MB (excluding video)
- [ ] All images served in WebP/AVIF format
- [ ] Below-fold images are lazy-loaded
- [ ] Fonts use `display: swap`

---

## 6. SEO Testing

### Meta Tags
- [ ] Verify `<title>` and `<meta name="description">` on all pages
- [ ] Verify Open Graph tags (`og:title`, `og:image`, etc.) using [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Verify Twitter Card tags using [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Technical SEO
- [ ] Verify `sitemap.xml` generates correctly and includes all project pages
- [ ] Verify `robots.txt` is present and allows crawling
- [ ] Verify structured data (JSON-LD) using [Schema Markup Validator](https://validator.schema.org/)
- [ ] Ensure only one `<h1>` per page

---

## 7. Cross-Browser Testing

Verify core functionality and layout in current versions of:
- [ ] Chrome (Windows/macOS)
- [ ] Safari (macOS/iOS) - Pay special attention to 100vh behavior (use `100dvh`)
- [ ] Firefox (Windows/macOS)
- [ ] Edge (Windows)

---

## Pre-Deployment Acceptance Checklist

- [ ] `npm run build` succeeds without errors or warnings
- [ ] `npm run lint` passes
- [ ] TypeScript compilation passes (`tsc --noEmit`)
- [ ] All placeholder content replaced
- [ ] Lighthouse scores >= 90/100/100/100 (Perf/A11y/Best Practices/SEO)
- [ ] Checked on physical mobile device
