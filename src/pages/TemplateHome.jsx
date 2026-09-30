import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Headphones,
  ChevronRight,
  Sparkles,
  Zap,
  Flame,
  CheckCircle2,
  Clock,
  Repeat,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import products from "../data/products";
import categories from "../data/categories";
import ProductCard from "../components/ecommerce/ProductCard";
import Container from "../components/common/Container";
import AnimatedCounter from "../components/common/AnimatedCounter";
import Reveal from "../motion/Reveal";
import useReducedMotion from "../motion/useReducedMotion";
import { handleImageError } from "../utils/helpers";

function MarketplaceCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 42, seconds: 19 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mt-5 p-3.5 rounded-2xl bg-black/25 backdrop-blur-md inline-flex items-center gap-3">
      <Clock size={16} className="text-amber-300 animate-pulse" />
      <span className="text-xs font-bold uppercase tracking-wider text-amber-200">Deals End In:</span>
      <div className="flex items-center gap-1.5 font-mono font-black text-sm text-white">
        <span className="bg-white/20 px-2 py-0.5 rounded">{String(timeLeft.hours).padStart(2, "0")}h</span>
        <span>:</span>
        <span className="bg-white/20 px-2 py-0.5 rounded">{String(timeLeft.minutes).padStart(2, "0")}m</span>
        <span>:</span>
        <span className="bg-white/20 px-2 py-0.5 rounded">{String(timeLeft.seconds).padStart(2, "0")}s</span>
      </div>
    </div>
  );
}

export default function TemplateHome() {
  const { template, templateId, isDark: contextDark } = useOutletContext();
  const isDark = contextDark !== undefined ? contextDark : templateId === "bold";
  const isReduced = useReducedMotion();

  // Template 01 Minimal: sliding pill category filter
  const [minimalFilter, setMinimalFilter] = useState("all");

  // Template 02 Modern: autoship toggle state
  const [autoshipActive, setAutoshipActive] = useState(false);

  // Featured products (8 items)
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);

  // Filtered products for minimal pill filter
  const displayedFeatured =
    templateId === "minimal" && minimalFilter !== "all"
      ? products.filter((p) => p.category?.toLowerCase() === minimalFilter.toLowerCase()).slice(0, 8)
      : featuredProducts;

  // Trending products deduplicated against featured products
  const featuredIds = new Set(featuredProducts.map((p) => p.id));
  const remainingCandidates = products.filter((p) => !featuredIds.has(p.id));
  const trendingProducts = [
    ...remainingCandidates.filter((p) => p.trending),
    ...remainingCandidates.filter((p) => !p.trending),
  ].slice(0, 8);

  const featuredCategories = categories;

  const getCategoryItemCount = (categoryName) => {
    const count = products.filter(
      (p) => p.category?.toLowerCase() === categoryName.toLowerCase()
    ).length;
    return `${count} ${count === 1 ? "item" : "items"}`;
  };

  const heroStyles = {
    // 01 CLEAN COMMERCE / MINIMAL: Quiet, ultra-fast fades, crisp typography, no parallax
    minimal: (
      <div className={`${isDark ? "bg-[#09090b] text-white border-zinc-800" : "bg-neutral-50 text-gray-900 border-gray-100"} border-b overflow-hidden transition-colors`}>
        <Container className="py-12 md:py-20">
          <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:col-span-7 text-left"
            >
              <span className={`text-[11px] font-mono tracking-[0.25em] ${isDark ? "text-zinc-400" : "text-gray-500"} uppercase block mb-3`}>
                COLLECTION 01 — MINIMAL FORM
              </span>
              <h1 className={`text-3xl sm:text-4xl md:text-6xl font-light ${isDark ? "text-white" : "text-gray-900"} leading-tight tracking-tight`}>
                {template.hero.title}
              </h1>
              <p className={`mt-3 sm:mt-4 ${isDark ? "text-zinc-400" : "text-gray-600"} text-sm sm:text-base leading-relaxed max-w-lg`}>
                {template.hero.subtitle}
              </p>
              <div className="flex flex-wrap items-center gap-5 mt-6 sm:mt-8">
                <Link
                  to={`/template/${templateId}/shop`}
                  className={`inline-flex items-center gap-2 text-sm font-semibold ${isDark ? "text-white border-white" : "text-gray-900 border-gray-900"} border-b-2 pb-1 hover:opacity-70 transition-opacity min-h-11`}
                >
                  {template.hero.ctaText} <ArrowRight size={16} />
                </Link>
                <Link
                  to={`/template/${templateId}/shop?category=Fashion`}
                  className={`text-sm font-medium ${isDark ? "text-zinc-400 hover:text-white" : "text-gray-500 hover:text-gray-900"} transition-colors min-h-11 inline-flex items-center`}
                >
                  View Lookbook
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="md:col-span-5 flex justify-center"
            >
              <div className={`w-full max-w-xs sm:max-w-sm aspect-square ${isDark ? "bg-zinc-900 border-zinc-800" : "bg-white border-gray-200/70"} border p-6 sm:p-8 shadow-xs flex items-center justify-center relative group rounded-md`}>
                <span className={`absolute top-4 left-4 text-[10px] font-mono ${isDark ? "text-zinc-500" : "text-gray-400"} uppercase tracking-widest`}>
                  Featured Object
                </span>
                <img
                  src="/images/products/9.webp"
                  alt="Minimal Studio Mug"
                  className="w-3/4 h-3/4 object-contain transition-transform duration-300 group-hover:scale-104"
                  onError={handleImageError}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    ),

    // 02 PET MARKET / MODERN: Playful, bouncy springs, visible overshoot, autoship toggle
    modern: (
      <div className="bg-linear-to-b from-slate-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <Container className="py-14 sm:py-20 md:py-24 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="lg:col-span-7 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-400/25 rounded-full text-blue-400 text-xs font-semibold uppercase tracking-wider mb-5 shadow-xs hover-wiggle cursor-pointer">
                <Sparkles size={14} className="text-blue-400" />
                <span>2025 Flagship Collection</span>
              </div>
              <h1
                className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.12] tracking-tight"
                style={{ fontFamily: template.theme.fontDisplay }}
              >
                The Future of{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
                  Smart Shopping.
                </span>
              </h1>
              <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Curated 5G smartphones, luxury leather accessories, and essential designer apparel engineered for modern life.
              </p>

              {/* Interactive Autoship Feature Banner */}
              <div className="mt-6 p-4 rounded-2xl bg-white/5 border border-white/10 max-w-md mx-auto lg:mx-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Repeat size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Subscribe & Save 15%</h4>
                    <p className="text-[11px] text-slate-400">Automated recurring doorstep delivery</p>
                  </div>
                </div>
                <button
                  onClick={() => setAutoshipActive(!autoshipActive)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors cursor-pointer flex items-center ${
                    autoshipActive ? "bg-blue-600 justify-end" : "bg-slate-700 justify-start"
                  }`}
                  aria-label="Toggle autoship subscription"
                >
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-5 h-5 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 mt-8">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }}>
                  <Link
                    to={`/template/${templateId}/shop`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 min-h-11 cursor-pointer"
                  >
                    Explore Collection <ArrowRight size={16} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }}>
                  <Link
                    to={`/template/${templateId}/shop?category=Smartphones`}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white border border-white/15 rounded-xl font-semibold text-sm transition-all min-h-11"
                  >
                    View 5G Smartphones
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full max-w-xs sm:max-w-sm bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative group cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-[11px] font-bold rounded-full border border-blue-400/30">
                    Flagship Pick
                  </span>
                  <span className="text-xs font-mono text-slate-400">Apple A18 Chip</span>
                </div>

                <div className="py-4 flex items-center justify-center">
                  <img
                    src="/images/products/21.webp"
                    alt="Apple iPhone 16"
                    className="max-h-60 sm:max-h-68 object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={handleImageError}
                  />
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white text-base">Apple iPhone 16</h4>
                    <span className="text-blue-400 font-mono font-bold text-sm">$799.00</span>
                  </div>
                  <Link
                    to={`/template/${templateId}/product/apple-iphone-16-5g`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-colors shadow-md shadow-blue-600/30 min-h-9 inline-flex items-center"
                  >
                    View Device
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    ),

    // 03 MARKETPLACE: Energetic, promotional, floating collage objects, countdown timer, pulsing deal tags
    marketplace: (
      <div className="bg-linear-to-r from-red-600 via-rose-600 to-orange-600 text-white relative overflow-hidden">
        <Container className="py-12 md:py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-wide uppercase mb-4 animate-badge-pulse">
                <Flame size={14} className="text-yellow-300" />
                <span>Today's Flash Deals — Up to 50% Off</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight" style={{ fontFamily: template.theme.fontDisplay }}>
                {template.hero.title}
              </h1>
              <p className="mt-3 text-white/90 text-sm sm:text-base max-w-xl">{template.hero.subtitle}</p>

              {/* Live Countdown Timer */}
              <MarketplaceCountdown />

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mt-6">
                <Link
                  to={`/template/${templateId}/shop`}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-red-600 rounded-xl font-bold text-sm hover:bg-gray-100 transition-colors shadow-lg min-h-11"
                >
                  {template.hero.ctaText} <ArrowRight size={16} />
                </Link>
                <Link
                  to={`/template/${templateId}/shop?category=Smartphones`}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-black/25 backdrop-blur-md text-white rounded-xl font-semibold text-sm hover:bg-black/35 transition-colors min-h-11"
                >
                  Phone Deals
                </Link>
              </div>
            </div>

            {/* Floating Objects Collage */}
            <div className="grid grid-cols-2 gap-3.5 w-full sm:w-auto">
              <motion.div
                animate={isReduced ? {} : { y: [0, -8, 0], rotate: [0, -1, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="bg-white rounded-2xl p-4 shadow-xl text-gray-900 flex flex-col items-center text-center"
              >
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded animate-badge-pulse">Save 19%</span>
                <img src="/images/products/2.webp" alt="Nike Free RN" className="w-20 h-20 sm:w-24 sm:h-24 object-contain my-2" onError={handleImageError} />
                <span className="text-xs font-bold truncate w-full">Nike Free RN</span>
                <span className="text-sm font-extrabold text-red-600 mt-0.5">$129.99</span>
              </motion.div>
              <motion.div
                animate={isReduced ? {} : { y: [0, 8, 0], rotate: [0, 1, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="bg-white rounded-2xl p-4 shadow-xl text-gray-900 flex flex-col items-center text-center"
              >
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2 py-0.5 rounded animate-badge-pulse">Save 14%</span>
                <img src="/images/products/22.webp" alt="realme P4s" className="w-20 h-20 sm:w-24 sm:h-24 object-contain my-2" onError={handleImageError} />
                <span className="text-xs font-bold truncate w-full">realme P4s 5G</span>
                <span className="text-sm font-extrabold text-red-600 mt-0.5">$299.00</span>
              </motion.div>
            </div>
          </div>
        </Container>
      </div>
    ),

    // 04 FORMA / PREMIUM: Slow editorial, soft fades, clip-path curtain reveal, gentle drift
    premium: (
      <div className="bg-[#fcfaf7] border-b border-[#e8e4de] overflow-hidden">
        <Container className="py-16 md:py-24">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7 text-center md:text-left"
            >
              <p className="text-xs tracking-[0.35em] text-[#a67c42] uppercase font-semibold mb-4">Maison Édition</p>
              <h1 className="text-3xl sm:text-5xl md:text-6xl leading-[1.15] text-stone-900 font-normal font-serif">
                {template.hero.title}
              </h1>
              <p className="mt-4 text-stone-600 text-sm sm:text-base max-w-lg mx-auto md:mx-0 leading-relaxed">
                {template.hero.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center md:justify-start gap-5">
                <Link
                  to={`/template/${templateId}/shop`}
                  className="inline-flex items-center gap-3 px-8 py-3.5 bg-stone-900 text-white text-xs font-semibold tracking-widest uppercase hover:bg-stone-800 transition-colors min-h-11"
                >
                  {template.hero.ctaText} <ArrowRight size={14} />
                </Link>
                <Link
                  to={`/template/${templateId}/shop?category=Beauty`}
                  className="text-xs font-semibold tracking-widest uppercase text-stone-600 hover:text-stone-900 border-b border-stone-400 pb-0.5 min-h-11 inline-flex items-center"
                >
                  Parfums & Beauty
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0)" }}
              viewport={{ once: true }}
              transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-5 flex justify-center"
            >
              <div className="w-64 sm:w-72 aspect-3/4 bg-white shadow-xl p-5 relative border border-stone-200/80">
                <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase">PARIS ARCHIVE</span>
                <img
                  src="/images/products/7.webp"
                  alt="Chanel Gabrielle"
                  className="w-full h-full object-cover mt-2"
                  onError={handleImageError}
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </div>
    ),

    // 05 MONO / FASHION: Sharp & editorial, headline revealed from mask, marquee, stats count up
    fashion: (
      <div className="bg-white border-b border-gray-200 overflow-hidden">
        <Container className="py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12">
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-rose-50 text-rose-600 text-xs font-bold tracking-widest uppercase mb-4">
                SS25 LOOKBOOK
              </span>
              {/* Oversized headline revealed from mask */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                  className="text-4xl sm:text-6xl font-bold text-black leading-[1.05] tracking-tight font-serif"
                >
                  {template.hero.title}
                </motion.h1>
              </div>
              <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-md mx-auto md:mx-0">{template.hero.subtitle}</p>

              {/* Stats Counters */}
              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-100">
                <div>
                  <span className="block font-black text-lg text-black">
                    <AnimatedCounter value="240+" />
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Archive Items</span>
                </div>
                <div>
                  <span className="block font-black text-lg text-black">
                    <AnimatedCounter value="48" />h
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Global Dispatch</span>
                </div>
                <div>
                  <span className="block font-black text-lg text-black">
                    <AnimatedCounter value="99.8" />%
                  </span>
                  <span className="text-[10px] uppercase font-bold text-gray-400">Client Rating</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8">
                <Link
                  to={`/template/${templateId}/shop?category=Fashion`}
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-black text-white text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-colors min-h-11"
                >
                  {template.hero.ctaText} <ArrowRight size={15} />
                </Link>
                <Link
                  to={`/template/${templateId}/shop`}
                  className="px-6 py-3.5 border border-black text-xs font-bold tracking-widest uppercase hover:bg-gray-50 transition-colors min-h-11 inline-flex items-center"
                >
                  Explore All
                </Link>
              </div>
            </div>
            <div className="w-full md:w-96 lg:w-110 h-72 sm:h-96 md:h-115 overflow-hidden relative shadow-lg shrink-0">
              <img
                src="/images/products/17.webp"
                alt="SS25 Fashion Editorial"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                onError={handleImageError}
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-xs font-semibold text-gray-900 shadow-sm">
                French Linen Shirt — $78
              </div>
            </div>
          </div>
        </Container>

        {/* Infinite Horizontal Brand Marquee */}
        <div className="border-t border-b border-black/10 py-3 bg-neutral-900 text-white overflow-hidden select-none">
          <div className="animate-marquee gap-8 items-center text-xs font-mono uppercase tracking-widest">
            {["AETHER PARIS", "KINETIC STUDIO", "RAW NOIR", "STUDIO VOID", "ATELIER SS25", "OFF-LINE ARCHIVE", "PROTOTYPE 01"].map((b, i) => (
              <span key={i} className="flex items-center gap-8 shrink-0">
                <span>{b}</span>
                <span className="text-rose-500">•</span>
              </span>
            ))}
            {["AETHER PARIS", "KINETIC STUDIO", "RAW NOIR", "STUDIO VOID", "ATELIER SS25", "OFF-LINE ARCHIVE", "PROTOTYPE 01"].map((b, i) => (
              <span key={`dup-${i}`} className="flex items-center gap-8 shrink-0">
                <span>{b}</span>
                <span className="text-rose-500">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    ),

    // 06 SHOPLUXE / BOLD: Smooth & premium, layered parallax, rotating discount badge, gold shimmer
    bold: (
      <div className="bg-[#0a0a0a] border-b border-zinc-800 relative overflow-hidden text-white">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <Container className="py-14 sm:py-24 relative z-10">
          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-mono uppercase tracking-wider mb-5">
                <Zap size={14} /> Cyber Edition 2025
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-none tracking-tighter" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                {template.hero.title}
                <span className="text-orange-500">.</span>
              </h1>
              <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-lg mx-auto md:mx-0 leading-relaxed font-normal">
                {template.hero.subtitle}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-8">
                {/* Gold Shimmer Button */}
                <Link
                  to={`/template/${templateId}/shop`}
                  className="gold-shimmer-btn inline-flex items-center justify-center px-8 py-3.5 text-black rounded-xl font-black text-sm shadow-lg shadow-amber-500/20 min-h-11 cursor-pointer"
                >
                  {template.hero.ctaText} →
                </Link>
                <Link
                  to={`/template/${templateId}/shop?category=Smartphones`}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-zinc-900 border border-zinc-700 text-white rounded-xl font-bold text-sm hover:bg-zinc-800 transition-colors min-h-11"
                >
                  View 5G Phones
                </Link>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center relative">
              {/* Rotating Circular Discount Badge */}
              <div className="absolute -top-5 -right-2 sm:-right-4 z-20 w-24 h-24 rounded-full border-2 border-dashed border-orange-500 bg-black/90 p-2 flex items-center justify-center text-center animate-spin-slow shadow-xl">
                <span className="text-[10px] font-black uppercase text-orange-400 tracking-tighter leading-none">
                  UP TO<br />50% OFF<br />DEALS
                </span>
              </div>

              <div className="w-64 sm:w-72 aspect-4/5 bg-zinc-900 rounded-2xl p-5 border border-zinc-700/80 shadow-2xl relative flex flex-col justify-between group">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-orange-400">GLYPH MATRIX</span>
                  <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-[10px] font-bold rounded">SNAPDRAGON</span>
                </div>
                <img
                  src="/images/products/25.webp"
                  alt="Nothing Phone 3 Pro"
                  className="w-full h-56 object-contain my-auto transition-transform duration-500 group-hover:scale-105"
                  onError={handleImageError}
                />
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800">
                  <span className="text-white font-bold text-xs">Nothing Phone (3)</span>
                  <span className="text-orange-400 font-mono font-bold text-xs">$699.00</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    ),

    // 07 GENERAL STORE
    general: (
      <div className="bg-linear-to-br from-sky-50 via-white to-cyan-50">
        <Container className="py-12 md:py-18">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full mb-3">
                Free shipping on orders over $50
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
                {template.hero.title}
              </h1>
              <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">{template.hero.subtitle}</p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-6">
                <Link
                  to={`/template/${templateId}/shop`}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-sky-500 text-white rounded-xl font-semibold text-sm hover:bg-sky-600 transition-colors shadow-md shadow-sky-500/25 min-h-11"
                >
                  {template.hero.ctaText} →
                </Link>
                <Link
                  to={`/template/${templateId}/shop?sort=popular`}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-white text-slate-700 border border-slate-200 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors min-h-11"
                >
                  Popular Picks
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 sm:w-72 aspect-square bg-white rounded-2xl p-6 shadow-lg border border-slate-100 flex items-center justify-center">
                <img
                  src="/images/products/4.webp"
                  alt="Apple Watch Series 10"
                  className="w-4/5 h-4/5 object-contain"
                  onError={handleImageError}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    ),

    // 08 PRODUCT FOCUS
    "product-focus": (
      <div className="bg-linear-to-br from-violet-50 via-white to-purple-50">
        <Container className="py-12 md:py-20">
          <div className="max-w-2xl mx-auto text-center mb-8">
            <span className="px-3 py-1 bg-violet-100 text-violet-700 text-xs font-bold rounded-full uppercase tracking-wider">
              Flagship Spotlight
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 leading-tight mt-3" style={{ fontFamily: template.theme.fontDisplay }}>
              {template.hero.title}
            </h1>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">{template.hero.subtitle}</p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-violet-100 grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <img
                src="/images/products/29.webp"
                alt="Samsung Galaxy S26 Ultra"
                className="max-h-64 sm:max-h-72 object-contain"
                onError={handleImageError}
              />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600">Titanium Series</span>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">Samsung Galaxy S26 Ultra</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                Titanium chassis, integrated S-Pen stylus, Quad Periscope 100x zoom telephoto system, and Snapdragon 8 Gen 5 Extreme.
              </p>
              <div className="flex items-center gap-3 my-4">
                <span className="text-2xl font-bold text-gray-900">$1,299.00</span>
                <span className="px-2.5 py-0.5 bg-red-100 text-red-600 font-bold text-xs rounded-md">Save $100</span>
              </div>
              <div className="flex gap-3">
                <Link
                  to={`/template/${templateId}/product/samsung-galaxy-s26-ultra-with-s-pen`}
                  className="flex-1 text-center py-3 bg-violet-600 text-white font-semibold rounded-xl hover:bg-violet-700 transition-colors shadow-md shadow-violet-600/25 text-sm min-h-11 inline-flex items-center justify-center"
                >
                  View Product
                </Link>
                <Link
                  to={`/template/${templateId}/shop`}
                  className="px-5 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm min-h-11 inline-flex items-center justify-center"
                >
                  All Products
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    ),
  };

  const productGridClass = "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8";
  const isMinimal = templateId === "minimal";
  const isForma = templateId === "premium";
  const isFashion = templateId === "fashion";

  const sectionBg = isDark
    ? (isMinimal ? "bg-[#09090b]" : isForma ? "bg-[#161412]" : isFashion ? "bg-black" : "bg-[#0d0d0d]")
    : (isForma ? "bg-[#fcfaf7]" : "bg-white");

  const sectionBgAlt = isDark
    ? (isMinimal ? "bg-[#121214]" : isForma ? "bg-[#1e1b18]" : isFashion ? "bg-neutral-900" : "bg-[#141416]")
    : (isForma ? "bg-[#f5f2ec]" : isMinimal ? "bg-neutral-50" : "bg-[#f8fafc]");

  const headingColor = isDark ? "text-white" : "text-gray-900";
  const mutedText = isDark ? "text-zinc-400" : "text-gray-500";
  const borderColor = isDark ? (isForma ? "border-[#332d26]" : "border-zinc-800") : (isForma ? "border-[#e8e4de]" : "border-slate-100");

  return (
    <div>
      {/* Hero Showcase */}
      {heroStyles[templateId]}

      {/* Categories Grid with Scroll Reveal */}
      <section className={`${sectionBg} py-12 md:py-20 transition-colors`}>
        <Container>
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block mb-1">
                  Explore Collections
                </span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold ${headingColor}`} style={{ fontFamily: template.theme.fontDisplay }}>
                  Shop by Category
                </h2>
              </div>
              <Link
                to={`/template/${templateId}/shop`}
                className={`text-sm font-semibold ${mutedText} hover:text-blue-600 transition-colors flex items-center gap-1 min-h-11`}
              >
                View All <ChevronRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredCategories.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/template/${templateId}/shop?category=${encodeURIComponent(cat.name)}`}
                  className={`group relative overflow-hidden aspect-4/5 md:aspect-4/3 rounded-2xl flex items-end p-4 sm:p-5 transition-all duration-300 hover:shadow-xl border ${
                    isDark ? "border-zinc-800 bg-zinc-900" : "border-slate-100 bg-slate-50"
                  }`}
                  style={{ borderRadius: template.theme.radius === "0px" ? "0" : undefined }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/40 to-transparent transition-opacity group-hover:opacity-90" />
                  <div className="relative z-10 text-white text-left">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block mb-0.5">
                      {cat.tagline || "Collection"}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-white group-hover:translate-x-0.5 transition-transform">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/80">{getCategoryItemCount(cat.name)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Featured Products with Sliding Pill Filter for Clean Commerce (01) */}
      <section className={`${sectionBgAlt} py-12 md:py-20 border-t ${borderColor} transition-colors`}>
        <Container>
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block mb-1">
                  Top Rated Picks
                </span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold ${headingColor}`} style={{ fontFamily: template.theme.fontDisplay }}>
                  Featured Products
                </h2>
              </div>

              {/* Template 01 sliding pill filter tabs */}
              {templateId === "minimal" ? (
                <div className="flex items-center gap-1 p-1 rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700">
                  {[
                    { id: "all", label: "All" },
                    { id: "smartphones", label: "Smartphones" },
                    { id: "fashion", label: "Fashion" },
                    { id: "accessories", label: "Accessories" },
                  ].map((pill) => {
                    const active = minimalFilter === pill.id;
                    return (
                      <button
                        key={pill.id}
                        onClick={() => setMinimalFilter(pill.id)}
                        className={`relative px-3.5 py-1 text-xs font-semibold rounded-full transition-colors cursor-pointer ${
                          active
                            ? isDark ? "text-white" : "text-black"
                            : isDark ? "text-zinc-400 hover:text-white" : "text-slate-500 hover:text-black"
                        }`}
                      >
                        {active && (
                          <motion.div
                            layoutId="minimal-pill-highlight"
                            className={`absolute inset-0 rounded-full shadow-xs ${
                              isDark ? "bg-zinc-700" : "bg-white"
                            }`}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{pill.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <Link
                  to={`/template/${templateId}/shop`}
                  className={`text-sm font-semibold ${mutedText} hover:text-blue-600 transition-colors flex items-center gap-1 min-h-11`}
                >
                  Browse Shop <ChevronRight size={16} />
                </Link>
              )}
            </div>

            <motion.div layout className={productGridClass}>
              <AnimatePresence mode="popLayout">
                {displayedFeatured.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} templateId={templateId} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      {/* High-Impact Promo Banner */}
      <section className={`${sectionBg} py-12 md:py-20 border-t ${borderColor} transition-colors`}>
        <Container>
          <Reveal>
            <div
              className={`${
                isDark
                  ? "bg-linear-to-r from-orange-500/20 via-zinc-900 to-zinc-900 border-zinc-700"
                  : "bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-slate-800"
              } border p-6 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden`}
              style={{ borderRadius: template.theme.radius === "0px" ? "0" : undefined }}
            >
              <div className="relative z-10 max-w-xl text-center md:text-left">
                <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold uppercase tracking-wider text-amber-300 inline-block mb-3">
                  Storefront Special
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
                  Get 20% Off Your Entire Order
                </h3>
                <p className="mt-2 text-slate-300 text-sm sm:text-base">
                  Apply coupon code{" "}
                  <span className="font-mono font-bold text-amber-300 bg-white/15 px-2.5 py-1 rounded-md inline-block">
                    WELCOME20
                  </span>{" "}
                  at checkout on any order over $50.
                </p>
              </div>
              <Link
                to={`/template/${templateId}/shop`}
                className={`relative z-10 w-full md:w-auto inline-flex items-center justify-center min-h-11 px-8 py-3.5 font-bold text-sm transition-all duration-300 shrink-0 cursor-pointer ${
                  isDark
                    ? "bg-orange-500 text-black hover:bg-orange-400 rounded-xl shadow-lg shadow-orange-500/25"
                    : "bg-white text-slate-900 hover:bg-slate-100 rounded-xl shadow-lg hover:-translate-y-0.5"
                }`}
                style={{ borderRadius: template.theme.radius === "0px" ? "0" : undefined }}
              >
                Shop Deals Now
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Trending Now */}
      <section className={`${sectionBgAlt} py-12 md:py-20 border-t ${borderColor} transition-colors`}>
        <Container>
          <Reveal>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-blue-600 block mb-1">
                  Customer Favorites
                </span>
                <h2 className={`text-2xl sm:text-3xl font-extrabold ${headingColor}`} style={{ fontFamily: template.theme.fontDisplay }}>
                  Trending Now
                </h2>
              </div>
              <Link
                to={`/template/${templateId}/shop?sort=popular`}
                className={`text-sm font-semibold ${mutedText} hover:text-blue-600 transition-colors flex items-center gap-1 min-h-11`}
              >
                See All <ChevronRight size={16} />
              </Link>
            </div>

            <div className={productGridClass}>
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} templateId={templateId} />
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Services / Trust Badges */}
      <section className={`${sectionBg} py-12 md:py-20 border-t ${borderColor} transition-colors`}>
        <Container>
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: Truck, title: "Free Global Shipping", desc: "On all orders above $50" },
                { icon: Shield, title: "Secure Checkout", desc: "Bank-grade encrypted payments" },
                { icon: RotateCcw, title: "30-Day Easy Returns", desc: "Hassle-free return policy" },
                { icon: Headphones, title: "24/7 Dedicated Support", desc: "Instant response team" },
              ].map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className={`text-center p-5 sm:p-6 rounded-2xl flex flex-col items-center justify-center ${
                    isDark ? "bg-zinc-900 border border-zinc-800" : "bg-white border border-slate-100 shadow-xs"
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 ${
                      isDark ? "bg-orange-500/10 text-orange-400" : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    <Icon size={24} strokeWidth={1.75} />
                  </div>
                  <h4 className={`font-bold text-xs sm:text-sm ${headingColor}`}>{title}</h4>
                  <p className={`text-[11px] sm:text-xs ${mutedText} mt-1 leading-relaxed`}>{desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Newsletter */}
      <section className={`${isDark ? "bg-zinc-900 border-t border-zinc-800" : "bg-slate-900"} py-14 sm:py-20 text-white`}>
        <Container>
          <div className="max-w-xl mx-auto text-center">
            <span className="text-xs uppercase font-bold tracking-widest text-blue-400 block mb-2">Newsletter</span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white" style={{ fontFamily: template.theme.fontDisplay }}>
              Stay in the Loop
            </h3>
            <p className="mt-2 text-slate-300 text-sm">Subscribe for new drop alerts, secret discount codes, and tech launches.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
              className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto w-full"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 min-h-11 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                aria-label="Email address for newsletter"
                required
              />
              <button
                type="submit"
                className={`inline-flex items-center justify-center min-h-11 px-6 py-3 font-bold text-sm rounded-xl transition-all cursor-pointer ${
                  isDark ? "bg-orange-500 text-black hover:bg-orange-400 shadow-lg shadow-orange-500/25" : "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-600/30"
                }`}
              >
                Subscribe
              </button>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
}
