// ===== REUSABLE MOTION VARIANTS =====
import { easings, durations } from "./tokens";

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      duration: custom.duration || durations.normal,
      ease: custom.ease || easings.snappy,
      delay: custom.delay || 0,
    },
  }),
};

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom = {}) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: custom.duration || durations.normal,
      ease: custom.ease || easings.snappy,
      delay: custom.delay || 0,
    },
  }),
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: (custom = {}) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: custom.duration || durations.normal,
      ease: custom.ease || easings.overshoot,
      delay: custom.delay || 0,
    },
  }),
};

export const maskReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  visible: (custom = {}) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: {
      duration: custom.duration || durations.slow,
      ease: custom.ease || easings.editorial,
      delay: custom.delay || 0,
    },
  }),
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: (custom = {}) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerChildren || 0.08,
      delayChildren: custom.delayChildren || 0,
    },
  }),
};

export const pop = {
  initial: { scale: 1 },
  pop: {
    scale: [1, 1.28, 0.95, 1],
    transition: { duration: 0.4, ease: easings.overshoot },
  },
};

export const accordionVariants = {
  collapsed: {
    opacity: 0,
    height: 0,
    overflow: "hidden",
    transition: { duration: 0.25, ease: easings.smooth },
  },
  expanded: {
    opacity: 1,
    height: "auto",
    overflow: "visible",
    transition: { duration: 0.35, ease: easings.snappy },
  },
};
