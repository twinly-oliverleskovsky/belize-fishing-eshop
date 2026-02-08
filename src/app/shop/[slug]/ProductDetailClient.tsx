"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Minus, Plus, Truck, Heart } from "lucide-react";
import { products } from "@/data/products";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/store/toastStore";
import { useUIStore } from "@/store/uiStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ProductCard from "@/components/shop/ProductCard";
import ImageGallery from "@/components/shop/ImageGallery";
import StarRating from "@/components/ui/StarRating";
import ProductReviews from "@/components/shop/ProductReviews";

interface ProductDetailClientProps {
  slug: string;
}

export default function ProductDetailClient({ slug }: ProductDetailClientProps) {
  const product = products.find((p) => p.slug === slug);
  const addItem = useCartStore((s) => s.addItem);
  const toggleWishlist = useWishlistStore((s) => s.toggleItem);
  const isInWishlist = useWishlistStore((s) => product ? s.isInWishlist(product.id) : false);
  const addToast = useToastStore((s) => s.addToast);
  const triggerFlyToCart = useUIStore((s) => s.triggerFlyToCart);
  const openCartDrawer = useUIStore((s) => s.openCartDrawer);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="pt-28 pb-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-deep-ocean mb-4">
            Product Not Found
          </h1>
          <Link
            href="/shop"
            className="text-tropical-teal font-body font-semibold hover:underline"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = (e: React.MouseEvent) => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
      });
    }
    triggerFlyToCart(e.clientX, e.clientY);
    addToast(`${product.name} added to cart`);
    // Open drawer after fly animation
    setTimeout(() => openCartDrawer(), 750);
  };

  const handleToggleWishlist = () => {
    toggleWishlist({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      slug: product.slug,
    });
    addToast(
      isInWishlist ? `Removed from wishlist` : `${product.name} added to wishlist`,
      "info"
    );
  };

  return (
    <main className="pt-28 pb-24 lg:pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb */}
        <AnimatedSection>
          <nav className="flex items-center gap-2 text-sm font-body text-drift-gray mb-10">
            <Link href="/" className="hover:text-tropical-teal transition-colors">
              Home
            </Link>
            <ChevronRight size={14} strokeWidth={1.5} />
            <Link
              href="/shop"
              className="hover:text-tropical-teal transition-colors"
            >
              Shop
            </Link>
            <ChevronRight size={14} strokeWidth={1.5} />
            <span className="text-deep-ocean">{product.name}</span>
          </nav>
        </AnimatedSection>

        {/* Product */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Gallery */}
          <AnimatedSection>
            <ImageGallery
              images={product.images}
              alt={product.name}
              badge={product.badge}
            />
          </AnimatedSection>

          {/* Details */}
          <AnimatedSection delay={0.2}>
            <div>
              <p className="text-tropical-teal text-sm font-body font-semibold uppercase tracking-[0.15em] mb-3">
                {product.category}
              </p>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-deep-ocean tracking-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mb-4">
                <StarRating
                  rating={product.rating}
                  size={18}
                  showValue
                  reviewCount={product.reviewCount}
                />
              </div>

              <p className="font-body text-2xl font-bold text-sun-gold mb-6">
                {formatPrice(product.price)}
              </p>
              <p className="text-drift-gray font-body leading-relaxed text-base mb-8">
                {product.description}
              </p>

              {/* Quantity + Wishlist */}
              <div className="flex items-center gap-4 mb-8 flex-wrap">
                <span className="font-body text-sm font-medium text-deep-ocean uppercase tracking-wider">
                  Quantity
                </span>
                <div className="flex items-center border border-sand-medium rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-drift-gray hover:text-deep-ocean transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} strokeWidth={1.5} />
                  </button>
                  <span className="w-10 text-center font-body font-semibold text-deep-ocean">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-drift-gray hover:text-deep-ocean transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} strokeWidth={1.5} />
                  </button>
                </div>
                <button
                  onClick={handleToggleWishlist}
                  className="w-10 h-10 rounded-full border border-sand-medium flex items-center justify-center hover:border-coral-accent transition-colors cursor-pointer"
                  aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart
                    size={18}
                    strokeWidth={1.5}
                    className={isInWishlist ? "text-coral-accent fill-coral-accent" : "text-drift-gray"}
                  />
                </button>
              </div>

              {/* Add to Cart */}
              <Button fullWidth size="lg" onClick={handleAddToCart}>
                Add to Cart
              </Button>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 mt-4 text-drift-gray text-sm font-body"
              >
                <Truck size={16} strokeWidth={1.5} />
                <span>Free consultation on all orders</span>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>

        {/* Reviews */}
        <ProductReviews
          reviews={product.reviews}
          averageRating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-24 lg:mt-32">
            <AnimatedSection className="text-center mb-12">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-deep-ocean tracking-tight">
                You Might Also Like
              </h2>
            </AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {related.map((p, i) => (
                <AnimatedSection key={p.id} delay={i * 0.1}>
                  <ProductCard product={p} />
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
