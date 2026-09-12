"use client";

import React, { useRef } from "react";
import { personalInfo } from "@/data/personal";
import { SplitText } from "@/components/ui/SplitText";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax effect on scroll for the hero visual
      gsap.to(visualRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fade out scroll indicator
      gsap.to(".scroll-indicator", {
        opacity: 0,
        y: 20,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=300",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center pt-24 overflow-hidden section-dark"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <div className="mb-6 overflow-hidden">
            <span className="block font-mono text-accent text-sm md:text-base tracking-widest uppercase opacity-0 animate-[fade-in_1s_ease-out_0.5s_forwards]">
              {personalInfo.title}
            </span>
          </div>

          <h1 className="font-display font-medium text-[12vw] md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-12 backdrop-blur-md bg-white/5 rounded-3xl p-6 md:p-8 -ml-6 md:-ml-8 inline-block shadow-lg border border-white/10">
            {personalInfo.heroHeadline.map((line, i) => (
              <SplitText
                key={i}
                type="words"
                delay={0.8 + i * 0.2}
                stagger={0.08}
                as="div"
              >
                {line}
              </SplitText>
            ))}
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 opacity-0 animate-[fade-in-up_1s_ease-out_1.5s_forwards]">
            <div className="max-w-xl text-text-secondary text-lg md:text-xl lg:text-2xl leading-relaxed">
              <p>{personalInfo.heroSubtitle}</p>
            </div>
            
            <div className="shrink-0 relative group">
              {/* Decorative outer ring */}
              <div className="absolute inset-0 rounded-full border border-accent/40 scale-[1.15] opacity-0 group-hover:scale-[1.25] group-hover:opacity-100 transition-all duration-500"></div>
              {/* Profile Image */}
              <img 
                src="/profile.jpg" 
                alt="Profile" 
                className="w-20 h-20 md:w-28 md:h-28 object-cover rounded-full border-2 border-accent/20 bg-bg-elevated relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Abstract Geometric Visual (CSS only for performance) */}
      <div
        ref={visualRef}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-full md:w-1/2 h-full z-0 pointer-events-none opacity-30 md:opacity-100"
      >
        <div className="absolute top-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 border border-accent/20 rounded-full animate-[spin_60s_linear_infinite]" />
        
        {/* Profile Photo inner circle */}
        <div className="absolute top-1/3 right-1/3 w-48 h-48 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-accent/30 shadow-[0_0_40px_rgba(0,0,0,0.3)]">
          <img 
            src="/profile.jpg" 
            alt="Profile Photo" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(240,237,232,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(240,237,232,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-12 left-6 md:left-12 flex flex-col items-center gap-4 opacity-0 animate-[fade-in_1s_ease-out_2s_forwards]">
        <span className="font-mono text-xs tracking-[0.2em] text-text-tertiary [writing-mode:vertical-rl]">
          SCROLL
        </span>
        <div className="w-[1px] h-12 bg-border relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-accent animate-[slide-down_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  );
}
