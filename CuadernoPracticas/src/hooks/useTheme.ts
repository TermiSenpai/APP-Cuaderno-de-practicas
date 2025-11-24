/**
 * Custom hook for theme management
 * Single Responsibility: Only handles theme state and persistence
 */

import { useState, useEffect } from "react";
import type { Theme } from "../core/models/types";
import { storageService } from "../core/services/StorageService";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = storageService.loadTheme();
    if (saved === "light" || saved === "dark") return saved;
    return "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    storageService.saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
