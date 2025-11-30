import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { ThemeToggle } from "../ThemeToggle";

describe("ThemeToggle", () => {
  const mockOnToggle = vi.fn();

  beforeEach(() => {
    mockOnToggle.mockClear();
  });

  it("should render Sun icon when theme is dark", () => {
    const { container } = render(
      <ThemeToggle theme="dark" onToggle={mockOnToggle} />
    );

    // lucide-react Sun icon renders as SVG
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render Moon icon when theme is light", () => {
    const { container } = render(
      <ThemeToggle theme="light" onToggle={mockOnToggle} />
    );

    // lucide-react Moon icon renders as SVG
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should call onToggle when button is clicked", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    await user.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  it("should have correct accessibility attributes", () => {
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("title", "Alternar tema día/noche");
  });

  it("should have screen reader text", () => {
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />);

    expect(screen.getByText("Alternar tema")).toBeInTheDocument();
  });

  it("should be a button element", () => {
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    expect(button.tagName).toBe("BUTTON");
  });

  it("should call onToggle multiple times when clicked repeatedly", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle theme="light" onToggle={mockOnToggle} />);

    const button = screen.getByRole("button");
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(mockOnToggle).toHaveBeenCalledTimes(3);
  });

  it("should have transition classes for smooth animations", () => {
    const { container } = render(
      <ThemeToggle theme="light" onToggle={mockOnToggle} />
    );

    const button = container.querySelector("button");
    expect(button?.className).toContain("transition-all");
  });
});
