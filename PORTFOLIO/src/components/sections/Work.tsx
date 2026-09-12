"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/ui/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function Work() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Respect reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const slides = gsap.utils.toArray(".project-slide") as HTMLElement[];
      const totalWidth = slides.length * 100; // 100vw per slide

      // Set explicit width on container to hold all slides horizontally
      gsap.set(slidesRef.current, { width: `${totalWidth}vw` });

      // Horizontal Scroll Theater animation
      gsap.to(slidesRef.current, {
        xPercent: -100 * (slides.length - 1) / slides.length,
        ease: "none",
        scrollTrigger: {
          trigger: scrollWrapperRef.current,
          pin: true,
          start: "top top",
          end: `+=${window.innerHeight * slides.length}`,
          scrub: 1,
          snap: {
            snapTo: 1 / (slides.length - 1),
            duration: 0.5,
            delay: 0.1,
            ease: "power1.inOut"
          }
        },
      });

      // Individual slide entry animations
      slides.forEach((slide, i) => {
        const img = slide.querySelector(".project-img");
        const content = slide.querySelector(".project-content");
        
        // Initial setup
        gsap.set(img, { scale: 1.2, clipPath: "inset(10% 10% 10% 10%)" });
        gsap.set(content, { opacity: 0, x: 50 });

        // Animation when slide comes into view
        // Since we are horizontally scrolling inside a pin, we use containerAnimation
        gsap.to(img, {
          scale: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "power2.out",
          scrollTrigger: {
            trigger: slide,
            containerAnimation: gsap.getById("scrollTheater"), // need to name the tween above or use scrub
            start: "left center",
            toggleActions: "play reverse play reverse",
          }
        });
        
        // Simpler approach for React without containerAnimation ID tracking
        ScrollTrigger.create({
          trigger: slide,
          containerAnimation: ScrollTrigger.getAll().find(st => st.pin === scrollWrapperRef.current)?.animation,
          start: "left 70%",
          onEnter: () => {
            gsap.to(img, { scale: 1, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power3.out" });
            gsap.to(content, { opacity: 1, x: 0, duration: 0.8, delay: 0.3, ease: "power2.out" });
          },
          onLeaveBack: () => {
            gsap.to(img, { scale: 1.1, clipPath: "inset(5% 5% 5% 5%)", duration: 0.8 });
            gsap.to(content, { opacity: 0, x: 20, duration: 0.5 });
          }
        });
      });
    },
    { scope: containerRef, dependencies: [projects.length] }
  );

  return (
    <div id="work" ref={containerRef} className="bg-bg-primary text-text-primary">
      {/* Intro section (not pinned) */}
      <div className="container mx-auto px-6 py-24 md:py-32">
        <span className="category-tag">[WORK]</span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl font-medium leading-tight max-w-3xl">
            <SplitText type="lines" trigger="scroll">
              Selected projects.
            </SplitText>
          </h2>
          <p className="text-text-secondary max-w-sm text-lg">
            A curated selection of recent work. Each project represents a different challenge and approach.
          </p>
        </div>
      </div>

      {/* Pinned horizontal scroll section */}
      <div ref={scrollWrapperRef} className="h-screen w-full overflow-hidden relative border-y border-border">
        {/* Progress Indicator */}
        <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20 flex gap-2 mix-blend-difference text-white">
          <span className="font-mono text-sm">01</span>
          <div className="w-16 h-[1px] bg-white/30 mt-2.5 relative overflow-hidden">
            <div className="absolute top-0 left-0 h-full bg-white w-full origin-left scale-x-0" id="work-progress" />
          </div>
          <span className="font-mono text-sm">0{projects.length}</span>
        </div>

        {/* Slides Container */}
        <div ref={slidesRef} className="flex h-full will-change-transform">
          {projects.map((project, index) => (
            <div 
              key={project.slug} 
              className="project-slide w-screen h-full flex items-center justify-center p-6 md:p-12 lg:p-24 relative"
            >
              <div className="w-full h-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative">
                
                {/* Visual */}
                <div className="w-full lg:w-3/5 h-[50vh] lg:h-[70vh] relative overflow-hidden bg-bg-elevated rounded-sm">
                  {/* Assuming image paths in data exist, else use colored blocks */}
                  <div className="project-img w-full h-full relative">
                    <div className="absolute inset-0 bg-accent/10" />
                    <img 
                      src={project.thumbnail} 
                      alt={project.title}
                      className="object-cover w-full h-full opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.classList.add('flex', 'items-center', 'justify-center');
                        e.currentTarget.parentElement!.innerHTML = `<span class="font-mono text-accent/50 text-xl tracking-widest uppercase">${project.title} Visual</span>`;
                      }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="project-content w-full lg:w-2/5 flex flex-col z-10 bg-bg-primary/80 lg:bg-transparent p-6 lg:p-0 backdrop-blur-md lg:backdrop-blur-none -mt-20 lg:mt-0 border border-border lg:border-none">
                  <div className="font-mono text-sm tracking-widest text-text-tertiary mb-6 flex items-center gap-4">
                    <span>0{index + 1}</span>
                    <span className="w-8 h-[1px] bg-border" />
                    <span>{project.year}</span>
                  </div>
                  
                  <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-6">
                    {project.title}
                  </h3>
                  
                  <ul className="flex flex-wrap gap-x-4 gap-y-2 mb-8 text-sm text-text-secondary font-mono">
                    <li>{project.category}</li>
                    <li className="text-border">•</li>
                    <li>{project.role}</li>
                  </ul>
                  
                  <p className="text-text-secondary text-lg mb-10 leading-relaxed max-w-md">
                    {project.description}
                  </p>
                  
                  <Button variant="secondary" href={`/work/${project.slug}`} className="w-fit">
                    View Case Study
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
