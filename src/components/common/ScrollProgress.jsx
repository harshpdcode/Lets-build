import { motion, useScroll, useSpring } from "motion/react";
import useReducedMotion from "../../motion/useReducedMotion";

export default function ScrollProgress({ templateId }) {
  const isReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Only active on templates 01 (minimal), 05 (fashion), 06 (bold) as requested
  const allowedTemplates = ["minimal", "fashion", "bold"];
  if (!allowedTemplates.includes(templateId) || isReduced) {
    return null;
  }

  const barColor = {
    minimal: "bg-black dark:bg-white",
    fashion: "bg-rose-500",
    bold: "bg-orange-500",
  }[templateId] || "bg-indigo-600";

  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 h-1 z-50 origin-left ${barColor}`}
      style={{ scaleX }}
    />
  );
}
