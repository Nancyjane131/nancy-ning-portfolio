import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  children: React.ReactNode;
  className?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
}

export function Button({
  href,
  onClick,
  variant = "primary",
  children,
  className,
  download,
  target,
  rel,
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-sans font-medium transition-colors duration-200 cursor-pointer";
  const variants = {
    primary: "bg-accent text-white hover:bg-accent-hover",
    ghost:
      "border border-border text-text-primary hover:border-accent hover:text-accent bg-transparent",
  };
  const classes = cn(base, variants[variant], className);

  if (href) {
    if (href.startsWith("http") || href.startsWith("/cv/")) {
      return (
        <a
          href={href}
          className={classes}
          download={download}
          target={target}
          rel={rel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
