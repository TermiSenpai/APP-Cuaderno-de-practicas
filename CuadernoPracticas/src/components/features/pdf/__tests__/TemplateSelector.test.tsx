import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { TemplateSelector } from "../TemplateSelector";
import type { PDFTemplate } from "../../../../core/models/types";

// Mock the PDFTemplateRegistry
vi.mock("../../../../core/services/PDFTemplateRegistry", () => ({
  getAvailableTemplates: vi.fn(() => [
    { id: "clasica", name: "Clásica", description: "Plantilla clásica" },
    { id: "moderna", name: "Moderna", description: "Plantilla moderna" },
    { id: "minimal", name: "Minimal", description: "Plantilla minimalista" },
    { id: "compacta", name: "Compacta", description: "Plantilla compacta" },
    {
      id: "profesional",
      name: "Profesional",
      description: "Plantilla profesional",
    },
  ]),
}));

describe("TemplateSelector", () => {
  const mockOnTemplateChange = vi.fn();

  beforeEach(() => {
    mockOnTemplateChange.mockClear();
  });

  it("should render all template options", () => {
    render(
      <TemplateSelector
        selectedTemplate={"clasica" as PDFTemplate}
        onTemplateChange={mockOnTemplateChange}
      />
    );

    expect(screen.getByText("Clásica")).toBeInTheDocument();
    expect(screen.getByText("Moderna")).toBeInTheDocument();
    expect(screen.getByText("Minimal")).toBeInTheDocument();
    expect(screen.getByText("Compacta")).toBeInTheDocument();
    expect(screen.getByText("Profesional")).toBeInTheDocument();
  });

  it("should render template descriptions", () => {
    render(
      <TemplateSelector
        selectedTemplate={"clasica" as PDFTemplate}
        onTemplateChange={mockOnTemplateChange}
      />
    );

    expect(screen.getByText("Plantilla clásica")).toBeInTheDocument();
    expect(screen.getByText("Plantilla moderna")).toBeInTheDocument();
    expect(screen.getByText("Plantilla minimalista")).toBeInTheDocument();
  });

  it("should highlight selected template", () => {
    const { container } = render(
      <TemplateSelector
        selectedTemplate={"moderna" as PDFTemplate}
        onTemplateChange={mockOnTemplateChange}
      />
    );

    // Find the button containing "Moderna"
    const modernaButton = screen.getByText("Moderna").closest("button");
    expect(modernaButton).toHaveClass("border-fuchsia-500");
  });

  it("should call onChange when template is clicked", async () => {
    const user = userEvent.setup();
    render(
      <TemplateSelector
        selectedTemplate={"clasica" as PDFTemplate}
        onTemplateChange={mockOnTemplateChange}
      />
    );

    const modernaButton = screen.getByText("Moderna").closest("button");
    if (modernaButton) {
      await user.click(modernaButton);
      expect(mockOnTemplateChange).toHaveBeenCalledWith("moderna");
    }
  });

  it("should show CheckCircle icon for selected template", () => {
    const { container } = render(
      <TemplateSelector
        selectedTemplate={"clasica" as PDFTemplate}
        onTemplateChange={mockOnTemplateChange}
      />
    );

    // Selected template should have CheckCircle2 icon (renders as SVG)
    const clasicaButton = screen.getByText("Clásica").closest("button");
    const svg = clasicaButton?.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render section title", () => {
    render(
      <TemplateSelector
        selectedTemplate={"clasica" as PDFTemplate}
        onTemplateChange={mockOnTemplateChange}
      />
    );

    expect(screen.getByText("Selecciona una Plantilla")).toBeInTheDocument();
  });

  it("should render all templates as buttons", () => {
    render(
      <TemplateSelector
        selectedTemplate={"clasica" as PDFTemplate}
        onTemplateChange={mockOnTemplateChange}
      />
    );

    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(5);
  });

  it("should apply different styles to selected vs unselected templates", () => {
    const { container } = render(
      <TemplateSelector
        selectedTemplate={"minimal" as PDFTemplate}
        onTemplateChange={mockOnTemplateChange}
      />
    );

    const minimalButton = screen.getByText("Minimal").closest("button");
    const clasicaButton = screen.getByText("Clásica").closest("button");

    expect(minimalButton).toHaveClass("border-fuchsia-500");
    expect(clasicaButton).not.toHaveClass("border-fuchsia-500");
  });

  it("should handle multiple template changes", async () => {
    const user = userEvent.setup();
    render(
      <TemplateSelector
        selectedTemplate={"clasica" as PDFTemplate}
        onTemplateChange={mockOnTemplateChange}
      />
    );

    const modernaButton = screen.getByText("Moderna").closest("button");
    const minimalButton = screen.getByText("Minimal").closest("button");

    if (modernaButton) await user.click(modernaButton);
    if (minimalButton) await user.click(minimalButton);

    expect(mockOnTemplateChange).toHaveBeenCalledTimes(2);
    expect(mockOnTemplateChange).toHaveBeenCalledWith("moderna");
    expect(mockOnTemplateChange).toHaveBeenCalledWith("minimal");
  });
});
