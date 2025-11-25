/**
 * Custom hook for CuadernoPracticas logic
 * Separates business logic from presentation
 */

import { useState, useEffect, useCallback } from "react";
import type { CuadernoData, CuadernoConfig, Dia } from "../../../core/models/types";
import { storageService } from "../../../core/services/StorageService";
import { fileService } from "../../../core/services/FileService";
import { useEventBus } from "../../../hooks/useEventBus";
import { generateDiasFromConfig } from "../../../core/utils/dateUtils";

export function useCuadernoPracticas() {
  const [data, setData] = useState<CuadernoData | null>(null);

  // Load initial data from storage
  useEffect(() => {
    const loaded = storageService.load();
    if (loaded) {
      setData(loaded);
    }
  }, []);

  // Auto-save to storage whenever data changes
  useEffect(() => {
    if (!data) return;
    storageService.save(data);
  }, [data]);

  // Handle save action
  const handleSave = useCallback(() => {
    if (!data) return;
    try {
      storageService.save(data);
      alert("Cuaderno guardado en localStorage");
    } catch (err) {
      alert("Error al guardar: " + String(err));
    }
  }, [data]);

  // Handle export action
  const handleExport = useCallback(() => {
    if (!data) return;
    try {
      fileService.exportToJSON(data);
    } catch (err) {
      alert("Error al exportar: " + String(err));
    }
  }, [data]);

  // Handle import action
  const handleImport = useCallback(() => {
    const input = document.getElementById("file-import") as HTMLInputElement | null;
    input?.click();
  }, []);

  // Handle file selection for import
  const handleFileLoad = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        const parsed = await fileService.importFromFile(file);
        setData(parsed);
      } catch (err: any) {
        alert(err?.message || "Error al importar archivo");
      }
    },
    []
  );

  // Subscribe to global events
  useEventBus("cdp-save", handleSave);
  useEventBus("cdp-export", handleExport);
  useEventBus("cdp-import", handleImport);

  // PDF Modal state
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

  // Handle open PDF modal
  const handleOpenPDFModal = useCallback(() => {
    setIsPDFModalOpen(true);
  }, []);

  // Subscribe to PDF modal event
  useEventBus("cdp-pdf-modal", handleOpenPDFModal);

  // Configuration modal state
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Handle open config modal
  const handleOpenConfig = useCallback(() => {
    setIsConfigOpen(true);
  }, []);

  // Subscribe to config event
  useEventBus("cdp-config", handleOpenConfig);

  // Handle config save
  const handleConfigSave = useCallback(
    (newConfig: CuadernoConfig) => {
      if (!data) return;
      setData({ ...data, config: newConfig });
      alert("Configuración guardada");
    },
    [data]
  );

  // Handle create new
  const handleCreateNew = useCallback(() => {
    // Get current config or use default
    const currentConfig = data?.config || {
      horasPorDia: 5,
      diasActivos: {
        lunes: true,
        martes: true,
        miercoles: true,
        jueves: true,
        viernes: true,
        sabado: false,
        domingo: false,
      },
    };

    // Validate that we have dates in config
    if (!currentConfig.fechaInicio || !currentConfig.fechaFin) {
      alert("Por favor, configura las fechas de inicio y fin antes de crear un nuevo cuaderno.");
      return;
    }

    // Generate days based on configuration
    const generatedDias = generateDiasFromConfig(currentConfig);

    if (generatedDias.length === 0) {
      alert("No se pudieron generar días. Verifica que las fechas y días activos estén correctamente configurados.");
      return;
    }

    const newData: CuadernoData = {
      config: currentConfig,
      dias: generatedDias,
    };

    setData(newData);
    storageService.save(newData);
    setIsConfigOpen(false);
    alert(`Nuevo cuaderno creado con ${generatedDias.length} días.`);
  }, [data]);

  const horasDefault = data?.config?.horasPorDia ?? 5;

  const updateDia = (idx: number, updated: Dia) => {
    if (!data) return;
    const dias = [...data.dias];
    dias[idx] = updated;
    setData({ ...data, dias });
  };

  return {
    data,
    horasDefault,
    updateDia,
    handleFileLoad,
    isConfigOpen,
    setIsConfigOpen,
    handleConfigSave,
    handleExport,
    handleImport,
    handleCreateNew,
    isPDFModalOpen,
    setIsPDFModalOpen,
  };
}
