import { describe, it, expect, vi } from "vitest";
import { BrowserFileService } from "../FileService";
import type { CuadernoData } from "../../models/types";

describe("BrowserFileService", () => {
  let service: BrowserFileService;

  beforeEach(() => {
    service = new BrowserFileService();
    // Clear any previous mocks
    vi.clearAllMocks();
  });

  describe("exportToJSON()", () => {
    it("should create downloadable blob with correct data", () => {
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

      // Mock document methods
      const createElement = vi.spyOn(document, "createElement");
      const appendChild = vi.spyOn(document.body, "appendChild");
      const click = vi.fn();
      const remove = vi.fn();

      const mockAnchor = {
        href: "",
        download: "",
        click,
        remove,
      } as any;

      createElement.mockReturnValue(mockAnchor);
      appendChild.mockImplementation(() => mockAnchor);

      service.exportToJSON(mockData, "test-file.json");

      expect(createElement).toHaveBeenCalledWith("a");
      expect(mockAnchor.download).toBe("test-file.json");
      expect(click).toHaveBeenCalled();
      expect(remove).toHaveBeenCalled();
      expect(URL.createObjectURL).toHaveBeenCalled();
      expect(URL.revokeObjectURL).toHaveBeenCalled();
    });

    it("should use default filename if not provided", () => {
      const mockData: CuadernoData = {
        config: { horasPorDia: 5 },
        dias: [],
      };

      const createElement = vi.spyOn(document, "createElement");
      const click = vi.fn();
      const remove = vi.fn();

      const mockAnchor = {
        href: "",
        download: "",
        click,
        remove,
      } as any;

      createElement.mockReturnValue(mockAnchor);

      service.exportToJSON(mockData);

      expect(mockAnchor.download).toBe("cuaderno-practicas.json");
    });

    it("should handle errors properly", () => {
      const mockData: CuadernoData = {
        config: { horasPorDia: 5 },
        dias: [],
      };

      // Mock createElement to throw error
      vi.spyOn(document, "createElement").mockImplementation(() => {
        throw new Error("DOM error");
      });

      expect(() => service.exportToJSON(mockData)).toThrow(
        "Error al exportar:"
      );
    });
  });

  describe("importFromFile()", () => {
    it("should parse valid JSON file", async () => {
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
            actividades: ["Test"],
            firma: null,
          },
        ],
      };

      const mockFile = {
        text: vi.fn().mockResolvedValue(JSON.stringify(mockData)),
      } as any;

      const result = await service.importFromFile(mockFile);

      expect(result).toEqual(mockData);
      expect(mockFile.text).toHaveBeenCalled();
    });

    it("should reject invalid format - no dias array", async () => {
      const invalidData = {
        config: { horasPorDia: 5 },
        // Missing dias array
      };

      const mockFile = {
        text: vi.fn().mockResolvedValue(JSON.stringify(invalidData)),
      } as any;

      await expect(service.importFromFile(mockFile)).rejects.toThrow(
        "Formato inválido: no contiene un array de días"
      );
    });

    it("should reject invalid format - dias is not an array", async () => {
      const invalidData = {
        config: { horasPorDia: 5 },
        dias: "not an array",
      };

      const mockFile = {
        text: vi.fn().mockResolvedValue(JSON.stringify(invalidData)),
      } as any;

      await expect(service.importFromFile(mockFile)).rejects.toThrow(
        "Formato inválido: no contiene un array de días"
      );
    });

    it("should handle JSON parse errors", async () => {
      const mockFile = {
        text: vi.fn().mockResolvedValue("invalid json{"),
      } as any;

      await expect(service.importFromFile(mockFile)).rejects.toThrow(
        "Error al leer el archivo:"
      );
    });

    it("should handle file read errors", async () => {
      const mockFile = {
        text: vi.fn().mockRejectedValue(new Error("File read error")),
      } as any;

      await expect(service.importFromFile(mockFile)).rejects.toThrow(
        "Error al leer el archivo:"
      );
    });

    it("should accept empty dias array", async () => {
      const validData: CuadernoData = {
        config: { horasPorDia: 5 },
        dias: [],
      };

      const mockFile = {
        text: vi.fn().mockResolvedValue(JSON.stringify(validData)),
      } as any;

      const result = await service.importFromFile(mockFile);

      expect(result).toEqual(validData);
    });
  });
});
