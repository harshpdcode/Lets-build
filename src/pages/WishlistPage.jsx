import { Link, useOutletContext } from "react-router-dom";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { formatPrice, handleImageError } from "../utils/helpers";
import StarRating from "../components/common/StarRating";
import Container from "../components/common/Container";
import products from "../data/products";

export default function WishlistPage() {
  const { template, templateId } = useOutletContext();
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const isDark = templateId === "bold";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const mutedColor = isDark ? "text-zinc-400" : "text-gray-500";
  const bgColor = isDark ? "bg-[#0d0d0d]" : "bg-white";
  const cardBg = isDark ? "bg-zinc-800/50 border-zinc-700" : "bg-white border-gray-200";

  if (items.length === 0) {
    return (
      <div className={`${bgColor} min-h-[60vh] flex items-center justify-center`}>
        <div className="text-center px-4">
          <Heart size={64} className={`mx-auto mb-4 ${isDark ? "text-zinc-700" : "text-gray-200"}`} />
          <h1 className={`text-2xl font-bold ${headingColor} mb-2`}>Your wishlist is empty</h1>
          <p className={`${mutedColor} mb-6`}>Save your favorite items for later.</p>
          <Link
            to={`/template/${templateId}/shop`}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${
              isDark ? "bg-orange-500 text-white hover:bg-orange-400" : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${bgColor} min-h-screen`}>
      <Container className="py-8 md:py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className={`text-2xl md:text-3xl font-bold ${headingColor}`} style={{ fontFamily: template.theme.fontDisplay }}>
            Wishlist ({items.length})
          </h1>
          <button onClick={clearWishlist} className="text-sm text-red-500 hover:text-red-600 font-medium">
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {items.map((item) => {
            const fullProduct = products.find((p) => p.id === item.id);
            return (
              <div key={item.id} className={`rounded-xl border overflow-hidden ${cardBg}`}>
                <Link to={`/template/${templateId}/product/${item.slug}`} className="block">
                  <div className={`aspect-square overflow-hidden flex items-center justify-center p-3 ${
                    isDark ? "bg-zinc-800/40" : "bg-gray-50"
                  }`}>
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className={`w-full h-full transition-transform duration-500 hover:scale-105 ${
                        item.category === "fashion" ? "object-cover object-top rounded-lg" : "object-contain"
                      }`}
                      onError={handleImageError}
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <p className={`text-xs ${mutedColor} uppercase tracking-wider mb-1`}>{item.brand}</p>
                  <Link to={`/template/${templateId}/product/${item.slug}`}>
                    <h3 className={`font-semibold text-sm ${headingColor} hover:opacity-70 transition-opacity line-clamp-2`}>
                      {item.name}
                    </h3>
                  </Link>
                  {item.rating && <div className="mt-1.5"><StarRating rating={item.rating} size={14} /></div>}
                  <div className="mt-2 flex items-center gap-2">
                    <span className={`font-bold ${isDark ? "text-orange-400" : headingColor}`}>{formatPrice(item.price)}</span>
                    {item.originalPrice > item.price && (
                      <span className={`text-sm line-through ${mutedColor}`}>{formatPrice(item.originalPrice)}</span>
                    )}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => fullProduct && addItem(fullProduct)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                        isDark ? "bg-orange-500 text-white hover:bg-orange-400" : "bg-gray-900 text-white hover:bg-gray-800"
                      }`}
                    >
                      <ShoppingBag size={14} /> Add to Cart
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2.5 rounded-lg border border-red-200 text-red-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
