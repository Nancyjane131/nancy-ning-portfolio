import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/lib/mdx";

interface ArticleItemProps {
  article: Article;
}

export function ArticleItem({ article }: ArticleItemProps) {
  const { slug, frontmatter, readingTime } = article;

  return (
    <article className="group">
      <Link href={`/writing/${slug}`} className="block">
        <h2 className="text-xl font-sans font-semibold text-text-primary group-hover:text-accent transition-colors duration-200 mb-2">
          {frontmatter.title}
        </h2>
      </Link>
      <div className="flex items-center gap-3 text-sm font-sans text-text-tertiary mb-3">
        <time>{formatDate(frontmatter.date)}</time>
        <span>·</span>
        <span>{readingTime} min read</span>
      </div>
      {frontmatter.excerpt && (
        <p className="text-sm font-sans text-text-secondary leading-relaxed mb-4">
          {frontmatter.excerpt}
        </p>
      )}
      {frontmatter.tags && frontmatter.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      )}
    </article>
  );
}
