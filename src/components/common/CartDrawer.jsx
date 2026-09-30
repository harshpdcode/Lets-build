import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCart } from "../../context/CartContext";
import { formatPrice, handleImageError } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function CartDrawer({ isOpen, onClose, templateId }) {
  const { items, removeItem, updateQuantity, itemCount, subtotal, shipping, total } =
    useCart();
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100" role="dialog" aria-modal="true" aria-label="Shopping cart">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 32 }}
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-slate-900" />
                <h2 className="text-lg font-semibold text-slate-900">Cart ({itemCount})</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer text-slate-600 hover:text-slate-900"
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 px-6">
                  <ShoppingBag size={48} className="mb-4 opacity-30" />
                  <p className="font-medium text-lg text-slate-800">Your cart is empty</p>
                  <p className="text-sm mt-1 text-slate-500">Add some products to get started</p>
                  <button
                    onClick={() => {
                      onClose();
                      navigate(`/template/${templateId}/shop`);
                    }}
                    className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      key={`${item.id}-${item.selectedColor}-${item.selectedSize}-${idx}`}
                      className="flex gap-4 p-4"
                    >
                      <div className="w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 p-1 flex items-center justify-center overflow-hidden shrink-0">
                        <img
                          src={item.thumbnail}
                          alt={item.name}
                          className={`w-full h-full ${item.category === "fashion" ? "object-cover object-top" : "object-contain"}`}
                          onError={handleImageError}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate text-slate-900">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{item.brand}</p>
                        {(item.selectedColor || item.selectedSize) && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {item.selectedColor}
                            {item.selectedColor && item.selectedSize && " · "}
                            {item.selectedSize}
                          </p>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition-colors cursor-pointer"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 h-7 flex items-center justify-center text-xs font-medium border-x border-gray-200 text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  item.selectedColor,
                                  item.selectedSize
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="font-semibold text-sm text-slate-900">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.id, item.selectedColor, item.selectedSize)
                        }
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors self-start shrink-0 cursor-pointer"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 px-6 py-4 space-y-3 bg-white">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium text-slate-900">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-100 text-slate-900">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onClose();
                    navigate(`/template/${templateId}/checkout`);
                  }}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Checkout
                </motion.button>
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/template/${templateId}/cart`);
                  }}
                  className="w-full py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  View Full Cart
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

