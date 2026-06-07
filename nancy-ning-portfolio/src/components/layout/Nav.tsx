"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/now", label: "Now" },
];

export function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display font-bold text-lg text-text-primary hover:text-accent transition-colors duration-200"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "relative text-sm font-sans font-medium transition-colors duration-200 group",
                    isActive
                      ? "text-text-primary font-semibold"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-200",
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-text-primary"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <ul className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map(({ href, label }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      "text-sm font-sans font-medium",
                      isActive
                        ? "text-text-primary font-semibold"
                        : "text-text-secondary"
                    )}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
