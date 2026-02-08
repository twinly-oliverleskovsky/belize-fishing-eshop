import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export default function StarRating({
  rating,
  size = 16,
  showValue = false,
  reviewCount,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= Math.floor(rating);
          const partial = !filled && star === Math.ceil(rating) && rating % 1 > 0;
          return (
            <div key={star} className="relative">
              <Star
                size={size}
                strokeWidth={1.5}
                className="text-sand-medium"
                fill="var(--color-sand-medium)"
              />
              {(filled || partial) && (
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: partial ? `${(rating % 1) * 100}%` : "100%" }}
                >
                  <Star
                    size={size}
                    strokeWidth={1.5}
                    className="text-sun-gold"
                    fill="var(--color-sun-gold)"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-body font-semibold text-deep-ocean">
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm font-body text-drift-gray">
          ({reviewCount})
        </span>
      )}
    </div>
  );
}
