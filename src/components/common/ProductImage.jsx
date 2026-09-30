import { useState } from "react";
import { handleImageError } from "../../utils/helpers";

export default function ProductImage({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-square",
  objectFit = "object-cover",
  hoverZoom = false,
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${aspectRatio} ${className}`}>
      {!loaded && !error && (
        <div className="absolute inset-0 product-image-placeholder">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full ${objectFit} transition-all duration-500 ${
          hoverZoom ? "group-hover:scale-110" : ""
        } ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
        onError={(e) => {
          setError(true);
          setLoaded(true);
          handleImageError(e);
        }}
      />
    </div>
  );
}
