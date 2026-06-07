import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Now",
  description: "What Nancy Ning is up to right now.",
};

export default function NowPage() {
  const filePath = path.join(process.cwd(), "src/content/now.mdx");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const lastUpdated = (data as { lastUpdated?: string }).lastUpdated ?? "Recently";

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <PageHeader title="Now" subtitle={`Last updated: ${lastUpdated}`} />

      <article className="prose prose-stone max-w-2xl font-sans prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <MDXRemote source={content} />
      </article>

      <footer className="mt-16 pt-8 border-t border-border">
        <p className="text-sm font-sans text-text-tertiary">
          This is a{" "}
          <Link
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            /now page
          </Link>{" "}
          — a concept by Derek Sivers.
        </p>
      </footer>
    </div>
  );
}
