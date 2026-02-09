"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blogPosts, blogCategories } from "@/data/blogPosts";
import BlogCard from "./BlogCard";

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {blogCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 cursor-pointer ${
              activeCategory === cat
                ? "bg-deep-ocean text-white shadow-md"
                : "bg-sand-medium/60 text-drift-gray hover:bg-sand-medium"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="text-center text-drift-gray font-body mt-12">
          No posts found in this category.
        </p>
      )}
    </>
  );
}
