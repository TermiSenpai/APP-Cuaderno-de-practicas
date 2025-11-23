/**
 * Theme Toggle Component
 * Single Responsibility: Only handles theme switching UI
 */

import { Sun, Moon } from "lucide-react";
import type { Theme } from "../../../core/models/types";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  return (
    <button
      title="Alternar tema día/noche"
      onClick={onToggle}
      className="inline-flex items-center gap-2 rounded-md border border-neutral-700/30 px-3 py-1.5 text-sm hover:bg-neutral-800/50"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Alternar tema</span>
    </button>
  );
}
