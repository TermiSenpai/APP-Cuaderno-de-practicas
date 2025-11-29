import { describe, it, expect } from "vitest";
import {
  formatDDMMYYYY,
  weekdayEs,
  generateDiasFromConfig,
  findFirstEmptyAttendedDay,
} from "../dateUtils";
import type { CuadernoConfig, Dia } from "../../models/types";

describe("dateUtils", () => {
  describe("formatDDMMYYYY()", () => {
    it("should format ISO date string to DD/MM/YYYY", () => {
      expect(formatDDMMYYYY("2025-01-15")).toBe("15/01/2025");
      expect(formatDDMMYYYY("2025-12-31")).toBe("31/12/2025");
      expect(formatDDMMYYYY("2025-03-05")).toBe("05/03/2025");
    });

    it("should pad single digits with zeros", () => {
      expect(formatDDMMYYYY("2025-01-01")).toBe("01/01/2025");
      expect(formatDDMMYYYY("2025-09-09")).toBe("09/09/2025");
    });

    it("should handle different years", () => {
      expect(formatDDMMYYYY("2024-06-15")).toBe("15/06/2024");
      expect(formatDDMMYYYY("2026-11-20")).toBe("20/11/2026");
    });
  });

  describe("weekdayEs()", () => {
    it("should return correct Spanish weekday names", () => {
      // 2025-01-01 is Wednesday (Miércoles)
      expect(weekdayEs("2025-01-01")).toBe("Miércoles");
      
      // 2025-01-02 is Thursday (Jueves)
      expect(weekdayEs("2025-01-02")).toBe("Jueves");
      
      // 2025-01-03 is Friday (Viernes)
      expect(weekdayEs("2025-01-03")).toBe("Viernes");
      
      // 2025-01-04 is Saturday (Sábado)
      expect(weekdayEs("2025-01-04")).toBe("Sábado");
      
      // 2025-01-05 is Sunday (Domingo)
      expect(weekdayEs("2025-01-05")).toBe("Domingo");
      
      // 2025-01-06 is Monday (Lunes)
      expect(weekdayEs("2025-01-06")).toBe("Lunes");
      
      // 2025-01-07 is Tuesday (Martes)
      expect(weekdayEs("2025-01-07")).toBe("Martes");
    });
  });

  describe("generateDiasFromConfig()", () => {
    it("should return empty array when config is undefined", () => {
      const result = generateDiasFromConfig(undefined);
      expect(result).toEqual([]);
    });

    it("should return empty array when fechaInicio is missing", () => {
      const config: CuadernoConfig = {
        fechaFin: "2025-12-31",
        horasPorDia: 5,
      };
      const result = generateDiasFromConfig(config);
      expect(result).toEqual([]);
    });

    it("should return empty array when fechaFin is missing", () => {
      const config: CuadernoConfig = {
        fechaInicio: "2025-01-01",
        horasPorDia: 5,
      };
      const result = generateDiasFromConfig(config);
      expect(result).toEqual([]);
    });

    it("should return empty array when start date is after end date", () => {
      const config: CuadernoConfig = {
        fechaInicio: "2025-12-31",
        fechaFin: "2025-01-01",
        horasPorDia: 5,
      };
      const result = generateDiasFromConfig(config);
      expect(result).toEqual([]);
    });

    it("should generate days for date range with default Mon-Fri", () => {
      const config: CuadernoConfig = {
        fechaInicio: "2025-01-06", // Monday
        fechaFin: "2025-01-10",    // Friday
        horasPorDia: 5,
      };
      
      const result = generateDiasFromConfig(config);
      
      expect(result).toHaveLength(5);
      expect(result[0].fecha).toBe("2025-01-06");
      expect(result[4].fecha).toBe("2025-01-10");
      
      result.forEach((dia) => {
        expect(dia.asistido).toBe(true);
        expect(dia.horas).toBe(5);
        expect(dia.actividades).toEqual([]);
        expect(dia.firma).toBeNull();
      });
    });

    it("should respect active days configuration", () => {
      const config: CuadernoConfig = {
        fechaInicio: "2025-01-06", // Monday
        fechaFin: "2025-01-12",    // Sunday
        horasPorDia: 6,
        diasActivos: {
          lunes: true,
          martes: false,
          miercoles: true,
          jueves: false,
          viernes: true,
          sabado: false,
          domingo: false,
        },
      };
      
      const result = generateDiasFromConfig(config);
      
      // Should only have Mon, Wed, Fri = 3 days
      expect(result).toHaveLength(3);
      expect(result[0].fecha).toBe("2025-01-06"); // Monday
      expect(result[1].fecha).toBe("2025-01-08"); // Wednesday
      expect(result[2].fecha).toBe("2025-01-10"); // Friday
    });

    it("should include weekends when configured", () => {
      const config: CuadernoConfig = {
        fechaInicio: "2025-01-04", // Saturday
        fechaFin: "2025-01-05",    // Sunday
        horasPorDia: 4,
        diasActivos: {
          lunes: false,
          martes: false,
          miercoles: false,
          jueves: false,
          viernes: false,
          sabado: true,
          domingo: true,
        },
      };
      
      const result = generateDiasFromConfig(config);
      
      expect(result).toHaveLength(2);
      expect(result[0].fecha).toBe("2025-01-04"); // Saturday
      expect(result[1].fecha).toBe("2025-01-05"); // Sunday
    });

    it("should use horasPorDia from config", () => {
      const config: CuadernoConfig = {
        fechaInicio: "2025-01-06",
        fechaFin: "2025-01-06",
        horasPorDia: 8,
      };
      
      const result = generateDiasFromConfig(config);
      
      expect(result[0].horas).toBe(8);
    });

    it("should default to 5 hours when horasPorDia is not specified", () => {
      const config: CuadernoConfig = {
        fechaInicio: "2025-01-06",
        fechaFin: "2025-01-06",
      };
      
      const result = generateDiasFromConfig(config);
      
      expect(result[0].horas).toBe(5);
    });

    it("should handle single day range", () => {
      const config: CuadernoConfig = {
        fechaInicio: "2025-01-06", // Monday
        fechaFin: "2025-01-06",
        horasPorDia: 5,
      };
      
      const result = generateDiasFromConfig(config);
      
      expect(result).toHaveLength(1);
      expect(result[0].fecha).toBe("2025-01-06");
    });

    it("should handle multi-week range", () => {
      const config: CuadernoConfig = {
        fechaInicio: "2025-01-06", // Monday
        fechaFin: "2025-01-17",    // Friday (2 weeks)
        horasPorDia: 5,
      };
      
      const result = generateDiasFromConfig(config);
      
      // 2 weeks of Mon-Fri = 10 days
      expect(result).toHaveLength(10);
    });
  });

  describe("findFirstEmptyAttendedDay()", () => {
    it("should find first attended day with no activities", () => {
      const dias: Dia[] = [
        {
          fecha: "2025-01-01",
          asistido: true,
          horas: 5,
          actividades: ["Activity 1"],
          firma: null,
        },
        {
          fecha: "2025-01-02",
          asistido: true,
          horas: 5,
          actividades: [], // Empty!
          firma: null,
        },
        {
          fecha: "2025-01-03",
          asistido: true,
          horas: 5,
          actividades: ["Activity 3"],
          firma: null,
        },
      ];
      
      const result = findFirstEmptyAttendedDay(dias);
      expect(result).toBe(1);
    });

    it("should return -1 if all attended days have activities", () => {
      const dias: Dia[] = [
        {
          fecha: "2025-01-01",
          asistido: true,
          horas: 5,
          actividades: ["Activity 1"],
          firma: null,
        },
        {
          fecha: "2025-01-02",
          asistido: true,
          horas: 5,
          actividades: ["Activity 2"],
          firma: null,
        },
      ];
      
      const result = findFirstEmptyAttendedDay(dias);
      expect(result).toBe(-1);
    });

    it("should skip non-attended days", () => {
      const dias: Dia[] = [
        {
          fecha: "2025-01-01",
          asistido: false,
          horas: 0,
          actividades: [], // Empty but not attended
          firma: null,
        },
        {
          fecha: "2025-01-02",
          asistido: true,
          horas: 5,
          actividades: [], // Empty and attended!
          firma: null,
        },
      ];
      
      const result = findFirstEmptyAttendedDay(dias);
      expect(result).toBe(1);
    });

    it("should treat undefined asistido as true", () => {
      const dias: Dia[] = [
        {
          fecha: "2025-01-01",
          // asistido: undefined (defaults to true)
          horas: 5,
          actividades: [],
          firma: null,
        } as any,
      ];
      
      const result = findFirstEmptyAttendedDay(dias);
      expect(result).toBe(0);
    });

    it("should return -1 for empty array", () => {
      const result = findFirstEmptyAttendedDay([]);
      expect(result).toBe(-1);
    });

    it("should handle undefined activities array", () => {
      const dias: Dia[] = [
        {
          fecha: "2025-01-01",
          asistido: true,
          horas: 5,
          actividades: undefined as any,
          firma: null,
        },
      ];
      
      const result = findFirstEmptyAttendedDay(dias);
      expect(result).toBe(0);
    });
  });
});
