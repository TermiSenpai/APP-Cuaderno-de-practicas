/**
 * Application Header Component
 * Composition of smaller subcomponents
 * Uses EventBus instead of prop drilling
 */

import { useTheme } from "../../../hooks/useTheme";
import { ThemeToggle } from "./ThemeToggle";
import { ActionButtons } from "./ActionButtons";

interface HeaderProps {
  title?: string;
  totalHoras?: number;
}

export function Header({ title, totalHoras }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="app-header fixed top-0 left-0 right-0 z-50 border-b bg-white/80 border-[#E5DFD9] shadow-sm backdrop-blur-xl dark:bg-[#1E293B]/80 dark:border-[#334155] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-3 p-4 rounded-b-lg">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-[#2C2A27] dark:text-[#F1F5F9]">
              {title ?? "Cuaderno de Prácticas"}
            </h1>
            {typeof totalHoras === "number" && (
              <div className="text-xs opacity-80 text-[#6B6865] dark:text-[#94A3B8]">
                Total:{" "}
                <span className="font-medium text-[#7C3AED] dark:text-[#22D3EE]">
                  {totalHoras} horas
                </span>
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ActionButtons />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </div>
    </header>
  );
}
