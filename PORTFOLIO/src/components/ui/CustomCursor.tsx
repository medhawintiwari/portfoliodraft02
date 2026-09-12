"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    
    // Hide default cursor globally
    document.body.style.cursor = "none";
    
    // Overwrite default pointer cursor on interactive elements via CSS injection
    const style = document.createElement("style");
    style.innerHTML = `
      * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.body.style.cursor = "auto";
      document.head.removeChild(style);
    };
  }, [isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Small dot that closely follows the mouse */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 40,
          mass: 0.1,
        }}
      />
      {/* Larger trailing circle with glow/expand effect */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-accent/50 rounded-full pointer-events-none z-[9998] mix-blend-difference hidden md:flex items-center justify-center"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? "var(--color-accent, rgba(255, 255, 255, 0.2))" : "transparent",
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 25,
          mass: 0.5,
        }}
      />
    </>
  );
}
