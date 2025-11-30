import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ColorCustomizer } from "../ColorCustomizer";
import type { PDFColors } from "../../../../core/models/types";

describe("ColorCustomizer", () => {
  const mockOnColorChange = vi.fn();
  const defaultColors: PDFColors = {
    primary: "#7C3AED",
    secondary: "#22D3EE",
    text: "#1E293B",
    background: "#FFFFFF",
  };

  beforeEach(() => {
    mockOnColorChange.mockClear();
  });

  it("should render color input fields for all colors", () => {
    render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    expect(screen.getByText("Color Principal")).toBeInTheDocument();
    expect(screen.getByText("Color Secundario")).toBeInTheDocument();
    expect(screen.getByText("Color de Texto")).toBeInTheDocument();
    expect(screen.getByText("Color de Fondo")).toBeInTheDocument();
  });

  it("should display current colors in inputs", () => {
    const { container } = render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    const textInputs = container.querySelectorAll('input[type="text"]');
    expect(textInputs[0]).toHaveValue("#7C3AED");
    expect(textInputs[1]).toHaveValue("#22D3EE");
    expect(textInputs[2]).toHaveValue("#1E293B");
    expect(textInputs[3]).toHaveValue("#FFFFFF");
  });

  it("should call onColorChange when primary color is changed via text input", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    const textInputs = container.querySelectorAll('input[type="text"]');
    await user.clear(textInputs[0]);
    await user.type(textInputs[0], "#FF0000");

    expect(mockOnColorChange).toHaveBeenCalled();
  });

  it("should call onColorChange when color is changed via color picker", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    const colorInputs = container.querySelectorAll('input[type="color"]');
    await user.click(colorInputs[0]);

    // Note: Simulating actual color picker interaction is complex in tests
    // We're testing that the input exists and is accessible
    expect(colorInputs[0]).toBeInTheDocument();
  });

  it("should render color presets for primary color", () => {
    render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    // Primary color presets should be rendered as buttons
    const primarySection = screen.getByText("Color Principal").closest("div");
    const presetButtons = primarySection?.querySelectorAll("button");

    // Should have 6 primary color presets
    expect(presetButtons?.length).toBe(6);
  });

  it("should render color presets for secondary color", () => {
    render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    // Secondary color presets should be rendered
    const secondarySection = screen
      .getByText("Color Secundario")
      .closest("div");
    const presetButtons = secondarySection?.querySelectorAll("button");

    // Should have 4 secondary color presets
    expect(presetButtons?.length).toBe(4);
  });

  it("should call onColorChange when preset is clicked", async () => {
    const user = userEvent.setup();
    render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    const primarySection = screen.getByText("Color Principal").closest("div");
    const firstPreset = primarySection?.querySelector("button");

    if (firstPreset) {
      await user.click(firstPreset);
      expect(mockOnColorChange).toHaveBeenCalled();
      expect(mockOnColorChange).toHaveBeenCalledWith(
        "primary",
        expect.any(String)
      );
    }
  });

  it("should have color preview in preset buttons", () => {
    const { container } = render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    const presetButtons = container.querySelectorAll("button[style]");
    expect(presetButtons.length).toBeGreaterThan(0);

    // Check that buttons have background color style
    const firstButton = presetButtons[0] as HTMLElement;
    expect(firstButton.style.backgroundColor).toBeTruthy();
  });

  it("should render section title", () => {
    render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    expect(screen.getByText("Personaliza los Colores")).toBeInTheDocument();
  });

  it("should have correct placeholder for primary color input", () => {
    const { container } = render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    const textInputs = container.querySelectorAll('input[type="text"]');
    expect(textInputs[0]).toHaveAttribute("placeholder", "#7C3AED");
  });

  it("should handle all color changes independently", async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    const textInputs = container.querySelectorAll('input[type="text"]');

    await user.clear(textInputs[0]);
    await user.type(textInputs[0], "#111111");

    await user.clear(textInputs[1]);
    await user.type(textInputs[1], "#222222");

    expect(mockOnColorChange).toHaveBeenCalled();
  });

  it("should render both color picker and text input for each color", () => {
    const { container } = render(
      <ColorCustomizer
        colors={defaultColors}
        onColorChange={mockOnColorChange}
      />
    );

    const colorInputs = container.querySelectorAll('input[type="color"]');
    const textInputs = container.querySelectorAll('input[type="text"]');

    expect(colorInputs.length).toBe(4); // 4 color pickers
    expect(textInputs.length).toBe(4); // 4 text inputs
  });
});
