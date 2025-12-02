/**
 * Color Customizer Component
 * Allows users to customize PDF colors
 */

import { useState, useEffect, useRef } from "react";
import type { PDFColors } from "../../../core/models/types";

interface ColorCustomizerProps {
  colors: PDFColors;
  onColorChange: (colorKey: keyof PDFColors, value: string) => void;
}

const COLOR_PRESETS = {
  primary: [
    { name: "Azul", value: "#2563eb" },
    { name: "Violeta", value: "#7c3aed" },
    { name: "Rosa", value: "#ec4899" },
    { name: "Verde", value: "#10b981" },
    { name: "Naranja", value: "#f59e0b" },
    { name: "Negro", value: "#000000" },
  ],
  secondary: [
    { name: "Gris", value: "#64748b" },
    { name: "Cyan", value: "#22d3ee" },
    { name: "Esmeralda", value: "#34d399" },
    { name: "Ámbar", value: "#fbbf24" },
  ],
};

export function ColorCustomizer({
  colors,
  onColorChange,
}: ColorCustomizerProps) {
  // Local state for immediate visual feedback
  const [localColors, setLocalColors] = useState(colors);
  const debounceTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // Update local state when props change (e.g., template change)
  useEffect(() => {
    setLocalColors(colors);
  }, [colors]);

  // Debounced color change handler
  const handleDebouncedColorChange = (
    colorKey: keyof PDFColors,
    value: string
  ) => {
    // Update local state immediately for smooth UI
    setLocalColors((prev) => ({ ...prev, [colorKey]: value }));

    // Clear previous timer for this color
    if (debounceTimers.current[colorKey]) {
      clearTimeout(debounceTimers.current[colorKey]);
    }

    // Set new timer to update parent state
    debounceTimers.current[colorKey] = setTimeout(() => {
      onColorChange(colorKey, value);
    }, 150); // 150ms debounce
  };

  // Immediate color change for preset buttons
  const handleImmediateColorChange = (
    colorKey: keyof PDFColors,
    value: string
  ) => {
    // Clear any pending debounced update
    if (debounceTimers.current[colorKey]) {
      clearTimeout(debounceTimers.current[colorKey]);
    }
    setLocalColors((prev) => ({ ...prev, [colorKey]: value }));
    onColorChange(colorKey, value);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimers.current).forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        Personaliza los Colores
      </h3>

      {/* Primary Color */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
          Color Principal
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={localColors.primary}
            onChange={(e) =>
              handleDebouncedColorChange("primary", e.target.value)
            }
            className="h-10 w-10 rounded border border-neutral-300 dark:border-neutral-600 cursor-pointer"
          />
          <input
            type="text"
            value={localColors.primary}
            onChange={(e) =>
              handleDebouncedColorChange("primary", e.target.value)
            }
            className="flex-1 px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            placeholder="#7C3AED"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {COLOR_PRESETS.primary.map((preset) => (
            <button
              key={preset.value}
              onClick={() =>
                handleImmediateColorChange("primary", preset.value)
              }
              className="h-7 w-7 rounded border-2 border-neutral-300 dark:border-neutral-600 hover:scale-110 transition-transform"
              style={{ backgroundColor: preset.value }}
              title={preset.name}
            />
          ))}
        </div>
      </div>

      {/* Secondary Color */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
          Color Secundario
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={localColors.secondary}
            onChange={(e) =>
              handleDebouncedColorChange("secondary", e.target.value)
            }
            className="h-10 w-10 rounded border border-neutral-300 dark:border-neutral-600 cursor-pointer"
          />
          <input
            type="text"
            value={localColors.secondary}
            onChange={(e) =>
              handleDebouncedColorChange("secondary", e.target.value)
            }
            className="flex-1 px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            placeholder="#22D3EE"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 mt-2">
          {COLOR_PRESETS.secondary.map((preset) => (
            <button
              key={preset.value}
              onClick={() =>
                handleImmediateColorChange("secondary", preset.value)
              }
              className="h-7 w-7 rounded border-2 border-neutral-300 dark:border-neutral-600 hover:scale-110 transition-transform"
              style={{ backgroundColor: preset.value }}
              title={preset.name}
            />
          ))}
        </div>
      </div>

      {/* Text Color */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
          Color de Texto
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={localColors.text}
            onChange={(e) => handleDebouncedColorChange("text", e.target.value)}
            className="h-10 w-10 rounded border border-neutral-300 dark:border-neutral-600 cursor-pointer"
          />
          <input
            type="text"
            value={localColors.text}
            onChange={(e) => handleDebouncedColorChange("text", e.target.value)}
            className="flex-1 px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            placeholder="#1E293B"
          />
        </div>
      </div>

      {/* Background Color */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
          Color de Fondo
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={localColors.background}
            onChange={(e) =>
              handleDebouncedColorChange("background", e.target.value)
            }
            className="h-10 w-10 rounded border border-neutral-300 dark:border-neutral-600 cursor-pointer"
          />
          <input
            type="text"
            value={localColors.background}
            onChange={(e) =>
              handleDebouncedColorChange("background", e.target.value)
            }
            className="flex-1 px-3 py-2 text-sm rounded-md border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            placeholder="#FFFFFF"
          />
        </div>
      </div>
    </div>
  );
}
