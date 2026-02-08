"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import CategoryFilter from "./CategoryFilter";
import SearchBar from "./SearchBar";
import SortSelect, { SortOption } from "./SortSelect";
import Button from "@/components/ui/Button";

const PRODUCTS_PER_LOAD = 6;

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("default");
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_LOAD);

  const filtered = useMemo(() => {
    let result = products;

    // Category filter
    if (activeCategory !== "All") {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [activeCategory, search, sort]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const remaining = filtered.length - visibleCount;

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(PRODUCTS_PER_LOAD);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setVisibleCount(PRODUCTS_PER_LOAD);
  };

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    setVisibleCount(PRODUCTS_PER_LOAD);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PRODUCTS_PER_LOAD);
  };

  return (
    <div>
      {/* Search */}
      <div className="mb-8">
        <SearchBar value={search} onChange={handleSearchChange} />
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />
        <SortSelect value={sort} onChange={handleSortChange} />
      </div>

      {/* Results count */}
      <p className="text-drift-gray font-body text-sm mb-6 text-center sm:text-left">
        {filtered.length} {filtered.length === 1 ? "product" : "products"} found
      </p>

      {/* Product Grid */}
      {visibleProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-display text-2xl text-deep-ocean mb-2">No products found</p>
          <p className="text-drift-gray font-body">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Load More */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-12"
        >
          <Button variant="outline" onClick={handleLoadMore}>
            Load More ({remaining} remaining)
          </Button>
        </motion.div>
      )}
    </div>
  );
}
