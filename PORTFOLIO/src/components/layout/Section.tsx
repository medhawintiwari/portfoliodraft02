import React from "react";

interface SectionProps {
  id: string;
  variant?: "dark" | "light";
  className?: string;
  fullBleed?: boolean;
  children: React.ReactNode;
}

export function Section({
  id,
  variant = "dark",
  className = "",
  fullBleed = false,
  children,
}: SectionProps) {
  const bgClass = variant === "dark" ? "section-dark" : "section-light";
  const paddingClass = "py-20 md:py-24 lg:py-32";

  return (
    <section id={id} className={`${bgClass} ${paddingClass} ${className}`}>
      {fullBleed ? (
        children
      ) : (
        <div className="container mx-auto px-6 md:px-8 lg:px-12">
          {children}
        </div>
      )}
    </section>
  );
}
