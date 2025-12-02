/**
 * Configuration Modal Component
 * Full-screen modal for managing app configuration
 * Now with button-based navigation between Notebook and App settings
 */

import { useState } from "react";
import type { CuadernoConfig, ConfigView } from "../../../core/models/types";
import { ConfigViewSelector } from "./ConfigViewSelector";
import { NotebookSettings } from "./NotebookSettings";
import { AppSettings } from "./AppSettings";

interface ConfigModalProps {
  isOpen: boolean;
  config?: CuadernoConfig;
  onClose: () => void;
  onSave: (config: CuadernoConfig) => void;
  onImport: () => void;
  onExport: () => void;
  onCreateNew: (config?: CuadernoConfig) => void;
}

export function ConfigModal({
  isOpen,
  config,
  onClose,
  onSave,
  onImport,
  onExport,
  onCreateNew,
}: ConfigModalProps) {
  const [activeView, setActiveView] = useState<ConfigView>("notebook");

  if (!isOpen) return null;

  // Check if there's existing data - if not, prevent closing
  const hasData = config?.fechaInicio && config?.fechaFin;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl border border-neutral-700/50 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">⚙️ Configuración</h2>
          {hasData && (
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors text-2xl leading-none"
              aria-label="Cerrar"
            >
              ×
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Navigation Buttons */}
          <ConfigViewSelector
            activeView={activeView}
            onViewChange={setActiveView}
          />

          {/* Content based on active view */}
          {activeView === "notebook" ? (
            <NotebookSettings
              config={config}
              onSave={(newConfig) => {
                onSave(newConfig);
                onClose();
              }}
              onImport={onImport}
              onExport={onExport}
              onCreateNew={onCreateNew}
            />
          ) : (
            <AppSettings onImport={onImport} onExport={onExport} />
          )}
        </div>
      </div>
    </div>
  );
}
