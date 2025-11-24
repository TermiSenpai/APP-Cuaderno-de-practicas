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
      className="inline-flex items-center gap-2 rounded-lg border bg-white/90 text-[#2C2A27] border-[#E5DFD9] hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/30 hover:text-[#7C3AED] dark:bg-[#1E293B] dark:text-[#F1F5F9] dark:border-[#334155] dark:hover:bg-[#22D3EE]/10 dark:hover:border-[#22D3EE]/30 dark:hover:text-[#22D3EE] px-3 py-1.5 text-sm transition-all duration-200"
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
