/**
 * ConfigViewSelector Component
 * Navigation buttons for switching between Notebook and App settings
 */

import type { ConfigView } from "../../../core/models/types";

interface ConfigViewSelectorProps {
  activeView: ConfigView;
  onViewChange: (view: ConfigView) => void;
}

export function ConfigViewSelector({
  activeView,
  onViewChange,
}: ConfigViewSelectorProps) {
  return (
    <div className="flex gap-4 mb-6">
      {/* Notebook Configuration Button */}
      <button
        onClick={() => onViewChange("notebook")}
        className={`flex-1 p-6 rounded-xl border-2 transition-all ${
          activeView === "notebook"
            ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
            : "border-neutral-700 hover:border-neutral-600 bg-neutral-800/30"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl">📓</div>
          <span className="font-semibold text-white">
            Configuración de Cuaderno
          </span>
          <span className="text-sm text-neutral-400">
            Fechas, días activos, horas
          </span>
        </div>
      </button>

      {/* App Configuration Button */}
      <button
        onClick={() => onViewChange("app")}
        className={`flex-1 p-6 rounded-xl border-2 transition-all ${
          activeView === "app"
            ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
            : "border-neutral-700 hover:border-neutral-600 bg-neutral-800/30"
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl">⚙️</div>
          <span className="font-semibold text-white">
            Configuración de Aplicación
          </span>
          <span className="text-sm text-neutral-400">
            Apariencia, atajos, respaldos
          </span>
        </div>
      </button>
    </div>
  );
}
