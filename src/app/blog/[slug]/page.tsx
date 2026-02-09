import type { Metadata } from "next";
import { blogPosts } from "@/data/blogPosts";
import BlogPostClient from "./BlogPostClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post Not Found | Belize Fishing",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: `${post.title} | Belize Fishing Blog`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogPostClient slug={slug} />;
}
