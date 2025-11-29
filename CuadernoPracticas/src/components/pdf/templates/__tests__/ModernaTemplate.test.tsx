import { describe, it, expect, vi } from "vitest";
import { ModernaTemplate } from "../ModernaTemplate";
import type { PDFGenerationOptions, Dia } from "../../../../core/models/types";

// Mock the groupDaysForPages utility
vi.mock("../../../../core/utils/pdfUtils", () => ({
  groupDaysForPages: vi.fn((dias) => {
    // Simple mock: return days in one page
    return [dias];
  }),
}));

describe("ModernaTemplate", () => {
  const testDia: Dia = {
    fecha: "2024-01-15",
    horas: 8,
    asistido: true,
    actividades: ["Activity 1", "Activity 2"],
    firma: null,
  };

  const testOptions: PDFGenerationOptions = {
    config: {
      colors: {
        primary: "#7C3AED",
        secondary: "#22D3EE",
        text: "#1E293B",
        background: "#FFFFFF",
      },
      template: "moderna",
    },
    data: {
      config: {
        horasPorDia: 8,
        nombreEmpresa: "Test Company",
        fechaInicio: "2024-01-01",
        fechaFin: "2024-12-31",
      },
      dias: [testDia],
    },
  };

  it("should render without errors", async () => {
    expect(() => {
      ModernaTemplate(testOptions);
    }).not.toThrow();
  });

  it("should accept config and dias props", () => {
    const result = ModernaTemplate(testOptions);
    expect(result).toBeDefined();
  });

  it("should render Document component", () => {
    const result = ModernaTemplate(testOptions);
    expect(result).toBeTruthy();
    // React-PDF components are objects, check if it looks like a react element
    expect(result).toHaveProperty("type");
  });

  it("should handle empty dias array", () => {
    const emptyOptions = {
      ...testOptions,
      data: {
        ...testOptions.data,
        dias: [],
      },
    };

    expect(() => {
      ModernaTemplate(emptyOptions);
    }).not.toThrow();
  });

  it("should handle multiple dias", () => {
    const multipleDaysOptions = {
      ...testOptions,
      data: {
        ...testOptions.data,
        dias: [
          testDia,
          { ...testDia, fecha: "2024-01-16" },
          { ...testDia, fecha: "2024-01-17" },
        ],
      },
    };

    expect(() => {
      ModernaTemplate(multipleDaysOptions);
    }).not.toThrow();
  });

  it("should use provided colors", () => {
    const customColors = {
      primary: "#FF0000",
      secondary: "#00FF00",
      text: "#0000FF",
      background: "#FFFFFF",
    };

    const customOptions = {
      ...testOptions,
      config: {
        ...testOptions.config,
        colors: customColors,
      },
    };

    expect(() => {
      ModernaTemplate(customOptions);
    }).not.toThrow();
  });
});
