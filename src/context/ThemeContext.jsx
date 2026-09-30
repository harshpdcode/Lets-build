import { createContext, useContext, useState, useEffect } from "react";
import { runViewTransition } from "../motion/viewTransition";

const ThemeContext = createContext(null);
const STORAGE_KEY = "lets-build-theme";

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return stored;
      if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    } catch {
      // Fallback
    }
    return "light";
  });

  const isDark = theme === "dark";

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore
    }

    if (isDark) {
      document.documentElement.classList.add("dark");
      document.documentElement.dataset.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.dataset.theme = "light";
    }
  }, [theme, isDark]);

  const toggleTheme = (clickEvent = null) => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    runViewTransition(
      () => {
        setTheme(nextTheme);
      },
      {
        wipeType: "theme-circular",
        clickEvent,
      }
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export default ThemeContext;
