"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";
import BlogCard from "@/components/blog/BlogCard";

interface BlogPostClientProps {
  slug: string;
}

export default function BlogPostClient({ slug }: BlogPostClientProps) {
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  // If not enough related posts in same category, fill with recent posts
  const otherPosts =
    relatedPosts.length < 2
      ? blogPosts
          .filter(
            (p) =>
              p.id !== post.id && !relatedPosts.find((rp) => rp.id === p.id)
          )
          .slice(0, 2 - relatedPosts.length)
      : [];

  const recommended = [...relatedPosts, ...otherPosts];

  // Simple markdown-like rendering for content
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (line.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="font-display text-2xl font-semibold text-deep-ocean mt-10 mb-4 tracking-tight"
          >
            {line.replace("## ", "")}
          </h2>
        );
      }
      if (line.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="font-display text-xl font-semibold text-deep-ocean mt-8 mb-3 tracking-tight"
          >
            {line.replace("### ", "")}
          </h3>
        );
      }
      if (line.startsWith("| ")) {
        // Table row - simple rendering
        const cells = line
          .split("|")
          .filter((c) => c.trim())
          .map((c) => c.trim());
        if (cells.every((c) => c.match(/^[-]+$/))) return null; // separator row
        const isHeader = i > 0; // Simplified check
        return (
          <div
            key={i}
            className="grid grid-cols-3 gap-4 py-2 border-b border-sand-medium/50 text-sm font-body"
          >
            {cells.map((cell, j) => (
              <span
                key={j}
                className={j === 0 ? "font-semibold text-deep-ocean" : "text-drift-gray"}
              >
                {cell}
              </span>
            ))}
          </div>
        );
      }
      if (line.startsWith("- **")) {
        const match = line.match(/- \*\*(.+?)\*\*:?\s*(.*)/);
        if (match) {
          return (
            <li key={i} className="text-drift-gray font-body leading-relaxed mb-2 ml-4">
              <strong className="text-deep-ocean">{match[1]}</strong>
              {match[2] ? `: ${match[2]}` : ""}
            </li>
          );
        }
      }
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="text-drift-gray font-body leading-relaxed mb-2 ml-4">
            {line.replace("- ", "")}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <li key={i} className="text-drift-gray font-body leading-relaxed mb-2 ml-4 list-decimal">
            {line.replace(/^\d+\.\s/, "")}
          </li>
        );
      }
      if (line.trim() === "") {
        return <div key={i} className="h-2" />;
      }
      // Bold text handling
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={i} className="text-drift-gray font-body leading-relaxed mb-2">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="text-deep-ocean">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <main className="pt-28 pb-24 lg:pb-32">
      {/* Hero */}
      <div className="relative h-[400px] md:h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${post.image}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean via-deep-ocean/50 to-deep-ocean/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 lg:px-8 pb-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-body transition-colors mb-6"
              >
                <ArrowLeft size={16} strokeWidth={1.5} />
                Back to Blog
              </Link>
              <span className="block bg-tropical-teal text-white text-xs font-body font-semibold uppercase tracking-wider px-3 py-1 rounded-full w-fit mb-4">
                {post.category}
              </span>
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-5 text-white/70 text-sm font-body">
                <span className="flex items-center gap-1.5">
                  <User size={14} strokeWidth={1.5} />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} strokeWidth={1.5} />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={14} strokeWidth={1.5} />
                  {post.readTime}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-4xl mx-auto px-6 lg:px-8 mt-12"
      >
        <article className="prose-custom">{renderContent(post.content)}</article>
      </motion.div>

      {/* Related Posts */}
      {recommended.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-24">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-deep-ocean tracking-tight mb-8 text-center">
            More Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {recommended.map((rPost) => (
              <BlogCard key={rPost.id} post={rPost} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
