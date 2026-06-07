import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { calculateReadingTime } from "./utils";

const writingDirectory = path.join(process.cwd(), "src/content/writing");

export interface ArticleFrontmatter {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}

export interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  content: string;
  readingTime: number;
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(writingDirectory)) {
    return [];
  }

  const fileNames = fs
    .readdirSync(writingDirectory)
    .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"));

  const articles = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.(mdx|md)$/, "");
    const fullPath = path.join(writingDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data as ArticleFrontmatter,
      content,
      readingTime: calculateReadingTime(content),
    };
  });

  return articles.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getArticleBySlug(slug: string): Article | null {
  const mdxPath = path.join(writingDirectory, `${slug}.mdx`);
  const mdPath = path.join(writingDirectory, `${slug}.md`);

  const fullPath = fs.existsSync(mdxPath)
    ? mdxPath
    : fs.existsSync(mdPath)
    ? mdPath
    : null;

  if (!fullPath) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as ArticleFrontmatter,
    content,
    readingTime: calculateReadingTime(content),
  };
}
