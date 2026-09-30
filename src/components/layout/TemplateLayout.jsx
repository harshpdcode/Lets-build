import { useState } from "react";
import { useParams, Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Search, ShoppingBag, Heart, Menu, X, ChevronLeft,
  ChevronDown, Sparkles, Sun, Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import templates from "../../data/templates";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useTheme } from "../../context/ThemeContext";
import { useFlyToCart } from "../../context/FlyToCartContext";
import { runViewTransition } from "../../motion/viewTransition";
import SearchModal from "../common/SearchModal";
import CartDrawer from "../common/CartDrawer";
import ScrollProgress from "../common/ScrollProgress";
import Container from "../common/Container";

export default function TemplateLayout() {
  const { templateId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const template = templates.find((t) => t.id === templateId);
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { isDark: isThemeDark, toggleTheme } = useTheme();
  const { badgeBouncing } = useFlyToCart();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [templateMenuOpen, setTemplateMenuOpen] = useState(false);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-md mx-4">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Template Not Found</h1>
          <p className="text-gray-500 mb-6 text-sm">The selected storefront template does not exist.</p>
          <Link to="/" className="inline-flex items-center justify-center min-h-11 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors">
            Back to Template Gallery
          </Link>
        </div>
      </div>
    );
  }

  // Determine dark state (template 06 bold is dark by default, or global theme toggle)
  const isDark = template.id === "bold" || isThemeDark;

  const navLinks = [
    { label: "Home", path: `/template/${templateId}` },
    { label: "Shop", path: `/template/${templateId}/shop` },
    { label: "Smartphones", path: `/template/${templateId}/shop?category=Smartphones` },
    { label: "Fashion", path: `/template/${templateId}/shop?category=Fashion` },
    { label: "Accessories", path: `/template/${templateId}/shop?category=Accessories` },
  ];

  const headerBg = isDark ? "bg-[#0d0d0d]/95 backdrop-blur-md border-zinc-800" : "bg-white/95 backdrop-blur-md border-slate-100";
  const textColor = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-zinc-400" : "text-slate-500";
  const hoverBg = isDark ? "hover:bg-zinc-800" : "hover:bg-slate-100";
  // Responsive icons must be clearly visible and dark when header is white (addressing user screenshot)
  const actionIconColor = isDark ? "text-zinc-100 hover:text-white" : "text-slate-900 hover:text-black";

  // Branded Store Emblem Icons
  const storeEmblems = {
    minimal: <div className="w-8 h-8 rounded-sm bg-black text-white flex items-center justify-center font-mono font-bold text-xs tracking-tighter">MO</div>,
    modern: <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-blue-500/25">NX</div>,
    marketplace: <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-red-500/25">SH</div>,
    premium: <div className="w-8 h-8 rounded-sm bg-[#1c1917] text-[#c9a96e] border border-[#c9a96e]/70 flex items-center justify-center font-serif font-bold text-xs">LM</div>,
    fashion: <div className="w-8 h-8 rounded-none bg-black text-white flex items-center justify-center font-serif italic font-bold text-xs">UR</div>,
    bold: <div className="w-8 h-8 rounded-xl bg-orange-500 text-black flex items-center justify-center font-black text-xs shadow-md shadow-orange-500/30">NV</div>,
    general: <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-xs shadow-md shadow-sky-500/25">NO</div>,
    "product-focus": <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-extrabold text-xs shadow-md shadow-violet-600/25">SP</div>,
  };

  const handleTemplateSwitch = (t, e) => {
    setTemplateMenuOpen(false);
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
    <div className={`template-${templateId} min-h-screen ${isDark ? "bg-[#0d0d0d] text-white" : "bg-white text-slate-900"}`} style={{ fontFamily: template.theme.fontFamily }}>
      {/* Scroll Progress Bar for Templates 01, 05, and 06 */}
      <ScrollProgress templateId={templateId} />

      {/* Top Template Showcase Switcher Bar */}
      <div className={`${isDark ? "bg-[#141414] border-zinc-800 text-zinc-300" : "bg-slate-900 text-white border-slate-800"} border-b py-2.5 relative z-50 text-xs`}>
        <Container className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-slate-300 hover:text-white transition-colors shrink-0 min-h-9"
          >
            <ChevronLeft size={16} />
            <img src="/logo.png" alt="LET'S BUILD" className="w-5 h-5 rounded-sm object-contain border border-slate-700" />
            <span className="hidden sm:inline font-bold">LET'S BUILD</span>
            <span className="text-slate-400">·</span>
            <span>All Templates</span>
          </Link>

          {/* Right Controls: Dark/Light Mode & Template Popover */}
          <div className="flex items-center gap-3">
            {/* Dark/Light Mode Circular Wipe Toggle */}
            <button
              onClick={(e) => toggleTheme(e)}
              className="flex items-center gap-1.5 px-3 py-1.5 min-h-9 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors cursor-pointer border border-white/15"
              aria-label="Toggle theme mode"
              title="Toggle theme (Circular Wipe)"
            >
              {isDark ? <Sun size={13} className="text-amber-300" /> : <Moon size={13} className="text-blue-300" />}
              <span className="text-[11px] font-semibold hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
            </button>

            {/* Quick Template Switcher Popover */}
            <div className="relative">
              <button
                onClick={() => setTemplateMenuOpen(!templateMenuOpen)}
                className="flex items-center gap-2 px-3.5 py-1.5 min-h-9 bg-white/10 hover:bg-white/20 rounded-full font-semibold transition-all border border-white/15 cursor-pointer"
              >
                <Sparkles size={13} className="text-amber-400" />
                <span>{template.number} — {template.name}</span>
                <ChevronDown size={13} className={`transition-transform duration-200 ${templateMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Template Switcher Dropdown */}
              <AnimatePresence>
                {templateMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setTemplateMenuOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-100 p-2 z-50"
                    >
                      <div className="px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                        <span className="font-bold text-xs uppercase tracking-wider text-slate-400">Switch Design System</span>
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">8 Themes</span>
                      </div>
                      <div className="max-h-80 overflow-y-auto space-y-1">
                        {templates.map((t) => (
                          <button
                            key={t.id}
                            onClick={(e) => handleTemplateSwitch(t, e)}
                            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                              t.id === templateId
                                ? "bg-slate-900 text-white font-bold"
                                : "hover:bg-slate-100 text-slate-700 font-medium"
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono opacity-60">{t.number}</span>
                              <span>{t.name}</span>
                            </div>
                            <span className="text-[10px] opacity-75">{t.storeName}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Storefront Header */}
      <header className={`sticky top-0 z-40 ${headerBg} border-b transition-colors shadow-xs`}>
        <Container className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo + Store Brand */}
          <Link
            to={`/template/${templateId}`}
            className="flex items-center gap-3 shrink-0 py-2 group"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {storeEmblems[templateId] || storeEmblems.modern}
            </motion.div>
            <div>
              <span
                className={`text-xl sm:text-2xl font-black tracking-tight ${textColor}`}
                style={{ fontFamily: template.theme.fontDisplay }}
              >
                {template.storeName}
              </span>
              <span className={`block text-[10px] tracking-wider uppercase font-semibold ${textMuted} -mt-0.5`}>
                {template.storeTagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with animated active underline */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-colors relative py-2 ${
                    isActive
                      ? isDark ? "text-orange-400 font-bold" : "text-blue-600 font-bold"
                      : `${textMuted} hover:${textColor.replace("text-", "")}`
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="active-nav-indicator"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-full ${isDark ? "bg-orange-400" : "bg-blue-600"}`}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Header Action Icons with 44px Minimum Tap Targets & Guaranteed High Contrast */}
          <div className="flex items-center gap-1 sm:gap-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen(true)}
              className={`w-11 h-11 rounded-full ${hoverBg} transition-colors flex items-center justify-center ${actionIconColor} cursor-pointer`}
              aria-label="Search products"
            >
              <Search size={20} strokeWidth={2.2} />
            </motion.button>

            <Link
              to={`/template/${templateId}/wishlist`}
              aria-label="Wishlist"
            >
              <motion.div
                whileTap={{ scale: 0.92 }}
                className={`w-11 h-11 rounded-full ${hoverBg} transition-colors relative flex items-center justify-center ${actionIconColor} cursor-pointer`}
              >
                <Heart size={20} strokeWidth={2.2} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </motion.div>
            </Link>

            <motion.button
              whileTap={{ scale: 0.92 }}
              id="header-cart-icon"
              onClick={() => setCartOpen(true)}
              className={`w-11 h-11 rounded-full ${hoverBg} transition-colors relative flex items-center justify-center ${actionIconColor} cursor-pointer`}
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} strokeWidth={2.2} />
              {itemCount > 0 && (
                <motion.span
                  animate={badgeBouncing ? { scale: [1, 1.4, 0.9, 1.15, 1], y: [0, -4, 2, -1, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className="absolute top-1.5 right-1.5 w-4 h-4 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile Menu Hamburger (44px, clearly visible on white background) */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`w-11 h-11 rounded-full ${hoverBg} transition-colors md:hidden flex items-center justify-center ${actionIconColor} cursor-pointer`}
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
            </motion.button>
          </div>
        </Container>

        {/* Mobile Slide-down Navigation with Spring Entrance */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className={`md:hidden border-t overflow-hidden ${isDark ? "border-zinc-800 bg-[#0d0d0d]" : "border-slate-100 bg-white"} p-4 space-y-2 shadow-xl`}
            >
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center px-4 py-3 rounded-xl text-sm font-bold min-h-11 ${
                      location.pathname === link.path
                        ? isDark ? "bg-orange-500/20 text-orange-400" : "bg-blue-50 text-blue-600"
                        : `${textColor} ${hoverBg}`
                    } transition-colors`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to={`/template/${templateId}/wishlist`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold min-h-11 ${textColor} ${hoverBg}`}
                >
                  Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
                </Link>
                <Link
                  to={`/template/${templateId}/cart`}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-semibold min-h-11 ${textColor} ${hoverBg}`}
                >
                  Cart {itemCount > 0 && `(${itemCount})`}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Outlet for Store Pages */}
      <main className="min-h-[70vh]">
        <Outlet context={{ template, templateId }} />
      </main>

      {/* Storefront Footer */}
      <footer className={`${isDark ? "bg-[#111] border-zinc-800 text-white" : "bg-slate-900 text-white border-slate-800"} border-t mt-16`}>
        <Container className="py-14 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                {storeEmblems[templateId] || storeEmblems.modern}
                <h3 className="text-xl font-bold tracking-tight text-white" style={{ fontFamily: template.theme.fontDisplay }}>
                  {template.storeName}
                </h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
                {template.storeTagline} High-performance multi-template showcase engineered for freelance client presentation.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Catalog</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><Link to={`/template/${templateId}/shop`} className="hover:text-white transition-colors block py-0.5">All Products</Link></li>
                <li><Link to={`/template/${templateId}/shop?category=Smartphones`} className="hover:text-white transition-colors block py-0.5">Smartphones</Link></li>
                <li><Link to={`/template/${templateId}/shop?category=Fashion`} className="hover:text-white transition-colors block py-0.5">Apparel & Fashion</Link></li>
                <li><Link to={`/template/${templateId}/shop?category=Accessories`} className="hover:text-white transition-colors block py-0.5">Luxury Accessories</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Customer Care</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><span className="hover:text-white transition-colors cursor-pointer block py-0.5">Shipping & Delivery</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer block py-0.5">30-Day Returns</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer block py-0.5">Warranty Protection</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer block py-0.5">Help Center & FAQ</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4">Templates</h4>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><Link to="/template/minimal" className="hover:text-white transition-colors block py-0.5">01 Minimal</Link></li>
                <li><Link to="/template/modern" className="hover:text-white transition-colors block py-0.5">02 Modern</Link></li>
                <li><Link to="/template/bold" className="hover:text-white transition-colors block py-0.5">06 Bold Cyber</Link></li>
                <li><Link to="/template/fashion" className="hover:text-white transition-colors block py-0.5">05 Fashion Editorial</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© 2025 {template.storeName} — Designed by LET'S BUILD for freelance client showcase.</p>
            <p className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Frontend-only prototype (Vite + React)
            </p>
          </div>
        </Container>
      </footer>

      {/* Modals & Drawers */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} templateId={templateId} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} templateId={templateId} />
    </div>
  );
}

