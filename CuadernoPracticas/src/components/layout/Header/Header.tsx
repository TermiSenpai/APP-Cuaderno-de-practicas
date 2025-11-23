/**
 * Application Header Component
 * Composition of smaller subcomponents
 * Uses EventBus instead of prop drilling
 */

import { useState } from "react";
import { useTheme } from "../../../hooks/useTheme";
import { ThemeToggle } from "./ThemeToggle";
import { ActionButtons } from "./ActionButtons";

interface HeaderProps {
  title?: string;
  totalHoras?: number;
}

export function Header({ title, totalHoras }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <header className="app-header fixed top-0 left-0 right-0 z-50 border-b border-neutral-700/30 bg-neutral-900/60 shadow-sm backdrop-blur-sm">
      <div className="w-full max-w-[1200px] mx-auto px-4">
        <div className="flex items-center gap-3 p-4 rounded-b-lg">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              {title ?? "Cuaderno de Prácticas"}
            </h1>
            {typeof totalHoras === "number" && (
              <div className="text-xs opacity-70">
                Total: <span className="font-medium">{totalHoras} horas</span>
              </div>
            )}
          </div>

          <div className="ml-auto flex items-center gap-2">
            <ActionButtons onSettingsClick={() => setShowSettings((s) => !s)} />
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>

        {/* Settings panel placeholder */}
        {showSettings && (
          <div className="absolute right-4 top-full mt-3 z-50 w-64 rounded-md border border-neutral-700/30 bg-neutral-900/80 p-3 text-sm">
            <div className="font-medium mb-2">Ajustes (placeholder)</div>
            <div className="text-xs opacity-70">
              Aquí puedes colocar opciones de configuración.
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
