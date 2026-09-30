// ===== TEMPLATE-SPECIFIC MOTION PROFILES =====
// Each storefront has its own distinct motion personality, easing, spring physics, and timings.

export const motionProfiles = {
  // 01 Clean Commerce / Minimal: Quiet, ultra-fast, minimal displacement
  minimal: {
    name: "Quiet & Fast",
    durationScale: 0.65,
    easing: [0.16, 1, 0.3, 1],
    staggerDelay: 0.04,
    spring: { type: "spring", stiffness: 450, damping: 35 },
    cardHoverLift: -3,
    transitionType: "vertical-fade",
    enableMarquee: false,
    enableParallax: false,
    enableShimmer: false,
    swipeSwapImage: true,
  },

  // 02 Pet Market / Modern: Playful, bouncy springs, visible overshoot
  modern: {
    name: "Playful & Bouncy",
    durationScale: 1.0,
    easing: [0.34, 1.56, 0.64, 1],
    staggerDelay: 0.08,
    spring: { type: "spring", stiffness: 280, damping: 14, mass: 0.8 },
    cardHoverLift: -6,
    transitionType: "circle-wipe",
    enableMarquee: false,
    enableParallax: true,
    enableShimmer: false,
    bounceButtons: true,
    wiggleIcons: true,
  },

  // 03 Forma / Slow Editorial: Long, soft fades, clip-path curtain reveal
  marketplace: {
    name: "Energetic & Promotional",
    durationScale: 0.85,
    easing: [0.4, 0, 0.2, 1],
    staggerDelay: 0.06,
    spring: { type: "spring", stiffness: 320, damping: 20 },
    cardHoverLift: -5,
    transitionType: "diagonal-sweep",
    enableMarquee: true,
    enableParallax: false,
    enableShimmer: false,
    floatingObjects: true,
    badgePulse: true,
  },

  // 04 Premium / Forma Editorial: Elegant, slow upward drift
  premium: {
    name: "Slow & Editorial",
    durationScale: 1.35,
    easing: [0.22, 1, 0.36, 1],
    staggerDelay: 0.12,
    spring: { type: "spring", stiffness: 180, damping: 24 },
    cardHoverLift: -4,
    transitionType: "curtain-reveal",
    enableMarquee: false,
    enableParallax: true,
    enableShimmer: false,
    maskReveals: true,
  },

  // 05 Mono / Fashion: Sharp, oversized headline masks, infinite brand marquee
  fashion: {
    name: "Sharp & Editorial",
    durationScale: 0.75,
    easing: [0.77, 0, 0.175, 1],
    staggerDelay: 0.05,
    spring: { type: "spring", stiffness: 380, damping: 30 },
    cardHoverLift: -4,
    transitionType: "vertical-split",
    enableMarquee: true,
    enableParallax: false,
    enableShimmer: false,
    snappyPills: true,
    gsapStorytelling: true,
  },

  // 06 Shopluxe / Bold: Smooth, layered parallax, gold shimmer sweep
  bold: {
    name: "Smooth & Premium",
    durationScale: 1.1,
    easing: [0.25, 0.1, 0.25, 1],
    staggerDelay: 0.09,
    spring: { type: "spring", stiffness: 220, damping: 22 },
    cardHoverLift: -6,
    transitionType: "radial-reveal",
    enableMarquee: false,
    enableParallax: true,
    enableShimmer: true,
    glowEffects: true,
  },

  // 07 General Store
  general: {
    name: "Clean & Balanced",
    durationScale: 0.95,
    easing: [0.25, 0.1, 0.25, 1],
    staggerDelay: 0.07,
    spring: { type: "spring", stiffness: 300, damping: 25 },
    cardHoverLift: -4,
    transitionType: "fade",
    enableMarquee: false,
    enableParallax: false,
    enableShimmer: false,
  },

  // 08 Product Focus
  "product-focus": {
    name: "Focused & Dynamic",
    durationScale: 1.0,
    easing: [0.16, 1, 0.3, 1],
    staggerDelay: 0.08,
    spring: { type: "spring", stiffness: 320, damping: 26 },
    cardHoverLift: -5,
    transitionType: "fade",
    enableMarquee: false,
    enableParallax: false,
    enableShimmer: false,
  },
};

export function getMotionProfile(templateId) {
  return motionProfiles[templateId] || motionProfiles.modern;
}

export default motionProfiles;
