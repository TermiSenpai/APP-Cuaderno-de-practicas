import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "../Header";

// Mock the useTheme hook
vi.mock("../../../../hooks/useTheme", () => ({
  useTheme: vi.fn(() => ({
    theme: "light",
    toggleTheme: vi.fn(),
  })),
}));

// Mock child components
vi.mock("../ThemeToggle", () => ({
  ThemeToggle: ({ theme, onToggle }: any) => (
    <button onClick={onToggle} data-testid="theme-toggle">
      Toggle {theme}
    </button>
  ),
}));

vi.mock("../ActionButtons", () => ({
  ActionButtons: () => <div data-testid="action-buttons">Action Buttons</div>,
}));

describe("Header", () => {
  it("should render default title when no title prop is provided", () => {
    render(<Header />);
    expect(screen.getByText("Cuaderno de Prácticas")).toBeInTheDocument();
  });

  it("should render custom title when provided", () => {
    render(<Header title="Mi Cuaderno Personalizado" />);
    expect(screen.getByText("Mi Cuaderno Personalizado")).toBeInTheDocument();
    expect(screen.queryByText("Cuaderno de Prácticas")).not.toBeInTheDocument();
  });

  it("should display total hours when totalHoras is provided", () => {
    render(<Header totalHoras={120} />);
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("120 horas")).toBeInTheDocument();
  });

  it("should not display total hours when totalHoras is undefined", () => {
    render(<Header />);
    expect(screen.queryByText("Total:")).not.toBeInTheDocument();
  });

  it("should not display total hours when totalHoras is 0", () => {
    render(<Header totalHoras={0} />);
    expect(screen.getByText("Total:")).toBeInTheDocument();
    expect(screen.getByText("0 horas")).toBeInTheDocument();
  });

  it("should render ThemeToggle component", () => {
    render(<Header />);
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument();
  });

  it("should render ActionButtons component", () => {
    render(<Header />);
    expect(screen.getByTestId("action-buttons")).toBeInTheDocument();
  });

  it("should have header element with app-header class", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("app-header");
  });

  it("should have proper header structure", () => {
    const { container } = render(<Header />);
    const header = container.querySelector("header");

    // Check for nested div structure
    expect(header?.querySelector(".w-full")).toBeInTheDocument();
    expect(header?.querySelector(".flex.items-center")).toBeInTheDocument();
  });

  it("should render h1 element for title", () => {
    render(<Header title="Test Title" />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Test Title");
  });

  it("should handle large hour values", () => {
    render(<Header totalHoras={99999} />);
    expect(screen.getByText("99999 horas")).toBeInTheDocument();
  });
});
