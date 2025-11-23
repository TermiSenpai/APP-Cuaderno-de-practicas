/**
 * Custom hook for CuadernoPracticas logic
 * Separates business logic from presentation
 */

import { useState, useEffect, useCallback } from "react";
import type { CuadernoData, Dia } from "../../../core/models/types";
import { storageService } from "../../../core/services/StorageService";
import { fileService } from "../../../core/services/FileService";
import { useEventBus } from "../../../hooks/useEventBus";

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

  // Handle print action
  const handlePrint = useCallback(() => {
    window.print();
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
  useEventBus("cdp-print", handlePrint);

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
  };
}
