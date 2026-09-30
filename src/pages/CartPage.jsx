import { Link, useOutletContext } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice, handleImageError } from "../utils/helpers";
import Container from "../components/common/Container";

export default function CartPage() {
  const { template, templateId } = useOutletContext();
  const { items, removeItem, updateQuantity, clearCart, subtotal, shipping, total, discount } = useCart();
  const isDark = templateId === "bold";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const mutedColor = isDark ? "text-zinc-400" : "text-gray-500";
  const bgColor = isDark ? "bg-[#0d0d0d]" : "bg-white";
  const cardBg = isDark ? "bg-zinc-800/50 border-zinc-800" : "bg-gray-50 border-gray-200";

  if (items.length === 0) {
    return (
      <div className={`${bgColor} min-h-[60vh] flex items-center justify-center`}>
        <div className="text-center px-4">
          <ShoppingBag size={64} className={`mx-auto mb-4 ${isDark ? "text-zinc-700" : "text-gray-200"}`} />
          <h1 className={`text-2xl font-bold ${headingColor} mb-2`}>Your cart is empty</h1>
          <p className={`${mutedColor} mb-6`}>Looks like you haven't added anything yet.</p>
          <Link
            to={`/template/${templateId}/shop`}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-colors ${
              isDark ? "bg-orange-500 text-white hover:bg-orange-400" : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Start Shopping <ArrowRight size={16} />
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
            Shopping Cart ({items.length})
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, idx) => (
              <div
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                className={`flex gap-4 p-4 rounded-xl border ${cardBg}`}
              >
                <Link to={`/template/${templateId}/product/${item.slug}`} className="shrink-0">
                  <div className={`w-24 h-24 md:w-28 md:h-28 rounded-xl border flex items-center justify-center p-1.5 overflow-hidden ${
                    isDark ? "bg-zinc-800 border-zinc-700" : "bg-white border-gray-100"
                  }`}>
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className={`w-full h-full ${item.category === "fashion" ? "object-cover object-top" : "object-contain"}`}
                      onError={handleImageError}
                    />
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to={`/template/${templateId}/product/${item.slug}`}>
                    <h3 className={`font-semibold ${headingColor} hover:opacity-70 transition-opacity`}>
                      {item.name}
                    </h3>
                  </Link>
                  <p className={`text-sm ${mutedColor} mt-0.5`}>{item.brand}</p>
                  {(item.selectedColor || item.selectedSize) && (
                    <p className={`text-sm ${mutedColor} mt-0.5`}>
                      {item.selectedColor}{item.selectedColor && item.selectedSize && " / "}{item.selectedSize}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-3">
                    <div className={`inline-flex items-center border rounded-lg overflow-hidden ${isDark ? "border-zinc-700" : "border-gray-200"}`}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedColor, item.selectedSize)}
                        disabled={item.quantity <= 1}
                        className={`w-9 h-9 flex items-center justify-center ${isDark ? "hover:bg-zinc-700" : "hover:bg-gray-100"} disabled:opacity-30 transition-colors`}
                        aria-label="Decrease"
                      >
                        <Minus size={14} />
                      </button>
                      <span className={`w-10 h-9 flex items-center justify-center text-sm font-medium border-x ${isDark ? "border-zinc-700" : "border-gray-200"}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedColor, item.selectedSize)}
                        className={`w-9 h-9 flex items-center justify-center ${isDark ? "hover:bg-zinc-700" : "hover:bg-gray-100"} transition-colors`}
                        aria-label="Increase"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`font-bold ${isDark ? "text-orange-400" : headingColor}`}>
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeItem(item.id, item.selectedColor, item.selectedSize)}
                        className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className={`p-6 rounded-xl border h-fit sticky top-24 ${cardBg}`}>
            <h2 className={`text-lg font-bold ${headingColor} mb-4`}>Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className={mutedColor}>Subtotal</span>
                <span className={`font-medium ${headingColor}`}>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Savings</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className={mutedColor}>Shipping</span>
                <span className={`font-medium ${shipping === 0 ? "text-green-600" : headingColor}`}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className={`pt-3 border-t ${isDark ? "border-zinc-700" : "border-gray-200"} flex justify-between text-lg font-bold`}>
                <span className={headingColor}>Total</span>
                <span className={isDark ? "text-orange-400" : headingColor}>{formatPrice(total)}</span>
              </div>
            </div>

            <Link
              to={`/template/${templateId}/checkout`}
              className={`mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-colors ${
                isDark ? "bg-orange-500 text-white hover:bg-orange-400" : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              Proceed to Checkout <ArrowRight size={16} />
            </Link>

            <Link
              to={`/template/${templateId}/shop`}
              className={`mt-3 block text-center text-sm font-medium ${mutedColor} hover:opacity-70 transition-opacity`}
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
