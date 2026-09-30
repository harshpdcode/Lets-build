import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import products from "../../data/products";
import { formatPrice, handleImageError } from "../../utils/helpers";

export default function SearchModal({ isOpen, onClose, templateId }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 120);
    }
    if (!isOpen) setQuery("");
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 8));
  }, [query]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleProductClick = (product) => {
    onClose();
    navigate(`/template/${templateId}/product/${product.slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-16 sm:pt-20 px-4" role="dialog" aria-modal="true" aria-label="Search products">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
              <Search size={20} className="text-gray-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, brands..."
                className="flex-1 text-base sm:text-lg outline-none placeholder:text-gray-400 text-slate-900 bg-transparent"
                id="search-input"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  aria-label="Clear search"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              )}
              <button
                onClick={onClose}
                className="text-xs sm:text-sm text-gray-400 hover:text-gray-600 font-medium ml-2 px-2 py-1 rounded bg-gray-100 cursor-pointer"
              >
                ESC
              </button>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto">
              {query && results.length === 0 && (
                <div className="px-6 py-12 text-center text-gray-400">
                  <Search size={40} className="mx-auto mb-3 opacity-30" />
                  <p className="font-medium text-slate-700">No products found</p>
                  <p className="text-sm mt-1 text-slate-500">Try a different search term</p>
                </div>
              )}

              {results.length > 0 && (
                <div className="py-2">
                  <div className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </div>
                  {results.map((product) => (
                    <motion.button
                      whileHover={{ x: 3 }}
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      className="w-full flex items-center gap-4 px-6 py-3 hover:bg-gray-50 transition-colors text-left cursor-pointer"
                    >
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-12 h-12 rounded-xl object-contain p-1.5 bg-gray-50 border border-gray-100"
                        onError={handleImageError}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500">
                          {product.category} · {product.brand}
                        </p>
                      </div>
                      <span className="font-semibold text-gray-900 shrink-0 text-sm">
                        {formatPrice(product.price)}
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}

              {!query && (
                <div className="px-6 py-8 text-center text-gray-400">
                  <p className="text-sm">Start typing to search products...</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

