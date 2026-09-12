"use client";

import React, { useRef } from "react";
import { personalInfo } from "@/data/personal";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/components/ui/SplitText";

export function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Magnetic button effect
      const btn = document.querySelector(".magnetic-btn");
      if (btn && !window.matchMedia("(hover: none)").matches) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.8,
            ease: "power3.out",
          });
        };

        const handleMouseLeave = () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
          });
        };

        btn.addEventListener("mousemove", handleMouseMove as any);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          btn.removeEventListener("mousemove", handleMouseMove as any);
          btn.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    },
    { scope: containerRef }
  );

  return (
    <Section id="contact" variant="dark" className="border-t border-border">
      <div ref={containerRef} className="flex flex-col items-center text-center py-12 md:py-24">
        <span className="category-tag mb-12">[CONTACT]</span>
        
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl font-medium mb-12">
          <SplitText type="words" trigger="scroll">
            Let's build
            something great.
          </SplitText>
        </h2>
        
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mb-16">
          Have a project in mind? I'm always open to discussing new opportunities, creative collaborations, and interesting challenges.
        </p>
        
        <div className="magnetic-btn-wrapper p-8">
          <Button 
            href={`mailto:${personalInfo.email}`} 
            size="lg"
            className="magnetic-btn text-lg w-48 h-48 rounded-full !px-0 bg-transparent border border-border hover:bg-accent hover:border-accent hover:text-bg-primary"
          >
            Get In Touch
          </Button>
        </div>
        
        {/* Availability indicator */}
        <div className="mt-16 flex items-center gap-3 text-sm text-text-tertiary">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
          </span>
          Available for freelance opportunities
        </div>
      </div>
    </Section>
  );
}
