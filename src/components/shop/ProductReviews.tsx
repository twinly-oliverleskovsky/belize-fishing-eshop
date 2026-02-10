"use client";

import { Review } from "@/types";
import StarRating from "@/components/ui/StarRating";
import AnimatedSection from "@/components/ui/AnimatedSection";

interface ProductReviewsProps {
  reviews: Review[];
  averageRating: number;
  reviewCount: number;
}

export default function ProductReviews({ reviews, averageRating, reviewCount }: ProductReviewsProps) {
  return (
    <section className="mt-24 lg:mt-32">
      <AnimatedSection>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-deep-ocean dark:text-dark-text tracking-tight">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-3">
            <StarRating rating={averageRating} size={20} showValue />
            <span className="text-drift-gray dark:text-dark-text-secondary font-body text-sm">
              ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
            </span>
          </div>
        </div>
      </AnimatedSection>

      <div className="space-y-0">
        {reviews.map((review, i) => (
          <AnimatedSection key={review.id} delay={i * 0.1}>
            <div className="py-6 border-b border-sand-medium dark:border-dark-border last:border-b-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-deep-ocean to-tropical-teal flex items-center justify-center">
                    <span className="text-white font-body font-bold text-sm">
                      {review.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-deep-ocean dark:text-dark-text text-sm">
                      {review.author}
                    </p>
                    <p className="text-drift-gray dark:text-dark-text-secondary text-xs font-body">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} size={14} />
              </div>
              <p className="text-drift-gray dark:text-dark-text-secondary font-body text-sm leading-relaxed pl-0 sm:pl-[52px]">
                {review.comment}
              </p>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
