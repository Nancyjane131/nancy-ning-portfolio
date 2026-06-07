import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArticleList } from "@/components/writing/ArticleList";
import { getAllArticles } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Writing",
  description: "Thoughts on things I'm learning and thinking through.",
};

export default function WritingPage() {
  const articles = getAllArticles();

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <PageHeader
        title="Writing"
        subtitle="Thoughts on things I'm learning and thinking through."
      />
      <ArticleList articles={articles} />
    </div>
  );
}
