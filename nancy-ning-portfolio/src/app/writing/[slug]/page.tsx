import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Tag } from "@/components/ui/Tag";
import { getAllArticles, getArticleBySlug } from "@/lib/mdx";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const { frontmatter, content, readingTime } = article;

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {/* Article header */}
      <header className="mb-12">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary tracking-tight mb-4">
          {frontmatter.title}
        </h1>
        <div className="flex items-center gap-3 text-sm font-sans text-text-tertiary mb-4">
          <time>{formatDate(frontmatter.date)}</time>
          <span>·</span>
          <span>{readingTime} min read</span>
        </div>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        )}
      </header>

      {/* Article body */}
      <article className="prose prose-stone max-w-2xl font-sans prose-headings:font-display prose-headings:font-bold prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <MDXRemote source={content} />
      </article>

      {/* Footer */}
      <footer className="mt-16 pt-8 border-t border-border">
        <Link
          href="/writing"
          className="inline-flex items-center gap-2 text-sm font-sans font-medium text-text-secondary hover:text-text-primary transition-colors duration-200"
        >
          <ArrowLeft size={14} />
          Back to Writing
        </Link>
      </footer>
    </div>
  );
}
