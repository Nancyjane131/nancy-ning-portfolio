"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { Timeline } from "@/components/about/Timeline";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {/* Hero */}
      <section className="mb-20">
        <motion.h1
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-5xl md:text-6xl font-display font-bold text-text-primary tracking-tight mb-6"
        >
          Hi, I&apos;m Nancy Ning.
        </motion.h1>
        <motion.p
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="text-base font-sans text-text-secondary leading-relaxed mb-8 max-w-xl"
        >
          {siteConfig.tagline}
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="flex flex-wrap gap-4"
        >
          <Button href={siteConfig.cvPath} variant="primary" download="nancy-ning-cv.pdf">
            <Download size={16} />
            Download CV
          </Button>
          <Button href="/writing" variant="ghost">
            Read my writing
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </section>

      {/* Timeline */}
      <motion.section
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
        className="mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-8">
          How I got here
        </h2>
        <Timeline />
      </motion.section>

      {/* Now Teaser */}
      <motion.section
        variants={fadeUp}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        className="border border-border rounded-xl p-8 bg-surface"
      >
        <h2 className="text-xl font-sans font-semibold text-text-primary mb-3">
          What I&apos;m up to
        </h2>
        <p className="text-sm font-sans text-text-secondary leading-relaxed mb-2">
          Building this portfolio as a way to think in public and make my work
          visible.
        </p>
        <p className="text-sm font-sans text-text-secondary leading-relaxed mb-2">
          Reading <em>The Almanack of Naval Ravikant</em> and thinking about
          leverage and specific knowledge.
        </p>
        <p className="text-sm font-sans text-text-secondary leading-relaxed mb-6">
          Exploring how AI tools can be genuinely useful for non-technical teams
          without collapsing into demos that never ship.
        </p>
        <Link
          href="/now"
          className="inline-flex items-center gap-2 text-sm font-sans font-medium text-accent hover:text-accent-hover transition-colors duration-200"
        >
          See full update <ArrowRight size={14} />
        </Link>
      </motion.section>
    </div>
  );
}
