"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { BlogPost } from "@/types";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden aspect-[16/10] mb-5">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${post.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-ocean/40 to-transparent" />
          <span className="absolute top-4 left-4 bg-tropical-teal text-white text-xs font-body font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-drift-gray text-xs font-body mb-3">
          <span className="flex items-center gap-1.5">
            <Calendar size={13} strokeWidth={1.5} />
            {new Date(post.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} strokeWidth={1.5} />
            {post.readTime}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-display text-xl font-semibold text-deep-ocean tracking-tight mb-2 group-hover:text-tropical-teal transition-colors duration-300 leading-snug">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-drift-gray font-body text-sm leading-relaxed mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Author + Read More */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-drift-gray text-xs font-body">
            <User size={13} strokeWidth={1.5} />
            {post.author}
          </span>
          <span className="flex items-center gap-1 text-tropical-teal text-sm font-body font-medium group-hover:gap-2 transition-all duration-300">
            Read More
            <ArrowRight size={14} strokeWidth={2} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
