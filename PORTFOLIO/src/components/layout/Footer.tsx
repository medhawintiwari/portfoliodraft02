import React from "react";
import Link from "next/link";
import { personalInfo } from "@/data/personal";
import { navLinks } from "@/data/navigation";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-primary border-t border-border pt-16 pb-8 section-dark">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Column 1: Info */}
          <div className="col-span-1">
            <Link href="/" className="font-mono text-xl tracking-widest uppercase mb-6 inline-block">
              {personalInfo.name}.
            </Link>
            <p className="text-text-secondary mb-6 max-w-sm">
              {personalInfo.tagline}
            </p>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="text-accent hover:text-accent-hover transition-colors font-medium inline-flex items-center"
            >
              {personalInfo.email}
              <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

          {/* Column 2: Navigation */}
          <div className="col-span-1 flex flex-col space-y-4">
            <h4 className="font-mono text-xs tracking-widest uppercase text-text-tertiary mb-2">Explore</h4>
            {navLinks.map((link) => (
              <Link 
                key={link.label} 
                href={link.href.startsWith("#") ? `/${link.href}` : link.href}
                className="text-text-secondary hover:text-text-primary transition-colors w-fit"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Column 3: Social */}
          <div className="col-span-1 flex flex-col space-y-4">
            <h4 className="font-mono text-xs tracking-widest uppercase text-text-tertiary mb-2">Connect</h4>
            {Object.entries(personalInfo.social).map(([platform, url]) => (
              url && (
                <a 
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors capitalize w-fit flex items-center"
                >
                  {platform}
                  <svg className="w-3 h-3 ml-1 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </a>
              )
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border text-xs text-text-tertiary">
          <p>© {currentYear} {personalInfo.name}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Designed & Built with <span className="text-accent">♥</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
