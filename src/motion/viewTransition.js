import { flushSync } from "react-dom";

export function isViewTransitionSupported() {
  return (
    typeof document !== "undefined" &&
    typeof document.startViewTransition === "function"
  );
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Universal View Transition helper with graceful fallback
 */
export function runViewTransition(updateCallback, options = {}) {
  const { wipeType = "fade", clickEvent = null, onComplete = null } = options;

  if (!isViewTransitionSupported() || prefersReducedMotion()) {
    // Graceful fallback: instant update
    if (typeof flushSync === "function") {
      flushSync(() => {
        updateCallback();
      });
    } else {
      updateCallback();
    }
    if (onComplete) onComplete();
    return Promise.resolve();
  }

  // Set transition type attribute for CSS styling
  document.documentElement.dataset.viewTransition = wipeType;

  const transition = document.startViewTransition(() => {
    flushSync(() => {
      updateCallback();
    });
  });

  transition.ready.then(() => {
    applyWipeAnimation(wipeType, clickEvent);
  });

  transition.finished.finally(() => {
    delete document.documentElement.dataset.viewTransition;
    if (onComplete) onComplete();
  });

  return transition.finished;
}

/**
 * Applies template-specific or theme-specific animation effects
 */
function applyWipeAnimation(wipeType, event) {
  const x = event?.clientX ?? window.innerWidth / 2;
  const y = event?.clientY ?? window.innerHeight / 2;
  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  switch (wipeType) {
    // 01 Clean Commerce / Minimal: Quick fade with slight vertical slide
    case "vertical-fade":
    case "minimal":
      document.documentElement.animate(
        [
          { opacity: 0, transform: "translateY(16px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        {
          duration: 250,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      break;

    // 02 Pet Market / Modern: Circle wipe from click point
    case "circle-wipe":
    case "modern":
      document.documentElement.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
        ],
        {
          duration: 480,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      break;

    // 03 Forma / Slow horizontal curtain reveal
    case "curtain-reveal":
    case "premium":
      document.documentElement.animate(
        [
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)" },
        ],
        {
          duration: 650,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      break;

    // 04 Marketplace: Diagonal sweep
    case "diagonal-sweep":
    case "marketplace":
      document.documentElement.animate(
        [
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
        ],
        {
          duration: 400,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      break;

    // 05 Mono / Fashion: Hard vertical split wipe
    case "vertical-split":
    case "fashion":
      document.documentElement.animate(
        [
          { clipPath: "inset(50% 0 50% 0)" },
          { clipPath: "inset(0% 0 0% 0)" },
        ],
        {
          duration: 350,
          easing: "cubic-bezier(0.77, 0, 0.175, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      break;

    // 06 Shopluxe / Bold: Soft radial reveal from center
    case "radial-reveal":
    case "bold": {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const centerRadius = Math.hypot(centerX, centerY);
      document.documentElement.animate(
        [
          { clipPath: `circle(0px at ${centerX}px ${centerY}px)`, opacity: 0.8 },
          { clipPath: `circle(${centerRadius}px at ${centerX}px ${centerY}px)`, opacity: 1 },
        ],
        {
          duration: 500,
          easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      break;
    }

    // Circular Theme Wipe (Dark/Light mode toggle)
    case "theme-circular":
      document.documentElement.animate(
        [
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
        ],
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      break;

    default:
      // Simple fade
      document.documentElement.animate(
        [{ opacity: 0 }, { opacity: 1 }],
        {
          duration: 250,
          easing: "ease-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
      break;
  }
}

/**
 * Shared-element helper: Assigns unique viewTransitionName before navigating
 * and clears it shortly after navigation to prevent duplicates.
 */
export function setProductTransition(productId) {
  if (!isViewTransitionSupported()) return;
  const name = `product-img-${productId}`;
  const el = document.getElementById(`product-img-${productId}`);
  if (el) {
    el.style.viewTransitionName = name;
  }
  return () => {
    if (el) el.style.viewTransitionName = "none";
  };
}
