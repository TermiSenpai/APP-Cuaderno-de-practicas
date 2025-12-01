/**
 * Notebook Settings Component
 * Manages notebook-specific configuration (dates, active days, hours, company)
 * Migration of original ConfigModal content
 */

import type { CuadernoConfig } from "../../../core/models/types";
import { useConfigModal } from "./useConfigModal";

interface NotebookSettingsProps {
  config?: CuadernoConfig;
  onSave: (config: CuadernoConfig) => void;
  onImport: () => void;
  onExport: () => void;
  onCreateNew: (config?: CuadernoConfig) => void;
}

export function NotebookSettings({
  config,
  onSave,
  onImport,
  onExport,
  onCreateNew,
}: NotebookSettingsProps) {
  const {
    nombreEmpresa,
    setNombreEmpresa,
    fechaInicio,
    setFechaInicio,
    fechaFin,
    setFechaFin,
    horasPorDia,
    setHorasPorDia,
    diasActivos,
    toggleDia,
    handleSave,
    handleImport,
    handleExport,
    handleCreateNew,
  } = useConfigModal({ config, onSave, onImport, onExport, onCreateNew });

  return (
    <div className="space-y-6">
      {/* Nombre de Empresa */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-200">
          Nombre de la Empresa
        </label>
        <input
          type="text"
          value={nombreEmpresa}
          onChange={(e) => setNombreEmpresa(e.target.value)}
          placeholder="Ej: Mi Empresa S.A."
          className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {/* Fechas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-200">
            Fecha de Inicio
          </label>
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-semibold text-neutral-200">
            Fecha de Fin
          </label>
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Días de la Semana */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold text-neutral-200">
          Días Activos
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { key: "lunes", label: "Lunes" },
            { key: "martes", label: "Martes" },
            { key: "miercoles", label: "Miércoles" },
            { key: "jueves", label: "Jueves" },
            { key: "viernes", label: "Viernes" },
            { key: "sabado", label: "Sábado" },
            { key: "domingo", label: "Domingo" },
          ].map(({ key, label }) => (
            <label
              key={key}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                diasActivos[key as keyof typeof diasActivos]
                  ? "bg-blue-600/20 border-blue-500 text-blue-300"
                  : "bg-neutral-800/30 border-neutral-700 text-neutral-400 hover:border-neutral-600"
              }`}
            >
              <input
                type="checkbox"
                checked={diasActivos[key as keyof typeof diasActivos]}
                onChange={() => toggleDia(key as keyof typeof diasActivos)}
                className="w-4 h-4 rounded accent-blue-500"
              />
              <span className="text-sm font-medium">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Horas por Defecto */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-neutral-200">
          Horas por Defecto
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="1"
            max="12"
            value={horasPorDia}
            onChange={(e) => setHorasPorDia(Number(e.target.value))}
            className="flex-1 accent-blue-500"
          />
          <input
            type="number"
            min="1"
            max="12"
            value={horasPorDia}
            onChange={(e) => setHorasPorDia(Number(e.target.value))}
            className="w-20 px-3 py-2 bg-neutral-800/50 border border-neutral-700 rounded-lg text-neutral-100 text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <span className="text-neutral-400 text-sm">horas</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 border-t border-neutral-700 space-y-3">
        {/* Primary Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            className="flex-1 min-w-[140px] px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105"
          >
            💾 Guardar
          </button>
          <button
            onClick={handleCreateNew}
            className="flex-1 min-w-[140px] px-5 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-semibold rounded-lg shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105"
          >
            ✨ Crear Nuevo
          </button>
        </div>

        {/* Secondary Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleImport}
            className="flex-1 min-w-[140px] px-5 py-3 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 font-semibold rounded-lg transition-all"
          >
            📥 Importar
          </button>
          <button
            onClick={handleExport}
            className="flex-1 min-w-[140px] px-5 py-3 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 font-semibold rounded-lg transition-all"
          >
            📤 Exportar
          </button>
        </div>
      </div>
    </div>
  );
}
