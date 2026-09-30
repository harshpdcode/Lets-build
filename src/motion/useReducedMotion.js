import { useReducedMotion as useFramerReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function useReducedMotion() {
  const motionReduced = useFramerReducedMotion();
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mediaQuery.matches);

    const handler = (e) => setIsReduced(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return Boolean(motionReduced || isReduced);
}

export default useReducedMotion;
