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
    <header className="app-header fixed top-0 left-0 right-0 z-50 border-b bg-white/90 border-gray-200 shadow-sm backdrop-blur-sm dark:bg-neutral-900/60 dark:border-neutral-700/30">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-3 p-4 rounded-b-lg">
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-neutral-100">
              {title ?? "Cuaderno de Prácticas"}
            </h1>
            {typeof totalHoras === "number" && (
              <div className="text-xs opacity-70 text-gray-600 dark:text-neutral-300">
                Total: <span className="font-medium">{totalHoras} horas</span>
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
