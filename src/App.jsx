import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./context/ToastContext";
import { FlyToCartProvider } from "./context/FlyToCartContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import TemplateGallery from "./pages/TemplateGallery";
import TemplateLayout from "./components/layout/TemplateLayout";
import TemplateHome from "./pages/TemplateHome";
import ShopPage from "./pages/ShopPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import WishlistPage from "./pages/WishlistPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <ToastProvider>
          <FlyToCartProvider>
            <BrowserRouter>
              <CartProvider>
                <WishlistProvider>
                  <ScrollToTop />
                  <Routes>
                    {/* Template Gallery */}
                    <Route path="/" element={<TemplateGallery />} />

                    {/* Template Routes */}
                    <Route path="/template/:templateId" element={<TemplateLayout />}>
                      <Route index element={<TemplateHome />} />
                      <Route path="shop" element={<ShopPage />} />
                      <Route path="product/:slug" element={<ProductPage />} />
                      <Route path="cart" element={<CartPage />} />
                      <Route path="checkout" element={<CheckoutPage />} />
                      <Route path="wishlist" element={<WishlistPage />} />
                    </Route>

                    {/* 404 */}
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </WishlistProvider>
              </CartProvider>
            </BrowserRouter>
          </FlyToCartProvider>
        </ToastProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}

