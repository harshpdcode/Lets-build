import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

const FlyToCartContext = createContext(null);

export function FlyToCartProvider({ children }) {
  const [flyingItem, setFlyingItem] = useState(null);
  const [badgeBouncing, setBadgeBouncing] = useState(false);

  const flyToCart = useCallback((sourceElement, imageSrc) => {
    if (!sourceElement || !imageSrc) return;

    const sourceRect = sourceElement.getBoundingClientRect();
    const cartIcon = document.getElementById("header-cart-icon") || document.querySelector('[aria-label="Shopping cart"]');

    if (!cartIcon) return;

    const targetRect = cartIcon.getBoundingClientRect();

    setFlyingItem({
      id: Date.now(),
      imageSrc,
      startX: sourceRect.left + sourceRect.width / 2 - 32,
      startY: sourceRect.top + sourceRect.height / 2 - 32,
      endX: targetRect.left + targetRect.width / 2 - 16,
      endY: targetRect.top + targetRect.height / 2 - 16,
    });
  }, []);

  const onFlyComplete = useCallback(() => {
    setFlyingItem(null);
    setBadgeBouncing(true);
    setTimeout(() => setBadgeBouncing(false), 600);
  }, []);

  return (
    <FlyToCartContext.Provider value={{ flyToCart, badgeBouncing }}>
      {children}

      {/* Floating Animated Ghost Item */}
      <AnimatePresence>
        {flyingItem && (
          <motion.div
            key={flyingItem.id}
            initial={{
              position: "fixed",
              left: flyingItem.startX,
              top: flyingItem.startY,
              width: 64,
              height: 64,
              scale: 1,
              opacity: 0.95,
              zIndex: 9999,
              pointerEvents: "none",
            }}
            animate={{
              left: flyingItem.endX,
              top: flyingItem.endY,
              width: 28,
              height: 28,
              scale: 0.4,
              opacity: 0.2,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1],
            }}
            onAnimationComplete={onFlyComplete}
            className="rounded-xl overflow-hidden shadow-2xl border-2 border-white bg-white flex items-center justify-center p-1"
          >
            <img
              src={flyingItem.imageSrc}
              alt=""
              className="w-full h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </FlyToCartContext.Provider>
  );
}

export function useFlyToCart() {
  const context = useContext(FlyToCartContext);
  if (!context) {
    throw new Error("useFlyToCart must be used within a FlyToCartProvider");
  }
  return context;
}

export default FlyToCartContext;
