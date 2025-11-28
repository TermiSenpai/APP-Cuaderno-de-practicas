import { describe, it, expect, beforeEach, vi } from "vitest";
import { LocalStorageService } from "../StorageService";
import type { CuadernoData } from "../../models/types";

describe("LocalStorageService", () => {
  let service: LocalStorageService;
  
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    service = new LocalStorageService();
  });

  describe("load()", () => {
    it("should return null when localStorage is empty", () => {
      const result = service.load();
      expect(result).toBeNull();
    });

    it("should parse and return valid JSON data", () => {
      const mockData: CuadernoData = {
        config: {
          horasPorDia: 5,
          fechaInicio: "2025-01-01",
          fechaFin: "2025-12-31",
        },
        dias: [
          {
            fecha: "2025-01-01",
            asistido: true,
            horas: 5,
            actividades: ["Test activity"],
            firma: null,
          },
        ],
      };

      localStorage.setItem("cdp-data", JSON.stringify(mockData));
      
      const result = service.load();
      expect(result).toEqual(mockData);
    });

    it("should handle JSON parse errors gracefully", () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      
      localStorage.setItem("cdp-data", "invalid json{");
      
      const result = service.load();
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error loading from localStorage:",
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });

    it("should return null if data is not present", () => {
      const result = service.load();
      expect(result).toBeNull();
    });
  });

  describe("save()", () => {
    it("should store data in localStorage", () => {
      const mockData: CuadernoData = {
        config: {
          horasPorDia: 6,
          fechaInicio: "2025-02-01",
          fechaFin: "2025-11-30",
        },
        dias: [],
      };

      service.save(mockData);
      
      const stored = localStorage.getItem("cdp-data");
      expect(stored).not.toBeNull();
      expect(JSON.parse(stored!)).toEqual(mockData);
    });

    it("should throw error on storage failure", () => {
      const mockData: CuadernoData = {
        config: { horasPorDia: 5 },
        dias: [],
      };

      // Mock localStorage.setItem to throw error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = vi.fn(() => {
        throw new Error("Storage quota exceeded");
      });

      expect(() => service.save(mockData)).toThrow();
      
      // Restore original
      localStorage.setItem = originalSetItem;
    });

    it("should overwrite existing data", () => {
      const firstData: CuadernoData = {
        config: { horasPorDia: 5 },
        dias: [],
      };
      const secondData: CuadernoData = {
        config: { horasPorDia: 8 },
        dias: [],
      };

      service.save(firstData);
      service.save(secondData);
      
      const result = service.load();
      expect(result).toEqual(secondData);
    });
  });

  describe("theme operations", () => {
    describe("saveTheme()", () => {
      it("should save theme to localStorage", () => {
        service.saveTheme("dark");
        
        const stored = localStorage.getItem("cdp-theme");
        expect(stored).toBe("dark");
      });

      it("should handle errors gracefully", () => {
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        
        // Mock localStorage.setItem to throw error
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = vi.fn(() => {
          throw new Error("Storage error");
        });

        expect(() => service.saveTheme("dark")).not.toThrow();
        expect(consoleSpy).toHaveBeenCalledWith(
          "Error saving theme:",
          expect.any(Error)
        );
        
        // Restore
        localStorage.setItem = originalSetItem;
        consoleSpy.mockRestore();
      });
    });

    describe("loadTheme()", () => {
      it("should return saved theme", () => {
        localStorage.setItem("cdp-theme", "light");
        
        const result = service.loadTheme();
        expect(result).toBe("light");
      });

      it("should return null when theme is not set", () => {
        const result = service.loadTheme();
        expect(result).toBeNull();
      });

      it("should handle errors gracefully", () => {
        const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        
        // Mock localStorage.getItem to throw error
        const originalGetItem = localStorage.getItem;
        localStorage.getItem = vi.fn(() => {
          throw new Error("Storage error");
        });

        const result = service.loadTheme();
        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith(
          "Error loading theme:",
          expect.any(Error)
        );
        
        // Restore
        localStorage.getItem = originalGetItem;
        consoleSpy.mockRestore();
      });
    });
  });
});
