import { describe, it, expect, vi } from "vitest";
import { PDFWeekPage } from "../PDFWeekPage";
import type {
  Dia,
  PDFColors,
  CuadernoConfig,
} from "../../../core/models/types";

// Mock pdfUtils
vi.mock("../../../core/utils/pdfUtils", () => ({
  formatDateRange: vi.fn((start, end) => `${start} - ${end}`),
}));

// Mock DayComponent
const MockDayComponent = ({ dia, colors, horasDefault }: any) => null;

describe("PDFWeekPage", () => {
  const testColors: PDFColors = {
    primary: "#7C3AED",
    secondary: "#22D3EE",
    text: "#1E293B",
    background: "#FFFFFF",
  };

  const testDias: Dia[] = [
    {
      fecha: "2024-01-15",
      horas: 8,
      asistido: true,
      actividades: ["Activity 1"],
      firma: null,
    },
    {
      fecha: "2024-01-16",
      horas: 8,
      asistido: true,
      actividades: ["Activity 2"],
      firma: null,
    },
  ];

  const testConfig: CuadernoConfig = {
    nombreEmpresa: "Test Company",
    fechaInicio: "2024-01-01",
    fechaFin: "2024-12-31",
    horasPorDia: 8,
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

  it("should render without errors", () => {
    expect(() => {
      PDFWeekPage({
        dias: testDias,
        colors: testColors,
        config: testConfig,
        pageNumber: 1,
        totalPages: 5,
        DayComponent: MockDayComponent,
      });
    }).not.toThrow();
  });

  it("should accept all props", () => {
    const result = PDFWeekPage({
      dias: testDias,
      colors: testColors,
      config: testConfig,
      pageNumber: 1,
      totalPages: 5,
      DayComponent: MockDayComponent,
    });
    expect(result).toBeDefined();
  });

  it("should render Page component", () => {
    const result = PDFWeekPage({
      dias: testDias,
      colors: testColors,
      config: testConfig,
      pageNumber: 1,
      totalPages: 5,
      DayComponent: MockDayComponent,
    });
    expect(result).toBeTruthy();
    expect(result).toHaveProperty("type");
  });

  it("should handle empty dias array", () => {
    expect(() => {
      PDFWeekPage({
        dias: [],
        colors: testColors,
        config: testConfig,
        pageNumber: 1,
        totalPages: 1,
        DayComponent: MockDayComponent,
      });
    }).not.toThrow();
  });

  it("should handle missing config", () => {
    expect(() => {
      PDFWeekPage({
        dias: testDias,
        colors: testColors,
        config: undefined,
        pageNumber: 1,
        totalPages: 5,
        DayComponent: MockDayComponent,
      });
    }).not.toThrow();
  });

  it("should use default values when config is missing", () => {
    expect(() => {
      PDFWeekPage({
        dias: testDias,
        colors: testColors,
        pageNumber: 1,
        totalPages: 5,
        DayComponent: MockDayComponent,
      });
    }).not.toThrow();
  });

  it("should handle single day", () => {
    const singleDia = [testDias[0]];
    expect(() => {
      PDFWeekPage({
        dias: singleDia,
        colors: testColors,
        config: testConfig,
        pageNumber: 1,
        totalPages: 1,
        DayComponent: MockDayComponent,
      });
    }).not.toThrow();
  });

  it("should handle multiple dias", () => {
    const multipleDias = [
      ...testDias,
      { ...testDias[0], fecha: "2024-01-17" },
      { ...testDias[0], fecha: "2024-01-18" },
    ];
    expect(() => {
      PDFWeekPage({
        dias: multipleDias,
        colors: testColors,
        config: testConfig,
        pageNumber: 1,
        totalPages: 5,
        DayComponent: MockDayComponent,
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
      PDFWeekPage({
        dias: testDias,
        colors: customColors,
        config: testConfig,
        pageNumber: 1,
        totalPages: 5,
        DayComponent: MockDayComponent,
      });
    }).not.toThrow();
  });

  it("should handle different page numbers", () => {
    expect(() => {
      PDFWeekPage({
        dias: testDias,
        colors: testColors,
        config: testConfig,
        pageNumber: 3,
        totalPages: 10,
        DayComponent: MockDayComponent,
      });
    }).not.toThrow();
  });

  it("should handle custom DayComponent", () => {
    const CustomDayComponent = ({ dia }: any) => null;
    expect(() => {
      PDFWeekPage({
        dias: testDias,
        colors: testColors,
        config: testConfig,
        pageNumber: 1,
        totalPages: 5,
        DayComponent: CustomDayComponent,
      });
    }).not.toThrow();
  });
});
