// ===== UTILITY FUNCTIONS =====

/**
 * Format a price value to USD currency string
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

/**
 * Generate star rating display data
 */
export function getStarRating(rating) {
  const full = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const empty = 5 - full - (hasHalf ? 1 : 0);
  return { full, hasHalf, empty };
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text, maxLength = 100) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate a slug from a string
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Calculate discount percentage
 */
export function calcDiscount(originalPrice, price) {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Filter and sort products
 */
export function filterProducts(products, filters = {}) {
  let result = [...products];

  if (filters.category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === filters.category.toLowerCase()
    );
  }

  if (filters.brand) {
    result = result.filter(
      (p) => p.brand.toLowerCase() === filters.brand.toLowerCase()
    );
  }

  if (filters.minPrice !== undefined) {
    result = result.filter((p) => p.price >= filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= filters.maxPrice);
  }

  if (filters.minRating) {
    result = result.filter((p) => p.rating >= filters.minRating);
  }

  if (filters.inStock !== undefined) {
    result = result.filter((p) => p.inStock === filters.inStock);
  }

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q)
    );
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter((p) =>
      filters.tags.some((tag) => p.tags.includes(tag.toLowerCase()))
    );
  }

  // Sorting
  switch (filters.sort) {
    case "price-low":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result.sort((a, b) => (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0));
      break;
    case "popular":
      result.sort((a, b) => b.reviewCount - a.reviewCount);
      break;
    case "featured":
    default:
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      break;
  }

  return result;
}

/**
 * Get related products based on category and tags
 */
export function getRelatedProducts(product, allProducts, limit = 4) {
  return allProducts
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      let scoreA = 0;
      let scoreB = 0;
      if (a.category === product.category) scoreA += 3;
      if (b.category === product.category) scoreB += 3;
      scoreA += a.tags.filter((t) => product.tags.includes(t)).length;
      scoreB += b.tags.filter((t) => product.tags.includes(t)).length;
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

/**
 * Image fallback handler — shows a placeholder gradient when image fails to load
 */
export function handleImageError(e) {
  e.target.onerror = null;
  e.target.style.background =
    "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 50%, #f0f0f0 100%)";
  e.target.style.objectFit = "contain";
  e.target.src =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="100" y="100" text-anchor="middle" dominant-baseline="middle" font-family="Inter,sans-serif" font-size="14" fill="#999">Image</text></svg>'
    );
}

/**
 * Debounce function for search input
 */
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

/**
 * Clamp a value between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
