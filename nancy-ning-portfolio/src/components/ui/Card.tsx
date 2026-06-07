"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className={cn(
        "bg-surface border border-border rounded-xl p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
