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
    if (theme === "light") {
      html.classList.add("light-theme");
    } else {
      html.classList.remove("light-theme");
    }
    storageService.saveTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  };

  return { theme, toggleTheme };
}
