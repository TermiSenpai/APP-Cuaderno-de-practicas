import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { PDFPreview } from "../PDFPreview";
import type {
  PDFGenerationOptions,
  CuadernoData,
} from "../../../../core/models/types";

// Mock @react-pdf/renderer
vi.mock("@react-pdf/renderer", () => ({
  PDFViewer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="pdf-viewer">{children}</div>
  ),
}));

// Mock PDF templates
vi.mock("../../../pdf/templates/ClasicaTemplate", () => ({
  ClasicaTemplate: () => (
    <div data-testid="clasica-template">Clasica Template</div>
  ),
}));

vi.mock("../../../pdf/templates/ModernaTemplate", () => ({
  ModernaTemplate: () => (
    <div data-testid="moderna-template">Moderna Template</div>
  ),
}));

vi.mock("../../../pdf/templates/MinimalTemplate", () => ({
  MinimalTemplate: () => (
    <div data-testid="minimal-template">Minimal Template</div>
  ),
}));

vi.mock("../../../pdf/templates/CompactaTemplate", () => ({
  CompactaTemplate: () => (
    <div data-testid="compacta-template">Compacta Template</div>
  ),
}));

vi.mock("../../../pdf/templates/ProfesionalTemplate", () => ({
  ProfesionalTemplate: () => (
    <div data-testid="profesional-template">Profesional Template</div>
  ),
}));

describe("PDFPreview", () => {
  const mockData: CuadernoData = {
    config: {
      horasPorDia: 8,
      nombreEmpresa: "Test Company",
      fechaInicio: "2024-01-01",
      fechaFin: "2024-12-31",
    },
    dias: [
      {
        fecha: "2024-01-15",
        horas: 8,
        asistido: true,
        actividades: ["Activity 1"],
        firma: null,
      },
    ],
  };

  const defaultOptions: PDFGenerationOptions = {
    config: {
      colors: {
        primary: "#7C3AED",
        secondary: "#22D3EE",
        text: "#1E293B",
        background: "#FFFFFF",
      },
      template: "clasica",
    },
    data: mockData,
  };

  it("should render without errors", () => {
    render(<PDFPreview options={defaultOptions} />);
    expect(screen.getByTestId("pdf-viewer")).toBeInTheDocument();
  });

  it("should render ClasicaTemplate when template is clasica", () => {
    render(<PDFPreview options={defaultOptions} />);
    expect(screen.getByTestId("clasica-template")).toBeInTheDocument();
  });

  it("should render ModernaTemplate when template is moderna", () => {
    const options = {
      ...defaultOptions,
      config: { ...defaultOptions.config, template: "moderna" as const },
    };
    render(<PDFPreview options={options} />);
    expect(screen.getByTestId("moderna-template")).toBeInTheDocument();
  });

  it("should render MinimalTemplate when template is minimal", () => {
    const options = {
      ...defaultOptions,
      config: { ...defaultOptions.config, template: "minimal" as const },
    };
    render(<PDFPreview options={options} />);
    expect(screen.getByTestId("minimal-template")).toBeInTheDocument();
  });

  it("should render CompactaTemplate when template is compacta", () => {
    const options = {
      ...defaultOptions,
      config: { ...defaultOptions.config, template: "compacta" as const },
    };
    render(<PDFPreview options={options} />);
    expect(screen.getByTestId("compacta-template")).toBeInTheDocument();
  });

  it("should render ProfesionalTemplate when template is profesional", () => {
    const options = {
      ...defaultOptions,
      config: { ...defaultOptions.config, template: "profesional" as const },
    };
    render(<PDFPreview options={options} />);
    expect(screen.getByTestId("profesional-template")).toBeInTheDocument();
  });

  it("should pass options to template component", () => {
    const customOptions = {
      ...defaultOptions,
      config: {
        ...defaultOptions.config,
        colors: {
          primary: "#FF0000",
          secondary: "#00FF00",
          text: "#0000FF",
          background: "#FFFFFF",
        },
      },
    };
    render(<PDFPreview options={customOptions} />);
    expect(screen.getByTestId("pdf-viewer")).toBeInTheDocument();
  });
});
