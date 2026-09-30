import { useState, useMemo, useEffect } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import products from "../data/products";
import categories from "../data/categories";
import { brands } from "../data/categories";
import ProductCard from "../components/ecommerce/ProductCard";
import Container from "../components/common/Container";
import { filterProducts } from "../utils/helpers";

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "rating", label: "Top Rated" },
  { value: "popular", label: "Most Popular" },
];

export default function ShopPage() {
  const { template, templateId } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const isDark = templateId === "bold";

  const [filterOpen, setFilterOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "featured");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState([0, 1500]);

  // Sync category param
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  // Escape key & scroll lock for mobile filter drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setFilterOpen(false);
    };
    if (filterOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [filterOpen]);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, {
      search,
      sort,
      category: selectedCategory,
      brand: selectedBrand,
      minRating: minRating > 0 ? minRating : undefined,
      minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
      maxPrice: priceRange[1] < 1500 ? priceRange[1] : undefined,
    });
  }, [search, sort, selectedCategory, selectedBrand, minRating, priceRange]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedBrand("");
    setMinRating(0);
    setPriceRange([0, 1500]);
    setSort("featured");
  };

  const hasActiveFilters = search || selectedCategory || selectedBrand || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 1500;

  const gridCols = {
    minimal: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    modern: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
    marketplace: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    premium: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
    fashion: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    bold: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
    general: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    "product-focus": "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
  };

  const bgColor = isDark ? "bg-[#0d0d0d]" : "bg-white";
  const cardBg = isDark ? "bg-zinc-800/50 border-zinc-700" : "bg-white border-gray-200";
  const headingColor = isDark ? "text-white" : "text-gray-900";
  const mutedColor = isDark ? "text-zinc-400" : "text-gray-500";
  const inputBg = isDark ? "bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500" : "bg-white border-gray-200 text-gray-900 placeholder:text-gray-400";

  return (
    <div className={`${bgColor} min-h-screen`}>
      {/* Page Header */}
      <div className={`${isDark ? "bg-zinc-900 border-zinc-800" : "bg-gray-50 border-gray-200"} border-b py-8 md:py-10`}>
        <Container>
          <h1 className={`text-2xl md:text-3xl font-bold ${headingColor}`} style={{ fontFamily: template.theme.fontDisplay }}>
            {selectedCategory || "All Products"}
          </h1>
          <p className={`mt-1 text-sm ${mutedColor}`}>
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </Container>
      </div>

      <Container className="py-6 sm:py-8">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${mutedColor}`} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${inputBg}`}
              id="shop-search"
            />
          </div>

          <div className="flex items-center gap-3">
            {/* Filter toggle (mobile) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilterOpen(true)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors lg:hidden cursor-pointer ${cardBg} ${headingColor}`}
            >
              <SlidersHorizontal size={16} />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-rose-500 rounded-full" />
              )}
            </motion.button>

            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={`appearance-none pr-9 pl-4 py-2.5 rounded-xl border text-sm font-semibold cursor-pointer focus:outline-none ${inputBg}`}
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown size={14} className={`absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${mutedColor}`} />
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block lg:w-60 shrink-0">
            {/* Category Filter */}
            <div className="mb-6">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${headingColor} mb-3`}>Category</h4>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    !selectedCategory
                      ? isDark ? "bg-zinc-800 text-white font-bold" : "bg-slate-100 text-slate-900 font-bold"
                      : `${mutedColor} hover:bg-slate-50 dark:hover:bg-zinc-800/50`
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name === selectedCategory ? "" : cat.name)}
                    className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedCategory === cat.name
                        ? isDark ? "bg-zinc-800 text-white font-bold" : "bg-slate-100 text-slate-900 font-bold"
                        : `${mutedColor} hover:bg-slate-50 dark:hover:bg-zinc-800/50`
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${headingColor} mb-3`}>Rating</h4>
              <div className="space-y-1">
                {[4, 3, 2, 1].map((r) => (
                  <button
                    key={r}
                    onClick={() => setMinRating(minRating === r ? 0 : r)}
                    className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      minRating === r
                        ? isDark ? "bg-zinc-800 text-white font-bold" : "bg-slate-100 text-slate-900 font-bold"
                        : `${mutedColor} hover:bg-slate-50 dark:hover:bg-zinc-800/50`
                    }`}
                  >
                    {r}+ Stars
                  </button>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${headingColor} mb-3`}>Brand</h4>
              <div className="space-y-1 max-h-48 overflow-y-auto">
                <button
                  onClick={() => setSelectedBrand("")}
                  className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    !selectedBrand
                      ? isDark ? "bg-zinc-800 text-white font-bold" : "bg-slate-100 text-slate-900 font-bold"
                      : `${mutedColor} hover:bg-slate-50 dark:hover:bg-zinc-800/50`
                  }`}
                >
                  All Brands
                </button>
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setSelectedBrand(b === selectedBrand ? "" : b)}
                    className={`block w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                      selectedBrand === b
                        ? isDark ? "bg-zinc-800 text-white font-bold" : "bg-slate-100 text-slate-900 font-bold"
                        : `${mutedColor} hover:bg-slate-50 dark:hover:bg-zinc-800/50`
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h4 className={`text-xs font-bold uppercase tracking-wider ${headingColor} mb-3`}>Price Range</h4>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                  className={`w-20 px-2.5 py-1.5 rounded-lg border text-xs ${inputBg}`}
                  placeholder="Min"
                  aria-label="Minimum price"
                />
                <span className={mutedColor}>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                  className={`w-20 px-2.5 py-1.5 rounded-lg border text-xs ${inputBg}`}
                  placeholder="Max"
                  aria-label="Maximum price"
                />
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="w-full py-2 px-3 text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-colors cursor-pointer text-left"
              >
                Reset All Filters
              </button>
            )}
          </aside>

          {/* Mobile Filter Drawer with spring slide-in */}
          <AnimatePresence>
            {filterOpen && (
              <div className="fixed inset-0 z-100 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
                  onClick={() => setFilterOpen(false)}
                />

                {/* Drawer */}
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  className={`fixed right-0 top-0 h-full w-80 max-w-[85vw] ${isDark ? "bg-[#111]" : "bg-white"} p-6 shadow-2xl flex flex-col z-10 overflow-y-auto`}
                >
                  <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-zinc-800 mb-6">
                    <h3 className={`font-bold text-lg ${headingColor}`}>Filter Products</h3>
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer"
                      aria-label="Close filters"
                    >
                      <X size={20} className={headingColor} />
                    </button>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider ${headingColor} mb-3`}>Category</h4>
                      <div className="space-y-1.5">
                        <button
                          onClick={() => setSelectedCategory("")}
                          className={`block w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                            !selectedCategory
                              ? isDark ? "bg-zinc-800 text-white font-bold" : "bg-slate-100 text-slate-900 font-bold"
                              : `${mutedColor}`
                          }`}
                        >
                          All Categories
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name === selectedCategory ? "" : cat.name)}
                            className={`block w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                              selectedCategory === cat.name
                                ? isDark ? "bg-zinc-800 text-white font-bold" : "bg-slate-100 text-slate-900 font-bold"
                                : `${mutedColor}`
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className={`text-xs font-bold uppercase tracking-wider ${headingColor} mb-3`}>Rating</h4>
                      <div className="space-y-1.5">
                        {[4, 3, 2, 1].map((r) => (
                          <button
                            key={r}
                            onClick={() => setMinRating(minRating === r ? 0 : r)}
                            className={`block w-full text-left px-3 py-2.5 rounded-xl text-sm transition-colors cursor-pointer ${
                              minRating === r
                                ? isDark ? "bg-zinc-800 text-white font-bold" : "bg-slate-100 text-slate-900 font-bold"
                                : `${mutedColor}`
                            }`}
                          >
                            {r}+ Stars
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-zinc-800 space-y-2">
                    <button
                      onClick={() => setFilterOpen(false)}
                      className="w-full py-3 bg-slate-900 dark:bg-white dark:text-black text-white rounded-xl font-bold text-sm cursor-pointer"
                    >
                      Apply Filters ({filteredProducts.length})
                    </button>
                    {hasActiveFilters && (
                      <button
                        onClick={() => {
                          clearFilters();
                          setFilterOpen(false);
                        }}
                        className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                      >
                        Reset All
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Main Product Grid with Motion Layout & AnimatePresence */}
          <div className="flex-1 min-w-0">
            {/* Active filter pills */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className={`text-xs font-semibold ${mutedColor}`}>Active:</span>
                {selectedCategory && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isDark ? "bg-zinc-800 text-zinc-300" : "bg-gray-100 text-gray-700"}`}>
                    Category: {selectedCategory}
                    <button onClick={() => setSelectedCategory("")} aria-label="Remove category filter" className="cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {selectedBrand && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isDark ? "bg-zinc-800 text-zinc-300" : "bg-gray-100 text-gray-700"}`}>
                    Brand: {selectedBrand}
                    <button onClick={() => setSelectedBrand("")} aria-label="Remove brand filter" className="cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {minRating > 0 && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isDark ? "bg-zinc-800 text-zinc-300" : "bg-gray-100 text-gray-700"}`}>
                    {minRating}+ Stars
                    <button onClick={() => setMinRating(0)} aria-label="Remove rating filter" className="cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                )}
                {search && (
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${isDark ? "bg-zinc-800 text-zinc-300" : "bg-gray-100 text-gray-700"}`}>
                    "{search}"
                    <button onClick={() => setSearch("")} aria-label="Remove search filter" className="cursor-pointer">
                      <X size={12} />
                    </button>
                  </span>
                )}
              </div>
            )}

            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center">
                <Search size={48} className={`mx-auto mb-4 ${isDark ? "text-zinc-700" : "text-gray-200"}`} />
                <h3 className={`text-lg font-semibold ${headingColor}`}>No products found</h3>
                <p className={`mt-2 text-sm ${mutedColor}`}>Try adjusting your filters or search term</p>
                <button
                  onClick={clearFilters}
                  className={`mt-4 px-6 py-2.5 text-sm font-medium rounded-xl transition-colors cursor-pointer ${
                    isDark ? "bg-zinc-800 text-white hover:bg-zinc-700" : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <motion.div
                layout
                className={`grid ${gridCols[templateId] || gridCols.modern} gap-4 md:gap-6`}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      layout
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.25 }}
                    >
                      <ProductCard product={product} templateId={templateId} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
