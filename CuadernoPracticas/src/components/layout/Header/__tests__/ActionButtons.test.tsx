import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ActionButtons } from "../ActionButtons";
import { eventBus } from "../../../../core/services/EventBus";

// Mock the eventBus
vi.mock("../../../../core/services/EventBus", () => ({
  eventBus: {
    emit: vi.fn(),
  },
}));

describe("ActionButtons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render all action buttons", () => {
    render(<ActionButtons />);

    expect(
      screen.getByRole("button", { name: /guardar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /importar/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /exportar/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /pdf/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /configuración/i })
    ).toBeInTheDocument();
  });

  it("should emit cdp-save event when save button is clicked", async () => {
    const user = userEvent.setup();
    render(<ActionButtons />);

    const saveButton = screen.getByRole("button", { name: /guardar/i });
    await user.click(saveButton);

    expect(eventBus.emit).toHaveBeenCalledWith("cdp-save");
  });

  it("should emit cdp-import event when import button is clicked", async () => {
    const user = userEvent.setup();
    render(<ActionButtons />);

    const importButton = screen.getByRole("button", { name: /importar/i });
    await user.click(importButton);

    expect(eventBus.emit).toHaveBeenCalledWith("cdp-import");
  });

  it("should emit cdp-export event when export button is clicked", async () => {
    const user = userEvent.setup();
    render(<ActionButtons />);

    const exportButton = screen.getByRole("button", { name: /exportar/i });
    await user.click(exportButton);

    expect(eventBus.emit).toHaveBeenCalledWith("cdp-export");
  });

  it("should emit cdp-pdf-modal event when PDF button is clicked", async () => {
    const user = userEvent.setup();
    render(<ActionButtons />);

    const pdfButton = screen.getByRole("button", { name: /pdf/i });
    await user.click(pdfButton);

    expect(eventBus.emit).toHaveBeenCalledWith("cdp-pdf-modal");
  });

  it("should emit cdp-config event when settings button is clicked", async () => {
    const user = userEvent.setup();
    render(<ActionButtons />);

    const settingsButton = screen.getByRole("button", {
      name: /configuración/i,
    });
    await user.click(settingsButton);

    expect(eventBus.emit).toHaveBeenCalledWith("cdp-config");
  });

  it("should render Save icon in save button", () => {
    const { container } = render(<ActionButtons />);
    const saveButton = screen.getByRole("button", { name: /guardar/i });
    const svg = saveButton.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render Import icon in import button", () => {
    const { container } = render(<ActionButtons />);
    const importButton = screen.getByRole("button", { name: /importar/i });
    const svg = importButton.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render FileDown icon in export button", () => {
    const { container } = render(<ActionButtons />);
    const exportButton = screen.getByRole("button", { name: /exportar/i });
    const svg = exportButton.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render Printer icon in PDF button", () => {
    const { container } = render(<ActionButtons />);
    const pdfButton = screen.getByRole("button", { name: /pdf/i });
    const svg = pdfButton.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render Settings icon in settings button", () => {
    const { container } = render(<ActionButtons />);
    const settingsButton = screen.getByRole("button", {
      name: /configuración/i,
    });
    const svg = settingsButton.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should have correct title attributes", () => {
    render(<ActionButtons />);

    expect(screen.getByRole("button", { name: /guardar/i })).toHaveAttribute(
      "title",
      "Guardar"
    );
    expect(screen.getByRole("button", { name: /importar/i })).toHaveAttribute(
      "title",
      "Importar"
    );
    expect(screen.getByRole("button", { name: /exportar/i })).toHaveAttribute(
      "title",
      "Exportar"
    );
    expect(screen.getByRole("button", { name: /pdf/i })).toHaveAttribute(
      "title",
      "Generar PDF"
    );
    expect(
      screen.getByRole("button", { name: /configuración/i })
    ).toHaveAttribute("title", "Configuración");
  });

  it("should have responsive text visibility classes", () => {
    const { container } = render(<ActionButtons />);

    // Text spans should have hidden sm:inline classes
    const spans = container.querySelectorAll("span.hidden.sm\\:inline");
    expect(spans.length).toBeGreaterThan(0);
  });

  it("should have special styling for PDF button", () => {
    render(<ActionButtons />);

    const pdfButton = screen.getByRole("button", { name: /pdf/i });
    expect(pdfButton.className).toContain("bg-gradient-to-r");
  });
});
