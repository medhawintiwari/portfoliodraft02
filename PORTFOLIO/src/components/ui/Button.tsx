import React from "react";
import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external,
  icon,
  children,
  onClick,
  className = "",
  type = "button",
}: ButtonProps) {
  // Base classes for all buttons
  const baseClasses =
    "inline-flex items-center justify-center font-mono text-sm tracking-widest uppercase transition-all duration-300 ease-out-expo outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary";

  // Variant classes
  const variantClasses = {
    primary:
      "bg-accent text-bg-primary hover:bg-accent-hover active:scale-[0.98]",
    secondary:
      "bg-transparent border border-border text-text-primary hover:border-accent hover:text-accent active:scale-[0.98]",
    ghost:
      "bg-transparent text-text-secondary hover:text-accent active:scale-[0.98]",
    link: "bg-transparent text-accent hover:text-accent-hover underline-offset-4 hover:underline !p-0",
  };

  // Size classes
  const sizeClasses = {
    sm: "h-10 px-6 text-xs",
    md: "h-12 px-8 text-sm",
    lg: "h-14 px-10 text-base",
  };

  // Combine classes
  const classes = `${baseClasses} ${variantClasses[variant]} ${
    variant !== "link" ? sizeClasses[size] : ""
  } ${className}`;

  // Render content with optional icon
  const content = (
    <>
      {children}
      {icon && <span className="ml-2 flex-shrink-0">{icon}</span>}
    </>
  );

  // Return Link if href is provided and internal
  if (href && !external && !href.startsWith("http")) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  // Return standard a tag if href is external
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  // Return standard button
  return (
    <button type={type} className={classes} onClick={onClick}>
      {content}
    </button>
  );
}
