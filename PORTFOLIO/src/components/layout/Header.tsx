"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks } from "@/data/navigation";
import { usePathname } from "next/navigation";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial scroll position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        scrolled
          ? "py-4 bg-bg-primary/80 backdrop-blur-md border-b border-border"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm tracking-widest uppercase hover:text-accent transition-colors"
          onClick={() => setMobileMenuOpen(false)}
        >
          MEDHAWIN.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => {
            // If on home page and it's a hash link, keep it as hash
            // If on project page, prepend with / to navigate back to home
            const href =
              isHome || !link.href.startsWith("#")
                ? link.href
                : `/${link.href}`;

            return (
              <Link key={link.label} href={href}>
                <LiquidButton size="sm">
                  {link.label}
                </LiquidButton>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden flex flex-col items-end justify-center space-y-1.5 w-8 h-8 group"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          <span
            className={`block h-0.5 bg-current transition-all duration-300 ${
              mobileMenuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"
            }`}
          />
          <span
            className={`block h-0.5 bg-current transition-all duration-300 ${
              mobileMenuOpen ? "opacity-0" : "w-4 group-hover:w-6"
            }`}
          />
          <span
            className={`block h-0.5 bg-current transition-all duration-300 ${
              mobileMenuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-5 group-hover:w-6"
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-bg-primary z-40 transition-transform duration-500 ease-in-out-expo md:hidden flex flex-col justify-center px-8 ${
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ top: "var(--header-height, 70px)" }} // Adjust to start below header if needed, or overlay everything
      >
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
           {/* If we want header inside overlay */}
        </div>
        <nav className="flex flex-col space-y-8">
          {navLinks.map((link, i) => {
             const href =
             isHome || !link.href.startsWith("#")
               ? link.href
               : `/${link.href}`;
             return (
              <Link
                key={link.label}
                href={href}
                className={`text-4xl font-display font-medium uppercase tracking-wider transition-all duration-500 delay-${i * 100} ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} hover:text-accent`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  );
}
