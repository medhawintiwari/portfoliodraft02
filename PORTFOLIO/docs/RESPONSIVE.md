# Responsive Design Specification

## Overview

The portfolio uses a mobile-first CSS approach through Tailwind CSS. All styles apply to mobile by default, with `sm:`, `md:`, `lg:`, and `xl:` modifiers used to adjust the design for larger screens.

The scroll choreography and animations scale down in complexity as the screen size decreases, prioritizing performance and usability on touch devices.

---

## Breakpoints

| Name | Tailwind Prefix | Min-Width | Target Devices |
|------|-----------------|-----------|----------------|
| Base | (none) | 0px | Mobile Portrait (320px - 639px) |
| Small | `sm:` | 640px | Large Mobile / Small Tablet (640px - 767px) |
| Medium | `md:` | 768px | Tablet Portrait (768px - 1023px) |
| Large | `lg:` | 1024px | Tablet Landscape / Small Laptop (1024px - 1279px) |
| Extra Large | `xl:` | 1280px | Standard Desktop (1280px - 1535px) |
| 2X Large | `2xl:` | 1536px | Large Desktop (1536px+) |

---

## Typography Scaling

| Element | Mobile (Base) | Tablet (`md:`) | Desktop (`lg:`) | Large (`2xl:`) |
|---------|---------------|----------------|-----------------|----------------|
| Hero Headline | `text-4xl` (40px) | `text-5xl` (56px) | `text-7xl` (96px) | `text-7xl` (96px) |
| Hero Subtitle | `text-lg` (18px) | `text-xl` (20px) | `text-2xl` (24px) | `text-2xl` (24px) |
| Section Title | `text-3xl` (32px) | `text-4xl` (40px) | `text-5xl` (56px) | `text-5xl` (56px) |
| Card Title | `text-xl` (20px) | `text-2xl` (24px) | `text-3xl` (32px) | `text-3xl` (32px) |
| Body Text | `text-base` (16px) | `text-base` (16px) | `text-lg` (18px) | `text-lg` (18px) |
| Metadata | `text-xs` (12px) | `text-xs` (12px) | `text-sm` (14px) | `text-sm` (14px) |

---

## Spacing Scaling

| Element | Mobile (Base) | Tablet (`md:`) | Desktop (`lg:`) |
|---------|---------------|----------------|-----------------|
| Section Y-Padding | `py-20` (80px) | `py-24` (96px) | `py-32` (128px) |
| Container X-Padding | `px-6` (24px) | `px-8` (32px) | `px-12` (48px) |
| Gap between sections | `gap-12` (48px) | `gap-16` (64px) | `gap-24` (96px) |

---

## Layout Adjustments

### Navigation
- **Mobile (< 768px)**: Logo + hamburger menu. Clicking hamburger opens full-screen overlay.
- **Tablet/Desktop (≥ 768px)**: Horizontal navigation with active section indicator.

### Hero Section
- **Mobile**: Headline stacked, subheadline below. Geometric visual element is smaller and placed at the bottom or behind text (low opacity).
- **Desktop**: Asymmetric layout, headline left-aligned, visual element on the right.

### About Section
- **Mobile**: Single column. Text paragraphs stack on top of skills grid.
- **Tablet/Desktop**: Two-column layout. Text on left, skills grid on right.

### Work Section (Project Cards)
- **Mobile**: Stacked layout. Image full width, content below.
- **Tablet/Desktop**: Horizontal layout within card or large image with content overlay.

### Project Detail Page
- **Mobile**: Single column. Metadata stacked.
- **Tablet/Desktop**: Two-column layout for case study content (narrow text column, wide image column). Metadata arranged in a horizontal grid.

### Footer
- **Mobile**: Stacked layout. Center-aligned.
- **Tablet/Desktop**: Three-column layout. Left-aligned, center-aligned, right-aligned.

---

## Animation Simplification (Mobile)

On touch devices (detected via media query `@media (hover: none) and (pointer: coarse)` and/or screen size), animations are simplified to prioritize performance and usability:

1. **No Scroll Pinning**: The Work section does not pin on mobile. Projects flow naturally down the page.
2. **Simplified Reveals**: Complex `clip-path` reveals (like word-by-word text animation) are replaced with simpler `fade-up` or line-by-line animations.
3. **No Parallax**: Elements scroll at standard speed.
4. **No Hover Effects**: Interactive elements use active/focus states instead of hover states.
5. **No Custom Cursor**: Disabled entirely.

---

## Touch Interactions

1. **Tap Targets**: Minimum 44x44px for all buttons, links, and navigation items.
2. **Scroll Overflow**: Horizontal scrolling (if used) requires `overscroll-behavior-x: contain` to prevent accidental back/forward navigation gestures.
3. **Double-Tap**: Prevent double-tap to zoom on interactive elements (`touch-action: manipulation`).

---

## Overflow Rules

1. **Horizontal Scroll**: `overflow-x-hidden` on the `<main>` wrapper to prevent horizontal scrolling unless explicitly intended (e.g., a horizontal scrolling section).
2. **Body Lock**: When the mobile menu is open, `overflow-hidden` is applied to `<body>` to prevent background scrolling.
