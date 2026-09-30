// ===== TEMPLATE-SPECIFIC LIGHT & DARK TOKEN SETS =====
// Each storefront maintains its bespoke identity in both light and dark modes.

export const templateThemes = {
  minimal: {
    light: {
      bg: "#ffffff",
      cardBg: "#ffffff",
      text: "#18181b",
      textMuted: "#71717a",
      border: "#e4e4e7",
      primary: "#18181b",
      accent: "#6366f1",
      radius: "4px",
    },
    dark: {
      bg: "#000000",
      cardBg: "#0d0d0d",
      text: "#ffffff",
      textMuted: "#a1a1aa",
      border: "#27272a",
      primary: "#ffffff",
      accent: "#818cf8",
      radius: "4px",
    },
  },

  modern: {
    light: {
      bg: "#f8fafc",
      cardBg: "#ffffff",
      text: "#0f172a",
      textMuted: "#64748b",
      border: "#e2e8f0",
      primary: "#0f172a",
      accent: "#3b82f6",
      radius: "16px",
    },
    dark: {
      bg: "#090d16",
      cardBg: "#111827",
      text: "#f9fafb",
      textMuted: "#94a3b8",
      border: "#1e293b",
      primary: "#3b82f6",
      accent: "#60a5fa",
      radius: "16px",
    },
  },

  marketplace: {
    light: {
      bg: "#f5f5f5",
      cardBg: "#ffffff",
      text: "#1a1a2e",
      textMuted: "#666666",
      border: "#e0e0e0",
      primary: "#1a1a2e",
      accent: "#e94560",
      radius: "8px",
    },
    dark: {
      bg: "#111116",
      cardBg: "#1a1a22",
      text: "#ffffff",
      textMuted: "#9e9eb0",
      border: "#2c2c3a",
      primary: "#e94560",
      accent: "#ff5277",
      radius: "8px",
    },
  },

  premium: {
    light: {
      bg: "#faf9f7",
      cardBg: "#ffffff",
      text: "#1a1a1a",
      textMuted: "#8a8580",
      border: "#e8e4de",
      primary: "#1a1a1a",
      accent: "#c9a96e",
      radius: "2px",
    },
    dark: {
      bg: "#161412",
      cardBg: "#1e1b18",
      text: "#f5f2ec",
      textMuted: "#a69a8d",
      border: "#332d26",
      primary: "#c9a96e",
      accent: "#dfc38d",
      radius: "2px",
    },
  },

  fashion: {
    light: {
      bg: "#ffffff",
      cardBg: "#f9fafb",
      text: "#111827",
      textMuted: "#6b7280",
      border: "#e5e7eb",
      primary: "#000000",
      accent: "#e11d48",
      radius: "0px",
    },
    dark: {
      bg: "#050505",
      cardBg: "#121212",
      text: "#ffffff",
      textMuted: "#888888",
      border: "#262626",
      primary: "#ffffff",
      accent: "#fb7185",
      radius: "0px",
    },
  },

  bold: {
    light: {
      bg: "#fdfcfb",
      cardBg: "#ffffff",
      text: "#0d0d0d",
      textMuted: "#666666",
      border: "#e5e5e5",
      primary: "#ff6b35",
      accent: "#ff6b35",
      radius: "12px",
    },
    dark: {
      bg: "#0a0a0a",
      cardBg: "#161616",
      text: "#ffffff",
      textMuted: "#999999",
      border: "#333333",
      primary: "#ff6b35",
      accent: "#ff6b35",
      radius: "12px",
    },
  },

  general: {
    light: {
      bg: "#ffffff",
      cardBg: "#ffffff",
      text: "#1e293b",
      textMuted: "#64748b",
      border: "#e2e8f0",
      primary: "#1e293b",
      accent: "#0ea5e9",
      radius: "10px",
    },
    dark: {
      bg: "#0b1320",
      cardBg: "#111c2e",
      text: "#f8fafc",
      textMuted: "#94a3b8",
      border: "#1e2e46",
      primary: "#38bdf8",
      accent: "#38bdf8",
      radius: "10px",
    },
  },

  "product-focus": {
    light: {
      bg: "#fafafa",
      cardBg: "#ffffff",
      text: "#171717",
      textMuted: "#737373",
      border: "#e5e5e5",
      primary: "#7c3aed",
      accent: "#7c3aed",
      radius: "8px",
    },
    dark: {
      bg: "#0f0a1c",
      cardBg: "#19122a",
      text: "#ffffff",
      textMuted: "#a396be",
      border: "#2e2248",
      primary: "#a78bfa",
      accent: "#a78bfa",
      radius: "8px",
    },
  },
};

export function getTemplateTokens(templateId, isDark = false) {
  const t = templateThemes[templateId] || templateThemes.modern;
  return isDark ? t.dark : t.light;
}
