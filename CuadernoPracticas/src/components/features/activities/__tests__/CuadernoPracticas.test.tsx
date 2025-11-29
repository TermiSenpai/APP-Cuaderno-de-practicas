import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { CuadernoPracticas } from "../CuadernoPracticas";

// Mock child components
vi.mock("../DayCard/DayCard", () => ({
  DayCard: ({ dia, index }: any) => (
    <div data-testid={`day-card-${index}`} data-day-index={index}>
      Day Card: {dia.fecha}
    </div>
  ),
}));

vi.mock("../../config/ConfigModal", () => ({
  ConfigModal: ({ isOpen }: any) =>
    isOpen ? <div data-testid="config-modal">Config Modal</div> : null,
}));

vi.mock("../../pdf/PDFPreviewModal", () => ({
  PDFPreviewModal: ({ isOpen }: any) =>
    isOpen ? <div data-testid="pdf-modal">PDF Modal</div> : null,
}));

// Mock useCuadernoPracticas hook
vi.mock("../useCuadernoPracticas", () => ({
  useCuadernoPracticas: () => ({
    data: {
      config: {
        nombreEmpresa: "Test Company",
        fechaInicio: "2024-01-01",
        fechaFin: "2024-01-31",
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
      },
      dias: [
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
          actividades: [],
          firma: null,
        },
      ],
    },
    horasDefault: 8,
    updateDia: vi.fn(),
    handleFileLoad: vi.fn(),
    isConfigOpen: false,
    setIsConfigOpen: vi.fn(),
    handleConfigSave: vi.fn(),
    handleExport: vi.fn(),
    handleImport: vi.fn(),
    handleCreateNew: vi.fn(),
    isPDFModalOpen: false,
    setIsPDFModalOpen: vi.fn(),
  }),
}));

// Mock dateUtils
vi.mock("../../../../core/utils/dateUtils", () => ({
  findFirstEmptyAttendedDay: vi.fn(() => 1),
}));

describe("CuadernoPracticas", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render without errors", () => {
    const { container } = render(<CuadernoPracticas />);
    expect(container.querySelector(".w-full")).toBeInTheDocument();
  });

  it("should render file input", () => {
    render(<CuadernoPracticas />);
    const fileInput = document.querySelector("#file-import");
    expect(fileInput).toBeInTheDocument();
    expect(fileInput).toHaveAttribute("type", "file");
    expect(fileInput).toHaveAttribute("accept", ".json");
  });

  it("should render ConfigModal", () => {
    render(<CuadernoPracticas />);
    // ConfigModal is present but not open
    expect(screen.queryByTestId("config-modal")).not.toBeInTheDocument();
  });

  it("should render PDFPreviewModal", () => {
    render(<CuadernoPracticas />);
    // PDFPreviewModal is present but not open
    expect(screen.queryByTestId("pdf-modal")).not.toBeInTheDocument();
  });

  it("should render day cards when data exists", () => {
    render(<CuadernoPracticas />);
    expect(screen.getByTestId("day-card-0")).toBeInTheDocument();
    expect(screen.getByTestId("day-card-1")).toBeInTheDocument();
  });

  it("should render day cards with correct dates", () => {
    render(<CuadernoPracticas />);
    expect(screen.getByText("Day Card: 2024-01-15")).toBeInTheDocument();
    expect(screen.getByText("Day Card: 2024-01-16")).toBeInTheDocument();
  });

  it("should add data-day-index attribute to day cards", () => {
    render(<CuadernoPracticas />);
    const firstCard = screen.getByTestId("day-card-0");
    const secondCard = screen.getByTestId("day-card-1");
    expect(firstCard).toHaveAttribute("data-day-index", "0");
    expect(secondCard).toHaveAttribute("data-day-index", "1");
  });

  it("should render print styles", () => {
    const { container } = render(<CuadernoPracticas />);
    const styleTag = container.querySelector("style");
    expect(styleTag).toBeInTheDocument();
    expect(styleTag?.textContent).toContain("@media print");
  });

  it("should have activities-list container", () => {
    const { container } = render(<CuadernoPracticas />);
    const listContainer = container.querySelector(".activities-list");
    expect(listContainer).toBeInTheDocument();
  });
});
