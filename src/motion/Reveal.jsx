import { motion } from "motion/react";
import useReducedMotion from "./useReducedMotion";
import { easings } from "./tokens";

export default function Reveal({
  children,
  className = "",
  variant = "fadeUp",
  delay = 0,
  duration = 0.5,
  yOffset = 16,
  as: Component = "div",
  viewport = { once: true, margin: "0px 0px 80px 0px", amount: "some" },
  ...props
}) {
  const isReduced = useReducedMotion();

  // If reduced motion is preferred, use a simple gentle opacity fade
  if (isReduced) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.25, delay }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  const variantMap = {
    fadeUp: {
      hidden: { opacity: 0, y: yOffset },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration, delay, ease: easings.snappy },
      },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { duration, delay, ease: easings.snappy },
      },
    },
    scaleIn: {
      hidden: { opacity: 0, scale: 0.94 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: { duration, delay, ease: easings.overshoot },
      },
    },
    maskReveal: {
      hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
      visible: {
        clipPath: "inset(0 0 0% 0)",
        opacity: 1,
        transition: { duration: duration * 1.3, delay, ease: easings.editorial },
      },
    },
  };

  const selectedVariant = variantMap[variant] || variantMap.fadeUp;
  const MotionComponent = motion.create(Component);

  return (
    <MotionComponent
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={selectedVariant}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
