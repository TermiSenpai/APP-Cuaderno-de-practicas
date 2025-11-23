/**
 * File Service for import/export operations
 * Single Responsibility: Only handles file operations
 */

import type { CuadernoData } from "../models/types";

export interface IFileService {
  exportToJSON(data: CuadernoData, filename?: string): void;
  importFromFile(file: File): Promise<CuadernoData>;
}

/**
 * Browser-based file service implementation
 */
export class BrowserFileService implements IFileService {
  exportToJSON(data: CuadernoData, filename: string = "cuaderno-practicas.json"): void {
    try {
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting file:", error);
      throw new Error("Error al exportar: " + String(error));
    }
  }

  async importFromFile(file: File): Promise<CuadernoData> {
    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as CuadernoData;
      
      if (!Array.isArray(parsed.dias)) {
        throw new Error("Formato inválido: no contiene un array de días.");
      }
      
      return parsed;
    } catch (error: any) {
      console.error("Error importing file:", error);
      throw new Error("Error al leer el archivo: " + error?.message);
    }
  }
}

// Default instance
export const fileService = new BrowserFileService();
