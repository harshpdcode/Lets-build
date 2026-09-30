import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { formatPrice, handleImageError } from "../../utils/helpers";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useFlyToCart } from "../../context/FlyToCartContext";
import { useToast } from "../../context/ToastContext";
import { getMotionProfile } from "../../motion/profiles";
import { setProductTransition } from "../../motion/viewTransition";
import StarRating from "../common/StarRating";

export default function ProductCard({ product, templateId, variant = "default" }) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { flyToCart } = useFlyToCart();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const wishlisted = isInWishlist(product.id);
  const profile = getMotionProfile(templateId);

  const cardStyles = {
    minimal: {
      card: "group bg-white border border-gray-100 hover:border-gray-900 transition-colors duration-200 rounded-sm flex flex-col justify-between h-full",
      imageContainer: "aspect-square bg-[#fbfbfb]",
      padding: "p-4",
      titleSize: "text-sm font-normal text-gray-900",
      priceSize: "text-sm font-medium text-gray-900",
      showRating: false,
      showBrand: false,
      showQuickAdd: false,
      imageHover: "group-hover:scale-103",
      badgeRadius: "rounded-none",
    },
    modern: {
      card: "group bg-white rounded-2xl border border-slate-100 shadow-xs hover:shadow-xl hover:border-blue-200 transition-shadow duration-300 flex flex-col justify-between h-full overflow-hidden",
      imageContainer: "aspect-square bg-slate-50/70",
      padding: "p-4 sm:p-5",
      titleSize: "text-base font-semibold text-slate-900",
      priceSize: "text-lg font-bold text-slate-900",
      showRating: true,
      showBrand: true,
      showQuickAdd: true,
      imageHover: "group-hover:scale-105",
      badgeRadius: "rounded-full",
    },
    marketplace: {
      card: "group bg-white rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between h-full overflow-hidden",
      imageContainer: "aspect-square bg-gray-50",
      padding: "p-4",
      titleSize: "text-sm font-medium text-gray-900",
      priceSize: "text-base font-bold text-red-600",
      showRating: true,
      showBrand: true,
      showQuickAdd: true,
      imageHover: "group-hover:scale-105",
      badgeRadius: "rounded-md",
    },
    premium: {
      card: "group bg-white border border-[#e8e4de] hover:border-[#c9a96e] hover:shadow-xl transition-all duration-500 flex flex-col justify-between h-full overflow-hidden",
      imageContainer: "aspect-square bg-[#faf8f5]",
      padding: "p-5",
      titleSize: "text-base font-medium tracking-wide text-stone-900 font-serif",
      priceSize: "text-base font-semibold text-stone-900",
      showRating: false,
      showBrand: true,
      showQuickAdd: false,
      imageHover: "group-hover:scale-104",
      badgeRadius: "rounded-none",
    },
    fashion: {
      card: "group bg-white border-b border-gray-100 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full overflow-hidden",
      imageContainer: "aspect-square bg-stone-100",
      padding: "p-4",
      titleSize: "text-sm font-medium text-black tracking-tight",
      priceSize: "text-sm font-semibold text-black",
      showRating: false,
      showBrand: false,
      showQuickAdd: true,
      imageHover: "group-hover:scale-105",
      badgeRadius: "rounded-none",
    },
    bold: {
      card: "group bg-[#161616] rounded-2xl border border-zinc-800 hover:border-orange-500/80 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300 flex flex-col justify-between h-full overflow-hidden",
      imageContainer: "aspect-square bg-[#1c1c1c]",
      padding: "p-4 sm:p-5",
      titleSize: "text-base font-bold text-white",
      priceSize: "text-lg font-black text-orange-400 font-mono",
      showRating: true,
      showBrand: true,
      showQuickAdd: true,
      imageHover: "group-hover:scale-106",
      badgeRadius: "rounded-lg",
    },
    general: {
      card: "group bg-white rounded-xl border border-gray-200 hover:border-sky-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full overflow-hidden",
      imageContainer: "aspect-square bg-slate-50/70",
      padding: "p-4",
      titleSize: "text-sm font-semibold text-slate-800",
      priceSize: "text-base font-bold text-slate-900",
      showRating: true,
      showBrand: true,
      showQuickAdd: true,
      imageHover: "group-hover:scale-105",
      badgeRadius: "rounded-md",
    },
    "product-focus": {
      card: "group bg-white rounded-2xl border border-purple-100 hover:border-purple-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full overflow-hidden",
      imageContainer: "aspect-square bg-violet-50/40",
      padding: "p-5",
      titleSize: "text-base font-bold text-gray-900",
      priceSize: "text-lg font-black text-violet-700",
      showRating: true,
      showBrand: true,
      showQuickAdd: true,
      imageHover: "group-hover:scale-105",
      badgeRadius: "rounded-xl",
    },
  };

  const style = cardStyles[templateId] || cardStyles.modern;
  const isDark = templateId === "bold";
  const mutedText = isDark ? "text-zinc-400" : "text-gray-500";
  const isFashion = product.category === "Fashion";

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    flyToCart(e.currentTarget, product.thumbnail);
    addToast({
      title: "Added to Cart",
      message: `${product.name} added to your bag`,
      type: "success",
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const wasWishlisted = wishlisted;
    toggleItem(product);
    if (!wasWishlisted) {
      addToast({
        title: "Wishlist Updated",
        message: `${product.name} saved to your wishlist`,
        type: "wishlist",
      });
    }
  };

  const handleCardNavigate = () => {
    setProductTransition(product.id);
  };

  // 01 Clean Commerce image swap logic
  const hasSecondImage = product.images && product.images.length > 1;
  const activeImage =
    templateId === "minimal" && isHovered && hasSecondImage
      ? product.images[1]
      : product.thumbnail;

  return (
    <motion.div
      whileHover={{ y: profile.cardHoverLift || -4 }}
      transition={profile.spring || { type: "spring", stiffness: 350, damping: 25 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={style.card}
    >
      {/* Product Image Stage */}
      <Link
        to={`/template/${templateId}/product/${product.slug}`}
        onClick={handleCardNavigate}
        className="block relative overflow-hidden"
      >
        <div className={`${style.imageContainer} relative overflow-hidden flex items-center justify-center p-3 sm:p-4`}>
          <img
            id={`product-img-${product.id}`}
            src={activeImage}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full transition-transform duration-500 ease-out ${style.imageHover} ${
              isFashion
                ? "object-cover object-top p-0"
                : "object-contain max-h-[92%] p-2"
            }`}
            onError={handleImageError}
          />

          {/* Floating Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10 max-w-[calc(100%-52px)]">
            {product.discount > 0 && (
              <span className={`px-2 py-0.5 text-[11px] font-bold bg-rose-500 text-white shadow-xs ${style.badgeRadius}`}>
                -{product.discount}%
              </span>
            )}
            {product.newArrival && (
              <span className={`px-2 py-0.5 text-[11px] font-bold bg-emerald-500 text-white shadow-xs ${style.badgeRadius}`}>
                NEW
              </span>
            )}
            {product.bestSeller && !product.newArrival && (
              <span className={`px-2 py-0.5 text-[11px] font-bold ${isDark ? "bg-orange-500 text-black" : "bg-slate-900 text-white"} shadow-xs ${style.badgeRadius}`}>
                POPULAR
              </span>
            )}
          </div>

          {/* Wishlist Button with Heart Burst Feedback */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.08 }}
              onClick={handleWishlist}
              className={`w-10 h-10 min-w-10 min-h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-sm cursor-pointer ${
                wishlisted
                  ? "bg-rose-500 text-white scale-105"
                  : isDark
                  ? "bg-zinc-800/90 text-zinc-300 hover:text-rose-400 hover:bg-zinc-700"
                  : "bg-white/90 text-gray-700 hover:text-rose-500 hover:bg-white hover:scale-105"
              }`}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                size={16}
                fill={wishlisted ? "currentColor" : "none"}
                className={wishlisted ? "animate-wiggle" : ""}
              />
            </motion.button>
          </div>

          {/* Quick Add Overlay Bar */}
          {style.showQuickAdd && (
            <div className="absolute bottom-0 inset-x-0 p-2.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleQuickAdd}
                className={`w-full py-2.5 px-3 min-h-11 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-lg transition-transform cursor-pointer ${
                  isDark
                    ? "bg-orange-500 text-black hover:bg-orange-400"
                    : templateId === "modern"
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : templateId === "marketplace"
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : templateId === "product-focus"
                    ? "bg-violet-600 text-white hover:bg-violet-700"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                <ShoppingBag size={14} /> Quick Add
              </motion.button>
            </div>
          )}
        </div>
      </Link>

      {/* Product Content Details */}
      <div className={`${style.padding} flex-1 flex flex-col justify-between`}>
        <div>
          {style.showBrand && (
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className={`text-[11px] font-semibold uppercase tracking-wider ${mutedText}`}>
                {product.brand}
              </span>
              {product.category === "Smartphones" && (
                <span className="text-[10px] font-mono font-medium px-1.5 py-0.2 bg-blue-50 text-blue-600 rounded">
                  5G
                </span>
              )}
            </div>
          )}

          <Link to={`/template/${templateId}/product/${product.slug}`} onClick={handleCardNavigate} className="block">
            <h3 className={`${style.titleSize} line-clamp-2 min-h-10 sm:min-h-11 leading-snug group-hover:text-blue-600 transition-colors`}>
              {product.name}
            </h3>
          </Link>

          {style.showRating && (
            <div className="flex items-center gap-1.5 mt-2">
              <StarRating rating={product.rating} size={13} showCount reviewCount={product.reviewCount} />
            </div>
          )}
        </div>

        {/* Pricing Block - Aligned Baseline */}
        <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className={style.priceSize}>{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className={`text-xs line-through ${mutedText}`}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          {product.category === "Smartphones" && product.sizes && product.sizes[0] && (
            <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {product.sizes[0]}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

