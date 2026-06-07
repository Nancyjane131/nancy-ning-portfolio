import { ArticleItem } from "./ArticleItem";
import { Divider } from "@/components/ui/Divider";
import type { Article } from "@/lib/mdx";

interface ArticleListProps {
  articles: Article[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return (
    <div>
      {articles.map((article, index) => (
        <div key={article.slug}>
          <ArticleItem article={article} />
          {index < articles.length - 1 && <Divider />}
        </div>
      ))}
    </div>
  );
}
