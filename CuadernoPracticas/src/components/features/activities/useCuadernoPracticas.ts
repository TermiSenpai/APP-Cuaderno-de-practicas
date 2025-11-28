/**
 * Custom hook for CuadernoPracticas logic
 * Separates business logic from presentation
 */

import { useState, useEffect, useCallback } from "react";
import type { CuadernoData, CuadernoConfig, Dia } from "../../../core/models/types";
import { storageService } from "../../../core/services/StorageService";
import { fileService } from "../../../core/services/FileService";
import { useEventBus } from "../../../hooks/useEventBus";
import { useNotification } from "../../../hooks/useNotification";
import { generateDiasFromConfig } from "../../../core/utils/dateUtils";

export function useCuadernoPracticas() {
  const [data, setData] = useState<CuadernoData | null>(null);
  const { success, error, warning } = useNotification();

  // Load initial data from storage
  useEffect(() => {
    const loaded = storageService.load();
    if (loaded) {
      setData(loaded);
    } else {
      // No data found, open config modal automatically
      setIsConfigOpen(true);
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
      success("Cuaderno guardado exitosamente");
    } catch (err) {
      error("Error al guardar: " + String(err));
    }
  }, [data, success, error]);

  // Handle export action
  const handleExport = useCallback(() => {
    if (!data) return;
    try {
      fileService.exportToJSON(data);
      success("Cuaderno exportado exitosamente");
    } catch (err) {
      error("Error al exportar: " + String(err));
    }
  }, [data, success, error]);

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
        success("Cuaderno importado exitosamente");
      } catch (err: any) {
        error(err?.message || "Error al importar archivo");
      }
    },
    [success, error]
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
      if (!data) {
        // If no data exists, create new data with this config
        const newData: CuadernoData = {
          config: newConfig,
          dias: [],
        };
        setData(newData);
        success("Configuración guardada exitosamente");
        return;
      }
      setData({ ...data, config: newConfig });
      success("Configuración guardada exitosamente");
    },
    [data, success]
  );

  // Handle create new
  const handleCreateNew = useCallback((newConfig?: CuadernoConfig) => {
    // Use provided config or get current config from data
    const currentConfig = newConfig || data?.config || {
      horasPorDia: 5,
      diasActivos: {
        lunes: false,
        martes: false,
        miercoles: false,
        jueves: false,
        viernes: false,
        sabado: false,
        domingo: false,
      },
    };

    // Validate that we have dates in config
    if (!currentConfig.fechaInicio || !currentConfig.fechaFin) {
      warning("Por favor, configura las fechas de inicio y fin antes de crear un nuevo cuaderno.");
      return;
    }

    // Generate days based on configuration
    const generatedDias = generateDiasFromConfig(currentConfig);

    if (generatedDias.length === 0) {
      error("No se pudieron generar días. Verifica que las fechas y días activos estén correctamente configurados.");
      return;
    }

    const newData: CuadernoData = {
      config: currentConfig,
      dias: generatedDias,
    };

    setData(newData);
    storageService.save(newData);
    setIsConfigOpen(false);
    success(`Nuevo cuaderno creado con ${generatedDias.length} días`);
  }, [data, success, warning, error]);

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
