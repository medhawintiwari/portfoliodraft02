"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface SplitTextProps {
  children: string;
  type?: "words" | "lines" | "chars";
  delay?: number;
  duration?: number;
  stagger?: number;
  trigger?: "load" | "scroll";
  className?: string;
  as?: React.ElementType;
}

export function SplitText({
  children,
  type = "words",
  delay = 0,
  duration = 1,
  stagger = 0.05,
  trigger = "load",
  className = "",
  as: Component = "div",
}: SplitTextProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Respect reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".split-inner", { y: 0, opacity: 1 });
        return;
      }

      const elements = gsap.utils.toArray(".split-inner", containerRef.current);

      if (elements.length === 0) return;

      const animationConfig = {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease: "power4.out",
        delay: trigger === "load" ? delay : 0,
      };

      if (trigger === "load") {
        gsap.to(elements, animationConfig);
      } else {
        gsap.to(elements, {
          ...animationConfig,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%", // Starts animation when element is 85% from top of viewport
            toggleActions: "play none none reverse", // Play when scrolling down, reverse when scrolling up
          },
        });
      }
    },
    { scope: containerRef }
  );

  // Super basic manual splitting function to avoid requiring a commercial GSAP SplitText license
  const splitContent = () => {
    if (type === "words") {
      return children.split(" ").map((word, i) => (
        <span key={i} className="split-word mr-[0.25em]">
          <span className="split-word-inner split-inner opacity-0">
            {word}
          </span>
        </span>
      ));
    }

    if (type === "chars") {
      return children.split("").map((char, i) => (
        <span key={i} className="split-word">
          <span className="split-word-inner split-inner opacity-0">
            {char === " " ? "\u00A0" : char}
          </span>
        </span>
      ));
    }

    // Default to lines (naive split by newline characters if present)
    return children.split("\n").map((line, i) => (
      <span key={i} className="split-line">
        <span className="split-line-inner split-inner opacity-0">
          {line}
        </span>
      </span>
    ));
  };

  return (
    <Component ref={containerRef} className={className}>
      {splitContent()}
    </Component>
  );
}
