import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { DayCard } from "../DayCard";
import type { Dia } from "../../../../../core/models/types";

// Mock the useDayCard hook
vi.mock("../useDayCard", () => ({
  useDayCard: vi.fn(() => ({
    cardRef: { current: null },
    horas: 8,
    asistido: true,
    actividadTextState: "Test activities",
    setActividadTextState: vi.fn(),
    showHorasEditor: false,
    setShowHorasEditor: vi.fn(),
    handlers: {
      handleAsistidoChange: vi.fn(),
      handleHorasChange: vi.fn(),
      handleActivitiesBlur: vi.fn(),
      handleFirmaChange: vi.fn(),
    },
  })),
}));

// Mock child components
vi.mock("../DayCardHeader", () => ({
  DayCardHeader: ({ fecha, asistido }: any) => (
    <div data-testid="day-card-header">
      Header: {fecha} - {asistido ? "Asistido" : "No asistido"}
    </div>
  ),
}));

vi.mock("../HoursEditor", () => ({
  HoursEditor: ({ horas }: any) => (
    <div data-testid="hours-editor">Hours: {horas}h</div>
  ),
}));

vi.mock("../ActivitiesTextArea", () => ({
  ActivitiesTextArea: ({ value }: any) => (
    <textarea data-testid="activities-textarea" value={value} readOnly />
  ),
}));

vi.mock("../../../../common/FirmaCanvas/FirmaCanvas", () => ({
  FirmaCanvas: ({ value }: any) => (
    <div data-testid="firma-canvas">Firma: {value || "empty"}</div>
  ),
}));

describe("DayCard", () => {
  const mockOnChange = vi.fn();
  const testDia: Dia = {
    fecha: "2024-01-15",
    horas: 8,
    asistido: true,
    actividades: ["Test activity"],
    firma: null,
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it("should render DayCardHeader component", () => {
    render(<DayCard dia={testDia} defaultHoras={8} onChange={mockOnChange} />);

    expect(screen.getByTestId("day-card-header")).toBeInTheDocument();
  });

  it("should render HoursEditor component", () => {
    render(<DayCard dia={testDia} defaultHoras={8} onChange={mockOnChange} />);

    expect(screen.getByTestId("hours-editor")).toBeInTheDocument();
  });

  it("should render ActivitiesTextArea component", () => {
    render(<DayCard dia={testDia} defaultHoras={8} onChange={mockOnChange} />);

    expect(screen.getByTestId("activities-textarea")).toBeInTheDocument();
  });

  it("should render FirmaCanvas component", () => {
    render(<DayCard dia={testDia} defaultHoras={8} onChange={mockOnChange} />);

    expect(screen.getByTestId("firma-canvas")).toBeInTheDocument();
  });

  it("should have correct data-day-index attribute when index provided", () => {
    const { container } = render(
      <DayCard
        dia={testDia}
        defaultHoras={8}
        onChange={mockOnChange}
        index={5}
      />
    );

    const card = container.querySelector("[data-day-index='5']");
    expect(card).toBeInTheDocument();
  });

  it("should not have data-day-index attribute when index not provided", () => {
    const { container } = render(
      <DayCard dia={testDia} defaultHoras={8} onChange={mockOnChange} />
    );

    const card = container.querySelector("div[data-day-index]");
    expect(card).toBeNull();
  });

  it("should have proper card styling classes", () => {
    const { container } = render(
      <DayCard dia={testDia} defaultHoras={8} onChange={mockOnChange} />
    );

    const card = container.firstChild;
    expect(card).toHaveClass("rounded-2xl");
    expect(card).toHaveClass("bg-white");
  });

  it("should render with all required props", () => {
    render(<DayCard dia={testDia} defaultHoras={8} onChange={mockOnChange} />);

    // Should not throw and all components should be present
    expect(screen.getByTestId("day-card-header")).toBeInTheDocument();
    expect(screen.getByTestId("hours-editor")).toBeInTheDocument();
    expect(screen.getByTestId("activities-textarea")).toBeInTheDocument();
    expect(screen.getByTestId("firma-canvas")).toBeInTheDocument();
  });

  it("should pass correct fecha to DayCardHeader", () => {
    render(<DayCard dia={testDia} defaultHoras={8} onChange={mockOnChange} />);

    expect(screen.getByText(/2024-01-15/)).toBeInTheDocument();
  });

  it("should handle different defaultHoras values", () => {
    render(<DayCard dia={testDia} defaultHoras={10} onChange={mockOnChange} />);

    expect(screen.getByTestId("day-card-header")).toBeInTheDocument();
  });
});
