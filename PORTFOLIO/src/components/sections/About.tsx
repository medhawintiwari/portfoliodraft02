"use client";

import React, { useRef } from "react";
import { personalInfo } from "@/data/personal";
import { Section } from "@/components/layout/Section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/components/ui/SplitText";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Fade up paragraphs sequentially
      gsap.from(".about-paragraph", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-text-container",
          start: "top 80%",
        },
      });

      // Stagger in skill categories
      gsap.from(".skill-category", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 85%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <Section id="about" variant="light" className="relative">
      <div ref={containerRef} className="max-w-7xl mx-auto">
        <span className="category-tag">[ABOUT]</span>
        
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium mb-16 md:mb-24 leading-tight">
          <SplitText type="lines" trigger="scroll">
            Building at the intersection
            of code and design.
          </SplitText>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Left Column: Text */}
          <div className="about-text-container lg:col-span-7 flex flex-col space-y-8 text-lg md:text-xl text-text-dark-muted leading-relaxed">
            {personalInfo.about.map((paragraph, i) => (
              <p key={i} className="about-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right Column: Skills Grid */}
          <div className="skills-container lg:col-span-4 lg:col-start-9">
            <h3 className="font-mono text-sm tracking-widest uppercase text-text-dark mb-8 border-b border-border-light pb-4">
              Core Capabilities
            </h3>
            
            <div className="flex flex-col space-y-10">
              {personalInfo.skills.map((skillGroup, i) => (
                <div key={i} className="skill-category">
                  <h4 className="text-text-dark font-medium mb-4">
                    {skillGroup.category}
                  </h4>
                  <ul className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, j) => (
                      <li 
                        key={j}
                        className="text-sm px-3 py-1.5 bg-bg-light-alt text-text-dark-muted rounded-sm border border-black/5"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
