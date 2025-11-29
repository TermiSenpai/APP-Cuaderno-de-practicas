import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { PDFPreviewModal } from "../PDFPreviewModal";
import type { CuadernoData } from "../../../../core/models/types";

// Mock child components
vi.mock("../PDFPreview", () => ({
  PDFPreview: () => <div data-testid="pdf-preview">PDF Preview</div>,
}));

vi.mock("../TemplateSelector", () => ({
  TemplateSelector: ({ selectedTemplate, onTemplateChange }: any) => (
    <div data-testid="template-selector">
      <button onClick={() => onTemplateChange("moderna")}>
        Change Template
      </button>
      <span>{selectedTemplate}</span>
    </div>
  ),
}));

vi.mock("../ColorCustomizer", () => ({
  ColorCustomizer: ({ colors, onColorChange }: any) => (
    <div data-testid="color-customizer">
      <button onClick={() => onColorChange("primary", "#FF0000")}>
        Change Color
      </button>
    </div>
  ),
}));

// Mock usePDFGenerator hook
vi.mock("../usePDFGenerator", () => ({
  usePDFGenerator: () => ({
    isGenerating: false,
    error: null,
    selectedTemplate: "clasica",
    customColors: {
      primary: "#7C3AED",
      secondary: "#22D3EE",
      text: "#1E293B",
      background: "#FFFFFF",
    },
    currentConfig: {
      colors: {
        primary: "#7C3AED",
        secondary: "#22D3EE",
        text: "#1E293B",
        background: "#FFFFFF",
      },
      template: "clasica",
    },
    handleTemplateChange: vi.fn(),
    handleColorChange: vi.fn(),
    downloadPDF: vi.fn(),
  }),
}));

// Mock PDF templates
vi.mock("../../../pdf/templates/ClasicaTemplate", () => ({
  ClasicaTemplate: () => <div>Clasica Template</div>,
}));

vi.mock("../../../pdf/templates/ModernaTemplate", () => ({
  ModernaTemplate: () => <div>Moderna Template</div>,
}));

vi.mock("../../../pdf/templates/MinimalTemplate", () => ({
  MinimalTemplate: () => <div>Minimal Template</div>,
}));

vi.mock("../../../pdf/templates/CompactaTemplate", () => ({
  CompactaTemplate: () => <div>Compacta Template</div>,
}));

vi.mock("../../../pdf/templates/ProfesionalTemplate", () => ({
  ProfesionalTemplate: () => <div>Profesional Template</div>,
}));

describe("PDFPreviewModal", () => {
  const mockOnClose = vi.fn();

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

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it("should not render when isOpen is false", () => {
    const { container } = render(
      <PDFPreviewModal isOpen={false} onClose={mockOnClose} data={mockData} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should not render when data is null", () => {
    const { container } = render(
      <PDFPreviewModal isOpen={true} onClose={mockOnClose} data={null} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render when isOpen is true and data exists", () => {
    render(
      <PDFPreviewModal isOpen={true} onClose={mockOnClose} data={mockData} />
    );
    expect(
      screen.getByText("Vista Previa y Generación de PDF")
    ).toBeInTheDocument();
  });

  it("should render all child components", () => {
    render(
      <PDFPreviewModal isOpen={true} onClose={mockOnClose} data={mockData} />
    );
    expect(screen.getByTestId("template-selector")).toBeInTheDocument();
    expect(screen.getByTestId("color-customizer")).toBeInTheDocument();
    expect(screen.getByTestId("pdf-preview")).toBeInTheDocument();
  });

  it("should show close button", () => {
    render(
      <PDFPreviewModal isOpen={true} onClose={mockOnClose} data={mockData} />
    );
    const closeButton = screen.getByLabelText("Cerrar");
    expect(closeButton).toBeInTheDocument();
  });

  it("should call onClose when close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <PDFPreviewModal isOpen={true} onClose={mockOnClose} data={mockData} />
    );
    const closeButton = screen.getByLabelText("Cerrar");
    await user.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should show download button", () => {
    render(
      <PDFPreviewModal isOpen={true} onClose={mockOnClose} data={mockData} />
    );
    expect(screen.getByText("Descargar PDF")).toBeInTheDocument();
  });

  it("should show cancel button", () => {
    render(
      <PDFPreviewModal isOpen={true} onClose={mockOnClose} data={mockData} />
    );
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
  });

  it("should call onClose when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <PDFPreviewModal isOpen={true} onClose={mockOnClose} data={mockData} />
    );
    const cancelButton = screen.getByText("Cancelar");
    await user.click(cancelButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should render modal description", () => {
    render(
      <PDFPreviewModal isOpen={true} onClose={mockOnClose} data={mockData} />
    );
    expect(
      screen.getByText(
        "Personaliza el diseño y descarga tu cuaderno de prácticas"
      )
    ).toBeInTheDocument();
  });
});
