import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ExternalLink,
  Sparkles,
  ShoppingBag,
  Heart,
  Search,
  Zap,
  ShieldCheck,
  Layers,
  Smartphone,
  Sliders,
  Lock,
  Menu,
  X,
  Compass,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import templates from "../data/templates";
import Container from "../components/common/Container";
import AnimatedCounter from "../components/common/AnimatedCounter";
import useReducedMotion from "../motion/useReducedMotion";
import { runViewTransition } from "../motion/viewTransition";
import { handleImageError } from "../utils/helpers";

// High-Fidelity Realistic Mini Storefront Hero Stage Preview with fixed 16:10 ratio
function MiniStorefrontPreview({ templateId, isDark }) {
  const storeData = {
    minimal: {
      storeName: "MONO",
      subTag: "COLLECTION 01",
      tagline: "Curated Essentials.",
      desc: "Thoughtfully crafted ceramics & carry goods for intentional living.",
      price: "$38.00",
      productName: "Nordic Studio Mug",
      productImg: "/images/products/9.webp",
      bgClass: "bg-[#fafafa] text-gray-900",
      accentPill: "bg-gray-200 text-gray-800",
      ctaBg: "bg-black text-white",
      badge: "Nordic Stoneware",
    },
    modern: {
      storeName: "NEXORA",
      subTag: "FLAGSHIP 2025",
      tagline: "The Future of Shopping.",
      desc: "Next-gen 5G smartphones & titanium devices engineered for performance.",
      price: "$799.00",
      productName: "Apple iPhone 16 (5G)",
      productImg: "/images/products/21.webp",
      bgClass: "bg-linear-to-br from-slate-950 via-slate-900 to-indigo-950 text-white",
      accentPill: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
      ctaBg: "bg-blue-600 text-white",
      badge: "A18 Chip · 48MP",
    },
    marketplace: {
      storeName: "SHOPLY",
      subTag: "MEGA DEALS ACTIVE",
      tagline: "Save Up To 40% Today.",
      desc: "High-volume retail deals on trending sneakers, gadgets, and accessories.",
      price: "$129.99",
      oldPrice: "$159.99",
      productName: "Nike Free RN Flyknit",
      productImg: "/images/products/2.webp",
      bgClass: "bg-linear-to-r from-red-600 via-rose-600 to-orange-500 text-white",
      accentPill: "bg-white/20 text-white font-bold",
      ctaBg: "bg-white text-red-600 font-bold",
      badge: "Flash Deal · -19%",
    },
    premium: {
      storeName: "MAISON PARIS",
      subTag: "ÉDITION PRIVÉE",
      tagline: "Timeless Parisian Elegance.",
      desc: "Haute parfumerie and artisanal Italian saddle leather craftsmanship.",
      price: "$165.00",
      productName: "Chanel Gabrielle Paris",
      productImg: "/images/products/7.webp",
      bgClass: "bg-[#fcfaf7] text-stone-900 font-serif",
      accentPill: "bg-amber-100 text-[#8c6734]",
      ctaBg: "bg-stone-900 text-white font-sans",
      badge: "Maison Archive",
    },
    fashion: {
      storeName: "ATELIER",
      subTag: "LOOKBOOK SS25",
      tagline: "Wear The Moment.",
      desc: "Relaxed European silhouettes, premium French linen, and seasonal tones.",
      price: "$78.00",
      productName: "French Linen Resort Shirt",
      productImg: "/images/products/17.webp",
      bgClass: "bg-white text-black font-sans",
      accentPill: "bg-rose-50 text-rose-600 font-bold",
      ctaBg: "bg-black text-white font-bold",
      badge: "Pure French Linen",
    },
    bold: {
      storeName: "CYBER // CORE",
      subTag: "GLYPH MATRIX",
      tagline: "Break The Mold.",
      desc: "Cyberpunk high-octane hardware, Snapdragon 8 Extreme, and glyph lights.",
      price: "$699.00",
      productName: "Nothing Phone (3) Pro",
      productImg: "/images/products/25.webp",
      bgClass: "bg-linear-to-r from-black via-zinc-950 to-zinc-900 text-white font-mono",
      accentPill: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
      ctaBg: "bg-orange-500 text-black font-black",
      badge: "Snapdragon 8 Elite",
    },
    general: {
      storeName: "NORTH",
      subTag: "ALL-ROUND CATALOG",
      tagline: "Everyday Excellence.",
      desc: "Trusted electronics, smart wearables, and reliable home essentials.",
      price: "$399.00",
      productName: "Apple Watch Series 10",
      productImg: "/images/products/4.webp",
      bgClass: "bg-linear-to-br from-sky-50 via-white to-blue-50 text-slate-900",
      accentPill: "bg-sky-100 text-sky-700",
      ctaBg: "bg-sky-500 text-white",
      badge: "Free 2-Day Shipping",
    },
    "product-focus": {
      storeName: "TITANIUM LAB",
      subTag: "SPEC SHEET DEEP DIVE",
      tagline: "Perfection In Detail.",
      desc: "Oversized macro imagery, titanium frame anatomy, and periscope zoom.",
      price: "$1,299.00",
      productName: "Galaxy S26 Ultra 5G",
      productImg: "/images/products/29.webp",
      bgClass: "bg-linear-to-br from-violet-50 via-white to-purple-50 text-slate-900",
      accentPill: "bg-violet-100 text-violet-700",
      ctaBg: "bg-violet-600 text-white",
      badge: "Quad Periscope Zoom",
    },
  };

  const preview = storeData[templateId] || storeData.modern;

  return (
    <div className={`w-full h-full p-4 sm:p-5 flex items-center justify-between gap-3 select-none ${preview.bgClass}`}>
      <div className="flex-1 min-w-0 pr-2">
        <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider mb-1 ${preview.accentPill}`}>
          {preview.subTag}
        </span>
        <h4 className="text-xs sm:text-sm font-extrabold truncate leading-tight">
          {preview.tagline}
        </h4>
        <p className="text-[10px] sm:text-xs opacity-75 line-clamp-2 mt-1 leading-snug hidden sm:block">
          {preview.desc}
        </p>
        <div className="mt-2.5 flex items-center gap-2">
          <span className="text-xs sm:text-sm font-black">{preview.price}</span>
          <span className={`px-2.5 py-1 text-[10px] font-bold rounded-lg ${preview.ctaBg} shadow-xs`}>
            Demo Store
          </span>
        </div>
      </div>
      <div className="w-24 sm:w-32 h-24 sm:h-32 rounded-xl bg-white/10 backdrop-blur-xs flex items-center justify-center p-2 relative shrink-0">
        <img
          src={preview.productImg}
          alt={preview.productName}
          className="w-full h-full object-contain drop-shadow-md transition-transform duration-700 group-hover/stage:scale-108"
          onError={handleImageError}
        />
      </div>
    </div>
  );
}

function TemplateCard({ template, index }) {
  const navigate = useNavigate();

  const colorMap = {
    minimal: {
      accent: "bg-zinc-900 text-white hover:bg-zinc-800",
      accentText: "text-zinc-900",
      border: "border-zinc-200 hover:border-zinc-400",
      liveDot: "bg-emerald-500",
    },
    modern: {
      accent: "bg-blue-600 text-white hover:bg-blue-500",
      accentText: "text-blue-600",
      border: "border-blue-200 hover:border-blue-400",
      liveDot: "bg-blue-400",
    },
    marketplace: {
      accent: "bg-red-600 text-white hover:bg-red-500",
      accentText: "text-red-600",
      border: "border-red-200 hover:border-red-400",
      liveDot: "bg-emerald-500",
    },
    premium: {
      accent: "bg-[#8c6734] text-white hover:bg-[#735328]",
      accentText: "text-[#8c6734]",
      border: "border-amber-200 hover:border-amber-400",
      liveDot: "bg-emerald-500",
    },
    fashion: {
      accent: "bg-black text-white hover:bg-neutral-800",
      accentText: "text-black",
      border: "border-neutral-300 hover:border-neutral-500",
      liveDot: "bg-emerald-500",
    },
    bold: {
      accent: "bg-orange-500 text-black hover:bg-orange-400 font-bold",
      accentText: "text-orange-400",
      border: "border-zinc-700 hover:border-orange-500",
      liveDot: "bg-orange-400",
    },
    general: {
      accent: "bg-sky-500 text-white hover:bg-sky-600",
      accentText: "text-sky-600",
      border: "border-sky-200 hover:border-sky-400",
      liveDot: "bg-emerald-500",
    },
    "product-focus": {
      accent: "bg-violet-600 text-white hover:bg-violet-500",
      accentText: "text-violet-600",
      border: "border-violet-200 hover:border-violet-400",
      liveDot: "bg-emerald-500",
    },
  };

  const colors = colorMap[template.id] || colorMap.modern;
  const isDark = template.id === "bold";

  const handleLaunch = (e) => {
    e.preventDefault();
    runViewTransition(
      () => {
        navigate(`/template/${template.id}`);
      },
      {
        wipeType: template.id,
        clickEvent: e,
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group relative rounded-2xl border transition-all duration-300 hover:shadow-2xl flex flex-col overflow-hidden ${
        isDark
          ? "bg-zinc-900 border-zinc-700/80 hover:border-orange-500/80 shadow-xl shadow-black/40"
          : "bg-white border-slate-200 hover:border-indigo-400 shadow-lg shadow-slate-200/50"
      }`}
    >
      {/* Top Banner & Browser Chrome */}
      <div className={`p-4 pb-0 ${isDark ? "bg-zinc-950" : "bg-slate-50"}`}>
        <div
          className={`rounded-t-xl overflow-hidden border shadow-sm flex flex-col ${
            isDark ? "border-zinc-700 bg-zinc-900" : "border-slate-200 bg-white"
          }`}
        >
          {/* macOS Browser Header */}
          <div
            className={`flex items-center justify-between px-3.5 py-2.5 border-b text-xs ${
              isDark ? "bg-zinc-800/90 border-zinc-700 text-zinc-400" : "bg-slate-100 border-slate-200 text-slate-500"
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>

            {/* URL Pill */}
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-[11px] font-mono border max-w-44 sm:max-w-xs truncate ${
                isDark
                  ? "bg-zinc-900 border-zinc-700 text-zinc-300"
                  : "bg-white border-slate-200 text-slate-600 shadow-xs"
              }`}
            >
              <Lock size={10} className="text-emerald-500 shrink-0" />
              <span className="truncate">letsbuild.dev/store/{template.id}</span>
            </div>

            {/* Live Indicator */}
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${colors.liveDot} animate-pulse`} />
              <span className="text-[10px] font-semibold uppercase tracking-wider hidden sm:inline">Live</span>
            </div>
          </div>

          {/* Actual Live Preview Mockup Stage with fixed 16:10 aspect ratio */}
          <div className="relative aspect-16/10 overflow-hidden group/stage">
            <MiniStorefrontPreview templateId={template.id} isDark={isDark} />

            {/* Floating Live Badge */}
            {template.badge && (
              <div className="absolute top-2.5 right-2.5 z-10 pointer-events-none">
                <span
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg ${
                    template.id === "bold"
                      ? "bg-orange-500 text-black"
                      : "bg-white/95 backdrop-blur-md text-gray-900 border border-gray-200"
                  }`}
                >
                  ★ {template.badge}
                </span>
              </div>
            )}

            {/* Hover Backdrop Overlay with Enter Button */}
            <button
              onClick={handleLaunch}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4 cursor-pointer"
            >
              <span
                className={`min-h-11 px-6 py-3 rounded-xl font-bold text-sm shadow-xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ${
                  template.id === "bold"
                    ? "bg-orange-500 text-black hover:bg-orange-400"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                Launch Storefront
                <ArrowRight size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Card Info Section */}
      <div className={`p-5 sm:p-6 flex-1 flex flex-col justify-between ${isDark ? "bg-zinc-900" : "bg-white"}`}>
        <div>
          {/* Header Row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono font-bold uppercase tracking-widest ${isDark ? "text-orange-400" : "text-indigo-600"}`}>
                  STOREFRONT {template.number}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                  {template.storeName}
                </span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold mt-1 ${isDark ? "text-white" : "text-slate-900"}`}>
                {template.name}
              </h3>
            </div>
            <span className={`text-xs italic font-medium mt-1 shrink-0 ${isDark ? "text-zinc-400" : "text-slate-500"}`}>
              "{template.storeTagline}"
            </span>
          </div>

          <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-zinc-400" : "text-slate-600"}`}>
            {template.description}
          </p>

          {/* Style & Typography Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2.5 py-1 text-xs font-medium rounded-md border ${
                  isDark
                    ? "bg-zinc-800 text-zinc-300 border-zinc-700"
                    : "bg-slate-50 text-slate-700 border-slate-200"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Launch Button with View Transition trigger */}
        <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
          <button
            onClick={handleLaunch}
            className={`w-full inline-flex items-center justify-center gap-2 min-h-11 py-3 px-5 rounded-xl text-sm font-bold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer ${colors.accent}`}
          >
            <span>Launch {template.name} Storefront</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function TemplateGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const isReduced = useReducedMotion();

  // Desktop Spotlight Glow tracker
  const handleMouseMove = (e) => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024 && !isReduced) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const filterConfigs = [
    { id: "all", label: "All Storefronts", count: 8 },
    { id: "tech", label: "Tech & Flagships", count: 3, ids: ["modern", "bold", "product-focus"] },
    { id: "fashion", label: "Fashion & Editorial", count: 2, ids: ["fashion", "premium"] },
    { id: "minimal", label: "Minimal & Lifestyle", count: 2, ids: ["minimal", "general"] },
    { id: "market", label: "Deals & Marketplace", count: 1, ids: ["marketplace"] },
  ];

  const filteredTemplates = templates.filter((template) => {
    if (activeFilter === "all") return true;
    const current = filterConfigs.find((f) => f.id === activeFilter);
    return current ? current.ids.includes(template.id) : true;
  });

  const handleQuickSwitch = (t, e) => {
    setSwitcherOpen(false);
    runViewTransition(
      () => {
        navigate(`/template/${t.id}`);
      },
      {
        wipeType: t.id,
        clickEvent: e,
      }
    );
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white relative overflow-x-hidden"
    >
      {/* Interactive Cursor Spotlight Glow for Desktop */}
      {!isReduced && (
        <div
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300 hidden lg:block"
          style={{
            background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.08), transparent 75%)`,
          }}
        />
      )}

      {/* Hero Showcase Header */}
      <header className="relative overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[#07080f]" />
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 30%, rgba(99, 102, 241, 0.35) 0%, transparent 45%), radial-gradient(circle at 85% 20%, rgba(168, 85, 247, 0.3) 0%, transparent 45%), radial-gradient(circle at 50% 80%, rgba(56, 189, 248, 0.2) 0%, transparent 50%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Ambient Top Glow Orbs */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Global Showcase Navigation */}
        <nav className="relative z-10 border-b border-slate-800/60">
          <Container className="py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
                <span className="text-white font-extrabold text-sm tracking-wider">LB</span>
              </div>
              <div>
                <span className="text-white font-extrabold text-base tracking-tight block">LET'S BUILD</span>
                <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 block -mt-1">
                  E-Commerce Architecture
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="#templates"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                8 Storefronts
              </a>
              <a
                href="#architecture"
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              >
                Architecture
              </a>
              <button
                onClick={(e) => handleQuickSwitch(templates[1], e)}
                className="inline-flex items-center justify-center min-h-11 px-5 py-2.5 bg-linear-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold rounded-xl hover:from-indigo-500 hover:to-violet-500 transition-all shadow-md shadow-indigo-500/20 shrink-0 cursor-pointer"
              >
                Live Demo
              </button>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={(e) => handleQuickSwitch(templates[1], e)}
                className="inline-flex items-center justify-center min-h-11 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shrink-0 cursor-pointer"
              >
                Live Demo
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </Container>

          {/* Mobile slide-down menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-slate-800 bg-slate-950 p-4 space-y-2 shadow-xl overflow-hidden"
              >
                <a
                  href="#templates"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 min-h-11"
                >
                  8 Storefronts
                </a>
                <a
                  href="#architecture"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 min-h-11"
                >
                  Technical Architecture
                </a>
                <Link
                  to="/template/minimal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-200 hover:bg-slate-900 min-h-11"
                >
                  01 MONO Minimal Demo
                </Link>
                <Link
                  to="/template/modern"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl text-sm font-bold bg-indigo-600 text-white min-h-11"
                >
                  Launch Modern Storefront
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* Hero Headline Content with Animated Word Reveal */}
        <Container className="pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-20 md:pb-28 relative z-10">
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs font-semibold backdrop-blur-md mb-6 shadow-sm"
            >
              <Sparkles size={14} className="text-indigo-400 animate-pulse" />
              <span>Multi-Storefront Showcase 2025</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-mono">8 Live Systems</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]"
            >
              Choose Your{" "}
              <span className="bg-linear-to-r from-indigo-300 via-sky-300 to-purple-300 bg-clip-text text-transparent">
                Storefront.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
              className="mt-5 text-base sm:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl"
            >
              One unified e-commerce foundation powering 8 radically distinct design languages.
              Minimalism, cyberpunk, Parisian luxury, high-fashion editorial, and deal-focused marketplace —
              pre-loaded with 30 curated products and instant client-side state.
            </motion.p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                href="#templates"
                className="inline-flex items-center justify-center gap-2.5 min-h-11 px-8 py-3.5 bg-white text-slate-950 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all shadow-xl shadow-white/10"
              >
                <span>Explore All 8 Storefronts</span>
                <ArrowRight size={16} />
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={(e) => handleQuickSwitch(templates[1], e)}
                className="inline-flex items-center justify-center gap-2 min-h-11 px-7 py-3.5 bg-slate-900 text-white font-semibold text-sm rounded-xl border border-slate-700 hover:bg-slate-800 transition-all cursor-pointer"
              >
                <span>Launch Nexora (Modern)</span>
                <ExternalLink size={14} className="text-slate-400" />
              </motion.button>
            </div>
          </div>

          {/* Stats Bar with Animated Counter */}
          <div className="mt-12 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl">
            {[
              { value: "8", label: "Unique Storefronts", sub: "Individual design systems" },
              { value: "30", label: "Curated Products", sub: "10 lifestyle, 10 fashion, 10 5G" },
              { value: "0", label: "Backend Dependency", sub: "Pure client-side state & routing" },
              { value: "100%", label: "Responsive", sub: "Mobile, tablet & desktop ready" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-4 sm:p-6 backdrop-blur-md"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">{stat.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{stat.sub}</div>
              </div>
            ))}
          </div>
        </Container>
      </header>

      {/* Main Gallery Section */}
      <section id="templates" className="py-16 sm:py-24">
        <Container>
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 block mb-3">
                PORTFOLIO SHOWCASE
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                The 8 Storefront Templates
              </h2>
              <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl">
                Each storefront features bespoke typography, customized layouts, unique card aesthetics,
                and tailored visual storytelling.
              </p>
            </div>

            {/* Filter Tabs with animated sliding pill highlight */}
            <div className="flex md:flex-wrap overflow-x-auto pb-3 md:pb-0 gap-2 max-w-full snap-x scrollbar-none">
              {filterConfigs.map((f) => {
                const active = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`relative snap-start whitespace-nowrap min-h-11 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
                      active ? "text-white" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="gallery-filter-pill"
                        className="absolute inset-0 bg-indigo-600 rounded-xl shadow-md shadow-indigo-600/30"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{f.label} ({f.count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Storefront Preview Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
            {filteredTemplates.map((template, index) => (
              <TemplateCard key={template.id} template={template} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Floating Template Switcher Popover with 6 Thumbnails */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {switcherOpen && (
            <>
              <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs" onClick={() => setSwitcherOpen(false)} />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ type: "spring", stiffness: 350, damping: 26 }}
                className="absolute bottom-16 right-0 w-80 sm:w-96 bg-slate-900/95 border border-slate-700/80 rounded-3xl p-4 shadow-2xl backdrop-blur-xl z-50 text-white"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <Compass size={16} className="text-indigo-400" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Quick Switcher (6 Themes)</h4>
                  </div>
                  <button
                    onClick={() => setSwitcherOpen(false)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {templates.slice(0, 6).map((t) => (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      key={t.id}
                      onClick={(e) => handleQuickSwitch(t, e)}
                      className="p-2.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono font-bold text-indigo-400">{t.number}</span>
                        <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300">Live</span>
                      </div>
                      <h5 className="font-bold text-xs text-white group-hover:text-indigo-300 transition-colors truncate">
                        {t.name}
                      </h5>
                      <p className="text-[10px] text-slate-400 truncate">{t.storeName}</p>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Switcher Toggle Pill */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSwitcherOpen(!switcherOpen)}
          className="flex items-center gap-2.5 px-4 py-3 bg-linear-to-r from-indigo-600 to-violet-600 text-white rounded-full font-bold text-xs shadow-2xl shadow-indigo-600/40 border border-white/20 cursor-pointer"
          aria-label="Open template quick switcher"
        >
          <Sparkles size={16} className="text-amber-300" />
          <span>Switch Template</span>
        </motion.button>
      </div>

      {/* Architecture & What's Included */}
      <section id="architecture" className="bg-slate-900/60 border-t border-slate-800/80 py-16 sm:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400 block mb-3">
              TECHNICAL ARCHITECTURE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Production-Grade Frontend Stack
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base">
              Built with modern React, Vite, and Tailwind CSS. Zero external API or database required —
              ready to deploy to Vercel or connect to Shopify/WooCommerce/Stripe.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: ShoppingBag,
                title: "30 Curated Products",
                desc: "10 lifestyle goods, 10 fashion apparel, and 10 flagship 5G smartphones with rich specs and galleries.",
                accent: "from-blue-500 to-indigo-500",
              },
              {
                icon: Layers,
                title: "Persistent Cart & Drawer",
                desc: "Optimistic cart state with localStorage persistence, slide-out drawer, and dynamic free shipping calculator.",
                accent: "from-emerald-500 to-teal-500",
              },
              {
                icon: Heart,
                title: "Wishlist System",
                desc: "Instant bookmarking with heart toggle animations, session storage, and one-click move to cart.",
                accent: "from-rose-500 to-pink-500",
              },
              {
                icon: Search,
                title: "Instant Search Modal",
                desc: "Fuzzy search across names, brands, descriptions, and tags with quick modal keyboard shortcut.",
                accent: "from-amber-500 to-orange-500",
              },
              {
                icon: Sliders,
                title: "8 Design Systems",
                desc: "Independent color palettes, typography scales (Inter, Space Grotesk, Playfair), and border radii.",
                accent: "from-purple-500 to-violet-500",
              },
              {
                icon: Smartphone,
                title: "100% Touch & Mobile",
                desc: "Engineered from 320px mobile viewports up to 4K displays with responsive drawers and navigation.",
                accent: "from-cyan-500 to-blue-500",
              },
              {
                icon: Zap,
                title: "Instant Store Switching",
                desc: "Seamless switcher in the top banner allows instant preview of all 8 templates without losing cart state.",
                accent: "from-yellow-500 to-amber-500",
              },
              {
                icon: ShieldCheck,
                title: "Zero Backend Needed",
                desc: "Fully standalone frontend code. Blazing fast, free hosting on GitHub Pages, Vercel, or Netlify.",
                accent: "from-emerald-500 to-green-500",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-all hover:-translate-y-1 group"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-linear-to-br ${item.accent} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-105 transition-transform`}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Freelance CTA Banner */}
      <section className="py-16 sm:py-24">
        <Container>
          <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 border border-indigo-500/30 bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 shadow-2xl text-center flex flex-col items-center justify-center">
            <div className="relative z-10 max-w-[65ch] mx-auto text-center">
              <span className="px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold uppercase tracking-wider inline-block mb-3">
                Hire Let's Build
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Need a Custom E-Commerce Storefront Built?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
                We design and develop high-conversion custom storefronts for modern brands.
                From bespoke React architectures to Shopify headless integrations — LET'S BUILD brings your vision to life.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full sm:w-auto">
              <a
                href="mailto:hello@letsbuild.dev"
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-11 px-8 py-3.5 bg-white text-slate-950 font-bold text-sm rounded-xl hover:bg-slate-100 transition-all text-center shadow-xl shadow-white/10"
              >
                Get in Touch
              </a>
              <button
                onClick={(e) => handleQuickSwitch(templates[1], e)}
                className="w-full sm:w-auto inline-flex items-center justify-center min-h-11 px-7 py-3.5 bg-slate-800/80 hover:bg-slate-800 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-all text-center cursor-pointer"
              >
                Explore Templates
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#05060a] py-8 text-center sm:text-left">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
              <span className="text-white font-extrabold text-xs">LB</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-white tracking-tight">LET'S BUILD</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">Multi-Template E-Commerce Suite</span>
          </div>
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} LET'S BUILD. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
