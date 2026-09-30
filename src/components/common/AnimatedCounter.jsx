import { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";
import useReducedMotion from "../../motion/useReducedMotion";

export default function AnimatedCounter({
  value,
  duration = 1.2,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const isReduced = useReducedMotion();

  // Parse numeric part and suffix (e.g., "100%" -> numeric 100, suffix "%")
  const numericString = String(value).replace(/[^0-9.]/g, "");
  const targetNumber = parseFloat(numericString);
  const isFloat = numericString.includes(".");
  const suffix = String(value).replace(/[0-9.]/g, "");

  const [displayNumber, setDisplayNumber] = useState(isReduced ? targetNumber : 0);

  useEffect(() => {
    if (isNaN(targetNumber) || !isInView || isReduced) {
      setDisplayNumber(targetNumber);
      return;
    }

    let start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const update = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (targetNumber - start) * easeProgress;

      setDisplayNumber(isFloat ? parseFloat(current.toFixed(1)) : Math.round(current));

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayNumber(targetNumber);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, targetNumber, duration, isFloat, isReduced]);

  if (isNaN(targetNumber)) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {displayNumber}
      {suffix}
    </span>
  );
}
