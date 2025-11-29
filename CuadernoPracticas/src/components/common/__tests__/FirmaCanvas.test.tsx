import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { FirmaCanvas } from "../FirmaCanvas/FirmaCanvas";

describe("FirmaCanvas", () => {
  const defaultProps = {
    value: null,
    onChange: vi.fn(),
  };

  it("should render canvas element", () => {
    render(<FirmaCanvas {...defaultProps} />);

    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("should render clear button with Limpiar text", () => {
    render(<FirmaCanvas {...defaultProps} />);

    const clearButton = screen.getByRole("button", { name: /limpiar/i });
    expect(clearButton).toBeInTheDocument();
  });

  it("should call onChange when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<FirmaCanvas {...defaultProps} onChange={onChange} />);

    const clearButton = screen.getByRole("button", { name: /limpiar/i });
    await user.click(clearButton);

    // onChange should be called (with null to clear)
    expect(onChange).toHaveBeenCalled();
  });

  it("should render signature label", () => {
    render(<FirmaCanvas {...defaultProps} />);

    expect(screen.getByText(/firma del estudiante/i)).toBeInTheDocument();
  });

  it("should handle null value", () => {
    render(<FirmaCanvas {...defaultProps} value={null} />);

    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("should handle undefined value", () => {
    render(<FirmaCanvas {...defaultProps} value={undefined} />);

    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("should have correct canvas dimensions", () => {
    render(<FirmaCanvas {...defaultProps} />);

    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    expect(canvas).toBeInTheDocument();
    expect(canvas.width).toBe(150);
    expect(canvas.height).toBe(150);
  });

  it("should have crosshair cursor on canvas", () => {
    render(<FirmaCanvas {...defaultProps} />);

    const canvas = document.querySelector("canvas") as HTMLCanvasElement;
    expect(canvas).toHaveClass("cursor-crosshair");
  });

  it("should render trash icon in clear button", () => {
    const { container } = render(<FirmaCanvas {...defaultProps} />);

    // lucide-react Trash2 icon renders as SVG
    const clearButton = screen.getByRole("button", { name: /limpiar/i });
    const svg = clearButton.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
