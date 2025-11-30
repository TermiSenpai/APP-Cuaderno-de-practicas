import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ConfigModal } from "../ConfigModal";
import type { CuadernoConfig } from "../../../../core/models/types";

// Mock the useConfigModal hook
vi.mock("../useConfigModal", () => ({
  useConfigModal: ({
    config,
    onSave,
    onImport,
    onExport,
    onCreateNew,
  }: any) => ({
    nombreEmpresa: config?.nombreEmpresa || "",
    setNombreEmpresa: vi.fn(),
    fechaInicio: config?.fechaInicio || "",
    setFechaInicio: vi.fn(),
    fechaFin: config?.fechaFin || "",
    setFechaFin: vi.fn(),
    horasPorDia: config?.horasPorDia || 8,
    setHorasPorDia: vi.fn(),
    diasActivos: config?.diasActivos || {
      lunes: true,
      martes: true,
      miercoles: true,
      jueves: true,
      viernes: true,
      sabado: false,
      domingo: false,
    },
    toggleDia: vi.fn(),
    handleSave: vi.fn(() => onSave?.(config)),
    handleImport: vi.fn(() => onImport?.()),
    handleExport: vi.fn(() => onExport?.()),
    handleCreateNew: vi.fn(() => onCreateNew?.(config)),
  }),
}));

describe("ConfigModal", () => {
  const mockOnClose = vi.fn();
  const mockOnSave = vi.fn();
  const mockOnImport = vi.fn();
  const mockOnExport = vi.fn();
  const mockOnCreateNew = vi.fn();

  const mockConfig: CuadernoConfig = {
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

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnSave.mockClear();
    mockOnImport.mockClear();
    mockOnExport.mockClear();
    mockOnCreateNew.mockClear();
  });

  it("should not render when isOpen is false", () => {
    const { container } = render(
      <ConfigModal
        isOpen={false}
        config={mockConfig}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onImport={mockOnImport}
        onExport={mockOnExport}
        onCreateNew={mockOnCreateNew}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("should render when isOpen is true", () => {
    render(
      <ConfigModal
        isOpen={true}
        config={mockConfig}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onImport={mockOnImport}
        onExport={mockOnExport}
        onCreateNew={mockOnCreateNew}
      />
    );
    expect(screen.getByText("⚙️ Configuración")).toBeInTheDocument();
  });

  it("should show close button when config has data", () => {
    render(
      <ConfigModal
        isOpen={true}
        config={mockConfig}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onImport={mockOnImport}
        onExport={mockOnExport}
        onCreateNew={mockOnCreateNew}
      />
    );
    const closeButton = screen.getByLabelText("Cerrar");
    expect(closeButton).toBeInTheDocument();
  });

  it("should not show close button when config has no dates", () => {
    const emptyConfig = {
      ...mockConfig,
      fechaInicio: "",
      fechaFin: "",
    };
    render(
      <ConfigModal
        isOpen={true}
        config={emptyConfig}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onImport={mockOnImport}
        onExport={mockOnExport}
        onCreateNew={mockOnCreateNew}
      />
    );
    expect(screen.queryByLabelText("Cerrar")).not.toBeInTheDocument();
  });

  it("should render all form fields", () => {
    render(
      <ConfigModal
        isOpen={true}
        config={mockConfig}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onImport={mockOnImport}
        onExport={mockOnExport}
        onCreateNew={mockOnCreateNew}
      />
    );
    expect(screen.getByText("Nombre de la Empresa")).toBeInTheDocument();
    expect(screen.getByText("Fecha de Inicio")).toBeInTheDocument();
    expect(screen.getByText("Fecha de Fin")).toBeInTheDocument();
    expect(screen.getByText("Días Activos")).toBeInTheDocument();
    expect(screen.getByText("Horas por Defecto")).toBeInTheDocument();
  });

  it("should render all day checkboxes", () => {
    render(
      <ConfigModal
        isOpen={true}
        config={mockConfig}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onImport={mockOnImport}
        onExport={mockOnExport}
        onCreateNew={mockOnCreateNew}
      />
    );
    expect(screen.getByText("Lunes")).toBeInTheDocument();
    expect(screen.getByText("Martes")).toBeInTheDocument();
    expect(screen.getByText("Miércoles")).toBeInTheDocument();
    expect(screen.getByText("Jueves")).toBeInTheDocument();
    expect(screen.getByText("Viernes")).toBeInTheDocument();
    expect(screen.getByText("Sábado")).toBeInTheDocument();
    expect(screen.getByText("Domingo")).toBeInTheDocument();
  });

  it("should render action buttons", () => {
    render(
      <ConfigModal
        isOpen={true}
        config={mockConfig}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onImport={mockOnImport}
        onExport={mockOnExport}
        onCreateNew={mockOnCreateNew}
      />
    );
    expect(screen.getByText("💾 Guardar")).toBeInTheDocument();
    expect(screen.getByText("✨ Crear Nuevo")).toBeInTheDocument();
    expect(screen.getByText("📥 Importar")).toBeInTheDocument();
    expect(screen.getByText("📤 Exportar")).toBeInTheDocument();
  });

  it("should call close when close button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ConfigModal
        isOpen={true}
        config={mockConfig}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onImport={mockOnImport}
        onExport={mockOnExport}
        onCreateNew={mockOnCreateNew}
      />
    );
    const closeButton = screen.getByLabelText("Cerrar");
    await user.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should handle undefined config", () => {
    render(
      <ConfigModal
        isOpen={true}
        config={undefined}
        onClose={mockOnClose}
        onSave={mockOnSave}
        onImport={mockOnImport}
        onExport={mockOnExport}
        onCreateNew={mockOnCreateNew}
      />
    );
    expect(screen.getByText("⚙️ Configuración")).toBeInTheDocument();
  });
});
