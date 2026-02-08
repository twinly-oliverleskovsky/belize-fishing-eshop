"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import Badge from "@/components/ui/Badge";
import StarRating from "@/components/ui/StarRating";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";
import { useUIStore } from "@/store/uiStore";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => s.isInWishlist(product.id));
  const addToast = useToastStore((s) => s.addToast);
  const triggerFlyToCart = useUIStore((s) => s.triggerFlyToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });
    triggerFlyToCart(e.clientX, e.clientY);
    addToast(`${product.name} added to cart`);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });
    addToast(
      isInWishlist ? "Removed from wishlist" : `${product.name} added to wishlist`,
      "info"
    );
  };

  return (
    <Link href={`/shop/${product.slug}`}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
        className="group bg-shell-white border border-sand-medium rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-sand-medium">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge text={product.badge} />
            </div>
          )}
          {/* Wishlist */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer hover:bg-white"
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={16}
              strokeWidth={1.5}
              className={isInWishlist ? "text-coral-accent fill-coral-accent" : "text-deep-ocean"}
            />
          </button>
        </div>

        {/* Info */}
        <div className="p-5">
          <p className="text-drift-gray text-xs font-body uppercase tracking-widest mb-1">
            {product.category}
          </p>
          <h3 className="font-body text-base font-semibold text-deep-ocean mb-1.5 line-clamp-1">
            {product.name}
          </h3>
          <div className="mb-2">
            <StarRating rating={product.rating} size={13} reviewCount={product.reviewCount} />
          </div>
          <p className="font-body text-lg font-bold text-sun-gold mb-3">
            {formatPrice(product.price)}
          </p>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1 text-tropical-teal text-sm font-semibold font-body group-hover:gap-2 transition-all duration-300 cursor-pointer"
          >
            Add to Cart
            <ArrowRight size={14} strokeWidth={2} />
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
