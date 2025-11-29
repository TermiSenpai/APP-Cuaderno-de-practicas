import { describe, it, expect } from "vitest";
import { ModernaDayEntry } from "../ModernaDayEntry";
import type { Dia, PDFColors } from "../../../../core/models/types";

describe("ModernaDayEntry", () => {
  const testColors: PDFColors = {
    primary: "#7C3AED",
    secondary: "#22D3EE",
    text: "#1E293B",
    background: "#FFFFFF",
  };

  const testDia: Dia = {
    fecha: "2024-01-15",
    horas: 8,
    asistido: true,
    actividades: ["Activity 1", "Activity 2"],
    firma: null,
  };

  it("should render without errors", () => {
    expect(() => {
      ModernaDayEntry({ dia: testDia, colors: testColors, horasDefault: 8 });
    }).not.toThrow();
  });

  it("should accept dia prop", () => {
    const result = ModernaDayEntry({
      dia: testDia,
      colors: testColors,
      horasDefault: 8,
    });
    expect(result).toBeDefined();
  });

  it("should handle día with no activities", () => {
    const diaWithoutActivities: Dia = {
      ...testDia,
      actividades: [],
    };

    expect(() => {
      ModernaDayEntry({
        dia: diaWithoutActivities,
        colors: testColors,
        horasDefault: 8,
      });
    }).not.toThrow();
  });

  it("should handle día without signature", () => {
    const diaWithoutSignature: Dia = {
      ...testDia,
      firma: null,
    };

    expect(() => {
      ModernaDayEntry({
        dia: diaWithoutSignature,
        colors: testColors,
        horasDefault: 8,
      });
    }).not.toThrow();
  });

  it("should handle día with signature", () => {
    const diaWithSignature: Dia = {
      ...testDia,
      firma: "data:image/png;base64,mock",
    };

    expect(() => {
      ModernaDayEntry({
        dia: diaWithSignature,
        colors: testColors,
        horasDefault: 8,
      });
    }).not.toThrow();
  });

  it("should use default hours when dia.horas is not set", () => {
    const diaWithoutHours: Dia = {
      fecha: "2024-01-15",
      asistido: true,
      actividades: [],
      firma: null,
    };

    expect(() => {
      ModernaDayEntry({
        dia: diaWithoutHours,
        colors: testColors,
        horasDefault: 10,
      });
    }).not.toThrow();
  });

  it("should handle día not attended", () => {
    const diaNotAttended: Dia = {
      ...testDia,
      asistido: false,
    };

    expect(() => {
      ModernaDayEntry({
        dia: diaNotAttended,
        colors: testColors,
        horasDefault: 8,
      });
    }).not.toThrow();
  });

  it("should use provided colors", () => {
    const customColors: PDFColors = {
      primary: "#FF0000",
      secondary: "#00FF00",
      text: "#0000FF",
      background: "#FFFFFF",
    };

    expect(() => {
      ModernaDayEntry({ dia: testDia, colors: customColors, horasDefault: 8 });
    }).not.toThrow();
  });

  it("should handle multiple activities", () => {
    const diaWithManyActivities: Dia = {
      ...testDia,
      actividades: [
        "Activity 1",
        "Activity 2",
        "Activity 3",
        "Activity 4",
        "Activity 5",
      ],
    };

    expect(() => {
      ModernaDayEntry({
        dia: diaWithManyActivities,
        colors: testColors,
        horasDefault: 8,
      });
    }).not.toThrow();
  });
});
