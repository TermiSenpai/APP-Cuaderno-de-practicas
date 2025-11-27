/**
 * Custom hook for ConfigModal logic
 * Separates business logic from presentation
 */

import { useState, useCallback } from "react";
import type { CuadernoConfig } from "../../../core/models/types";

interface UseConfigModalProps {
  config?: CuadernoConfig;
  onSave: (config: CuadernoConfig) => void;
  onImport: () => void;
  onExport: () => void;
  onCreateNew: () => void;
}

export function useConfigModal({
  config,
  onSave,
  onImport,
  onExport,
  onCreateNew,
}: UseConfigModalProps) {
  // Local state for form fields
  const [nombreEmpresa, setNombreEmpresa] = useState(config?.nombreEmpresa || "");
  const [fechaInicio, setFechaInicio] = useState(config?.fechaInicio || "");
  const [fechaFin, setFechaFin] = useState(config?.fechaFin || "");
  const [horasPorDia, setHorasPorDia] = useState(config?.horasPorDia || 5);
  const [diasActivos, setDiasActivos] = useState({
    lunes: config?.diasActivos?.lunes ?? false,
    martes: config?.diasActivos?.martes ?? false,
    miercoles: config?.diasActivos?.miercoles ?? false,
    jueves: config?.diasActivos?.jueves ?? false,
    viernes: config?.diasActivos?.viernes ?? false,
    sabado: config?.diasActivos?.sabado ?? false,
    domingo: config?.diasActivos?.domingo ?? false,
  });

  // Toggle single day
  const toggleDia = useCallback((dia: keyof typeof diasActivos) => {
    setDiasActivos((prev) => ({
      ...prev,
      [dia]: !prev[dia],
    }));
  }, []);

  // Handle save button
  const handleSave = useCallback(() => {
    const newConfig: CuadernoConfig = {
      nombreEmpresa: nombreEmpresa.trim() || undefined,
      fechaInicio: fechaInicio || undefined,
      fechaFin: fechaFin || undefined,
      diasActivos,
      horasPorDia,
    };
    onSave(newConfig);
  }, [nombreEmpresa, fechaInicio, fechaFin, diasActivos, horasPorDia, onSave]);

  // Handle import button
  const handleImport = useCallback(() => {
    onImport();
  }, [onImport]);

  // Handle export button
  const handleExport = useCallback(() => {
    onExport();
  }, [onExport]);

  // Handle create new button
  const handleCreateNew = useCallback(() => {
    // Execute directly - the app auto-saves and will show appropriate notifications
    onCreateNew();
  }, [onCreateNew]);

  return {
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
  };
}
