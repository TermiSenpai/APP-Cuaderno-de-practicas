import { describe, it, expect } from "vitest";
import { ProfesionalDayEntry } from "../ProfesionalDayEntry";
import type { Dia, PDFColors } from "../../../../core/models/types";

describe("ProfesionalDayEntry", () => {
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
      ProfesionalDayEntry({
        dia: testDia,
        colors: testColors,
        horasDefault: 8,
      });
    }).not.toThrow();
  });

  it("should accept dia prop", () => {
    const result = ProfesionalDayEntry({
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
      ProfesionalDayEntry({
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
      ProfesionalDayEntry({
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
      ProfesionalDayEntry({
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
      ProfesionalDayEntry({
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
      ProfesionalDayEntry({
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
      ProfesionalDayEntry({
        dia: testDia,
        colors: customColors,
        horasDefault: 8,
      });
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
      ProfesionalDayEntry({
        dia: diaWithManyActivities,
        colors: testColors,
        horasDefault: 8,
      });
    }).not.toThrow();
  });
});
