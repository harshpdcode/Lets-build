// ===== MOTION TOKENS =====
// Shared durations, easings, and spring physics presets

export const durations = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.35,
  relaxed: 0.5,
  slow: 0.8,
  deliberate: 1.1,
};

export const easings = {
  // Snappy, modern ease-out
  snappy: [0.16, 1, 0.3, 1],
  // Smooth standard Apple/editorial curve
  smooth: [0.25, 0.1, 0.25, 1],
  // Elegant decelerate curve
  decelerate: [0.0, 0.0, 0.2, 1],
  // Bouncy overshoot
  overshoot: [0.34, 1.56, 0.64, 1],
  // Editorial slow curtain
  editorial: [0.22, 1, 0.36, 1],
  // Dramatic sharp curve
  sharp: [0.77, 0, 0.175, 1],
};

export const springs = {
  // Quick, subtle response
  tight: { type: "spring", stiffness: 450, damping: 35 },
  // Default balanced spring
  standard: { type: "spring", stiffness: 300, damping: 25 },
  // Playful with visible overshoot
  bouncy: { type: "spring", stiffness: 280, damping: 14, mass: 0.8 },
  // Gentle, heavy spring for drawers and modals
  gentle: { type: "spring", stiffness: 200, damping: 24, mass: 1 },
  // Snappy for micro-interactions
  snappy: { type: "spring", stiffness: 500, damping: 30 },
};
