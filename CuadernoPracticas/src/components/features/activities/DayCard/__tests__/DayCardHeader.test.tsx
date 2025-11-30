import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { DayCardHeader } from "../DayCardHeader";

describe("DayCardHeader", () => {
  const mockOnAsistidoChange = vi.fn();
  const testFecha = "2024-01-15";

  beforeEach(() => {
    mockOnAsistidoChange.mockClear();
  });

  it("should render date correctly formatted", () => {
    render(
      <DayCardHeader
        fecha={testFecha}
        asistido={false}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    // Date should be formatted as DD/MM/YYYY and include weekday
    expect(screen.getByText(/15\/01\/2024/i)).toBeInTheDocument();
  });

  it("should render checkbox for asistido", () => {
    render(
      <DayCardHeader
        fecha={testFecha}
        asistido={false}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("should have checked state matching asistido prop when true", () => {
    render(
      <DayCardHeader
        fecha={testFecha}
        asistido={true}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("should have unchecked state matching asistido prop when false", () => {
    render(
      <DayCardHeader
        fecha={testFecha}
        asistido={false}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("should call onAsistidoChange when checkbox is toggled", async () => {
    const user = userEvent.setup();
    render(
      <DayCardHeader
        fecha={testFecha}
        asistido={false}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnAsistidoChange).toHaveBeenCalledWith(true);
  });

  it("should call onAsistidoChange with false when unchecking", async () => {
    const user = userEvent.setup();
    render(
      <DayCardHeader
        fecha={testFecha}
        asistido={true}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    const checkbox = screen.getByRole("checkbox");
    await user.click(checkbox);

    expect(mockOnAsistidoChange).toHaveBeenCalledWith(false);
  });

  it("should render calendar icon", () => {
    const { container } = render(
      <DayCardHeader
        fecha={testFecha}
        asistido={false}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    // lucide-react Calendar icon renders as SVG
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render weekday in Spanish", () => {
    render(
      <DayCardHeader
        fecha={testFecha}
        asistido={false}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    // 2024-01-15 is a Monday
    expect(
      screen.getByText(/lunes|martes|miércoles|jueves|viernes|sábado|domingo/i)
    ).toBeInTheDocument();
  });

  it("should render asistido label text", () => {
    render(
      <DayCardHeader
        fecha={testFecha}
        asistido={false}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    expect(screen.getByText("Día asistido")).toBeInTheDocument();
  });

  it("should have proper label structure", () => {
    const { container } = render(
      <DayCardHeader
        fecha={testFecha}
        asistido={false}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    const label = container.querySelector("label");
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass("cursor-pointer");
  });

  it("should render CheckCircle2 icon when asistido is true", () => {
    const { container } = render(
      <DayCardHeader
        fecha={testFecha}
        asistido={true}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    // Check for multiple SVGs (Calendar + CheckCircle2)
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(1);
  });

  it("should render Circle icon when asistido is false", () => {
    const { container } = render(
      <DayCardHeader
        fecha={testFecha}
        asistido={false}
        onAsistidoChange={mockOnAsistidoChange}
      />
    );

    // Check for multiple SVGs (Calendar + Circle)
    const svgs = container.querySelectorAll("svg");
    expect(svgs.length).toBeGreaterThan(1);
  });
});
