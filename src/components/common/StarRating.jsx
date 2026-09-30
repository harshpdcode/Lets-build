import { Star, StarHalf } from "lucide-react";
import { getStarRating } from "../../utils/helpers";

export default function StarRating({ rating, size = 16, showCount, reviewCount }) {
  const { full, hasHalf, empty } = getStarRating(rating);

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[...Array(full)].map((_, i) => (
          <Star
            key={`full-${i}`}
            size={size}
            className="fill-amber-400 text-amber-400"
          />
        ))}
        {hasHalf && (
          <StarHalf size={size} className="fill-amber-400 text-amber-400" />
        )}
        {[...Array(empty)].map((_, i) => (
          <Star
            key={`empty-${i}`}
            size={size}
            className="text-gray-300"
          />
        ))}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-sm text-gray-500 ml-1">({reviewCount})</span>
      )}
    </div>
  );
}
